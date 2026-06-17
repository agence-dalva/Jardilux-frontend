"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Armchair, Lightbulb, Flower2, Home, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Armchair,
    slug: "mobilier",
    title: "Mobilier de jardin",
    desc: "Tables, chaises, salons de jardin, chaises longues... Des créations alliant résistance aux intempéries et élégance contemporaine.",
    count: "150+ références",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    icon: Lightbulb,
    slug: "luminaires",
    title: "Luminaires extérieurs",
    desc: "Lanternes, guirlandes, bornes lumineuses, spots solaires... Créez des ambiances lumineuses magiques pour vos soirées en extérieur.",
    count: "80+ références",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    icon: Flower2,
    slug: "decoration",
    title: "Décoration extérieure",
    desc: "Fontaines, pots design, sculptures, tapis d'extérieur... Personnalisez votre espace avec des pièces décoratives uniques et durables.",
    count: "200+ références",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80",
  },
  {
    icon: Home,
    slug: "pergolas",
    title: "Pergolas & Abris",
    desc: "Pergolas bioclimatiques, auvents, carports... Protégez et embellissez votre terrasse tout en profitant de votre extérieur en toute saison.",
    count: "40+ références",
    img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80",
  },
];

export default function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-[#faf7f2] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[#DCA54A] font-semibold text-sm uppercase tracking-widest mb-3">
            Nos catégories
          </span>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Tout pour votre{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4992e] to-[#e8c86a]">
              jardin
            </span>
          </h2>
          <p className="text-[#5a5a5a] max-w-xl mx-auto leading-relaxed">
            De la conception à la mise en place, nous vous accompagnons pour créer
            un extérieur à votre image.
          </p>
        </motion.div>

        {/* Grille services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/boutique?cat=${service.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 h-72 block"
              >
                {/* Image */}
                <img
                  src={service.img}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent group-hover:from-[#9E7020]/75 transition-all duration-500" />

                {/* Contenu */}
                <div className="relative mt-auto p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <service.icon size={16} className="text-white" />
                    </div>
                    <span className="text-[#e8c86a] text-xs font-medium">{service.count}</span>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-white mb-1">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3 text-[#e8c86a] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Voir les produits
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
