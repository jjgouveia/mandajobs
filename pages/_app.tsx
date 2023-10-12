import type { AppProps } from "next/app";
import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-B2329WXFYR";
    script1.async = true;
    document.head.appendChild(script1);

    script1.onload = () => {
      const script2 = document.createElement("script");
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-B2329WXFYR');
      `;
      document.head.appendChild(script2);
    };

    const script3 = document.createElement("script");
    script3.src =
      "https://fundingchoicesmessages.google.com/i/pub-2455539118400314?ers=1";
    script3.nonce = "kk7rRBN16gD-PENUS_VXhA";
    script3.async = true;
    document.head.appendChild(script3);

    script3.onload = () => {
      const script4 = document.createElement("script");
      script4.innerHTML = `
        (function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();
      `;
      document.head.appendChild(script4);
    };
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
