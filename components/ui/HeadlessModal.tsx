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
                <Dialog.Panel className="relative w-full max-w-md transform border-[3px] border-brutalist-ink bg-white p-8 text-left align-middle shadow-brutal-md transition-all">
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Fechar"
                    className="absolute -top-3.5 -right-3.5 w-8 h-8 flex items-center justify-center border-[3px] border-brutalist-ink bg-brutalist-pink"
                  >
                    <XMarkIcon className="h-4 w-4 text-brutalist-ink" />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="font-display text-xl font-bold uppercase leading-tight flex items-center gap-2 mb-4"
                  >
                    Seu apoio é muito importante
                    <StarIcon className="h-5 w-5 fill-brutalist-yellow stroke-brutalist-ink shrink-0" />
                  </Dialog.Title>
                  <div>
                    <p className="text-sm leading-relaxed text-brutalist-ink/70">
                      Você sabia que o Manda Jobs é um projeto que facilita a
                      busca por vagas de emprego no LinkedIn, permitindo
                      encontrar aquelas que mais se encaixam no seu perfil? Se
                      gostou da ideia, deixe uma estrela no nosso repositório no
                      GitHub e compartilhe com seus amigos. Assim, você me ajuda
                      a divulgar o projeto e me motiva a continuar trabalhando
                      nessa iniciativa.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      target="_blank"
                      href={"https://github.com/jjgouveia/mandajobs"}
                      className="font-display font-bold uppercase text-sm flex items-center justify-center gap-2 border-[3px] border-brutalist-ink bg-brutalist-yellow py-3 text-brutalist-ink hover:bg-brutalist-yellow/80 transition-colors focus:outline-none"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5 fill-brutalist-ink"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
                        ></path>
                      </svg>
                      Dar uma estrela no Github
                    </Link>
                    <Link href={research} target="_blank" onClick={closeModal}>
                      <button
                        className="w-full font-display font-bold uppercase text-sm flex items-center justify-center border-[3px] border-brutalist-ink bg-brutalist-blue px-4 py-3 text-white hover:bg-brutalist-blue/90 transition-colors focus:outline-none"
                        onClick={handlerAlreadySupport}
                      >
                        Seguir para as vagas
                      </button>
                    </Link>
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
