# Carrières Page — GSAP Animation Plan

**Page:** `/carrieres`  
**Source file:** `src/pages/carrieres.astro`  
**Objective:** Add GSAP-based entrance animations on the Carrières page using 3 requested animation types.

**Mandatory behavior:** All three animations must trigger on scroll when the section enters the viewport.

---

## Requested Animation Types

1. **Smooth appear with z-index from 0 → 1**
2. **Fade in from left → right, one by one** *(starts just outside the container’s left edge)*
3. **Fade in from bottom → top, one by one** *(starts just outside the container’s bottom edge)*

4. **Fade in from right → left, one by one**

> Implementation note: This new animation is used for the RSE section’s text stack, where each item starts with `opacity: 0` and a positive `x` offset before animating back to `x: 0` so the copy appears to slide in from the right edge.

> Implementation note: `z-index` is not truly interpolated visually in browsers. We will create a smooth “depth appear” effect by animating `opacity` + slight transform while switching `zIndex` from `0` to `1` at the right timing.

---

## Current Carrières Structure (for targeting)

In `src/pages/carrieres.astro`, relevant section is:
- Section title via `SectionHeading title="Notre marque employeur"`
- Two text paragraphs below in a 2-column grid (`md:grid-cols-2`):
  - Left paragraph (under heading)
  - Right paragraph (next to left paragraph on desktop)

This maps directly to the requested test scenario.

---

## Test Mapping (explicit)

For **Notre marque employeur** block:
- **Animation 1:** Heading text `Notre marque employeur`
- **Animation 2:** First paragraph (text under heading)
- **Animation 3:** Second paragraph (text next to first paragraph)

---

## Phase Plan

> **Review workflow requirement:** after each phase below, stop implementation and run your review/validation before starting the next phase.

### Phase 1 — Add stable animation hooks in markup

**Goal:** Make selectors explicit and robust for GSAP targeting.

Planned updates in `src/pages/carrieres.astro`:
- Add wrapper hook on section, e.g. `data-anim-scope="marque-employeur"`
- Add heading hook, e.g. `data-anim="appear-z"`
- Add first paragraph hook, e.g. `data-anim="fade-left-seq" data-anim-order="1"`
- Add second paragraph hook, e.g. `data-anim="fade-up-seq" data-anim-order="2"`

Deliverable:
- Deterministic DOM hooks for animation logic and testing.

**Review Gate 1 (mandatory):**
- Verify hooks exist on the exact 3 test targets before moving to Phase 2.

---

### Phase 2 — Add GSAP init script for Carrières page

**Goal:** Create one page-level animation initializer.

Planned implementation:
- Add `<script>` in `src/pages/carrieres.astro` (same style as existing accordion script).
- Import GSAP in the script: `import { gsap } from 'gsap';`
- Import ScrollTrigger and register plugin: `import { ScrollTrigger } from 'gsap/ScrollTrigger';` + `gsap.registerPlugin(ScrollTrigger);`
- Use a safe mount check so code runs only when section exists.

Animation setup:
- Default hidden state via `gsap.set(...)` for animated elements (`opacity: 0`, transforms as needed).
- Use a timeline for deterministic order.

Deliverable:
- Reusable animation bootstrap for this section.

**Review Gate 2 (mandatory):**
- Review script structure/import strategy before any motion values are added.

---

### Phase 3 — Implement the 3 required effects

**Goal:** Apply exact requested behaviors in correct sequence.

#### A1 — Heading (z-index appear)
Target: `Notre marque employeur` heading.
- Initial: `opacity: 0`, `zIndex: 0`, slight `y` or `scale` offset.
- Animate: `opacity -> 1` with smooth ease.
- Set/finalize: `zIndex: 1` when visible.
- Duration target: `0.7–1.0s`.

#### A2 — First paragraph (left → right)
Target: first paragraph under heading.
- Initial: `opacity: 0`, `x: -24` (or `-32`).
- Animate: `x -> 0`, `opacity -> 1`.
- Duration target: `0.6–0.8s`.

#### A3 — Second paragraph (bottom → top)
Target: second paragraph next to first paragraph.
- Initial: `opacity: 0`, `y: 24` (or `32`).
- Animate: `y -> 0`, `opacity -> 1`.
- Duration target: `0.6–0.8s`.

Sequence behavior:
- A1 starts first.
- A2 starts after A1 (small overlap allowed).
- A3 starts after A2 (small overlap allowed).

Deliverable:
- Exact 1 → 2 → 3 motion sequence for test validation.

**Review Gate 3 (mandatory):**
- Validate sequence and motion behavior before trigger tuning in Phase 4.

---

### Phase 4 — Trigger strategy (on load vs on scroll)

**Goal:** Ensure animation triggers when section becomes visible and feels natural.

Required strategy:
- Use `ScrollTrigger` for viewport entry start (e.g. `start: 'top 80%'`).
- Trigger once per page load (`once: true`) to avoid repeated replay while scrolling.
- Do not use load-only trigger for this test scenario.

Deliverable:
- Single trigger mode selected and documented in code.

**Review Gate 4 (mandatory):**
- Confirm trigger mode and one-time behavior before final QA hardening.

---

### Phase 5 — Verification and QA

**Goal:** Confirm visual behavior and sequence consistency.

Checks:
- Heading always animates as Animation 1.
- Left paragraph always animates as Animation 2.
- Right paragraph always animates as Animation 3.
- No flicker on refresh/re-entry.
- Mobile/tablet/desktop: no layout shift from transforms.
- Respect reduced motion (`prefers-reduced-motion`) by disabling or simplifying animations.

Suggested validation:
- Manual test on `/carrieres` in dev server.
- Optional Playwright visual check after animation completion state.

**Review Gate 5 (final):**
- Sign off the implementation and decide whether to extend animations to other sections.

---

## Implementation Scope Notes

- Keep this pass focused on the **Notre marque employeur** section first (as requested for testing).
- After validation, we can extend the same animation patterns to other Carrières sections (RH block, job header, accordion cards) in a second pass.
