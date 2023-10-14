export default function HowItWorks() {
  return (
    <section id="como-funciona" className="overflow-hidden bg-[#141417] py-32">
      <div className="container mx-auto px-8 lg:px-4 overflow-hidden">
        <div className="-m-8 flex flex-wrap items-center">
          <div className="w-full p-8 lg:w-1/2">
            <figure>
              <img
                className="mx-auto transform rounded-2xl object-cover transition duration-1000 ease-in-out hover:-translate-y-4 max-lg:aspect-video max-lg:w-10/12 max-md:w-full"
                src="/assets/footer-image.webp"
                alt="Homem olhando para o pôr do sol no horizonte do mar"
                width={652}
                height={435}
              />
            </figure>
          </div>
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="font-heading max-xs:text-4xl mb-16 text-6xl font-bold leading-tight tracking-tight md:text-7xl">
              Como Funciona
            </h2>
            <div className="-m-1.5 flex flex-wrap">
              {/* card one starts here */}
              <div className="w-full p-1.5">
                <div className="xs:-m-6 max-xs:flex- gap-3 flex flex-wrap">
                  <div className="xs:p-6 w-auto">
                    <div className="xs:mb-3 relative h-10 w-10 rounded-full bg-blue-600 text-lg font-bold text-white">
                      <img
                        className="absolute left-0 top-0"
                        src="/assets/gradient.svg"
                        alt=""
                      />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        1
                      </span>
                    </div>
                  </div>
                  <div className="xs:p-6 flex-1 pb-6">
                    <div>
                      <h3 className="mb-3 text-2xl font-semibold leading-snug">
                        Faça o cadastro
                      </h3>
                      <p className="font-medium leading-relaxed text-gray-700">
                        Preencha o formulário de cadastro com seus dados e
                        algumas referências profissionais.
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
                      <img
                        className="absolute left-0 top-0"
                        src="/assets/gradient.svg"
                        alt=""
                      />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        2
                      </span>
                    </div>
                  </div>
                  <div className="xs:p-6 flex-1 pb-6">
                    <div>
                      <h3 className="mb-3 text-2xl font-semibold leading-snug">
                        Escolha o seu plano
                      </h3>
                      <p className="font-medium leading-relaxed text-gray-700">
                        Escolha o plano que mais se adeque às suas necessidades
                        e momento profissional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="w-full p-1.5">
                <div className="xs:-m-6 max-xs:flex-col flex flex-wrap">
                  <div className="xs:p-6 w-auto">
                    <div className="xs:-left-1 xs:mb-3 relative h-10 w-10 rounded-full
                    bg-indigo-600 text-lg font-bold text-white">
                      <img
                        className="absolute left-0 top-0"
                        src="/assets/gradient.svg"
                        alt=""
                      />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2
                      -translate-y-1/2 transform">
                        2
                      </span>
                    </div>
                    <img
                      className="max-xs:hidden relative"
                      src="/assets/line2.svg"
                      alt=""
                      width={23}
                      height={130}
                    />
                  </div>
                  <div className="xs:p-6 flex-1 py-6">
                    <div>
                      <h3 className="mb-3 text-2xl font-semibold leading-snug">
                        Analisamos as vagas
                      </h3>
                      <p className="font-medium leading-relaxed text-gray-700">
                        Nós cruzamos suas preferências com nossas vagas
                        disponíveis. (EM BREVE)
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* card two ends here */}
              {/* card three starts here */}
              <div className="w-full p-1.5">
                <div className="xs:-m-6 max-xs:flex- gap-3 flex flex-wrap">
                  <div className="xs:p-6 w-auto">
                    <div className="xs:mb-3 relative h-10 w-10 rounded-full bg-blue-600 text-lg font-bold text-white">
                      <img
                        className="absolute left-0 top-0"
                        src="/assets/gradient.svg"
                        alt=""
                      />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        3
                      </span>
                    </div>
                  </div>
                  <div className="xs:p-6 flex-1 pb-6">
                    <div>
                      <h3 className="mb-3 text-2xl font-semibold leading-snug">
                        Gere o seu currículo
                      </h3>
                      <p className="font-medium leading-relaxed text-gray-700">
                        Agora é por nossa conta! Crieremos o seu currículo com
                        base nas melhores práticas de mercado.
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
