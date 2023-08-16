import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Otimize suas buscas no LinkedIn através da consulta booleana e garanta as melhores oportunidades para o seu perfil."
          />
          <meta property="og:site_name" content="Manda Jobs" />
          <meta
            property="og:description"
            content="Otimize suas buscas no LinkedIn através da consulta booleana e garanta as melhores oportunidades para o seu perfil."
          />
          <meta property="og:title" content="Manda Jobs" />
          <meta name="Manda Jobs:card" content="summary_large_image" />
          <meta name="Manda Jobs:title" content="Manda Jobs" />
          <meta
            name="Manda Jobs:description"
            content="Otimize suas buscas no LinkedIn através da consulta booleana e garanta as melhores oportunidades para o seu perfil."
          />
          <meta property="og:image" content="/searchbar.png" />
          <meta name="Manda Jobs:image" content="/searchbar.png" />
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
