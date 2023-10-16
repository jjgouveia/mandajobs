import type { NextPage } from "next";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import FooterExperimental from "../components/FooterExperimental";
import HeaderExperimental from "../components/HeaderExperimental";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Partners from "../components/Partners";
import ScrollToTopButton from "../components/ScrollToTop";
import Values from "../components/Values";

const Index: NextPage = () => {
  return (
    <main className="glow-container bg-[#141417] flex flex-col min-h-full w-full justify-center text-gray-900">
      <div className="ball"></div>
      <div
        className="ball"
        style={{
          "--delay": "-12s",
          "--size": "0.35",
          "--speed": "25s",
        }}
      ></div>
      <div
        className="ball"
        style={{ "--delay": "-10s", "--size": "0.3", "--speed": "15s" }}
      ></div>
      <HeaderExperimental />
      <Hero />
      <Values />
      <FAQ />
      <Partners />
      <HowItWorks />
      <CTA />
      <FooterExperimental />
      <ScrollToTopButton />
    </main>
  );
};

export default Index;
