import Footer from "../components/Footer";
import Header from "../components/Header";

export default function TermosDeUso() {
  return (
    <>
      <title>Manda Jobs - Termos de Uso</title>
      <body>
        <Header />
        <main className="text-justify p-2 flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
          <h1 className="text-3xl font-bold mb-3 underline">Termos de Uso</h1>
          <p className="mb-3">
            O Manda Jobs é um site que oferece serviço(s) de otimização de busca
            por vagas de emprego. Ao acessar ou usar o site, você concorda em
            cumprir e se sujeitar aos seguintes termos e condições:{" "}
          </p>{" "}
          <ul className="list-disc list-inside">
            <li className="mb-2">
              Você é responsável por fornecer informações verdadeiras, completas
              e atualizadas sobre você e sua qualificação profissional. Você não
              deve usar o site para divulgar informações falsas, enganosas ou
              fraudulentas.
            </li>
            <li className="mb-2">
              Você é responsável por respeitar os direitos autorais, marcas
              registradas e outros direitos de propriedade intelectual dos
              conteúdos disponibilizados no site, bem como dos conteúdos que
              você enviar, publicar ou compartilhar. Você não deve usar o site
              para violar esses direitos ou para fins ilícitos ou indevidos.
            </li>
            <li className="mb-2">
              Você é responsável por cumprir as leis e regulamentos aplicáveis
              ao seu uso do site, bem como as políticas e diretrizes do Manda
              Jobs. Você não deve usar o site para praticar atos que possam
              prejudicar o site, seus usuários ou terceiros.
            </li>
            <li className="mb-2">
              O Manda Jobs não garante a veracidade, a qualidade, a segurança ou
              a legalidade dos conteúdos disponibilizados no site, nem a
              capacidade dos usuários de oferecer ou obter oportunidades de
              trabalho. O Manda Jobs não é parte nem se responsabiliza por
              qualquer relação contratual ou negocial entre os usuários do site.
            </li>
            <li className="mb-2">
              O Manda Jobs se reserva o direito de modificar, suspender ou
              encerrar o site ou qualquer parte dele a qualquer momento, sem
              aviso prévio ou responsabilidade. O Manda Jobs também se reserva o
              direito de modificar ou alterar estes termos de uso a qualquer
              momento, sendo que as mudanças entrarão em vigor imediatamente
              após a publicação no site.
            </li>
            <li className="mb-2">
              O uso do site é por sua conta e risco. O site é fornecido "no
              estado em que se encontra" e "conforme disponível", sem garantias
              expressas ou implícitas de qualquer tipo. O Manda Jobs não se
              responsabiliza por quaisquer danos diretos, indiretos,
              incidentais, especiais ou consequenciais decorrentes do uso ou da
              impossibilidade de uso do site.
            </li>
            <li>
              Estes termos de uso são regidos pelas leis brasileiras e quaisquer
              disputas relacionadas ao site serão submetidas à jurisdição dos
              tribunais competentes do Brasil. Ao usar o site, você declara que
              leu, entendeu e aceitou estes termos de uso. Se você não concordar
              com estes termos de uso, por favor, não use o site.
            </li>
          </ul>
        </main>
        <Footer />
      </body>
    </>
  );
}
