# Produits Page — Implementation Plan

**Figma source:** [Site-Reunimer / Produits](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=729-16652&m=dev)
**Figma node:** `729:16652` (frame "Produits", 1440 × 6273)

---

## Page Structure (top to bottom)

| # | Section | Figma Node | Height | Background |
|---|---------|-----------|--------|------------|
| 1 | Hero (photo + intro text) | `729:16699` | 1441px | Image → white gradient |
| 2 | Product catalogue (9 cards) | Multiple `729:166xx` | ~3193px | White (cards have images) |
| 3 | CTA button | `729:16706` | 51px | White bg section |
| 4 | Footer | `729:16653` | 1413px | Already in PageLayout |

---

## Phase 1 — Page Setup & Hero Section

**Goal:** Create `src/pages/produits.astro` with PageLayout + the full hero section including intro text and scroll arrow.

**Tasks:**
- Create `src/pages/produits.astro` using `PageLayout` (title, description)
- Build hero: full-width background image (woman eating at restaurant), ~1100px visible photo area
- Hero text overlay: "L'INSPIRATION QUI A DU GOÛT" — Zalando Sans Expanded Black 64px, white, uppercase
  - Text shadow: `0px 4px 16.2px rgba(0,0,0,0.51)`
  - Positioned center-right, at roughly y=320px from top of hero frame
  - Two lines: "L'INSPIRATION" / "QUI A DU GOÛT"
- Below the photo (white background area within same section):
  - Title: "DÉCOUVREZ NOTRE OFFRE" — Zalando Sans Expanded Black 40px, bleu-abysse, centered
  - Description: Montserrat Regular 20px, bleu-abysse, centered, max-width 589px
    - "Issus exclusivement de nos propres filiales, nos produits garantissent une traçabilité totale."
    - "Voici l'offre de Reunimer avec le meilleur de l'Océan Indien et de la Manche. Directement de la mer à votre assiette."
  - Down arrow/chevron: turquoise-ocean colored, 40×18px, centered, links to product catalogue
- Hero is below the fixed navbar (PageLayout already handles the 92px spacer)
- Use `-mt-[92px]` to overlap the navbar like other pages do
- Export hero image from Figma (node `729:16700`) → `src/assets/images/produits/hero-produits.jpg`

**Figma specs (node `729:16699`):**
- Full frame: 1440 × 1441px
- Image: covers top ~1100px, image is flipped horizontally (CSS: `scale-x-[-1]`)
- "L'INSPIRATION QUI A DU GOÛT": x=651, y=320, w=637, h=63, font-size 64px, line-height 67px
- "DÉCOUVREZ NOTRE OFFRE": centered, y=1142, w=751, font-size 40px, line-height 44.5px
- Description: centered, y=1229, w=589, font-size 20px, line-height 1.461
- Arrow: centered, y=1391, w=40, h=18, turquoise-ocean color

**Responsive:**
- Tablet: reduce hero height, scale title to ~48px, description to ~18px
- Mobile: hero ~300px height, title ~32px, stacked layout, description ~16px full-width

---

## Phase 2 — Product Card Component + First 3 Cards

**Goal:** Build a reusable `ProductCard` component and render the first 3 product cards.

**Tasks:**

