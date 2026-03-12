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

### 15. Produits Page — Product Data Inline in Page File

**File:** `src/pages/produits.astro` (lines 8–29)

9 image imports and the products array are defined directly in the page. Same pattern we fixed on carrières — data should live in `src/data/products.ts` with a typed interface in `src/types/products.ts`.

**Fix:** Extract `Product` interface to `src/types/products.ts`, move data to `src/data/products.ts`, import in page.

---

### 16. Produits Page — CTA Pill Button Duplicated (Not Using Button Component)

**File:** `src/pages/produits.astro` (lines 103–125), `src/components/ui/ProductCard.astro` (lines 55–75)

The turquoise pill CTA at the bottom of the page and the white hover CTA on each ProductCard are both hand-coded `<a>` tags with inline SVG arrows. The existing `Button` component already handles the arrow SVG and shared typography — but it lacks a `pill` variant for rounded-[47px] pill-shaped CTAs.

**Fix:** Add a `pill` (or `pill-primary` / `pill-light`) variant to `Button.astro`. Replace the inline CTAs in both files.

---

### 17. Produits Page — Hardcoded Fallback Color in ProductCard

**File:** `src/components/ui/ProductCard.astro` (line 34)

`bg-[#DACBB4]` is a hardcoded hex value not in the design tokens. If this is a real design token (used across multiple places), it should be added to `tailwind.config.mjs`. If it's a one-off fallback, it's acceptable but should be documented.

**Fix:** Add to Tailwind config as `sable-clair` or similar, or accept as-is and document.

---

### 18. Produits Page — Product Images Missing `loading="lazy"`

**File:** `src/components/ui/ProductCard.astro` (line 35–41)

Product card images don't specify `loading="lazy"`. Only the first 1–2 cards are visible above fold — the remaining 7 should lazy-load.

**Fix:** Add `loading="lazy"` to the `<Image />` in ProductCard. Optionally accept a `loading` prop so the first card can use `"eager"`.

---

### 19. Produits Page — Hover CTA Inaccessible on Touch Devices

**File:** `src/components/ui/ProductCard.astro` (lines 54–75)

The "Contactez-nous" hover CTA uses `opacity-0 group-hover:opacity-100`. On mobile/tablet (touch devices), hover states don't work — the CTA is invisible and unreachable. The bottom-of-page CTA partially compensates, but individual card CTAs are lost.

**Fix:** Make hover CTA always visible on touch devices via `@media (hover: none)` or show it on focus-within. Alternatively, make the entire card clickable on mobile.

---

### 20. Produits Page — ProductCard Props Interface Not in Types Directory

**File:** `src/components/ui/ProductCard.astro` (lines 15–21)

The `Props` interface is defined inline in the component. Following the pattern established for carrières, it should be in `src/types/products.ts` for reuse and consistency.

**Fix:** Move to `src/types/products.ts` alongside the `Product` data type.

---

### 21. Actualités Page — Article Data Inline in Page Frontmatter

**File:** `src/pages/actualites.astro` (lines 10–53)

The `gridArticles` array (6 items) is defined inline in the page frontmatter with no TypeScript interface. The `as const` casts on `tagColor` are a workaround for missing type safety. Following the pattern from carrières and produits, this should live in `src/data/articles.ts` with a typed interface in `src/types/articles.ts`.

**Fix:** Create `Article` interface in `src/types/articles.ts`, move data to `src/data/articles.ts`.

---

### 22. Actualités Page — Featured Section Doesn't Reuse ArticleCard

**File:** `src/pages/actualites.astro` (lines 70–162)

The featured section has a large article (lines 73–95) and 3 small articles (lines 101–161) all built with inline markup (~90 lines). The existing `ArticleCard` component already has a `size` prop (`'sm' | 'lg'`), but the featured section doesn't use it at all — only the grid section does.

The 3 small featured articles are particularly wasteful: each repeats ~20 lines of identical structure (image, tag, date, title) differing only in data. They also use a horizontal layout (`flex flex-row`) that `ArticleCard` doesn't support.

