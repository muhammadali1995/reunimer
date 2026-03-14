# Expertises Page — Remaining Work Plan

**Figma source:** [Site-Reunimer / Expertise](https://www.figma.com/design/YZpOkEQoNYBuvDtjgt59Tm/Site-Reunimer?node-id=729-16024&m=dev)  
**Figma node:** `729:16024`  
**Route:** `/expertises`  
**Primary implementation file:** `src/pages/expertises.astro`

---

## Current Status

The `/expertises` page has been rebuilt into the correct high-level Figma section stack and now roughly follows the desktop frame:

1. Hero
2. Pêche
3. Certifications
4. Transformation
5. Quality & Safety
6. Distribution
7. Brands
8. Logistique & Supports
9. RH

The repo build is unblocked and `npm run build` succeeds.

The page is **not** pixel-perfect yet.

### What is already done

- Page structure is in place and no longer a stub.
- Major section order and rough desktop heights exist.
- Desktop spacing has been tightened section by section.
- The hero uses local/Figma-derived assets instead of a pure synthetic background.
- Screenshot-based review loops have already been done for:
  - hero
  - pêche
  - certifications
  - transformation
  - quality & safety
  - distribution
  - logistique
  - RH

### What is still wrong

- Several sections still rely on placeholder masses rather than the actual Figma imagery/logo compositions.
- The hero composition is still not matching Figma closely enough.
- Many sections are structurally close but still visually approximate because asset substitution is incomplete.
- Desktop positioning is closer, but not yet at exact-frame precision.
- Responsive/mobile has not been properly finished.

---

## Main Remaining Problem

The biggest remaining gap is no longer “page structure.”  
It is **asset fidelity + final desktop composition**.

That means the next passes should prioritize:

1. replacing placeholder or approximate imagery with real Figma assets
2. re-checking each section after the asset swap
3. only then doing final spacing and responsive cleanup

Further pure spacing-only passes without better assets will have diminishing returns.

---

## Remaining Work, In Order

## Phase A — Hero Finalization

**Status:** In progress, not complete.

### Current state

- Hero title position is closer than the original build.
- Hero currently uses a layered ocean/ship composition.
- The resulting desktop render is still too dark and still does not match the Figma hero read.

### Remaining tasks

- Rebuild the hero composition against Figma node `729:16034`.
- Verify whether the exact intended hero is:
  - a single full-frame ship image, or
  - a blended ship + underwater composition.
- Use only the exact asset/crop strategy that matches the Figma frame.
- Reposition the title `noS expertiseS` to match the actual frame placement precisely.
- Re-check navbar overlap, top image read, and lower gradient transition into the pêche section.

### Definition of done

- Boat/ocean read matches the Figma desktop frame at a glance.
- Title placement is no longer approximate.
- Transition into the pêche block feels continuous rather than layered artificially.

---

## Phase B — Pêche Asset Pass

**Status:** Layout mostly in place, assets incomplete.

### Current state

- Copy and section structure are present.
- Stats groups are close in layout.
- Madagascar and Boulogne image areas are still placeholders or approximations.
- The section still lacks the exact visual power of the Figma fishing chapter.

### Remaining tasks

- Use actual fishing imagery for:
  - tuna school / background
  - Madagascar image block
  - Boulogne image block
- Re-check exact offsets for:
  - intro paragraph
  - subsection titles
  - stat rows
  - quota donuts
- Validate the two donut charts against the Figma proportions and label positions.
- Confirm the left fish illustration / overlay treatment is either accurate or should be replaced with the true asset.

### Definition of done

- Pêche reads like a single designed chapter, not a dark section with floating stats.
- The three location blocks and donut stats align visually to the Figma frame.

---

## Phase C — Certifications Asset Pass

**Status:** Structural approximation exists, still visually weak.

### Current state

- The title/copy row is in place.
- The certification band has been reshaped structurally.
- Logos and background still read as placeholders.

### Remaining tasks

- Export and wire the actual certification assets:
  - Eurofins
  - ISO 50001
  - Ecolabel
  - any other visible certification graphics in the frame
- Replace the current band background approximation with the actual background/image treatment from Figma node `729:16028`.
- Rebuild the exact row spacing for the dates:
  - left certification list
  - right certification list
- Replace the large “thon” placeholder block with the correct visual asset and exact size.

### Definition of done

- Certifications no longer look like a temporary layout.
- Logos, dates, and the large image sit in the same visual hierarchy as Figma.

---

## Phase D — Transformation Asset Pass

**Status:** Layout is present, imagery still placeholder-driven.

### Current state

- Title and high-level split are implemented.
- The two production sub-blocks exist.
- Large image areas still approximate the intended photography.

### Remaining tasks

- Wire actual Figma exports for:
  - `TRANSFORMATION 1`
  - `TRANSFORMATION 2`
  - `SMOKE`
- Confirm whether the second large visual should visually overlap or bridge into the lower content as in Figma.
- Tighten the positions of:
  - `6` / `unités de première transformation`
  - `1` / `atelier de seconde transformation`
- Verify the section height and white-to-grey gradient transition against the desktop frame.

### Definition of done

- Transformation reads like a premium product/industrial chapter, not a layout scaffold.
- Image scale and text anchoring match the Figma balance.

---

## Phase E — Quality & Safety Finalization

**Status:** Structure is okay; content styling still approximate.

### Current state

- Two-column composition exists.
- Left engagement stack and right stats block are readable.
- Left visual/logo area still feels temporary.

### Remaining tasks

- Replace left-side placeholder visual with the actual supporting imagery.
- Replace temporary certification/logo placeholders with real files if they belong in this section.
- Re-check the exact visual distinction between:
  - `Sécurité et excellence : nos engagements clés`
  - `Un outil industriel agile et complémentaire`
- Tighten the zero-waste paragraph block and footnote placement.

### Definition of done

- Left and right halves feel intentionally paired.
- This section reads as a finished information design panel.

---

## Phase F — Distribution Asset Pass

**Status:** Improved structurally, still one of the most asset-dependent sections.

### Current state

- Title/copy/promise hierarchy is present.
- Dark stage and three-card composition are in place.
- Magazine spread and cards still need exact visual assets to match Figma.

### Remaining tasks

- Replace the magazine/background placeholders with the actual Figma exports for:
  - `RUNIMER_COUVERTURE_JANV26 1`
  - `RUNIMER_COUVERTURE_JANV26 2`
- Replace all three card images with the final correct exports:
  - `DISTRI 3B`
  - `DISTRI 2`
  - `DISTRI 1`
- Validate exact card layout:
  - card title placement
  - image block height
  - sable-corail footer bar
  - description line breaks
- Confirm whether card image framing needs crop adjustments to match Figma precisely.

### Definition of done

- Distribution reads much closer to the Figma “editorial spread + cards” composition.
- The section no longer feels placeholder-heavy.

---

## Phase G — Brands Section Review

**Status:** Present, but not part of the strongest validated flow yet.

### Current state

- A brands block exists after distribution.
- It is visually simpler than the rest of the page and likely still under-refined.

### Remaining tasks

- Confirm this section is actually part of the intended Figma page flow and not over/under-built.
- Validate title, logo stack, body copy, and link spacing against the desktop frame.
- Replace temporary logo placeholders if any remain.

### Definition of done

- The brands section no longer feels like an inserted appendix.

---

## Phase H — Logistique & Supports Asset Pass

**Status:** Structurally stabilized, visually still one of the weakest matches.

### Current state

- Section height and text structure are in place.
- Visual background treatment is still not close enough to the Figma section.

### Remaining tasks

- Replace placeholder/approximate background with the actual support imagery:
  - `EXPERTISE_SUPPORT 1`
  - `SUPPORT 2`
- Rebuild the exact layering:
  - dark background
  - support imagery
  - black overlay
- Re-check exact title and intro positions relative to the imagery.
- Confirm left/right copy block widths and bottom stats spacing.

### Definition of done

- Logistique & Supports reads as a designed hero-like chapter instead of a dark text block.

---

## Phase I — RH Finalization

**Status:** Structurally close, imagery/stat styling still approximate.

### Current state

- The RH chapter now has a stable desktop-height section.
- Employer-brand text, policy heading, and donut charts are present.
- The visual atmosphere and final stat styling still need refinement.

### Remaining tasks

- Replace/confirm the RH background image treatment against node `729:16176`.
- Tighten the upper copy block and heading spacing.
- Validate the donut charts:
  - ring thickness
  - percentage positions
  - label centering
- Confirm whether additional percentage/stat items are missing compared with Figma.

### Definition of done

- RH no longer feels like a rough final section.
- The page ending reads intentional and finished.

---

## Phase J — Responsive Pass

**Status:** Not done.

### Required work

- Make the page genuinely usable on tablet and mobile.
- Remove desktop-only assumptions from the current fixed-height sections.
- Review all sections for:
  - stacked layouts
  - text wrapping
  - image crop behavior
  - no horizontal overflow
  - readable type sizes
  - stable section order

### Minimum breakpoints to validate

- mobile narrow
- mobile wide
- tablet portrait
- tablet landscape
- desktop 1440

### Definition of done

- No broken sections on mobile/tablet.
- No horizontal scroll.
- No unreadably dense or oversized blocks.

---

## Phase K — Final Visual QA

**Status:** Not done.

### Required work

- Cross-check every desktop section against the Figma frame.
- Review the page top-to-bottom after final assets are in place.
- Verify:
  - title positions
  - section boundary rhythm
  - copy line breaks
  - color accuracy
  - card sizes
  - stats alignment
  - image crop accuracy
- Rebuild any section that still clearly reads as approximation.

### Definition of done

- Desktop page looks intentionally consistent and close to the Figma frame.
- Remaining differences are minor, not structural.

---

## Concrete Next Step

The most efficient next action is:

1. **Finish the hero composition only**

Reason:
- The hero is still visibly off.
- It influences the entire first impression of the page.
- Current asset substitution proved the main issue is composition, not simply the file path.

After that:

2. **Pêche asset pass**
3. **Distribution asset pass**
4. **Logistique asset pass**
5. **Responsive pass**
6. **Final QA**

---

## Current Files To Touch

- `src/pages/expertises.astro`
- `src/assets/images/expertise/*`
- `astro.config.mjs` only if build/tooling issues recur

---

## Notes

- The repo build currently works.
- The page has improved materially, but it is still in a “structured approximation” state.
- The remaining work should now be driven by **asset fidelity and exact desktop composition**, not by more broad scaffolding changes.
