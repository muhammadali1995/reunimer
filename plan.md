# Détail Actualités Page — Implementation Plan

**Figma source:** [Site-Reunimer / Détail Actualités](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=729-16768&m=dev)
**Figma node:** `729:16768` (frame "Détail Actualités", 1440 × 2686)

---

## Page Structure (top to bottom)

| # | Section | Figma Node | Dimensions | Background |
|---|---------|-----------|------------|------------|
| 1 | Header (navbar) | `729:16784` | — | Already in PageLayout |
| 2 | Image Gallery (3 photos) | `729:16769`, `729:16774`, `729:16775` | y=220, h=498 | White |
| 3 | Article Header (tag, date, title, nav arrows) | `729:16770-16772`, `729:16776`, `729:16779` | y=741 to ~851 | White |
| 4 | Article Body (2-column text) | `729:16782`, `729:16783` | y=852, h=355 | White |
| 5 | Footer | `729:16773` | — | Already in PageLayout |

---

## Phase 1 — Page Setup & Image Gallery

**Goal:** Create `src/pages/actualites/[slug].astro` (or static detail page) with PageLayout + 3-image gallery.

**Tasks:**
- Create page file using `PageLayout`
- Build 3-image gallery in a flex row with 10px gaps
- Image 1 (large): 574×498px — main article photo
- Image 2 (medium): 410×498px — secondary photo
- Image 3 (narrow): 152×498px — tertiary photo
- Tag "EVENTS" overlaid on first image (top-left, turquoise-ocean)
- All images: `object-cover`, `overflow-hidden`
- Use placeholder images for now

**Figma specs:**
- Image 1 (node 729:16769): x=120, y=220, 574×498
- Image 2 (node 729:16774): x=704, y=220, 410×498
- Image 3 (node 729:16775): x=1124, y=220, 152×498
- Gap between images: 704-120-574 = 10px, 1124-704-410 = 10px
- Tag (node 729:16770): x=135, y=241 — "EVENTS", turquoise-ocean bg
- Total gallery width: 574+10+410+10+152 = 1156px (within container)

---

## Phase 2 — Article Header (Date, Title, Navigation)

**Goal:** Build the date, title, and prev/next navigation arrows below the gallery.

**Tasks:**
- Date: "11 FÉV. 2026" — Inter Medium 12px, brume-alize
- Title: "Visite du Chef Thierry Marx" — Montserrat Bold 32px, bleu-abysse, 525×92
- Navigation arrows: 2 circular buttons (50×50) at the right side
  - Left arrow (previous) and right arrow (next)
  - Positioned to the right of the title, vertically aligned
- Layout: title on the left, arrows on the right

**Figma specs:**
- Date (node 729:16771): x=122, y=741, 80×12, Inter Medium 12px
- Title (node 729:16772): x=121, y=759, 525×92, Montserrat Bold 32px
- Arrow right (node 729:16776): x=1228, y=746, 50×50
- Arrow left (node 729:16779): x=1214, y=796, 50×50 (rotated 180°)

---

## Phase 3 — Article Body (2-Column Text)

**Goal:** Build the 2-column article body text.

**Tasks:**
- 2-column layout below the title area
- Each column: ~552px wide
- Gap between columns: 724-122-552 = 50px
- Text: Montserrat Regular 20px, leading 1.461, bleu-abysse
- Placeholder Lorem ipsum text

**Figma specs:**
- Left column (node 729:16782): x=122, y=852, 552×355
- Right column (node 729:16783): x=724, y=852, 552×355
- Font: Montserrat Regular 20px, line-height 1.461, bleu-abysse

---

## Phase 4 — Responsive Design

**Goal:** Make all sections responsive for tablet and mobile.

**Tasks:**
- **Image gallery:** Stack or reduce to 1-2 images on smaller screens
- **Title & arrows:** Stack arrows below title on mobile
- **Article body:** Single column on mobile, 2 columns on tablet+
- **Typography:** Scale down proportionally
- **Spacing:** Reduce gaps on smaller screens
- Ensure min 44px tap targets, no horizontal overflow

---

## Phase 5 — Polish & Navigation

**Goal:** Verify navigation and finalize.

**Tasks:**
- Ensure the page is accessible from `/actualites` listing
- Verify navbar highlights "Actualités" on this page
- Cross-check against Figma screenshot
- Clean up placeholder content

---

## Rules

1. **One phase at a time.** Do not start the next phase until the user reviews and approves.
2. **Figma is the source of truth.** Always reference node-ids when extracting values.
3. **Use existing components.** Reuse `Tag`, `Container`, `SectionHeading`, etc.
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
| Main article photo | `729:16769` | `src/assets/images/actus/chef-thierry-marx.jpg` |
| Secondary photo | `729:16774` | `src/assets/images/actus/detail-photo-2.jpg` |
| Tertiary photo | `729:16775` | `src/assets/images/actus/detail-photo-3.jpg` |
| Arrow right icon | `729:16776` | SVG inline or `src/assets/icons/arrow-right.svg` |
| Arrow left icon | `729:16779` | SVG inline or `src/assets/icons/arrow-left.svg` |

---

## Figma Node Reference

```
729:16768 — Détail Actualités (full page frame, 1440×2686)
├── 729:16784 — Header instance (navbar, handled by PageLayout)
│
├── IMAGE GALLERY (y=220, h=498)
│   ├── 729:16769 — Rectangle 25 (main photo, x=120, 574×498)
│   ├── 729:16774 — Rectangle 42 (secondary photo, x=704, 410×498)
│   └── 729:16775 — Rectangle 43 (tertiary photo, x=1124, 152×498)
│
├── ARTICLE HEADER (y=741 to ~851)
│   ├── 729:16770 — Tag "EVENTS" (turquoise-ocean, x=135, y=241 — overlaid on gallery)
│   ├── 729:16771 — Date "11 FÉV. 2026" (x=122, y=741)
│   ├── 729:16772 — Title "Visite du Chef Thierry Marx" (x=121, y=759, Montserrat Bold 32px)
│   ├── 729:16776 — Arrow right button (x=1228, y=746, 50×50)
│   └── 729:16779 — Arrow left button (x=1214, y=796, 50×50, rotated 180°)
│
├── ARTICLE BODY (y=852 to ~1207)
│   ├── 729:16782 — Left column text (x=122, 552×355, Montserrat Regular 20px)
│   └── 729:16783 — Right column text (x=724, 552×355, Montserrat Regular 20px)
│
└── 729:16773 — Footer (handled by PageLayout)
```
