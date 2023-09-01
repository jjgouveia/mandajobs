import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  componentDidMount() {
    const script = document.createElement("script");
    script.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-B2329WXFYR');
    `;
    document.head.appendChild(script);
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@10..48,300&family=Montserrat&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content="Manda Jobs" />
          <meta
            name="description"
            content="Otimize sua busca por vagas no LinkedIn através da consulta booleana e garanta as melhores oportunidades para o seu perfil."
          />
          <meta
            property="keywords"
            content="trabalho remoto, emprego, vagas, trabalho em casa, empregos de tecnologia, carreira em tecnologia, trabalho flexível, oportunidades de trabalho, empresas remotas"
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:url" content="https://mandajobs.vercel.app" />
          <meta property="og:title" content="Manda Jobs" />
          <meta
            property="og:description"
            content="Otimize sua busca por vagas no LinkedIn através da consulta booleana e garanta as melhores oportunidades para o seu perfil."
          />
          <meta
            property="og:image"
            content="https://github.com/jjgouveia/sturdy-doodle/blob/main/mandajobs/mandajobs.png?raw=true"
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
          <meta property="twitter:url" content="https://mandajobs.vercel.app" />
          <meta name="twitter:title" content="Manda Jobs" />
          <meta
            name="twitter:description"
            content="Otimize sua busca por vagas no LinkedIn através da consulta booleana e garanta as melhores oportunidades para o seu perfil."
          />
          <meta
            name="twitter:image"
            content="https://github.com/jjgouveia/sturdy-doodle/blob/main/mandajobs/mandajobs.png?raw=true"
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

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-B2329WXFYR"
          ></script>
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
