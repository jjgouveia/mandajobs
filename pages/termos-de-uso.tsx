import Footer from "../components/Footer";
import Header from "../components/Header";

const CLAUSES = [
  {
    color: "bg-brutalist-yellow text-brutalist-ink",
    text: "Você é responsável por fornecer informações verdadeiras, completas e atualizadas sobre você e sua qualificação profissional. Você não deve usar o site para divulgar informações falsas, enganosas ou fraudulentas.",
  },
  {
    color: "bg-brutalist-blue text-white",
    text: "Você é responsável por respeitar os direitos autorais, marcas registradas e outros direitos de propriedade intelectual dos conteúdos disponibilizados no site, bem como dos conteúdos que você enviar, publicar ou compartilhar. Você não deve usar o site para violar esses direitos ou para fins ilícitos ou indevidos.",
  },
  {
    color: "bg-brutalist-yellow text-brutalist-ink",
    text: "Você é responsável por cumprir as leis e regulamentos aplicáveis ao seu uso do site, bem como as políticas e diretrizes do Manda Jobs. Você não deve usar o site para praticar atos que possam prejudicar o site, seus usuários ou terceiros.",
  },
  {
    color: "bg-brutalist-pink text-brutalist-ink",
    text: "O Manda Jobs não garante a veracidade, a qualidade, a segurança ou a legalidade dos conteúdos disponibilizados no site, nem a capacidade dos usuários de oferecer ou obter oportunidades de trabalho. O Manda Jobs não é parte nem se responsabiliza por qualquer relação contratual ou negocial entre os usuários do site.",
  },
  {
    color: "bg-brutalist-yellow text-brutalist-ink",
    text: "O Manda Jobs se reserva o direito de modificar, suspender ou encerrar o site ou qualquer parte dele a qualquer momento, sem aviso prévio ou responsabilidade. O Manda Jobs também se reserva o direito de modificar ou alterar estes termos de uso a qualquer momento, sendo que as mudanças entrarão em vigor imediatamente após a publicação no site.",
  },
  {
    color: "bg-brutalist-blue text-white",
    text: 'O uso do site é por sua conta e risco. O site é fornecido "no estado em que se encontra" e "conforme disponível", sem garantias expressas ou implícitas de qualquer tipo. O Manda Jobs não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, especiais ou consequenciais decorrentes do uso ou da impossibilidade de uso do site.',
  },
  {
    color: "bg-brutalist-yellow text-brutalist-ink",
    dark: true,
    text: "Estes termos de uso são regidos pelas leis brasileiras e quaisquer disputas relacionadas ao site serão submetidas à jurisdição dos tribunais competentes do Brasil. Ao usar o site, você declara que leu, entendeu e aceitou estes termos de uso. Se você não concordar com estes termos de uso, por favor, não use o site.",
  },
];

export default function TermosDeUso() {
  return (
    <>
      <title>Manda Jobs - Termos de Uso</title>
      <div className="min-h-screen bg-brutalist-paper font-body text-brutalist-ink">
        <Header />

        <main className="max-w-3xl mx-auto px-6 py-14">
          <span className="inline-block font-display font-bold text-xs uppercase bg-brutalist-ink text-brutalist-yellow px-3 py-1.5 mb-5">
            Documento legal
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase mb-6">Termos de Uso</h1>
          <p className="text-base sm:text-lg leading-relaxed mb-10">
            O Manda Jobs é um site que oferece serviço(s) de otimização de busca por vagas de emprego. Ao acessar ou
            usar o site, você concorda em cumprir e se sujeitar aos seguintes termos e condições:
          </p>

          <div className="flex flex-col gap-5">
            {CLAUSES.map((clause, index) => (
              <div
                key={index}
                className={`flex gap-5 border-[3px] border-brutalist-ink shadow-brutal p-6 ${
                  clause.dark ? "bg-brutalist-ink text-brutalist-paper" : "bg-white"
                }`}
              >
                <div
                  className={`font-display font-bold shrink-0 w-10 h-10 flex items-center justify-center border-[3px] border-brutalist-ink ${clause.color}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="text-sm leading-relaxed">{clause.text}</p>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