**Fix:**
1. Extract the 3 small articles into a `featuredSmallArticles` data array + `.map()`
2. Add a `layout` prop (`'vertical' | 'horizontal'`) to `ArticleCard` for the horizontal small variant
3. Use `ArticleCard size="lg"` for the large featured article
4. The featured large article's data should also come from the data file

---

### 23. Actualités Page — ArticleCard `href` Defaults to `#`

**File:** `src/components/ui/ArticleCard.astro` (line 38)

`href` defaults to `'#'`, which is a dead link. Every article card is wrapped in an `<a>` tag, so a missing `href` produces a broken navigation. Clicking a `#` link scrolls to the top of the page — confusing UX.

**Fix:** Either make `href` required (no default) or default to a more meaningful fallback. Making it required is preferred — it forces the caller to provide a real link.

---

### 24. Actualités Page — ArticleCard Uses Raw `<img>` Instead of `<Image />`

**File:** `src/components/ui/ArticleCard.astro` (lines 51–56)

The component uses `<img src={imageSrc}>` with a `string` prop. Per project rules, all images must use Astro's `<Image />` for WebP conversion, responsive `srcset`, and automatic optimization. The featured section inline markup correctly uses `<Image />`, but `ArticleCard` does not.

**Fix:** Change `imageSrc` type to `ImageMetadata`, use `<Image />` instead of `<img>`. Update all callers to pass imported image assets.

---

### 25. Actualités Page — Placeholder Fallback Color `#D9D9D9` Not in Tokens

**File:** `src/components/ui/ArticleCard.astro` (line 58)

`bg-[#D9D9D9]` is a hardcoded hex not in the design token system. If it's a standard placeholder gray, it should be in `tailwind.config.mjs`.

**Fix:** Add to Tailwind config as a placeholder token (e.g., `gris-placeholder`) or use an existing neutral like `gris-clair`.

---

### 26. Actualités Page — Featured Large Article Data Hardcoded

**File:** `src/pages/actualites.astro` (lines 73–95)

The large featured article has its data (title "Visite du Chef Thierry Marx", date "11 FÉV. 2026", tag "EVENTS", image) all hardcoded directly in the template. This should come from the same data source as the other articles, with a `featured: true` flag or similar.

**Fix:** Include the featured article in the articles data file with a `featured` property. Render from data, not inline markup.

---

### 27. Article Detail — All Data Hardcoded in Static File

**File:** `src/pages/actualites/visite-chef-thierry-marx.astro`

The entire article detail page has all data (title, date, tag, images, body text) hardcoded directly in the template. This is a single static `.astro` file — if more articles are added, each would need its own copy-pasted file with the same structure. Not scalable.

**Fix:** Extract article detail data into the articles data source (or Astro content collections). Use a dynamic route (`[slug].astro`) to render all articles from a single template.

---

### 28. Article Detail — Navigation Arrows Dead Links

**File:** `src/pages/actualites/visite-chef-thierry-marx.astro` (lines 68, 77)

Both prev/next navigation arrows use `href="#"` — dead links. These should navigate to the previous and next articles in the list.

**Fix:** Compute prev/next article slugs from the articles data and wire the `href` values. If only one article exists, hide or disable the arrows.

---

### 29. Article Detail — Navigation Arrow Buttons Duplicated

**File:** `src/pages/actualites/visite-chef-thierry-marx.astro` (lines 67–84)

The prev and next arrow buttons repeat ~8 lines of identical markup (circle container, SVG), differing only in the SVG path direction and aria-label. Could be a small reusable pattern or loop.

**Fix:** Extract into a data-driven loop or a small `ArrowButton` fragment. Low priority — only 2 instances.

---

### 30. Article Detail — No Back-to-List Navigation

**File:** `src/pages/actualites/visite-chef-thierry-marx.astro`

There is no breadcrumb or "back to Actualités" link. Users can only navigate via the browser back button or the nav. A breadcrumb or back link improves UX and SEO (structured data).

**Fix:** Add a breadcrumb or back link above the gallery (e.g., "Actualités > Visite du Chef Thierry Marx").

---

### 31. Article Detail — Gallery Images Identical Alt Text

**File:** `src/pages/actualites/visite-chef-thierry-marx.astro` (lines 21, 33, 43)

