import BoutiqueView from "@/components/shop/BoutiqueView";
import { getProduits, getCategories } from "@/lib/api";

export default async function BoutiquePage() {
  const [produits, categories] = await Promise.all([
    getProduits(),
    getCategories(),
  ]);

  return <BoutiqueView produits={produits} categories={categories} />;
}
