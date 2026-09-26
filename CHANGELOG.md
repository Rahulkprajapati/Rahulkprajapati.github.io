# Changelog

All notable changes to this portfolio are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Because this is a site rather than a library, the scheme is read as:

- **MAJOR** — a visual redesign or restructure that changes how the site looks or is navigated.
- **MINOR** — new sections, pages or features.
- **PATCH** — content edits, copy changes, dependency bumps and bug fixes.

Each release gets a version bump in `package.json`, an entry here, and an annotated
`vX.Y.Z` git tag. Pushing to `main` deploys to `gh-pages` automatically.

## [Unreleased]

## [2.0.0] - 2026-09-26

A second visual redesign in the instrument-panel style of the Neuform featured
templates, a new photo treatment, and groundwork so recruiters' search and
sourcing tools can find and read the CV. Nothing on the site, in its metadata or
in its structured data signals job-seeking, relocation or visa status.

### Added

- Spec-sheet visual language: monospace micro-labels, numbered section headers,
  hairline panels with registration ticks and corner annotations (`Frame.jsx`).
- Hero meta rail with coordinates and a live Bangalore (IST) clock.
- Telemetry readout of five figures, each traceable to an experience entry;
  hovering a reading shows its source.
- Interactive particle-sphere centrepiece with orbits and region markers, drawn on
  canvas (no WebGL library). It paints a static first frame even in background
  tabs and animates only while visible.
- Profile photo framed as a platform-access ID badge: portrait crop, theme-aware
  duotone that reveals full colour on hover, 3D pointer tilt and a holographic sheen.
- Build-time pre-rendering of the full CV into `#root` for crawlers and sourcing
  tools that don't run JavaScript (from 0 to ~800 words of readable content).
- Generated `ProfilePage` / `Person` JSON-LD with certifications, skills and profiles.
- `en-GB` language, `og:locale`, profile Open Graph tags and a new 1200×630
  preview card for LinkedIn and other link unfurls.
- Build version shown in the footer.

### Changed

- **Breaking visual change:** new token values. Dark mode is a near-black
  instrument panel with a mint signal accent; light mode is a warm-paper manifest.
- Experience rebuilt as a numbered manifest ledger with expandable entries.
- Page title and descriptions now use the terms recruiters search for
  ("Senior Platform Engineer", SRE, GCP, Kubernetes, Terraform).
- `profile.js` is now pure data (logos mapped in `logos.js`), so it is the single
  source for the app, the pre-rendered CV, the structured data and the sitemap.
- Sitemap is generated at build time with the build date.
- Custom CSS moved into `@layer components` so Tailwind utilities can override it.
- Toolkit icons are monochrome until hovered.

### Removed

- `typewriter-effect` dependency.
- Hand-written JSON-LD in `index.html` and the static `public/sitemap.xml`.

### Fixed

- The JS bundle is code-split: the initial bundle drops from 806 kB to 485 kB
  (245 kB to 165 kB gzipped). The terminal (xterm) and blog route load on demand.
- `favicon.png` was a 1024px JPEG mislabelled as PNG (362 kB); now a real 96px
  PNG (11 kB).
- Unlayered custom CSS was silently overriding Tailwind utilities, including
  `tracking-tight` on headings.

### Known issues

- In development only, opening the terminal logs an xterm `dimensions` error caused
  by React StrictMode's double mount. Production builds are unaffected.
- `tailwind.config.js` is still dead configuration under Tailwind v4.

## [1.0.0] - 2026-09-21

First versioned release. A full visual redesign built on a real design system.

### Added

- Design token layer in `src/index.css`: surface, text, border, accent, shadow and
  radius as CSS custom properties that switch on `.dark`, so both themes stay in sync.
- Reusable primitives — `.shell`, `.section`, `.surface`, `.surface-flat`, `.lift`,
  `.btn`, `.chip`, `.eyebrow` — giving one radius scale, one elevation scale and one
  hover behaviour across the site.
- Inter and JetBrains Mono, loaded from Google Fonts.
- Scroll-aware navbar: solidifies past the fold, marks the active section via
  `IntersectionObserver`, and shows a reading-progress bar.
- Collapsible bullet lists on experience entries, with a "Show N more" expander.
- A real footer with identity, social links and a back-to-top control.
- `:focus-visible` styling, `prefers-reduced-motion` support and `aria-label`s on
  icon-only controls.

### Changed

- Replaced every `font-black` (900) weight with a proper typographic hierarchy.
- Made section backgrounds transparent so the animated canvas is visible site-wide
  rather than only behind the hero; sections are now separated by hairline gradients.
- Dimmed the background canvas and added a radial scrim to keep body copy legible.
- Made the Toolkit and Contact panels theme-aware; they were previously dark in both
  light and dark mode.
- Narrowed the accent palette to red (brand), cyan (technical) and emerald (status),
  dropping the competing amber, purple and yellow accents.
- Rebuilt the pipeline animation around the shared accent tokens.
- Per-scheme `theme-color` meta tags so mobile browser chrome matches the active theme.

### Fixed

- Duplicate `style` attribute in `PlatformLab.jsx` that silently dropped the
  progress-bar gradient.
- Low-contrast tool icons in dark mode (MySQL, Helm, Datadog, New Relic, CircleCI,
  OpenAI, Linux, Python).
- Mobile navigation menu was too translucent to read against page content.

### Known issues

- `tailwind.config.js` is dead configuration: this project uses Tailwind v4, which
  ignores the JS config unless `@config` references it. Theme tokens now live in
  `@theme` inside `src/index.css`.
- The production JS bundle is ~806 kB (~245 kB gzipped) and is not yet code-split.

[Unreleased]: https://github.com/Rahulkprajapati/Rahulkprajapati.github.io/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/Rahulkprajapati/Rahulkprajapati.github.io/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/Rahulkprajapati/Rahulkprajapati.github.io/releases/tag/v1.0.0
