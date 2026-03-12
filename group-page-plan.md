# Groupe Page — Implementation Plan

**Figma source:** [Site-Reunimer / Groupe](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=729-3084&m=dev)
**Figma node:** `729:3084` (frame "Groupe", 1440 × 10751)
**Route:** `/groupe`

---

## Page Structure (top to bottom)

| # | Section | Y range | Key Figma Nodes | Background |
|---|---------|---------|-----------------|------------|
| 1 | Navbar | top | — | Already in PageLayout |
| 2 | Hero (Triptych) | 0–860 | `729:3116`, `729:3118` | 3 images side by side (ocean, tuna, plated dish), Navbar overlay |
| 3 | Integrated Model | 846–1526 | `729:3164`–`729:3183` | White bg |
| 4 | Quote + Statistics | 1540–2309 | `729:3085`–`729:3096`, `729:3087`–`729:3095` | Bleu-abysse (#002C41) bg |
| 5 | Raison d'Être | 2309–3282 | `729:3111`–`729:3115` | White bg, image left |
| 6 | History Header | 3282–3681 | `729:3160`–`729:3162`, `729:3236` | Image bg (pecheur-malgache) |
| 7 | History Timeline | 3681–4174 | `729:3097`–`729:3132` | Bleu-abysse bg, timeline dots/lines |
| 8 | Filiales | 4260–5964 | `729:3200`–`729:3235` | White bg, subsidiary logo buttons |
| 9 | Implantations & Flux | 5964–8584 | `729:3098`, `729:3107`–`729:3156`, `729:3135`–`729:3199` | Dark bg (#002C41), regional maps, world map |
| 10 | World Stats & Portfolio | 8003–9338 | `729:3157`–`729:3196`, `729:3184`–`729:3186` | Dark bg continued, pie chart, continent bar chart |
| 11 | Footer | 9338+ | `729:3163` | Already in PageLayout |

---

## Phase 1 — Page Setup & Hero Triptych

**Goal:** Create `src/pages/groupe.astro` with `PageLayout` and build the hero section — a full-width triptych of 3 images side by side, with the Navbar overlaid on top.

**Tasks:**
- Create `src/pages/groupe.astro` with `PageLayout`
- Build hero section: 3 images in a row filling full width, total height ~860px
  - Left: ocean/marlin underwater image (~480px wide)
  - Center: raw tuna cut on steel surface (~480px wide)
  - Right: plated tuna dish with garnish (~480px wide)
- Images should be `object-cover` filling their container, edge-to-edge, no gaps
- The triptych sits behind/below the fixed Navbar (which is already transparent or white from PageLayout)
- No text overlay on the hero — just the 3 images

**Figma specs:**
- Frame (729:3116): 1440 × 860
- Background image (729:3118): single composite image or 3 separate images filling the frame
- Images extend edge-to-edge with no padding

**Assets needed:**
- `hero-groupe-1.jpg` — underwater marlin image (left panel)
- `hero-groupe-2.jpg` — tuna cut image (center panel)
- `hero-groupe-3.jpg` — plated dish image (right panel)
- OR `home-groupe.jpg` already exists — check if this is the composite triptych image

---

## Phase 2 — Integrated Model Section ("De l'océan à l'assiette")

**Goal:** Build the two-column section with introductory text on the left and 5 colored expertise cards on the right, plus a CTA button.

**Tasks:**
- White background section, ~680px tall
- **Left column** (x=141, w=~393px):
  - Title: "DE L'OCÉAN À L'ASSIETTE" — Zalando Sans Expanded Black 40px, bleu-abysse, uppercase
  - Subtitle: "Un modèle intégré : la signature d'une confiance absolue" — Montserrat Regular 20px, bleu-abysse
  - Body text: "Reunimer s'impose par un modèle intégré..." — Inter Regular 16px, #636A6B (gris-merou)
  - CTA button: "DÉCOUVREZ NOS EXPERTISES" — outline-dark variant, links to `/expertises`
- **Right column** (x=606, w=739px): 5 colored cards in a grid layout
  - Top row (3 cards, ~238px each):
    - **Pêche** — terre-laterite (#A34C26) bg
    - **Production** — lagon-mayotte (#2D7890) bg
    - **Distribution** — sable-corail (#AC8652) bg
  - Middle row (1 full-width card, 739px):
    - **Maintenance & Logistique** — brume-alize (#809AA0) bg
  - Bottom row (1 full-width card, 739px):
    - **RSE & RH** — ecume-poudree (#6EAEB5) bg
  - Each card: px-28 py-38, title (Zalando Sans Expanded ExtraBold 20px, white, uppercase, centered) + description (Montserrat Regular 16px, white, centered)

**Figma specs:**
- Frame (729:3164): y=846, 1440 × 680
- Title (729:3165): x=141, y=123, Zalando Sans Expanded Black 40px, bleu-abysse
- Subtitle (729:3166): x=144, y=227, Montserrat Regular 20px, bleu-abysse
- Body (729:3167): x=145, y=295, Inter Regular 16px, #636A6B, w=393px
- Cards: 729:3174 (Pêche), 729:3177 (Production), 729:3180 (Distribution), 729:3168 (Maintenance), 729:3171 (RSE)
- Button (729:3183): x=145, y=511, outline-dark, 3px border-radius

---

## Phase 3 — Quote & Statistics Section ("Le groupe en quelques chiffres")

**Goal:** Build the dark blue section with decorative quote marks and 3 key statistics (111 M€, +900, 16500 T).

**Tasks:**
- Bleu-abysse (#002C41) background, h=769px (node 729:3087, y=1540)
- **Decorative quote marks** (nodes 729:3085, 729:3086):
  - Opening " at x=799, y=1007 (above the section, overlapping)
  - Closing " at x=1152, y=1436
  - These may be large typographic quote marks — extract exact style from Figma
- **Section title**: "Le groupe en quelques chiffres" — centered, white text, at y=1639
  - Zalando Sans Expanded Black 40px, uppercase, white, w=975px, centered
- **Stats container** (729:3088): x=274, y=1749, w=893px, 3 rows:
  - **Row 1** (729:3089): "111 M€" + "de chiffre d'affaires" — Component 3 instance
  - **Row 2** (729:3090): "+900" + "collaborateurs à travers le monde" — Component 4 instance
  - **Row 3** (729:3091): "16 500 T" + "tonnes de produit dont 3200 Algues"
  - Each row: number on left (Zalando Sans Expanded Black 40px, white) + description on right (Inter Regular ~16px, white)
  - Rows separated by thin white horizontal lines (1px)

**Figma specs:**
- Background (729:3087): y=1540, 1440 × 769, bleu-abysse fill
- Title (729:3096): x=233, y=1639, w=975, h=110, centered
- Stats frame (729:3088): x=274, y=1749, w=893, h=424
- Number text (729:3093): Zalando Sans Expanded, w=430, h=92
- Description text (729:3094): x=483 (relative), y=58, w=410, h=34
- Separator (729:3095): Line, w=893

---

## Phase 4 — Raison d'Être Section

**Goal:** Build the two-column section with a large image on the left and "Notre raison d'être" text + 4 values on the right.

**Tasks:**
- White background section, h=973px
- **Left column** (w=680px): large image of a girl eating a skewer on a beach
  - Image fills the entire left half with `object-cover`
  - Has a slight rounded rectangle container (729:3112)
- **Right column** (x=720, w=~456px):
  - Title: "NOTRE RAISON D'ÊTRE" — Zalando Sans Expanded ExtraBold 40px, bleu-abysse, uppercase
  - Mission text: "Préserver et valoriser durablement les ressources marines..." — Montserrat Regular 20px, bleu-abysse, w=456px
  - Subtitle: "Nos valeurs" — Montserrat SemiBold 20px, bleu-abysse
  - 4 values, each with bold title + description paragraph:
    - **Audace** — Inter Bold 16px title + Inter Regular 16px body
    - **Expertise** — same pattern
    - **Engagement** — same pattern
    - **Éthique** — same pattern

**Figma specs:**
- Frame (729:3111): y=2309, 1440 × 973
- Image container (729:3112): x=-19, w=680, h=973, overflow-clip
- Title (729:3114): x=720, y=100, Zalando Sans Expanded ExtraBold 40px
- Mission (729:3115): x=720, y=169, w=456, h=136
- Values (729:3113): x=720, y=343, w=445, h=469

**Assets needed:**
- `raison-detre.jpg` — already exists in `src/assets/images/groupe/`

---

## Phase 5 — History Section (Header + Timeline)

**Goal:** Build the "Notre histoire" header with background image and the horizontal timeline with 4 milestone entries (1996, 1998, 2000, 2002).

**Tasks:**
- **History Header** (729:3160): y=3308, h=373
  - Background image: pecheur-malgache (fishing scene), dark/overlaid
  - Gradient overlay: bleu-abysse → transparent (from right to left, or top to bottom)
  - Title: "Notre histoire" — Zalando Sans Expanded, white, x=104, y=131 (relative to section)
- **Divider bar** (729:3236): y=3282, 1440 × 30, solid color separator between sections
- **Timeline** (729:3097): y=3681, 1440 × 493, bleu-abysse bg
  - Horizontal line (729:3120): y=3867, spanning x=97 to x=1440, white 1px line
  - 4 milestone dots (729:3121–3124): circles on the timeline, w=11, h=11
  - 4 vertical ticks (729:3125–3128): short vertical lines dropping from dots
  - **1996** (729:3099): x=113, y=3811, "Création de la société Le Martin Pêcheur..."
  - **1998** (729:3100): x=455, y=3811, "Naissance de l'Armement Enez..."
  - **2000** (729:3101): x=781, y=3811, "Création de Pêcherie du Sud..."
  - **2002** (729:3102): x=1085, y=3811, "Création de Réunion Pélagique..."
  - Year text: positioned above timeline, description text below (y=3889)
  - Description: Inter Regular, small text, ~242px wide
  - Navigation arrows (729:3129, 729:3132): right side, y=4039, for scrolling if more entries exist

**Figma specs:**
- Header bg image: pecheur-malgache (node 729:3161), 2642 × 1334, overflow-clip
- Header title (729:3162): x=104, y=131 (relative), Zalando Sans Expanded
- Timeline bg (729:3097): bleu-abysse, y=3681, h=493
- Timeline entries: year text above line, description below, ~250px column widths
- Year text style: likely Inter or Montserrat, ~16-20px
- Description text: Inter Regular, ~14px, w=242-255px

**Assets needed:**
- `pecheur-malgache.jpg` — background image for history header (export from Figma)

---

## Phase 6 — Filiales Section ("Nos filiales")

**Goal:** Build the subsidiary companies section organized by geographic region, with company logo buttons.

**Tasks:**
- White background, starts at y=4260
- **Section title**: "Nos filiales" — Zalando Sans Expanded, centered, bleu-abysse, at y=4260
- **3 geographic regions** with logo grids:
  - **"À la Réunion"** (729:3233): y=4362, region header
    - Row 1 (729:3201): 3 logos side by side (w=330 each, h=223)
      - Reunimer Distribution (729:3203) — "Distribution"
      - RPA (729:3206) — "Pêche & distribution"
      - Reunipêche (729:3209) — "Pêche & distribution"
    - Row 2: 2 more logos
      - Le Pêcheur (729:3231) — "Point de vente" (x=560, y=4688)
      - Ocean Farmer (729:3212) — "Algoculture" (x=742, y=5042)
    - Row 2 alt: Copefrito/MSF (729:3225) — "Pêche traditionnelle & transformation" (x=383, y=5042)
  - **"À Madagascar"** (729:3234): y=4971, region header
    - Subsidiary logos below
  - **"En France Métropolitaine"** (729:3235): y=5325, region header
    - Row (729:3214): 3 logos
      - MSF (729:3216) — "Distribution"
      - PHF (729:3219) — "Mareyage & distribution"
      - Stargel (729:3222) — "Distribution"
    - Below: Norsea (729:3228) — "Distribution" (y=5655)
- Each subsidiary entry: logo image button (330 × 190, rounded) + label text below (19px)
- Logo buttons are instances (Bouton-reunimer-2, Bouton-RPA-2, etc.)

**Figma specs:**
- Title (729:3200): x=522, y=4260, w=397, h=89, centered
- Region headers (729:3233–3235): Inter/Montserrat, smaller text
- Logo containers (Frame 105/106/etc.): 1053px wide, 3-column grid (329.67px each), 223px tall
- Logo button instances: 329.67 × 190.33
- Label text: 19px, below each logo, centered within column

**Assets needed:**
- Company logo images for each subsidiary (7-8 logos): export from Figma
  - `logo-reunimer-distribution.png`
  - `logo-rpa.png`
  - `logo-reunipeche.png`
  - `logo-pecheur.png`
  - `logo-ocean-farmer.png`
  - `logo-copefrito.png`
  - `logo-msf.png`
  - `logo-phf.png`
  - `logo-stargel.png`
  - `logo-norsea.png`

---

## Phase 7 — Implantations & Flux Commerciaux Section

**Goal:** Build the dark background section with regional maps, descriptions, and the world map showing commercial flows.

**Tasks:**
- Dark background (#002C41) container (729:3098): y=5964, 1475 × 2620
- **"L'implantation de nos filiales"** (729:3107): y=6058, Zalando Sans Expanded, white, centered
  - Description (729:3109): "De La Réunion à Madagascar...", Montserrat Regular, white, centered, w=820px
- **3 Regional map columns** (y=6374–6697):
  - **La Réunion** (729:3135): map SVG at x=242, y=6412, w=191, h=168
    - Location pins: multiple Point-localites instances (729:3145–3149)
    - Label: "La Réunion" (729:3154) — Inter Bold, white
    - Description: "Armement, transformation, distribution, pilotage groupe" (729:3151)
  - **Madagascar** (729:3139): map SVG at x=649, y=6374, w=125, h=246
    - Location pins: Point-localites instances
    - Label: "Madagascar" (729:3155)
    - Description: "Collecte artisanale, transformation, algoculture durable." (729:3152)
  - **France métropolitaine** (729:3137): map SVG at x=963, y=6391, w=231, h=212
    - Label: "France métropolitaine" (729:3156)
    - Description: "Mareyage, transformation, distribution et importation." (729:3153)
- **"Les flux commerciaux"** (729:3108): y=6911, Zalando Sans Expanded, white, centered
  - Description (729:3110): "Le groupe Reunimer déploie son expertise...", centered, w=820px
- **World map** (729:3199 — carte-monde instance): x=1, y=7204, w=1340, h=778
  - SVG world map with location pins
  - Already have `/public/world-map.svg` from previous work

**Figma specs:**
- Container (729:3098): dark bg, y=5964, extends ~2620px
- Section titles: Zalando Sans Expanded, white, centered at x=247, w=922
- Descriptions: x=310, w=820, centered
- Regional maps: SVG outlines with pin markers
- Map labels: Inter Bold ~16px, white
- Map descriptions: Inter Regular ~14px, white

**Assets needed:**
- Regional map SVGs (La Réunion, Madagascar, France) — check if already exported from previous work
- World map already exists at `/public/world-map.svg`
- Location pin component/icon

---

## Phase 8 — World Stats & Client Portfolio Section

**Goal:** Build the bottom section of the dark area with "Une portée mondiale" stats, continent bar chart, 71% stat, and the client portfolio pie chart.

**Tasks:**
- Continues on dark bg
- **"Une portée mondiale sur les 5 continents"** (729:3157): x=300, y=8003, w=365, Zalando Sans Expanded, white
- **71% stat** (729:3159): x=923, y=8003, large percentage — Zalando Sans Expanded
  - Label: "de produits vendus en France (Métropole et Réunion)" (729:3158): x=923, Inter Regular, white
- **Continent bar chart** (729:3184 — graphique-continents instance): x=89, y=8132, w=582, h=213
  - Horizontal bar chart showing distribution by continent
- **"Un portefeuille client équilibré (% sur volume total)"** (729:3185): x=690, y=8724, Montserrat/Inter, white
- **Client portfolio pie chart** area:
  - Pie chart / donut chart (729:3194 / 729:3195–3196): x=335, y=8796, ~283 × 305
  - Legend items (729:3186 — Frame 58): x=690, y=8800, 7 legend rows (729:3187–3193, legendage instances)
    - Each legend row: color swatch + label + percentage, w=353, h=34

**Figma specs:**
- Title (729:3157): x=300, y=8003, w=365, h=88
- 71% (729:3159): x=923, y=8003, w=156, h=69
- Bar chart (729:3184): x=89, y=8132, w=582, h=213
- Pie chart (729:3194): x=335, y=8796, w=283, h=305
- Legend (729:3186): x=690, y=8800, w=420, h=322, 7 rows

**Assets needed:**
- Continent bar chart — either as exported SVG/image or built with CSS/HTML
- Pie chart — either as exported image or built with CSS (conic-gradient)
- "camembert 1" image (729:3196) may be a pre-rendered chart image

---

## Phase 9 — Responsive Design

**Goal:** Make all sections responsive for tablet and mobile.

**Tasks:**
- **Hero triptych:** Stack 3 images vertically on mobile, or keep as row with reduced height on tablet
- **Integrated Model:** Stack left text + right cards vertically on mobile; cards grid → single column
- **Statistics:** Stack number/description vertically; reduce font size ~20%
- **Raison d'Être:** Stack image on top, text below on mobile
- **History:** Timeline → vertical layout on mobile, horizontal scroll on tablet
- **Filiales:** Logo grid 3→2→1 columns; adjust spacing
- **Implantations:** Stack 3 maps vertically; world map scales proportionally
- **Stats/Charts:** Stack chart + legend vertically; scale charts down
- Typography: scale down ~10-15% tablet, ~20% mobile
- Min 44px tap targets
- No horizontal overflow at any breakpoint

---

## Phase 10 — Polish & Final Verification

**Goal:** Final visual comparison, navigation verification, and cleanup.

**Tasks:**
- Verify Navbar highlights "Groupe" on this page
- Ensure smooth scroll to sections via Navbar children:
  - `#modele-integre` → Integrated Model
  - `#raison-detre` → Raison d'Être
  - `#histoire` → History
  - `#filiales` → Filiales
  - `#implantations` → Implantations
- Cross-check each section against Figma screenshots
- Verify `scroll-mt-[135px]` on section wrapper divs for fixed navbar offset
- Check all images load correctly
- Remove any placeholder content

---

## Rules

1. **One phase at a time.** Do not start the next phase until the user reviews and approves.
2. **Figma is the source of truth.** Always reference node-ids when extracting values.
3. **Use existing components.** Reuse `Container`, `SectionWrapper`, `SectionHeading`, `Button`, etc.
4. **Design tokens only.** Never hardcode colors or font sizes.
5. **Pixel-perfect at desktop.** Match the exact Figma frame at 1440px.
6. **Responsive is my responsibility.** Figma only provides desktop.
7. **Assets from Figma.** Export images to `src/assets/images/groupe/`. Use Astro `<Image />`.
8. **No GSAP yet.** CSS transitions only (200-300ms ease) for hover/focus.
9. **TypeScript props.** Interfaces with defaults on every component.
10. **Ask when ambiguous.** Don't guess Figma values.

---

## Existing Assets (in `src/assets/images/groupe/`)

| Asset | Status |
|-------|--------|
| `home-groupe.jpg` | Available (546 KB) — may be hero triptych composite |
| `raison-detre.jpg` | Available (3.4 MB) — girl eating skewer photo |

## Assets to Export from Figma

| Asset | Source Node | Save To |
|-------|-----------|---------|
| Hero images (if separate) | 729:3118 | `src/assets/images/groupe/hero-groupe-*.jpg` |
| History header bg | 729:3161 (pecheur-malgache) | `src/assets/images/groupe/pecheur-malgache.jpg` |
| Subsidiary logos (7-10) | 729:3203–3228 instances | `src/assets/images/groupe/logo-*.png` |
| Regional maps (3) | 729:3135, 729:3139, 729:3137 | `src/assets/images/groupe/map-*.svg` |
| Continent bar chart | 729:3184 | `src/assets/images/groupe/graphique-continents.svg` |
| Pie chart | 729:3194/3196 | `src/assets/images/groupe/camembert.svg` or `.png` |

---

## Figma Node Reference (Summary)

```
729:3084 — Groupe (full page frame, 1440 × 10751)
├── HERO TRIPTYCH (y=0–860)
│   ├── 729:3116 — Frame 2 (hero container, 1440 × 860)
│   ├── 729:3118 — Rectangle 1 (triptych image, 1462 × 846)
│   └── 729:3117/3119 — Header instances (Navbar overlay)
│
├── INTEGRATED MODEL (y=846–1526)
│   ├── 729:3164 — Frame 92 (1440 × 680)
│   ├── 729:3165 — "DE L'OCÉAN À L'ASSIETTE" (title)
│   ├── 729:3166 — "Un modèle intégré..." (subtitle)
│   ├── 729:3167 — Body paragraph (Inter, #636A6B)
│   ├── 729:3174 — Pêche card (terre-laterite)
│   ├── 729:3177 — Production card (lagon-mayotte)
│   ├── 729:3180 — Distribution card (sable-corail)
│   ├── 729:3168 — Maintenance card (brume-alize)
│   ├── 729:3171 — RSE & RH card (ecume-poudree)
│   └── 729:3183 — CTA button "Découvrez nos expertises"
│
├── QUOTE & STATISTICS (y=1540–2309)
│   ├── 729:3085 — Opening " quote mark (y=1007)
│   ├── 729:3086 — Closing " quote mark (y=1436)
│   ├── 729:3087 — Rectangle 19 (bleu-abysse bg, y=1540, h=769)
│   ├── 729:3096 — "Le groupe en quelques chiffres" (title, y=1639)
│   ├── 729:3088 — Frame 49 (stats container, y=1749)
│   ├── 729:3089 — Component 3 (111 M€ stat)
│   ├── 729:3090 — Component 4 (+900 stat)
│   └── 729:3091 — Frame 48 (16500 T stat + line)
│
├── RAISON D'ÊTRE (y=2309–3282)
│   ├── 729:3111 — Frame 116 (1440 × 973)
│   ├── 729:3112 — Image container (left, w=680)
│   ├── 729:3114 — "NOTRE RAISON D'ÊTRE" (title)
│   ├── 729:3115 — Mission text (Montserrat Regular 20px)
│   └── 729:3113 — Values text (Nos valeurs + Audace/Expertise/Engagement/Éthique)
│
├── HISTORY (y=3282–4174)
│   ├── 729:3236 — Divider bar (y=3282, h=30)
│   ├── 729:3160 — Frame 89 (header, y=3308, h=373)
│   ├── 729:3161 — Pecheur-malgache bg image
│   ├── 729:3162 — "Notre histoire" (title)
│   ├── 729:3097 — Rectangle 7 (timeline bg, y=3681, h=493)
│   ├── 729:3120 — Timeline line (y=3867)
│   ├── 729:3121–3124 — Ellipse dots (4 milestones)
│   ├── 729:3125–3128 — Vertical tick lines
│   ├── 729:3099–3102 — Year labels (1996, 1998, 2000, 2002)
│   ├── 729:3103–3106 — Description texts
│   └── 729:3129/3132 — Navigation arrow buttons
│
├── FILIALES (y=4260–5964)
│   ├── 729:3200 — "Nos filiales" (title, y=4260)
│   ├── 729:3233 — "À la Réunion" (region header)
│   ├── 729:3201 — Frame 105 (3 logos row: Reunimer, RPA, Reunipêche)
│   ├── 729:3230 — Le Pêcheur (y=4688)
│   ├── 729:3234 — "À Madagascar" (region header)
│   ├── 729:3224 — Copefrito/MSF (y=5042)
│   ├── 729:3211 — Ocean Farmer (y=5042)
│   ├── 729:3235 — "En France Métropolitaine" (region header)
│   ├── 729:3214 — Frame 106 (3 logos row: MSF, PHF, Stargel)
│   └── 729:3227 — Norsea (y=5655)
│
├── IMPLANTATIONS & FLUX (y=5964–8000)
│   ├── 729:3098 — Dark bg rectangle (y=5964, h=2620)
│   ├── 729:3107 — "L'implantation de nos filiales" (title)
│   ├── 729:3109 — Description paragraph
│   ├── 729:3135 — La Réunion map SVG
│   ├── 729:3139 — Madagascar map SVG (with pins 729:3145-3149)
│   ├── 729:3137 — France map SVG
│   ├── 729:3154–3156 — Region labels
│   ├── 729:3151–3153 — Region descriptions
│   ├── 729:3108 — "Les flux commerciaux" (title)
│   ├── 729:3110 — Flux description
│   └── 729:3199 — carte-monde (world map instance, y=7204)
│
├── WORLD STATS & PORTFOLIO (y=8000–9338)
│   ├── 729:3157 — "Une portée mondiale sur les 5 continents"
│   ├── 729:3159 — "71%" large stat
│   ├── 729:3158 — "de produits vendus en France..."
│   ├── 729:3184 — graphique-continents (bar chart instance)
│   ├── 729:3185 — "Un portefeuille client équilibré..."
│   ├── 729:3194 — Pie chart group
│   └── 729:3186 — Legend frame (7 legendage rows)
│
├── Header (navbar, handled by PageLayout)
└── Footer (729:3163, y=9338, handled by PageLayout)
```
