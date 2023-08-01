import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { levelType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [tools, setTools] = useState("");
  const [boringTools, setBoringTools] = useState("");
  const [level, setLevel] = useState<levelType>("Do not especify");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const bioRef = useRef<null | HTMLDivElement>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const switchLevel = () => {
    switch (level) {
      case "Do not especify":
        return "";
        break;
      case "Senior":
        return "only Seniors titles";
        break;
      case "Junior":
        return "only Junior titles";
        break;
      default:
        return "";
    }
  };

  const prompt = `Create a perfect query for i use in linkedin searchbar, use the opperators AND, OR, NOT e () for that.Just give me the code, without explanation.
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
        <title>Linkesearch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <Header /> */}
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-12">
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full bg-blue-600 px-4 py-2 text-sm text-white shadow-md transition-colors hover:bg-blue-500 mb-5"
          href="https://www.linkedin.com/in/daniellimae/"
          target="_blank"
          rel="noopener noreferrer">
          <p>by @daniellimae</p>
        </a>
        <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
          Linkesearch
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
          Search smarter, boost your chances with our LinkedIn assistant
        </p>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">1</p>
            <p className="text-left font-medium">
              Your job title
              <span className="text-slate-500">
                ( don't worrie about details, just a word )
              </span>
              .
            </p>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"Example: Frontend"}
          />
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">2</p>
            <p className="text-left font-medium">
              Tools that you use
              <span className="text-slate-500">
                ( Languages to code, excel toolkit ... )
              </span>
              .
            </p>
          </div>
          <input
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"Example: React, Angular, Javascript..."}
          />
          <div className="flex mt-10 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">3</p>
            <p className="text-left font-medium">
              Tools that you wouldn't like to work with.
            </p>
          </div>
          <input
            value={boringTools}
            onChange={(e) => setBoringTools(e.target.value)}
            className="mt-4 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={"Example: Php, Java, Javascript..."}
          />
          <div className="flex mb-5 items-center space-x-3">
            <p className="text-left font-medium text-blue-600">4</p>
            <p className="text-left font-medium">
              Your level{" "}
              <span className="text-slate-500">
                ( mid-levels do not especify )
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
              onClick={(e) => generateBio(e)}>
              Improve my linkesearch
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled>
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
                  ref={bioRef}>
                  Your query to search:
                </h2>
              </div>
              <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                {generatedBios
                  .substring(generatedBios.indexOf("1") + 3)
                  .split("2.")
                  .map((generatedBio) => {
                    return (
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBio);
                          toast("Linkeseach copied to clipboard", {
                            icon: "✂️",
                          });
                        }}
                        key={generatedBio}>
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
