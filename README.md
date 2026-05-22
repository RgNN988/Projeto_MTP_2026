# Telescópio Design System

A design system extracted from **Projeto Telescópio (MTP-2026)** — a Brazilian high-school engineering project documenting the construction of a working telescope from scratch. The product is a single-page Portuguese-language showcase site that catalogs the project's planning, deliverables, build phases, and team.

> **"Construindo janelas para o universo"** — _Building windows to the universe._

The system is built around a **deep-space observatory** aesthetic: near-black surfaces, a single glowing teal accent that mimics a backlit lens, warm orange used sparingly as a "warning star" highlight, and a triad of typefaces (display geometric, soft sans body, technical mono).

---

## Source materials

This system was reverse-engineered from the project's GitHub source. Reviewers with access can dig deeper at:

- **GitHub:** [`RgNN988/Projeto_MTP_2026`](https://github.com/RgNN988/Projeto_MTP_2026) — the single-page site, photo assets, and project deliverables.
- **Site source (mirrored):** `source/projeto_telescopio_source.html` — the original `index.html` from the repo, kept verbatim for reference.

If you want richer assets or finer pattern fidelity, browse the repo directly.

---

## Index

```
.
├── README.md                ← you are here
├── SKILL.md                 ← agent-skill entrypoint
├── colors_and_type.css      ← all design tokens (vars + semantic styles)
├── assets/
│   ├── photos/              ← team headshots, nebula plate, telescope plate
│   └── telescope_flowchart.png
├── source/
│   └── projeto_telescopio_source.html   ← original repo file
├── preview/                 ← cards rendered in the Design System tab
│   ├── colors-*.html
│   ├── type-*.html
│   ├── spacing-*.html
│   ├── components-*.html
│   └── brand-*.html
└── ui_kits/
    └── projeto_telescopio/
        ├── README.md
        ├── index.html       ← interactive recreation
        └── *.jsx            ← components
```

There is **no slide template** in the source, so no `slides/` folder is created.

---

## Brand identity

| Token             | Value         |
| :---------------- | :------------ |
| Brand name        | Projeto Telescópio |
| Tagline           | Construindo janelas para o universo |
| Project code      | MTP-2026 |
| Language          | Portuguese (Brazil) — pt-BR |
| Logo mark         | Stylized telescope on tripod (inline SVG) |

The "logo" is an inline SVG drawn at small sizes (22×22 nav, 280×380 hero). There is **no raster logo file** in the source — see `preview/brand-logo.html` for the canonical mark, and `assets/photos/telescopio-e1576107221750.jpg` for the photographic plate used as a background motif.

---

## CONTENT FUNDAMENTALS

### Language

- All copy is **Brazilian Portuguese (pt-BR)**. The `<html lang="pt-BR">` is set at the root.
- Section labels are paired with English-style numbering: `01 — Sobre`, `02 — Progresso`, etc.

### Voice

- **Third person, institutional but warm.** Reads like a school-project README with poetic ambitions.
- **Never uses "I" or "we".** The project speaks _about itself_, not as itself: _"O Projeto Telescópio é uma iniciativa escolar..."_ rather than _"Somos uma iniciativa..."_
- **"Você" is implied, never addressed.** CTAs use imperative neutral verbs ("Explorar o Projeto", "Visualizar", "Rolar") instead of second-person.
- **Scientific register** with technical vocabulary used confidently: _carta morfológica, alinhamento óptico, calibração, espelho primário, parâmetros ópticos_. The reader is trusted as a peer.
- **One poetic flourish per section, max.** Most copy is operational; the brand tagline ("janelas para o universo") and the stat card ("∞ estrelas a observar") carry the dreamy register.

### Casing

- **Section titles:** Title Case — _Sobre o Projeto, Evolução do Telescópio, Documentação do Projeto._
- **Eyebrows:** `UPPERCASE` mono, with the index — _"01 — SOBRE"_.
- **Buttons:** `UPPERCASE` mono, very wide tracking — _"VISUALIZAR", "EXPLORAR O PROJETO"._
- **Body:** Sentence case, full punctuation, em dashes liberally for parenthetical asides.
- **Brand wordmark:** "Projeto Telescópio" — Title Case. In the footer, "Telescópio" gets the teal accent: <code>Projeto&nbsp;<em>Telescópio</em></code>.

### Tone examples (verbatim from source)

- Hero sub: _"Construindo janelas para o universo"_ — short, present-progressive, aspirational.
- Phase 02 description: _"Compra de lentes, espelhos, tubos e ferragens"_ — concrete, comma-separated, no hedging.
- Doc entry: _"Início oficial do Projeto Telescópio. Foram definidos os parâmetros básicos do instrumento..."_ — passive voice for institutional weight ("Foram definidos").
- Doc placeholder: _"Mais atualizações em breve"_ — humble, leaves room.

### Punctuation

- **Em dash (—)** is the signature glyph. Used in eyebrows (`01 — Sobre`), in body for parentheticals, and in section descriptions.
- **Middle dot (·)** appears in metadata: _"Projeto MTP-2026 · 2026"_.
- **Infinity (∞)** is used as a stat-card number — never spelled out.

### Emoji

- **Zero emoji.** None in the source. Iconography is handled exclusively through inline SVG (see ICONOGRAPHY below).

---

## VISUAL FOUNDATIONS

### Color philosophy

The palette is built like an **observatory at night**:

- **Surfaces** are three flavors of near-black with a blue undertone (`#030a14` → `#0b1524` → `#111f35`), creating subtle elevation without ever lightening above ~10% luminance.
- **Primary** is a single saturated teal `#00d4cc` — the "lens glow." It carries _all_ interactive affordance: every link, focus ring, active state, border highlight, and progress indicator.
- **Secondary** is a warm orange `#ff8c42` — the "warning star." Used only on the `Objetivos` card, the infinity stat, and one telescope sparkle. **Less than 5% of the surface area uses orange.** It is a punctuation mark, not a partner color.
- **Text** is a cool off-white `#d8eaf0` paired with a desaturated slate `#5b7a8a` for muted copy. No pure white anywhere in body content (white appears only in gradient text mixes).
- **Borders** are almost always teal-tinted at 14% alpha — `rgba(0, 212, 204, 0.14)`. They glow subtly rather than divide harshly.

### Typography

A three-family stack with very clear roles:

| Family | Role | Weights | Used for |
| :--- | :--- | :--- | :--- |
| **Syne** | Display | 700 / 800 | All `h1`–`h3`, brand wordmark, card titles. Geometric, slightly retro, futurist edge. Letter-spacing always negative (-0.02 to -0.04em). |
| **Outfit** | Body | 300 / 400 / 500 | All paragraphs, descriptions, nav logo text. Weight 300 (Light) is the **default body weight** — gives the copy an airy, technical feel. |
| **Space Mono** | Mono | 400 / 700 | Every eyebrow, button label, badge, stat label, footer copy, scroll hint. Always `UPPERCASE` with `letter-spacing: 0.1em+`. |

**Hierarchy rule:** Display family is _only_ used for things that read as headlines. Mono is _only_ used for things that read as metadata. Outfit fills everything between.

### Layout

- **Max content width:** `1180px`, centered.
- **Section padding:** `7rem 2.5rem` top/bottom desktop; `4.5rem 1.25rem` mobile.
- **Sticky nav** — `64px` tall, `rgba(3,10,20,0.72)` with `backdrop-filter: blur(18px)`. Always visible.
- **Grids:** Stats stack 1-col, entregáveis 2-col, evolução 4-col on desktop → 2-col tablet → 1-col mobile. Equipe is 5-col → 3-col → 2-col.
- **Asymmetric photo washes** — the SOBRE section has a faded telescope photo bleeding from the right at 5.5% opacity, masked with a gradient. Background imagery never competes with content; it sits at single-digit alpha.

### Backgrounds

- **Layered radial gradients** simulate nebulae and atmospheric depth — the hero stacks four radial gradients (lens halo, orange star top-right, teal star bottom-left, vertical fade) over the base surface.
- **Photo washes** at 5–15% opacity, often with `mix-blend-mode: screen` to keep them ethereal.
- **No textures, no patterns, no full-bleed photographs.** The page is mostly empty space.
- **A live `<canvas>` star field** sits in the hero (Three.js); CSS-only fallback uses radial gradients.

### Animation

- **Signature easing:** `cubic-bezier(0.22, 1, 0.36, 1)` — a soft, decelerating curve. Used for every reveal, hover, transform.
- **Float** — the decorative hero telescope floats `±14px` over 7s, ease-in-out.
- **Pulse-glow** — active phase dots scale 1 → 1.04 → 1 over 3.2s with opacity oscillation.
- **Fade-up** — hero copy enters with `opacity 0 → 1` + `translateY(28px → 0)`, staggered at 0.3s / 0.5s / 0.7s / 0.9s.
- **Scroll reveal** — `.reveal` class transitions `opacity` + `translateY(30px)` over 0.75s when `.visible` is added by an IntersectionObserver. Stagger via `.reveal-d1/d2/d3` (0.1s steps).
- **Spin-slow** — the background nebula rotates a full 360° over 140 seconds (effectively imperceptible motion).
- **Scan** — a thin teal line falls top-to-bottom across canvas viewports (loading state, used sparingly).

### Hover & press

- **Hover (cards):** `transform: translateY(-4px to -6px)`, border lifts from `0.14` → `0.32–0.38` alpha, shadow deepens with a faint teal halo. No background-color shifts — it's all border + lift.
- **Hover (links):** Color shifts `text-muted → primary`, an underline _draws in_ from `width: 0 → 100%` over 0.35s.
- **Hover (buttons):** Background fills with `--primary-dim`, border solidifies, slight Y-translate.
- **Press:** `transform: translateY(0)` (cards) or `opacity: 0.7` (icon buttons). Never a scale-down.
- **Focus-visible:** Always `2px solid var(--primary)` with `4px outline-offset`. Required on every interactive surface.

### Borders & shadows

- **All borders are 1px**, always teal-tinted, with alpha doing the work.
- **Shadows are subtle and dark** — no soft drop-shadows. The signature elevation is _ambient teal glow_, not depth shadow: `box-shadow: 0 0 28px rgba(0, 212, 204, 0.22)`.
- Cards have an **internal top-edge highlight** via a 1px gradient line `linear-gradient(90deg, transparent, var(--primary), transparent)`.
- Some cards add a **bottom-edge scale-in stroke** on hover — a 2px teal→orange gradient that `scaleX(0 → 1)` from the left.

### Transparency & blur

- **Backdrop blur (18px)** on the sticky nav and the modal overlay — these are the only two places blur is used.
- **Glass surfaces never appear in body content.** Cards are solid `--bg-surface`.

### Corner radii

| Element | Radius |
| :--- | :--- |
| Buttons, inline tags, scroll progress | `4px` |
| Stat cards, small panels | `8px` |
| Entregável cards, modals, icon containers | `12px` |
| Pills, badges, avatars | `999px` / circle |

### Card anatomy

A canonical card is:

1. `--bg-surface` background.
2. `1px solid var(--border)` (teal at 14%).
3. `12px` border-radius.
4. `--sh-card` shadow.
5. A 1px teal gradient line glued to the top edge (`::before`).
6. Internal padding `2rem` (entregáveis) or `1.5rem 1.75rem` (stat cards).
7. On hover: border alpha → 0.32, `translateY(-6px)`, deeper shadow, optional bottom-edge scale-in stroke.

### Fixed elements

- **Sticky nav** (top).
- **Scroll-progress bar** — `2px` height, full-width, top of viewport, `linear-gradient(90deg, var(--primary), var(--secondary))` with a teal box-shadow glow. Width tracks scroll percentage.
- **Custom cursor** — a `36×36` teal ring with a cross-hair, plus a 4px center dot, both replacing the OS cursor on `pointer:fine` devices. Hover state inflates the ring to `52×52`.

### Imagery treatment

- **Team headshots** — circular, `72px`, in `--primary-dim` containers with a `1.5px` teal border. Initials fallback in mono if no image.
- **Photographic plates** (nebula, telescope, telescope photo) live at **5–15% opacity**, blurred or color-burned into the background. Never shown at full opacity.
- **No b&w treatment.** Photos retain their warm tones but are deeply darkened by the surface beneath.

### What's deliberately absent

- No gradients on surfaces (only on text fills and the scroll-progress bar).
- No card-with-colored-left-border pattern.
- No emoji.
- No drop-shadow softness — only glow.
- No third color. The palette is **three colors total** plus a neutral text scale.

---

## ICONOGRAPHY

### System

There is **no icon font** in the source, and **no third-party icon library** is loaded. Every icon is a **bespoke inline SVG** drawn directly in the markup, sized between 9×9 (button arrows) and 26×26 (phase markers).

The icons follow one of two distinct visual languages, deliberately:

1. **Standard mode** — clean 1.5–1.6 stroke, no fills, rounded line caps. Used in the nav (telescope mark), entregável cards (document, flowchart, personas, target), modal close (X), and CTA arrows. Visually similar to **Lucide / Feather** stroke icons.

2. **Blueprint mode** — `stroke-dasharray="3,1.8"` on every line, plus faint grid background lines. Used **only** on the two _active_ phase dots in the Evolução timeline. Communicates "this is in progress / in planning" with a technical-drawing metaphor. **Locked phase dots** use a solid filled padlock instead.

This dual system is the most distinctive iconography choice — keep it. Don't draw a dashed icon for a completed/locked state, and don't draw a solid icon for an in-progress one.

### Stroke vocabulary

| Property | Value |
| :--- | :--- |
| Stroke width | `1.5` (standard) / `1.3` (blueprint phase markers) |
| Stroke caps | `round` for organic shapes, default for technical |
| Fill | `none` — except for tiny "pip" dots (target center, padlock keyhole) |
| Color | `currentColor` so SVGs inherit teal in primary contexts, orange in secondary |

### Sizes

- `9 × 9` — inline button arrow ("Visualizar →")
- `12 × 12` — modal close
- `13 × 13` — CTA inline icon ("Explorar o Projeto ⓘ")
- `21 × 21` — entregável card icons
- `22 × 22` — nav logo
- `26 × 26` — phase dot icons
- `280 × 380` — decorative hero telescope (multi-shape illustration)

### Substitution policy

If you need an icon not present in the source set, use **Lucide** stroke icons at `1.5` stroke width — they match the visual register. **Do not** introduce a different system (Heroicons solid, Material, emoji, Feather variations) without explicitly flagging it.

For "blueprint mode" — there's no library equivalent. Draw it inline by hand, copying the dash pattern (`stroke-dasharray="3,1.8"`).

### Logos

The brand has no raster logo. The telescope-on-tripod mark is recreated in `preview/brand-logo.html` and the nav variant in `preview/brand-logo-small.html`. Use these as reference; if you need an exportable version, screenshot from the preview.

### Photos

`assets/photos/` contains:

- **Team headshots** (`foto_*.png` and three `WhatsApp Image *.jpeg` files) — used in the Equipe grid as circular avatars.
- **Background plates** — `telescopio-e1576107221750.jpg` (vintage telescope, hero), `7077.jpg` (nebula, hero spinner), `R.jpg` (galaxy, sobre wash).
- `arrume.png` and `foto_renné.png` — additional team / project imagery.

---

## ⚠️ Known caveats

- **Fonts are loaded from Google Fonts via CDN.** No local `.ttf` / `.woff2` files are bundled. If you need offline-safe fonts, ask for the original assets — Syne, Outfit, and Space Mono are all open-source on Google Fonts.
- **No icon library** is in use; the recreation policy is "draw inline" or substitute Lucide. Flagged in ICONOGRAPHY above.
- **The original site is in pt-BR.** All component copy in the UI kit preserves this. Do not translate unless asked.
- **Three.js star canvas** is referenced in the source but truncated in our copy — the UI kit uses the CSS radial-gradient fallback only.

---

## Want to go deeper?

Open the source repo at [github.com/RgNN988/Projeto_MTP_2026](https://github.com/RgNN988/Projeto_MTP_2026) — there's more imagery and the full Three.js scene that didn't make it into the kit. Anything you build from this design system will look more authentic if you mirror that source's restraint: **lots of empty deep-black space, one glowing teal accent, one orange spark, and tight technical copy in Portuguese.**
