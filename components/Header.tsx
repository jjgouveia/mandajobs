import Link from "next/link";

export default function Header() {
  return (
    <div className="bg-brutalist-yellow border-b-[3px] border-brutalist-ink">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display font-bold text-lg bg-brutalist-ink text-brutalist-yellow px-3 py-1.5 no-underline"
        >
          MANDA JOBS
        </Link>
        <nav className="hidden sm:flex items-center gap-8 font-display font-bold text-sm uppercase tracking-tight">
          <Link href="/#missao" className="no-underline text-brutalist-ink hover:text-brutalist-blue">
            Missão
          </Link>
          <Link href="/#duvidas" className="no-underline text-brutalist-ink hover:text-brutalist-blue">
            Dúvidas
          </Link>
          <Link href="/termos-de-uso" className="no-underline text-brutalist-ink hover:text-brutalist-blue">
            Termos de Uso
          </Link>
        </nav>
      </div>
    </div>
  );
}
