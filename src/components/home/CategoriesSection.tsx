"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import Image from "next/image";
import GoldDivider from "@/components/ui/GoldDivider";
import type { MedusaCategory } from "@/lib/medusa";

const FALLBACK_IMAGES = [
  "/images/DSC_3921 2.jpg",
  "/images/TECKA80-TECKA81-TECKA82-TECKA83_amb nuit.JPG",
  "/images/TA02281 AMB.jpg",
  "/images/DSC_3929 2.jpg",
  "/images/DSC_3930 2.jpg",
  "/images/DSC_3931 2.jpg",
];

const IMAGE_EXT = /\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/;

function getCategoryImage(cat: MedusaCategory, index: number): string {
  const meta = cat.metadata?.["background-image"];
  if (meta && typeof meta === "string") {
    const name = IMAGE_EXT.test(meta) ? meta : `${meta}.jpg`;
    return `/images/home/categories/${name}`;
  }
  return FALLBACK_IMAGES[index] ?? FALLBACK_IMAGES[0];
}

interface CategoriesSectionProps {
  categories: MedusaCategory[];
}

export default function CategoriesSection({ categories }: CategoriesSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section ref={ref} className="bg-[#0E0D06] overflow-hidden">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-[1280px] px-6 py-14"
      >
        <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#DCA54A]">
          Nos univers
        </span>
        <GoldDivider className="mb-5" />
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
          Explorer nos catégories
        </h2>
      </motion.div>

      {/*
        Mobile / tablette  : colonnes empilées (flex-col), hauteur fixe par item
        Desktop (lg+)      : colonnes côte à côte avec expand au hover
      */}
      <div className="flex flex-row h-[38vh] min-h-[200px] md:h-[55vh] lg:h-[80vh] lg:min-h-[520px]">
        {categories.map((cat, i) => {
          const imgSrc = getCategoryImage(cat, i);
          const isHovered = hovered === cat.id;

          return (
            <Link
              key={cat.id}
              href={`/boutique?cat=${cat.handle}`}
              onMouseEnter={() => setHovered(cat.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative overflow-hidden"
              style={{
                flex: isHovered ? "2.8 1 0%" : "1 1 0%",
                transition: "flex 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Image */}
              <motion.div
                className="absolute inset-0"
                animate={{ scale: isHovered ? 1.06 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={imgSrc}
                  alt={cat.name}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                  priority={i < 3}
                />
              </motion.div>

              {/* Overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,6,4,0.88) 0%, rgba(8,6,4,0.40) 55%, rgba(8,6,4,0.15) 100%)",
                  opacity: isHovered ? 0.8 : 1,
                }}
              />

              {/* Séparateur — desktop uniquement */}
              <div className="hidden lg:block absolute inset-y-0 right-0 w-px bg-white/10" />

              {/* Contenu */}
              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-6 flex flex-col items-start gap-1">
                {/* Numéro — desktop uniquement */}
                <span className="hidden lg:block font-playfair text-3xl font-bold text-white/15 select-none leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Nom */}
                <motion.h3
                  animate={{ color: isHovered ? "#e8c86a" : "#ffffff" }}
                  transition={{ duration: 0.3 }}
                  className="font-playfair font-bold leading-tight text-base lg:text-sm"
                >
                  {cat.name}
                </motion.h3>

                {/* Flèche mobile — toujours visible */}
                <span className="text-[#e8c86a] text-sm lg:hidden">→</span>

                {/* Flèche desktop — apparaît au hover */}
                <motion.span
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="hidden lg:block text-[#e8c86a] text-sm"
                >
                  →
                </motion.span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
