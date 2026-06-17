"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { getStrapiImageUrl } from "@/lib/api";
import type { Produit } from "@/lib/types";

interface ProductCardProps {
  produit: Produit;
  className?: string;
}

export default function ProductCard({ produit, className }: ProductCardProps) {
  const img1 = produit.images?.[0]
    ? getStrapiImageUrl(produit.images[0])
    : null;
  const img2 = produit.images?.[1]
    ? getStrapiImageUrl(produit.images[1])
    : null;

  return (
    <Link
      href={`/boutique/${produit.slug}`}
      className={cn("group block relative overflow-hidden aspect-[3/4] bg-[#1a1812]", className)}
    >
      {/* Image principale */}
      {img1 && (
        <img
          src={img1}
          alt={produit.nom}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-700",
            img2 ? "group-hover:opacity-0" : ""
          )}
        />
      )}

      {/* Deuxième image au hover */}
      {img2 && (
        <img
          src={img2}
          alt={produit.nom}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      )}

      {/* Gradient bas */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D06]/80 via-[#0E0D06]/10 to-transparent" />

      {/* Badge sélection */}
      {produit.estVedette && (
        <span className="absolute top-3 left-3 px-3 py-1 bg-[#DCA54A] text-white text-[10px] font-semibold uppercase tracking-widest">
          Sélection
        </span>
      )}

      {/* Titre */}
      <div className="absolute bottom-0 inset-x-0 p-5">
        <h3 className="font-playfair text-white font-semibold text-base leading-snug group-hover:text-[#e8c86a] transition-colors duration-300">
          {produit.nom}
        </h3>
        {img2 && (
          <p className="mt-1 text-white/40 text-xs tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Voir l'autre vue →
          </p>
        )}
      </div>
    </Link>
  );
}
