"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import NumberTicker from "@/components/ui/NumberTicker";
import { Users, Package, Star, Trophy } from "lucide-react";

const stats = [
  { icon: Users, value: 500, suffix: "+", label: "Clients satisfaits", sublabel: "En France et en Europe" },
  { icon: Package, value: 470, suffix: "+", label: "Produits disponibles", sublabel: "Renouvelés chaque saison" },
  { icon: Star, value: 4.9, suffix: "/5", label: "Note moyenne", sublabel: "Basée sur 200+ avis" },
  { icon: Trophy, value: 5, suffix: " ans", label: "D'expérience", sublabel: "Au service de l'extérieur" },
];

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-[#9E7020] via-[#3d6a20] to-[#DCA54A] relative overflow-hidden"
    >
      {/* Décor bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3">
            Jardilux en chiffres
          </h2>
          <div className="w-16 h-1 bg-[#c4992e] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/15 group-hover:bg-[#c4992e] flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <stat.icon size={24} className="text-white" />
              </div>
              <p className="font-playfair text-4xl font-bold text-[#e8c86a] mb-1">
                {inView && (
                  <NumberTicker
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={1800}
                  />
                )}
              </p>
              <p className="text-white font-semibold text-sm mb-0.5">{stat.label}</p>
              <p className="text-white/50 text-xs">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
