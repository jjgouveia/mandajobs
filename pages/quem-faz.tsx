import Head from "next/head"
import Link from "next/link"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { FOUNDER, fetchProjectContributors, type ProjectContributor } from "@/lib/github-contributors"

interface QuemFazPageProps {
  contributors: ProjectContributor[]
}

function ContributorCard({ contributor, isFounder }: { contributor: ProjectContributor; isFounder: boolean }) {
  return (
    <article className="border-[3px] border-brutalist-ink bg-white shadow-brutal p-5 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        <img
          src={contributor.avatarUrl}
          alt={`Avatar de ${contributor.name}`}
          width={72}
          height={72}
          className="w-[72px] h-[72px] border-[3px] border-brutalist-ink object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-display font-bold text-lg uppercase">{contributor.name}</h3>
            {isFounder ? (
              <span className="font-display text-[10px] font-bold uppercase bg-brutalist-yellow border-[2px] border-brutalist-ink px-2 py-0.5">
                Criador
              </span>
            ) : null}
          </div>
          <p className="text-sm text-brutalist-ink/60">@{contributor.login}</p>
          {contributor.location ? (
            <p className="text-xs text-brutalist-ink/50 mt-1">{contributor.location}</p>
          ) : null}
        </div>
      </div>

      {contributor.bio ? <p className="text-sm leading-relaxed text-brutalist-ink/80">{contributor.bio}</p> : null}

      <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t-[2px] border-brutalist-ink/10">
        <span className="font-display text-xs font-bold uppercase text-brutalist-ink/60">
          {contributor.contributions} {contributor.contributions === 1 ? "contribuição" : "contribuições"}
        </span>
        <Link
          href={contributor.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase no-underline text-brutalist-blue hover:text-brutalist-ink"
        >
          GitHub
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  )
}

export default function QuemFazPage({ contributors }: QuemFazPageProps) {
  const otherContributors = contributors.filter((contributor) => contributor.login !== "jjgouveia")

  return (
    <>
      <Head>
        <title>Manda Jobs - Quem faz</title>
        <meta
          name="description"
          content="Conheça quem criou e quem contribui com o Manda Jobs, o filtro inteligente de vagas no LinkedIn."
        />
      </Head>

      <div className="min-h-screen bg-brutalist-paper font-body text-brutalist-ink">
        <Header />

        <main className="max-w-3xl mx-auto px-6 py-14">
          <span className="inline-block font-display font-bold text-xs uppercase bg-brutalist-ink text-brutalist-yellow px-3 py-1.5 mb-5">
            Pessoas por trás do produto
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase mb-6">Quem faz</h1>
          <p className="text-base sm:text-lg leading-relaxed mb-10">
            O Manda Jobs é open source e gratuito. A ideia é uma: achar vaga no LinkedIn sem sofrer com query booleana.
            Aqui você vê quem criou e quem já mexeu no código.
          </p>

          <section className="mb-12">
            <div className="border-[3px] border-brutalist-ink bg-white shadow-brutal-md p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 sm:items-start">
                <img
                  src="https://avatars.githubusercontent.com/u/98658308?v=4"
                  alt="Jarbas Gouveia"
                  width={112}
                  height={112}
                  className="w-28 h-28 border-[3px] border-brutalist-ink object-cover shrink-0"
                />
                <div>
                  <p className="font-display text-xs font-bold uppercase text-brutalist-blue mb-2">{FOUNDER.role}</p>
                  <h2 className="font-display text-3xl font-bold uppercase mb-2">{FOUNDER.name}</h2>
                  <p className="text-base font-medium text-brutalist-ink/80 mb-4">{FOUNDER.headline}</p>
                  <div className="space-y-3 text-sm leading-relaxed text-brutalist-ink/75">
                    {FOUNDER.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t-[3px] border-brutalist-ink/10">
                    <h3 className="font-display text-xs font-bold uppercase text-brutalist-ink/50 mb-2">
                      Projetos em destaque na Ativos
                    </h3>
                    <p className="text-sm text-brutalist-ink/60 mb-4">{FOUNDER.initiativesIntro}</p>
                    <ul className="space-y-4">
                      {FOUNDER.initiatives.map((initiative) => (
                        <li key={initiative.name} className="border-l-[3px] border-brutalist-blue pl-4">
                          <div className="flex flex-wrap items-center gap-2">
                            {initiative.link ? (
                              <Link
                                href={initiative.link}
                                target="_blank"
                                rel="noreferrer"
                                className="font-display font-bold text-sm uppercase text-brutalist-ink no-underline hover:text-brutalist-blue"
                              >
                                {initiative.name}
                              </Link>
                            ) : (
                              <p className="font-display font-bold text-sm uppercase text-brutalist-ink">
                                {initiative.name}
                              </p>
                            )}
                            {"status" in initiative && initiative.status ? (
                              <span className="font-display text-[10px] font-bold uppercase bg-brutalist-pink text-brutalist-ink border-[2px] border-brutalist-ink px-2 py-0.5">
                                {initiative.status}
                              </span>
                            ) : null}
                          </div>
                          <p className="text-sm leading-relaxed text-brutalist-ink/70 mt-1">
                            {initiative.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t-[3px] border-brutalist-ink/10">
                <Link
                  href={FOUNDER.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-[3px] border-brutalist-ink bg-brutalist-yellow px-4 py-2 font-display text-xs font-bold uppercase no-underline text-brutalist-ink hover:bg-brutalist-yellow/80"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </Link>
                <Link
                  href={FOUNDER.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-[3px] border-brutalist-ink bg-white px-4 py-2 font-display text-xs font-bold uppercase no-underline text-brutalist-ink hover:bg-brutalist-paper"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </Link>
                <Link
                  href={FOUNDER.links.email}
                  className="inline-flex items-center gap-2 border-[3px] border-brutalist-ink bg-white px-4 py-2 font-display text-xs font-bold uppercase no-underline text-brutalist-ink hover:bg-brutalist-paper"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Link>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase mb-2">Contribuidores do repositório</h2>
            <p className="text-sm text-brutalist-ink/60 mb-6">
              Lista atualizada a partir do{" "}
              <Link
                href="https://github.com/jjgouveia/mandajobs/graphs/contributors"
                target="_blank"
                rel="noreferrer"
                className="text-brutalist-blue font-semibold no-underline hover:underline"
              >
                GitHub
              </Link>
              .
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {contributors.map((contributor) => (
                <ContributorCard
                  key={contributor.login}
                  contributor={contributor}
                  isFounder={contributor.login === "jjgouveia"}
                />
              ))}
            </div>

            {otherContributors.length === 0 ? (
              <p className="text-sm text-brutalist-ink/60 mt-6">
                Quer contribuir? Abra uma issue ou PR no repositório. Toda ajuda conta.
              </p>
            ) : null}
          </section>

          <section className="mt-12 border-[3px] border-brutalist-ink bg-brutalist-ink text-brutalist-paper p-6">
            <h2 className="font-display text-xl font-bold uppercase mb-3 text-brutalist-yellow">Quer fazer parte?</h2>
            <p className="text-sm leading-relaxed text-gray-300 mb-4">
              O projeto é gratuito e open source. Pode ser código, ideia, design ou divulgação.
            </p>
            <Link
              href="https://github.com/jjgouveia/mandajobs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-[3px] border-brutalist-yellow bg-brutalist-yellow text-brutalist-ink px-4 py-2 font-display text-xs font-bold uppercase no-underline hover:bg-brutalist-yellow/90"
            >
              Ver repositório no GitHub
              <ExternalLink className="w-4 h-4" />
            </Link>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const contributors = await fetchProjectContributors()

  return {
    props: { contributors },
    revalidate: 86_400,
  }
}
