# Actualités Page — Implementation Plan

**Figma source:** [Site-Reunimer / Actualités](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=729-16602&m=dev)
**Figma node:** `729:16602` (frame "Actualités", 1440 × 3462)

---

## Page Structure (top to bottom)

| # | Section | Figma Node | Dimensions | Background |
|---|---------|-----------|------------|------------|
| 1 | Page Title "ACTUALITÉS" | `729:16603` | x=122, y=192, 397×89 | White |
| 2 | Featured News (large photo + 3 small) | `729:16604` + `729:16607-09` | y=291 to ~915 | White |
| 3 | Article Grid (2 rows × 3 cols) | `729:16633-38` | y=922 to ~1970 | White |
| 4 | Footer | `729:16632` | — | Already in PageLayout |

---

## Phase 1 — Page Setup & Title

**Goal:** Create `src/pages/actualites.astro` with PageLayout + page title.

**Tasks:**
- Create `src/pages/actualites.astro` using `PageLayout`
- Page title: "ACTUALITÉS" — Zalando Sans Expanded Black 40px, uppercase, bleu-abysse
- Use `SectionHeading` component
- Title positioned at x=122, y=192 (relative to page top below navbar)
- Content within `Container`

**Figma specs:**
- Title (node 729:16603): x=122, y=192, 397×89, Zalando Sans 40px

---

## Phase 2 — Featured News Section (Left: Large Article)

**Goal:** Build the large featured article on the left side.

**Tasks:**
- Large photo area: 710×498px, with `object-cover`, overflow hidden
- Tag badge overlaid on top-left of image (e.g., "EVENTS" — turquoise-ocean bg)
- Below image: date text + large title
- Use existing `ArticleCard` component with `size="lg"`, or build custom if layout doesn't match
- The large photo is a clickable link

**Figma specs:**
- Grande-Photo-Actu (node 729:16604): x=121, y=291, 710×498
- Tag (node 729:16605): "EVENTS", turquoise-ocean bg, Montserrat SemiBold 10px, px-[7px] py-[5px]
- Date (node 729:16612): "11 FÉV. 2026", x=122, y=805
- Grand Titre (node 729:16622): "Visite du Chef Thierry Marx", x=121, y=823, 525×92, Montserrat Bold 32px, bleu-abysse

---

## Phase 3 — Featured News Section (Right: 3 Small Articles)

**Goal:** Build the 3 small horizontal article cards in a right sidebar column.

**Tasks:**
- 3 small articles stacked vertically on the right side of the featured section
- Each small article is a **horizontal layout**: thumbnail left (223×154) + text right (tag, date, title)
- Gap between image and text: ~20px
- Gap between small articles: ~18px vertical (463-291-154 = 18px)
- Tags: "FILIÈRE", "FILIÈRE", "GROUPE" — turquoise-ocean bg
- Dates: "11 FÉV. 2026" — Inter Medium 12px, brume-alize
- Titles: Montserrat Bold 20px, bleu-abysse — e.g., "Reunimer en couverture du Leader Magazine", "La langouste pour la St-Valentin", "Un engagement durable"

**Figma specs:**
- Petite-photo-actu 1 (node 729:16607): x=852, y=291, 223×154
- Petite-photo-actu 2 (node 729:16608): x=852, y=463, 223×154
- Petite-photo-actu 3 (node 729:16609): x=852, y=635, 223×154
- Tags (nodes 729:16606/10/11): x=1095, turquoise-ocean
- Dates: x=1095, y=323/495/667
- Titles (nodes 729:16623/24/25): x=1094, y=342/514/686, 209×35, Montserrat Bold 20px

**Layout calculation:**
- Left column (large photo): x=121, w=710, right edge = 831
- Gap: 852 - 831 = 21px
- Right column: x=852, total width = (1094+209) - 852 = 451px
- Overall: flex row with ~21px gap

---

## Phase 4 — Article Grid (6 Cards)

**Goal:** Build the 3-column article card grid (2 rows, 6 cards total).

