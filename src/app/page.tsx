export const dynamic = 'force-dynamic';

import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ValuesShowcase from "@/components/home/ValuesShowcase";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import GallerySection from "@/components/home/GallerySection";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";
import { getProduits } from "@/lib/api";
import { listMedusaCategories } from "@/lib/medusa";

export default async function HomePage() {
  const [derniers, allCategories] = await Promise.all([
    getProduits({ latest: true, limit: 4 }),
    listMedusaCategories().catch(() => []),
  ]);
  const produitVedettes = derniers.length ? derniers : (await getProduits()).slice(0, 4);
  const categories = allCategories.slice(0, 6);

  return (
    <>
      <Hero />
      <AboutSection />
      <ValuesShowcase />
      <CategoriesSection categories={categories} />
      <FeaturedProducts produits={produitVedettes} />
      <GallerySection />
      <Testimonials />
      <CTASection />
    </>
  );
}