All three gallery images have the same `alt="Visite du Chef Thierry Marx"`. Each image should have a distinct, descriptive alt text for accessibility. With placeholder images this is expected, but the structure should support unique alts per image.

**Fix:** When real images are provided, ensure each has a distinct alt. Structure the data to support an array of gallery images with individual alt texts.

---

### 32. Article Detail — Placeholder Body Content

**File:** `src/pages/actualites/visite-chef-thierry-marx.astro` (lines 94–99)

The body text is lorem ipsum ("Ipsunda ime non cumquat...") — the two paragraphs are identical. This is fine for development but must be replaced before launch. The article body should also support rich content (headings, lists, links) — currently it's just plain `<p>` tags.

**Fix:** When migrating to content collections, use Markdown/MDX for article bodies to support rich formatting.

---

### 33. Article Detail — Not Scalable (Single Static File)

**File:** `src/pages/actualites/visite-chef-thierry-marx.astro`

This is a single hardcoded page. Every new article would require creating a new `.astro` file with copy-pasted layout. This doesn't scale.

**Fix:** Migrate to Astro content collections or a dynamic `[slug].astro` route that renders from a data source. This is the most impactful change for the article system.

---

### 34. Navbar — Nav Links Data Inline in Component

**File:** `src/components/sections/Navbar.astro` (lines 21–71)

The `navLinks` array (~50 lines) with all navigation structure is defined inline in the component frontmatter. Following the established pattern (footer, articles, products, carrières), this data should live in `src/data/navbar.ts` with types in `src/types/navbar.ts`.

**Fix:** Create `NavLink` / `NavChild` interfaces in `src/types/navbar.ts`, move `navLinks` to `src/data/navbar.ts`.

---

### 35. Navbar — Search Icon SVG Duplicated

**File:** `src/components/sections/Navbar.astro` (lines 148–150, 260–262)

Identical search icon SVG path (~4 lines) repeated for desktop and mobile. Minor duplication but easy to DRY up.

**Fix:** Extract into a constant or inline fragment.

---

### 36. Navbar — Chevron SVG Duplicated

**File:** `src/components/sections/Navbar.astro` (lines 165–167, 273–275)

Identical chevron SVG for language dropdown repeated for desktop and mobile.

**Fix:** Extract alongside search icon.

---

### 37. Navbar — Lang Dropdown Markup Duplicated

**File:** `src/components/sections/Navbar.astro` (lines 154–194, 264–301)

Desktop and mobile language dropdowns share nearly identical markup (~30 lines each): button with label + chevron, dropdown with FR/EN options + checkmark SVGs. They differ only in `id` prefixes and positioning classes.

**Fix:** Extract into a data-driven loop or fragment. The JS `initLangDropdown()` already handles both via id prefix — the markup should follow the same pattern.

---

### 38. Navbar — Lang Option Button Class Duplicated

**File:** `src/components/sections/Navbar.astro` (lines 175, 185, 283, 293)

The same long class string for lang option buttons is repeated 4 times:
`"lang-option w-full flex items-center justify-between px-4 py-2 font-heading font-semibold text-xs tracking-[1.44px] uppercase text-bleu-abysse hover:bg-gris-clair transition-colors cursor-pointer bg-transparent border-none"`

**Fix:** Extract to a constant in frontmatter.

---

### 39. Navbar — Checkmark SVG Duplicated 4 Times

**File:** `src/components/sections/Navbar.astro` (lines 179–181, 189–191, 287–289, 297–299)

Identical checkmark SVG repeated in all 4 lang option buttons (2 desktop + 2 mobile).

**Fix:** Use a constant or inline with `set:html`.

---

---

### 40. ExpertiseCard — Uses Raw `<img>` Instead of `<Image />`

**File:** `src/components/ui/ExpertiseCard.astro` (line 56)

Uses `<img src={imageSrc}>` with a `string` prop. Per project rules, all images must use Astro's `<Image />` component.

**Fix:** Change `imageSrc` prop type to `ImageMetadata`, use `<Image />`.

---

### 41. ExpertiseCard — `href` Defaults to `'#'`

**File:** `src/components/ui/ExpertiseCard.astro` (line 36)

`href` defaults to `'#'` — same dead link issue we fixed in ArticleCard.

