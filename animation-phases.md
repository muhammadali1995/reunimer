# Animation Implementation Phases

## Phase 1 — Global Scroll-Reveal: Headings ✅
Add scroll-triggered fade-in for `h1`, `h2`, `.page-title` elements using existing `animation.js` utilities.
- `src/scripts/globalAnimations.js` — `initHeadingReveal()` fades in headings (y:30→0, autoAlpha 0→1)
- Skips elements with `[data-anim]` to avoid conflicts with page-specific scripts
- Loaded globally from `PageLayout.astro`

## Phase 2 — Global Scroll-Reveal: Secondary Elements ✅
Add slide-from-left entrance for descriptions and `.btn` elements on scroll.
- `initSecondaryReveal()` in `globalAnimations.js` — slides `<p>` and `.btn` from left (x:-40→0, autoAlpha 0→1)
- Scoped to `main` to avoid animating nav/footer content
- Skips `[data-anim]` elements, triggers at `top 88%`

## Phase 3 — Global Scroll-Reveal: Staggered Containers ✅
Add staggered slide-up for `[data-stagger]` container children.
- `initStaggeredContainers()` in `globalAnimations.js` — children fade up with 0.15s stagger
- Added `data-stagger` to: ImplantationsSection grid, FilialesSection grid, IntegratedModelSection cards, HomeActualitesSection cards

## Phase 4 — Stat Counter Animation ✅
Animate `[data-count-value]` numbers from 0 to target on scroll-reveal.
- `initStatCounters()` in `globalAnimations.js` — tweens counter object 0→target over 1.8s
- Reads `data-count-value`, `data-count-decimals`, `data-count-prefix`, `data-count-suffix`
- Formats with comma decimal separator (French locale)

## Phase 5 — SVG Circle Chart Animation ✅
Animate `[data-circle-chart]` SVG circles from 0 to target stroke-dasharray on scroll.
- `initCircleCharts()` in `globalAnimations.js` — generic opt-in via `data-circle-chart`
- Existing SVG donuts (ExpertisesFishing, ExpertisesRh) already animated by `expertisesPage.js`
- Existing conic-gradient donut (WorldStats) already animated by `groupePage.js`

## Phase 6 — Navbar Hide/Show on Scroll ✅
Add scroll-direction detection: `translateY(-100%)` on scroll-down, `translateY(0)` on scroll-up.
- `initNavbarScrollToggle()` in `globalAnimations.js`
- Uses ScrollTrigger `onUpdate` with `self.direction` for scroll direction
- Only hides after scrolling past 120px (navbar height threshold)
- 0.3s hide / 0.25s show transitions

## Phase 7 — Homepage Marquee ✅
Refined filiales marquee to be smoother and slower.
- Duration 22s → 40s for slower scroll
- Added hover slow-down (timeScale 0.3) with smooth 0.5s transition
- Removed unused CSS `animate-scroll` keyframes from `index.astro`

## Phase 8 — History Timeline Swipe ✅
Refined timeline swipe transitions for smoother feel.
- Swiper speed 900→700ms, added `grabCursor: true` for drag affordance
- Slide content animation: stronger x offset (22→30), smoother `power3.out` easing
- Stagger delay between year and description increased (0.08→0.12s)

## Phase 9 — Map Route Paths (stroke-dashoffset) ✅
Animated route paths between world map pins (France↔Madagascar↔La Réunion).
- Added SVG overlay with 3 curved `<path>` elements (`data-map-route`)
- `initMapRoutes()` in ImplantationsSection script — measures path length, sets dashoffset, animates to 0 on scroll
- Staggered 0.3s delay between each route, 1.6s duration with `power2.inOut`

## Phase 10 — Map Hover Overlays ✅ (already existed)
Hover-triggered flux overlay images already implemented in ImplantationsSection.
- World map pins show/hide flux overlay images on mouseenter/mouseleave
- Other pins fade out when one is hovered

## Phase 11 — Sticky Sub-Menu Indicator ✅
Enhanced existing expertises sticky nav with smooth GSAP tab transitions.
- Active tab height/padding now animates smoothly (0.3s `power2.out`) instead of instant class toggle
- Scroll spy and sticky positioning were already implemented
- Falls back to class toggle on mobile

## Phase 12 — Fish Sticky + Background Slide ✅
Fish was already `sticky top-56`. Added white background slide-up effect.
- Added `data-fish-bg` div behind the fish illustration with `clip-path: inset(100% 0 0 0)`
- ScrollTrigger scrub animation reveals the white bg from bottom to top as user scrolls through the section
- Only visible on xl breakpoint (fish column is hidden on smaller screens)

## Phase 13 — Plate Background Shift ✅
Generic background shift utility ready for any section.
- `initBgShift()` in `globalAnimations.js` — scrub-based clip-path reveal from bottom
- Add `data-bg-shift` to container + `data-bg-shift-overlay` to the colored bg child
- No plate section exists yet — utility is opt-in for when it's built

## Phase 14 — Parallax Gallery ✅
Generic parallax utility + applied to existing sections.
- `initParallax()` in `globalAnimations.js` — scrub-based yPercent shift on images
- Add `data-parallax` to any overflow-hidden container (optional `data-parallax-speed`, default 0.2)
- Applied to: HomeHeroSection (speed 0.15), HistorySection header image

## Phase 15 — Ken Burns on Media ✅
Subtle scroll-driven zoom (1.0→1.1) on article card images.
- `initKenBurns()` in `globalAnimations.js` — scrub-based scale from 1 to 1.1
- Added `data-ken-burns` to both ArticleCard image containers (vertical + horizontal layouts)

## Phase 16 — Job Card Color Cycling ✅
Job cards now auto-cycle through a 5-color sequence.
- Colors: terre-laterite → nuit-australe → ecume-poudree → lagon-mayotte → sable-corail
- Applied via `i % jobColors.length` in `carrieres.astro` — works for any number of jobs
- Overrides manual `bgColor` from data, making it CMS-ready

## Phase 17 — Anchor Smooth Scroll ✅ (already existed)
`scroll-behavior: smooth` already set globally in `src/styles/global.css:62`.
All anchor links with `href="#id"` smooth-scroll natively.
