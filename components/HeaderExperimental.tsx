import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function HeaderExperimental() {
  const [isMobileNavVisible, setMobileNavVisibility] = useState(false);

  return (
    <header className="flex justify-between items-center w-full mt-0 pb-1 sm:px-4 px-2 border-b border-gray-100">
      <div className="relative w-full flex items-center justify-between bg-transparent py-4 lg:px-4">
        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <Link href="/" role="button" tabIndex={0} className="flex w-auto">
              <Image
                alt="header text"
                src="/handshake.svg"
                width={56}
                height={56}
                className="sm:w-14 sm:h-14 w-10 h-10"
              />
              <h1 className="text-gray-100 sm:text-4xl text-4xl font-semibold ml-2 tracking-tight m-0.5 sm:m-2 sm:ml-2">
                Manda Jobs
              </h1>
            </Link>
            <nav className="hidden w-auto lg:block text-gray-100">
              <ul className="mr-16 flex items-center">
                <li className="mr-9 font-medium hover:text-gray-700">
                  <Link href="#valores">Nossos Valores</Link>
                </li>
                <li className="mr-9 font-medium hover:text-gray-700">
                  <Link href="#como-funciona">Como Funciona</Link>
                </li>
                <li className="mr-9 font-medium hover:text-gray-700">
                  <a href="#perguntas-frequentes">Perguntas Frequentes</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="w-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-auto lg:hidden">
              <button
                type="button"
                onClick={() => setMobileNavVisibility(true)}
                aria-label="Abrir menu lateral"
              >
                <svg
                  className="navbar-burger text-blue-500"
                  width={51}
                  height={51}
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width={56} height={56} rx={28} fill="currentColor" />
                  <path
                    d="M37 32H19M37 24H19"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileNavVisible && (
        <div
          className="navbar-menu fixed bottom-0 left-0 top-0 z-50 w-4/6 sm:max-w-xs lg:hidden"
          role="dialog"
          aria-modal={isMobileNavVisible}
        >
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-80" />
          <nav className="relative h-full overflow-y-auto bg-white px-8 pt-8">
            <div className="flex h-full flex-wrap justify-between">
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <Link
                    href="/"
                    className="mr-6 w-full"
                    role="button"
                    tabIndex={0}
                  >
                    <h1 className="flex items-end h-auto text-gray-900 sm:text-3xl text-2xl font-semibold tracking-tight">
                      ResumeAI{" "}
                      <span className="text-xs pl-1 pb-1 text-slate-400">
                        beta
                      </span>
                    </h1>
                  </Link>
                  <div className="w-auto p-2">
                    <button
                      type="button"
                      className="navbar-burger"
                      onClick={() => setMobileNavVisibility(false)}
                      aria-label="Fechar menu lateral"
                    >
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 18L18 6M6 6L18 18"
                          stroke="#111827"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col justify-center py-16">
                <ul>
                  <li className="mb-12">
                    <a
                      className="font-medium hover:text-gray-700"
                      href="#valores"
                      onClick={() => setMobileNavVisibility(false)}
                    >
                      Nossos Valores
                    </a>
                  </li>
                  <li className="mb-12">
                    <a
                      className="font-medium hover:text-gray-700"
                      href="#como-funciona"
                      onClick={() => setMobileNavVisibility(false)}
                    >
                      Como Funciona
                    </a>
                  </li>
                  <li>
                    <a
                      className="font-medium hover:text-gray-700"
                      href="#perguntas-frequentes"
                      onClick={() => setMobileNavVisibility(false)}
                    >
                      Perguntas Frequentes
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
