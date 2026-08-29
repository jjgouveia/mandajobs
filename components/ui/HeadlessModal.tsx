import { Dialog, Transition } from "@headlessui/react"
import { StarIcon, XMarkIcon } from "@heroicons/react/20/solid"
import Link from "next/link"
import { Fragment, useEffect, useState, type ReactNode } from "react"
import { toast } from "react-hot-toast"
import { fetchStars } from "../../utils/fetchRepoStars"
import { buildLinkedInJobsUrl } from "@/lib/linkedin-search-url"
import { trackLinkedInOpened, trackShareLinkCopied } from "@/lib/analytics-events"

type LinkedInAction = {
  type: "linkedin"
  query: string
  location?: string
}

type ShareAction = {
  type: "share"
  url: string
}

type HeadlessModalProps = {
  text: string
  btnTwdClass?: string
  action: LinkedInAction | ShareAction
  children?: ReactNode
}

export default function HeadlessModal({ text, btnTwdClass, action, children }: HeadlessModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [stars, setStars] = useState<number>(0)

  useEffect(() => {
    const queryStars = new fetchStars("jjgouveia", "mandajobs")
    queryStars.getStars().then((response) => setStars(response))
  }, [])

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleLinkedInContinue() {
    trackLinkedInOpened("modal")
    closeModal()
  }

  function handleShareCopy() {
    if (action.type !== "share") return
    navigator.clipboard.writeText(action.url)
    trackShareLinkCopied()
    toast.success("Link copiado!", { icon: "🔗" })
    closeModal()
  }

  const linkedInUrl =
    action.type === "linkedin"
      ? buildLinkedInJobsUrl(action.query, { location: action.location })
      : null

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button type="button" onClick={openModal} className={btnTwdClass}>
          {children ?? <span style={{ letterSpacing: "0.05rem" }}>{text}</span>}
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
                      Você sabia que o Manda Jobs é um projeto que facilita a busca por vagas de emprego no LinkedIn,
                      permitindo encontrar aquelas que mais se encaixam no seu perfil? Se gostou da ideia, deixe uma
                      estrela no nosso repositório no GitHub
                      {stars > 0 ? ` (${stars})` : ""} e compartilhe com seus amigos.
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      target="_blank"
                      href={"https://github.com/jjgouveia/mandajobs"}
                      className="font-display font-bold uppercase text-sm flex items-center justify-center gap-2 border-[3px] border-brutalist-ink bg-brutalist-yellow py-3 text-brutalist-ink hover:bg-brutalist-yellow/80 transition-colors focus:outline-none"
                    >
                      Dar uma estrela no Github
                    </Link>

                    {action.type === "linkedin" && linkedInUrl ? (
                      <a
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleLinkedInContinue}
                        className="w-full font-display font-bold uppercase text-sm flex items-center justify-center border-[3px] border-brutalist-ink bg-brutalist-blue px-4 py-3 text-white hover:bg-brutalist-blue/90 transition-colors focus:outline-none"
                      >
                        Seguir para as vagas
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={handleShareCopy}
                        className="w-full font-display font-bold uppercase text-sm flex items-center justify-center border-[3px] border-brutalist-ink bg-brutalist-blue px-4 py-3 text-white hover:bg-brutalist-blue/90 transition-colors focus:outline-none"
                      >
                        Copiar link da busca
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
