import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import UseGetPreviousRoute from "../hooks/UseGetPreviousRoute";

export default function HeaderExperimental() {
  const [isMobileNavVisible, setMobileNavVisibility] = useState(false);

  const { push, pathname } = useRouter();
  const previousRoute = UseGetPreviousRoute(pathname);

  return (
    <header className="flex justify-between items-center w-full mt-3 pb-1 sm:px-4 px-2">
      <div
        className={`relative w-full flex items-center justify-between bg-transparent pb-4 lg:px-4 ${
          previousRoute === "/" || previousRoute
            ? "animate-fade-down animate-once animate-delay-700"
            : ""
        }`}
      >
        <div className="w-full">
          <div className="flex flex-wrap items-center w-full justify-between">
            <Link href="/" role="button" tabIndex={0} className="flex w-auto ">
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
                  <button onClick={() => push("/#values")}>Nossa Missão</button>
                </li>
                <li className="mr-9 font-medium hover:text-gray-700">
                  <button onClick={() => push("/#faq")}>
                    Perguntas Frequentes
                  </button>
                </li>
                <li className="mr-9 font-medium hover:text-gray-700">
                  <button onClick={() => push("/#partners")}>Apoiadores</button>
                </li>
                {previousRoute !== "/search" && (
                  <li className="mr-9 font-medium hover:text-gray-700">
                    <button onClick={() => push("/search")}>
                      <span className="border-b">Começar!</span>
                    </button>
                  </li>
                )}
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
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileNavVisible && (
        <div
          className="navbar-menu fixed bottom-0 left-0 top-0 z-[51] w-4/6 sm:max-w-xs lg:hidden"
          role="dialog"
          aria-modal={isMobileNavVisible}
        >
          <div className="navbar-backdrop animate-fade-right fixed inset-0 bg-gray-800">
            <nav className="relative h-full overflow-y-auto bg-white px-8 pt-8">
              <div className="flex h-full flex-wrap justify-between w-4/5">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="mr-6 w-full"
                      role="button"
                      tabIndex={0}
                    >
                      <h1 className="flex items-end h-auto text-gray-900 sm:text-3xl text-2xl  tracking-tight">
                        Manda Jobs{" "}
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
                    <li className="mb-12 text-gray-900">
                      <button
                        onClick={() => {
                          push("/#values"), setMobileNavVisibility(false);
                        }}
                      >
                        Nossa Missão
                      </button>
                    </li>
                    <li className="mb-12  text-gray-900">
                      <button
                        onClick={() => {
                          push("/#faq"), setMobileNavVisibility(false);
                        }}
                      >
                        Perguntas Frequentes
                      </button>
                    </li>
                    <li className="mb-12  text-gray-900">
                      <button
                        onClick={() => {
                          push("/#partners"), setMobileNavVisibility(false);
                        }}
                      >
                        Nossos Apoiadores
                      </button>
                    </li>
                    <li className="mb-12  text-gray-900">
                      <button
                        onClick={() => {
                          push("/#how-it-works"), setMobileNavVisibility(false);
                        }}
                      >
                        Como Funciona
                      </button>
                    </li>

                    <li className="mb-12  text-gray-900">
                      <button
                        onClick={() => {
                          push("/search"), setMobileNavVisibility(false);
                        }}
                      >
                        Começar!
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
