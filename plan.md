# Expertises Page — Implementation Plan

**Figma source:** [Site-Reunimer / Expertise](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=729-16024&m=dev)
**Figma node:** `729:16024` (frame "Expertise", 1440 × ~14528)
**Route:** `/expertises`

---

## Page Structure (top to bottom)

| # | Section | Y range | Key Figma Nodes | Background |
|---|---------|---------|-----------------|------------|
| 1 | Navbar | top | — | Already in PageLayout |
| 2 | Hero | 0–700 | `729:16034`, `729:16040` | Dark ocean image (Gemini_Generated_Image), overlay |
| 3 | Pêche Expertise | 700–2800 | `729:16035`–`729:16063` | Banc de thon image, dark overlay |
| 4 | Certifications | 2800–3800 | `729:16065`–`729:16171` | Image bg + certification logos |
| 5 | Transformation | 3800–6400 | `729:16033`, `729:16174`, `729:16194`–`729:16204` | Gradient white→#ccc, product images |
| 6 | Quality & Safety | 6400–7500 | `729:16236`–`729:16265` | Light bg, stats, zero-déchet |
| 7 | Distribution | 7500–10200 | `729:16031`–`729:16032`, `729:16272`–`729:16288` | Magazine imagery → dark bg → 3 cards |
| 8 | Logistique & Supports | 10200–11900 | `729:16025`–`729:16029`, `729:16175`, `729:16289` | Dark bg, support imagery |
| 9 | RSE & RH | 11900–13115 | `729:16176`–`729:16192` | Background image, stats percentages |
| 10 | Footer | 13115+ | — | Already in PageLayout |

---

## Phase 1 — Page Setup & Hero Section

**Goal:** Set up the expertises page with `PageLayout` and build the hero section with the "noS expertiseS" title overlay on a dark ocean background image.

**Tasks:**
- Replace the stub content in `src/pages/expertises.astro` with proper page structure
- Build hero section: full-width dark ocean image background (h=~700px)
- Title "noS expertiseS" — Zalando Sans Expanded Black 40px, uppercase, white, positioned left side at y=250
- The hero image covers the full width, extends from top to ~2560px (parallax-ready)
- Content area positioned using Container for proper centering

**Figma specs:**
- Hero bg image (node 729:16034): `Gemini_Generated_Image_gvt8gigvt8gigvt8 1`, 1440×2560, extends from y=-2 to y=2558
- Title (node 729:16040): x=calc(29.17%-198px), y=250, Zalando Sans Expanded Black 40px, uppercase, white
- Overall page bg: white

**Assets needed:**
- `hero-expertises.jpg` — already exists in `src/assets/images/expertise/`

---

## Phase 2 — Pêche Expertise Section

**Goal:** Build the fishing expertise section with intro text, location-based statistics (La Réunion, Boulogne-sur-Mer, Madagascar), and subsection titles.

**Tasks:**
- Dark background section with tuna school image overlay (y=715, 2658px tall)
- Intro paragraph: "Reunimer maîtrise l'amont pour sécuriser l'aval..." — Montserrat Regular 20px, white, w=701px, at left=calc(41.67%+8px), y=1185
- Subsection title: "Une puissance de pêche hauturière et australe" — Montserrat SemiBold 20px, white
- **Stats component (BarreChiffres pattern):** number + description rows separated by thin white lines
  - **La Réunion** (y=1450): 17 longliners, 1 palangrier 68m, 130 marins pêcheurs, 1800 tonnes
  - Stats split into two columns: left col w=326px, right col w=328px at calc(66.67%+30px)
- Subsection title: "Un modèle de collecte artisanale et de mareyage" — same style
- **Boulogne-sur-Mer** (y=2084): 23 années d'expertise, XX bateaux, XX tonnes
- **Madagascar** stats below
- "Reunimer sur le marché de la pêche à la légine dans les TAAF" — Montserrat SemiBold 20px

**Figma specs:**
- Background: node `729:16035` (BANC DE THON 1), y=715, 1440×2658
- Stats numbers: Zalando Sans Expanded Black 40px, uppercase
- Stats descriptions: Inter Regular 16px, text-right, w=181px
- Location headers: Inter Bold 16px
- Separator lines: thin white horizontal lines (1px)

**Assets needed:**
- `peche-thon.jpg` — already exists in `src/assets/images/expertise/`

---

## Phase 3 — Certifications Section

**Goal:** Build the "Une exigence de durabilité certifiée" section with certification logos and timeline.

