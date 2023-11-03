import { Dialog, Transition } from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { fetchStars } from "../../utils/fetchRepoStars";

type HeadlessModalProps = {
  query: string;
  text: string;
  btnTwdClass?: string;
};

export default function HeadlessModal({
  query,
  text,
  btnTwdClass,
}: HeadlessModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCloseButton, setShowCloseButton] = useState(false);

  const [stars, setStars] = useState<number>(0);

  const fetchStarsCount = async (user: String, repo: String) => {
    let query = new fetchStars(user, repo);
    let response = await query.getStars();
    return response;
  };

  useEffect(() => {
    fetchStarsCount("jjgouveia", "mandajobs").then((response) =>
      setStars(response)
    );
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handlerAlreadySupport() {
    localStorage.setItem("mandajobs_support", "true");
  }

  let research = `https://www.linkedin.com/jobs/search/?currentJobId=3644169029&geoId=106057199&keywords=${query}&location=Brasil&refresh=true`;

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button type="button" onClick={openModal} className={btnTwdClass}>
          <span style={{ letterSpacing: "0.05rem" }}>{text}</span>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                  <div className="w-full flex justify-end">
                    <button type="button" onClick={closeModal}>
                      <XMarkIcon className="h-6 w-6 text-red-400" />
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 items-center align-middle flex"
                  >
                    Seu apoio é muito importante{" "}
                    {<StarIcon className="h-6 w-6 ml-1 fill-yellow-500" />}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 text-justify">
                      Você sabia que o Manda Jobs é um projeto que facilita a
                      busca por vagas de emprego no LinkedIn, permitindo
                      encontrar aquelas que mais se encaixam no seu perfil? Se
                      gostou da ideia, deixe uma estrela no nosso repositório no
                      GitHub e compartilhe com seus amigos. Assim, você me ajuda
                      a divulgar o projeto e me motiva a continuar trabalhando
                      nessa iniciativa.
                    </p>
                  </div>

                  <div className="mt-4 flex flex-col justify-between">
                    <div>
                      <Link
                        target="__blank"
                        href={"https://github.com/jjgouveia/mandajobs"}
                        className="lg font-semibold flex items-center justify-center rounded-md border border-transparent bg-amber-300 py-3 text-md text-gray-900 hover:bg-amber-400 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className="mr-3 h-6 w-6 fill-black"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
                          ></path>
                        </svg>
                        Dar uma estrela no Github
                      </Link>
                      <Link href={research} className="text-md">
                        <button
                          className="w-full lg font-semibold text-md flex items-center justify-center rounded-md border border-transparent bg-green-300 px-4 py-2 text-gray-900 hover:bg-green-400 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 mt-2"
                          onClick={handlerAlreadySupport}
                        >
                          Seguir para as vagas
                        </button>
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-2 w-full"></div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
