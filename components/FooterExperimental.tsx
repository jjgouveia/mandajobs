import Link from "next/link";
import RepoStarsCount from "./RepoStarsCount";

export default function FooterExperimental() {
  return (
    <footer className="z-50 bg-slate-900/60">
      <div className="pt-16 sm:pt-24 lg:pt-0 px-6 pb-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 mt-4">
          <div className="space-y-8">
            <p className="max-w-lg font-body text-base text-neutral-400">
              O Manda Jobs é uma plataforma que conecta profissionais com as
              melhores oportunidades do LinkedIn por meio de inteligência
              artificial.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div className="flex flex-col text-center">
                <h2 className="text-lg font-medium text-neutral-100">
                  Navegação
                </h2>
                <p className="mt-4 text-sm text-neutral-400">
                  <Link
                    href="/"
                    className="hover:text-slate-500 transition"
                    title="Home"
                  >
                    Home
                  </Link>
                </p>
                <p className="mt-4 text-sm text-neutral-400">
                  <Link
                    href="/search"
                    className="hover:text-slate-500 transition"
                    title="Search"
                  >
                    Search
                  </Link>
                </p>
                {/* <p className="mt-4 text-sm text-neutral-400">
                  <Link
                    href="/about"
                    className="hover:text-slate-500 transition"
                    title="About"
                  >
                    About
                  </Link>
                </p> */}
                <p className="mt-4 text-sm text-neutral-400">
                  <Link
                    href="/termos-de-uso"
                    className="hover:text-slate-500 transition"
                    title="Termos de Uso"
                  >
                    Termos de Uso
                  </Link>
                </p>
              </div>
              <div className="mt-10 md:mt-0"></div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8 text-center">
              <div>
                <h2 className="text-lg font-medium text-neutral-100">
                  Produtos
                </h2>
                <p className="mt-4 text-sm text-neutral-400">
                  <Link
                    href=""
                    className="hover:text-slate-500 transition"
                    title="ResumeAI"
                  >
                    ResumeAI - <strong>Em breve</strong>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-100/10 pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col  items-start gap-y-1 ">
            <div className="text-center h-15 sm:h-18 w-full sm:pt-2 pt-4 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-1">
              <div className="text-slate-200 mt-3">
                Powered by{" "}
                <a
                  href="https://openai.com/blog/chatgpt"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold hover:underline transition underline-offset-2"
                  title="ChatGPT"
                >
                  OpenAI{" "}
                </a>
              </div>
              <div className="flex space-x-4 pb-4 sm:pb-0">
                <Link
                  href="https://www.linkedin.com/in/jarbasgouveia/"
                  className="group"
                  aria-label="Jr Gouveia on LinkedIn"
                  title="Jr Gouveia on LinkedIn"
                >
                  <svg
                    fill="#000000"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    className="h-5 w-5 fill-slate-500 group-hover:fill-slate-700"
                  >
                    <g id="7935ec95c421cee6d86eb22ecd125aef">
                      <path
                        style={{
                          display: "inline",
                          fillRule: "evenodd",
                          clipRule: "evenodd",
                        }}
                        d="M116.504,500.219V170.654H6.975v329.564H116.504
		L116.504,500.219z M61.751,125.674c38.183,0,61.968-25.328,61.968-56.953c-0.722-32.328-23.785-56.941-61.252-56.941
		C24.994,11.781,0.5,36.394,0.5,68.722c0,31.625,23.772,56.953,60.53,56.953H61.751L61.751,125.674z M177.124,500.219
		c0,0,1.437-298.643,0-329.564H286.67v47.794h-0.727c14.404-22.49,40.354-55.533,99.44-55.533
		c72.085,0,126.116,47.103,126.116,148.333v188.971H401.971V323.912c0-44.301-15.848-74.531-55.497-74.531
		c-30.254,0-48.284,20.38-56.202,40.08c-2.897,7.012-3.602,16.861-3.602,26.711v184.047H177.124L177.124,500.219z"
                      ></path>
                    </g>
                  </svg>
                </Link>
                <RepoStarsCount user="jjgouveia" repo="mandajobs" />
                <Link
                  href="https://github.com/jjgouveia"
                  className="group"
                  aria-label="Jr Gouveia on GitHub"
                  title="Jr Gouveia on GitHub"
                >
                  <svg
                    aria-hidden="true"
                    className="h-6 w-6 fill-slate-500 group-hover:fill-slate-700"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-xs text-slate-400 text-center">
                Copyright © {new Date().getFullYear()} Manda Jobs. Este site não
                é afiliado ao LinkedIn, OpenAI ou qualquer outra empresa
                mencionada. Ao utilizá-lo, você concorda com os nossos{" "}
                <Link
                  className="underline hover:text-slate-500 transition"
                  href="/termos-de-uso"
                >
                  termos de uso
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
