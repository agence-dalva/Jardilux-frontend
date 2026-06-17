import type { Produit, Categorie } from "./types";
import {
  listMedusaProducts,
  getMedusaProductByHandle,
  listMedusaCategories,
  type MedusaProduct,
  type MedusaCategory,
} from "./medusa";

/* ── Mapping Medusa → shape `Produit`/`Categorie` du design ──────────── */

/** Identifiant numérique stable dérivé de l'id Medusa (string). */
function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function metaString(
  meta: Record<string, unknown> | null | undefined,
  ...keys: string[]
): string | undefined {
  if (!meta) return undefined;
  for (const k of keys) {
    const v = meta[k];
    if (typeof v === "string" && v.trim()) return v;
    if (typeof v === "number") return String(v);
  }
  return undefined;
}

function metaIsTrue(
  meta: Record<string, unknown> | null | undefined,
  ...keys: string[]
): boolean {
  if (!meta) return false;
  for (const k of keys) {
    const v = meta[k];
    if (v === true || v === "true" || v === "1" || v === 1) return true;
  }
  return false;
}

function truncate(text: string, max = 110): string {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function mapCategorie(c: MedusaCategory): Categorie {
  return {
    id: hashId(c.id),
    documentId: c.id,
    nom: c.name,
    slug: c.handle,
    description: c.description,
    ordre: c.rank,
  };
}

function mapProduit(mp: MedusaProduct): Produit {
  const meta = mp.metadata ?? null;

  // Prix : premier variant disposant d'un prix calculé.
  const prix =
    mp.variants?.find((v) => v.calculated_price?.calculated_amount != null)
      ?.calculated_price?.calculated_amount ?? 0;

  // Images : galerie Medusa, puis thumbnail en dernier recours.
  const urls = (mp.images ?? []).map((img) => img.url).filter(Boolean);
  if (!urls.length && mp.thumbnail) urls.push(mp.thumbnail);
  const images = urls.length
    ? urls.map((url, i) => ({
        id: i,
        url,
        alternativeText: null,
        width: 0,
        height: 0,
      }))
    : undefined;

  const cat = mp.categories?.[0];
  const description = mp.description ?? "";

  const details = Array.isArray(mp.product_details)
    ? mp.product_details[0]
    : mp.product_details;

  return {
    id: hashId(mp.id),
    documentId: mp.id,
    nom: mp.title,
    slug: mp.handle,
    description,
    descriptionCourte:
      mp.subtitle?.trim() || (description ? truncate(description) : undefined),
    prix,
    images,
    categorie: cat ? mapCategorie(cat) : undefined,
    estVedette:
      metaIsTrue(meta, "vedette", "estVedette", "featured") ||
      (mp.tags ?? []).some((t) => t.value?.toLowerCase() === "vedette"),
    enStock: !metaIsTrue(meta, "sur_commande", "surCommande") &&
      metaString(meta, "en_stock", "enStock") !== "false",
    dimensions: metaString(meta, "dimensions"),
    materiaux: metaString(meta, "materiaux", "matériaux", "materials"),
    couleurs: metaString(meta, "couleurs", "colors", "coloris"),
    tags: (mp.tags ?? []).map((t) => t.value),
    nettoyage: details?.nettoyage ?? null,
    details_technique: details?.details_technique ?? null,
    rawMetadata: meta,
  };
}

/* ── API publique (consommée par les pages) ──────────────────────────── */

export async function getProduits(params?: {
  categorie?: string;
  vedette?: boolean;
  limit?: number;
  latest?: boolean;
}): Promise<Produit[]> {
  try {
    const cats = params?.categorie ? await listMedusaCategories() : [];
    const categoryId = params?.categorie
      ? cats.find((c) => c.handle === params.categorie)?.id
      : undefined;
    const products = await listMedusaProducts({
      categoryId,
      limit: params?.limit,
      order: params?.latest ? "-created_at" : undefined,
    });
    let mapped = products.map(mapProduit);
    if (params?.vedette) mapped = mapped.filter((p) => p.estVedette);
    return mapped;
  } catch (err) {
    console.error("[getProduits] fallback mock —", err);
    let mock = [...MOCK_PRODUITS];
    if (params?.categorie)
      mock = mock.filter((p) => p.categorie?.slug === params.categorie);
    if (params?.vedette) mock = mock.filter((p) => p.estVedette);
    return mock;
  }
}

export async function getProduit(slug: string): Promise<Produit | null> {
  try {
    const mp = await getMedusaProductByHandle(slug);
    return mp ? mapProduit(mp) : null;
  } catch (err) {
    console.error("[getProduit] fallback mock —", err);
    return MOCK_PRODUITS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getCategories(): Promise<Categorie[]> {
  try {
    const cats = await listMedusaCategories();
    if (!cats.length) return MOCK_CATEGORIES;
    return cats
      .map(mapCategorie)
      .sort((a, b) => (a.ordre ?? 0) - (b.ordre ?? 0));
  } catch (err) {
    console.error("[getCategories] fallback mock —", err);
    return MOCK_CATEGORIES;
  }
}

/* Images par slug pour les produits mock (Unsplash photos vérifiées) */
const U = "https://images.unsplash.com/photo-";
export const PRODUCT_IMAGE_MAP: Record<string, { main: string; alt: string }> = {
  "salon-jardin-toscane":          { main: `${U}1555041469-a586c61ea9bc?w=800&q=80`, alt: `${U}1600566752355-35792bedcfea?w=800&q=80` },
  "chaise-longue-riviera":         { main: `${U}1600566752355-35792bedcfea?w=800&q=80`, alt: `${U}1555041469-a586c61ea9bc?w=800&q=80` },
  "lanterne-solaire-versailles":   { main: `${U}1558618666-fcd25c85cd64?w=800&q=80`, alt: `${U}1416879595882-3373a0480b5b?w=800&q=80` },
  "fontaine-jardin-monaco":        { main: `${U}1416879595882-3373a0480b5b?w=800&q=80`, alt: `${U}1555041469-a586c61ea9bc?w=800&q=80` },
  "table-basse-capri":             { main: `${U}1558618666-fcd25c85cd64?w=800&q=80`, alt: `${U}1600566752355-35792bedcfea?w=800&q=80` },
  "guirlande-lumineuse-cote-azur": { main: `${U}1558618666-fcd25c85cd64?w=800&q=80`, alt: `${U}1600566752355-35792bedcfea?w=800&q=80` },
  "fauteuil-suspendu-bali":        { main: `${U}1600566752355-35792bedcfea?w=800&q=80`, alt: `${U}1558618666-fcd25c85cd64?w=800&q=80` },
  "pot-design-milano":             { main: `${U}1416879595882-3373a0480b5b?w=800&q=80`, alt: `${U}1600210492486-724fe5c67fb3?w=800&q=80` },
};

export function getMockImageUrl(slug: string, secondary = false): string {
  const entry = PRODUCT_IMAGE_MAP[slug];
  if (!entry) return `${U}1555041469-a586c61ea9bc?w=800&q=80`;
  return secondary ? entry.alt : entry.main;
}

const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? "http://localhost:9000";

/**
 * Résout l'URL d'une image produit. Medusa renvoie des URLs absolues ;
 * on préfixe seulement les chemins relatifs. (Nom conservé pour compat
 * avec les composants — le paramètre `format` est ignoré côté Medusa.)
 */
export function getStrapiImageUrl(
  image?: { url?: string } | null,
  _format?: "thumbnail" | "small" | "medium" | "large"
): string {
  if (!image?.url) return "/placeholder-product.jpg";
  const src = image.url;
  if (src.startsWith("http")) return src;
  return `${MEDIA_BASE}${src}`;
}

/* Données mock pour le développement sans Strapi */
export const MOCK_CATEGORIES: Categorie[] = [
  { id: 1, documentId: "cat1", nom: "Mobilier de jardin", slug: "mobilier", icone: "Armchair", ordre: 1 },
  { id: 2, documentId: "cat2", nom: "Luminaires extérieurs", slug: "luminaires", icone: "Lightbulb", ordre: 2 },
  { id: 3, documentId: "cat3", nom: "Décoration extérieure", slug: "decoration", icone: "Flower2", ordre: 3 },
  { id: 4, documentId: "cat4", nom: "Pergolas & Abris", slug: "pergolas", icone: "Home", ordre: 4 },
];

export const MOCK_PRODUITS: Produit[] = [
  {
    id: 1, documentId: "p1",
    nom: "Salon de jardin Toscane",
    slug: "salon-jardin-toscane",
    descriptionCourte: "Ensemble 6 places en acier thermolaqué et résine tressée",
    description: "Le salon Toscane allie robustesse et élégance avec son cadre en acier thermolaqué noir et ses coussins déhoussables en tissu Sunbrella. Parfait pour les grandes terrasses.",
    prix: 1290,
    estVedette: true, enStock: true,
    dimensions: "Table : 200x100cm — Chaises : 64x57x85cm",
    materiaux: "Acier thermolaqué, résine tressée, tissu Sunbrella",
    couleurs: "Anthracite / Beige",
    categorie: { id: 1, documentId: "cat1", nom: "Mobilier de jardin", slug: "mobilier" },
  },
  {
    id: 2, documentId: "p2",
    nom: "Chaise longue Riviera",
    slug: "chaise-longue-riviera",
    descriptionCourte: "Bain de soleil réglable en teck FSC et toile Batyline",
    description: "La chaise longue Riviera en teck massif certifié FSC et toile Batyline offre un confort optimal. Dossier réglable sur 5 positions, repose-pieds amovible.",
    prix: 580,
    estVedette: true, enStock: true,
    dimensions: "195x70x36cm",
    materiaux: "Teck FSC, Batyline blanc",
    couleurs: "Naturel / Blanc",
    categorie: { id: 1, documentId: "cat1", nom: "Mobilier de jardin", slug: "mobilier" },
  },
  {
    id: 3, documentId: "p3",
    nom: "Lanterne solaire Versailles",
    slug: "lanterne-solaire-versailles",
    descriptionCourte: "Lanterne décorative à LED solaire, acier inoxydable",
    description: "Lanterne élégante en acier inoxydable doré avec LED solaires haute luminosité. Allumage automatique au crépuscule, 8h d'éclairage autonome.",
    prix: 89,
    estVedette: true, enStock: true,
    dimensions: "H : 45cm — Ø : 18cm",
    materiaux: "Acier inoxydable 304, verre trempé",
    couleurs: "Doré / Transparent",
    categorie: { id: 2, documentId: "cat2", nom: "Luminaires extérieurs", slug: "luminaires" },
  },
  {
    id: 4, documentId: "p4",
    nom: "Fontaine de jardin Monaco",
    slug: "fontaine-jardin-monaco",
    descriptionCourte: "Fontaine murale en pierre reconstituée avec pompe silencieuse",
    description: "Fontaine Monaco en pierre reconstituée aspect vieilli. Pompe à eau silencieuse incluse, débit réglable. Idéale pour apporter une touche zen à votre jardin.",
    prix: 349,
    estVedette: false, enStock: true,
    dimensions: "H : 80cm — L : 55cm — P : 25cm",
    materiaux: "Pierre reconstituée, pompe inox",
    couleurs: "Pierre naturelle",
    categorie: { id: 3, documentId: "cat3", nom: "Décoration extérieure", slug: "decoration" },
  },
  {
    id: 5, documentId: "p5",
    nom: "Table basse Capri",
    slug: "table-basse-capri",
    descriptionCourte: "Table basse plateau céramique et pieds aluminium brossé",
    description: "Table basse Capri au design contemporain. Plateau en céramique effet marbre blanc et pieds en aluminium brossé. Résistante aux UV et aux intempéries.",
    prix: 420,
    estVedette: true, enStock: true,
    dimensions: "100x60x40cm",
    materiaux: "Céramique, aluminium brossé",
    couleurs: "Marbre blanc / Champagne",
    categorie: { id: 1, documentId: "cat1", nom: "Mobilier de jardin", slug: "mobilier" },
  },
  {
    id: 6, documentId: "p6",
    nom: "Guirlande lumineuse Côte d'Azur",
    slug: "guirlande-lumineuse-cote-azur",
    descriptionCourte: "Guirlande 10m avec 20 ampoules Edison vintage E27",
    description: "Guirlande guinguette festive avec 20 ampoules Edison vintage. Câble textile torsadé, résistante à l'eau IP44. Crée une ambiance chaleureuse en terrasse.",
    prix: 65,
    estVedette: false, enStock: true,
    dimensions: "10 mètres — 20 ampoules",
    materiaux: "Câble textile, ampoules E27 2W LED",
    couleurs: "Blanc chaud / Fil noir",
    categorie: { id: 2, documentId: "cat2", nom: "Luminaires extérieurs", slug: "luminaires" },
  },
  {
    id: 7, documentId: "p7",
    nom: "Fauteuil suspendu Bali",
    slug: "fauteuil-suspendu-bali",
    descriptionCourte: "Fauteuil œuf en résine tressée avec structure acier",
    description: "Fauteuil suspendu Bali en résine tressée grise, coussins moelleux inclus. Structure en acier galvanisé. Un cocon de détente pour votre extérieur.",
    prix: 750,
    estVedette: true, enStock: false,
    dimensions: "Ø 110cm — H : 195cm (avec suspension)",
    materiaux: "Résine tressée, acier galvanisé, polyester",
    couleurs: "Gris cendré / Écru",
    categorie: { id: 1, documentId: "cat1", nom: "Mobilier de jardin", slug: "mobilier" },
  },
  {
    id: 8, documentId: "p8",
    nom: "Pot design Milano",
    slug: "pot-design-milano",
    descriptionCourte: "Grand pot rectangulaire effet béton ciré, résine légère",
    description: "Pot décoratif Milano grand format en résine effet béton ciré. Ultra-léger malgré sa grande taille, résistant au gel et aux UV. Design épuré pour toutes les architectures.",
    prix: 145,
    estVedette: false, enStock: true,
    dimensions: "80x30x40cm",
    materiaux: "Résine haute densité, finition béton ciré",
    couleurs: "Gris anthracite / Blanc cassé",
    categorie: { id: 3, documentId: "cat3", nom: "Décoration extérieure", slug: "decoration" },
  },
];
