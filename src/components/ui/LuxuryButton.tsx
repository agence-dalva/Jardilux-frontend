"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

/* Couleur dorée Jardilux : rgb(220, 165, 74) = #DCA54A */
const GOLD = "#DCA54A";

interface LuxuryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm";
}

export default function LuxuryButton({ href, children, className, size = "default" }: LuxuryButtonProps) {
  const sm = size === "sm";
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-block overflow-hidden font-semibold uppercase tracking-[0.12em] bg-[#DCA54A] text-white",
        sm ? "px-4 py-2 text-xs tracking-[0.1em]" : "px-7 py-3 text-sm",
        className
      )}
    >
      {children}
      <span className={cn(
        "absolute h-px bg-white scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100",
        sm ? "bottom-1.5 left-4 right-4" : "bottom-2.5 left-7 right-7"
      )} />
    </Link>
  );
}
