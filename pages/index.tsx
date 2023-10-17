//lint-ignore-all

import type { NextPage } from "next";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import FooterExperimental from "../components/FooterExperimental";
import HeaderExperimental from "../components/HeaderExperimental";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Partners from "../components/Partners";
import ScrollToTopButton from "../components/ScrollToTop";
import Title from "../components/Title";
import Values from "../components/Values";

const Index: NextPage = () => {
  return (
    <>
      <Title title="Manda Jobs" />
      <main className="flex flex-col min-h-full w-full justify-center text-gray-900">
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
    </>
  );
};

export default Index;
