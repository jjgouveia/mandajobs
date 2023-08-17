import { Analytics } from "@vercel/analytics/react";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { levelType } from "../components/DropDown";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [tools, setTools] = useState("");
  const [boringTools, setBoringTools] = useState("");
  const [level, setLevel] = useState<levelType>("Junior");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const switchLevel = () => {
    switch (level) {
      case "Pleno":
        return "only Pleno titles";
      case "Senior":
        return "only Seniors titles";
      case "Junior":
        return "only Junior titles";
      default:
        return "";
    }
  };

  const prompt = `Create a query for I use in linkedin searchbar. Use the operators AND, OR, NOT e () for that. Just give me the code, without explanation.
  I'm a ${title} developer that uses ${tools} and don't like to use ${boringTools}. , ${switchLevel()}
  `;

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? "";
          setGeneratedBios((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    };

    // https://web.dev/streams/#the-getreader-and-read-methods
    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("mandaJobsFirst") !== "false") {
      toast("Bem vindo ao Manda Jobs! 🚀", {
        icon: "🚀",
      });
      localStorage.setItem("mandaJobsFirst", "false");
    }
    if (localStorage.getItem("mandaJobsTheme") === "dark") {
      document.documentElement.classList.add("dark");
    }

    const themePreference = () => {
      const hasLocalStorage = localStorage.getItem("mandaJobsTheme");

      let supports = false;
      let theme = undefined;

      if (hasLocalStorage === "light") {
        theme = "light";
      }
      if (hasLocalStorage === "dark") {
        theme = "dark";
      }

      if (window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
        theme = hasLocalStorage ? hasLocalStorage : "dark";
        supports = true;
      }
      if (window.matchMedia(`(prefers-color-scheme: light)`).matches) {
        theme = hasLocalStorage ? hasLocalStorage : "light";
        supports = true;
      }
      if (window.matchMedia(`(prefers-color-scheme: no-preference)`).matches) {
        theme = hasLocalStorage ? hasLocalStorage : "none";
        supports = true;
      }

      return { supports, theme };
    };

    const setTheme = () => {
      const userThemePreference = themePreference();
      switch (userThemePreference.theme) {
        case "dark":
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");

          break;
        case "light":
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
          break;
      }
    };

    setTheme();
  }, []);

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Manda Jobs</title>
        <link rel="icon" href="/manda_jobs_logo.svg" />
      </Head>
      <Header />

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-8 sm:mt-12">
        <br />
        <p className="text-slate-500 -mt-5">
          Otimize a sua busca por vagas no LinkedIn através da consulta booleana
          e garanta as melhores oportunidades para o seu perfil
        </p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">1</p>
            <p className="text-left font-medium">Em qual posição você atua:</p>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"Ex.: front-end, back-end, fullstack..."}
          />
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">2</p>
            <p className="text-left font-medium">
              Tecnologias que você utiliza:
            </p>
          </div>
          <input
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"Ex.: Angular, Next.js, React, Java, Node, Fé..."}
          />
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">3</p>
            <p className="text-left font-medium">
              Tecnologias que você NÃO utiliza:
            </p>
          </div>
          <input
            value={boringTools}
            onChange={(e) => setBoringTools(e.target.value)}
            className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"Ex.: PHP, Ruby, Olho de Agamoto..."}
          />
          <div className="flex mb-5 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">4</p>
            <p className="text-left font-medium">
              Nível de senioridade:
              <span className="text-sm text-slate-500">
                {" "}
                (Junior por padrão)
              </span>
            </p>
          </div>
          <div className="block">
            <DropDown
              level={level}
              setLevel={(newlevel) => setLevel(newlevel)}
            />
          </div>

          {!loading && (
            <button
              className="bg-blue-600 rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-blue-500 w-full"
              onClick={(e) => generateBio(e)}
            >
              Gerar consulta ✨
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <div className="space-y-10 my-10">
          {generatedBios && (
            <>
              <div>
                <h2
                  className="sm:text-4xl text-3xl font-bold mx-auto"
                  ref={bioRef}
                >
                  Sua consulta personalizada
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 0)
                  .split("2.")
                  .map((generatedBio) => {
                    return (
                      <>
                        <div
                          className={
                            "bg-gray-50 rounded-xl text-black font-medium px-4 py-2 sm:mt-0 mt-0 hover:bg-gray-200 w-full"
                          }
                          onClick={() => {
                            navigator.clipboard.writeText(generatedBio);
                            toast("Consulta copiada!", {
                              icon: "🚀",
                            });
                          }}
                          key={generatedBio}
                        >
                          <p
                            key={generatedBio + "1"}
                            className="text-sm text-slate-400"
                          >
                            (Clique para copiar)
                          </p>

                          <p className="query">{generatedBio}</p>
                        </div>
                        <p className="text-sm text-slate-400 -pb-5">- ou -</p>
                        <Link
                          href={`https://www.linkedin.com/jobs/search/?currentJobId=3644169029&geoId=106057199&keywords=${generatedBio}&location=Brasil&refresh=true`}
                          target="_blank"
                        >
                          <button className="bg-blue-600 rounded-xl text-white font-medium px-4 py-2 sm:mt-0 mt-0 hover:bg-blue-500 w-full">
                            Explorar vagas no LinkedIn🚀
                          </button>
                        </Link>
                      </>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
};

export default Home;
