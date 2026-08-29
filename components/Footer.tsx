import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import RepoStarsCount from "./RepoStarsCount";

export default function Footer() {
  return (
    <footer className="bg-brutalist-ink text-brutalist-paper border-t-[6px] border-brutalist-ink">
      <div className="max-w-4xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-display font-bold text-lg text-brutalist-yellow mb-3">MANDA JOBS</div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Plataforma que conecta profissionais com as melhores oportunidades do LinkedIn por meio de inteligência artificial.
            </p>
          </div>
          <div>
            <div className="font-display font-bold text-xs uppercase tracking-wide text-brutalist-yellow mb-3">
              Navegação
            </div>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <Link href="/" className="no-underline hover:text-white">
                Home
              </Link>
              <Link href="/quem-faz" className="no-underline hover:text-white">
                Quem faz
              </Link>
              <Link href="/termos-de-uso" className="no-underline hover:text-white">
                Termos de Uso
              </Link>
            </div>
          </div>
          <div>
            <div className="font-display font-bold text-xs uppercase tracking-wide text-brutalist-yellow mb-3">
              Produtos
            </div>
            <div className="text-sm text-gray-300 flex items-center gap-2">
              ResumeAI
              <span className="font-display bg-brutalist-pink text-brutalist-ink text-[10px] font-bold px-2 py-0.5 uppercase">
                Em breve
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            Powered by{" "}
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-brutalist-yellow font-semibold no-underline hover:underline"
            >
              Gemini
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="https://www.linkedin.com/in/jarbasgouveia/"
              target="_blank"
              rel="noreferrer"
              aria-label="Jr Gouveia on LinkedIn"
              title="Jr Gouveia on LinkedIn"
              className="p-2 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4 text-gray-300" />
            </Link>
            <RepoStarsCount user="jjgouveia" repo="mandajobs" />
            <Link
              href="https://github.com/jjgouveia"
              target="_blank"
              rel="noreferrer"
              aria-label="Jr Gouveia on GitHub"
              title="Jr Gouveia on GitHub"
              className="p-2 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4 text-gray-300" />
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-6 leading-relaxed">
          Copyright © {new Date().getFullYear()} Manda Jobs. Este site não é afiliado ao LinkedIn, Gemini ou qualquer
          outra empresa mencionada. Ao utilizá-lo, você concorda com os nossos{" "}
          <Link href="/termos-de-uso" className="text-brutalist-yellow underline">
            termos de uso
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
