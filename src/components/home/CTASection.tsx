"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import LuxuryButton from "@/components/ui/LuxuryButton";
import GoldDivider from "@/components/ui/GoldDivider";

export default function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden py-32">
      {/* Image de fond */}
      <Image
        src="/images/DSC_9073.jpg"
        alt="Extérieur Jardilux"
        fill
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Overlay sombre neutre */}
      <div className="absolute inset-0 bg-[#0E0D06]/78" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#DCA54A]">
            Passez à l'action
          </span>
          <GoldDivider className="mb-6" />
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Prêt à embellir{" "}
            <span className="text-[#DCA54A]">votre extérieur ?</span>
          </h2>
          <p className="text-white/65 text-lg mb-12 max-w-xl leading-relaxed">
            Explorez notre sélection et laissez-vous inspirer. Notre équipe est
            disponible pour vous accompagner dans chaque projet.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-8">
            <LuxuryButton href="/boutique">
              Découvrir le catalogue
            </LuxuryButton>
            <LuxuryButton href="/contact">
              Nous contacter
            </LuxuryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
