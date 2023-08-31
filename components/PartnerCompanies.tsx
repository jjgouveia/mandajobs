import Image from "next/image";

interface Company {
  name: string;
  url: string;
  description: string;
  imagePath: string;
}

const companies: Company[] = [
  {
    name: "Strider",
    url: "https://app.onstrider.com/r/trampar_de_casa",
    description: "Empresa brasileira com vagas internacionais 100% remotas.",
    imagePath: "/images/companies/strider.svg",
  },
  {
    name: "Meteor",
    url: "https://www.meteor.com/",
    description:
      "Plataforma OpenSource para construção de sistemas web, mobile e desktop com JavaScript ou TypeScript.",
    imagePath: "/images/companies/meteor.webp",
  },
  {
    name: "FrontIn",
    url: "https://frontinsampa.com.br/pt-br",
    description:
      "Empresa especializada em produção de eventos e conteúdo de tecnologia.",
    imagePath: "/images/companies/frontin.webp",
  },
  {
    name: "Trampar de Casa",
    url: "https://trampardecasa.com.br/",
    description: "Empresa especializada em vagas de trabalho remoto.",
    imagePath: "/images/companies/trampardecasa.svg",
  },
  {
    name: "Programador.TV",
    url: "https://programador.tv/",
    description: "Página especializa na produção de conteúdo de tecnologia.",
    imagePath: "/images/companies/programadortv.png",
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
    />
  </a>
);

export const PartnerCompanies = () => {
  return (
    <section className="mt-8">
      <p className="text-sm font-semibold text-gray-500">
        Empresas que apoiam o projeto
      </p>
      <div className="w-full overflow-hidden">
        <span
          className={`group flex w-full items-center justify-start max-lg:w-1/4`}
        >
          <span className="animate-scroll-left group-hover:paused flex gap-10">
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
