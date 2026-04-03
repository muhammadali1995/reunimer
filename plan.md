# PHB (PHF) Filiale Page — Implementation Plan

## Context
Building the **PHF (Pêcheries des Hautes-de-France)** filiale/subsidiary page from Figma design `node-id=1095:3913`.  
This is the first filiale page — it establishes reusable patterns for other filiale pages.  
Implementation mirrors `index.astro`: typed data files → section components → page assembly → animations.

## Figma Source
- File: `YZpOkEQoNYBuvDtjgt59Tm`
- Page node: `1095:3913`
- Key section nodes: Presentation `1095:3514`, Chiffres-clés `1095:3521`, Production-auto `1095:3538`, Production-manuelle `1095:3562`, Nos produits `1095:3578`

---

## Page Sections (8 total)

| # | Section | Background | Key Content |
|---|---------|-----------|-------------|
| 1 | Hero | Ocean gradient | PHF logo centered, sub-nav bar at bottom |
| 2 | Présentation | `gris-clair` | 2-column: subtitle left, body right |
| 3 | Historique | `white` | History text with bold dates |
| 4 | Chiffres-Clés | `white` | 2x2 grid: 15 700 000€, 3200, 60%, 8 |
| 5 | Production Auto | `bleu-abysse` | Image left + 4 stats right (900KG, 1.2T, 800KG, 720) |
| 6 | Production Manuelle | `gris-clair` | Stats left + image right (500KG–1500KG + 600KG) |
| 7 | Nos Produits | `white` | 3-col grid, 21 product cards (rounded images) |
| 8 | Contactez-nous | `bleu-abysse` | Contact info + form (turquoise borders) |

Footer already exists via `PageLayout`.

---

## Phase 1 — Types & Data ✅
**Files created:**
- `src/types/filiale.ts` — Interfaces: `FilialeHeroData`, `FilialePresentationData`, `FilialeHistoryData`, `FilialeKeyFiguresData`, `FilialeStatItem`, `FilialeProductionGroup`, `FilialeProductItem`, `FilialeContactData`
- `src/data/phb.ts` — All section data with image imports, exact text from Figma

**Pattern:** Follows `src/types/home.ts` + `src/data/home.ts` conventions.

## Phase 2 — Assets ✅
**Directory:** `src/assets/images/filiales/phb/`

Downloaded 25 images from Figma MCP asset URLs:
- `hero-bg.png` — Hero background (ocean/fish)
- `logo-phb.png` — PHF logo
- `production-auto.png` — Automated production photo
- `production-manuelle.png` — Manual production photo
- `produits/` — 21 product images (dos-lieux-noirs, filets-grondins, coquilles-saint-jacques, etc.)

## Phase 3 — Hero Section ✅
**File:** `src/components/sections/filiales/phb/PhbHeroSection.astro`

- Full-width hero, 553px height on desktop
- Ocean background with gradient overlay (`from-brume-alize/60 to-[#2e383a]/80`)
- Centered PHF logo
- Bottom sub-nav bar with anchor links: Présentation, Historique, Chiffres-clés, Production, Nos produits
- Sub-nav: `backdrop-blur-[8.75px] bg-[rgba(0,59,82,0.36)]`

## Phase 4 — Présentation & Historique ✅
**Files:**
- `PhbPresentationSection.astro` — `bg-gris-clair`, SectionHeading + 2-column text layout
- `PhbHistorySection.astro` — `bg-white`, SectionHeading + paragraphs with bold dates

Both use `SectionHeading`, `Container`, and `data-anim="1"` for scroll animations.

## Phase 5 — Chiffres-Clés ✅
**File:** `PhbKeyFiguresSection.astro`

- 2-column grid of 4 stats
- Each stat: Zalando Sans value + Inter description + separator line
- Stats: `15 700 000€` (CA 2025), `3200` (tonnes), `60%` (criée), `8` (bateaux)
- `data-stat-line` attributes for line animation

