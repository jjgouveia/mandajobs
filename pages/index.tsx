"use client"

import { Analytics } from "@vercel/analytics/react"
import { useEffect, useRef, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy, Link2, SearchIcon, Zap } from "lucide-react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import HeadlessModal from "../components/ui/HeadlessModal"
import { ExpandedSearch } from "../components/ExpandedSearch"
import { RankingHighlight, SearchRankings } from "../components/SearchRankings"
import { QueryCountWithTooltip } from "../components/QueryCountWithTooltip"
import { TagInput } from "../components/TagInput"
import Header from "../components/Header"
import Footer from "../components/Footer"
import getQueriesCount from "../hooks/getQueriesCount"
import { useFormPersistence } from "../hooks/useFormPersistence"
import { JOB_PRESETS, type LanguagePref, type LevelType, type WorkMode } from "@/lib/job-presets"
import {
  getShareableUrl,
  parseShareableSearchParams,
  replaceShareableUrl,
} from "@/lib/shareable-form-url"
import {
  trackPresetApplied,
  trackQueryCopied,
  trackQueryGenerated,
} from "@/lib/analytics-events"
import { SCROLL_TO_RESULTS_DELAY_MS } from "@/lib/app-limits"

const CURTAIN_DELAY = 0.2
const CURTAIN_DURATION = 0.5
const SLAM_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const JobSearch = () => {
  const shouldReduceMotion = useReducedMotion()
  const [loading, setLoading] = useState(false)
  const [variants, setVariants] = useState<string[]>([])
  const [counter, setCounter] = useState<number | null>(null)
  const [allowAutoExpand, setAllowAutoExpand] = useState(false)

  const { state, update, hydrated } = useFormPersistence()
  const {
    title,
    tools,
    toolsIdontUse,
    level,
    workMode,
    language,
    location,
    lastVariants,
  } = state

  const primaryQuery = variants[0] ?? ""
  const queryRef = useRef<null | HTMLDivElement>(null)
  const urlHydrated = useRef(false)

  const scrollToResults = () => {
    if (queryRef.current !== null) {
      queryRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    getQueriesCount(setCounter)
  }, [])

  // Priority: URL params > localStorage (URL applied once after hydration)
  useEffect(() => {
    if (!hydrated || urlHydrated.current) return
    urlHydrated.current = true

    const fromUrl = parseShareableSearchParams(window.location.search)
    if (Object.keys(fromUrl).length > 0) {
      update(fromUrl)
      return
    }

    if (lastVariants.length > 0) {
      setVariants(lastVariants)
    }
  }, [hydrated, update, lastVariants])

  const generateQuery = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault()
    setVariants([])
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
          workMode,
          language,
          location,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        toast.error(errorData.error || "Ocorreu um erro ao gerar a consulta")
        setLoading(false)
        return
      }

      const data = await response.json()
      const nextVariants: string[] = Array.isArray(data.variants) ? data.variants : []

      if (nextVariants.length > 0) {
        setVariants(nextVariants)
        setAllowAutoExpand(true)
        update({ lastVariants: nextVariants })
        replaceShareableUrl({
          title,
          tools,
          toolsIdontUse,
          level,
          workMode,
          language,
          location,
        })
        trackQueryGenerated({
          level,
          hasAvoidTools: toolsIdontUse.trim().length > 0,
          workMode,
        })
        getQueriesCount(setCounter)
        setTimeout(scrollToResults, SCROLL_TO_RESULTS_DELAY_MS)
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

  const copyToClipboard = (text: string, variantIndex: number) => {
    navigator.clipboard.writeText(text.trim())
    trackQueryCopied(variantIndex)
    toast.success("Consulta copiada!", {
      icon: "📋",
    })
  }

  const shareUrl = getShareableUrl({
    title,
    tools,
    toolsIdontUse,
    level,
    workMode,
    language,
    location,
  })

  const applyPreset = (presetId: string) => {
    const preset = JOB_PRESETS.find((p) => p.id === presetId)
    if (!preset) return
    update({ title: preset.title, tools: preset.tools })
    trackPresetApplied(presetId)
  }

  const isFormValid = title !== "" && tools !== ""

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
          <p className="text-base sm:text-lg text-brutalist-ink/70 max-w-md mx-auto mb-4">
            Preencha os campos abaixo e a nossa IA monta a consulta booleana certa pra você usar na busca de vagas.
          </p>
          <RankingHighlight />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <div className="bg-white border-[3px] border-brutalist-ink shadow-brutal-md p-6 sm:p-10">
            <h2 className="font-display text-2xl font-bold uppercase mb-1">Configure sua busca</h2>
            <p className="text-sm text-brutalist-ink/60 mb-4">
              Preencha os campos abaixo para gerar uma consulta personalizada.
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {JOB_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  className="font-display text-xs font-bold uppercase border-[3px] border-brutalist-ink px-3 py-1.5 bg-brutalist-paper hover:bg-brutalist-yellow transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

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
                  onChange={(e) => update({ title: e.target.value })}
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
                <Select value={level} onValueChange={(value: LevelType) => update({ level: value })}>
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
                <TagInput
                  id="tools"
                  value={tools}
                  onChange={(csv) => update({ tools: csv })}
                  placeholder="Ex.: react, node, python..."
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
                <TagInput
                  id="avoid-tools"
                  value={toolsIdontUse}
                  onChange={(csv) => update({ toolsIdontUse: csv })}
                  placeholder="Ex.: php, ruby, .net..."
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-display font-bold text-xs uppercase">Modalidade</Label>
                  <Select value={workMode} onValueChange={(value: WorkMode) => update({ workMode: value })}>
                    <SelectTrigger className="w-full rounded-none border-[3px] border-brutalist-ink bg-white px-4 py-5 font-display font-bold focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-[3px] border-brutalist-ink">
                      <SelectItem value="any">Indiferente</SelectItem>
                      <SelectItem value="remoto">Remoto</SelectItem>
                      <SelectItem value="hibrido">Híbrido</SelectItem>
                      <SelectItem value="presencial">Presencial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="font-display font-bold text-xs uppercase">Idioma da vaga</Label>
                  <Select value={language} onValueChange={(value: LanguagePref) => update({ language: value })}>
                    <SelectTrigger className="w-full rounded-none border-[3px] border-brutalist-ink bg-white px-4 py-5 font-display font-bold focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-none border-[3px] border-brutalist-ink">
                      <SelectItem value="both">Ambos</SelectItem>
                      <SelectItem value="pt">Português</SelectItem>
                      <SelectItem value="en">Inglês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="font-display font-bold text-xs uppercase">
                  Localização
                  <Badge className="ml-2 rounded-none border-[3px] border-brutalist-ink bg-brutalist-ink text-white text-[10px] font-display uppercase">
                    Opcional
                  </Badge>
                </Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => update({ location: e.target.value })}
                  placeholder="Ex.: São Paulo, Brasil, Remoto..."
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

        <AnimatePresence>
          {variants.length > 0 && primaryQuery && (
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

                {variants.map((query, index) => (
                  <motion.div
                    key={`${index}-${query.slice(0, 24)}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div
                      className="border-[3px] border-brutalist-ink bg-brutalist-paper cursor-pointer hover:bg-brutalist-yellow/25 transition-colors group p-4"
                      onClick={() => copyToClipboard(query, index)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-xs font-display font-bold uppercase text-brutalist-ink/50 mb-2">
                            Clique para copiar
                          </p>
                          <p className="font-mono text-sm leading-relaxed">{query}</p>
                        </div>
                        <Copy className="w-5 h-5 text-brutalist-ink/40 group-hover:text-brutalist-ink transition-colors shrink-0" />
                      </div>
                    </div>
                    {index === 0 && variants.length > 1 && (
                      <div className="flex items-center justify-center my-4 gap-4">
                        <div className="flex-1 h-[3px] bg-brutalist-ink" />
                        <span className="font-display text-xs font-bold uppercase">ou</span>
                        <div className="flex-1 h-[3px] bg-brutalist-ink" />
                      </div>
                    )}
                  </motion.div>
                ))}

                <div className="mt-6 space-y-3">
                  <HeadlessModal
                    text="Abrir no LinkedIn"
                    action={{
                      type: "linkedin",
                      query: primaryQuery,
                      location: location || undefined,
                    }}
                    btnTwdClass="w-full rounded-none border-[3px] border-brutalist-ink bg-brutalist-blue text-white shadow-brutal hover:bg-brutalist-blue/90 font-display font-bold uppercase py-3 transition-all"
                  />

                  <HeadlessModal
                    text="Copiar link desta busca"
                    action={{ type: "share", url: shareUrl }}
                    btnTwdClass="w-full rounded-none border-[3px] border-brutalist-ink bg-white text-brutalist-ink hover:bg-brutalist-paper font-display font-bold uppercase py-3 inline-flex items-center justify-center"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Link2 className="w-4 h-4" />
                      Copiar link desta busca
                    </span>
                  </HeadlessModal>

                  <ExpandedSearch key={primaryQuery} query={primaryQuery} autoSearch={allowAutoExpand} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-brutalist-ink/70 mt-10 text-center"
        >
          <QueryCountWithTooltip count={counter} />
          <span aria-hidden="true">·</span>
          <span>
            <strong className="text-brutalist-ink">100% gratuito</strong>, sempre
          </span>
        </motion.div>

        <SearchRankings />

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
              <p className="text-sm text-brutalist-ink/60">Sem limite diário rígido para uso normal — abusos são limitados automaticamente.</p>
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
