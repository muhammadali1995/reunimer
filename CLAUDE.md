# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Reunimer** — Multi-page marketing site for the Reunimer group, built pixel-perfect from Figma designs. Astro 6 static site with Tailwind CSS, GSAP animations, and Playwright visual testing.

## Figma Source

- File: https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer
- File key: `YZpOkEQoNYBuvDtjgt59Tm`
- Always use specific `node-id` when reading sections — don't read the whole file at once
- Read one section/frame at a time

## Commands

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm test` — Run Playwright tests
- `npm run test:update` — Update Playwright snapshots

## Tech Stack

- **Astro 6** (SSG by default)
- **Tailwind CSS** (design tokens in `tailwind.config.mjs` + `src/styles/tokens.css`)
- **GSAP + ScrollTrigger** (entrance/scroll animations only — added in a dedicated pass, not per-section)
- **Playwright** (visual regression testing after each section build)
- **TypeScript** (strict mode, extends `astro/tsconfigs/strict`)
- **Node >= 22.12.0**

## Architecture

```
src/
  components/
    ui/          # Reusable primitives: Button, Container, SectionHeading, ExpertiseCard, ArticleCard, Tag, FormField
    sections/    # Page sections: Navbar, Footer
  layouts/
    BaseLayout.astro   # HTML head, fonts, meta, global CSS
    PageLayout.astro   # Wraps BaseLayout + Navbar + Footer
  pages/         # Astro pages (index.astro, ui-preview.astro, etc.)
  styles/
    global.css   # Tailwind directives + component styles
    tokens.css   # CSS custom properties (colors, typography, spacing)
  assets/
    images/      # Exported from Figma (organized by section: expertise/, groupe/, actus/, carrieres/)
    icons/       # SVGs exported from Figma
    logos/        # Reunimer branding variants
tests/
  screenshots/
    figma/       # Reference screenshots from Figma (source of truth)
  visual/        # Visual comparison utilities
