"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Grid3X3, List, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import GoldDivider from "@/components/ui/GoldDivider";
import LuxuryButton from "@/components/ui/LuxuryButton";
import { formatPrice } from "@/lib/utils";
import { getStrapiImageUrl, getMockImageUrl } from "@/lib/api";
import type { Produit, Categorie } from "@/lib/types";

interface BoutiqueViewProps {
  produits: Produit[];
  categories: Categorie[];
}

export default function BoutiqueView({ produits, categories }: BoutiqueViewProps) {
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [onlyVedette, setOnlyVedette] = useState(false);
  const [onlyEnStock, setOnlyEnStock] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo<Produit[]>(() => {
    let list = [...produits];
    if (selectedCat) list = list.filter((p) => p.categorie?.slug === selectedCat);
    if (onlyVedette) list = list.filter((p) => p.estVedette);
    if (onlyEnStock) list = list.filter((p) => p.enStock);
    return list;
  }, [produits, selectedCat, onlyVedette, onlyEnStock]);

  return (
    <>
      {/* Hero */}
      <div className="relative pb-20 bg-[#0E0D06] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/home/boutique-hero.jpg"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 pt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
              Notre catalogue
            </span>
            <GoldDivider className="mb-5 mx-auto" />
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
              La Boutique Jardilux
            </h1>
            <p className="text-white/65 max-w-xl mx-auto text-base">
              {produits.length} produits soigneusement sélectionnés pour sublimer votre espace extérieur.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Barre filtres */}
      <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-md border-b border-[#e0d8c8] shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center gap-4">

          {/* Dropdown catégorie */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedCat ?? ""}
              onChange={(e) => setSelectedCat(e.target.value || null)}
              className="w-full appearance-none px-4 pr-8 py-2.5 border border-[#e0d8c8] bg-[#faf7f2] text-sm text-[#2d2d2d] focus:outline-none focus:border-[#DCA54A] cursor-pointer transition-colors"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.nom}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a8078]" />
          </div>

          {/* Tri — date d'ajout uniquement */}
          <span className="text-xs text-[#8a8078] uppercase tracking-wider hidden sm:inline">
            Tri&nbsp;: récents en premier
          </span>

          {/* Filtres avancés */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`ml-auto p-2.5 border transition-colors cursor-pointer flex items-center gap-2 text-xs font-medium uppercase tracking-wider ${
              showFilters || onlyVedette || onlyEnStock
                ? "bg-[#DCA54A] text-white border-[#DCA54A]"
                : "border-[#e0d8c8] text-[#2d2d2d] hover:border-[#DCA54A]"
            }`}
          >
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Filtres</span>
          </button>

          {/* Vue grid / list */}
          <div className="flex border border-[#e0d8c8] overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 transition-colors cursor-pointer ${viewMode === "grid" ? "bg-[#DCA54A] text-white" : "text-[#2d2d2d] hover:bg-[#f0ead8]"}`}
            >
              <Grid3X3 size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 transition-colors cursor-pointer ${viewMode === "list" ? "bg-[#DCA54A] text-white" : "text-[#2d2d2d] hover:bg-[#f0ead8]"}`}
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Filtres avancés */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-[#e0d8c8]"
            >
              <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm text-[#2d2d2d]">
                  <input
                    type="checkbox"
                    checked={onlyVedette}
                    onChange={(e) => setOnlyVedette(e.target.checked)}
                    className="border-[#DCA54A] text-[#DCA54A] focus:ring-[#DCA54A]"
                  />
                  Sélection uniquement
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-[#2d2d2d]">
                  <input
                    type="checkbox"
                    checked={onlyEnStock}
                    onChange={(e) => setOnlyEnStock(e.target.checked)}
                    className="border-[#DCA54A] text-[#DCA54A] focus:ring-[#DCA54A]"
                  />
                  En stock uniquement
                </label>
                {(onlyVedette || onlyEnStock) && (
                  <button
                    onClick={() => { setOnlyVedette(false); setOnlyEnStock(false); }}
                    className="text-xs text-[#8a8078] hover:text-[#DCA54A] underline ml-auto cursor-pointer"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corps */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-[#5a5a5a] text-sm">
            <span className="font-semibold text-[#1a1a1a]">{filtered.length}</span>{" "}
            produit{filtered.length !== 1 ? "s" : ""}
            {selectedCat && (
              <> — <span className="text-[#DCA54A]">{categories.find((c) => c.slug === selectedCat)?.nom}</span></>
            )}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-playfair text-2xl text-[#8a8078] mb-3">Aucun produit trouvé</p>
            <p className="text-[#8a8078] text-sm mb-8">Essayez de modifier vos critères de recherche.</p>
            <button
              onClick={() => { setSelectedCat(null); setOnlyVedette(false); setOnlyEnStock(false); }}
              className="px-6 py-3 bg-[#DCA54A] text-white text-sm font-semibold uppercase tracking-wider hover:bg-[#c4992e] transition-colors cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className={`grid gap-4 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((produit, i) => (
                <motion.div
                  key={produit.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  {viewMode === "grid" ? (
                    <ProductCard produit={produit} />
                  ) : (
                    <ProductCardList produit={produit} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </>
  );
}

function ProductCardList({ produit }: { produit: Produit }) {
  const imageUrl = produit.images?.[0]
    ? getStrapiImageUrl(produit.images[0], "small")
    : getMockImageUrl(produit.slug);

  return (
    <Link
      href={`/boutique/${produit.slug}`}
      className="group flex gap-5 bg-white border border-[#e0d8c8] hover:border-[#DCA54A] hover:shadow-sm p-4 transition-all duration-300"
    >
      <div className="w-28 h-28 overflow-hidden flex-shrink-0 bg-[#faf7f2]">
        <img src={imageUrl} alt={produit.nom} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="flex-1 min-w-0">
        {produit.categorie && (
          <span className="text-[#DCA54A] text-xs font-semibold uppercase tracking-wider">{produit.categorie.nom}</span>
        )}
        <h3 className="font-playfair text-lg font-bold text-[#1a1a1a] mb-1 mt-0.5 group-hover:text-[#DCA54A] transition-colors">{produit.nom}</h3>
        <p className="text-[#5a5a5a] text-xs line-clamp-2 mb-2">{produit.descriptionCourte}</p>
        <div className="flex items-center gap-3">
          {produit.estVedette && (
            <span className="px-2 py-0.5 bg-[#DCA54A] text-white text-[10px] font-semibold uppercase tracking-widest">Sélection</span>
          )}
          {!produit.enStock && (
            <span className="px-2 py-0.5 border border-[#e0d8c8] text-[#8a8078] text-[10px] font-medium uppercase tracking-wider">Sur commande</span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end justify-between flex-shrink-0">
        <div className="w-8 h-8 bg-[#f0ead8] group-hover:bg-[#DCA54A] flex items-center justify-center transition-colors">
          <ArrowRight size={14} className="text-[#DCA54A] group-hover:text-white transition-colors" />
        </div>
      </div>
    </Link>
  );
}
