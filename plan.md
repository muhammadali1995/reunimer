# Carrières Page — Implementation Plan

**Figma source:** [Site-Reunimer / Carrières](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=18-147&m=dev)
**Figma node:** `18:147` (frame "Carrières", 1440 × 4260)

---

## Page Structure (top to bottom)

| # | Section | Figma Node | Height | Background |
|---|---------|-----------|--------|------------|
| 1 | Hero (full-width photo strip) | `18:148` | 553px | Image |
| 2 | Notre Marque Employeur | `443:2767` | 567px | White |
| 3 | Mot de la RH (Johanne Serri) | `443:2774` | 649px | Image (grayscale) |
| 4 | Nos Offres d'Emplois (header) | `443:2775` | 354px | White |
| 5 | Job Listings (accordion) | inline nodes | ~724px | terre-laterite / nuit-australe / ecume-poudree |
| 6 | Footer | `116:1675` | — | Already in PageLayout |

---

## Phase 1 — Page Setup & Hero Section

**Goal:** Create `src/pages/carrieres.astro` with PageLayout + full-width hero image.

**Tasks:**
- Create `src/pages/carrieres.astro` using `PageLayout` (title, description, ogImage)
- Build hero: full-width background image (`visuel-carrieres`), 553px tall on desktop
- The hero has NO text overlay — it's just the photo strip showing workers in different roles
- Use `home-carriere.jpg` from `src/assets/images/carrieres/` (already exists) or export from Figma if needed
- Hero is below the fixed navbar (PageLayout already handles the 92px spacer)
- Responsive: reduce height proportionally on tablet/mobile, use `object-cover`

**Figma specs:**
- Frame 18:148: 1440×553, contains background image + header instance
- Image fills entire frame with `object-cover`

---

## Phase 2 — Notre Marque Employeur Section

**Goal:** Build the employer brand section with title + 2-column text.

**Tasks:**
- White background section, content within Container
- Title: "Notre marque employeur" — use `SectionHeading` component (Zalando Sans 40px, uppercase)
- Two-column text layout below title (gap-[63px] between columns)
- Each column: Montserrat Regular 20px, line-height 1.461, bleu-abysse
- Bold keywords within text: "donner du sens" (left column), "transmet" (right column)
- Content area: 987px wide, centered with slight right offset (left padding ~247px from edge)

**Figma specs (node 443:2767):**
- Top padding: 100px
- Content wrapper (node 443:2773): 987px wide, flex-wrap, gap 43px vertical / 63px horizontal
- Title (node 18:171): 922px wide, Zalando Sans Expanded Black 40px
- Each text column (nodes 443:2768 & 443:2770): 462px wide, Montserrat Regular 20px

**Responsive:**
- Tablet: single column, reduce font to ~18px
- Mobile: single column, reduce font to ~16px, full width

---

## Phase 3 — Mot de la RH Section

**Goal:** Build the HR director photo section with text overlay.

**Tasks:**
- Full-width section with grayscale background image of Johanne Serri (649px tall)
- The photo appears to have a grayscale/B&W treatment with slight grey tone
- Text overlay positioned on the right side (~50% from left)
- Text content:
  - "Mot de la RH" (small white text, Montserrat Regular 15px) at top-right area
  - Large gap (spacer area)
  - "**Johanne Serri**" (Montserrat Bold 15px, white)
  - "Responsable Ressource Humaine" (Montserrat Regular 13px, white)
- Export the Johanne Serri photo from Figma (node `439:2764`) and save to `src/assets/images/carrieres/`

**Figma specs (node 443:2774):**
- Full width: 1440×649
- Image: grayscale photo, covers the full frame
- Text block (node 441:2774): positioned at left=721px, top=179px, width=428px
- "Mot de la RH" text at top, name/title at bottom of the text block

**Responsive:**
- Tablet: reduce height to ~450px, adjust text position
- Mobile: reduce height to ~350px, center text or overlay at bottom with semi-transparent backdrop

---

## Phase 4 — Offres d'Emplois Header + Job Listings

**Goal:** Build the job offers title section and the accordion job listings.

**Tasks:**

### 4a — Offres d'Emplois Header (node 443:2775)
- White background, padding-top 94px
- Title: "NOS OFFRES D'EMPLOIS" — Zalando Sans 40px, uppercase, bleu-abysse
- Subtitle below (20px gap): Montserrat Regular 20px, bleu-abysse, max-width 672px
  - "Ne choisissez plus entre ambition internationale et fierté locale : bâtissez votre avenir au coeur de l'océan Indien en rejoignant les talents de Reunimer."
- Content left-aligned within Container (left padding ~247px = standard Container)

### 4b — Job Listings Accordion
Three job cards stacked vertically, each full-width with colored backgrounds:

