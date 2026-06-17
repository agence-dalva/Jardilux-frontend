"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";

/* Avis clients Google (5★) — seuls les avis rédigés sont affichés.
   Prénom + initiale du nom, façon « Margot C. ». */
const avis = [
  {
    nom: "Margot C.",
    texte:
      "Très beaux produits, de grande qualité. Une belle adresse pour ceux qui recherchent des articles de jardin haut de gamme.",
  },
  {
    nom: "Nelly K.",
    texte:
      "Suite à la réfection de notre terrasse, nous avons fait l'acquisition de luminaires solaires auprès de la société Jardilux, qui nous a proposé un large choix.",
  },
  {
    nom: "Marilou B.",
    texte: "Mobilier de très bonne qualité.",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="bg-[#0E0D06] py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#DCA54A]">
            Avis clients
          </span>
          <GoldDivider className="mb-5 mx-auto" />
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
            Ils nous font{" "}
            <span className="text-[#DCA54A]">confiance</span>
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-white/60">
            <span className="flex items-center gap-0.5 text-[#e8c86a]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            5,0 sur Google · 100&nbsp;% de clients satisfaits
          </div>
        </motion.div>

        {/* Cartes d'avis */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {avis.map((a, i) => (
            <motion.figure
              key={a.nom}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-[#2E2D2A]/60 p-8 transition-colors duration-300 hover:border-[#DCA54A]/50"
            >
              <Quote
                size={36}
                className="mb-4 text-[#DCA54A]/40"
                fill="currentColor"
                strokeWidth={0}
              />

              <span className="mb-4 flex items-center gap-0.5 text-[#e8c86a]">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </span>

              <blockquote className="flex-1 text-[15px] leading-relaxed text-white/85">
                « {a.texte} »
              </blockquote>

              <figcaption className="mt-6 font-playfair text-lg font-semibold text-[#e8c86a]">
                {a.nom}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
