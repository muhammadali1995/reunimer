# Home Page — Implementation Plan

**Figma source:** [Site-Reunimer / Home-page](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=729-3018&m=dev)
**Figma node:** `729:3018` (frame "Home-page", 1440 × 6214)
**Route:** `/` (index.astro)

---

## Page Structure (top to bottom)

| # | Section | Y range | Key Figma Nodes | Background |
|---|---------|---------|-----------------|------------|
| 1 | Navbar | y=43 | `729:3022` (Header instance) | Already in PageLayout |
| 2 | Hero | 0–860 | `729:3020`, `729:3026` | Dark ocean image (visuel-bateau), REUNIMER wordmark |
| 3 | Groupe | 860–1432 | `729:3037` → visible: `729:16990` | Gris-clair (#F6F6F6) |
| 4 | Expertises | 1432–2334 | `729:3038` → visible: `729:17623`, hover: `729:17019` | White |
| 5 | RSE Engagement | 2334–3086 | `729:3039` → visible: `729:17606` | Gris-clair (#F6F6F6) |
| 6 | Filiales | 3086–3374 | `729:3023`, `729:3041`, `729:3042` | White |
| 7 | Actualités | 3374–4206 | `729:3019` → visible: `729:17694` | Gris-clair (#F6F6F6) |
| 8 | Team / Carrières | 4151–4801 | `729:3040` → visible: `729:17721` | Light gray bg (from screenshot) |
| 9 | Footer | 4801+ | `729:3025` | Already in PageLayout |

---

## Phase 1 — Page Setup & Hero Section

**Goal:** Replace the stub in `index.astro` with proper page structure and build the hero section with the dark ocean background and centered REUNIMER wordmark.

**Tasks:**
- Replace the stub content in `src/pages/index.astro` with proper section structure
- Build hero section: full-width dark ocean background image (h=860px)
- Centered REUNIMER wordmark/logo (node `729:3026`, "Group 15") — white SVG logo, positioned at y≈410, centered horizontally (x≈433, w≈540)
- The hero image (visuel-bateau 1) is 1440×1924, positioned at y=-369, clipped to 860px height — covers the hero with overflow hidden
- No text overlay other than the REUNIMER wordmark

**Figma specs:**
- Hero frame (node `729:3020`): 1440×860, overflow-clip
- Background image (node `729:3021`): "visuel-bateau 1", 1440×1924, positioned at y=-369 (parallax-ready)
- REUNIMER wordmark (node `729:3026`): "Group 15", x=433.5, y=409.77, w=540.5, h=89.45 — white SVG vectors on dark ocean bg
- Navbar (node `729:3022`): already handled by PageLayout, overlaid at y=43

**Assets needed:**
- `hero-home.jpg` — ocean/boat background image (export from Figma node `729:3021`)
- REUNIMER wordmark SVG — check if `reunimer-logo-white.svg` in `src/assets/logos/` is the same; if not, export from node `729:3026`

---

## Phase 2 — Groupe Section

**Goal:** Build the "Les trésors d'aujourd'hui, l'héritage de demain" section with text on the left and three image thumbnails on the right.

**Tasks:**
- Section with gris-clair (#F6F6F6) background, h=572px
- Left side (~39% width):
  - Title: "Les trésors d'aujourd'hui, l'héritage de demain." — Zalando Sans Expanded Black 40px, uppercase, bleu-abysse, line-height 44.5px
  - Description: "Chez Reunimer, nous croyons que la performance durable naît de l'équilibre entre le respect de la nature..." — Montserrat Regular 20px, bleu-abysse, line-height 1.461
  - Button: "Découvrez notre groupe" → href="/groupe" — outline-dark variant, rounded-[3px]
- Right side (~55% width): Three side-by-side image thumbnails
  - All three use the same source image (HOME_GROUPE 2) at different crop positions
  - Image 1: inset `[10.49% 41.53% 18.36% 39.1%]` — shows a fishing boat
  - Image 2: inset `[10.49% 24.51% 18.36% 57.78%]` — shows underwater fish
  - Image 3: inset `[10.49% 6.32% 18.36% 74.93%]` — shows a fisherman
  - Each image is clipped with overflow-hidden
- Title positioned at: top=18.18%, left=8.47%
- Description at: top=53.5%, left=8.61%
- Button at: top=72.38%, left=8.61%

**Figma specs:**
- Background (node `729:16991`): gris-clair #F6F6F6, 1440×572
- Title (node `729:16992`): inset `[18.18% 60.83% 48.25% 8.47%]`, Zalando Sans Expanded Black 40px, uppercase
- Description (node `729:16993`): inset `[53.5% 61.53% 32.69% 8.61%]`, Montserrat Regular 20px
- Button (node `729:16989`): inset `[72.38% 71.88% 18.36% 8.61%]`, border-[#002c41], rounded-[3px], Montserrat SemiBold 12px, tracking-[1.44px], uppercase
- Images (nodes `729:16995`, `729:16997`, `729:16999`): three clipped views of HOME_GROUPE 2 image, each approximately 280×407px

**Assets needed:**
- `home-groupe.jpg` — the HOME_GROUPE 2 composite image (export from Figma, or use three separate crops)

---

## Phase 3 — Expertises Cards Section

**Goal:** Build the "Nos expertises" section with 5 expertise cards in a row. Each card shows an image with a small colored title bar at the bottom. On hover, the colored panel slides up (fade-up from bottom) to reveal description text and a "en savoir plus" button.

**Tasks:**
- Section with white background, h=902px
- Centered title: "Nos expertises" — Zalando Sans Expanded Black 40px, uppercase, bleu-abysse, text-center
- Centered subtitle: "Nos expertises dans la chaîne de valeurs intégrée." — Montserrat Regular 20px, bleu-abysse, text-center
- 5 cards in a row, each ~274px wide × 617px tall (inset area: top=27.16%, bottom=4.55%, 19.03% per card slot)
- **Default state (each card):**
  - Full-height image background (BANC DE THON variants)
  - Small colored bar at very bottom (12.5% height) showing just the title (Montserrat Medium 32px, white)
- **Hover state (fade-up from bottom to top):**
  - Colored panel expands upward to cover ~87.5% of the card
  - Background color per card: Pêche=#A34C26, Production=#2D7890, Distribution=#AC8652, Supports=#587682, RH=#6EAEB5
  - Content inside panel (flex-col, gap-48px, px-25px, py-15px):
    - Title: Montserrat Medium 32px, white
    - Separator: thin white horizontal line (1px)
    - Description: Montserrat Regular 20px, white
    - Button: "EN SAVOIR PLUS" — outline-light (white border), Montserrat SemiBold 12px, tracking-[1.44px], uppercase
  - CSS transition: transform translateY with 300ms ease

**Card data:**

| Card | Color | Title | Description |
|------|-------|-------|-------------|
| 1 | terre-laterite (#A34C26) | Pêche | Une force maritime responsable pour l'excellence à la source. |
| 2 | lagon-mayotte (#2D7890) | Production | Valoriser chaque ressource sans compromis. |
| 3 | sable-corail (#AC8652) | Distribution | Un engagement de proximité et de performance. |
| 4 | nuit-australe (#587682) | Supports | La force invisible au service de l'excellence. |
| 5 | ecume-poudree (#6EAEB5) | RH | Un engagement humain porteur d'avenir |

**Figma specs:**
- Title (node `729:17625`): inset `[9.76% 34.44% 85.25% 34.51%]`, centered
- Subtitle (node `729:17626`): inset `[15.96% 32.85% 80.82% 32.78%]`, centered
- Cards container (node `729:17627`): inset `[27.16% 2.43% 4.55% 2.43%]`
- Each card: overflow-clip, ~274×617px
- Default: colored bar at `inset [87.5% 0 -87.5% 0]` (only bottom 12.5% visible)
- Hover (node `729:17019`): full colored panel, bg per card color, flex-col gap-[48px], px-[25px] py-[15px]
- Card images: BANC DE THON variants (different fish/ocean images per card)
- Separator line: 1px white line within card panel

**Assets needed:**
- 5 card background images (one per expertise) — export from Figma nodes
- Chevron-right-white SVG for button arrow (may already exist in `src/assets/icons/`)

---

## Phase 4 — RSE Engagement Section

**Goal:** Build the "Un engagement humain et environnemental porteur d'avenir" section with a person-silhouette collage image on the left and text/CTA on the right.

**Tasks:**
- Section with gris-clair (#F6F6F6) background, h=752px
- Left side (~35% width): Person silhouette collage image (RH 1)
  - Image positioned at left=5.06%, right=60.66%, top=29px
  - Aspect ratio ~2804/4096, clipped to the section height
  - This is a photo collage shaped like a person's head/torso silhouette
- Right side (~50% width):
  - Title: "Un engagement humain et environnemental porteur d'avenir" — Zalando Sans Expanded Black 40px, uppercase, bleu-abysse, line-height 44.5px
  - Positioned at: inset `[31.38% 7.27% 50.4% 42.11%]`
  - Description: "Chez Reunimer, nous croyons que la performance durable naît de l'équilibre entre le respect de la nature et l'épanouissement des hommes..." — Montserrat Regular 20px, bleu-abysse, line-height 1.461
  - Positioned at: inset `[53.59% 20.29% 24.34% 42.11%]`
  - Button: "Découvrez notre engagement" → href="/engagements" — outline-dark variant, rounded-[3px]
  - Positioned at: inset `[71.68% 35.6% 21.28% 42.11%]`

**Figma specs:**
- Background (node `729:17607`): gris-clair #F6F6F6
- Silhouette image (node `729:17611`): "RH 1", left=5.06%, right=60.66%, top=29px
- Title (node `729:17608`): Zalando Sans Expanded Black 40px, uppercase, #002C41
- Description (node `729:17609`): Montserrat Regular 20px, #002C41
- Button (node `729:17610`): border-[#002c41], rounded-[3px], Montserrat SemiBold 12px, tracking-[1.44px]

**Assets needed:**
- `home-rse-silhouette.png` — the person silhouette collage image (export from Figma node `729:17611`)

---

## Phase 5 — Filiales Section

**Goal:** Build the "Nos filiales" section with title, subsidiary logo carousel, and CTA button.

**Tasks:**
- Compact section between RSE and Actualités (y=3086–3374, ~288px tall)
- White background
- Title: "NOs filiales" (node `729:3023`) — Zalando Sans Expanded Black 40px(?), uppercase, bleu-abysse, positioned at x=121, y=3147 (relative to page)
- Logo carousel (node `729:3041`): positioned at x=568, y=3128, w=776, h=122
  - Horizontal scrolling/infinite carousel of subsidiary logos
  - Logos with gap-[66px] between them:
    1. **msf** (MadagascarSeaFood) — h≈64, w=110
    2. **PHF** — h≈52, w≈124
    3. **LD Trading** — h≈73, w≈113
    4. **Le Pecheur Créole** — h≈98, w≈128
    5. **Réunion Pêche Australe** — h≈87, w≈123
  - Logos are duplicated (10 total) for infinite scroll effect
  - All logos in bleu-abysse (#002C41) color
- Button: "Découvrez nos filiales" (node `729:3042`) — at x=122, y=3216, outline-dark variant

**Figma specs:**
- Title (node `729:3023`): x=121, y=3147, w=427, h=84, Zalando Sans Expanded Black, uppercase, bleu-abysse
- Carousel container (node `729:3041`): x=568, y=3128, w=776, h=122
- Logo row (node `I729:3041;729:17729`): flex, gap-[66px], items-center, extends beyond container (inset right=-98.13% — overflow for infinite scroll)
- Button (node `729:3042`): x=122, y=3216, w=264, h=53

**Assets needed:**
- Subsidiary logos — check if existing logos in `src/assets/logos/` match (norsea.svg, ocean-farmers.svg, pds.svg, pecheur-creole.svg, reunipeche.svg, rpa.svg, stargel.svg)
- May need: msf logo, PHF logo, LD Trading logo — export from Figma if not in codebase

---

## Phase 6 — Actualités Section

**Goal:** Build the "Actualités" section with one large featured article card on the left and three smaller article cards stacked on the right. This section can reuse the existing `ArticleCard` and `Tag` components.

**Tasks:**
- Section with gris-clair (#F6F6F6) background, h=832px
- Top row:
  - Title: "ACTUALITÉS" (node `729:17696`) — Zalando Sans Expanded Black 40px, uppercase, bleu-abysse, top-left at inset `[10.46% 63.96% 78.85% 8.47%]`
  - Button: "Découvrez toutes les actus" → href="/actualites" — outline-dark variant, top-right area at inset `[9.5% 19.58% 84.13% 59.17%]`
- Content area: Two-column layout
  - **Left column — Large featured article** (~50% width):
    - Large image (node `729:17698`): "Grande-Photo-Actu", inset `[22.36% 42.29% 17.79% 8.4%]` (~710×498px)
    - Tag: "EVENTS" — turquoise-ocean (#0A97A6) background, positioned at top-left of image
    - Date: "11 FÉV. 2026" — Inter Medium 12px, brume-alize (#809AA0)
    - Title: "Visite du Chef Thierry Marx" — Montserrat Bold 32px, bleu-abysse
  - **Right column — 3 small stacked articles** (~25% width):
    - Each article: image (left) + text (right) layout
    - Article 1: Tag "GROUPE" (bleu-abysse), "Reunimer en couverture du Leader Magazine", Montserrat Bold 20px
    - Article 2: Tag "PRODUITS" (sable-corail #AC8652), "La langouste pour la St-Valentin", Montserrat Bold 20px
    - Article 3: Tag "GROUPE" (bleu-abysse), "Un engagement durable", Montserrat Bold 20px
    - All dates: "11 FÉV. 2026" — Inter Medium 12px, brume-alize
    - Small article images: ~222×154px each

**Existing components to reuse:**
- `Tag` component — for category badges (bleu-abysse, turquoise-ocean, sable-corail)
- `ArticleCard` component — has `size` (sm/lg) and `layout` (vertical/horizontal) props, could be used for both large and small cards

**Figma specs:**
- Title (node `729:17696`): Zalando Sans Expanded Black 40px, uppercase, #002C41
- Button (node `729:17697`): outline-dark, border-[#002c41], rounded-[3px]
- Large image (node `729:17698`): overflow-clip
- Large article tag (node `729:17699`): bg-[#0a97a6], "EVENTS"
- Small article tags: "GROUPE" bg-[#002c41], "PRODUITS" bg-[#ac8652], "GROUPE" bg-[#002c41]
- Dates (nodes `729:17706`–`729:17709`): Inter Medium 12px, #809AA0
- Large title (node `729:17710`): Montserrat Bold 32px, #002C41
- Small titles (nodes `729:17711`–`729:17713`): Montserrat Bold 20px, #002C41

**Assets needed:**
- 4 article images — these are placeholder/dynamic content; use existing article images from `src/assets/images/actus/` or export from Figma

---

## Phase 7 — Team / Carrières Section

**Goal:** Build the "Rejoignez la team Reunimer" section with a team photo on the left and recruitment text/CTA on the right.

**Tasks:**
- Section with light gray background (from screenshot — slightly darker than white), h=650px
- Left side (~50% width): Team photo
  - Image (node `729:17725`): overflow-clip container at x=77, h≈668, w=643
  - Shows two Reunimer team members (woman and man in navy polo shirts), standing back-to-back
  - Image extends slightly above the section (top=0, overflow hidden)
- Right side (~40% width), starting at x=757:
  - Title: "Rejoignez la team Reunimer" — Zalando Sans Expanded Black 40px, uppercase, bleu-abysse, y=226, w=552px
  - Description: "Chez Reunimer, nous mettons l'humain au centre de la chaîne de valeurs." — Montserrat Regular 20px, bleu-abysse, y=330, w=421px
  - Button: "Découvrez nos offres d'emploi" → href="/carrieres" — outline-dark variant, border-[#002c41] (note: border-2 in some variants), rounded-[3px], y=410

**Figma specs:**
- Title (node `729:17722`): x=757, y=226, w=552, h=93, Zalando Sans Expanded Black 40px, uppercase, #002C41
- Description (node `729:17723`): x=757, y=330, w=421, h=71, Montserrat Regular 20px, #002C41
- Button (node `729:17724`): x=757, y=410, border-[#002c41], rounded-[3px]
- Image container (node `729:17725`): x=77, y=0, w=643, h≈668, overflow-clip
- Image (node `729:17726`): HOME_CARRIERE 1, x=51.68+77, y=12.92, w=573, h=638

**Assets needed:**
- `home-carriere.jpg` — team photo (two employees back-to-back) — export from Figma node `729:17726`

---

## Phase 8 — Responsive Design

**Goal:** Make all sections responsive for tablet and mobile.

**Tasks:**
- **Hero:** Scale REUNIMER wordmark down proportionally, reduce hero height on mobile (~500px), maintain ocean image cover
- **Groupe:** Stack to single column on tablet/mobile (images below text), reduce image count to 2 on tablet, 1 on mobile
- **Expertises:** 5 cards → 3+2 on tablet → horizontal scroll or single column on mobile. Hover effect becomes tap-to-expand on mobile
- **RSE:** Stack to single column (image above text on mobile), maintain silhouette proportions
- **Filiales:** Logo carousel continues scrolling, reduce logo sizes on mobile. Title and button stack vertically
- **Actualités:** Large + 3 small → single column stack on mobile. Large article first, then 3 small articles below
- **Team:** Stack to single column (image above text on mobile)
- Typography: scale down ~10-15% tablet, ~20% mobile (40px→34px→32px for display, 20px→18px→16px for body)
- Min 44px tap targets on mobile
- No horizontal overflow at any breakpoint

---

## Phase 9 — Polish & Final Verification

**Goal:** Final visual comparison, navigation verification, and cleanup.

**Tasks:**
- Verify navbar highlights correctly on the home page (no active highlight or "Groupe" if applicable)
- Ensure all internal links work (`/groupe`, `/expertises`, `/engagements`, `/actualites`, `/carrieres`)
- Cross-check each section against Figma screenshots at 1440px width
- Replace placeholder article content with real data from `src/data/articles.ts` if available
- Check all images load correctly and use Astro `<Image />` component
- Verify smooth transitions on expertise card hover effects
- Ensure logo carousel animation runs smoothly (CSS infinite scroll or JS-based)

---

## Rules

1. **One phase at a time.** Do not start the next phase until the user reviews and approves.
2. **Figma is the source of truth.** Always reference node-ids when extracting values.
3. **Use existing components.** Reuse `Container`, `SectionWrapper`, `SectionHeading`, `Button`, `ArticleCard`, `Tag`, etc.
4. **Design tokens only.** Never hardcode colors or font sizes.
5. **Pixel-perfect at desktop.** Match the exact Figma frame at 1440px.
6. **Responsive is my responsibility.** Figma only provides desktop.
7. **Assets from Figma.** Export images to `src/assets/images/home/`. Use Astro `<Image />`.
8. **No GSAP yet.** CSS transitions only (200-300ms ease) for hover/focus. Expertise card hover uses CSS transform/opacity transition (300ms ease).
9. **TypeScript props.** Interfaces with defaults on every component.
10. **Ask when ambiguous.** Don't guess Figma values.

---

## Existing Assets (potentially reusable)

| Asset | Location | Status |
|-------|----------|--------|
| `reunimer-logo-white.svg` | `src/assets/logos/` | Check if matches hero wordmark |
| `reunimer-wordmark.svg` | `src/assets/logos/` | Check if matches hero wordmark |
| Subsidiary logos (norsea, pecheur-creole, etc.) | `src/assets/logos/` | Check if matches carousel logos |
| `chevron-right-white.svg` | `src/assets/icons/` | For button arrows |
| `chevron-right-dark.svg` | `src/assets/icons/` | For button arrows |
| Article images | `src/data/articles.ts` + `src/assets/images/actus/` | For actualités cards |

## Assets to Export from Figma

| Asset | Source Node | Save To |
|-------|-----------|---------|
| Hero ocean bg | `729:3021` (visuel-bateau 1) | `src/assets/images/home/hero-home.jpg` |
| REUNIMER wordmark (if not in codebase) | `729:3026` (Group 15) | `src/assets/logos/reunimer-wordmark-white.svg` |
| Groupe images (3 thumbnails) | `729:16996` (HOME_GROUPE 2) | `src/assets/images/home/home-groupe.jpg` (single source, 3 crops) |
| Expertise card images (5) | `729:17628–729:17632` child images | `src/assets/images/home/expertise-peche.jpg`, etc. |
| RSE silhouette collage | `729:17611` (RH 1) | `src/assets/images/home/home-rse-silhouette.png` |
| Subsidiary logos (if not in codebase) | `729:3041` children | `src/assets/logos/msf.svg`, `src/assets/logos/phf.svg`, etc. |
| Article images (4) | `729:17698`, `729:17701–729:17703` children | `src/assets/images/home/actu-*.jpg` |
| Team photo | `729:17726` (HOME_CARRIERE 1) | `src/assets/images/home/home-carriere.jpg` |

---

## Figma Node Reference (Summary)

```
729:3018 — Home-page (full page frame, 1440 × 6214)
├── 729:3020 — Hero frame (y=0, h=860)
│   └── 729:3021 — visuel-bateau 1 (ocean bg, 1440×1924, y=-369)
├── 729:3026 — Group 15 (REUNIMER wordmark, y=410, w=540.5)
├── 729:3022 — Header (Navbar instance, y=43)
│
├── GROUPE SECTION (y=860–1432)
│   └── 729:3037 — encart-Accueil-Groupe (instance)
│       ├── Default: 729:16979 (opacity-0, animation start state)
│       └── Visible: 729:16990 (Variante2)
│           ├── 729:16991 — gris-clair bg
│           ├── 729:16992 — Title "Les trésors d'aujourd'hui..."
│           ├── 729:16993 — Description text
│           ├── 729:16989 — Button "Découvrez notre groupe"
│           └── 729:16995/997/999 — Three image thumbnails (HOME_GROUPE 2)
│
├── EXPERTISES SECTION (y=1432–2334)
│   └── 729:3038 — Encart-Accueil-Expertises (instance)
│       ├── Default: 729:17613 (cards at opacity-0)
│       ├── Visible: 729:17623 (Variante2, first card visible)
│       └── Hover: 729:17019 (card hover state, colored panel expanded)
│           ├── 729:17625 — Title "Nos expertises"
│           ├── 729:17626 — Subtitle "Nos expertises dans la chaîne..."
│           └── 729:17627 — Cards container
│               ├── 729:17628 — Pêche card (terre-laterite #A34C26)
│               ├── 729:17629 — Production card (lagon-mayotte #2D7890)
│               ├── 729:17630 — Distribution card (sable-corail #AC8652)
│               ├── 729:17631 — Supports card (nuit-australe #587682)
│               └── 729:17632 — RH card (ecume-poudree #6EAEB5)
│
├── RSE SECTION (y=2334–3086)
│   └── 729:3039 — Encart-accueil-RSE (instance)
│       └── Visible: 729:17606 (Variante2)
│           ├── 729:17607 — gris-clair bg
│           ├── 729:17608 — Title "Un engagement humain..."
│           ├── 729:17609 — Description text
│           ├── 729:17610 — Button "Découvrez notre engagement"
│           └── 729:17611 — RH 1 (silhouette collage image)
│
├── FILIALES SECTION (y=3086–3374)
│   ├── 729:3023 — Title "NOs filiales" (x=121, y=3147)
│   ├── 729:3041 — carrousel-logos (x=568, y=3128, w=776, h=122)
│   │   └── Logos: msf, PHF, LD Trading, Le Pecheur Créole, Réunion Pêche Australe (×2 for infinite scroll)
│   └── 729:3042 — Button "Découvrez nos filiales" (x=122, y=3216)
│
├── ACTUALITÉS SECTION (y=3374–4206)
│   └── 729:3019 — Encart-Accueil-Actus (instance)
│       └── Visible: 729:17694 (Variante2)
│           ├── 729:17695 — gris-clair bg
│           ├── 729:17696 — Title "ACTUALITÉS"
│           ├── 729:17697 — Button "Découvrez toutes les actus"
│           ├── 729:17698 — Grande-Photo-Actu (large article image)
│           ├── 729:17699 — Tag "EVENTS" (turquoise-ocean)
│           ├── 729:17700 — Tag "GROUPE" (bleu-abysse)
│           ├── 729:17701 — Petite-photo-actu 1
│           ├── 729:17702 — Petite-photo-actu 2
│           ├── 729:17703 — Petite-photo-actu 3
│           ├── 729:17704 — Tag "PRODUITS" (sable-corail)
│           ├── 729:17705 — Tag "GROUPE" (bleu-abysse)
│           ├── 729:17706–709 — Dates (Inter Medium 12px, brume-alize)
│           ├── 729:17710 — Large title "Visite du Chef Thierry Marx"
│           └── 729:17711–713 — Small titles
│
├── TEAM SECTION (y=4151–4801)
│   └── 729:3040 — Encart-Accueil-Team (instance)
│       └── Visible: 729:17721 (Variante2)
│           ├── 729:17722 — Title "Rejoignez la team Reunimer"
│           ├── 729:17723 — Description text
│           ├── 729:17724 — Button "Découvrez nos offres d'emploi"
│           └── 729:17725 — Team photo (HOME_CARRIERE 1)
│
└── 729:3025 — Footer (handled by PageLayout)
```
