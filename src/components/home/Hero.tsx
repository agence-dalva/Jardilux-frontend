'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import LuxuryButton from '@/components/ui/LuxuryButton';

/* Slides du header — image locale + 2 visuels (à remplacer par tes photos).
   next.config autorise déjà images.unsplash.com pour les placeholders. */
const SLIDES = [
  {
    src: '/images/home/header/header-1.jpg',
    alt: "Mobilier et décoration d'extérieur haut de gamme Jardilux",
  },
  {
    src: '/images/home/header/header-2.jpeg',
    alt: 'Salon de jardin et terrasse aménagée avec élégance',
  },
  {
    src: '/images/home/header/header-3.jpeg',
    alt: 'Décoration extérieure et luminaires Jardilux',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Slides — fondu enchaîné + léger ken-burns sur la slide active */}
      {SLIDES.map((slide, i) => (
        <div key={slide.src} aria-hidden={i !== current} className={cn('absolute inset-0 transition-opacity duration-1000 ease-in-out', i === current ? 'opacity-100' : 'opacity-0')}>
          <motion.div className="absolute inset-0" initial={false} animate={{ scale: i === current ? 1.12 : 1 }} transition={{ duration: 7, ease: 'easeOut' }}>
            <Image src={slide.src} alt={slide.alt} fill priority={i === 0} quality={90} sizes="100vw" className="object-cover object-center" />
          </motion.div>
        </div>
      ))}

      {/* Overlays cinématiques */}
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 hero-vignette" />

      {/* Contenu — aligné en bas à gauche */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] items-end px-6 pb-24 md:pb-28">
        <div className="max-w-2xl">
          {/* Surtitre — catégories (clair + SEO) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mb-5 text-xs md:text-sm font-medium uppercase tracking-[0.25em] text-[#e8c86a]"
          >
            Mobilier&nbsp;·&nbsp;Luminaires&nbsp;·&nbsp;Décoration d'extérieur
          </motion.p>

          {/* Titre principal (H1 SEO) */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.12] text-white"
          >
            Mobilier &amp; décoration d'extérieur <span className="text-[#DCA54A]">haut de gamme</span>
          </motion.h1>

          {/* Promesse — SEO + tout comprendre en 30 secondes */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/85"
          >
            <strong className="font-semibold text-white">Mobilier de jardin, luminaires et décorations d'extérieur</strong> d'exception pour sublimer votre terrasse, balcon ou jardin.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-9 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <LuxuryButton href="/boutique">Découvrir le catalogue</LuxuryButton>
          </motion.div>

          {/* Réassurance */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} className="mt-9 flex items-center gap-2 text-sm text-white/75">
            <span className="flex items-center gap-0.5 text-[#e8c86a]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span>100&nbsp;% de clients satisfaits</span>
          </motion.div>
        </div>
      </div>

      {/* Indicateurs du slider — bas à droite */}
      <div className="absolute bottom-10 right-6 z-10 flex items-center gap-2 md:right-[calc((100vw-1280px)/2+1.5rem)]">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => setCurrent(i)}
            aria-label={`Afficher la diapositive ${i + 1}`}
            className={cn('h-px transition-all duration-300 cursor-pointer', i === current ? 'w-10 bg-[#e8c86a]' : 'w-5 bg-white/40 hover:bg-white/70')}
          />
        ))}
      </div>
    </section>
  );
}
