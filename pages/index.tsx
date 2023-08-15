import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { levelType } from "../components/DropDown";
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

  const prompt = `Create a perfect query for I use in linkedin searchbar, use the opperators AND, OR, NOT e () for that. Just give me the code, without explanation.
  I'm a ${title} professional that uses ${tools} and don't like to use ${boringTools}. , ${switchLevel()}
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

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Explorador de Vagas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-12">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full bg-blue-600 px-4 py-2 text-sm text-white shadow-md transition-colors hover:bg-blue-500 mb-5"
          href="https://www.linkedin.com/in/daniellimae/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>by @jrgouveia</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Radar de Vagas
        </h1>
        <br />
        <Image
          src="/searchbar.png"
          width={400}
          height={400}
          alt="1 icon"
          className="mb-5 sm:mb-0"
        />
        <p className="text-slate-500 mt-5">
          Busque de forma inteligente e encontre vagas que se encaixam no seu
          perfil de acordo com o algoritmo do LinkedIn.
        </p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">1</p>
            <p className="text-left font-medium">Sua profissão:</p>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"Ex.: Frontend, Backend, Fullstack ..."}
          />
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">2</p>
            <p className="text-left font-medium">Tecnologias que você usa:</p>
          </div>
          <input
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"Ex.: Angular, Next.js, React, Java, Node..."}
          />
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">3</p>
            <p className="text-left font-medium">
              Tecnologias que você NÃO usa:
            </p>
          </div>
          <input
            value={boringTools}
            onChange={(e) => setBoringTools(e.target.value)}
            className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"Ex.: PHP, Ruby, Magic"}
          />
          <div className="flex mb-5 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">4</p>
            <p className="text-left font-medium">
              Seu nível de senioridade
              <span className="text-slate-500"> (Padrão: Junior)</span>
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
              Melhore as minhas buscas
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
                  className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                  ref={bioRef}
                >
                  Sua consulta personalizada:
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 0)
                  .split("2.")
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Consulta copiada!", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}
                      >
                        <p>{generatedBio}</p>
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
