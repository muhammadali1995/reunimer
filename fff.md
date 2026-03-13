# Expertises Page — Pixel-Perfect Implementation Plan

**Scope:** Hero → Certifications (up to Figma node `729:16070`)
**Figma:** [Site-Reunimer / Expertise](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=729-16024&m=dev)
**Route:** `/expertises`

---

## Phase 1 — Hero Section (y=0 to y=940)

**Goal:** Blended ocean background + "noS expertiseS" title overlay.

**Layout (from Figma):**
- Two background images stacked with CSS `mask-image` blending:
  - Top layer: `hero.png` (boat, 729:16034) — fades to transparent at bottom
  - Bottom layer: `hero-2.png` (underwater, 729:16035) — shows through
- Title `noS expertiseS` (729:16040): x=222, y=250
  - Zalando Sans Expanded Black, 40px/44.5px, uppercase, white
  - Positioned inside Container, left-aligned
- Hero height: ~700px at desktop (content visible area before filières bar)
- Navbar overlap: `-mt-[92px]` on hero section

**Responsive:**
- Mobile: h=400px, title 28px
- Tablet: h=600px, title 36px
- Desktop: h=700px, title 40px

---

## Phase 2 — Filières Navigation Bar (y=940)

**Goal:** Horizontal colored bar with 5 expertise category labels.

