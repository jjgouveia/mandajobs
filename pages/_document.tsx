import Document, { Head, Html, Main, NextScript } from "next/document"

const SITE_URL = "https://mandajobs.vercel.app"
const SITE_TITLE = "Manda Jobs — Filtro inteligente de vagas no LinkedIn e na web"
const SITE_DESCRIPTION =
  "Gere consultas booleanas otimizadas para LinkedIn e amplie a busca de vagas na web com IA. Gratuito, sem login."
const OG_IMAGE_URL = `${SITE_URL}/og.png`
const OG_IMAGE_ALT =
  "Manda Jobs: gere consultas booleanas para o LinkedIn e busque vagas na web com IA. Gratuito, sem login."

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Manda Jobs",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  image: OG_IMAGE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
  },
  inLanguage: "pt-BR",
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2455539118400314"
            crossOrigin="anonymous"
          ></script>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque&family=Montserrat&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content={SITE_TITLE} />
          <meta name="description" content={SITE_DESCRIPTION} />
          <meta
            name="keywords"
            content="linkedin, busca na web, busca booleana, vagas, emprego remoto, tecnologia, consulta linkedin, manda jobs"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:url" content={SITE_URL} />
          <meta property="og:title" content={SITE_TITLE} />
          <meta property="og:description" content={SITE_DESCRIPTION} />
          <meta property="og:image" content={OG_IMAGE_URL} />
          <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={OG_IMAGE_ALT} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="Manda Jobs" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="mandajobs.vercel.app" />
          <meta property="twitter:url" content={SITE_URL} />
          <meta name="twitter:title" content={SITE_TITLE} />
          <meta name="twitter:description" content={SITE_DESCRIPTION} />
          <meta name="twitter:image" content={OG_IMAGE_URL} />
          <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />
          <meta name="twitter:creator" content="@outrogouveia" />
          <meta name="apple-mobile-web-app-title" content="Manda Jobs" />
          <meta name="application-name" content="Manda Jobs" />
          <meta name="theme-color" content="#fdf500" />
          <meta name="mobile-web-app-capable" content="yes" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
