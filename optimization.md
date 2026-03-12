# Reunimer Site — Optimization Plan

**Scope:** Code quality, accessibility, performance, and maintainability improvements.
**Constraint:** Zero visual/design changes. Every optimization must produce identical rendered output.

---

## Issues Found

### 1. Carrières Page — Duplicated Accordion Markup

**File:** `src/pages/carrieres.astro` (lines 93–259)

Three job cards repeat ~70 lines of identical markup each. Only the data differs (title, bg color, mission text, etc.). This makes adding/removing jobs error-prone and bloats the file to 297 lines.

**Fix:** Extract a `JobCard.astro` component with typed props; drive the page from a data array.

---

### 2. Carrières Page — Accordion Accessibility Gaps

**File:** `src/pages/carrieres.astro`

- Accordion buttons lack `aria-controls` attributes pointing to their content panels.
- Content panels have no `id` attributes for ARIA pairing.
- Missing `role="region"` on expandable content.

**Fix:** Add `id="job-panel-{i}"` to each panel, `aria-controls="job-panel-{i}"` to each button.

---

### 3. Carrières Page — Hero Image Object Fit

**File:** `src/pages/carrieres.astro` (line 19)

The hero `<Image>` uses `class="w-full h-auto"` inside a fixed-height container (`h-[553px]`). On wide screens the image won't cover the container; on narrow screens it may overflow. Other pages (produits, groupe) correctly use `object-cover w-full h-full`.

**Fix:** Change to `class="w-full h-full object-cover"`.

---

### 4. Carrières Page — Hardcoded `max-height: 1000px`

**File:** `src/pages/carrieres.astro` (line 117)

The initially-expanded accordion card uses `style="max-height: 1000px;"`. If content exceeds 1000px (e.g., longer job descriptions), it clips. The JS already uses `scrollHeight` dynamically — the SSR initial state should match.

**Fix:** Use a large-enough value or use `max-height: none` with a CSS class toggle approach.

---

### 5. Carrières Page — Dead Links

**File:** `src/pages/carrieres.astro` (lines 149, 202, 254)

All three "Postuler à l'offre" buttons link to `href="#"`. These are primary CTAs with no destination.

**Fix:** Wire to real destinations (mailto:, careers form, or external job board). If not yet decided, use `href="/contact"` or `href="#footer-contact-heading"` as interim.

---

### 6. Carrières Page — Missing Testimonial Content

**File:** `src/pages/carrieres.astro` (lines 51–79)

The "Mot de la RH" section shows Johanne Serri's name and title but no actual quote. The section exists purely as a label without content — verify if this is intentional or a missing Figma export.

---

### 7. ArticleCard — Uses Raw `<img>` Instead of Astro `<Image />`

**File:** `src/components/ui/ArticleCard.astro` (line 54)

Uses `<img src={imageSrc} ...>` with a string prop. Per CLAUDE.md, all images should use Astro's `<Image />` component for optimization (WebP conversion, responsive `srcset`, lazy loading).

**Fix:** Change `imageSrc` prop type to `ImageMetadata`, use `<Image />`.

---

### 8. Actualités Page — Duplicated Small Article Markup

**File:** `src/pages/actualites.astro` (lines 100–162)

Three "small articles" in the featured section are copy-pasted with identical structure. Only image/title/tag differ.

**Fix:** Use a data array + `.map()`, or reuse the existing `ArticleCard` component with a `size="sm"` horizontal variant.

---

### 9. Actualités Page — Same Placeholder Image Everywhere

**File:** `src/pages/actualites.astro` (line 8)

All articles (featured + grid) use the same `article-4.jpg` placeholder. This is fine for development but should be flagged for content replacement before launch.

---

### 10. Navbar — Inline SVGs Repeated 6+ Times

**File:** `src/components/sections/Navbar.astro`

The search icon SVG is duplicated (desktop + mobile). The chevron SVG for language dropdowns is duplicated. The language dropdown markup is nearly identical between desktop and mobile (~40 lines each).

**Fix:** Extract repeated SVGs into small icon components or use `<Fragment>` / `set:html` patterns. Not critical, but reduces maintenance surface.

---

### 11. Footer — Contact Form Feedback Uses Inline Styles

**File:** `src/components/sections/Footer.astro` (lines 281–290)

The `showFeedback()` function sets `feedback.style.background/color/border` imperatively. This bypasses Tailwind and makes styling inconsistent.

**Fix:** Use class toggles with Tailwind utility classes instead of inline styles.

---

### 12. Footer — Form Has No Backend

**File:** `src/components/sections/Footer.astro` (line 310)

`console.log('Form data:', data)` — the contact form captures data but does nothing with it. The user sees a "success" message but nothing is actually sent.

**Fix:** Wire to a backend service (Formspree, Netlify Forms, custom API) before launch.

---

### 13. Global — No `loading="lazy"` on Below-Fold Images

**Files:** `carrieres.astro` (Johanne Serri image), `produits.astro` (product cards)

Some below-the-fold images don't specify `loading="lazy"`. Astro's `<Image />` defaults vary — explicitly setting `loading="lazy"` on non-hero images improves initial page load.

---

### 14. Global — Missing `<meta>` OG Tags

**File:** `src/layouts/BaseLayout.astro` (check needed)

Social sharing (Open Graph, Twitter Card) meta tags may be missing or incomplete. Important for a marketing site.

---

---

## Implementation Plan

All changes are **non-breaking** — each phase produces identical visual output.

### Phase 1 — Carrières Page Component Extraction (Low Risk)

**Goal:** Eliminate duplication, improve maintainability.

