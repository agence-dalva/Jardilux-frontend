import Link from "next/link";
import { getProduit, getProduits, getStrapiImageUrl, getMockImageUrl } from "@/lib/api";
import ProductDetailView from "@/components/shop/ProductDetailView";

interface Params {
  slug: string;
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const produit = await getProduit(slug);

  if (!produit) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <p className="font-playfair text-3xl text-[#8a8078] mb-4">Produit introuvable</p>
          <Link href="/boutique" className="text-[#9E7020] font-semibold hover:underline">
            ← Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  const tous = await getProduits();
  const related = tous
    .filter(
      (p) => p.id !== produit.id && p.categorie?.slug === produit.categorie?.slug
    )
    .slice(0, 4);

  const images = produit.images?.length
    ? produit.images.map((img) => getStrapiImageUrl(img, "large"))
    : [getMockImageUrl(produit.slug), getMockImageUrl(produit.slug, true)];

  return <ProductDetailView produit={produit} images={images} related={related} />;
}
