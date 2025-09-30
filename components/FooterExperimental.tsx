"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { Github, Linkedin, ExternalLink, Sparkles, Home, Search, FileText, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import RepoStarsCount from "./RepoStarsCount"
import UseGetPreviousRoute from "../hooks/UseGetPreviousRoute"

export default function FooterExperimental() {
  const route = useRouter().pathname
  const previousRoute = UseGetPreviousRoute(route)

  const navigationLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search", label: "Search", icon: Search },
    { href: "/termos-de-uso", label: "Termos de Uso", icon: FileText },
  ]

  const productLinks = [{ href: "", label: "ResumeAI", status: "Em breve", icon: Zap }]

  return (
    <footer className="relative bg-gradient-to-t from-slate-900 via-purple-900/20 to-transparent">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent backdrop-blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8 sm:pt-24 lg:pt-20">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Manda Jobs</h2>
            </div>
            <p className="text-base text-gray-300 leading-relaxed max-w-md">
              O Manda Jobs é uma plataforma que conecta profissionais com as melhores oportunidades do Linkedin por meio
              de inteligência artificial.
            </p>
          </div>

          {/* Navigation and Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:col-span-2">
            {/* Navigation */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Home className="w-5 h-5 text-purple-400" />
                  Navegação
                </h3>
                <nav className="space-y-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                      title={link.label}
                    >
                      <link.icon className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Products */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Produtos
                </h3>
                <nav className="space-y-4">
                  {productLinks.map((product) => (
                    <div key={product.label} className="flex items-center gap-3 text-gray-300 group">
                      <product.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                      <span className="flex items-center gap-2">
                        {product.label}
                        <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full font-medium">
                          {product.status}
                        </span>
                      </span>
                    </div>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-12 bg-white/10" />

        {/* Bottom section */}
        <div className="space-y-8">
          {/* Social links and powered by */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-gray-300">
              <span>Powered by</span>
              <Link
                href="https://gemini.google.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-white hover:text-purple-400 transition-colors duration-200 flex items-center gap-1 group"
                title="Google Gemini"
              >
                Gemini
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <Link
                href="https://www.linkedin.com/in/jarbasgouveia/"
                className="group p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                aria-label="Jr Gouveia on LinkedIn"
                title="Jr Gouveia on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </Link>

              {/* Mantendo seu componente de contagem de estrelas */}
              <RepoStarsCount user="jjgouveia" repo="mandajobs" />

              <Link
                href="https://github.com/jjgouveia"
                className="group p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                aria-label="Jr Gouveia on GitHub"
                title="Jr Gouveia on GitHub"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-4">
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Copyright © {new Date().getFullYear()} Manda Jobs. Este site não é afiliado ao LinkedIn, Gemini ou
                qualquer outra empresa mencionada. Ao utilizá-lo, você concorda com os nossos{" "}
                <Link
                  className="text-purple-400 hover:text-purple-300 transition-colors underline underline-offset-2"
                  href="/termos-de-uso"
                >
                  termos de uso
                </Link>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </footer>
  )
}