**Fix:** Make `href` required (no default).

---

### 42. FormField Component — Exists but Never Used

**File:** `src/components/ui/FormField.astro`

A fully built form field component exists with support for text/email/select/textarea types — but the Footer builds all form fields inline instead of using it. This is dead code.

**Fix:** Either refactor Footer to use `FormField`, or delete the component if it's a leftover.

---

### 43. Carrières Hero Image — Still Uses `h-auto` (Unfixed Issue #3)

**File:** `src/pages/carrieres.astro` (line 20)

The hero `<Image>` uses `class="w-full h-auto"` inside a fixed-height container. This was identified in Issue #3 but never fixed during Phase 2.

**Fix:** Change to `class="w-full h-full object-cover"`.

---

## Implementation Plan (continued)

(Issues 34–39 are addressed in Phases 6 and 6b. Issues 40–43 in Phase 14.)

---

**File:** `src/pages/actualites/visite-chef-thierry-marx.astro`

This is a single hardcoded page. Every new article would require creating a new `.astro` file with copy-pasted layout. This doesn't scale.

**Fix:** Migrate to Astro content collections or a dynamic `[slug].astro` route that renders from a data source. This is the most impactful change for the article system.

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

### Phase 3 — Actualités: Data & Types Extraction (Low Risk)

**Goal:** Separate article data and types from the page file, matching the carrières/produits pattern.

**Tasks:**
1. Create `src/types/articles.ts` with `Article` interface:
   - `tag: string`, `tagColor: 'bleu-abysse' | 'turquoise-ocean' | 'sable-corail'`
   - `date: string`, `title: string`, `description?: string`
   - `image: ImageMetadata`, `imageAlt: string`
   - `href: string`
   - `featured?: 'large' | 'small'` — marks featured section articles
2. Create `src/data/articles.ts` with all articles (1 featured large + 3 featured small + 6 grid)
3. Update `src/pages/actualites.astro` to import from `data/articles` — filter by `featured` for the sections
4. Remove inline `gridArticles` array and `as const` casts from page
5. **Verify:** Page renders identically

**Estimated scope:** 3 files (2 new, 1 modified), page reduced by ~50 lines

---

### Phase 4 — Actualités: Featured Section Deduplication (Low Risk)

**Goal:** Eliminate 60+ lines of duplicated featured article markup using data arrays + `.map()`.

