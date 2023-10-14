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
                  modernas ferramentas de inteligência artificial preditiva para garantir
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
              title="Posicionamento Estratégico"
              description="Nosso motor de I.A utiliza palavras-chave do seu perfil para
                  encontrar vagas que mais se encaixem no seu momento atual. Essa estratégia é muito utilizada por grandes empresas para encontrar os melhores candidatos."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                  enable-background="new 0 0 52 52"
                  xmlSpace="preserve"
                  className="w-7 h-7 fill-blue-200"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M46.9,18.7h-8.1c-1.8,0-3.2,1.4-3.2,3.2V22v1.9h-7.5V8.1c0-0.5-0.5-1-1-1H16.6V5.2c0-1.8-1.4-3.2-3.2-3.2 H5.3C3.6,2,2.1,3.4,2.1,5.2v8.1c0,1.8,1.4,3.2,3.2,3.2h8.1c1.8,0,3.2-1.4,3.2-3.2v-1.9H24v12.5h-7.4V22v0c0-1.8-1.4-3.2-3.2-3.2H5.3 c-1.8,0-3.2,1.4-3.2,3.2v0v8v0c0,1.8,1.4,3.2,3.2,3.2h8.1c1.8,0,3.2-1.4,3.2-3.2v0v-1.9H24v12.5h-7.4v-1.8c0-1.8-1.4-3.2-3.2-3.2 H5.3c-1.8,0-3.2,1.4-3.2,3.2v8.1c0,1.8,1.4,3.2,3.2,3.2h8.1c1.8,0,3.2-1.4,3.2-3.2v-1.9h10.6c0.6,0,1-0.6,1-1V28.2h7.5v1.8V30 c0,1.8,1.4,3.2,3.2,3.2h8.1c1.8,0,3.2-1.4,3.2-3.2v-0.1V22v-0.1C50.1,20.1,48.7,18.7,46.9,18.7z M12.5,12.4H6.2V6h6.3V12.4z M12.5,22.8v6.3H6.2v-6.3H12.5z M12.5,46H6.2v-6.3h6.3V46z M46.1,22.8v6.3h-6.3v-6.3H46.1z"></path>{" "}
                  </g>
                </svg>
              }
            />
          </div>
          <div className="w-full p-3 md:w-1/3">
            <Card
              title="Interface amigável"
              description="Sua candidatura é muito importante para nós. Por isso,
                  desenvolvemos uma interface simples e intuitiva em que você
                  pode criar o seu currículo e enviá-lo para o recrutador da
                  campanha em poucos cliques."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-9 h-9 fill-blue-200"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            />
          </div>
          <div className="w-full p-3 md:w-1/3">
            <Card
              title="Segurança de dados"
              description="A sua privacidade é muito importante para nós. Por isso, não armazenamos nenhum dado pessoal seu em nossos servidores. Tudo é feito de forma segura e criptografada."
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-9 h-9 fill-blue-200"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
            />
          </div>
          <div className="w-full p-3 md:w-1/3">
            <Card
              title="Sem conexão com o LinkedIn"
              description="Nossa plataforma foi desenvolvida utilizando uma tecnologia de API Headless, que permite que você acesse o conteúdo de forma rápida e segura, sem precisar estar conectado ao LinkedIn. As informações são atualizadas em tempo real sem que, para isso, você esteja logado ao site."
              icon={
                <svg
                  className="w-6 h-6 fill-blue-200"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 260.366 260.366"
                  xmlSpace="preserve"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <path d="M34.703,0.183C15.582,0.183,0.014,15.748,0,34.884C0,54.02,15.568,69.588,34.703,69.588 c19.128,0,34.688-15.568,34.688-34.704C69.391,15.75,53.83,0.183,34.703,0.183z"></path>{" "}
                      <path d="M60.748,83.531H8.654c-2.478,0-4.488,2.009-4.488,4.489v167.675c0,2.479,2.01,4.488,4.488,4.488h52.093 c2.479,0,4.489-2.01,4.489-4.488V88.02C65.237,85.539,63.227,83.531,60.748,83.531z"></path>{" "}
                      <path d="M193.924,81.557c-19.064,0-35.817,5.805-46.04,15.271V88.02c0-2.48-2.01-4.489-4.489-4.489H93.424 c-2.479,0-4.489,2.009-4.489,4.489v167.675c0,2.479,2.01,4.488,4.489,4.488h52.044c2.479,0,4.489-2.01,4.489-4.488v-82.957 c0-23.802,4.378-38.555,26.227-38.555c21.526,0.026,23.137,15.846,23.137,39.977v81.535c0,2.479,2.01,4.488,4.49,4.488h52.068 c2.478,0,4.488-2.01,4.488-4.488v-91.977C260.366,125.465,252.814,81.557,193.924,81.557z"></path>{" "}
                    </g>{" "}
                  </g>
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
