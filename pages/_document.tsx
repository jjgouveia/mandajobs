import Document, { Head, Html, Main, NextScript } from "next/document"

const SITE_DESCRIPTION =
  "Gere consultas booleanas otimizadas para LinkedIn e amplie a busca de vagas na web com IA. Gratuito, sem login."

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Manda Jobs",
  url: "https://mandajobs.vercel.app",
  description: SITE_DESCRIPTION,
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
          <meta name="title" content="Manda Jobs" />
          <meta name="description" content={SITE_DESCRIPTION} />
          <meta
            name="keywords"
            content="linkedin, busca booleana, vagas, emprego remoto, tecnologia, consulta linkedin, manda jobs"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:url" content="https://mandajobs.vercel.app" />
          <meta property="og:title" content="Manda Jobs" />
          <meta property="og:description" content={SITE_DESCRIPTION} />
          <meta
            property="og:image"
            content="https://raw.githubusercontent.com/jjgouveia/sturdy-doodle/main/mandajobs/manda_jobs_v1dot5.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="Manda Jobs" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="mandajobs.vercel.app" />
          <meta property="twitter:url" content="https://mandajobs.vercel.app" />
          <meta name="twitter:title" content="Manda Jobs" />
          <meta name="twitter:description" content={SITE_DESCRIPTION} />
          <meta
            name="twitter:image"
            content="https://raw.githubusercontent.com/jjgouveia/sturdy-doodle/main/mandajobs/manda_jobs_v1dot5.png"
          />
          <meta name="twitter:creator" content="@outrogouveia" />
          <meta name="apple-mobile-web-app-title" content="Manda Jobs" />
          <meta name="application-name" content="Manda Jobs" />
          <meta name="theme-color" content="#131313" />
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