**Tasks:**
1. Extract the 3 small featured articles (lines 101–161) into a `.map()` loop driven by data from `data/articles.ts`
2. Extract the large featured article (lines 73–95) to also render from data
3. Keep the existing inline markup structure (no ArticleCard reuse yet — that's Phase 4b)
4. **Verify:** Featured section renders identically at all breakpoints

**Estimated scope:** 1 file modified, ~60 lines reduced

---

### Phase 4b — ArticleCard Component Improvements (Medium Risk)

**Goal:** Upgrade `ArticleCard` to support all article layouts and use Astro `<Image />`.

**Tasks:**
1. Change `imageSrc` prop type from `string` to `ImageMetadata`
2. Replace `<img>` with `<Image />` for WebP/srcset optimization
3. Add `layout` prop (`'vertical' | 'horizontal'`) — horizontal layout for featured small articles
4. Make `href` required (remove `'#'` default) to prevent dead links
5. Replace `bg-[#D9D9D9]` placeholder with a design token or existing neutral
6. Update `actualites.astro` to use `ArticleCard` in the featured section (replace remaining inline markup)
7. **Verify:** All article cards render identically, images optimized

**Estimated scope:** 2 files modified

---

### Phase 5 — Footer Form Feedback Cleanup (Low Risk)

**Goal:** Replace inline styles with Tailwind classes.

**Tasks:**
1. Define success/error class sets as constants
2. Replace `feedback.style.xxx = ...` with `classList.add/remove`
3. Remove the `classList.remove(...)` long string and simplify

**Estimated scope:** ~1 file changed, ~15 lines modified

---

### Phase 6 — Navbar Data & Types Extraction (Low Risk)

**Goal:** Move nav links data to `src/data/navbar.ts` and types to `src/types/navbar.ts`, matching the established pattern.

**Tasks:**
1. Create `src/types/navbar.ts` with `NavChild` and `NavLink` interfaces
2. Create `src/data/navbar.ts` with the `navLinks` array (move from Navbar.astro frontmatter)
3. Update `Navbar.astro` to import from `../../data/navbar`
4. **Verify:** Navbar renders identically, dropdowns work, mobile menu works

**Estimated scope:** 3 files (2 new, 1 modified), ~50 lines moved out of Navbar.astro

---

### Phase 6b — Navbar SVG & Markup Deduplication (Low Risk, Optional)

**Goal:** Reduce duplicated SVG and lang dropdown markup in the navbar.

**Tasks:**
1. Extract `langOptionClasses` constant in frontmatter (repeated 4×)
2. Define `languages` data array (`[{ code: 'fr', label: 'FR' }, { code: 'en', label: 'EN' }]`)
3. Extract `searchIconSvg` and `chevronSvg` and `checkSvg` as constants
4. Render lang option buttons via `.map()` for both desktop and mobile
5. **Only if it clearly simplifies** — don't over-abstract

**Estimated scope:** 1 file modified, ~40 lines reduced

---

### Phase 8 — Produits Page: Data & Types Extraction (Low Risk)

**Goal:** Separate product data and types from the page file, matching the carrières pattern.

**Tasks:**
1. Create `src/types/products.ts` with `Product` interface:
   - `name: string`, `origin: string`, `image: ImageMetadata`, `alt: string`
2. Create `src/data/products.ts` with the 9-product array (move imports + data from page)
3. Update `src/pages/produits.astro` to import from `data/products`
4. **Verify:** Page renders identically

**Estimated scope:** 3 files (2 new, 1 modified), page reduced by ~20 lines

---

### Phase 9 — Produits Page: Button Pill Variant + CTA Deduplication (Low Risk)

**Goal:** Eliminate duplicated pill CTA markup by extending the existing Button component.

**Tasks:**
1. Add `pill-primary` variant to `Button.astro`:
   - `bg-turquoise-ocean rounded-[47px] px-[22px] py-[18px] text-white text-xs tracking-[1.44px]`
2. Add `pill-light` variant to `Button.astro`:
   - `bg-white rounded-[47px] px-[22px] py-[18px] text-bleu-abysse text-xs tracking-[1.44px]`
3. Replace the inline CTA `<a>` in `produits.astro` (lines 103–125) with `<Button variant="pill-primary" href="#footer-contact-heading">`
4. Replace the inline CTA `<a>` in `ProductCard.astro` (lines 55–75) with `<Button variant="pill-light" href="#footer-contact-heading">`
5. **Verify:** Both CTAs render identically (same padding, radius, typography, arrow)

**Estimated scope:** 3 files modified

---

### Phase 10 — Produits Page: Lazy Loading + Touch Accessibility (Medium Risk)

**Goal:** Improve performance and mobile UX for product cards.

**Tasks:**
1. Add `loading="lazy"` to the `<Image />` in `ProductCard.astro`
2. Add touch-device support for hover CTA using one of:
   - Option A: `@media (hover: none) { .group .hover-cta { opacity: 1; } }` — always show on touch
   - Option B: Use `focus-within` — show CTA when card receives focus
   - Option C: Make entire card a link on mobile (wrap in `<a>`) — simplest UX
3. **Verify:** Cards lazy-load below fold, CTA accessible on mobile

**Estimated scope:** 1 file modified + possibly `global.css`

---

### Phase 12 — Article Detail: Quick Wins (Low Risk)

**Goal:** Fix dead links, reduce duplication, and improve navigation on the detail page.

**Tasks:**
1. Fix prev/next arrow `href="#"` dead links — disable or hide when no adjacent article exists
2. Add a "back to Actualités" breadcrumb or link above the gallery
3. Extract the prev/next arrow buttons into a small loop (identical markup, only path + aria-label differ)
4. Ensure gallery images have distinct alt texts (structure to support per-image alts)
5. **Verify:** Page renders identically except for the added breadcrumb

**Estimated scope:** 1 file modified

---

### Phase 13 — Article Detail: Dynamic Route Migration (Medium Risk)

**Goal:** Make the article system scalable by using a single template for all articles.

**Tasks:**
1. Create `src/content/articles/` directory with Markdown/MDX files for article content
2. Configure Astro content collections schema (title, date, tag, tagColor, images, slug)
3. Create `src/pages/actualites/[slug].astro` — dynamic route rendering from content collection
4. Extract the article detail layout into a reusable template (gallery, header, body, nav arrows)
5. Compute prev/next article links from the collection
6. Delete the static `visite-chef-thierry-marx.astro` file
7. Update `src/data/articles.ts` to derive from the content collection (or replace with collection queries)
8. **Verify:** Existing article URL `/actualites/visite-chef-thierry-marx` still works

**Estimated scope:** 3–4 files (1 new dynamic route, 1 content config, content files, 1 deleted)

---

### Phase 14 — UI Component Cleanup (Low Risk)

**Goal:** Fix remaining component issues: raw `<img>`, dead links, unused code, hero image fit.

**Tasks:**
1. **ExpertiseCard** — Change `imageSrc: string` to `image: ImageMetadata`, replace `<img>` with `<Image />`, make `href` required
2. **FormField** — Delete `FormField.astro` (unused component — Footer has its own inline form with different styling)
3. **Carrières hero** — Change `class="w-full h-auto"` to `class="w-full h-full object-cover"` (Issue #3)
4. **Verify:** No regressions on carrières page, ExpertiseCard still works in ui-preview

**Estimated scope:** 2–3 files modified, 1 file deleted

---


## Priority Matrix

| Priority | Phase | Impact | Risk | Status |
|----------|-------|--------|------|--------|
| ~~High~~ | ~~Phase 1 — JobCard extraction~~ | ~~Maintainability~~ | ~~Low~~ | Done |
| ~~High~~ | ~~Phase 2 — Accessibility fixes~~ | ~~UX / Compliance~~ | ~~Low~~ | Done |
| ~~High~~ | ~~Phase 8 — Produits data/types extraction~~ | ~~Maintainability~~ | ~~Low~~ | Done |
| ~~High~~ | ~~Phase 9 — Button pill variant + CTA dedup~~ | ~~Maintainability~~ | ~~Low~~ | Done |
| ~~Medium~~ | ~~Phase 10 — Produits lazy load + touch a11y~~ | ~~Performance / UX~~ | ~~Medium~~ | Done |
| ~~High~~ | ~~Phase 3 — Actualités data/types extraction~~ | ~~Maintainability~~ | ~~Low~~ | Done |
| ~~High~~ | ~~Phase 4 — Actualités featured dedup~~ | ~~Maintainability~~ | ~~Low~~ | Done |
| ~~Medium~~ | ~~Phase 4b — ArticleCard improvements~~ | ~~Performance / UX~~ | ~~Medium~~ | Done |
| ~~High~~ | ~~Phase 12 — Article detail quick wins~~ | ~~UX / A11y~~ | ~~Low~~ | Done |
| ~~High~~ | ~~Phase 13 — Article detail dynamic route~~ | ~~Scalability~~ | ~~Medium~~ | Done |
| ~~Low~~ | ~~Phase 5 — Footer form cleanup~~ | ~~Code quality~~ | ~~Low~~ | Done |
| ~~Medium~~ | ~~Phase 6 — Navbar data/types extraction~~ | ~~Maintainability~~ | ~~Low~~ | Done |
| ~~Low~~ | ~~Phase 6b — Navbar SVG/markup dedup~~ | ~~Code quality~~ | ~~Low~~ | Done |
| ~~Low~~ | ~~Phase 14 — UI component cleanup~~ | ~~Code quality~~ | ~~Low~~ | Done |

---

## Rules

1. **No visual changes.** Every optimization must produce pixel-identical output.
2. **One phase at a time.** Complete and verify each phase before starting the next.
3. **Test at all breakpoints.** After each phase, verify at 375px, 768px, 1024px, 1440px.
4. **Preserve existing patterns.** Follow the project's established conventions (Tailwind tokens, Astro `<Image />`, TypeScript props with defaults).
5. **Don't over-abstract.** If a "cleanup" adds more complexity than it removes, skip it.
