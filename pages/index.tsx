"use client"

import { Analytics } from "@vercel/analytics/react"
import { useEffect, useRef, useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Sparkles, SearchIcon, TrendingUp, Users, Building2, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { db } from "../utils/firebaseConfig"
import { collection, addDoc } from "firebase/firestore"
import HeadlessModal from "../components/ui/HeadlessModal"
import FooterExperimental from "../components/FooterExperimental"

type LevelType = "Junior" | "Pleno" | "Senior" | "Estagiário"

const JobSearch = () => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [tools, setTools] = useState("")
  const [toolsIdontUse, setToolsIdontUse] = useState("")
  const [level, setLevel] = useState<LevelType>("Junior")
  const [generatedQuery, setGeneratedQuery] = useState<string | undefined>(undefined)
  const [counter, setCounter] = useState<number>(830)

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

  const insertQuery = async (query_string: string): Promise<void> => {
    try {
      await addDoc(collection(db, "queries"), {
        query_string: query_string,
        timestamp: new Date(),
      })
      console.log("Query successfully inserted into Firestore")
    } catch (error) {
      console.error("Error inserting query into Firestore: ", error)
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
    if (generatedQuery && loading === false) {
      insertQuery(generatedQuery)
      setCounter((prev) => prev + 1)
    }
  }, [loading])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Manda Jobs</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Nossa Missão
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Perguntas Frequentes
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Apoiadores
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Filtro Inteligente
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              para LinkedIn
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Gere consultas personalizadas para encontrar as vagas perfeitas no LinkedIn
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{counter.toLocaleString()}</div>
              <div className="text-gray-400">Consultas Geradas</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">15K+</div>
              <div className="text-gray-400">Usuários Ativos</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Building2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-gray-400">Empresas Parceiras</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Configure sua busca</CardTitle>
              <CardDescription className="text-gray-400">
                Preencha os campos abaixo para gerar uma consulta personalizada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-white flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      1
                    </span>
                    Em qual posição você atua?
                  </Label>
                  <Input
                    id="position"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex.: fullstack, devops, frontend..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level" className="text-white flex items-center gap-2">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      2
                    </span>
                    Nível de senioridade
                  </Label>
                  <Select value={level} onValueChange={(value: LevelType) => setLevel(value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Estagiário">Estagiário</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Pleno">Pleno</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tools" className="text-white flex items-center gap-2">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  Tecnologias que você utiliza
                </Label>
                <Input
                  id="tools"
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                  placeholder="Ex.: react, node, python, aws..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="avoid-tools" className="text-white flex items-center gap-2">
                  <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    4
                  </span>
                  Tecnologias que você NÃO utiliza
                  <Badge variant="secondary" className="bg-white/10 text-gray-300">
                    Opcional
                  </Badge>
                </Label>
                <Input
                  id="avoid-tools"
                  value={toolsIdontUse}
                  onChange={(e) => setToolsIdontUse(e.target.value)}
                  placeholder="Ex.: php, ruby, .net..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-red-400"
                />
              </div>

              <Button
                onClick={generateQuery}
                disabled={!isFormValid || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 text-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gerando consulta...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <SearchIcon className="w-5 h-5" />
                    Gerar Consulta
                    <Sparkles className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
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
              className="mt-12"
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    Sua consulta personalizada
                  </CardTitle>
                  <CardDescription className="text-gray-400">Clique para copiar e use no LinkedIn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                          <Card
                            className="bg-white/10 border-white/20 cursor-pointer hover:bg-white/15 transition-all duration-200 group"
                            onClick={() => copyToClipboard(cleanQuery)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <p className="text-gray-400 text-sm mb-2 group-hover:text-gray-300">
                                    Clique para copiar
                                  </p>
                                  <p className="text-white font-mono text-sm leading-relaxed">{cleanQuery}</p>
                                </div>
                                <Copy className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                              </div>
                            </CardContent>
                          </Card>
                          {index === 0 && (
                            <div className="flex items-center justify-center my-4">
                              <Separator className="flex-1 bg-white/10" />
                              <span className="px-4 text-gray-400 text-sm">ou</span>
                              <Separator className="flex-1 bg-white/10" />
                            </div>
                          )}
                        </motion.div>
                      )
                    })}

                  <div className="mt-6">
                    <HeadlessModal
                      query={generatedQuery}
                      text="Consultar vagas no LinkedIn 🚀"
                      btnTwdClass="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Partner Companies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-8">Empresas que apoiam o projeto e a recolocação profissional</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder for partner company logos */}
            <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-400" />
            </div>
            <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-400" />
            </div>
            <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-400" />
            </div>
            <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </motion.div>
      </main>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      />
      <Analytics />
      <FooterExperimental />
    </div>
  )
}

export default JobSearch