```

## Design System

### Colors (Tailwind classes)
- **Primary**: `bleu-abysse` (#002C41), `turquoise-ocean` (#0A97A6)
- **Expertise cards**: `terre-laterite` (#A34C26), `lagon-mayotte` (#2D7890), `sable-corail` (#AC8652), `nuit-australe` (#587682), `ecume-poudree` (#6EAEB5)
- **Neutral**: `brume-alize` (#809AA0), `gris-clair` (#F6F6F6)

### Typography (font families)
- `font-display` — Zalando Sans Expanded (Black 900) — section titles, uppercase
- `font-heading` — Montserrat (SemiBold 600, Medium 500, Regular 400) — headings, nav, cards
- `font-body` — Inter (Regular 400, Medium 500) — body text, forms

### Reusable Components (`src/components/ui/`)

**ALWAYS check these before building anything. If a pattern exists, USE IT. Don't duplicate.**

| Component | Props | When to use |
|-----------|-------|-------------|
| **Container** | `class`, `as` (div\|section\|article\|nav) | Every content section — provides `max-w-[1284px]` centered with responsive padding |
| **SectionWrapper** | `bg` (white\|gris-clair\|bleu-abysse), `id`, `class` | Wrap page sections — gives consistent `py-16 md:py-24 lg:py-[120px]` spacing |
| **SectionHeading** | `title`, `subtitle`, `align` (left\|center), `light` | Section titles — Zalando Sans + Montserrat subtitle |
| **Button** | `variant` (outline-dark\|outline-light\|primary), `href` | All CTAs and links |
| **ExpertiseCard** | `title`, `description`, `href`, `imageSrc`, `imageAlt`, `color` | Expertise/filière cards — image + colored panel |
| **ArticleCard** | Card with image, tag badge, date/title | News/article listings |
| **Tag** | Colored pill badge | Category labels (bleu-abysse, turquoise, sable-corail) |
| **FormField** | Input/select/textarea | Contact and footer forms — turquoise borders on dark bg |

### Layouts
| Layout | What it includes |
|--------|-----------------|
| **BaseLayout** | HTML head, fonts, meta, global CSS — use for custom pages without nav/footer |
| **PageLayout** | Wraps BaseLayout + Navbar + Footer — use for all standard pages |

## Implementation Workflow

### Section-by-Section Process (NEVER build a whole page at once)

For each section on a page:

1. **Analyze Figma carefully.** Read the specific Figma frame using `get_design_context` with its `node-id`. Extract and note ALL of these values before writing any code:
   - **Spacing**: exact `padding` (top, right, bottom, left), `gap` between children, `margin` between sections
   - **Typography**: `font-family`, `font-weight`, `font-size`, `line-height`, `letter-spacing`, `text-transform`
   - **Colors**: fill colors, text colors, border colors, background colors — match to existing tokens or note new ones
   - **Layout**: direction (row/column), alignment (start/center/end/stretch), distribution, wrap behavior
   - **Sizing**: fixed width/height, min/max constraints, fill-container vs hug-contents
   - **Borders & effects**: `border-radius`, `border-width`, `box-shadow`, `opacity`
   - **Auto layout**: Figma auto layout properties map directly to flexbox — `gap`, `padding`, direction, alignment
   - **Take a screenshot** using `get_screenshot` for visual reference — always compare your work against this, not just the code output

2. **Check existing components.** Scan `src/components/ui/` — can an existing component handle this? If yes, use it. If it's close but missing a variant, extend it rather than creating a new one.

3. **Check existing tokens.** Before adding any new color, spacing, or font size:
   - Check `tailwind.config.mjs` for existing values
   - Check `src/styles/tokens.css` for existing CSS custom properties
   - If the Figma value matches an existing token (exact or within 1-2px), use the existing token
   - If it's a genuinely new value used in multiple places, add it to `tailwind.config.mjs` with a semantic name
   - If it's a one-off value, ask the user before adding — it might be a Figma inconsistency

4. **Build the section.** Use design tokens from Tailwind config / `tokens.css`. Match Figma spacings exactly at desktop.

5. **Handle responsiveness.** Figma only provides desktop — you must create tablet and mobile layouts yourself:
   - Pay close attention to spacing reductions at each breakpoint
   - Grids: reduce columns (3→2→1) at breakpoints
   - Typography: scale down ~10-15% for tablet, ~20% for mobile
   - Tap targets: minimum 44px on mobile
   - Test that nothing overflows or looks cramped

6. **Verify visually.** Use `get_screenshot` from Figma MCP to grab the reference, then compare against your built section. Check spacings, alignment, colors, and typography. Fix any discrepancies before moving on.

7. **Move on.** Only start the next section after the current one is solid.

### Figma-to-Tailwind Mapping Reference

| Figma Property | Tailwind Equivalent |
|---------------|-------------------|
| Auto layout direction: horizontal | `flex flex-row` |
| Auto layout direction: vertical | `flex flex-col` |
| Auto layout gap: 24 | `gap-6` (gap-{n} where n = px/4) |
| Padding: 16 24 16 24 | `py-4 px-6` |
| Fill container (main axis) | `flex-1` or `w-full` / `h-full` |
| Hug contents | `w-fit` / `h-fit` (or just omit width) |
| Fixed width: 320 | `w-[320px]` |
| Min width: 200 | `min-w-[200px]` |
| Alignment: center (cross axis) | `items-center` |
| Alignment: center (main axis) | `justify-center` |
| Space between (main axis) | `justify-between` |
| Text align: center | `text-center` |
| Border radius: 3 | `rounded-button` (3px) or `rounded-input` (5px) |
| Opacity: 0.6 | `opacity-60` or `/60` suffix for colors |
| Absolute positioned | `absolute` + `top-/left-/right-/bottom-` |
| Clip content | `overflow-hidden` |
| Image fill (cover) | `object-cover w-full h-full` |
| Drop shadow | `shadow-sm` / `shadow-md` or custom in config |

### Asset Handling

- **Images**: Export from Figma, save to `src/assets/images/{section}/` with descriptive kebab-case names (e.g., `carte-peche.jpg`, `home-groupe.jpg`). Use Astro `<Image />` component to render — never raw `<img>` tags.
- **Icons**: Export as SVG from Figma, save to `src/assets/icons/` with descriptive names (e.g., `chevron-down.svg`, `search.svg`). Always use SVG format for icons — never PNG/JPG.
- **Logos**: Save to `src/assets/logos/` with variant names (e.g., `logo-header.svg`, `logo-footer-white.svg`).
- **Naming convention**: always `kebab-case`, descriptive, grouped by section folder.
- If an image or icon is needed but not yet exported, **ask the user** to provide it before using a placeholder.

### When Design is Ambiguous

If the Figma design is unclear, inconsistent, or missing information:
- **ASK the user.** Don't guess or make assumptions.
- Flag exactly what's ambiguous (e.g., "The spacing between these two elements looks like either 24px or 32px in Figma — which should I use?")
- If two Figma frames show conflicting values for the same pattern, ask which is correct.

### Build Rules

- **Design tokens only.** Never hardcode colors, font sizes, spacing. Always reference Tailwind config or CSS custom properties from `tokens.css`.
- **Pixel-perfect at desktop.** Match the exact Figma frame — spacings, paddings, gaps, font sizes. No eyeballing.
- **Spacing matters.** Pay extra attention to vertical/horizontal spacing between elements. Get the exact `gap`, `padding`, `margin` values from Figma.
- **Hover/focus/active states** built with each component — CSS transitions (200-300ms ease), not GSAP.
- **GSAP is only for entrance/scroll animations** — added in a dedicated pass after all sections are built.
- **Astro `<Image />`** for all images — never raw `<img>` tags.
- **TypeScript props** with defaults on every component.
- **Don't create new `ui/` components** if an existing one can be extended with a variant.
- **Don't use inline styles or arbitrary Tailwind values** — extend the config instead.

## Responsive Strategy

Desktop designs from Figma are the source of truth. Only desktop is designed — responsive layouts must be created by Claude.

- **Desktop** (1024px+): pixel-perfect to Figma. This is the baseline.
- **Tablet** (768–1024px): reduce grid columns, scale type ~10–15% down, adjust padding/gaps proportionally
- **Mobile** (375–767px): single column, hamburger nav, 44px min tap targets, comfortable spacing

**Responsive checklist for every section:**
- [ ] Text is readable and doesn't overflow at all breakpoints
- [ ] Images scale properly and maintain aspect ratio
- [ ] Grid layouts collapse gracefully (3→2→1 columns)
- [ ] Buttons and interactive elements have adequate tap targets on mobile
- [ ] Horizontal padding is comfortable (min 20px on mobile)
- [ ] No horizontal scroll at any breakpoint

## Navigation Structure (from Navbar)

- Groupe → `/groupe` (children: Identité, Gouvernance, RSE, Raison d'Être)
- Expertises → `/expertises` (children: Pêche, Production, Distribution, Supports, RH)
- Produits → `/produits` (children: Nos Marques, Catalogue)
- Actualités → `/actualites`
- Carrières → `/carrieres`
- Contact → `/contact`

## Git

- Remote: `muhammadali1995/reunimer` on GitHub
- Main branch: `main`
- Use `/switch-gh` to toggle between `Toshpulatov95` and `muhammadali1995` GitHub accounts

## When Compacting

Preserve: list of all built components and sections, current page being worked on, which Figma node-ids map to which sections, and any unresolved diff percentages from visual tests.
