import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Search smarter, boost your chances with our LinkedIn assistant."
          />
          <meta property="og:site_name" content="linkesearch" />
          <meta
            property="og:description"
            content="Search smarter, boost your chances with our LinkedIn assistant."
          />
          <meta property="og:title" content="Linkesearch" />
          <meta name="linkesearch:card" content="summary_large_image" />
          <meta name="linkesearch:title" content="Linkesearch" />
          <meta
            name="Linkesearch:description"
            content="Search smarter, boost your chances with our LinkedIn assistant."
          />
          <meta
            property="og:image"
            content="/searchbar.png"
          />
          <meta
            name="linkesearch:image"
            content="/searchbar.png"
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
