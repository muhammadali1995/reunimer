import { gsap, ScrollTrigger, isReducedMotionPreferred } from './animation.js';

/**
 * Phase 1 — Global scroll-reveal: fade-in for h1, h2, .page-title
 * Skips elements that already have [data-anim] (handled by page-specific scripts).
 */
function initHeadingReveal() {
  if (isReducedMotionPreferred()) return;

  const headings = document.querySelectorAll(
    'h1:not([data-anim]), h2:not([data-anim]), .page-title:not([data-anim])'
  );

  headings.forEach((el) => {
    gsap.set(el, { autoAlpha: 0, y: 30 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });
  });
}

/**
 * Phase 2 — Global scroll-reveal: slide-from-left for descriptions and buttons
 * Targets p/span inside sections (not nav/footer) and .btn elements.
 * Skips elements that already have [data-anim].
 */
function initSecondaryReveal() {
  if (isReducedMotionPreferred()) return;

  const descriptions = document.querySelectorAll(
    'main p:not([data-anim]), main .btn:not([data-anim]), main a.btn:not([data-anim])'
  );

  descriptions.forEach((el) => {
    gsap.set(el, { autoAlpha: 0, x: -40 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      },
    });
  });
}

/**
 * Phase 3 — Staggered container reveal: children slide up one by one.
 * Add data-stagger to any container — its direct children animate in sequence.
 */
function initStaggeredContainers() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-stagger]').forEach((container) => {
    const children = container.children;
    if (!children.length) return;

    gsap.set(children, { autoAlpha: 0, y: 40 });

    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(children, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
        });
      },
    });
  });
}

/**
 * Phase 4 — Stat counter: numbers increment from 0 to target on scroll.
 * Reads data-count-value, data-count-decimals, data-count-prefix, data-count-suffix.
 */
function initStatCounters() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-count-value]').forEach((el) => {
    const target = parseFloat(el.dataset.countValue);
    const decimals = parseInt(el.dataset.countDecimals || '0', 10);
    const prefix = el.dataset.countPrefix || '';
    const suffix = el.dataset.countSuffix || '';
    const counter = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            const formatted = decimals > 0
              ? counter.val.toFixed(decimals).replace('.', ',')
              : Math.round(counter.val).toString();
            el.textContent = prefix + formatted + suffix;
          },
        });
      },
    });
  });
}

/**
 * Phase 5 — SVG circle chart: stroke-dasharray fills clockwise from 0 to target.
 * Add data-circle-chart to an SVG <circle> with the final stroke-dasharray already set.
 * The animation reads the target dasharray, resets to 0, then tweens in on scroll.
 */
function initCircleCharts() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-circle-chart]').forEach((circle) => {
    const dashArray = circle.getAttribute('stroke-dasharray');
    if (!dashArray) return;

    const parts = dashArray.split(/[\s,]+/).map(Number);
    const targetFill = parts[0] || 0;
    const circumference = parts[1] || targetFill;
    const progress = { val: 0 };

    circle.setAttribute('stroke-dasharray', `0 ${circumference}`);

    ScrollTrigger.create({
      trigger: circle,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(progress, {
          val: targetFill,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            circle.setAttribute('stroke-dasharray', `${progress.val} ${circumference}`);
          },
        });
      },
    });
  });
}

/**
 * Phase 6 — Navbar hide/show on scroll direction.
 * Hides navbar (translateY -100%) on scroll down, shows (translateY 0) on scroll up.
 */
function initNavbarScrollToggle() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let hidden = false;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      const currentY = window.scrollY;
      const scrollingDown = self.direction === 1;

      // Only hide after scrolling past navbar height
      // navbar height (92px) + lg:top-11 (44px) = 136px total offset
      if (scrollingDown && currentY > 120 && !hidden) {
        hidden = true;
        gsap.to(navbar, { y: -136, duration: 0.3, ease: 'power2.out' });
      } else if (!scrollingDown && hidden) {
        hidden = false;
        gsap.to(navbar, { y: 0, duration: 0.25, ease: 'power2.out' });
      }

      lastScrollY = currentY;
    },
  });
}

/**
 * Phase 13 — Background shift: a colored bg slides up behind a subject and locks.
 * Add data-bg-shift to a container. Place a child with data-bg-shift-overlay inside.
 * The overlay uses clip-path to reveal from bottom on scroll.
 */
function initBgShift() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-bg-shift]').forEach((container) => {
    const overlay = container.querySelector('[data-bg-shift-overlay]');
    if (!overlay) return;

    overlay.style.clipPath = 'inset(100% 0 0 0)';

    ScrollTrigger.create({
      trigger: container,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = Math.min(self.progress * 1.5, 1);
        overlay.style.clipPath = `inset(${100 - p * 100}% 0 0 0)`;
      },
    });
  });
}

/**
 * Phase 14 — Parallax: image moves vertically slower than scroll.
 * Add data-parallax to an overflow-hidden container with an image inside.
 * Optional data-parallax-speed="0.3" (default 0.2).
 */
function initParallax() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-parallax]').forEach((container) => {
    const img = container.querySelector('img, picture img');
    if (!img) return;

    const speed = parseFloat(container.dataset.parallaxSpeed || '0.2');

    gsap.set(img, { yPercent: -speed * 50, scale: 1 + speed });

    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const yShift = (self.progress - 0.5) * speed * 100;
        gsap.set(img, { yPercent: yShift });
      },
    });
  });
}

/**
 * Phase 15 — Ken Burns: subtle slow zoom (1.0→1.1) on featured images.
 * Add data-ken-burns to an overflow-hidden container with an image inside.
 */
function initKenBurns() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-ken-burns]').forEach((container) => {
    const img = container.querySelector('img, picture img');
    if (!img) return;

    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const scale = 1 + self.progress * 0.1;
        gsap.set(img, { scale });
      },
    });
  });
}

export function initGlobalAnimations() {
  initHeadingReveal();
  initSecondaryReveal();
  initStaggeredContainers();
  initStatCounters();
  initCircleCharts();
  initNavbarScrollToggle();
  initBgShift();
  initParallax();
  initKenBurns();
}
