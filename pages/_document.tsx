import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="title" content="Manda Jobs" />
          <meta
            name="description"
            content="Otimize sua busca por vagas no LinkedIn através da consulta booleana e garanta as melhores oportunidades para o seu perfil."
          />

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
