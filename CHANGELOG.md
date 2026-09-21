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

[Unreleased]: https://github.com/Rahulkprajapati/Rahulkprajapati.github.io/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Rahulkprajapati/Rahulkprajapati.github.io/releases/tag/v1.0.0
