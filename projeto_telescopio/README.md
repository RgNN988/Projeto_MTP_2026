# Projeto Telescópio · UI Kit

A click-through recreation of the **Projeto Telescópio (MTP-2026)** single-page site, the only surface the brand ships. Built as small JSX components on a static HTML host.

This kit is **visual + structural** — it skips the live Three.js star canvas from the original (using the CSS radial-gradient fallback) and stubs out the custom cursor, but otherwise mirrors the source layout and behavior.

## Run it

Open `index.html` directly in a browser, or `done` it.

## File map

| File | Purpose |
| :--- | :--- |
| `index.html` | Page host. Loads React/Babel and stitches the section components together. |
| `Primitives.jsx` | `Eyebrow`, `SectionTitle`, `SectionLabel`, `Divider`, `Tag`, `Badge`, `ButtonCta`, `ButtonSm`, `Icon` collection. Exported to `window`. |
| `Nav.jsx` | Sticky top navigation with logo mark + anchor links. Active-state on hover. |
| `Hero.jsx` | Hero — gradient background, eyebrow, gradient-clip title, CTA, decorative telescope SVG, scroll hint. |
| `Sobre.jsx` | About section — 2-column grid with stat cards. |
| `Evolucao.jsx` | Build-phase timeline — 4-column grid, active vs locked phase markers, connector line. |
| `Entregaveis.jsx` | Deliverables — 2×2 card grid that opens a modal on click. |
| `Documentacao.jsx` | Vertical timeline with glowing teal stem and dotted entries. |
| `Equipe.jsx` | Team grid — 5-column avatar cards. |
| `FooterBar.jsx` | Site footer — wordmark with teal accent + meta link list. |
| `Modal.jsx` | The deliverable preview modal — backdrop blur, scale-in. |

## Interaction notes

- Click any **Entregáveis** card → modal opens with a placeholder preview frame. The original loads PDFs/images via iframe; here we show metadata since the source PDFs aren't in the repo.
- Click outside the modal or press **Esc** to close.
- Hover any card → border lifts to 32% teal, card translates up 6px, bottom gradient stroke scales in.
- Hover any nav link → mono label transitions to teal, underline draws in from the left.
- Scroll → top scroll-progress bar fills (teal → orange gradient).

## What's cut

- **Three.js star canvas** — out of scope. The CSS radial-gradient background reads as the same atmosphere at zero JS cost.
- **Custom cursor** — exists in `preview/brand-cursor.html` but not active in the kit (it can be intrusive when inspecting).
- **Real PDF deliverables** — the source links to `trabalhos/*.pdf` files that aren't in the repo. We keep the flowchart PNG and show a stub for the others.