### 2a — ProductCard Component (`src/components/ui/ProductCard.astro`)
- Props: `name` (string), `origin` (string), `imageSrc` (ImageMetadata), `imageAlt` (string), `bgColor` (string, fallback bg color)
- Card dimensions: ~1082px wide, ~327px tall at desktop
- Border radius: `rounded-[45px]`
- Background: fallback color (#DACBB4 warm neutral) + product image covering the card
- Image: `object-cover`, fills entire card
- Text overlay (bottom-left area):
  - Product name: Montserrat Medium ~35px, white, positioned at x=39, y=108
  - Origin: Montserrat Bold ~23px, white, below name
- Hover state: subtle overlay + "CONTACTEZ-NOUS POUR EN SAVOIR PLUS" pill button appears
  - Pill button: white bg, rounded-[47px], px-[22px] py-[18px], Montserrat SemiBold 12px, bleu-abysse, tracking-[1.44px], uppercase + chevron arrow
  - Appears at bottom-left of card on hover with opacity transition

### 2b — First 3 Product Cards
- Product catalogue section: white background, centered content
- Cards container: max-width ~1082px, centered, flex-col, gap ~32px
- First cards start ~27px below the hero section

Products to add:
1. **Poissons pélagiques** — de l'Océan Indien (node `729:16654`, image node `729:16656`)
2. **Langouste** — de Madagascar (node `729:16659`, image node `729:16661`)
3. **Crabe** — de Madagascar (node `729:16694`, image node `729:16696`)

- Export product images from Figma → `src/assets/images/produits/`
  - `poissons-pelagiques.jpg`
  - `langouste-madagascar.jpg`
  - `crabe-madagascar.jpg`

**Responsive:**
- Tablet: cards scale to 100% container width, reduce border-radius to ~30px, text ~28px/~18px
- Mobile: cards ~100% width, reduce height to ~220px, border-radius ~20px, text ~22px/~16px

---

## Phase 3 — Remaining 6 Product Cards

**Goal:** Add the remaining 6 product cards with their images.

**Tasks:**
- Export remaining 6 product images from Figma → `src/assets/images/produits/`
- Add cards in order:

4. **Seiche** — de Boulogne-sur-Mer (node `729:16689`, image node `729:16691`)
   → `seiche-boulogne.jpg`
5. **Sardine** — de Boulogne-sur-Mer (node `729:16684`, image node `729:16686`)
   → `sardine-boulogne.jpg`
6. **Poulpe** — de Madagascar (node `729:16679`, image node `729:16681`)
   → `poulpe-madagascar.jpg`
7. **Légine** — des TAAF (node `729:16664`, image node `729:16666`)
   → `legine-taaf.jpg`
8. **Poissons démersaux** — de Madagascar (node `729:16669`, image node `729:16671`)
   → `poissons-demersaux.jpg`
9. **Produits traiteur** — de l'Île de la Réunion (node `729:16674`, image node `729:16676`)
   → `produits-traiteur.jpg`

- Verify all cards match Figma spacing and alignment
- Ensure consistent styling across all 9 cards

---

## Phase 4 — CTA Button + Final Polish

**Goal:** Add the CTA button below the catalogue and polish the page.

**Tasks:**

### 4a — CTA Button
- Centered below the product catalogue, with spacing (~100px gap from last card)
- Style: bg turquoise-ocean, rounded-[47px] (pill), px-[22px] py-[18px]
- Text: "CONTACTEZ-NOUS POUR EN SAVOIR PLUS" — Montserrat SemiBold 12px, white, tracking-[1.44px], uppercase
- Chevron arrow icon (white, same as Button component arrow)
- Links to footer contact section (`#footer-contact-heading` or similar anchor)
- Hover: opacity transition (same pattern as Button component)
- Bottom padding below CTA: ~130px before footer starts

### 4b — Final Polish
- Verify Navbar "Produits" link points to `/produits` and highlights correctly
- Verify Footer "Produits" link works
- Check all spacings match Figma at 1440px
- Ensure smooth scroll from down-arrow to catalogue section
- Verify all product images render correctly with Astro `<Image />`
- Clean up any temporary code or comments

---

## Phase 5 — Responsive Design Pass

**Goal:** Ensure all sections look great on tablet (768–1024px) and mobile (375–767px).

**Tasks:**
- **Hero image:** Scale height proportionally, adjust `object-position` for good cropping
- **Hero text:** Scale "L'INSPIRATION..." from 64px → ~40px (tablet) → ~28px (mobile), adjust positioning
- **Intro section:** Reduce padding, scale title/description font sizes, full-width description on mobile
- **Product cards:**
  - Tablet: reduce card height to ~260px, border-radius to ~30px
  - Mobile: reduce card height to ~200px, border-radius to ~20px, text sizes proportionally smaller
  - Ensure images remain well-cropped and centered
  - Hover CTA may need to be always-visible on touch devices or triggered by tap
- **CTA button:** Ensure adequate tap target (min 44px), responsive padding
- **General checks:**
  - Test at 375px, 768px, 1024px, and 1440px breakpoints
  - Verify no horizontal overflow at any width
  - Ensure text readability and proper spacing at all sizes
  - All images maintain aspect ratio and coverage

---

## Rules

1. **One phase at a time.** Do not start the next phase until the user reviews and approves the current phase.
2. **Figma is the source of truth.** Always reference node-ids when extracting values. Use `get_design_context` and `get_screenshot` for each section.
3. **Use existing components.** Always check `src/components/ui/` before building anything new. Use `Container`, `SectionWrapper`, `SectionHeading`, `Button`, etc.
4. **Design tokens only.** Never hardcode colors or font sizes. Always reference Tailwind config values and CSS custom properties from `tokens.css`.
5. **Pixel-perfect at desktop.** Match the exact Figma frame at 1440px width — spacings, paddings, gaps, font sizes.
6. **Responsive is my responsibility.** Figma only provides desktop. I will create tablet (768–1024px) and mobile (375–767px) layouts following the patterns in CLAUDE.md.
7. **Assets from Figma.** Export images from Figma and save to `src/assets/images/produits/`. Use Astro `<Image />` component — never raw `<img>` tags.
8. **No GSAP yet.** Animations are added in a separate pass after all sections are built. Use CSS transitions (200–300ms ease) for hover/focus states only.
9. **TypeScript props.** All components get proper TypeScript interfaces with defaults.
10. **Ask when ambiguous.** If Figma values are unclear or conflicting, ask the user before guessing.

---

## Assets Needed

| Asset | Source Node | Save To |
|-------|-----------|---------|
| Hero photo (woman eating) | `729:16700` | `src/assets/images/produits/hero-produits.jpg` |
| Poissons pélagiques | `729:16656` | `src/assets/images/produits/poissons-pelagiques.jpg` |
| Langouste | `729:16661` | `src/assets/images/produits/langouste-madagascar.jpg` |
| Crabe | `729:16696` | `src/assets/images/produits/crabe-madagascar.jpg` |
| Seiche | `729:16691` | `src/assets/images/produits/seiche-boulogne.jpg` |
| Sardine | `729:16686` | `src/assets/images/produits/sardine-boulogne.jpg` |
| Poulpe | `729:16681` | `src/assets/images/produits/poulpe-madagascar.jpg` |
| Légine | `729:16666` | `src/assets/images/produits/legine-taaf.jpg` |
| Poissons démersaux | `729:16671` | `src/assets/images/produits/poissons-demersaux.jpg` |
| Produits traiteur | `729:16676` | `src/assets/images/produits/produits-traiteur.jpg` |
| Down arrow chevron | `729:16701` | SVG inline (turquoise-ocean) |

---

## Figma Node Reference

```
729:16652  — Produits (full page frame, 1440 × 6273)
├── 729:16699  — Frame 122 (Hero + intro, 1440 × 1441)
│   ├── 729:16700 — COUV_PRODUITS 2 (hero background image)
│   ├── 729:16704 — "L'INSPIRATION QUI A DU GOÛT" (hero title, 64px)
│   ├── 729:16703 — "Découvrez notre offre" (section title, 40px)
│   ├── 729:16702 — Description text (20px)
│   └── 729:16701 — Vector 1 (down arrow, turquoise)
├── 729:16654  — Frame 118 (Poissons pélagiques, 1082 × 327)
│   ├── 729:16656 — Product image
│   ├── 729:16657 — "Poissons pélagiques / de l'Océan Indien"
│   └── 729:16658 — survol-produits-2 (hover state)
├── 729:16659  — Frame 123 (Langouste, 1082 × 327)
├── 729:16694  — Frame 132 (Crabe, 1082 × 326)
├── 729:16689  — Frame 131 (Seiche, 1082 × 326)
├── 729:16684  — Frame 130 (Sardine, 1082 × 327)
├── 729:16679  — Frame 129 (Poulpe, 1082 × 326)
├── 729:16664  — Frame 128 (Légine, 1082 × 326)
├── 729:16669  — Frame 133 (Poissons démersaux, 1082 × 327)
├── 729:16674  — Frame 134 (Produits traiteur, 1082 × 327)
├── 729:16706  — CTA-produits-3 (turquoise pill button, 379 × 51)
├── 729:16705  — Header (navbar, handled by PageLayout)
└── 729:16653  — Footer (handled by PageLayout)
```