**Tasks:**
1. Create `src/components/ui/JobCard.astro` with props:
   - `title: string` — job title
   - `bgColor: string` — Tailwind bg class (e.g., `bg-terre-laterite`)
   - `missionTitle: string`, `missionText: string`
   - `benefitTitle: string`, `benefitText: string`
   - `extraTitle: string`, `extraText: string`
   - `applyHref: string` — CTA destination
   - `defaultExpanded?: boolean`
   - `index: number` — for ARIA ids
2. Move all accordion markup into `JobCard.astro`
3. Refactor `carrieres.astro` to use a data array + `.map()` rendering
4. Keep the accordion `<script>` in the page (unchanged behavior)
5. **Verify:** Page renders identically at all breakpoints

**Estimated scope:** ~2 files changed, ~150 lines removed from `carrieres.astro`

---

### Phase 2 — Accessibility Fixes (Low Risk)

**Goal:** Improve screen reader and keyboard navigation support.

**Tasks:**
1. **Carrières accordion:**
   - Add `id="job-panel-{i}"` to each `.job-content` div
   - Add `aria-controls="job-panel-{i}"` to each accordion `<button>`
   - Add `role="region"` and `aria-labelledby` to content panels
2. **Carrières hero image:**
   - Change `class="w-full h-auto"` to `class="w-full h-full object-cover"` (visual fix, matches other pages)
3. **Carrières dead links:**
   - Change `href="#"` on "Postuler à l'offre" to `href="#footer-contact-heading"` (interim until real job board links exist)

**Estimated scope:** ~1 file changed, ~10 lines modified

---

### Phase 3 — Actualités Cleanup (Low Risk)

**Goal:** Reduce duplication in the featured articles section.

**Tasks:**
1. Extract the 3 small featured articles into a data array
2. Render with `.map()` using the existing markup structure
3. Optionally extend `ArticleCard` with a `layout="horizontal"` variant to reuse it for the small cards

**Estimated scope:** ~1 file changed, ~80 lines reduced

---

### Phase 4 — ArticleCard Image Optimization (Medium Risk)

**Goal:** Use Astro `<Image />` for all images, enabling WebP and responsive `srcset`.

**Tasks:**
1. Change `ArticleCard.astro` prop `imageSrc` from `string` to `ImageMetadata | string`
2. When `ImageMetadata` is passed, render with `<Image />` instead of `<img>`
3. Update `actualites.astro` to pass imported image assets instead of string paths
4. Add `loading="lazy"` to all below-fold images across the site
5. **Verify:** All images render correctly, no broken paths

**Estimated scope:** ~2 files changed

---

### Phase 5 — Footer Form Feedback Cleanup (Low Risk)

**Goal:** Replace inline styles with Tailwind classes.

**Tasks:**
1. Define success/error class sets as constants
2. Replace `feedback.style.xxx = ...` with `classList.add/remove`
3. Remove the `classList.remove(...)` long string and simplify

**Estimated scope:** ~1 file changed, ~15 lines modified

---

### Phase 6 — Navbar SVG Deduplication (Low Risk, Optional)

**Goal:** Reduce duplicated SVG markup in the navbar.

**Tasks:**
1. Extract search icon SVG into a reusable inline fragment or small component
2. Consider extracting the language dropdown into a small component (desktop/mobile share same logic)
3. **Only if it clearly simplifies** — don't over-abstract

**Estimated scope:** ~1-2 files changed

---

### Phase 7 — Performance & SEO (Medium Risk)

**Goal:** Improve page load and social sharing.

**Tasks:**
1. Audit `BaseLayout.astro` for OG/Twitter meta tags — add if missing
2. Add `loading="lazy"` explicitly to all below-fold `<Image />` calls
3. Verify hero images use `loading="eager"` (above-fold, should load immediately)
4. Check that Astro's image optimization is generating WebP for all product/article images

**Estimated scope:** ~2-3 files changed

---

### Phase 8 — Pre-Launch Blockers (Requires Decisions)

These items need user/stakeholder input before implementation:

| Item | Question |
|------|----------|
| "Postuler à l'offre" links | Where should they go? (email, form, external board) |
| Contact form backend | Which service? (Formspree, Netlify Forms, custom API) |
| Johanne Serri testimonial | Is the quote text available? Or is the section intentionally label-only? |
| Placeholder article images | When will real content/images be available? |
| Legal page links (`#` hrefs) | When will Mentions légales, CGV, etc. pages be created? |

---

## Priority Matrix

| Priority | Phase | Impact | Risk |
|----------|-------|--------|------|
| High | Phase 1 — JobCard extraction | Maintainability | Low |
| High | Phase 2 — Accessibility fixes | UX / Compliance | Low |
| Medium | Phase 4 — ArticleCard images | Performance | Medium |
| Medium | Phase 7 — Performance & SEO | Performance / SEO | Medium |
| Medium | Phase 3 — Actualités cleanup | Maintainability | Low |
| Low | Phase 5 — Footer form cleanup | Code quality | Low |
| Low | Phase 6 — Navbar SVG dedup | Code quality | Low |
| Blocker | Phase 8 — Pre-launch decisions | Launch readiness | N/A |

---

## Rules

1. **No visual changes.** Every optimization must produce pixel-identical output.
2. **One phase at a time.** Complete and verify each phase before starting the next.
3. **Test at all breakpoints.** After each phase, verify at 375px, 768px, 1024px, 1440px.
4. **Preserve existing patterns.** Follow the project's established conventions (Tailwind tokens, Astro `<Image />`, TypeScript props with defaults).
5. **Don't over-abstract.** If a "cleanup" adds more complexity than it removes, skip it.
