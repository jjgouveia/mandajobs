import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="go" className="mt-12 min-h-full min-w-full z-50">
      <div className="w-full bg-slate-900/50">
        <div className="max-w-7xl mx-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-extrabold text-white text-center">
            Pronto para começar?
          </h2>
          <p className="mt-4 max-w-full text-center text-lg text-slate-200">
            Inicie uma busca inteligente de vagas agora mesmo.
          </p>
          <div className="w-full flex justify-center">
            <Link
              href="/search"
              role="button"
              tabIndex={0}
              className="flex w-auto pt-4"
            >
              <button className="flex bg-slate-800/20 p-2 rounded-md border border-slate-100">
                <Image
                  alt="header text"
                  src="/handshake.svg"
                  width={56}
                  height={56}
                  className="sm:w-14 sm:h-14 w-10 h-10"
                />
                <h2 className="text-gray-100 sm:text-4xl text-4xl font-semibold ml-2 tracking-tight m-0.5 sm:m-2 sm:ml-2">
                  Começar!
                </h2>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
