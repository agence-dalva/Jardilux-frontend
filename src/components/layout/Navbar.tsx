"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import LuxuryButton from "@/components/ui/LuxuryButton";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/boutique", label: "Boutique" },
  { href: "/a-propos", label: "À propos" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

/* Largeur max du contenu — standard 1280px (= Tailwind 7xl). */
const MAXW = "max-w-[1280px]";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  // Style « plein » (pilule en verre) : au scroll, ou sur toute page hors accueil.
  const solid = scrolled || !isHome;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
{/* Conteneur centré (max 1280px) */}
        <div className={cn("mx-auto px-4 pt-3", MAXW)}>
          {/* Barre principale — forme constante : seules la couleur de fond
              et la bordure transitionnent (blanc + doré) au scroll. */}
          <div
            className={cn(
              "flex items-center justify-between rounded-sm border px-6 py-3 transition-[background-color,border-color,box-shadow] duration-300 ease-out",
              solid
                ? "border-transparent bg-white shadow-[0_8px_30px_-12px_rgba(26,26,26,0.12)]"
                : "border-transparent bg-transparent"
            )}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Jardilux"
                width={140}
                height={48}
                className={cn(
                  "object-contain transition-all duration-500",
                  solid
                    ? "h-9 w-auto brightness-0"          // fond blanc → logo noir
                    : "h-10 w-auto brightness-0 invert"  // fond sombre → logo blanc
                )}
                priority
              />
            </Link>

            {/* Nav desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors duration-200",
                      active
                        ? solid
                          ? "text-[#9E7020]"
                          : "text-white"
                        : solid
                        ? "text-[#2d2d2d] hover:text-[#9E7020]"
                        : "text-white/85 hover:text-white"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className={cn(
                          "absolute -bottom-0.5 left-4 right-4 h-[2px] rounded-full",
                          solid ? "bg-[#c4992e]" : "bg-[#e8c86a]"
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
<LuxuryButton href="/boutique" size="sm" className="hidden md:inline-block">
                Notre catalogue
              </LuxuryButton>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "md:hidden p-2 rounded-full transition-colors",
                  solid
                    ? "text-[#2d2d2d] hover:bg-[#f0ead8]"
                    : "text-white hover:bg-white/15"
                )}
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#e0d8c8]">
                <Link href="/">
                  <Image
                    src="/logo.png"
                    alt="Jardilux"
                    width={110}
                    height={38}
                    className="object-contain brightness-0"
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-[#f0ead8]"
                >
                  <X size={20} className="text-[#2d2d2d]" />
                </button>
              </div>

              <div className="flex flex-col p-4 gap-1 flex-1 overflow-y-auto">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-colors",
                          active
                            ? "bg-[#f0ead8] text-[#9E7020] font-semibold"
                            : "text-[#2d2d2d] hover:bg-[#f8f5f0] hover:text-[#9E7020]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-[#e0d8c8]">
                <p className="text-xs text-[#5a5a5a] text-center">
                  📞 07 71 59 90 41 — contact@jardilux.fr
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
