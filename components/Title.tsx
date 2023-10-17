import Head from "next/head";

type Props = {
  title?: string;
};

export default function Title({ title = "Manda Jobs" }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/manda_jobs_logo.svg" />
    </Head>
  );
}
