import Image from "next/image";

interface Company {
  name: string;
  url: string;
  description: string;
  imagePath: string;
}

const companies: Company[] = [
  {
    name: "Programador.TV",
    url: "https://programador.tv/",
    description: "Página especializa na produção de conteúdo de tecnologia.",
    imagePath: "/images/companies/progtv.png",
  },
  {
    name: "SkCoders",
    url: "https://appskcoders.com.br/",
    description: "Aprenda a programar no seu tempo, do seu jeito e sem custo!",
    imagePath: "/images/companies/SkCoders.png",
  },
  {
    name: "Strider",
    url: "https://app.onstrider.com/r/mandajobs",
    description: "Plataforma de recrutamento e seleção de desenvolvedores.",
    imagePath: "/images/companies/strider.svg",
  },
  {
    name: "Skill Labs.",
    url: "https://www.sklabs.com.br/",
    description:
      "Um ecossistema que conecta co-fundadores e especialistas em tecnologia para construir novas empresas do zero.",
    imagePath: "/images/companies/skill_labs.png",
  },
  {
    name: "BeMentor",
    url: "https://www.bementor.com.br/",
    description:
      "Plataforma de ensino com objetivo de conectar mentores e mentorados numa experiência personalizada e de alto impacto.",
    imagePath: "/images/companies/bementor.webp",
  },
];

const CompanySection = ({ name, imagePath, url, description }: Company) => (
  <a href={url} target="_blank">
    <Image
      src={imagePath}
      alt={`Logo da ${name}`}
      className="mx-10 aspect-video min-w-[128px] cursor-pointer object-contain"
      title={description}
      width={128}
      height={28}
      loading="eager"
    />
  </a>
);

export const PartnerCompanies = () => {
  return (
    <section className="mt-8 bg-slate-100 rounded-md border border-blue-200">
      <p className="text-sm text-black p-1">
        Empresas que apoiam o projeto e a recolocação profissional
      </p>
      <div className="w-full overflow-hidden">
        <span
          className={`group flex w-full items-center justify-start max-lg:w-1/4`}
        >
          <span className="animate-scroll-left group-hover:paused flex gap-8">
            {companies.map((company) => (
              <CompanySection key={company.name} {...company} />
            ))}
          </span>
          <span
            className="animate-scroll-left group-hover:paused flex gap-10"
            style={{ transform: "translateX(100%)" }}
          >
            {companies.map((company) => (
              <CompanySection
                key={company.name}
                {...company}
                aria-hidden={true}
              />
            ))}
          </span>
        </span>
      </div>
    </section>
  );
};
