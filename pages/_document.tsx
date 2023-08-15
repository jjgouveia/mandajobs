import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Busque vagas de forma melhorada e aumente as suas chances de conseguir o seu tão sonhado emprego."
          />
          <meta property="og:site_name" content="Explorador de Vagas" />
          <meta
            property="og:description"
            content="Busque vagas de forma melhorada e aumente as suas chances de conseguir o seu tão sonhado emprego."
          />
          <meta property="og:title" content="Explorador de Vagas" />
          <meta name="Explorador de Vagas:card" content="summary_large_image" />
          <meta
            name="Explorador de Vagas:title"
            content="Explorador de Vagas"
          />
          <meta
            name="Explorador de Vagas:description"
            content="Search smarter, boost your chances with our LinkedIn assistant."
          />
          <meta property="og:image" content="/searchbar.png" />
          <meta name="Explorador de Vagas:image" content="/searchbar.png" />
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
