"use client";

import { motion } from "framer-motion";
import { Armchair, Lightbulb, Flower2, Pencil, MessageSquare, Package, Wrench, CheckCircle } from "lucide-react";
import Link from "next/link";
import GoldDivider from "@/components/ui/GoldDivider";
import LuxuryButton from "@/components/ui/LuxuryButton";

const services = [
  {
    num: "01",
    icon: Armchair,
    title: "Mobilier de jardin",
    slug: "mobilier-de-jardin",
    desc: "Une gamme élégante de mobilier de jardin conçue pour allier confort et esthétique. Chaises, tables, salons et sets de détente pensés pour sublimer vos espaces extérieurs tout en résistant aux conditions climatiques.",
    img: "/images/services/service-2.jpeg",
    items: ["Salons de jardin", "Tables et chaises", "Chaises longues et transats", "Canapés et fauteuils", "Hamacs et balancelles"],
  },
  {
    num: "02",
    icon: Lightbulb,
    title: "Luminaires extérieurs",
    slug: "luminaires-exterieurs",
    desc: "Des solutions d'éclairage qui combinent design élégant et fonctionnalité. Guirlandes, lanternes et appliques murales pour créer des ambiances chaleureuses et accueillantes dans votre jardin ou votre terrasse.",
    img: "/images/services/service-3.jpeg",
    items: ["Lanternes décoratives", "Guirlandes lumineuses", "Spots et bornes", "Projecteurs LED", "Luminaires solaires"],
  },
  {
    num: "03",
    icon: Flower2,
    title: "Décoration extérieure",
    slug: "decorations-exterieurs",
    desc: "Des accessoires variés — statues, jardinières et pots design — sélectionnés avec soin pour apporter harmonie et beauté à vos jardins et terrasses. Chaque pièce est choisie pour sa qualité et sa résistance aux intempéries.",
    img: "/images/services/service-4.jpeg",
    items: ["Fontaines et jets d'eau", "Pots et jardinières design", "Sculptures et statues", "Tapis d'extérieur", "Coussins déhoussables"],
  },
  {
    num: "04",
    icon: Pencil,
    title: "Conseil en design",
    slug: "",
    desc: "Nos conseillers experts vous accompagnent dans la sélection de produits qui correspondent à vos goûts et aux exigences de votre espace extérieur. Un accompagnement personnalisé, du choix des matériaux jusqu'à la mise en place.",
    img: "/images/services/service-5.jpeg",
    items: ["Analyse de votre espace", "Recommandations personnalisées", "Choix des matériaux", "Coordination des commandes", "Suivi de projet"],
  },
];

const process = [
  { icon: MessageSquare, num: "1", title: "Consultation personnalisée", desc: "Échange avec nos experts pour comprendre vos besoins, vos goûts et les contraintes de votre espace extérieur." },
  { icon: Package, num: "2", title: "Sélection sur mesure", desc: "Nous vous proposons une sélection de produits parfaitement adaptés à votre projet et à votre budget." },
  { icon: Wrench, num: "3", title: "Installation professionnelle", desc: "Notre équipe assure la livraison et l'installation soignée de vos mobiliers, luminaires et décorations." },
  { icon: CheckCircle, num: "4", title: "Suivi post-installation", desc: "Nous restons disponibles après la livraison pour garantir votre satisfaction et répondre à vos questions." },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#faf7f2]">

      {/* Hero */}
      <div className="relative bg-[#0E0D06] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/service-1.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-35"
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-24 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
              Ce que nous proposons
            </span>
            <GoldDivider className="mb-5 mx-auto" />
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
              Services pour embellir<br />votre extérieur
            </h1>
            <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
              De la sélection des produits à l'installation, Jardilux vous accompagne
              dans chaque étape de votre projet extérieur.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Services principaux */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
              Notre gamme
            </span>
            <GoldDivider className="mb-5" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              Nos catégories de produits
            </h2>
            <p className="text-[#5a5a5a] mt-3 max-w-xl">
              Une gamme complète pour tous vos besoins en aménagement extérieur.
            </p>
          </div>

          <div className="space-y-20">
            {services.map((svc, i) => (
              <motion.div
                key={svc.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-playfair text-4xl font-bold text-[#e8dcc8] leading-none select-none">
                      {svc.num}
                    </span>
                    <div className="w-10 h-10 bg-[#DCA54A] flex items-center justify-center flex-shrink-0">
                      <svc.icon size={18} className="text-white" />
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-[#1a1a1a]">{svc.title}</h3>
                  </div>
                  <p className="text-[#5a5a5a] leading-relaxed mb-6">{svc.desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {svc.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[#2d2d2d] text-sm">
                        <span className="w-px h-4 bg-[#DCA54A] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {svc.slug && (
                    <Link
                      href={`/boutique?cat=${svc.slug}`}
                      className="inline-flex items-center gap-2 text-[#DCA54A] font-semibold text-sm uppercase tracking-wider hover:opacity-70 transition-opacity"
                    >
                      Voir les produits →
                    </Link>
                  )}
                </div>
                <div className={`overflow-hidden aspect-[4/3] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre processus */}
      <section className="py-20 bg-[#faf7f2]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
              Comment ça se passe
            </span>
            <GoldDivider className="mb-5" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              Notre processus
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e8dcc8]">
            {process.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white p-8 hover:bg-[#faf7f2] transition-colors"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-playfair text-3xl font-bold text-[#e8dcc8] leading-none select-none">{step.num}</span>
                  <div className="w-10 h-10 bg-[#DCA54A] flex items-center justify-center">
                    <step.icon size={18} className="text-white" />
                  </div>
                </div>
                <h3 className="font-playfair text-lg font-bold text-[#1a1a1a] mb-3">{step.title}</h3>
                <p className="text-[#5a5a5a] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0E0D06] relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/service-1.jpeg"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
            Parlons de votre projet
          </span>
          <GoldDivider className="mb-5 mx-auto" />
          <h2 className="font-playfair text-4xl font-bold text-white mb-5">
            Un projet en tête ?
          </h2>
          <p className="text-white/60 mb-10 max-w-md mx-auto">
            Contactez-nous pour obtenir un devis personnalisé et des conseils d'experts.
          </p>
          <LuxuryButton href="/contact">
            Obtenir un devis gratuit
          </LuxuryButton>
        </div>
      </section>
    </div>
  );
}