**Tasks:**
- Background image section (node 729:16028): y=2802, 1440×439
- Title: "Une exigence de durabilité certifiée" — positioned prominently
- Description paragraph: "Notre stratégie repose sur la sélectivité des espèces..."
- Certification timeline with logos and dates:
  - Espadon (2016)
  - Légine (2025)
  - Thon Germon (2026)
  - Légine (2022) — different certification
  - Grenadier (2025)
- Certification logos: Eurofins, ISO 50001, Ecolabel, etc.

**Figma specs:**
- Title (node 729:16065/729:16066): "Une exigence de durabilité certifiée"
- Description (node 729:16068): Montserrat Regular, bleu-abysse or white
- Certification entries at y=2950–3215 area
- Logo images: Eurofins, ISO 50001, Ecolabel, Téléchargement

**Assets needed:**
- Background image for certifications section
- Certification logos (Eurofins, ISO, Ecolabel) — export from Figma nodes

---

## Phase 4 — Transformation Section

**Goal:** Build the "Une production experte" section with production facilities, statistics, and product imagery.

**Tasks:**
- Gradient background from white to #ccc (y=3796, 1605px tall)
- Section title: "Une production experte" — Zalando Sans Expanded Black 40px, text-[#2d7890] (lagon-mayotte), centered
- Production description: "Spécialisées dans le gradage et la découpe de précision..."
- Two sub-areas:
  - "unités de première transformation" (y=4308) with imagery
  - "atelier de seconde transformation" (y=5560) with description
- Product images: Transformation 1, Transformation 2, Smoke (fish smoking imagery)
- Statistics per location:
  - **À la Réunion**: 1800 tonnes traités, XX transformés, 40 professionnels
  - **À Boulogne-sur-Mer**: XX tonnes traités, XX transformés, 40 emplois
  - **À Madagascar**: XX tonnes traités, XX transformés, XX emplois
- Test stats: 550 test Eurofins*, 4210 test autocontrôle*

**Figma specs:**
- Title (node 729:16174): centered, text-[#2d7890], y=3812
- Description (node 729:16194/729:16195): y=4016–4344
- Image nodes: TRANSFORMATION 1, TRANSFORMATION 2, SMOKE, Frame 6
- Stats: Zalando Sans 40px numbers + Inter 16px descriptions
- Location headers: Inter Bold 16px

**Assets needed:**
- Transformation product images (export from Figma)
- Smoke/fumaison image

---

## Phase 5 — Quality & Safety Section

**Goal:** Build the "Sécurité et excellence" and "Vers le zéro déchet" sections.

**Tasks:**
- Title: "Sécurité et excellence : nos engagements clés" (node 729:16236/729:16204)
- Three engagement columns:
  - "Standards de classe mondiale" (node 729:16239/729:16240)
  - "Contrôle permanent" (node 729:16241)
  - "Innovation & RSE" (node 729:16242)
- Subtitle: "Un outil industriel agile et complémentaire" (node 729:16270)
- Separator line at y=6476
- "Vers le «zéro déchet»" section (node 729:16244): paragraph about circular economy and co-product valorization
- Footnote: "*Pour tout le groupe Reunimer en moyenne dans l'année." (node 729:16243)

**Figma specs:**
- Section title: centered, Zalando Sans Expanded
- Columns: side-by-side layout
- Text: Montserrat / Inter, white or dark depending on bg
- Separator: horizontal line (node 729:16271 area)

---

## Phase 6 — Distribution Section

**Goal:** Build the "Une distribution maîtrisée" section with magazine imagery and 3 distribution cards.

**Tasks:**
- Magazine/publication spread imagery:
  - RUNIMER_COUVERTURE_JANV26 (two large magazine cover images)
  - Shadow effect: `shadow-[28px_34px_31.7px_0px_rgba(0,0,0,0.41)]`
- Title: "Une distribution maîtrisée" — Zalando Sans Expanded Black 40px, text-[#ac8652] (sable-corail), centered, y=8301
- Description: "Pour Reunimer, une filière responsable commence..." — Montserrat Regular 20px, centered, white, w=790px
- Dark background (#02070a) at y=8654, 605px tall
- Three distribution cards at y=8692 (rounded-[10px], w=345px each, h=351px):
  - **Approvisionnement** (DISTRI 3B image): "Une origine garantie et une traçabilité totale."
  - **Expertise** (DISTRI 2 image): "Un conseil métier pour chaque typologie de client."
  - **Service** (DISTRI 1 image): "Une réactivité logistique et commerciale exemplaire."
- Each card: rounded image on top + sable-corail (#ac8652) colored bar at bottom (156px)
- Card titles: Montserrat SemiBold 20px, white, centered
- Card descriptions: Inter Regular 16px, white, centered

**Figma specs:**
- Title (node 729:16272): centered, text-[#ac8652], y=8301
- Description (node 729:16273): centered, text-white, y=8376, w=790px
- Cards: nodes 729:16274, 729:16279, 729:16284 — each 345×351, rounded-[10px]
- Card titles: nodes 729:16277, 729:16282, 729:16287
- Card descriptions: nodes 729:16278, 729:16283, 729:16288
- Background: nodes 729:16030 (dark bg)

**Assets needed:**
- Magazine cover images (RUNIMER_COUVERTURE)
- Distribution card images (DISTRI 1, DISTRI 2, DISTRI 3B)

---

## Phase 7 — Logistique & Supports Section

**Goal:** Build the "LOGISTIQUE & SUPPORTS : LA FORCE INVISIBLE" section with dark background and support imagery.

**Tasks:**
- Dark section with background image (EXPERTISE_SUPPORT 1, y=10212, 1691px tall)
- Black overlay on top of the background
- Title: "LOGISTIQUE & SUPPORTS :" / "LA FORCE INVISIBLE" — Zalando Sans Expanded Black 40px, white, uppercase, y=10851
- Description paragraph: "Grâce à une précision d'intervention rigoureuse et une expertise en maintenance intégrée..." — Inter Regular 16px, white, w=382px, y=11244
- Support imagery (SUPPORT 2 background, y=10213)

**Figma specs:**
- Background container (node 729:16025): y=10212, h=1691, overflow-clip
- Black bg (node 729:16026): full coverage
- Support image (node 729:16027): EXPERTISE_SUPPORT 1, extends beyond boundaries
- Title (node 729:16175): x=calc(25%-10px), y=10851, w=709px
- Description (node 729:16289): x=calc(25%-9px), y=11244, w=382px

**Assets needed:**
- Support/logistique background image (export from Figma)

---

## Phase 8 — RSE & RH Section

**Goal:** Build the "La même chance pour tous" RH section with stats and HR policy text.

**Tasks:**
- Background image section (node 729:16176): y=11903, h=1212
- Title: "La même chance pour tous" — positioned prominently
- "NOTRE POLITIQUE RESSOURCES HUMAINES" — subtitle
- "Petit texte d'introduction sur la politique RH." — intro text
- HR description: "Le Groupe cultive une force de travail animée par l'esprit d'ensemble..."
- Percentage stats (4 items):
  - X% Proportion Hommes/femmes
  - X% (another stat)
  - X% Proportion -de 30 ans / +de 30 ans
  - X% (another stat)
- Stats displayed as circular or visual percentage indicators

**Figma specs:**
- Background (node 729:16176): y=11903, 1468×1212, overflow-clip
- Title at y=712 / y=11903 area (white text)
- Stats (nodes 729:16182, 729:16185, 729:16188): X% with labels
- Policy text (node 729:16191/729:16192): NOTRE POLITIQUE RESSOURCES HUMAINES

**Assets needed:**
- RH background image — `rh-background.png` already exists

---

## Phase 9 — Responsive Design

**Goal:** Make all sections responsive for tablet and mobile.

**Tasks:**
- **Hero:** Scale title, adjust image height
- **Pêche stats:** Stack columns vertically on mobile, reduce to single column
- **Certifications:** Wrap logos, stack timeline vertically
- **Transformation:** Stack image/text layouts, single column stats
- **Quality/Safety:** Stack 3 columns vertically on mobile
- **Distribution:** 3 cards → 2+1 on tablet → single column on mobile
- **Logistique:** Adjust text widths, scale imagery
- **RSE/RH:** Stack stats, adjust percentages layout
- Typography: scale down ~10-15% tablet, ~20% mobile
- Min 44px tap targets
- No horizontal overflow at any breakpoint

---

## Phase 10 — Polish & Final Verification

**Goal:** Final visual comparison, navigation verification, and cleanup.

**Tasks:**
- Verify navbar highlights "Expertises" on this page
- Ensure all internal links work (`/expertises`)
- Cross-check each section against Figma screenshots
- Clean up placeholder content (replace XX values if real data provided)
- Check all images load correctly
- Verify smooth scrolling between sections if applicable

---

## Rules

1. **One phase at a time.** Do not start the next phase until the user reviews and approves.
2. **Figma is the source of truth.** Always reference node-ids when extracting values.
3. **Use existing components.** Reuse `Container`, `SectionWrapper`, `SectionHeading`, `Button`, etc.
4. **Design tokens only.** Never hardcode colors or font sizes.
5. **Pixel-perfect at desktop.** Match the exact Figma frame at 1440px.
6. **Responsive is my responsibility.** Figma only provides desktop.
7. **Assets from Figma.** Export images to `src/assets/images/expertise/`. Use Astro `<Image />`.
8. **No GSAP yet.** CSS transitions only (200-300ms ease) for hover/focus.
9. **TypeScript props.** Interfaces with defaults on every component.
10. **Ask when ambiguous.** Don't guess Figma values.

---

## Existing Assets (in `src/assets/images/expertise/`)

| Asset | Status |
|-------|--------|
| `hero-expertises.jpg` | Available |
| `peche-thon.jpg` | Available |
| `carte-peche.jpg` | Available |
| `carte-distribution.jpg` | Available |
| `rh-background.png` | Available |

## Assets to Export from Figma

| Asset | Source Node | Save To |
|-------|-----------|---------|
| Transformation images | TRANSFORMATION 1/2, SMOKE | `src/assets/images/expertise/transformation-*.jpg` |
| Distribution card images | DISTRI 1/2/3B | `src/assets/images/expertise/distri-*.jpg` |
| Magazine covers | RUNIMER_COUVERTURE_JANV26 | `src/assets/images/expertise/magazine-cover.jpg` |
| Certification logos | Various | `src/assets/images/expertise/logo-*.png` |
| Support background | EXPERTISE_SUPPORT 1 | `src/assets/images/expertise/support-bg.jpg` |
| Certifications bg | Rectangle 52 | `src/assets/images/expertise/certifications-bg.jpg` |

---

## Figma Node Reference (Summary)

```
729:16024 — Expertise (full page frame, 1440 × ~14528)
├── 729:16034 — Hero bg (Gemini ocean image, y=-2, h=2560)
├── 729:16040 — Title "noS expertiseS" (y=250)
│
├── PÊCHE SECTION (y=715–2800)
│   ├── 729:16035 — BANC DE THON bg (y=715, h=2658)
│   ├── 729:16036 — Intro text (y=1185)
│   ├── 729:16041 — Stats La Réunion (y=1450)
│   ├── 729:16046/047 — Stats components (y=1490-1565)
│   ├── 729:16048 — Stats Boulogne (y=2084)
│   ├── 729:16054 — Stats Madagascar (y=1787)
│   └── 729:16037 — Légine subtitle (y=2412)
│
├── CERTIFICATIONS (y=2800–3800)
│   ├── 729:16028 — Background (y=2802, h=439)
│   ├── 729:16065/066 — Title (y=2786)
│   ├── 729:16068 — Description + logos (y=2853)
│   └── 729:16121/171 — Logo/timeline elements (y=2950-3215)
│
├── TRANSFORMATION (y=3800–6400)
│   ├── 729:16033 — Gradient bg (y=3796, h=1605)
│   ├── 729:16174 — Title "Une production experte" (y=3812, lagon-mayotte)
│   ├── 729:16194-203 — Sub-areas, images, stats
│   └── 729:16258-265 — Location stats (La Réunion, Boulogne, Madagascar)
│
├── QUALITY & SAFETY (y=6400–7500)
│   ├── 729:16236 — Title (y=6431)
│   ├── 729:16239-242 — Three columns
│   ├── 729:16270 — Subtitle (y=6431)
│   └── 729:16244 — Zéro déchet (y=7365)
│
├── DISTRIBUTION (y=7500–10200)
│   ├── 729:16031/032 — Magazine covers
│   ├── 729:16272 — Title (y=8301, sable-corail)
│   ├── 729:16273 — Description (y=8376)
│   ├── 729:16030 — Dark bg (y=8654, h=605)
│   └── 729:16274/279/284 — 3 distribution cards (y=8692)
│
├── LOGISTIQUE & SUPPORTS (y=10200–11900)
│   ├── 729:16025-027 — Dark bg + support imagery
│   ├── 729:16175 — Title (y=10851)
│   └── 729:16289 — Description (y=11244)
│
├── RSE & RH (y=11900–13115)
│   ├── 729:16176 — Background (y=11903, h=1212)
│   ├── 729:16177 — "La même chance pour tous" (y=712)
│   ├── 729:16182/185/188 — Stats X%
│   └── 729:16191/192 — NOTRE POLITIQUE RH
│
├── Header (navbar, handled by PageLayout)
└── Footer (node at y=13115, handled by PageLayout)
```
