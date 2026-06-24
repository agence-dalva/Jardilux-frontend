"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import GoldDivider from "@/components/ui/GoldDivider";
import LuxuryButton from "@/components/ui/LuxuryButton";
import ProductCard from "@/components/shop/ProductCard";
import type { Produit } from "@/lib/types";

/* ─── Accordion item ───────────────────────────────────────────────────── */
function AccordionItem({
  title,
  children,
  defaultOpen = false,
  controlOpen,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  controlOpen?: boolean;
  onToggle?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlOpen !== undefined ? controlOpen : internalOpen;
  const setOpen = (v: boolean | ((prev: boolean) => boolean)) => {
    const next = typeof v === "function" ? v(open) : v;
    setInternalOpen(next);
    onToggle?.(next);
  };
  return (
    <div className="border-b border-[#e8dcc8]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1a1a1a] group-hover:text-[#DCA54A] transition-colors duration-200">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#DCA54A] flex-shrink-0 ml-4"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-[#5a5a5a] text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RichHtml({ html }: { html: string }) {
  return (
    <div
      className="prose prose-sm max-w-none text-[#5a5a5a] [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_h2]:font-semibold [&_h2]:text-[#1a1a1a] [&_h3]:font-semibold [&_h3]:text-[#1a1a1a]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ─── Main component ───────────────────────────────────────────────────── */
export default function ProductDetailView({
  produit,
  images,
  related,
}: {
  produit: Produit;
  images: string[];
  related: Produit[];
}) {
  const [activeImage, setActiveImage] = useState(0);
  const [descOpen, setDescOpen] = useState(false);

  const isDark = images.some((url) => /[-_]dark\b/i.test(url));
  const descAccordionRef = useRef<HTMLDivElement>(null);

  const prev = () => setActiveImage((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveImage((i) => (i + 1) % images.length);

  function scrollToDescription() {
    setDescOpen(true);
    setTimeout(() => {
      descAccordionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  /* Formate un texte brut en paragraphes (split sur les sauts de ligne) */
  function paragraphs(text: string) {
    return text.split(/\n+/).map((p, i) => (
      <p key={i} className={i > 0 ? "mt-3" : ""}>{p.trim()}</p>
    ));
  }

  /* Rendu HTML riche (TipTap) — true si le contenu est vide */
  function isEmptyHtml(html: string | null | undefined): boolean {
    if (!html) return true;
    return html.replace(/<[^>]+>/g, "").trim().length === 0;
  }

  const allSections: { title: string; node: React.ReactNode }[] = [
    produit.description
      ? { title: "Description", node: paragraphs(produit.description) }
      : null,
    produit.dimensions
      ? {
          title: "Dimensions",
          node: (
            <div className="space-y-1.5">
              {produit.dimensions.split("\n").map((line, i) => {
                const [label, ...rest] = line.split(":");
                const value = rest.join(":").trim();
                return (
                  <div key={i} className="flex items-baseline gap-1.5">
                    <span className="font-semibold text-[#1a1a1a] w-24 shrink-0">{label.trim()} :</span>
                    <span>{value}</span>
                  </div>
                );
              })}
            </div>
          ),
        }
      : null,
    produit.materiaux
      ? { title: "Matériaux", node: produit.materiaux }
      : null,
    produit.couleurs
      ? { title: "Coloris disponibles", node: produit.couleurs }
      : null,
    !isEmptyHtml(produit.nettoyage)
      ? { title: "Nettoyage & Entretien", node: <RichHtml html={produit.nettoyage!} /> }
      : null,
    !isEmptyHtml(produit.details_technique)
      ? { title: "Détails techniques", node: <RichHtml html={produit.details_technique!} /> }
      : null,
  ].filter(Boolean) as { title: string; node: React.ReactNode }[];

  return (
    <div className="min-h-screen bg-[#faf7f2]">

      {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 pt-6 pb-6">
        <nav className="flex items-center gap-2 text-xs text-[#8a8078] flex-wrap">
          <Link href="/" className="hover:text-[#DCA54A] transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:text-[#DCA54A] transition-colors">Boutique</Link>
          {produit.categorie && (
            <>
              <span>/</span>
              <Link
                href={`/boutique?cat=${produit.categorie.slug}`}
                className="hover:text-[#DCA54A] transition-colors"
              >
                {produit.categorie.nom}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-[#1a1a1a] font-medium">{produit.nom}</span>
        </nav>
      </div>

      {/* ── Produit (2 colonnes) ───────────────────────────────────────── */}
      <div className="max-w-[1280px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — Image viewer ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            {/* Image principale */}
            <div className="relative aspect-square overflow-hidden bg-white mb-2 group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  src={images[activeImage]}
                  alt={produit.nom}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>

              {/* Badge */}
              {produit.estVedette && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#DCA54A] text-white text-[10px] font-semibold uppercase tracking-widest">
                  Sélection
                </span>
              )}

              {/* Flèches navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Image précédente"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-[#DCA54A] hover:text-white text-[#1a1a1a] transition-colors duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Image suivante"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-[#DCA54A] hover:text-white text-[#1a1a1a] transition-colors duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Indicateur */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={cn(
                          "h-1 rounded-full transition-all duration-300 cursor-pointer",
                          i === activeImage ? "w-6 bg-[#DCA54A]" : "w-3 bg-white/60 hover:bg-white"
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={cn(
                      "w-16 h-16 flex-shrink-0 overflow-hidden border transition-all duration-200 cursor-pointer",
                      i === activeImage
                        ? "border-[#DCA54A]"
                        : "border-transparent opacity-50 hover:opacity-90"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* RIGHT — Informations produit ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28"
          >
            {/* Catégorie */}
            {produit.categorie && (
              <Link
                href={`/boutique?cat=${produit.categorie.slug}`}
                className="inline-block text-[#DCA54A] text-xs font-semibold uppercase tracking-[0.22em] mb-4 hover:opacity-70 transition-opacity"
              >
                {produit.categorie.nom}
              </Link>
            )}

            <GoldDivider className="mb-5" />

            {/* Titre */}
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight mb-5">
              {produit.nom}
            </h1>

            {/* Prix */}
            {produit.prix > 0 && (
              <div className="mb-4">
                <span className="font-playfair text-3xl text-[#1a1a1a] font-semibold">
                  {formatPrice(produit.prix)}
                </span>
              </div>
            )}

            {/* Description avec "Voir plus" */}
            {produit.description && (
              <div className="mb-6">
                <p className="text-[#5a5a5a] leading-relaxed text-base line-clamp-3">
                  {produit.description}
                </p>
                <button
                  onClick={scrollToDescription}
                  className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#DCA54A] hover:opacity-70 transition-opacity cursor-pointer"
                >
                  Voir plus →
                </button>
              </div>
            )}


            {/* Disponibilité */}
            <div className="flex items-center gap-2.5 mb-10">
              <span
                className={cn(
                  "w-2 h-2 rounded-full flex-shrink-0",
                  produit.enStock ? "bg-[#DCA54A]" : "bg-[#8a8078]"
                )}
              />
              <span className="text-sm text-[#2d2d2d]">
                {produit.enStock
                  ? "En stock"
                  : "Sur commande — délai 2 à 4 semaines"}
              </span>
            </div>

            {/* CTA */}
            <div className="mb-5">
              <LuxuryButton href="/contact" className="w-full text-center">
                Demander un devis
              </LuxuryButton>
            </div>

            <p className="text-[#8a8078] text-xs text-center">
              Site vitrine — pas de vente en ligne. Contactez-nous pour toute commande.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Metadata accordion (full-width, blanc) ─────────────────────── */}
      {allSections.length > 0 && (
        <div className="bg-white border-t border-[#e8dcc8]">
          <div className="max-w-[1280px] mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24">
              <div className="border-t border-[#e8dcc8]">
                {allSections.map((s, i) => {
                  const isDesc = s.title === "Description";
                  return (
                    <div key={s.title} ref={isDesc ? descAccordionRef : undefined}>
                      <AccordionItem
                        title={s.title}
                        defaultOpen={i === 0}
                        controlOpen={isDesc ? descOpen : undefined}
                        onToggle={isDesc ? setDescOpen : undefined}
                      >
                        {s.node}
                      </AccordionItem>
                    </div>
                  );
                })}
              </div>

              {/* Bloc garanties Jardilux */}
              <div className="mt-10 lg:mt-0">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#DCA54A] mb-4 block">
                  L'engagement Jardilux
                </span>
                <GoldDivider className="mb-6" />
                <div className="space-y-5">
                  {[
                    ["Qualité sélectionnée", "Chaque produit est rigoureusement choisi pour sa durabilité et son design."],
                    ["Livraison soignée", "Expédition protégée et livraison offerte dès 500 € d'achat."],
                    ["Service personnalisé", "Notre équipe vous accompagne de la sélection à l'installation."],
                    ["Garantie constructeur", "Tous nos produits sont couverts par la garantie fabricant."],
                  ].map(([titre, desc]) => (
                    <div key={titre} className="grid grid-cols-[auto_1fr] gap-3 items-start">
                      <span className="w-px h-8 bg-[#DCA54A] mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm text-[#1a1a1a] mb-0.5">{titre}</p>
                        <p className="text-xs text-[#5a5a5a] leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Produits similaires (fond sombre) ──────────────────────────── */}
      {related.length > 0 && (
        <div className="bg-[#0E0D06] py-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.25em] text-[#DCA54A]">
                  Dans la même collection
                </span>
                <GoldDivider className="mb-5" />
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                  Vous aimerez aussi
                </h2>
              </div>
              <LuxuryButton href={`/boutique?cat=${produit.categorie?.slug ?? ""}`}>
                Voir la collection
              </LuxuryButton>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <ProductCard produit={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
