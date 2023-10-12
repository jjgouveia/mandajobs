import Document, { Head, Html, Main, NextScript } from "next/document";

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
            crossOrigin="true"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque&family=Montserrat&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content="Manda Jobs" />
          <meta
            name="description"
            content="Conectando você com as melhores oportunidades do LinkedIn de acordo
          com o seu perfil"
          />
          <meta
            property="keywords"
            content="trabalho remoto, emprego, vagas, trabalho em casa, empregos de tecnologia, carreira em tecnologia, trabalho flexível, oportunidades de trabalho, empresas remotas"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:url" content="https://mandajobs.tech" />
          <meta property="og:title" content="Manda Jobs" />
          <meta
            property="og:description"
            content="Conectando você com as melhores oportunidades do LinkedIn de acordo
          com o seu perfil"
          />
          <meta
            property="og:image"
            content="https://raw.githubusercontent.com/jjgouveia/sturdy-doodle/main/mandajobs/manda_jobs.png"
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="Manda Jobs" />
          <meta property="og:author" content="@jjgouveia" />
          <meta property="og:creator" content="@jjgouveia" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="mandajobs.vercel.app" />
          <meta property="twitter:url" content="https://mandajobs.tech" />
          <meta name="twitter:title" content="Manda Jobs" />
          <meta
            name="twitter:description"
            content="Conectando você com as melhores oportunidades do LinkedIn de acordo
          com o seu perfil"
          />
          <meta
            name="twitter:image"
            content="https://raw.githubusercontent.com/jjgouveia/sturdy-doodle/main/mandajobs/manda_jobs.png"
          />
          <meta name="twitter:creator" content="@outrogouveia" />

          <meta name="apple-mobile-web-app-title" content="Manda Jobs" />
          <meta name="application-name" content="Manda Jobs" />
          <meta name="msapplication-TileColor" content="#111827" />
          <meta name="msapplication-TileImage" content="/favicon.ico" />
          <meta name="msapplication-config" content="/favicon.ico" />

          <meta name="theme-color" content="#111827" />
          <meta name="msapplication-navbutton-color" content="#111827" />
          <meta itemProp="name" content="Manda Jobs" />
          <meta itemProp="description" content="Manda Jobs" />
          <meta itemProp="image" content="/favicon.ico" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
