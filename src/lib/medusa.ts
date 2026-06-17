/**
 * Client Medusa Store (REST, fetch natif — pas de SDK pour rester léger).
 * Toutes les requêtes passent la clé publishable et résolvent automatiquement
 * la région (nécessaire pour obtenir `calculated_price`).
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000";
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? "";

export interface MedusaCalculatedPrice {
  calculated_amount?: number;
  currency_code?: string;
}
export interface MedusaVariant {
  id: string;
  title?: string;
  calculated_price?: MedusaCalculatedPrice | null;
}
export interface MedusaImage {
  id?: string;
  url: string;
}
export interface MedusaCategory {
  id: string;
  name: string;
  handle: string;
  description?: string;
  rank?: number;
  metadata?: Record<string, unknown> | null;
}
export interface MedusaTag {
  id: string;
  value: string;
}
export interface MedusaProductDetails {
  nettoyage?: string | null;
  details_technique?: string | null;
}
export interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  subtitle?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  metadata?: Record<string, unknown> | null;
  images?: MedusaImage[];
  categories?: MedusaCategory[];
  tags?: MedusaTag[];
  variants?: MedusaVariant[];
  product_details?: MedusaProductDetails | MedusaProductDetails[] | null;
}

async function medusaFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
  fetchOptions: RequestInit = {}
): Promise<T> {
  const url = new URL(`${BACKEND_URL}/store${path}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }
  const res = await fetch(url.toString(), {
    headers: { "x-publishable-api-key": PUBLISHABLE_KEY },
    next: { revalidate: 60 },
    ...fetchOptions,
  });
  if (!res.ok) {
    throw new Error(`Medusa error ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}

/* Résolution + cache mémoire de la région par défaut (pour les prix). */
let regionIdCache: string | null = null;
async function getDefaultRegionId(): Promise<string | undefined> {
  if (regionIdCache) return regionIdCache;
  const { regions } = await medusaFetch<{ regions: { id: string }[] }>(
    "/regions"
  );
  regionIdCache = regions?.[0]?.id ?? null;
  return regionIdCache ?? undefined;
}

const PRODUCT_FIELDS =
  "id,title,handle,subtitle,description,thumbnail,metadata," +
  "*images,*categories,*tags,*variants.calculated_price," +
  "+product_details.nettoyage,+product_details.details_technique";

export async function listMedusaProducts(params?: {
  limit?: number;
  categoryId?: string;
  order?: string;
}): Promise<MedusaProduct[]> {
  const region_id = await getDefaultRegionId();
  const query: Record<string, string | number | undefined> = {
    fields: PRODUCT_FIELDS,
    limit: params?.limit ?? 100,
    region_id,
  };
  if (params?.categoryId) query["category_id[]"] = params.categoryId;
  if (params?.order) query["order"] = params.order;
  const { products } = await medusaFetch<{ products: MedusaProduct[] }>(
    "/products",
    query
  );
  return products ?? [];
}

export async function getMedusaProductByHandle(
  handle: string
): Promise<MedusaProduct | null> {
  const region_id = await getDefaultRegionId();
  const { products } = await medusaFetch<{ products: MedusaProduct[] }>(
    "/products",
    { fields: PRODUCT_FIELDS, handle, limit: 1, region_id }
  );
  const product = products?.[0] ?? null;
  if (!product) return null;

  // Fetch custom fields from dedicated store route
  try {
    const details = await medusaFetch<{
      nettoyage: string | null;
      details_technique: string | null;
    }>(`/products/${product.id}/details`);
    product.product_details = details;
  } catch {
    // No custom details saved yet — not an error
  }

  return product;
}

export async function listMedusaCategories(): Promise<MedusaCategory[]> {
  const { product_categories } = await medusaFetch<{
    product_categories: MedusaCategory[];
  }>(
    "/product-categories",
    { fields: "id,name,handle,description,rank,metadata", limit: 100 },
    { cache: "no-store" }
  );
  return product_categories ?? [];
}
