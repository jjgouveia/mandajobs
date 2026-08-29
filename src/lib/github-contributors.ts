export interface ProjectContributor {
  login: string
  name: string
  avatarUrl: string
  profileUrl: string
  contributions: number
  bio: string | null
  location: string | null
}

interface GitHubContributorResponse {
  login: string
  avatar_url: string
  html_url: string
  contributions: number
  type: string
}

interface GitHubUserResponse {
  name: string | null
  bio: string | null
  location: string | null
}

const REPO_OWNER = "jjgouveia"
const REPO_NAME = "mandajobs"

export const FOUNDER = {
  name: "Jarbas Gouveia",
  role: "Criador do Manda Jobs",
  headline: "CTO na Ativos. Faço software que resolve de verdade, sem firula.",
  bio: [
    "Sou CTO e sócio da Ativos Precatórios. A empresa é LegalTech e estrutura antecipação de precatório no Brasil. Cuido da tecnologia inteira: produto, engenharia, automação, IA e infra. Da ideia até produção.",
    "Celer, Ativos Intelligence, julIA e o portal da OAB-PE/Ativos são os nomes que mais aparecem, mas o escopo é maior. Tem RPA, integração interna, VORA, DuePlace e ferramenta pro jurídico e pro financeiro. No fim das contas, o trabalho é tirar operação manual do caminho.",
    "Meu critério é simples: processo chato vira dado, dado vira decisão. Um recálculo que levava 20 minutos passou a levar 2 segundos depois de uma automação. Desde então eu priorizo o que melhora a vida de quem usa.",
    "Comecei há mais de 13 anos com Android e ROM customizada. Portei seis versões do sistema num LG P350 que a fabricante já tinha largado. Ali aprendi que software bom é o que não desperdiça tempo.",
    "O Manda Jobs segue essa mesma linha. Você descreve o perfil, a IA monta a query booleana e você busca no LinkedIn. Sem login e sem complicar o que devia ser simples.",
  ],
  initiativesIntro:
    "Alguns projetos que aparecem mais por aí. A lista é menor do que a realidade porque a área de tech da Ativos não cabe num card.",
  initiatives: [
    {
      name: "Celer",
      description:
        "O carro-chefe: SaaS de antecipação de precatório. Precificação, due diligence, CRM, KYC e pagamento. Django por baixo, domínio organizado, multi-tenant e prazo judicial no calendário.",
    },
    {
      name: "Ativos Intelligence",
      description:
        "IA multi-agente com LangGraph, GraphRAG, cache semântico e teste de regressão antes de soltar agente em produção. Feita pra operação jurídica e financeira, com documento real por baixo.",
    },
    {
      name: "julIA",
      status: "Em desenvolvimento",
      description:
        "Primeira conta digital de precatórios do Brasil, ainda em desenvolvimento e em fases iniciais. A ideia é reunir PIX, saldo, frações de créditos originados pela Ativos, portfólio em tempo real, due diligence jurídica e curadoria por IA. O investidor explora, assina, acompanha e recebe na mesma conta.",
    },
    {
      name: "Portal OAB-PE × Ativos",
      description:
        "Parceria com a OAB Pernambuco: calculadora, tirar dúvida, suporte de IR, biblioteca de materiais e acesso por magic link. Advogado entra, resolve, sai.",
      link: "https://portal-oab-ativos.vercel.app",
    },
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/jarbasgouveia/",
    email: "mailto:gouvik.dev@gmail.com",
    github: "https://github.com/jjgouveia",
  },
}

const FALLBACK_CONTRIBUTORS: ProjectContributor[] = [
  {
    login: "jjgouveia",
    name: "Jarbas Gouveia",
    avatarUrl: "https://avatars.githubusercontent.com/u/98658308?v=4",
    profileUrl: "https://github.com/jjgouveia",
    contributions: 39,
    bio: "CTO na @Ativos-Tecnologia e Indie Hacker nuns SaaS por aí",
    location: "Recife, PE",
  },
  {
    login: "bolodissenoura",
    name: "Daniel Limae",
    avatarUrl: "https://avatars.githubusercontent.com/u/73969685?v=4",
    profileUrl: "https://github.com/bolodissenoura",
    contributions: 1,
    bio: "Founder - @AbacatePay",
    location: "São José dos Campos, BR",
  },
  {
    login: "luanakaty",
    name: "Luana Katy",
    avatarUrl: "https://avatars.githubusercontent.com/u/232393776?v=4",
    profileUrl: "https://github.com/luanakaty",
    contributions: 1,
    bio: null,
    location: null,
  },
]

async function fetchUserProfile(login: string): Promise<Pick<ProjectContributor, "name" | "bio" | "location">> {
  try {
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: { Accept: "application/vnd.github+json" },
    })

    if (!response.ok) {
      return { name: login, bio: null, location: null }
    }

    const user = (await response.json()) as GitHubUserResponse
    return {
      name: user.name ?? login,
      bio: user.bio,
      location: user.location,
    }
  } catch {
    return { name: login, bio: null, location: null }
  }
}

export async function fetchProjectContributors(): Promise<ProjectContributor[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
      }
    )

    if (!response.ok) return FALLBACK_CONTRIBUTORS

    const contributors = (await response.json()) as GitHubContributorResponse[]
    const humans = contributors.filter((contributor) => contributor.type === "User")

    const profiles = await Promise.all(
      humans.map(async (contributor) => {
        const profile = await fetchUserProfile(contributor.login)
        return {
          login: contributor.login,
          name: profile.name,
          avatarUrl: contributor.avatar_url,
          profileUrl: contributor.html_url,
          contributions: contributor.contributions,
          bio: profile.bio,
          location: profile.location,
        }
      })
    )

    return profiles.sort((a, b) => b.contributions - a.contributions)
  } catch {
    return FALLBACK_CONTRIBUTORS
  }
}
