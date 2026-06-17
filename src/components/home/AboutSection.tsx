"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Leaf } from "lucide-react";
import LuxuryButton from "@/components/ui/LuxuryButton";
import GoldDivider from "@/components/ui/GoldDivider";

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={16} className="text-[#DCA54A]" />
              <span className="text-[#DCA54A] font-medium text-xs uppercase tracking-[0.25em]">
                Notre histoire
              </span>
            </div>
            <GoldDivider className="mb-6" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6 leading-tight">
              L'élégance au{" "}
              <span className="text-[#DCA54A]">cœur</span>{" "}
              du jardin
            </h2>
            <p className="text-[#5a5a5a] leading-relaxed mb-5 text-base">
              Jardilux, fondée en France, est dédiée à offrir des solutions innovantes
              pour la décoration de l'extérieur, tout en garantissant qualité et design
              exceptionnels.
            </p>
            <p className="text-[#5a5a5a] leading-relaxed mb-10 text-base">
              Notre mission : transformer chaque jardin, terrasse ou balcon en un espace
              de vie raffiné, où chaque détail compte et où le confort rencontre l'esthétique.
            </p>
            <LuxuryButton href="/a-propos">
              En savoir plus sur nous
            </LuxuryButton>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl">
              <Image
                src="/images/TA02281 AMB.jpg"
                alt="Création extérieure Jardilux"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
            </div>

            <div className="absolute -top-5 -right-5 w-28 h-28 rounded-full bg-[#f0ead8] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
