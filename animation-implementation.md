# Animation Implementation Plan

Based on `expertise-animation.md` — GSAP scroll-driven animations for the Expertise page.

---

## Phase 0: Global Setup ✅

**Goal**: Configure GSAP defaults and prerequisite CSS.

- [x] Register ScrollTrigger plugin: `gsap.registerPlugin(ScrollTrigger)`
- [x] Set global defaults: `gsap.defaults({ overwrite: "auto", duration: 1, force3D: true })`
- [x] Add prerequisite CSS: `will-change: transform` on animated layers (desktop only)
- [x] Ensure all tweens use `force3D: true` for GPU acceleration
- [x] Use `yPercent`, `xPercent`, `autoAlpha` instead of `top`, `left`, `opacity`
- [x] All ScrollTriggers include `scrub: true` (or numeric) + `fastScrollEnd: true`

---

## Phase 1: Deep Sea Hero Transition ✅

**Goal**: Parallax "dive" effect — sea background moves vertically behind the sticky nav.

- [x] Hero bg image set to `h-[120%]` for parallax bleed + `data-hero-parallax-bg`
- [x] Animate `yPercent: 0 → -16` on scroll (hero), `yPercent: 0 → -10` (ocean)
- [x] `end` trigger = `bottom top` of hero section
- [x] Sticky nav already has higher `z-index` than sea layer
- [x] `ease: "none"` for organic 1:1 movement

---

## Phase 2: Fish & Knife Masking Animation ✅ (pre-existing)

**Goal**: Vertical masking reveal — static foreground image revealed by moving background layer.

- [x] Fish image stays static (`z-10`), white backdrop animates via `clip-path`
- [x] `initFishBackdropAnimation()` — `clip-path: inset(100% 0 0 0) → inset(50% 0 0 0)`
- [x] `scrub: 1.2`, `pin: true`, `anticipatePin: 1`

---

## Phase 3: Double-Layered Smoke Parallax ✅

**Goal**: Two smoke layers at different speeds with feathered edges (no hard line artifacts).

- [x] CSS `mask-image: linear-gradient(...)` feathers edges at top/bottom 15%
- [x] Top smoke: `yPercent: 8 → -15`, bottom smoke: `yPercent: 15 → -30`
- [x] `ease: "none"`, `scrub: true`, `force3D: true` (global default)
- [x] Both wrapped in `overflow-hidden` containers

---

## Phase 4: Plate & Black Background Reveal ✅ (pre-existing)

**Goal**: Black background with plate slides up over the white section.

- [x] `initPlateBackdropAnimation()` — `clip-path: inset(100% 0 0 0) → inset(50% 0 0 0)`
- [x] `anticipatePin: 1`, `pin: true`, `scrub: 1.2`
- [x] Plate appears static while dark backdrop slides up

---

## Phase 5: Logistics Multi-Axis Parallax ✅

**Goal**: Depth in footer sections — elements animate on both X and Y axes.

- [x] Support bg: `yPercent: 0 → -20` + `xPercent: 0 → 3` (diagonal driving effect)
- [x] RH bg: `yPercent: 0 → -18` (subtler, Y-only for depth hierarchy)
- [x] Support moves faster than RH to reinforce 3D perspective
- [x] Both use `scrub: 0.5` for slight organic delay

---

## Phase 6: Optimization & Polish ✅

**Goal**: Performance hardening and cross-device fixes.

- [x] All parallax functions gated behind `isDesktop()` — disabled on mobile (<768px)
- [x] `will-change: transform` scoped to `@media (min-width: 768px)` only
- [x] `ScrollTrigger.refresh()` after window load to prevent trigger drift
- [x] `ScrollTrigger.saveStyles()` on all parallax elements for orientation safety
- [x] Images unchanged (per user request)
