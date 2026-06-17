"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Leaf, Award, Heart, Globe, Users, TrendingUp } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";
import LuxuryButton from "@/components/ui/LuxuryButton";

const milestones = [
  { year: "2019", event: "Fondation de Jardilux à Plancher-Bas (Haute-Saône)" },
  { year: "2020", event: "Ouverture de notre showroom et lancement du site e-commerce" },
  { year: "2021", event: "Participation au Salon de l'Habitat — 1ère édition" },
  { year: "2022", event: "Lancement de notre gamme premium de mobilier teck" },
  { year: "2023", event: "Plus de 300 clients satisfaits en France et en Europe" },
  { year: "2024", event: "Nouvelle collection Pergolas & Abris bioclimatiques" },
];

export default function AProposPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen bg-[#faf7f2]">

      {/* Hero */}
      <div className="relative bg-[#0E0D06] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/a-propos/a-propos.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
              Notre histoire
            </span>
            <GoldDivider className="mb-5 mx-auto" />
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
              À propos de Jardilux
            </h1>
            <p className="text-white/65 text-lg max-w-2xl mx-auto leading-relaxed">
              Une entreprise française dédiée à transformer votre espace extérieur
              en un lieu de vie élégant et fonctionnel.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-flex items-center gap-2">
                <Leaf size={14} />
                Notre mission
              </span>
              <GoldDivider className="mb-5" />
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight">
                Créer des espaces extérieurs{" "}
                <span className="text-[#DCA54A]">d'exception</span>
              </h2>
              <p className="text-[#5a5a5a] leading-relaxed mb-5">
                Jardilux, fondée en France, est dédiée à offrir des solutions innovantes
                pour la décoration de l'extérieur, tout en garantissant qualité et design
                exceptionnels.
              </p>
              <p className="text-[#5a5a5a] leading-relaxed mb-5">
                Notre équipe de passionnés sélectionne chaque produit avec soin, en privilégiant
                des matériaux durables, des designs contemporains et une excellente résistance
                aux conditions extérieures.
              </p>
              <p className="text-[#5a5a5a] leading-relaxed">
                Que vous souhaitiez aménager une terrasse, un jardin ou un balcon,
                nous avons les solutions pour créer l'espace de vos rêves.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="overflow-hidden aspect-[4/3]">
                <img
                  src="/images/a-propos/a-propos-image-2.jpg"
                  alt="Showroom Jardilux"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white border border-[#e8dcc8] p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <Heart size={18} className="text-[#DCA54A] flex-shrink-0" />
                  <div>
                    <p className="font-playfair font-bold text-[#1a1a1a] text-sm">Fait avec passion</p>
                    <p className="text-xs text-[#8a8078]">Depuis 2019 en France</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 bg-[#faf7f2]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
              Ce qui nous guide
            </span>
            <GoldDivider className="mb-5" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              Nos valeurs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8dcc8]">
            {[
              { icon: Award, title: "Excellence", desc: "Nous ne faisons aucun compromis sur la qualité de nos produits et services." },
              { icon: Globe, title: "Durabilité", desc: "Nous privilégions des matériaux eco-responsables et des fournisseurs éthiques." },
              { icon: Users, title: "Proximité", desc: "Une équipe à votre écoute pour vous accompagner dans chaque projet." },
              { icon: TrendingUp, title: "Innovation", desc: "Nous proposons les dernières tendances en décoration extérieure." },
              { icon: Heart, title: "Passion", desc: "Chaque produit est choisi avec soin par notre équipe de passionnés." },
              { icon: Leaf, title: "Nature", desc: "Créer des espaces qui s'harmonisent avec l'environnement naturel." },
            ].map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white p-8 hover:bg-[#faf7f2] transition-colors"
              >
                <val.icon size={22} className="text-[#DCA54A] mb-4" />
                <h3 className="font-playfair text-lg font-bold text-[#1a1a1a] mb-2">{val.title}</h3>
                <p className="text-[#5a5a5a] text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
              Depuis 2019
            </span>
            <GoldDivider className="mb-5" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              Notre parcours
            </h2>
          </div>
          <div className="relative max-w-2xl">
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-[#e8dcc8]" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex gap-6 mb-8 last:mb-0"
              >
                <div className="w-12 h-12 bg-[#0E0D06] border border-[#DCA54A] flex items-center justify-center flex-shrink-0 z-10">
                  <span className="text-[#DCA54A] text-xs font-bold tracking-wider">{m.year.slice(2)}</span>
                </div>
                <div className="flex-1 bg-[#faf7f2] border border-[#e8dcc8] p-4 mt-1">
                  <p className="text-[#DCA54A] font-bold text-sm mb-1">{m.year}</p>
                  <p className="text-[#2d2d2d] text-sm leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0E0D06] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/a-propos/a-propos-image-3.png"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
            Rejoignez-nous
          </span>
          <GoldDivider className="mb-5 mx-auto" />
          <h2 className="font-playfair text-4xl font-bold text-white mb-5">
            Rejoignez la famille Jardilux
          </h2>
          <p className="text-white/60 mb-10 max-w-md mx-auto">
            Des centaines de clients nous font confiance. À votre tour de créer l'extérieur de vos rêves.
          </p>
          <LuxuryButton href="/boutique">
            Découvrir nos produits
          </LuxuryButton>
        </div>
      </section>
    </div>
  );
}
