"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProductCard from "@/components/shop/ProductCard";
import type { Produit } from "@/lib/types";
import GoldDivider from "@/components/ui/GoldDivider";
import LuxuryButton from "@/components/ui/LuxuryButton";

interface FeaturedProductsProps {
  produits: Produit[];
}

export default function FeaturedProducts({ produits }: FeaturedProductsProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-14"
        >
          <div>
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#DCA54A]">
              Sélection du moment
            </span>
            <GoldDivider className="mb-5" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] leading-tight">
              Nos derniers{" "}
              <span className="text-[#DCA54A]">ajouts</span>
            </h2>
          </div>
          <LuxuryButton href="/boutique">
            Voir tout le catalogue
          </LuxuryButton>
        </motion.div>

        {/* Grille produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produits.slice(0, 4).map((produit, i) => (
            <motion.div
              key={produit.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard produit={produit} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
