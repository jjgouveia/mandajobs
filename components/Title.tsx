import Head from "next/head";

type Props = {
  title?: string;
};

export default function Title({
  title = "Manda Jobs — Filtro inteligente de vagas no LinkedIn e na web",
}: Props) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/manda_jobs_logo.svg" />
    </Head>
  );
}
