import Image from "next/image";

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="overflow-hidden bg-[#141417] mt-32">
      <div className="container mx-auto px-8 lg:px-4 overflow-hidden">
        <div className="-m-8 flex flex-wrap items-center">
          <div className="w-full p-8 lg:w-1/2 mt-4">
            <Image
              className="mx-auto transform rounded-2xl object-cover transition duration-1000 ease-in-out hover:-translate-y-4 max-lg:aspect-video max-lg:w-10/12 max-md:w-full"
              src="/assets/ideogram.webp"
              alt="Homem olhando para o pôr do sol no horizonte do mar"
              width={652}
              height={435}
            />
          </div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="font-heading max-xs:text-4xl mb-16 text-6xl font-bold leading-tight tracking-tight md:text-7xl text-slate-200">
              Como Funciona
            </h2>
            <div className="-m-1.5 flex flex-wrap">
              {/* card one starts here */}
              <div className="w-full p-1.5">
                <div className="xs:-m-6 max-xs:flex- gap-3 flex flex-wrap">
                  <div className="xs:p-6 w-auto">
                    <div className="xs:mb-3 relative h-10 w-10 rounded-full bg-blue-600 text-lg font-bold text-white">
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        1
                      </span>
                    </div>
                  </div>
                  <div className="xs:p-6 flex-1 pb-6">
                    <div>
                      <h3 className="mb-3 text-2xl font-semibold leading-snug text-slate-200">
                        Acesse o formulário
                      </h3>
                      <p className="font-medium leading-relaxed text-slate-200">
                        Preencha as informações solicitadas no formulário para
                        que possamos entender melhor o seu perfil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* card one ends here */}
              {/* card two starts here */}
              <div className="w-full p-1.5">
                <div className="xs:-m-6 max-xs:flex- gap-3 flex flex-wrap">
                  <div className="xs:p-6 w-auto">
                    <div className="xs:mb-3 relative h-10 w-10 rounded-full bg-blue-600 text-lg font-bold text-white">
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        2
                      </span>
                    </div>
                  </div>
                  <div className="xs:p-6 flex-1 pb-6">
                    <div>
                      <h3 className="mb-3 text-2xl font-semibold leading-snug text-slate-200">
                        Faça a consulta
                      </h3>
                      <p className="font-medium leading-relaxed text-slate-200">
                        Após preencher o formulário, você receberá uma consulta
                        com as vagas que mais se encaixam com o seu perfil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* card two ends here */}
              {/* card three starts here */}
              <div className="w-full p-1.5">
                <div className="xs:-m-6 max-xs:flex- gap-3 flex flex-wrap">
                  <div className="xs:p-6 w-auto">
                    <div className="xs:mb-3 relative h-10 w-10 rounded-full bg-blue-600 text-lg font-bold text-white">
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        3
                      </span>
                    </div>
                  </div>
                  <div className="xs:p-6 flex-1 pb-6">
                    <div>
                      <h3 className="mb-3 text-2xl font-semibold leading-snug text-slate-200">
                        Ir para o LinkedIn
                      </h3>
                      <p className="font-medium leading-relaxed text-slate-200">
                        Agora é por sua conta! Acesse o LinkedIn e envie as
                        candidaturas para as vagas que mais se encaixam com o
                        seu perfil.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* card three ends here */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
