Technical Prompt Guide: GSAP Scroll-Driven Animations

1. Introduction to the Prompt Suite

This guide is designed to enable Claude AI to generate high-fidelity, production-ready GSAP (GreenSock Animation Platform) code. The focus is on replicating the sophisticated masking and multi-layered parallax effects observed in the "Expertise" layout and technical brief.

By using these prompts, you will generate code that leverages GSAP’s ScrollTrigger plugin to create a seamless, "scrubbed" experience where animation progress is tied directly to the scrollbar. These instructions prioritize performance, using hardware-accelerated transforms and industry-standard optimization techniques to ensure jank-free rendering across all modern browsers.

2. Global Configuration & Setup Prompt

Copy and paste this prompt first to establish the technical constraints and coding standards for the AI.

You are acting as a Senior Creative Technologist and GSAP Specialist. Your task is to generate clean, optimized JavaScript code using GSAP 3.x and the ScrollTrigger plugin. 

Global Technical Standards:
1. Always include 'gsap.registerPlugin(ScrollTrigger);'.
2. Use 'gsap.defaults({ overwrite: "auto", duration: 1 });' to prevent conflicting tweens.
3. Prioritize 'yPercent', 'xPercent', and 'autoAlpha' over 'top', 'left', or 'opacity' to ensure GPU acceleration and sub-pixel rendering.
4. All ScrollTriggers must include 'scrub: true' or a numerical scrub value (e.g., 'scrub: 1') for smooth 1:1 scroll synchronization.
5. Use 'fastScrollEnd: true' in ScrollTrigger configurations to prevent animation overlap during rapid scrolling.
6. Provide a 'Prerequisite CSS' block including 'will-change: transform' for animated layers and 'overflow: hidden' for masking containers.
7. Use 'force3D: true' on all moving elements to force hardware acceleration.

Assume a modern ES6+ environment.


3. Section Prompt: The "Deep Sea" Hero Transition

This prompt handles the parallax "dive" effect where the sea background moves vertically behind the sticky navigation.

Task: Animate the "Deep Sea" background transition.

Expected HTML Structure:
<section class="hero-section">
  <div class="sea-bg-layer"></div>
  <nav class="sticky-nav">...</nav>
  <h1 class="hero-title">...</h1>
</section>

Technical Instructions:
1. Target '.sea-bg-layer'.
2. Set the CSS height of '.sea-bg-layer' to '120%' (or 120vh) to provide 'bleed' for the parallax movement. This prevents a white gap appearing at the bottom of the hero section during the transition.
3. Implement a GSAP tween that moves the layer from 'y: 0' to 'yPercent: -20' as the user scrolls.
4. Calculate the 'end' trigger based on the full height of the hero section.
5. Ensure the sticky top bar has a higher 'z-index' than the sea layer.
6. Use 'interpolate' logic if necessary to ensure the sea movement feels organic relative to the scroll speed.


4. Section Prompt: The "Fish & Knife" Masking Animation

This prompt replicates the masking effect where a static foreground image is revealed by a moving background layer.

Task: Implement a vertical masking reveal for the static Fish & Knife asset.

Context:
- The Fish and Knife is a single, static PNG/WebP file that remains fixed in the center of its container.
- An "off-white mask" (the background of the next section) moves upward behind the static fish image to create the illusion of the fish sinking.

Expected HTML Structure:
<div class="fish-mask-container" style="position: relative; overflow: hidden;">
  <div class="white-mask-overlay" style="position: absolute; width: 100%; height: 100%; z-index: 1;"></div>
  <img src="fish-knife.png" class="fish-knife-img" style="position: relative; z-index: 2;">
</div>
1. The '.fish-knife-img' must remain static ('y: 0').
2. Animate the '.white-mask-overlay' from 'yPercent: 100' to 'yPercent: 0' (or higher) to move it behind the fish.
3. Tie the movement 1:1 with the scroll progress using 'scrub: true'.
4. Ensure the 'z-index' stacking strictly places the mask between the sea background and the fish image.


