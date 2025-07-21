import { Analytics } from "@vercel/analytics/react";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { levelType } from "../components/DropDown";
import FooterExperimental from "../components/FooterExperimental";
import HeaderExperimental from "../components/HeaderExperimental";
import LoadingDots from "../components/LoadingDots";
import { PartnerCompanies } from "../components/PartnerCompanies";
import QueryCounterComponent from "../components/QueryCounterComponent";
import Title from "../components/Title";
import HeadlessModal from "../components/ui/HeadlessModal";
import getSubscriberCount from "../hooks/getQueriesCount";
// import { supabase } from "../utils/supabase"; // Removed Supabase import
import { db } from "../utils/firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const Search: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [tools, setTools] = useState("");
  const [toolsIdontUse, setToolsIdontUse] = useState("");
  const [level, setLevel] = useState<levelType>("Junior");
  const [generatedQuery, setgeneratedQuery] = useState<string | undefined>(
    undefined
  );
  const [counter, setCounter] = useState<number>(828);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const query = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (query.current !== null) {
      query.current.scrollIntoView({ behavior: "smooth" });
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
      case "Estagiário":
        return "only Intern or Internship or Estágio titles";
      default:
        return "";
    }
  };

  const insertQuery = async (query_string: string): Promise<void> => {
    try {
      await addDoc(collection(db, "queries"), {
        query_string: query_string,
        timestamp: new Date(), // Optional: Add a timestamp
      });
      console.log("Query successfully inserted into Firestore");
    } catch (error) {
      console.error("Error inserting query into Firestore: ", error);
    }
  };

  const prompt = `Create a query for I use in linkedin searchbar. Use the operators AND, OR, NOT e () for that. Just give me the code, without explanation.
  I'm a ${title} professional that uses ${tools} and don't work with ${toolsIdontUse}. ${switchLevel()}
  `;

  const generateQuery = async (e: any) => {
    e.preventDefault();
    setgeneratedQuery("");
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

    const data = response.body;
    if (!data) {
      return;
    }

    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? "";
          setgeneratedQuery((prev) => prev + text);
        } catch (e) {
          console.error(e);
        }
      }
    };

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
    if (generatedQuery && loading === false) {
      insertQuery(generatedQuery);
      getSubscriberCount(setCounter);
    }
  }, [loading]);

  useEffect(() => {
    getSubscriberCount(setCounter);
  }, []);

  return (
    <>
      <Title title="Manda Jobs - Filtro Inteligente" />
      <main className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
        <HeaderExperimental />
        <div className="animate-fade-up animate-once animate-delay-[600ms] z-10 flex flex-1 w-full flex-col items-center justify-center text-center px-2 mt-8 sm:mt-0 sm:-mb-10">
          {/* <p className="mb-1 mt-1 text-md font-medium max-xl:max-w-sm md:text-xl">
            Preencha os campos abaixo para gerar uma consulta personalizada
          </p> */}
          <div className="max-w-xl w-full z-11">
            <ul className="px-3 z-12">
              <li>
                <div className="flex mt-4 items-center space-x-3 text-gray-300 text-sm">
                  <p className="text-left font-medium">1.</p>
                  <p className="text-left font-medium">
                    Em qual posição você atua:
                  </p>
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={`Ex.: fullstack, devops, etc`}
                />
              </li>
              <li>
                <div className="flex mt-4 items-center space-x-3 text-gray-300 text-sm">
                  <p className="text-left font-medium">2.</p>
                  <p className="text-left font-medium">
                    Tecnologias que você utiliza:
                  </p>
                </div>
                <input
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                  className="mt-2 mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={"Ex.: react, node, java, etc"}
                />
              </li>
              <li>
                <div className="flex mt-4 items-center space-x-3 text-gray-300 text-sm">
                  <p className="text-left font-medium">3.</p>
                  <p className="text-left font-medium">
                    Tecnologias que você NÃO utiliza:
                  </p>
                </div>
                <input
                  value={toolsIdontUse}
                  onChange={(e) => setToolsIdontUse(e.target.value)}
                  className="mt-2 mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={"Ex.: php, ruby..."}
                />
              </li>
              <li>
                <div className="flex mb-2 items-center space-x-3 text-gray-300 text-sm">
                  <p className="text-left font-medium">4.</p>
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
              </li>
            </ul>

            {!loading && (
              <button
                className="bg-blue-600 transition-all transition-duration-2000 rounded-xl text-white font-medium px-4 py-2 sm:mt-6 mt-8 hover:bg-blue-500 w-full disabled:bg-blue-300 disabled:cursor-not-allowed"
                onClick={(e) => generateQuery(e)}
                disabled={title === "" || tools === "" || toolsIdontUse === ""}
              >
                <span style={{ letterSpacing: "0.05rem" }}>Consultar ✨</span>
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
            toastOptions={{ duration: 2500 }}
          />
          <div className="max-w-xl w-full">
            <QueryCounterComponent counter={counter} />
            <PartnerCompanies />
          </div>

          <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
          <div className="space-y-10 my-10">
            {generatedQuery && (
              <>
                <div>
                  <h2
                    className="sm:text-4xl text-3xl font-bold mx-auto"
                    ref={query}
                  >
                    Sua consulta personalizada ✨
                  </h2>
                </div>
                <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                  {generatedQuery
                    .substring(generatedQuery.indexOf("1") + 0)
                    .split("2.")
                    .map((q) => {
                      return (
                        <>
                          <div
                            id="query"
                            className={
                              "bg-gray-50 rounded-xl text-black font-medium px-4 py-2 sm:mt-0 mt-0 hover:bg-gray-200 w-full"
                            }
                            style={{
                              cursor: "pointer",
                              border: "1px solid #e5e7eb",
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(q);
                              toast("Consulta copiada!", {
                                icon: "📋",
                              });
                            }}
                            key={q}
                          >
                            <p
                              key={q + q.split("2")}
                              className="text-sm text-slate-400"
                            >
                              (Clique para copiar)
                            </p>

                            <p className="query">{q}</p>
                          </div>
                          <p className="text-sm text-slate-400 -pb-5">- ou -</p>
                          <div className="w-full">
                            <HeadlessModal
                              query={generatedQuery}
                              text={"Consultar vagas no LinkedIn 🚀"}
                              btnTwdClass="sm:mb-8 sm:border-b sm:border-slate-800 bg-green-600 transition-all transition-duration-2000 rounded-xl text-white font-medium px-4 py-2 sm:mt-0 mt-0 hover:bg-green-500 w-full"
                            />
                          </div>
                        </>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        </div>
        <FooterExperimental />
        <Analytics />
      </main>
    </>
  );
};

export default Search;
