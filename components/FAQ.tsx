import { Fade } from "react-awesome-reveal";

export default function FAQ() {
  return (
    <section id="faq" className="overflow-hidden pb-32 pt-8 z-10">
      <div className="container mx-auto px-8 lg:px-4">
        <p className="tracking-px mb-5 text-sm font-semibold uppercase text-slate-200">
          MANDA DÚVIDAS
        </p>
        <Fade direction="up" triggerOnce={true}>
          <h2 className="text-slate-200 xl:text-8xl font-heading max-xs:hyphens-auto max-xs:text-4xl mb-16 text-6xl font-bold leading-none tracking-tight md:text-8xl">
            Perguntas Frequentes
          </h2>
        </Fade>
        <div className="mb-8">
          <div className="-m-4 flex flex-wrap">
            <div className="w-full p-4 md:w-1/2">
              <div className="shadow-10xl h-full rounded-2xl border border-slate-500/30 bg-zinc-700/60 p-6">
                <h3 className="mb-4 text-lg font-semibold leading-normal text-slate-200">
                  1. Quanto eu preciso pagar para utilizar o serviço?
                </h3>
                <p className="leading-relaxed text-slate-200">
                  Nosso serviço é totalmente gratuito. Nosso objetivo é conectar
                  profissionais a oportunidades de trabalho, sem nenhum custo.
                </p>
              </div>
            </div>
            <div className="w-full p-4 md:w-1/2">
              <div className="shadow-10xl h-full rounded-2xl border border-slate-500/30 bg-zinc-700/60 p-6">
                <h3 className="mb-4 text-lg font-semibold leading-normal text-slate-200">
                  2. E nossos dados?
                </h3>
                <p className="leading-relaxed text-slate-200">
                  Seus dados são criptografados e armazenados em um banco de
                  dados seguro. As informações referentes ao perfil de
                  candidatura são utilizados como métricas para melhorar a
                  qualidade do nosso serviço e não são vinculados a nenhum dado
                  pessoal do usuário, como nome ou e-mail.
                </p>
              </div>
            </div>
            <div className="w-full p-4 md:w-1/2">
              <div className="shadow-10xl h-full rounded-2xl border border-slate-500/30 bg-zinc-700/60 p-6">
                <h3 className="mb-4 text-lg font-semibold leading-normal text-slate-200">
                  3. Quantas consultas posso fazer?
                </h3>
                <p className="leading-relaxed text-slate-200">
                  Não há limite de consultas. Você pode fazer quantas buscas
                  quiser, a qualquer momento.
                </p>
              </div>
            </div>
            <div className="w-full p-4 md:w-1/2">
              <div className="shadow-10xl rounded-2xl border border-slate-500/30 bg-zinc-700/60 p-6">
                <h3 className="mb-4 text-lg font-semibold leading-normal text-slate-200">
                  4. É garantido que eu vou conseguir um emprego?
                </h3>
                <p className="leading-relaxed text-slate-200">
                  Não. Infelizmente nós não garantimos que você vai conseguir um
                  emprego, apenas que você terá acesso a vagas que mais se
                  encaixem com o seu perfil e momento atual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
