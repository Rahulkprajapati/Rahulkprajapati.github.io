import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync } from 'node:fs'
import { SITE_URL, certifications, experiences, metrics, profile } from './src/data/profile.js'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))
const today = new Date().toISOString().slice(0, 10)

const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

// A plain-HTML copy of the CV, rendered into #root at build time. React
// replaces it on mount, but crawlers and recruiter sourcing tools that don't
// execute JavaScript read the whole CV instead of an empty <div>. It is the
// same content the app renders, so it is not hidden or cloaked text.
const renderStaticCv = () => `
<main class="prerender">
  <header>
    <p>${esc(profile.headline)} · ${esc(profile.location)}</p>
    <h1>${esc(profile.name)}</h1>
    <p><strong>${esc(profile.title)}</strong> at ${esc(experiences[0].company)}</p>
    <p>${esc(profile.summary)} ${esc(profile.current)}</p>
    <p>
      <a href="/Rahul_Prajapati.pdf">Résumé (PDF)</a> ·
      <a href="${esc(profile.links.github)}" rel="me">GitHub</a> ·
      <a href="${esc(profile.links.linkedin)}" rel="me">LinkedIn</a> ·
      <a href="${esc(profile.links.medium)}" rel="me">Medium</a> ·
      <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
    </p>
  </header>
  <section>
    <h2>Highlights</h2>
    <ul>${metrics.map((m) => `<li>${esc(m.value + (/^[a-z]/i.test(m.unit) ? ' ' : '') + m.unit)} ${esc(m.label.toLowerCase())} (${esc(m.source)})</li>`).join('')}</ul>
  </section>
  <section>
    <h2>Experience</h2>
    ${experiences
      .map(
        (exp) => `
    <article>
      <h3>${esc(exp.role)}, ${esc(exp.company)}</h3>
      <p>${esc(exp.period)} · ${esc(exp.location)}</p>
      <p>${esc(exp.summary)}</p>
      <ul>${exp.description.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
    </article>`,
      )
      .join('')}
  </section>
  <section>
    <h2>Certifications</h2>
    <ul>${certifications.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
  </section>
  <section>
    <h2>Core skills</h2>
    <p>${profile.expertise.map(esc).join(' · ')}</p>
  </section>
</main>`

// schema.org ProfilePage + Person, which Google documents for profile pages.
// Deliberately contains nothing about job-seeking, relocation or visas.
const structuredData = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: `${profile.name} — ${profile.headline}`,
      inLanguage: 'en-GB',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}#profile`,
      url: SITE_URL,
      inLanguage: 'en-GB',
      dateModified: today,
      isPartOf: { '@id': `${SITE_URL}#website` },
      mainEntity: { '@id': `${SITE_URL}#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}#person`,
      name: profile.name,
      jobTitle: profile.title,
      description: `${profile.summary} ${profile.current}`,
      url: SITE_URL,
      image: `${SITE_URL}portrait.jpg`,
      email: `mailto:${profile.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
      worksFor: { '@type': 'Organization', name: experiences[0].company },
      hasOccupation: {
        '@type': 'Occupation',
        name: profile.headline,
        skills: profile.expertise.join(', '),
      },
      knowsAbout: profile.expertise,
      hasCredential: certifications.map((name) => ({
        '@type': 'EducationalOccupationalCredential',
        name,
        credentialCategory: 'certification',
      })),
      sameAs: Object.values(profile.links),
    },
  ],
})

const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}blogs</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${SITE_URL}Rahul_Prajapati.pdf</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
`

const seoPrerender = () => ({
  name: 'seo-prerender',
  transformIndexHtml(html) {
    // `</` inside JSON would close the script tag early
    const json = JSON.stringify(structuredData()).replace(/</g, '\\u003c')
    return html
      .replace('<div id="root"></div>', `<div id="root">${renderStaticCv()}</div>`)
      .replace('<!--structured-data-->', `<script type="application/ld+json">${json}</script>`)
  },
  closeBundle() {
    writeFileSync(new URL('./dist/sitemap.xml', import.meta.url), sitemap())
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPrerender()],
  base: '/',
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(pkg.version),
  },
})
