# Engagements RSE Page — Implementation Plan

**Figma source:** [Site-Reunimer / Engagements](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=729-16398&m=dev)
**Figma node:** `729:16398` (frame "Engagements", 1440 × 10058)

---

## Page Structure (top to bottom)

| # | Section | Figma Node(s) | Y Offset | Height | Background |
|---|---------|--------------|----------|--------|------------|
| 1 | Hero (ocean photo + title + description) | `729:16400` | 0 | 860px | Image (underwater/kid) |
| 2 | Intro ("Explorez nos Engagements" + RSE button + ONG labels) | `729:16597`, `729:16599`, `729:16600`, `729:16598`, `729:16437`, `729:16438` | 1018 | 516px | White |
| 3 | Notre lien à la Mer (Kelonia) | `729:16418` (bg), `729:16422` (img), `729:16420`–`729:16425` | 1531 | 785px | gris-clair (#F6F6F6) |
| 4 | Notre lien à la Terre (Bôndy) | `729:16414` (img), `729:16415`–`729:16427` | 2314 | 785px | White |
| 5 | Notre lien aux femmes et aux hommes (Together + key figures) | `729:16406` (bg), `729:16411` (img), `729:16410`, `729:16442`, `729:16443`, `729:16586` | 3099 | 1063px | gris-clair |
| 6 | Notre lien à l'énergie (solar panels) | `729:16399` (img), `729:16432`, `729:16439` | 4162–4947 | 785+785px | White + gris-clair |
| 7 | Notre lien à la santé | `729:16436`, `729:16544` | 5163 | ~570px | White |
| 8 | Notre lien à la formation (EAMP) | `729:16417` (img), `729:16433`, `729:16440` | 5732 | 785px | White |
| 9 | Notre lien au social (Ocean Farmers + key figures) | `729:16408` (bg), `729:16413` (img), `729:16434`, `729:16546`–`729:16558`, `729:16551` | 6514 | 1141px | gris-clair |
| 10 | Notre lien aux filières (ADIR, ARIPA, EcoVadis) | `729:16409` (bg), `729:16435`, `729:16547`, `729:16545`, `729:16595`, `729:16596` | 7823 | 822px | gris-clair + White |
| 11 | Footer | `729:16405` | 8645 | 1413px | Already in PageLayout |

---

## Section Layout Pattern

The page follows an alternating two-column layout for each "engagement" section:

- **Odd sections** (Mer, Femmes/Hommes, Social): Image LEFT (~737–742px) + text RIGHT
- **Even sections** (Terre, Énergie, Formation, Filières): Text LEFT + image RIGHT (~710–766px)
- Each section has a heading ("Notre lien à…"), body text, optional partner logo, optional "EN SAVOIR PLUS" button, and optionally a key figures block.
- Section headings: Montserrat SemiBold 32px, line-height 39px
- Body text: Montserrat Regular 20px, line-height 29.2px (1.461)
- Section backgrounds alternate between white and gris-clair (#F6F6F6)

---

## Phase 1 — Page Setup + Hero Section

**Goal:** Create `src/pages/engagements.astro` with PageLayout + hero section.

**Tasks:**

### Hero Section (node `729:16400`, 1440 × 860)
- Full-width background image: underwater/ocean scene with child
  - Image node: `729:16401` (Frame 62, 1449 × 884, image fill)
  - Export → `src/assets/images/engagements/hero-engagements.jpg`
- Use `-mt-[92px]` to overlap navbar (same as produits/carrieres)
- Hero title overlay (node `729:16402`):
  - Text: "UN ENGAGEMENT humain et ENVIRONNEMENTAL PORTEUR D'AVENIR"
  - Font: Zalando Sans Expanded Black 40px, line-height 44.5px, uppercase, white
  - Position: right side, x=715 from page left, y=297 from hero top, w=559
  - paragraph-spacing: 36px between lines
- Hero description (node `729:16403`):
  - Text: "Chez Reunimer, nous croyons que la performance durable naît de l'équilibre entre le respect de la nature et l'épanouissement des hommes. Notre stratégie RSE n'est pas une option, mais le socle de notre vision : un modèle d'ancrage territorial où chaque action génère un impact positif et mesurable."
  - Font: Montserrat Regular 20px, line-height 29.2px (1.461), white
  - Position: x=715 from left, y=495 from hero top, w=659

**Figma specs:**
- Hero title positioned at absolute (715, 297) within hero frame, width 559px
- Hero description at (715, 495), width 659px

**Responsive:**
- Mobile: hero ~280px height, title ~24px, description ~16px, centered
- Tablet: hero ~400px, title ~32px

---

## Phase 2 — Intro Section

**Goal:** Build the "Explorez nos Engagements" intro section with RSE download button.

**Tasks:**

### Intro Section (node `729:16597`, Frame 110, y=1018, 1592 × 516)
- White background, centered content
- Two-column layout at top: "LOGO ONG" (left) + "ONG concernées ?" (right) — Montserrat SemiBold 32px
  - These appear to be placeholder labels; may need clarification from user
- Title (node `729:16599`): "Explorez nos Engagements" — Montserrat SemiBold 32px, line-height 39px
- Description (node `729:16600`):
  - "Parce que la transparence est aussi essentielle que la fraîcheur de nos produits, nous vous invitons à découvrir l'envers du décor. Notre Rapport RSE détaille nos actions concrètes pour une pêche durable, la protection de la biodiversité réunionnaise et le développement de notre économie locale. Plongez dans nos engagements pour comprendre comment nous transformons, jour après jour, les défis de l'océan en opportunités pour le territoire."
  - Font: Inter Regular 16px, line-height 22.4px
  - Max-width: 445px
- Download button (node `729:16598`): "TÉLÉCHARGER LE RAPPORT RSE"
  - Montserrat SemiBold 12px, tracking 1.44px, uppercase
  - 298 × 47px pill button (use existing Button component or similar style)

**Responsive:**
- Mobile: full-width text, stack vertically, reduce title to ~24px
- Tablet: adjust widths proportionally

---

## Phase 3 — EngagementSection Component + Notre lien à la Mer

**Goal:** Build a reusable `EngagementSection` component and implement the first engagement section (Kelonia).

**Tasks:**

### 3a — EngagementSection Component (`src/components/ui/EngagementSection.astro`)
- Props: `title`, `bodyText`, `imageSrc`, `imageAlt`, `imagePosition` (left | right), `bgColor` (white | gris-clair), `id`
- Slots: `partner-logo`, `extra-content` (for partner descriptions, key figures, etc.)
- Layout: Two columns — image (≈51% width) + text content (≈49% width)
- Image column: full-height image, object-cover
- Text column: title (Montserrat SemiBold 32px) + body (Montserrat Regular 20px, 1.461 lh) + optional partner logo + "EN SAVOIR PLUS" button
- "EN SAVOIR PLUS" button: outline style, 190 × 53px (use existing Button component)
- Section height: ~785px at desktop (flexible based on content)

### 3b — Notre lien à la Mer (y=1531, h=785)
- Background: gris-clair (#F6F6F6), node `729:16418`
- Image LEFT (node `729:16422`, 742 × 785): sea turtle / marine scene
  - Export → `src/assets/images/engagements/lien-mer.jpg`
- Title (node `729:16420`): "Notre lien à la Mer"
- Body text (node `729:16421`): "En partenariat avec Kelonia, le groupe Reunimer forme ses marins aux gestes de secours pour les tortues marines. De l'application de protocoles de réanimation au décrochage sécurisé, ces compétences permettent de minimiser l'impact de la pêche et de transformer les équipages en véritables sentinelles de la biodiversité dans l'océan Indien."
- Partner logo: Kelonia (node `729:16425`, 175 × 133)
  - Export → `src/assets/images/engagements/logo-kelonia.png`
- Partner description (node `729:16423`): "Kélonia est à la fois un aquarium, musée, et un centre de recherche, d'intervention et de soins consacré aux tortues marines."
  - Font: appears smaller (~Inter or Montserrat), width 218px
- "EN SAVOIR PLUS" button (node `729:16419`) at y=2131

**Responsive:**
- Mobile: single column, image on top, text below, reduce image height to ~300px
- Tablet: reduce image width, adjust text sizing

---

## Phase 4 — Notre lien à la Terre

**Goal:** Build the second engagement section (Bôndy partnership).

**Tasks:**

### Notre lien à la Terre (y=2314, h=785)
- Background: White
- Image RIGHT (node `729:16414`, 745 × 785): planting/reforestation scene
  - Export → `src/assets/images/engagements/lien-terre.jpg`
- Title (node `729:16415`): "Notre lien à la Terre"
- Body text (node `729:16416`): "Engagé pour la préservation de son environnement régional, le groupe Reunimer soutient l'association malgache Bôndy via un don dédié à la reforestation et au développement de l'agroforesterie. Ce partenariat concret permet de restaurer les écosystèmes de la Grande Île tout en accompagnant les communautés locales vers des modèles économiques durables, affirmant ainsi la responsabilité sociétale de Reunimer au cœur de l'océan Indien."
- Partner logo: Bôndy (node `729:16426`, 117 × 159)
  - Export → `src/assets/images/engagements/logo-bondy.png`
- Partner description (node `729:16424`): "Avec les entreprises engagées, Bôndy mobilise tous les acteurs pour recréer une croissance inclusive et durable à Madagascar, en activant des circuits agricoles et économiques, vertueux, régénératifs et rentables pour tous."
  - Width: 280px
- "EN SAVOIR PLUS" button (node `729:16427`) at y=2953

**Responsive:**
- Mobile: single column, image on top, text below
- Tablet: reduce image width proportionally

---

## Phase 5 — Notre lien aux femmes et aux hommes

**Goal:** Build the third engagement section (Together + key figures block).

**Tasks:**

### Notre lien aux femmes et aux hommes (y=3099, h=1063)
- Background: gris-clair (#F6F6F6), node `729:16406`
- Image LEFT (node `729:16411`, 737 × 1063): people/community photo
  - Export → `src/assets/images/engagements/lien-femmes-hommes.jpg`
- Title (node `729:16410`): "Notre lien aux femmes et aux hommes" (2 lines, 409px wide)
- Body/Together info (node `729:16442`): "Together est une cellule spécialisée dans la prise en charge de situations de discrimination, de violences sexistes et sexuelles et de harcèlement moral fondé sur un critère de discrimination. Elle est gérée par une équipe de deux psychologues et une actrice de la prévention."
  - Width: 562px
- Together logo (node `729:16443`, Group 11, 200 × 46)
  - Export → `src/assets/images/engagements/logo-together.png`
- "EN SAVOIR PLUS" button (node `729:16428`) at y=3538
- **Key Figures block** (node `729:16586`, 467 × 394) at y=3639:
  - Title: "L'impact socio-économique de Reunimer à Madagascar" (Montserrat Bold 16px)
  - 6 stat items in a grid (2 columns × 3 rows):
    1. XX personnes impactées
    2. XX km de Littoral
    3. XX pêcheurs partenaires
    4. XX % de femmes
    5. XX emplois indirects soutenus dans la filière
    6. 1800 tonnes de poissons pélagiques pêchés
  - Each stat: number in Zalando Sans Black 40px + label in Montserrat Regular 16px
  - Consider creating a reusable `KeyFigures` component (used again in Phase 8)

**Responsive:**
- Mobile: single column, image on top, key figures 2-col grid, reduce number size to ~28px
- Tablet: reduce image width, adjust text sizing

---

## Phase 6 — Notre lien à l'énergie

**Goal:** Build the energy transition section with solar panel image.

**Tasks:**

### Notre lien à l'énergie (y=4162–4947, ~1570px total)
- This section spans two background zones:
  - Top part (y=4162): White background, solar panel image (node `729:16399`, 781 × 785) on RIGHT side
  - Bottom part (y=4947): gris-clair background (node `729:16407`, 1440 × 785)
- Title (node `729:16432`): "Notre lien à l'énergie" at y=4339
- Body text (node `729:16439`): "Conscient de l'empreinte énergétique liée à la chaîne du froid et à la navigation, le groupe Reunimer place la transition écologique au centre de sa stratégie. En investissant dans des infrastructures performantes, comme l'installation de panneaux photovoltaïques sur ses sites de stockage et l'optimisation de la consommation de ses navires. Le groupe réduit activement son bilan carbone. Cette quête d'efficacité énergétique permet de concilier impératifs industriels et respect de l'écosystème fragile de La Réunion."
  - Width: 445px, y=4430
- Layout: text LEFT + solar panel image RIGHT
- The image appears to overlap both background zones
- Export → `src/assets/images/engagements/lien-energie.jpg`

**Responsive:**
- Mobile: single column, image on top
- Tablet: reduce image width, stack if needed

---

## Phase 7 — Notre lien à la santé + Notre lien à la formation

**Goal:** Build the health and formation sections.

**Tasks:**

### 7a — Notre lien à la santé (y=5163, ~570px)
- Background: White (between gris-clair sections)
- No image in this section — text-only
- Title (node `729:16436`): "Notre lien à la santé"
- Body text (node `729:16544`): "Convaincu que la santé commence par l'alimentation, le groupe Reunimer valorise le 'bien manger' à travers des produits de la mer d'une fraîcheur exemplaire. En privilégiant les circuits courts et une pêche responsable dans l'océan Indien, le groupe offre aux consommateurs une source de protéines nobles et d'acides gras essentiels, indispensables à un équilibre nutritionnel durable. Pour Reunimer, promouvoir une consommation saine et transparente aujourd'hui, c'est investir directement dans la vitalité des générations futures."
  - Width: 496px, height: 382px
- Layout: title + body text, left-aligned within Container

### 7b — Notre lien à la formation (y=5732, h=785)
- Background: White
- Image RIGHT (node `729:16417`, 766 × 785): EAMP maritime school scene
  - Export → `src/assets/images/engagements/lien-formation.jpg`
- Title (node `729:16433`): "Notre lien à la formation" at y=5909
- Body text (node `729:16440`): "Le Partenariat avec l'EAMP. Pour pérenniser l'excellence de ses métiers, le groupe Reunimer collabore étroitement avec l'École d'Apprentissage Maritime de La Réunion (EAMP). Ce partenariat stratégique vise à former les futurs experts de la mer, qu'il s'agisse de navigation, de mécanique navale ou de techniques de pêche, en alignant les cursus pédagogiques sur les réalités du terrain. En offrant des terrains de stage et des perspectives d'embauche concrètes, Reunimer s'assure un vivier de compétences locales hautement qualifiées, tout en soutenant activement l'insertion professionnelle de la jeunesse réunionnaise."
  - Width: 445px
- Layout: text LEFT + image RIGHT

**Responsive:**
- Mobile: santé text full-width, formation single column with image on top
- Tablet: adjust proportionally

---

## Phase 8 — Notre lien au social

**Goal:** Build the Ocean Farmers section with key figures.

**Tasks:**

### Notre lien au social (y=6514, h=1141)
- Background: gris-clair (#F6F6F6), node `729:16408`
- Image LEFT (node `729:16413`, 710 × 1138): ocean/algae farming scene
  - Export → `src/assets/images/engagements/lien-social.jpg`
- Title (node `729:16434`): "Notre lien au social"
- Subtitle (node `729:16548`): "Une économie bleue pour l'avenir de notre ressource." (Montserrat Regular 20px, lh 29.2px)
- Body text (node `729:16546`): "Ocean Farmers : L'innovation sociale au service des écosystèmes. Pionnier de l'algoculture tropicale à Madagascar depuis 2010, Reunimer a bâti un modèle villageois unique, contractuel et équitable. À travers 55 villages, nous créons des emplois durables, majoritairement occupés par des femmes, tout en régénérant les milieux côtiers. Cette diversification responsable réduit la pression sur les ressources halieutiques et incarne notre engagement pour un développement solidaire."
  - Width: 512px
- Ocean Farmers logo (node `729:16558`, 209 × 68)
  - Export → `src/assets/images/engagements/logo-ocean-farmers.png`
- "EN SAVOIR PLUS" button (node `729:16429`) at y=7096
- **Key Figures block** (node `729:16551`, 487 × 247) at y=7315:
  - Section title (node `729:16549`): "L'impact social de l'algoculture à Madagascar" (Montserrat SemiBold 20px, lh 24.4px)
  - Divider line (node `729:16550`, 487px wide) at y=7282
  - 4 stat items:
    1. 55 villages engagés dans la filière
    2. 2000 familles
    3. 300 km de littoral d'activité
    4. 1800 tonnes de poissons pélagiques pêchés
  - Same style as Phase 5 key figures (Zalando Sans Black 40px + Montserrat Regular 16px)
  - Reuse `KeyFigures` component from Phase 5

**Responsive:**
- Mobile: single column, image on top, key figures 2-col grid
- Tablet: adjust proportionally

---

## Phase 9 — Notre lien aux filières

**Goal:** Build the final engagement section (ADIR, ARIPA, EcoVadis).

**Tasks:**

### Notre lien aux filières (y=7823, h=822)
- Background: part white + part gris-clair (node `729:16409`, 1440 × 402 at y=8245)
- Title (node `729:16435`): "Notre lien aux filières"
- Body text (node `729:16547`): "Membre de l'ADIR, Reunimer s'engage pour l'excellence industrielle de La Réunion. En structurant la filière pêche et en défendant la production locale, le groupe renforce la souveraineté alimentaire de l'île et valorise le savoir-faire réunionnais au cœur de l'océan Indien. Également membre de l'ARIPA, Reunimer s'engage pour une filière pêche et aquaculture structurée à La Réunion. Cette synergie interprofessionnelle assure la traçabilité des produits, la stabilité du marché et une gestion durable des ressources au service d'une économie bleue locale et performante."
  - Width: 512px
- Partner logos:
  - ARIPA logo (node `729:16596`, 207 × 207) — Export → `src/assets/images/engagements/logo-aripa.png`
  - ADIR logo (node `729:16595`, 145 × 64) — Export → `src/assets/images/engagements/logo-adir.png`
- EcoVadis medal (node `729:16545`, 304 × 295)
  - Export → `src/assets/images/engagements/medaille-ecovadis.png`
- EcoVadis description (node `729:16441`): "EcoVadis est une entreprise SaaS qui propose une gamme de solutions RSE conçues pour vous aider à gérer, à mesurer et à améliorer votre performance RSE dans l'ensemble de la chaîne de valeur."
  - Width: 445px
- "EN SAVOIR PLUS" buttons × 2 (nodes `729:16430`, `729:16431`) at y=8048

**Responsive:**
- Mobile: single column, logos center-aligned, reduce sizes proportionally
- Tablet: adjust widths, keep two-column where possible

---

## Phase 10 — Responsive Design Pass + Final Polish

**Goal:** Ensure all sections look great on tablet (768–1024px) and mobile (375–767px). Polish all details.

**Tasks:**

### 10a — Responsive Design
- **Hero**: scale height (860 → ~500px tablet, ~300px mobile), adjust text positioning, reduce title to ~28px mobile
- **Intro section**: full-width text, stack vertically
- **Engagement sections**: single column on mobile (image → text stacked), reduce image height to ~300px
- **Key figures grids**: 2 columns on mobile, reduce stat number size (~28px)
- **Section headings**: 32px → ~24px mobile
- **Body text**: 20px → ~16px mobile
- **Partner logos**: scale proportionally
- **Buttons**: adequate tap targets (min 44px)
- Test at 375px, 768px, 1024px, 1440px

### 10b — Final Polish
- Verify Navbar "Engagements" or relevant link points correctly
- Verify all spacings match Figma at 1440px
- Ensure all partner logos render correctly
- Verify key figures blocks alignment
- Clean up temporary code or comments
- Smooth scroll anchors if needed

---

## Rules

1. **One phase at a time.** Do not start the next phase until the user reviews and approves the current phase.
2. **Figma is the source of truth.** Always reference node-ids when extracting values.
3. **Use existing components.** Always check `src/components/ui/` before building anything new. Use `Container`, `SectionWrapper`, `SectionHeading`, `Button`, etc.
4. **Design tokens only.** Never hardcode colors or font sizes. Always reference Tailwind config values.
5. **Pixel-perfect at desktop.** Match the exact Figma frame at 1440px width.
6. **Responsive is my responsibility.** Figma only provides desktop. I will create tablet and mobile layouts.
7. **Assets from Figma.** Export images from Figma and save to `src/assets/images/engagements/`. Use Astro `<Image />` — never raw `<img>` tags.
8. **No GSAP yet.** CSS transitions only for hover/focus states.
9. **TypeScript props.** All components get proper TypeScript interfaces with defaults.
10. **Ask when ambiguous.** If Figma values are unclear, ask the user before guessing.

---

## Assets Needed

| Asset | Source Node | Save To |
|-------|-----------|---------|
| Hero photo (underwater/child) | `729:16401` | `src/assets/images/engagements/hero-engagements.jpg` |
| Lien à la Mer (turtle) | `729:16422` | `src/assets/images/engagements/lien-mer.jpg` |
| Lien à la Terre (planting) | `729:16414` | `src/assets/images/engagements/lien-terre.jpg` |
| Lien femmes/hommes (community) | `729:16411` | `src/assets/images/engagements/lien-femmes-hommes.jpg` |
| Lien énergie (solar panels) | `729:16399` | `src/assets/images/engagements/lien-energie.jpg` |
| Lien formation (EAMP) | `729:16417` | `src/assets/images/engagements/lien-formation.jpg` |
| Lien social (algae farming) | `729:16413` | `src/assets/images/engagements/lien-social.jpg` |
| Logo Kelonia | `729:16425` | `src/assets/images/engagements/logo-kelonia.png` |
| Logo Bôndy | `729:16426` | `src/assets/images/engagements/logo-bondy.png` |
| Logo Together | `729:16443` | `src/assets/images/engagements/logo-together.png` |
| Logo Ocean Farmers | `729:16558` | `src/assets/images/engagements/logo-ocean-farmers.png` |
| Logo ARIPA | `729:16596` | `src/assets/images/engagements/logo-aripa.png` |
| Logo ADIR | `729:16595` | `src/assets/images/engagements/logo-adir.png` |
| Médaille EcoVadis | `729:16545` | `src/assets/images/engagements/medaille-ecovadis.png` |

---

## Figma Node Reference

```
729:16398  — Engagements (full page frame, 1440 × 10058)
├── 729:16400  — Frame 2 (Hero, 1440 × 860)
│   ├── 729:16401 — Frame 62 (hero background image, 1449 × 884)
│   ├── 729:16402 — "UN ENGAGEMENT humain et ENVIRONNEMENTAL PORTEUR D'AVENIR" (40px, white)
│   ├── 729:16403 — Hero description text (Montserrat 20px, white)
│   └── 729:16404 — Header (navbar, handled by PageLayout)
│
├── 729:16597  — Frame 110 (Intro section, 1592 × 516)
│   ├── 729:16599 — "Explorez nos Engagements" (Montserrat SemiBold 32px)
│   ├── 729:16600 — Intro description (Inter Regular 16px)
│   ├── 729:16598 — Bouton-2 "TÉLÉCHARGER LE RAPPORT RSE" (298 × 47)
│   ├── 729:16437 — "LOGO ONG" (placeholder label)
│   └── 729:16438 — "ONG concernées ?" (placeholder label)
│
├── — Notre lien à la Mer (y=1531, h=785, bg gris-clair)
│   ├── 729:16418 — Rectangle 42 (bg fill #F6F6F6)
│   ├── 729:16422 — Image (742 × 785)
│   ├── 729:16420 — "Notre lien à la Mer" (Montserrat SemiBold 32px)
│   ├── 729:16421 — Body text (Montserrat Regular 20px, 445px)
│   ├── 729:16425 — Logo Kelonia (175 × 133)
│   ├── 729:16423 — Kelonia description (218 × 235)
│   └── 729:16419 — Bouton "EN SAVOIR PLUS" (190 × 53)
│
├── — Notre lien à la Terre (y=2314, h=785, bg white)
│   ├── 729:16414 — Image RIGHT (745 × 785)
│   ├── 729:16415 — "Notre lien à la Terre" (Montserrat SemiBold 32px)
│   ├── 729:16416 — Body text (445 × 220)
│   ├── 729:16426 — Logo Bôndy (117 × 159)
│   ├── 729:16424 — Bôndy description (280 × 178)
│   └── 729:16427 — Bouton "EN SAVOIR PLUS" (190 × 53)
│
├── — Notre lien aux femmes et aux hommes (y=3099, h=1063, bg gris-clair)
│   ├── 729:16406 — Rectangle 19 (bg fill #F6F6F6)
│   ├── 729:16411 — Image LEFT (737 × 1063)
│   ├── 729:16410 — "Notre lien aux femmes et aux hommes" (2 lines)
│   ├── 729:16442 — Together description (562 × 106)
│   ├── 729:16443 — Together logo (200 × 46)
│   ├── 729:16428 — Bouton "EN SAVOIR PLUS" (190 × 53)
│   └── 729:16586 — chiffres-cles (467 × 394)
│       ├── "L'impact socio-économique de Reunimer à Madagascar" (Bold 16px)
│       ├── XX personnes impactées
│       ├── XX km de Littoral
│       ├── XX pêcheurs partenaires
│       ├── XX % de femmes
│       ├── XX emplois indirects soutenus dans la filière
│       └── 1800 tonnes de poissons pélagiques pêchés
│
├── — Notre lien à l'énergie (y=4162–4947, bg white + gris-clair)
│   ├── 729:16399 — Solar panel image RIGHT (781 × 785)
│   ├── 729:16407 — Rectangle 44 (bg #F6F6F6, y=4947)
│   ├── 729:16432 — "Notre lien à l'énergie" (Montserrat SemiBold 32px)
│   └── 729:16439 — Body text (445 × 264)
│
├── — Notre lien à la santé (y=5163, text-only, bg white)
│   ├── 729:16436 — "Notre lien à la santé" (Montserrat SemiBold 32px)
│   └── 729:16544 — Body text (496 × 382)
│
├── — Notre lien à la formation (y=5732, h=785, bg white)
│   ├── 729:16417 — Image RIGHT (766 × 785)
│   ├── 729:16433 — "Notre lien à la formation" (Montserrat SemiBold 32px)
│   └── 729:16440 — Body text (445 × 326)
│
├── — Notre lien au social (y=6514, h=1141, bg gris-clair)
│   ├── 729:16408 — Rectangle 48 (bg #F6F6F6)
│   ├── 729:16413 — Image LEFT (710 × 1138)
│   ├── 729:16434 — "Notre lien au social" (Montserrat SemiBold 32px)
│   ├── 729:16548 — Subtitle (Montserrat Regular 20px)
│   ├── 729:16546 — Body text "Ocean Farmers…" (512 × 176)
│   ├── 729:16558 — Ocean Farmers logo (209 × 68)
│   ├── 729:16429 — Bouton "EN SAVOIR PLUS" (190 × 53)
│   ├── 729:16549 — "L'impact social de l'algoculture à Madagascar" (SemiBold 20px)
│   ├── 729:16550 — Divider line (487px)
│   └── 729:16551 — chiffres-cles (487 × 247)
│       ├── 55 villages engagés dans la filière
│       ├── 2000 familles
│       ├── 300 km de littoral d'activité
│       └── 1800 tonnes de poissons pélagiques pêchés
│
├── — Notre lien aux filières (y=7823, bg gris-clair + white)
│   ├── 729:16409 — Rectangle 50 (bg #F6F6F6, y=8245, 402px)
│   ├── 729:16435 — "Notre lien aux filières" (Montserrat SemiBold 32px)
│   ├── 729:16547 — Body text ADIR/ARIPA (512 × 220)
│   ├── 729:16596 — Logo ARIPA (207 × 207)
│   ├── 729:16595 — Logo ADIR (145 × 64)
│   ├── 729:16545 — Médaille EcoVadis (304 × 295)
│   ├── 729:16441 — EcoVadis description (445 × 88)
│   ├── 729:16430 — Bouton "EN SAVOIR PLUS" (190 × 53)
│   └── 729:16431 — Bouton "EN SAVOIR PLUS" (190 × 53)
│
├── 729:16404  — Header (navbar, handled by PageLayout)
└── 729:16405  — Footer (handled by PageLayout)
```