**Layout (from Figma node 729:16311):**
- Total width: 1198px, centered (max-w-[1198px] mx-auto)
- 5 adjacent colored bars, flex row:
  | Label | Color | Height | Active? |
  |-------|-------|--------|---------|
  | Pêche | terre-laterite (#A34C26) | 47px | Yes (taller) |
  | Transformation | lagon-mayotte (#2D7890) | 29px | No |
  | Distribution | sable-corail (#AC8652) | 29px | No |
  | Logistique | brume-alize (#809AA0) | 29px | No |
  | RH | ecume-poudree (#6EAEB5) | 29px | No |
- Each bar: `flex-1`, centered text
- Text: Montserrat SemiBold 12px, uppercase, tracking-[1.44px], white
- Bars aligned at bottom edge (active "Pêche" is taller, extends upward)
- Position: z-20 relative (overlays the hero/pêche bg images)

**Responsive:**
- Mobile: text 8px, bar heights 36px/24px
- Tablet: text 10px, bar heights 42px/26px
- Desktop: as Figma

---

## Phase 3 — Pêche Section: Title + Intro (y=1099 to y=1385)

**Goal:** "Une pêche responsable" title + intro paragraph, with fish image on left.

**Layout:**
- Content positioned at ~42% from left (x=608 on 1440px = 42.2%)
  - Use `lg:ml-[42.2%]` or Container with offset
- Fish illustration (729:16334): x=-172, y=1185, w=735, h=279
  - PNG with transparent bg, extends beyond left page edge
  - `absolute left-[-172px] top-[1185px]` relative to section or use `absolute left-0 -translate-x-[23%]`
- Title "Une pêche responsable" (729:16310): x=608, y=1099
  - Zalando Sans Expanded Black, 40px/44.5px, uppercase, white, w=710px
- Intro text (729:16036): x=608, y=1185, w=701
  - Montserrat Regular, 20px/1.461, white

**Responsive:**
- Mobile: full-width text, fish image hidden or scaled
- Tablet: text takes more width
- Desktop: 42% offset as Figma

---

## Phase 4 — Pêche Stats: La Réunion (y=1387 to y=1695)

**Goal:** "Une puissance de pêche hauturière et australe" subsection with stats.

**Layout:**
- Subsection title (729:16062): x=608, y=1387, w=710
  - Montserrat SemiBold 20px, white, tracking-[-1px]
- Separator line (729:16064): x=608, y=1432, w=710, h=1px, white/40%
- Stats use `barre-chiffres` component pattern (flex col, gap-[18px]):
  - Location header: Inter Bold 16px, white
  - Each stat row: flex justify-between, items-end
    - Number: Zalando Sans Expanded Black 40px/44.5px, uppercase, white
    - Description: Inter Regular 16px, white, text-right, w=181px
  - Separator: 1px line, white (opacity ~40-50%), gap-[12px] below row
- Two columns at desktop:
  - Left (729:16041, w=326): "À la Réunion" → 17 longliners, 1 palangrier
  - Right (729:16046/047, w=328, x=990): 130 marins, 1800 tonnes

**Responsive:**
- Mobile: single column, full width
- Tablet: 2 columns with smaller gap
- Desktop: 2 columns at 326/328px widths

---

## Phase 5 — Pêche Stats: Madagascar + Boulogne (y=1697 to y=2410)

**Goal:** Two more location stat groups + right-side images.

**Layout:**
- "Un modèle de collecte artisanale et de mareyage" (729:16061): x=608, y=1697
  - Montserrat SemiBold 20px, white, tracking-[-1px]
- Separator line (729:16063): x=608, y=1742, w=710

**Madagascar stats (729:16054): x=612, y=1787, w=326**
  - XX collecteurs | 86 bateaux/pirogues | 5400 km littoral
  - Right side: image (729:16338) at x=988, y=1787, w=330, h=235

**Boulogne-sur-Mer stats (729:16048): x=611, y=2084, w=328**
  - 23 années d'expertise | 8 bateaux | XX tonnes
  - Right side: image (729:16339) at x=988, y=2084, w=330, h=247

**Légine subtitle (729:16037): x=608, y=2412**
  - "Reunimer sur le marché de la pêche à la légine dans les TAAF"
  - Montserrat SemiBold 20px, white

**Responsive:**
- Mobile: stats full-width, images below or hidden
- Desktop: stats left column, image right column

---

## Phase 6 — Pie Charts: Légine Quotas (y=2469 to y=2703)

**Goal:** Two donut charts showing quota data.

**Layout — two charts side by side:**
- Chart 1 (729:16322): x=608, y=2469, size=234px
  - 91% terre-laterite (#A34C26), 9% bleu-abysse (#002C41)
  - Center text: "5542 T" (Montserrat SemiBold 32px, white) + "2024/25" (Inter Regular 16px, white)
  - Top: "9%" (Inter Bold 16px, bleu-abysse)
  - Bottom: "91%" (Inter Bold 16px, white)

- Chart 2 (729:16328): x=891, y=2469, size=234px (gap = 891-608-234 = 49px)
  - 89% terre-laterite, 11% bleu-abysse
  - Center text: "4780 T" + "2025/26"
  - Top: "11%", Bottom: "89%"

**Implementation:** Use SVG `<circle>` with `stroke-dasharray` for donut charts.

**Responsive:**
- Mobile: charts stacked vertically, size 180px
- Tablet: side by side, size 200px
- Desktop: side by side, size 234px

---

## Phase 7 — Certifications (y=2786 to y=3100)

**Goal:** "Une exigence de durabilité certifiée" + logos + dates (final section, ends at node 729:16070).

**Layout:**
- Title (729:16066): x=608, y=2786, w=467
  - Montserrat SemiBold 20px, white, tracking-[-1px]
- Separator line (729:16067): x=608, y=2832, w=710, 1px white
- Description (729:16068): x=608, y=2853, w=543
  - Inter Regular 16px/1.4, white

- Two certification columns (mt-[108px] from description):
  - **MSC** (729:16071): x=608, y=2961, w=109, h=146
    - Logo image + text at x=749:
    - "Espadon (2016) / Légine (2025) / Thon Germon (2026)" (Inter Regular 16px, white)
  - **Ecolabel** (729:16121): x=975, y=2950, w=146, h=146
    - Logo image + text at x=1135:
    - "Légine (2022) / Grenadier (2025)" (Inter Regular 16px, white)
  - Gap between MSC and Ecolabel columns: ~80px (975-608-109-gap ≈ layout dependent)

**Responsive:**
- Mobile: stack logos vertically
- Desktop: side by side with ~80px gap

---

## Rules (from plan.md)

1. **One phase at a time.** Do not start the next phase until reviewed.
2. **Figma is the source of truth.** Reference node-ids for values.
3. **Use existing components.** Container, Button, etc.
4. **Design tokens only.** Use Tailwind config / tokens.css.
5. **Pixel-perfect at desktop.** Match exact Figma at 1440px.
6. **Responsive is my responsibility.** Mobile/tablet layouts self-designed.
7. **Astro `<Image />`** for all images.
8. **No GSAP.** CSS transitions only (200-300ms ease).
9. **Ask when ambiguous.**

---

## Assets Status

| Asset | File | Status |
|-------|------|--------|
| Hero boat | `hero.png` | Available |
| Hero underwater | `hero-2.png` | Available |
| Fish illustration | `peche-thon.jpg` or needs export (729:16334) | Check |
| Madagascar map image | Needs export (729:16338) | Export needed |
| Boulogne image | Needs export (729:16339) | Export needed |
| MSC logo | `/icons/logo-msc.svg` or export (729:16071) | Check |
| Ecolabel logo | `/icons/logo-ecolabel.svg` or export (729:16121) | Check |
