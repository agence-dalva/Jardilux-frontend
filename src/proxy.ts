import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Interrupteur de suspension du site.
 *
 * SITE_SUSPENDED=true  -> toutes les requêtes reçoivent un 503 avec une page
 *                         de maintenance neutre (aucune mention de facturation).
 * SITE_SUSPENDED=false -> le site fonctionne normalement.
 *
 * Le 503 est volontaire : il indique aux moteurs de recherche une coupure
 * temporaire, là où un 404 ferait désindexer toutes les pages.
 *
 * Vercel n'applique une variable d'environnement qu'au déploiement suivant :
 * après avoir changé SITE_SUSPENDED, il faut redéployer (Deployments ->
 * Redeploy) pour que la bascule prenne effet.
 *
 * Laissez-passer : si SITE_SUSPENDED_BYPASS_TOKEN est défini, ouvrir
 * https://le-site.fr/?acces=<token> pose un cookie qui permet de continuer à
 * consulter le site pendant qu'il est suspendu pour le public.
 */

const BYPASS_COOKIE = "dalva_bypass";
const BYPASS_PARAM = "acces";
const BYPASS_MAX_AGE = 60 * 60 * 24 * 7; // 7 jours

const TITLE = "Site temporairement indisponible";
const MESSAGE =
  "Ce site est momentanément hors ligne. Merci de réessayer ultérieurement.";

export function proxy(request: NextRequest) {
  if (process.env.SITE_SUSPENDED !== "true") {
    return NextResponse.next();
  }

  const bypassToken = process.env.SITE_SUSPENDED_BYPASS_TOKEN;

  if (bypassToken) {
    // ?acces=<token> : on pose le cookie puis on nettoie l'URL.
    if (request.nextUrl.searchParams.get(BYPASS_PARAM) === bypassToken) {
      const url = request.nextUrl.clone();
      url.searchParams.delete(BYPASS_PARAM);

      const response = NextResponse.redirect(url);
      response.cookies.set(BYPASS_COOKIE, bypassToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: BYPASS_MAX_AGE,
      });
      return response;
    }

    if (request.cookies.get(BYPASS_COOKIE)?.value === bypassToken) {
      return NextResponse.next();
    }
  }

  return suspendedResponse(request);
}

function suspendedResponse(request: NextRequest) {
  const headers: Record<string, string> = {
    "Cache-Control": "no-store, must-revalidate",
    "Retry-After": "86400",
  };

  // Les appels API (et tout ce qui n'attend pas du HTML) reçoivent du JSON.
  const accept = request.headers.get("accept") ?? "";
  if (request.nextUrl.pathname.startsWith("/api/") || !accept.includes("text/html")) {
    return NextResponse.json(
      { error: "service_unavailable", message: MESSAGE },
      { status: 503, headers },
    );
  }

  return new NextResponse(suspendedPage(), {
    status: 503,
    headers: { ...headers, "Content-Type": "text/html; charset=utf-8" },
  });
}

function suspendedPage() {
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITLE}</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #f6f5f2;
    --card: #ffffff;
    --border: #e6e3dc;
    --text: #1c1b19;
    --muted: #6d6a63;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #121110;
      --card: #1b1a18;
      --border: #2e2c29;
      --text: #f1efea;
      --muted: #9a958c;
    }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: var(--bg);
    color: var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.6;
  }
  .card {
    width: 100%;
    max-width: 30rem;
    padding: 40px 32px;
    text-align: center;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
  }
  .icon {
    width: 44px;
    height: 44px;
    margin-bottom: 20px;
    color: var(--muted);
  }
  h1 {
    margin: 0 0 12px;
    font-size: 1.375rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }
  p {
    margin: 0;
    color: var(--muted);
    font-size: 0.975rem;
  }
</style>
</head>
<body>
  <main class="card">
    <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
    <h1>${TITLE}</h1>
    <p>${MESSAGE}</p>
  </main>
</body>
</html>`;
}

export const config = {
  // Tout est intercepté, sauf les assets immuables générés par Next
  // (ils ne servent à rien sans page HTML).
  matcher: ["/((?!_next/static|_next/image).*)"],
};
