---
name: telescopio-design
description: Use this skill to generate well-branded interfaces and assets for Projeto Telescópio (MTP-2026), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a deep-space observatory aesthetic in Portuguese (pt-BR).
user-invocable: true
---

Read the `README.md` file within this skill first — it contains content fundamentals, visual foundations, and iconography rules for the Projeto Telescópio brand. Then explore the other available files:

- `colors_and_type.css` — design tokens (CSS custom properties for color, type, spacing, motion).
- `assets/photos/` — team headshots and background plates.
- `assets/telescope_flowchart.png` — the project's signature deliverable diagram.
- `preview/*.html` — small cards previewing each token group; useful for understanding the visual language.
- `ui_kits/projeto_telescopio/` — JSX components and an interactive `index.html` recreation of the source site.
- `source/projeto_telescopio_source.html` — the original repo HTML, kept verbatim.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and create static HTML files for the user to view. Always link to `colors_and_type.css` (or inline its `:root` block) so the design tokens flow through. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some focused questions (audience, language, length, what part of the brand to emphasize), and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

**Non-negotiables when working in this system:**
1. Copy is in Brazilian Portuguese unless the user explicitly asks for another language.
2. The palette is exactly three colors (`#030a14`, `#00d4cc`, `#ff8c42`) plus a neutral text scale. Don't introduce a fourth.
3. Three font families with strict roles: **Syne** for headlines, **Outfit** (300 weight default) for body, **Space Mono** for every label/eyebrow/button.
4. Icons are inline SVGs at 1.5 stroke width. The blueprint-style `stroke-dasharray="3,1.8"` is reserved for "in progress" timeline markers — don't use it elsewhere.
5. No emoji. No gradients on surfaces. No card-with-left-border-accent.
