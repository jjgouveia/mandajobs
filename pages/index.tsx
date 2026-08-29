"use client"

import { Analytics } from "@vercel/analytics/react"
import { useEffect, useRef, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy, SearchIcon, Zap } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import HeadlessModal from "../components/ui/HeadlessModal"
import { ExpandedSearch } from "../components/ExpandedSearch"
import Header from "../components/Header"
import Footer from "../components/Footer"
import getQueriesCount from "../hooks/getQueriesCount"

type LevelType = "Junior" | "Pleno" | "Senior" | "Estagiário"

const CURTAIN_DELAY = 0.2
const CURTAIN_DURATION = 0.5
const SLAM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const JobSearch = () => {
  const shouldReduceMotion = useReducedMotion()
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [tools, setTools] = useState("")
  const [toolsIdontUse, setToolsIdontUse] = useState("")
  const [level, setLevel] = useState<LevelType>("Junior")
  const [generatedQuery, setGeneratedQuery] = useState<string | undefined>(undefined)
  const [counter, setCounter] = useState<number | null>(null)

  const queryRef = useRef<null | HTMLDivElement>(null)

  const scrollToResults = () => {
    if (queryRef.current !== null) {
      queryRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const switchLevel = () => {
    switch (level) {
      case "Pleno":
        return "only Pleno titles"
      case "Senior":
        return "only Seniors titles"
      case "Junior":
        return "only Junior titles"
      case "Estagiário":
        return "only Intern or Internship or Estágio titles"
      default:
        return ""
    }
  }

  const generateQuery = async (e: any) => {
    e.preventDefault()
    setGeneratedQuery("")
    setLoading(true)

    try {
      const response = await fetch("/api/generate-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          tools,
          toolsIdontUse,
          level,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.error || "Ocorreu um erro ao gerar a consulta")
        setLoading(false)
        return
      }

      const { query } = await response.json()
      if (query) {
        setGeneratedQuery(query)
        getQueriesCount(setCounter)
        setTimeout(scrollToResults, 100)
      } else {
        toast.error("Nenhuma consulta foi gerada")
      }
    } catch (error) {
      console.error("Erro ao gerar consulta:", error)
      toast.error("Falha ao processar a solicitação")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text.trim())
    toast.success("Consulta copiada!", {
      icon: "📋",
    })
  }

  const isFormValid = title !== "" && tools !== ""

  useEffect(() => {
    getQueriesCount(setCounter)
  }, [])

  return (
    <div className="min-h-screen bg-brutalist-paper font-body text-brutalist-ink">
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[100] bg-brutalist-ink"
        style={{ transformOrigin: "bottom", pointerEvents: "none" }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={
          shouldReduceMotion ? { duration: 0 } : { duration: CURTAIN_DURATION, delay: CURTAIN_DELAY, ease: SLAM_EASE }
        }
      />

      <Header />

      <main className="max-w-2xl mx-auto px-6 py-14">
        {/* Hero (short) */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.35, y: -40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={
            shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: CURTAIN_DELAY + 0.25, ease: SLAM_EASE }
          }
          className="text-center mb-10"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[1.05] mb-4">
            Seu filtro inteligente de vagas no{" "}
            <motion.span
              initial={shouldReduceMotion ? false : { scale: 1.6 }}
              animate={{ scale: 1 }}
              transition={
                shouldReduceMotion ? { duration: 0 } : { duration: 0.3, delay: CURTAIN_DELAY + 0.7, ease: SLAM_EASE }
              }
              className="inline-block bg-brutalist-ink text-brutalist-yellow px-2"
            >
              LinkedIn
            </motion.span>
          </h1>
          <p className="text-base sm:text-lg text-brutalist-ink/70 max-w-md mx-auto">
            Preencha os campos abaixo e a nossa IA monta a consulta booleana certa pra você usar na busca de vagas.
          </p>
        </motion.div>

        {/* Form — the product itself, front and center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <div className="bg-white border-[3px] border-brutalist-ink shadow-brutal-md p-6 sm:p-10">
            <h2 className="font-display text-2xl font-bold uppercase mb-1">Configure sua busca</h2>
            <p className="text-sm text-brutalist-ink/60 mb-8">
              Preencha os campos abaixo para gerar uma consulta personalizada.
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="position" className="flex items-center gap-2 font-display font-bold text-xs uppercase">
                  <span className="w-6 h-6 flex items-center justify-center bg-brutalist-yellow border-[3px] border-brutalist-ink text-[11px]">
                    1
                  </span>
                  Em qual posição você atua?
                </Label>
                <Input
                  id="position"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex.: fullstack, devops, frontend..."
                  className="rounded-none border-[3px] border-brutalist-ink bg-white px-4 py-5 text-base placeholder:text-brutalist-ink/40 focus-visible:ring-0 focus-visible:border-brutalist-blue"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level" className="flex items-center gap-2 font-display font-bold text-xs uppercase">
                  <span className="w-6 h-6 flex items-center justify-center bg-brutalist-blue text-white border-[3px] border-brutalist-ink text-[11px]">
                    2
                  </span>
                  Nível de senioridade
                </Label>
                <Select value={level} onValueChange={(value: LevelType) => setLevel(value)}>
                  <SelectTrigger className="w-40 rounded-none border-[3px] border-brutalist-ink bg-brutalist-yellow px-4 py-5 font-display font-bold focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-[3px] border-brutalist-ink">
                    <SelectItem value="Estagiário">Estagiário</SelectItem>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Pleno">Pleno</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tools" className="flex items-center gap-2 font-display font-bold text-xs uppercase">
                  <span className="w-6 h-6 flex items-center justify-center bg-brutalist-ink text-brutalist-yellow border-[3px] border-brutalist-ink text-[11px]">
                    3
                  </span>
                  Tecnologias que você utiliza
                </Label>
                <Input
                  id="tools"
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                  placeholder="Ex.: react, node, python, aws..."
                  className="rounded-none border-[3px] border-brutalist-ink bg-white px-4 py-5 text-base placeholder:text-brutalist-ink/40 focus-visible:ring-0 focus-visible:border-brutalist-blue"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avoid-tools" className="flex items-center gap-2 font-display font-bold text-xs uppercase">
                  <span className="w-6 h-6 flex items-center justify-center bg-brutalist-pink text-brutalist-ink border-[3px] border-brutalist-ink text-[11px]">
                    4
                  </span>
                  Tecnologias que você NÃO utiliza
                  <Badge className="rounded-none border-[3px] border-brutalist-ink bg-brutalist-ink text-white text-[10px] font-display uppercase">
                    Opcional
                  </Badge>
                </Label>
                <Input
                  id="avoid-tools"
                  value={toolsIdontUse}
                  onChange={(e) => setToolsIdontUse(e.target.value)}
                  placeholder="Ex.: php, ruby, .net..."
                  className="rounded-none border-[3px] border-brutalist-ink bg-white px-4 py-5 text-base placeholder:text-brutalist-ink/40 focus-visible:ring-0 focus-visible:border-brutalist-blue"
                />
              </div>

              <Button
                onClick={generateQuery}
                disabled={!isFormValid || loading}
                className="w-full rounded-none border-[3px] border-brutalist-ink bg-brutalist-ink text-brutalist-yellow shadow-brutal-md hover:bg-brutalist-ink/90 hover:shadow-brutal font-display font-bold uppercase text-lg py-6 transition-all disabled:opacity-40"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-brutalist-yellow/40 border-t-brutalist-yellow rounded-full animate-spin" />
                    Gerando consulta...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <SearchIcon className="w-5 h-5" />
                    Gerar Consulta
                  </div>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {generatedQuery && (
            <motion.div
              ref={queryRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="mt-10"
            >
              <div className="bg-white border-[3px] border-brutalist-ink shadow-brutal-md p-6 sm:p-10">
                <h3 className="font-display text-xl font-bold uppercase flex items-center gap-2 mb-1">
                  <Zap className="w-5 h-5" />
                  Sua consulta personalizada
                </h3>
                <p className="text-sm text-brutalist-ink/60 mb-6">Clique para copiar e use no LinkedIn</p>

                {generatedQuery
                  .substring(generatedQuery.indexOf("1") + 0)
                  .split("2.")
                  .map((query, index) => {
                    const cleanQuery = query.trim()
                    if (!cleanQuery) return null

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div
                          className="border-[3px] border-brutalist-ink bg-brutalist-paper cursor-pointer hover:bg-brutalist-yellow/25 transition-colors group p-4"
                          onClick={() => copyToClipboard(cleanQuery)}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-xs font-display font-bold uppercase text-brutalist-ink/50 mb-2">
                                Clique para copiar
                              </p>
                              <p className="font-mono text-sm leading-relaxed">{cleanQuery}</p>
                            </div>
                            <Copy className="w-5 h-5 text-brutalist-ink/40 group-hover:text-brutalist-ink transition-colors shrink-0" />
                          </div>
                        </div>
                        {index === 0 && (
                          <div className="flex items-center justify-center my-4 gap-4">
                            <div className="flex-1 h-[3px] bg-brutalist-ink" />
                            <span className="font-display text-xs font-bold uppercase">ou</span>
                            <div className="flex-1 h-[3px] bg-brutalist-ink" />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}

                <div className="mt-6 space-y-4">
                  <HeadlessModal
                    query={generatedQuery}
                    text="Consultar vagas no LinkedIn"
                    btnTwdClass="w-full rounded-none border-[3px] border-brutalist-ink bg-brutalist-blue text-white shadow-brutal hover:bg-brutalist-blue/90 font-display font-bold uppercase py-3 transition-all"
                  />
                  <ExpandedSearch key={generatedQuery} query={generatedQuery} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick facts (plain, no billboard) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-brutalist-ink/70 mt-10 text-center"
        >
          <span>
            <strong className="text-brutalist-ink">
              {counter !== null ? counter.toLocaleString("pt-BR") : "..."}
            </strong>{" "}
            consultas geradas
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <strong className="text-brutalist-ink">15 mil+</strong> usuários ativos
          </span>
          <span aria-hidden="true">·</span>
          <span>
            <strong className="text-brutalist-ink">100% gratuito</strong>, sempre
          </span>
        </motion.div>

        {/* How it works */}
        <section id="como-funciona" className="border-t-[3px] border-brutalist-ink mt-14 pt-10">
          <div className="font-display text-xs font-bold uppercase text-brutalist-ink/50 mb-6">Como funciona</div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <div className="font-display text-xl font-bold text-brutalist-blue">01</div>
              <div>
                <div className="font-display font-bold text-sm mb-1">Acesse o formulário</div>
                <p className="text-sm text-brutalist-ink/60">Preencha as informações do seu perfil.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="font-display text-xl font-bold text-brutalist-blue">02</div>
              <div>
                <div className="font-display font-bold text-sm mb-1">Faça a consulta</div>
                <p className="text-sm text-brutalist-ink/60">A IA monta a query booleana pra você.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="font-display text-xl font-bold text-brutalist-blue">03</div>
              <div>
                <div className="font-display font-bold text-sm mb-1">Vá pro LinkedIn</div>
                <p className="text-sm text-brutalist-ink/60">Cole a consulta e envie as candidaturas.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section id="missao" className="border-t-[3px] border-brutalist-ink pt-10 mt-10">
          <div className="font-display text-xs font-bold uppercase text-brutalist-ink/50 mb-4">Por que existe</div>
          <p className="text-base sm:text-lg leading-relaxed max-w-xl mb-5">
            Acreditamos que a tecnologia pode ajudar na busca por uma oportunidade. O Manda Jobs usa IA pra montar a
            consulta certa a partir do seu perfil, sem armazenar dado pessoal e sem precisar de login no LinkedIn.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-display font-bold uppercase">
            <span className="border-[3px] border-brutalist-ink px-3 py-1.5">IA preditiva</span>
            <span className="border-[3px] border-brutalist-ink px-3 py-1.5">Dados criptografados</span>
            <span className="border-[3px] border-brutalist-ink px-3 py-1.5">Sem login no LinkedIn</span>
          </div>
        </section>

        {/* FAQ */}
        <section id="duvidas" className="border-t-[3px] border-brutalist-ink pt-10 mt-10">
          <div className="font-display text-xs font-bold uppercase text-brutalist-ink/50 mb-6">
            Perguntas frequentes
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="font-display font-bold text-sm mb-1.5">Quanto eu preciso pagar?</div>
              <p className="text-sm text-brutalist-ink/60">Nada. O serviço é totalmente gratuito.</p>
            </div>
            <div>
              <div className="font-display font-bold text-sm mb-1.5">E os meus dados?</div>
              <p className="text-sm text-brutalist-ink/60">Criptografados e nunca vinculados à sua identidade.</p>
            </div>
            <div>
              <div className="font-display font-bold text-sm mb-1.5">Quantas consultas posso fazer?</div>
              <p className="text-sm text-brutalist-ink/60">Sem limite, quando quiser.</p>
            </div>
            <div>
              <div className="font-display font-bold text-sm mb-1.5">Vou garantir uma vaga?</div>
              <p className="text-sm text-brutalist-ink/60">
                Não garantimos emprego, só o acesso às vagas certas pro seu perfil.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#131313",
            color: "#fdf500",
            border: "3px solid #131313",
            borderRadius: "0",
            fontWeight: "700",
          },
        }}
      />
      <Analytics />
      <Footer />
    </div>
  )
}

export default JobSearch