5. Section Prompt: Double-Layered Smoke Parallax

This prompt creates depth using two smoke layers while solving the "line" artifact mentioned in the source audio.

Task: Create a multi-layered smoke parallax effect with feathered edges.

Context:
- Two layers of smoke move at different speeds.
- A "line" is visible in the raw assets; this must be fixed using CSS masking.

Expected HTML Structure:
<div class="smoke-container" style="overflow: hidden;">
  <div class="smoke-layer smoke-depth-1"></div>
  <div class="smoke-layer smoke-depth-2"></div>
</div>

Technical Instructions:
1. Apply a CSS 'mask-image: radial-gradient(circle, black 50%, transparent 100%)' or 'filter: blur()' to the smoke layers to eliminate harsh horizontal edges.
2. Animate '.smoke-depth-1' at 'yPercent: -15' and '.smoke-depth-2' at 'yPercent: -30' to create a parallax offset.
3. Use 'ease: "none"' for the tween to ensure the smoke doesn't "jump" ahead of the scroll.
4. Use 'force3D: true' to ensure smooth alpha-blending of the smoke layers.


6. Section Prompt: The "Plate & Black Background" Reveal

This prompt handles the complex reveal where a black background containing a plate slides over the preceding white section.

Task: Animate the reveal of the Plate section.

Context:
- The plate is baked into a single asset with a black background.
- This image "extends all the way up" above the white section in the stack.

Expected HTML Structure:
<section class="reveal-container">
  <div class="white-section-bottom"></div>
  <div class="black-plate-overlay" style="position: absolute; top: 100%;">
    <img src="plate-on-black.png" class="static-plate">
  </div>
</section>

Technical Instructions:
1. The '.black-plate-overlay' should slide from 'yPercent: 0' to 'yPercent: -100' (moving up over the white section).
2. Use 'anticipatePin: 1' in the ScrollTrigger to prevent any visual "snapping" when the plate locks into the viewport center.
3. Coordinate the 'end' trigger so the plate stops exactly in the middle of the viewport.
4. The plate inside the black container should appear static to the user while the container itself moves.


7. Section Prompt: Logistics & Resources Multi-Axis Parallax

This prompt adds dynamic depth to the footer sections by animating elements on both the X and Y axes.

Task: Implement multi-axis parallax for the Logistics (Trucks/Maritime) section.

Expected HTML Structure:
<section class="logistics-section">
  <img class="truck-foreground">
  <img class="ship-background">
</section>

Technical Instructions:
1. Target '.truck-foreground' and apply a dual-axis tween: { yPercent: -10, xPercent: 5 }. This creates a diagonal "driving" effect.
2. Target '.ship-background' and apply a subtle { yPercent: -5 } move.
3. Ensure the trucks move faster than the ships to reinforce the 3D perspective.
4. Use 'scrub: 0.5' for a slight "organic" delay that feels less mechanical than a 1:1 scrub.


8. Implementation Best Practices

Developer Note: Technical Optimizations
  * Pro-Tip: Disable high-intensity masking on mobile devices or use saveStyles: "transform,opacity" to ensure that when a user rotates their device, the layout doesn't break.
* Performance: Use will-change: transform only on the specific layers being animated (e.g., the mask and the background layers). Applying it globally can cause memory issues.
* Asset Prep: Ensure images (Fish/Knife and Plate) are high-quality WebP files with alpha channels. To prevent "fringing" (white outlines) on the fish during the mask transition, ensure the PNG export has a clean matte.
* Layer Stacking: Use a clear z-index strategy. The Sea background should be the lowest, the Mask in the middle, and the Static Fish/Knife asset on top.
* Scroll Stability: If the page content is dynamic (e.g., lazy-loading text), call ScrollTrigger.refresh() after the DOM stabilizes to prevent "trigger drift."