**Job 1 — EXPANDED (terre-laterite #A34C26, 476px)**
- Title: "Lieutenant de Pêche (H/F) – Flotte Océan Indien" (Montserrat SemiBold 20px, white)
- Chevron icon top-right (rotated 180° = pointing up = expanded state)
- Divider line below title (white, 1px)
- Two-column content below:
  - Left column (487px): "**Votre Mission :**" (Inter Bold) + description (Inter Regular 16px)
  - Right column (487px): "**Pourquoi nous rejoindre ?**" + text, "**Transmission :**" + text
- "Postuler à l'offre" button (outline-light variant from Button component)
- Content padding: left ~101px, top ~49px from title

**Job 2 — COLLAPSED (nuit-australe #587682, 124px)**
- Title: "Technicien de Maintenance Industrielle (H/F) – Site de Transformation"
- Chevron icon right (pointing down = collapsed)
- Title vertically centered

**Job 3 — COLLAPSED (ecume-poudree #6EAEB5, 124px)**
- Title: "Chargé(e) de Qualité et Développement Durable (H/F) – RSE"
- Chevron icon right (pointing down = collapsed)
- Title vertically centered

### Accordion behavior (JavaScript):
- Click a collapsed card → expand it (animate height), collapse the currently open card
- Toggle chevron direction on expand/collapse
- Only one card open at a time

**Responsive:**
- Tablet: reduce padding, single-column content for expanded job
- Mobile: full-width, single-column, smaller font sizes, adequate tap targets

---

## Phase 5 — Responsive Design Pass

**Goal:** Ensure all sections look great on tablet (768–1024px) and mobile (375–767px).

**Tasks:**
- **Hero:** Scale height proportionally (md:h-[400px], h-[280px])
- **Marque Employeur:** Stack columns vertically on mobile, reduce font sizes
- **Mot de la RH:** Reduce height, reposition text overlay for smaller screens, add backdrop for readability
- **Offres d'Emplois:** Adjust padding and font sizes
- **Job Listings:** Single-column expanded content on mobile, ensure accordion tap targets are adequate (min 44px)
- Test at 375px, 768px, 1024px, and 1440px breakpoints
- Verify no horizontal overflow at any width
- Ensure text readability and proper spacing at all sizes

---

## Phase 6 — Navbar Link & Final Polish

**Goal:** Wire up the Carrières link in the navbar and finalize everything.

**Tasks:**
- Verify `Navbar.astro` already has the Carrières link pointing to `/carrieres` (it does — line 68-70)
- Confirm the `isActive()` function highlights Carrières when on `/carrieres`
- Verify the Footer "Carrières" link also points to `/carrieres`
- Check page loads correctly in dev server
- Verify smooth page transitions and navigation
- Cross-check final output against Figma screenshot for pixel-accuracy
- Clean up any temporary code or comments

---

## Rules

1. **One phase at a time.** Do not start the next phase until the user reviews and approves the current phase.
2. **Figma is the source of truth.** Always reference node-ids when extracting values. Use `get_design_context` and `get_screenshot` for each section.
3. **Use existing components.** Always check `src/components/ui/` before building anything new. Use `Container`, `SectionWrapper`, `SectionHeading`, `Button`, etc.
4. **Design tokens only.** Never hardcode colors or font sizes. Use Tailwind config values and CSS custom properties from `tokens.css`.
5. **Pixel-perfect at desktop.** Match the exact Figma frame at 1440px width — spacings, paddings, gaps, font sizes.
6. **Responsive is my responsibility.** Figma only provides desktop. I will create tablet (768-1024px) and mobile (375-767px) layouts following the patterns in CLAUDE.md.
7. **Assets from Figma.** Export images from Figma and save to `src/assets/images/carrieres/`. Use Astro `<Image />` component — never raw `<img>` tags.
8. **No GSAP yet.** Animations are added in a separate pass after all sections are built. Use CSS transitions (200-300ms ease) for hover/focus states only.
9. **TypeScript props.** All components get proper TypeScript interfaces with defaults.
10. **Ask when ambiguous.** If Figma values are unclear or conflicting, ask the user before guessing.

---

## Assets Needed

| Asset | Source Node | Save To |
|-------|-----------|---------|
| Hero photo strip (workers) | `443:2766` | `src/assets/images/carrieres/visuel-carrieres.jpg` (or use existing `home-carriere.jpg`) |
| Johanne Serri photo | `439:2764` | `src/assets/images/carrieres/johanne-serri.jpg` |
| Chevron down icon (for accordion) | `441:2788` | SVG inline or `src/assets/icons/chevron-down.svg` |

---

## Figma Node Reference

```
18:147   — Carrières (full page frame)
├── 18:148    — Hero (Frame 2, 1440×553)
│   ├── 443:2766 — visuel-carrieres 1 (background image)
│   └── 18:372   — Header instance (navbar, handled by PageLayout)
├── 443:2767  — Marque Employeur (Frame 111, 1440×567)
│   └── 443:2773 — Content wrapper (987×355, flex-wrap)
│       ├── 18:171   — Title "Notre marque employeur"
│       ├── 443:2768 — Left text column (462px)
│       └── 443:2770 — Right text column (462px)
├── 443:2774  — Mot de la RH (Frame 113, 1440×649)
│   ├── 439:2764 — Photo Johanne Serri (background)
│   └── 441:2774 — Text overlay (Mot de la RH + name)
├── 443:2775  — Offres d'Emplois header (Frame 114, 1440×354)
│   ├── 441:2777 — Title "Nos OFFRES D'EMPLOIS"
│   └── 441:2785 — Subtitle text
├── 441:2776  — Job 1 bg (terre-laterite, 1440×476)
├── 441:2781  — Job 2 bg (nuit-australe, 1440×124)
├── 441:2783  — Job 3 bg (ecume-poudree, 1440×124)
├── 441:2779  — Job 1 title
├── 441:2792  — Job 1 left content (Mission)
├── 443:2776  — Job 1 right content (Pourquoi + Transmission)
├── 441:2793  — "Postuler à l'offre" button
├── 441:2796  — Divider line
├── 441:2782  — Job 2 title
├── 441:2784  — Job 3 title
├── 441:2786  — Chevron (expanded, rotated 180°)
├── 441:2788  — Chevron (collapsed)
├── 441:2789  — Chevron (collapsed)
└── 116:1675  — Footer (handled by PageLayout)
```
