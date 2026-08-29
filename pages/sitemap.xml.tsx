import type { GetServerSideProps } from "next"

const SITE_URL = "https://mandajobs.vercel.app"

const PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/quem-faz", priority: "0.6", changefreq: "monthly" },
  { path: "/termos-de-uso", priority: "0.3", changefreq: "yearly" },
]

function SiteMap() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const lastmod = new Date().toISOString().slice(0, 10)

  const urls = PAGES.map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.path === "/" ? "" : page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  res.setHeader("Content-Type", "text/xml")
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate")
  res.write(xml)
  res.end()

  return { props: {} }
}

export default SiteMap