## Phase 6 — Production ✅
**File:** `PhbProductionSection.astro`

Two sub-sections in one component:
1. **Production automatisée** (`bg-bleu-abysse`): image left, stats right (white text)
   - Stats grouped by category (Découpe, Écorchage, Emballage) with " — " separator in data
2. **Production manuelle** (`bg-gris-clair`): stats left, image right (reversed layout)
   - Filetage/écorchage stats + Décorticage Saint-Jacques

## Phase 7 — Nos Produits ✅
**File:** `PhbProductsSection.astro`

- Centered SectionHeading
- 3-col grid (`lg:gap-x-[55px] lg:gap-y-[33px]`)
- 21 product cards: `rounded-[15px]` image (229px) + Montserrat Bold title
- CTA button: `pill-primary` → `/produits`

## Phase 8 — Contact ✅
**File:** `PhbContactSection.astro`

- `bg-bleu-abysse`, light SectionHeading
- Left: phone + address info
- Right: 6-field form (nom, prénom, email, téléphone, message) with turquoise borders
- Submit button: `primary` variant "Envoyer"

## Phase 9 — Page Assembly & Animations ✅
**Files:**
- `src/pages/filiales/phb.astro` — Imports all sections, wraps in `PageLayout`
- `src/scripts/phbPage.js` — Scroll-triggered animations using `animation.js` utilities

Animation script:
- Initializes `APPEAR_Z` animations on `[data-anim="1"]` elements
- Stat line scale animations on `[data-stat-line]` elements
- Runs `createScrollTimeline` for each section
- Re-initializes on `astro:after-swap` for view transitions

---

## Files Summary

```
src/
├── types/filiale.ts                          (NEW)
├── data/phb.ts                               (NEW)
├── assets/images/filiales/phb/
│   ├── hero-bg.png                           (NEW)
│   ├── logo-phb.png                          (NEW)
│   ├── production-auto.png                   (NEW)
│   ├── production-manuelle.png               (NEW)
│   └── produits/ (21 product images)         (NEW)
├── components/sections/filiales/phb/
│   ├── PhbHeroSection.astro                  (NEW)
│   ├── PhbPresentationSection.astro          (NEW)
│   ├── PhbHistorySection.astro               (NEW)
│   ├── PhbKeyFiguresSection.astro            (NEW)
│   ├── PhbProductionSection.astro            (NEW)
│   ├── PhbProductsSection.astro              (NEW)
│   └── PhbContactSection.astro               (NEW)
├── pages/filiales/phb.astro                  (NEW)
└── scripts/phbPage.js                        (NEW)
```

## Reused Existing Components
- `Container` — max-w-[1284px] wrapper
- `SectionHeading` — Zalando Sans titles + Montserrat subtitles
- `SectionWrapper` — consistent section spacing (used as pattern, not always directly)
- `Button` — `outline-dark`, `pill-primary`, `primary` variants
- `PageLayout` — Navbar + Footer wrapper

## Verification
1. Run `npm run dev` → navigate to `/filiales/phb`
2. Compare each section against Figma screenshots
3. Test responsive: mobile (375px) → tablet (768px) → desktop (1440px)
4. Verify scroll animations trigger correctly
5. Verify sub-nav anchor links scroll to correct sections
6. Verify product grid collapses 3→2→1 columns
7. Verify contact form renders on dark background with turquoise borders

## TODO / Open Questions
- [ ] Verify all image downloads are correct (Figma URLs expire in 7 days)
- [ ] Node version issue: build may fail on dev machine (Node 22.9.0 vs required 22.12.0) — use IDE preview instead
- [ ] Product images are large PNGs (~5-10MB each) — may need optimization/compression
- [ ] Sub-nav scroll behavior: should it be sticky? Match expertises page sticky tabs pattern?
- [ ] Contact form: backend handling not implemented (frontend-only for now)