**Tasks:**
- 3-column grid layout with ~57px horizontal gap
- 2 rows with ~34px vertical gap between description bottom and next row top
- Each card structure:
  1. Image placeholder (364×318px, bg #D9D9D9 or actual images)
  2. Tag badge overlaid inside image (top-left, 14px from left, 19px from top)
  3. Date: "11 FÉV. 2026" — Inter Medium 12px, brume-alize
  4. Title: "Un engagement durable" — Montserrat Bold 20px, bleu-abysse, leading-none
  5. Description excerpt: Inter Regular 16px, leading 1.4, bleu-abysse — "L'audace (nous ouvrons la voie)..."
- Extend `ArticleCard` component to support `description` prop, OR build the description inline

**Figma specs:**
- Card images (nodes 729:16633-38): 364×318 (or 363×318), bg #D9D9D9
- Card positions: x = 121, 542, 960 (row 1 y=922, row 2 y=1463)
- Horizontal gaps: ~57px (542-121-364), ~55px (960-542-363)
- Tags (nodes 729:16639-44): positioned inside images
- Dates (nodes 729:16616-21): Inter Medium 12px
- Titles (nodes 729:16626-31): Montserrat Bold 20px, 364×35
- Descriptions (nodes 729:16645-50): Inter Regular 16px, 363×110, leading 1.4

**Existing components to use:**
- `ArticleCard` — has image, tag, date, title. Missing: description excerpt. Either extend or add description as a slot/prop.
- `Tag` — already matches exactly (turquoise-ocean variant)

---

## Phase 5 — Responsive Design

**Goal:** Make all sections responsive for tablet (768–1024px) and mobile (375–767px).

**Tasks:**
- **Featured section:** Stack large article above small articles on mobile; 2-column on tablet
- **Small articles:** Stack vertically on mobile, keep horizontal thumbnail+text layout
- **Article grid:** 2 columns on tablet, 1 column on mobile
- **Typography:** Scale down proportionally at each breakpoint
- **Spacing:** Reduce gaps and padding on smaller screens
- **Images:** Maintain aspect ratios, use `object-cover`
- Ensure min 44px tap targets, no horizontal overflow

---

## Phase 6 — Navbar Link & Final Polish

**Goal:** Verify navigation and finalize.

**Tasks:**
- Verify `Navbar.astro` has Actualités link at `/actualites` (already exists — line 64-66)
- Confirm `isActive()` highlights Actualités on the page
- Verify Footer link
- Cross-check against Figma screenshot
- Clean up any placeholder content

---

## Rules

1. **One phase at a time.** Do not start the next phase until the user reviews and approves.
2. **Figma is the source of truth.** Always reference node-ids when extracting values.
3. **Use existing components.** Reuse `ArticleCard`, `Tag`, `Container`, `SectionHeading`, etc.
4. **Design tokens only.** Never hardcode colors or font sizes.
5. **Pixel-perfect at desktop.** Match the exact Figma frame at 1440px.
6. **Responsive is my responsibility.** Figma only provides desktop.
7. **Assets from Figma.** Export images to `src/assets/images/actus/`. Use Astro `<Image />`.
8. **No GSAP yet.** CSS transitions only (200-300ms ease) for hover/focus.
9. **TypeScript props.** Interfaces with defaults on every component.
10. **Ask when ambiguous.** Don't guess Figma values.

---

## Assets Needed

| Asset | Source Node | Save To |
|-------|-----------|---------|
| Featured article photo (Chef Thierry Marx) | `I729:16604;729:16854` | `src/assets/images/actus/chef-thierry-marx.jpg` |
| Small article photo 1 | `I729:16607;729:16859` | `src/assets/images/actus/article-1.jpg` |
| Small article photo 2 | `I729:16608;729:16859` | `src/assets/images/actus/article-2.jpg` |
| Small article photo 3 | `I729:16609;729:16859` | `src/assets/images/actus/article-3.jpg` |
| Grid article images (6 cards) | Placeholders (#D9D9D9) | Use existing `article-4.jpg` or placeholders |

---

## Figma Node Reference

```
729:16602 — Actualités (full page frame, 1440×3462)
├── 729:16651 — Header instance (navbar, handled by PageLayout)
├── 729:16603 — Title "Actualités" (x=122, y=192)
│
├── FEATURED SECTION (y=291 to ~915)
│   ├── 729:16604 — Grande-Photo-Actu (x=121, 710×498)
│   ├── 729:16605 — Tag "EVENTS" on large photo
│   ├── 729:16612 — Date "11 FÉV. 2026" (large article)
│   ├── 729:16622 — Grand Titre "Visite du Chef Thierry Marx" (Montserrat Bold 32px)
│   ├── 729:16607 — Petite-photo-actu 1 (x=852, 223×154)
│   ├── 729:16608 — Petite-photo-actu 2 (x=852, 223×154)
│   ├── 729:16609 — Petite-photo-actu 3 (x=852, 223×154)
│   ├── 729:16606/10/11 — Tags for small articles
│   ├── 729:16613/14/15 — Dates for small articles
│   └── 729:16623/24/25 — Titles for small articles (Montserrat Bold 20px)
│
├── ARTICLE GRID (y=922 to ~1970)
│   ├── Row 1 (y=922)
│   │   ├── 729:16633 — Card 1 image (x=121, 364×318)
│   │   ├── 729:16635 — Card 2 image (x=542, 363×318)
│   │   └── 729:16637 — Card 3 image (x=960, 364×318)
│   ├── 729:16639/41/43 — Tags (row 1)
│   ├── 729:16616/18/20 — Dates (row 1)
│   ├── 729:16626/28/30 — Titles (row 1)
│   ├── 729:16645/47/49 — Descriptions (row 1)
│   │
│   ├── Row 2 (y=1463)
│   │   ├── 729:16634 — Card 1 image (x=121, 364×318)
│   │   ├── 729:16636 — Card 2 image (x=542, 363×318)
│   │   └── 729:16638 — Card 3 image (x=960, 364×318)
│   ├── 729:16640/42/44 — Tags (row 2)
│   ├── 729:16617/19/21 — Dates (row 2)
│   ├── 729:16627/29/31 — Titles (row 2)
│   └── 729:16646/48/50 — Descriptions (row 2)
│
└── 729:16632 — Footer (handled by PageLayout)
```
