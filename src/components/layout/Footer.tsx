import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import LuxuryButton from "@/components/ui/LuxuryButton";

const footerLinks = {
  navigation: [
    { href: "/", label: "Accueil" },
    { href: "/boutique", label: "Boutique" },
    { href: "/a-propos", label: "À propos" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  categories: [
    { href: "/boutique?cat=mobilier", label: "Mobilier de jardin" },
    { href: "/boutique?cat=luminaires", label: "Luminaires extérieurs" },
    { href: "/boutique?cat=decoration", label: "Décoration extérieure" },
    { href: "/boutique?cat=pergolas", label: "Pergolas & Abris" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Contenu footer */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <Image
              src="/logo.png"
              alt="Jardilux"
              width={130}
              height={44}
              className="object-contain"
            />
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-5">
            Jardilux, fondée en France, est dédiée à offrir des solutions innovantes
            pour la décoration extérieure, tout en garantissant qualité et design exceptionnels.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com/sarljardilux"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c4992e] flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href="https://instagram.com/sarljardilux"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#c4992e] flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-widest text-[#c4992e] mb-5">
            Navigation
          </h4>
          <ul className="space-y-2.5">
            {footerLinks.navigation.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Catégories */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-widest text-[#c4992e] mb-5">
            Nos produits
          </h4>
          <ul className="space-y-2.5">
            {footerLinks.categories.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-widest text-[#c4992e] mb-5">
            Contact
          </h4>
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3">
              <MapPin size={15} className="text-[#E8C870] mt-0.5 flex-shrink-0" />
              <span className="text-white/60 text-sm">
                28 rue de l'écluse<br />
                70290 PLANCHER-BAS
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={15} className="text-[#E8C870] flex-shrink-0" />
              <a href="tel:0771599041" className="text-white/60 hover:text-white text-sm transition-colors">
                07 71 59 90 41
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={15} className="text-[#E8C870] flex-shrink-0" />
              <a href="mailto:contact@jardilux.fr" className="text-white/60 hover:text-white text-sm transition-colors">
                contact@jardilux.fr
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-white/40 text-xs">
          <p>© {new Date().getFullYear()} Jardilux — Tous droits réservés</p>
          <p className="text-white/25">
            Site réalisé par{" "}
            <a
              href="https://www.agence-dalva.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors underline underline-offset-2"
            >
              l'agence Web DALVA
            </a>
          </p>
          <p>SARL Jardilux — SIRET 939 398 731 00017</p>
        </div>
      </div>
    </footer>
  );
}
