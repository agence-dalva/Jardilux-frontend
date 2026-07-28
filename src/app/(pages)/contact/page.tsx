"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { contactSchema } from "@/lib/contactSchema";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msgLen, setMsgLen] = useState(0);

  const handleSubmit = async () => {
    if (!formRef.current) return;

    const fd = new FormData(formRef.current);
    // Honeypot
    if (fd.get("website")) return;

    const data = {
      nom:       String(fd.get("nom") ?? "").trim(),
      prenom:    String(fd.get("prenom") ?? "").trim(),
      email:     String(fd.get("email") ?? "").trim(),
      telephone: String(fd.get("telephone") ?? "").trim(),
      sujet:     String(fd.get("sujet") ?? "").trim(),
      message:   String(fd.get("message") ?? "").trim(),
    };

    const result = contactSchema.safeParse(data);
    if (!result.success) {
      const errs = result.error.flatten().fieldErrors;
      setFieldErrors(Object.fromEntries(
        Object.entries(errs).map(([k, v]) => [k, v?.[0] ?? ""])
      ));
      return;
    }

    setFieldErrors({});
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setSubmitError("Une erreur est survenue. Veuillez réessayer ou nous contacter par téléphone.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-[#e0d8c8] bg-[#faf7f2] text-sm text-[#1a1a1a] placeholder-[#8a8078] focus:outline-none focus:border-[#DCA54A] transition-colors";

  return (
    <div className="min-h-screen bg-[#faf7f2]">

      {/* Hero */}
      <div className="relative pb-24 bg-[#0E0D06] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/contact/contact-hero.jpg" alt="" className="w-full h-full object-cover opacity-25" />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-0 text-center">
          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
              Parlons de votre projet
            </span>
            <GoldDivider className="mb-5 mx-auto" />
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-5 leading-tight">
              Contactez-nous
            </h1>
            <p className="text-white/65 text-lg max-w-lg mx-auto leading-relaxed">
              Notre équipe est à votre écoute pour tout renseignement sur nos produits
              et pour vous accompagner dans votre projet.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Corps */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Infos contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 order-2 lg:order-1"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
                Nos coordonnées
              </span>
              <GoldDivider className="mb-6" />
              <h2 className="font-playfair text-2xl font-bold text-[#1a1a1a] mb-8">Où nous trouver</h2>

              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Adresse",   value: "28 rue de l'écluse\n70290 PLANCHER-BAS", link: null },
                  { icon: Phone,  label: "Téléphone", value: "07 71 59 90 41",      link: "tel:0771599041" },
                  { icon: Mail,   label: "Email",     value: "contact@jardilux.fr", link: "mailto:contact@jardilux.fr" },
                  { icon: Clock,  label: "Horaires",  value: "Lundi–Samedi : 9h–18h\nDimanche : Fermé", link: null },
                ].map((info) => (
                  <div key={info.label} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#f0ead8] border border-[#e8dcc8] flex items-center justify-center flex-shrink-0">
                      <info.icon size={16} className="text-[#DCA54A]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#8a8078] font-semibold uppercase tracking-[0.15em] mb-1">{info.label}</p>
                      {info.link
                        ? <a href={info.link} className="text-[#2d2d2d] text-sm font-medium hover:text-[#DCA54A] transition-colors">{info.value}</a>
                        : <p className="text-[#2d2d2d] text-sm whitespace-pre-line leading-relaxed">{info.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-10 pt-8 border-t border-[#e0d8c8]">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8a8078] mb-4">Suivez-nous</p>
                <div className="flex gap-3">
                  {[
                    { icon: FacebookIcon, href: "https://facebook.com/sarljardilux", label: "Facebook" },
                    { icon: InstagramIcon, href: "https://instagram.com/sarljardilux", label: "Instagram" },
                  ].map((soc) => (
                    <a key={soc.label} href={soc.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-[#e0d8c8] hover:border-[#DCA54A] hover:text-[#DCA54A] text-[#5a5a5a] text-sm transition-colors">
                      <soc.icon size={14} />
                      {soc.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Google Maps */}
              <div className="mt-8 overflow-hidden h-44">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2700.0!2d6.7565!3d47.7285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479257b0e0000001%3A0x0!2s28+Rue+de+l%27%C3%89cluse%2C+70290+Plancher-Bas!5e0!3m2!1sfr!2sfr!4v1700000000000"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Jardilux — 28 rue de l'Écluse, Plancher-Bas"
                />
              </div>
            </motion.div>

            {/* Formulaire */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-3 order-1 lg:order-2"
            >
              <div className="bg-white border border-[#e8dcc8] p-10">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-14 text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                      <CheckCircle size={56} className="text-[#DCA54A] mx-auto mb-6" />
                    </motion.div>
                    <h3 className="font-playfair text-2xl font-bold text-[#1a1a1a] mb-3">Message envoyé !</h3>
                    <p className="text-[#5a5a5a] max-w-sm text-sm leading-relaxed">
                      Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => { setSent(false); formRef.current?.reset(); setMsgLen(0); }}
                      className="mt-8 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#DCA54A] border border-[#DCA54A] hover:bg-[#DCA54A] hover:text-white transition-colors cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#DCA54A] mb-4 inline-block">
                      Formulaire de contact
                    </span>
                    <GoldDivider className="mb-6" />
                    <h2 className="font-playfair text-2xl font-bold text-[#1a1a1a] mb-8">Envoyez-nous un message</h2>

                    <form ref={formRef} className="space-y-5" autoComplete="on">
                      {/* Honeypot */}
                      <input type="text" name="website" defaultValue="" autoComplete="off" tabIndex={-1}
                        style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#5a5a5a] mb-2">Nom *</label>
                          <input name="nom" autoComplete="family-name" className={`${inputClass} ${fieldErrors.nom ? "border-red-400" : ""}`} placeholder="Votre nom" />
                          {fieldErrors.nom && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.nom}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#5a5a5a] mb-2">Prénom *</label>
                          <input name="prenom" autoComplete="given-name" className={`${inputClass} ${fieldErrors.prenom ? "border-red-400" : ""}`} placeholder="Votre prénom" />
                          {fieldErrors.prenom && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.prenom}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#5a5a5a] mb-2">Email *</label>
                          <input type="email" name="email" autoComplete="email"
                            className={`${inputClass} ${fieldErrors.email ? "border-red-400" : ""}`} placeholder="votre@email.fr" />
                          {fieldErrors.email && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#5a5a5a] mb-2">Téléphone</label>
                          <input type="tel" name="telephone" autoComplete="tel" inputMode="numeric"
                            className={inputClass} placeholder="06 XX XX XX XX" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#5a5a5a] mb-2">Sujet *</label>
                        <select name="sujet" className={`${inputClass} cursor-pointer ${fieldErrors.sujet ? "border-red-400" : ""}`}>
                          <option value="">Choisir un sujet...</option>
                          <option value="devis">Demande de devis</option>
                          <option value="produit">Renseignement produit</option>
                          <option value="commande">Suivi de commande</option>
                          <option value="installation">Service installation</option>
                          <option value="autre">Autre</option>
                        </select>
                        {fieldErrors.sujet && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.sujet}</p>}
                      </div>

                      <div>
                        <div className="flex justify-between items-baseline mb-2">
                          <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#5a5a5a]">Message *</label>
                          <span className={`text-xs ${msgLen < 30 ? "text-[#8a8078]" : "text-[#DCA54A]"}`}>
                            {msgLen}/30 min
                          </span>
                        </div>
                        <textarea name="message" rows={5}
                          onChange={(e) => setMsgLen(e.target.value.length)}
                          className={`${inputClass} resize-none ${fieldErrors.message ? "border-red-400" : ""}`}
                          placeholder="Décrivez votre demande, le ou les produits qui vous intéressent..."
                        />
                        {fieldErrors.message && <p className="mt-1.5 text-xs text-red-500">{fieldErrors.message}</p>}
                      </div>

                      {submitError && <p className="text-sm text-red-500 text-center">{submitError}</p>}

                      <button
                        type="button"
                        disabled={loading}
                        onClick={handleSubmit}
                        className="w-full flex items-center justify-center gap-2.5 py-4 bg-[#DCA54A] hover:bg-[#c4992e] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold uppercase tracking-wider transition-colors duration-300 cursor-pointer"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Envoi en cours...
                          </span>
                        ) : (
                          <><Send size={16} />Envoyer le message</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
