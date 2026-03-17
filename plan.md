To help you implement these animations via the Cloud CLI, I have translated the requirements from the sources into technical prompts categorized by their function and page location.

### 1. Global Animation Suite
*These prompts establish the baseline behavior for the entire website.*

*   Prompt (Entrance Effects): "Implement a global scroll-reveal animation: all h1, h2, and .page-title elements must fade in; all secondary descriptions and .btn elements must slide in from the left; and all .content-container elements must slide up one by one with a staggered delay as they enter the viewport."
*   Prompt (Numeric Data): "Apply a counter animation to all elements with the class .stat-value. Upon scroll-reveal, the numbers must increment from zero to the target value."
*   Prompt (Circular Charts): "Create an animation for .svg-circle-chart where the stroke-dasharray fills in a clockwise direction from 0% to the target percentage when the section is visible."
*   Prompt (Navigation): "Configure the site header to be sticky with scroll-direction detection: the header should translate Y(-100%) on scroll down and return to Y(0) immediately upon scroll up."

---

### 2. Homepage & Interactive Features
*   Prompt (Marquee): "Refine the .homepage-marquee to ensure the horizontal scroll is significantly smoother and slower than the current CSS animation."
*   Prompt (Timeline): "Implement a smooth swipe transition for the .history-timeline component when a user clicks on different year markers or navigation arrows."
*   Prompt (Animated Maps): "For the .interactive-map, animate the dotted paths (`.map-route`) to gradually grow (using `stroke-dashoffset`) from the origin point toward the destination country to simulate moving light. Additionally, configure hover states to trigger an absolute-positioned overlay of secondary map layers (e.g., Alaska/Rain)."

---

### 3. Specialized Scroll Transitions
*   Prompt (Sticky Section Indicator): "On the Transformation page, implement a sticky sub-menu. The indicator line for the active tab must dynamically resize (enlarge) or highlight as the user scrolls into its corresponding text section."
*   Prompt (Fish/Column Interaction): "Set the .fish-graphic to position: sticky within its parent column so it remains fixed while the right-hand text scrolls. Trigger an animation where a white background div slides up and stops behind the fish, replacing the initial blue background as the scroll progresses."
*   Prompt (Plate/Background Shift): "Implement a scroll-trigger for the .plate-image: as the user scrolls, a black background must slide up from the bottom and lock into place behind the plate before the rest of the page content continues to scroll."

---

### 4. Visual & Dynamic Content
*   Prompt (Parallax Frames): "Apply a parallax effect to all images within the .parallax-gallery. The subject (e.g., trucks, turtle, person) should move vertically upward within its frame at a slower rate than the scroll speed, utilizing the extra 'sky' space at the top of the provided assets."
*   Prompt (Ken Burns Media): "Apply a subtle Ken Burns scale animation (1.0 to 1.1) to all featured images and video covers pulled from Strapi for the Blog and Careers sections."
*   Prompt (Job Offer Cycles): "Configure the .job-list component to successively repeat a specific color sequence for the background of each dynamic card generated from the Strapi CMS."

---

### 5. Functional Interactions
*   Prompt (Anchor Smooth Scroll): "Ensure all sub-menu links and internal buttons function as anchor links with a smooth-scroll behavior to their target IDs on the same page."
*   Prompt (Language Toggle): "Implement a global state-switch for the French/English toggle button to update all text strings based on the provided translation files."