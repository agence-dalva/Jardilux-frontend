import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contactSchema";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "contact@jardilux.fr";
const FROM_EMAIL = "noreply@jardilux.fr";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { website, ...fields } = body;

    // Honeypot
    if (website) return NextResponse.json({ ok: true });

    const result = contactSchema.safeParse(fields);
    if (!result.success) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const { nom, prenom, email, telephone, sujet, message } = result.data;

    // En dev sans clé configurée, on log et on retourne ok pour tester le flux
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_xxx")) {
      console.log("[contact] Mode dev — email simulé :", { nom, prenom, email, sujet, message });
      return NextResponse.json({ ok: true });
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Jardilux] ${sujet} — ${prenom} ${nom}`,
      text: [
        `Nom : ${prenom} ${nom}`,
        `Email : ${email}`,
        telephone ? `Téléphone : ${telephone}` : "",
        `Sujet : ${sujet}`,
        "",
        message,
      ].filter(Boolean).join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Erreur inattendue:", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }
}
