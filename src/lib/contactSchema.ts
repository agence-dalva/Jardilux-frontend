import { z } from "zod";

const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com","yopmail.com","guerrillamail.com","trashmail.com","tempmail.com",
  "10minutemail.com","throwam.com","sharklasers.com","guerrillamailblock.com",
  "grr.la","guerrillamail.info","guerrillamail.biz","guerrillamail.de",
  "spam4.me","dispostable.com","maildrop.cc","fakeinbox.com","mailnull.com",
  "spamgourmet.com","trashmail.me","mytemp.email","temp-mail.org",
]);

const VALID_TLDS = new Set([
  "fr","com","net","org","eu","io","co","info","biz","pro","email",
  "me","app","dev","tech","shop","store","online","site","web",
  "be","ch","lu","ca","uk","de","es","it","nl","pt","pl","cz","se","no","dk","fi",
]);

export const contactSchema = z.object({
  nom:       z.string().min(1, "Le nom est requis."),
  prenom:    z.string().min(1, "Le prénom est requis."),
  email:     z
    .string()
    .email("Adresse email invalide.")
    .refine((v) => {
      const domain = v.split("@")[1]?.toLowerCase() ?? "";
      return !DISPOSABLE_DOMAINS.has(domain);
    }, "Les adresses email temporaires ne sont pas acceptées.")
    .refine((v) => {
      const tld = v.split("@")[1]?.split(".").pop()?.toLowerCase() ?? "";
      return VALID_TLDS.has(tld);
    }, "Veuillez utiliser une adresse email avec un domaine reconnu (.fr, .com, .net…)."),
  telephone: z.string().optional(),
  sujet:     z.string().min(1, "Veuillez choisir un sujet."),
  message:   z.string().min(30, "Le message doit contenir au moins 30 caractères."),
});

export type ContactForm = z.infer<typeof contactSchema>;
