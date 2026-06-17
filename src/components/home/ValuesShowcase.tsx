"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import GoldDivider from "@/components/ui/GoldDivider";

const values = [
  {
    title: "Qualité supérieure",
    desc: "Des produits sélectionnés pour leur durabilité et leur design d'exception.",
  },
  {
    title: "Design innovant",
    desc: "Des créations originales, pensées avec des designers de talent.",
  },
  {
    title: "Service personnalisé",
    desc: "Une équipe qui vous conseille pour créer l'extérieur de vos rêves.",
  },
];

export default function ValuesShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section ref={ref} className="bg-[#0E0D06] py-24 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Texte — droite (order-2 sur desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:order-2"
          >
            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#DCA54A]">
              Notre engagement
            </span>
            <GoldDivider className="mb-6" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold leading-tight text-white mb-12">
              L'exigence du beau,{" "}
              <span className="text-[#DCA54A]">du durable</span>
            </h2>

            {/* Liste des valeurs — style éditorial, séparateurs */}
            <div className="divide-y divide-white/10">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                  className="py-4"
                >
                  <p className="font-playfair text-lg font-semibold text-white mb-1">
                    {v.title}
                  </p>
                  <p className="text-sm leading-relaxed text-white/60">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image — gauche (order-1 sur desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:order-1"
          >
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[#DCA54A]/12 blur-3xl" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              <Image
                src="/images/ca01500_2.jpg"
                alt="Création extérieure Jardilux"
                fill
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
