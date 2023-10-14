import Card from "./ui/Card";

export default function Values() {
  return (
    <section id="values" className="z-10 overflow-hidden pb-36 sn:pt-32 pt-8">
      <div className="overflow-hidden container mx-auto px-8 lg:px-4">
        <div className="overflow-hidden">
          <h2 className="xl:text-10xl max-xs:text-4xl mb-9 text-[2.8rem] font-bold leading-none tracking-tight text-white md:text-8xl">
            Nossa missão é transformar a forma como você se posiciona no mercado
            de trabalho
          </h2>
          <p className="mb-16 text-xl leading-relaxed text-gray-200 text-justify">
            Acreditamos que a tecnologia pode ser uma grande aliada na hora de
            buscar uma oportunidade de emprego. Por isso, desenvolvemos uma
            plataforma que utiliza inteligência artificial para encontrar vagas
            de emprego que mais se encaixem com o seu perfil.
          </p>
        </div>
        <div className="-m-3 sm:px-4 px-0 flex flex-wrap">
          <div className="w-full p-3 md:w-3/5">
            <Card
              title="Inteligência Artificial"
              description="Com o avanço constante das tecnologias, é crucial que você
                  esteja preparado para o futuro. Nós utilizamos as mais
                  modernas ferramentas de inteligência artificial para garantir
                  que a sua busca por vagas seja a mais assertiva possível."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 fill-blue-200"
                >
                  <path d="M16.5 7.5h-9v9h9v-9z" />
                  <path
                    fillRule="evenodd"
                    d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>

          <div className="w-full p-3 md:w-[39.99%]">
            <Card
              title="ATS Friendly"
              description="Nosso motor de I.A utiliza as melhores práticas para garantir
                  que o seu currículo seja compatível com os sistemas de
                  rastreamento de candidatos (ATS). Isso aumenta as suas chances
                  de ser selecionado para uma entrevista."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-9 h-9 fill-blue-200"
                >
                  <path d="M19.5 6h-15v9h15V6z" />
                  <path
                    fillRule="evenodd"
                    d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 006 21h12a.75.75 0 000-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375zm0 13.5h17.25a.375.375 0 00.375-.375V4.875a.375.375 0 00-.375-.375H3.375A.375.375 0 003 4.875v11.25c0 .207.168.375.375.375z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>

          <div className="w-full p-3 md:w-1/3">
            <div
              target="_blank"
              className="group block h-full shadow-md shadow-slate-800/60 rounded-xl border border-slate-500/30 bg-zinc-700/70 p-7"
            >
              <div className="flex flex-col flex-wrap gap-3">
                <div className="flex items-center gap-3 pb-2">
                  <div className="w-12 h-12 flex justify-center items-center shadow-sm shadow-slate-500 bg-gray-100 border border-slate-500/10 rounded-3xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-9 h-9 fill-blue-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <h3 className="text-xl text-center font-semibold">
                    Interface amigável
                  </h3>
                </div>

                <p className="font-medium leading-relaxed text-gray-600 text-justify select-none">
                  Sua candidatura é muito importante para nós. Por isso,
                  desenvolvemos uma interface simples e intuitiva em que você
                  pode criar o seu currículo e enviá-lo para o recrutador da
                  campanha em poucos cliques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
