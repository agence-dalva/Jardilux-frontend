"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";
import LuxuryButton from "@/components/ui/LuxuryButton";
import { cn } from "@/lib/utils";

const galleryImages = [
  { src: "/images/DSC_9066.jpg", alt: "Réalisation extérieure Jardilux" },
  { src: "/images/DSC_9067.jpg", alt: "Décoration de terrasse" },
  { src: "/images/DSC_9068.jpg", alt: "Mobilier haut de gamme" },
  { src: "/images/DSC_9070.jpg", alt: "Aménagement extérieur" },
  { src: "/images/DSC_9071.jpg", alt: "Luminaires extérieurs" },
  { src: "/images/DSC_9072.jpg", alt: "Jardin aménagé" },
];

export default function GallerySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback((next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  }, [current]);

  const prev = () => go((current - 1 + galleryImages.length) % galleryImages.length);
  const next = () => go((current + 1) % galleryImages.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [current]);

  return (
    <section ref={ref} className="py-24 bg-[#faf7f2] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#DCA54A]">
              Notre univers
            </span>
            <GoldDivider className="mb-5" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a]">
              Nos dernières réalisations
            </h2>
          </div>
          <LuxuryButton href="/boutique">
            Voir le catalogue
          </LuxuryButton>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Image principale */}
          <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryImages[current].src}
                  alt={galleryImages[current].alt}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 1280px"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            {/* Légende */}
            <div className="absolute bottom-0 left-0 right-0 px-8 py-5 bg-gradient-to-t from-[#0E0D06]/60 to-transparent pointer-events-none">
              <p className="text-white/80 text-sm font-medium tracking-wide">
                {galleryImages[current].alt}
              </p>
            </div>

            {/* Flèches */}
            <button
              onClick={prev}
              aria-label="Image précédente"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/30 bg-[#0E0D06]/40 text-white hover:bg-[#DCA54A] hover:border-[#DCA54A] transition-colors duration-300 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Image suivante"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-white/30 bg-[#0E0D06]/40 text-white hover:bg-[#DCA54A] hover:border-[#DCA54A] transition-colors duration-300 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Miniatures */}
          <div className="flex gap-2 mt-3">
            {galleryImages.map((img, i) => (
              <button
                key={img.src}
                onClick={() => go(i)}
                aria-label={`Afficher ${img.alt}`}
                className={cn(
                  "relative flex-1 h-16 overflow-hidden transition-all duration-300 cursor-pointer",
                  i === current ? "ring-2 ring-[#DCA54A] ring-offset-1" : "opacity-50 hover:opacity-80"
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  quality={60}
                  sizes="15vw"
                  className="object-cover object-center"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
