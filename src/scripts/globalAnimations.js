import { gsap, ScrollTrigger, isReducedMotionPreferred } from './animation.js';

/**
 * Phase 1 — Global scroll-reveal: fade-in for h1, h2, .page-title
 * Uses ScrollTrigger.batch() for efficiency — one observer per group, not per element.
 */
function initHeadingReveal() {
  if (isReducedMotionPreferred()) return;

  // Skip elements that have [data-anim], AND elements whose ancestor already
  // carries [data-anim] — the ancestor animation controls visibility for the whole block.
  const targets = Array.from(
    document.querySelectorAll('h1:not([data-anim]), h2:not([data-anim]), .page-title:not([data-anim])')
  ).filter((el) => !el.closest('[data-anim]'));
  if (!targets.length) return;

  gsap.set(targets, { autoAlpha: 0, y: 30 });

  ScrollTrigger.batch(targets, {
    start: 'top 80%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
  });
}

/**
 * Phase 2 — Global scroll-reveal: slide-from-left for descriptions and buttons.
 * Uses ScrollTrigger.batch() for efficiency.
 */
function initSecondaryReveal() {
  if (isReducedMotionPreferred()) return;

  // Skip elements inside [data-anim] ancestors — already handled by the parent animation.
  const targets = Array.from(
    document.querySelectorAll('main p:not([data-anim]), main .btn:not([data-anim]), main a.btn:not([data-anim])')
  ).filter((el) => !el.closest('[data-anim]'));
  if (!targets.length) return;

  gsap.set(targets, { autoAlpha: 0, x: -40 });

  ScrollTrigger.batch(targets, {
    start: 'top 83%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        autoAlpha: 1,
        x: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.06,
      });
    },
  });
}

/**
 * Phase 3 — Staggered container reveal: children slide up one by one.
 * Add data-stagger to any container — its direct children animate in sequence.
 */
function initStaggeredContainers() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-stagger]').forEach((container) => {
    const children = Array.from(container.children);
    if (!children.length) return;

    gsap.set(children, { autoAlpha: 0, y: 40 });

    ScrollTrigger.create({
      trigger: container,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        gsap.to(children, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.12,
          onComplete: () => {
            children.forEach((child) => gsap.set(child, { clearProps: 'transform' }));
          },
        });
      },
    });
  });
}

/**
 * Phase 4 — Stat counter: numbers increment from 0 to target on scroll.
 * Uses ScrollTrigger.batch() for efficiency.
 */
function initStatCounters() {
  if (isReducedMotionPreferred()) return;

  // Skip elements handled by page-specific scripts:
  // - [data-anim] elements → handled by section timelines in expertisesPage/groupePage
  // - [data-quota-count] → fishing section SVG text counters (initCountsOnView)
  // - [data-rh-count] → RH section counters (initRhSectionAnimations)
  const targets = Array.from(document.querySelectorAll(
    '[data-count-value]:not([data-anim]):not([data-quota-count]):not([data-rh-count])'
  ));
  if (!targets.length) return;

  ScrollTrigger.batch(targets, {
    start: 'top 75%',
    once: true,
    onEnter: (batch) => {
      batch.forEach((el) => {
        const target = parseFloat(el.dataset.countValue);
        const decimals = parseInt(el.dataset.countDecimals || '0', 10);
        const prefix = el.dataset.countPrefix || '';
        const suffix = el.dataset.countSuffix || '';
        const counter = { val: 0 };

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
      });
    },
  });
}

/**
 * Phase 5 — SVG circle chart: stroke-dasharray fills clockwise from 0 to target.
 * Add data-circle-chart to an SVG <circle> with the final stroke-dasharray already set.
 */
function initCircleCharts() {
  if (isReducedMotionPreferred()) return;

  const circles = Array.from(document.querySelectorAll('[data-circle-chart]'));
  if (!circles.length) return;

  // Store target values before resetting
  circles.forEach((circle) => {
    const dashArray = circle.getAttribute('stroke-dasharray');
    if (!dashArray) return;

    const parts = dashArray.split(/[\s,]+/).map(Number);
    const targetFill = parts[0] || 0;
    const circumference = parts[1] || targetFill;

    circle.dataset.arcTarget = String(targetFill);
    circle.dataset.arcCircumference = String(circumference);
    circle.setAttribute('stroke-dasharray', `0 ${circumference}`);
  });

  ScrollTrigger.batch(circles, {
    start: 'top 75%',
    once: true,
    onEnter: (batch) => {
      batch.forEach((circle) => {
        const targetFill = parseFloat(circle.dataset.arcTarget || '0');
        const circumference = parseFloat(circle.dataset.arcCircumference || '0');
        const progress = { val: 0 };

        gsap.to(progress, {
          val: targetFill,
          duration: 1.4,
          ease: 'power3.out',
          onUpdate: () => {
            circle.setAttribute('stroke-dasharray', `${progress.val} ${circumference}`);
          },
        });
      });
    },
  });
}

/**
 * Phase 6 — Navbar hide/show on scroll direction.
 *
 * Fix for expertise page pin-jump:
 * - Requires a minimum delta of 4px before reacting (ignores tiny layout shifts from GSAP spacers)
 * - Uses overwrite: 'auto' to prevent competing tweens
 * - Tracks velocity to prevent jitter from pin spacer insertions
 */
function initNavbarScrollToggle() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Total offset = navbar height (92px) + lg:top-11 (44px) = 136px
  const HIDE_Y = -136;
  const THRESHOLD_PX = 4;   // min scroll delta to react
  const SHOW_THRESHOLD = 1;  // show immediately on any upward scroll > 1px
  const HIDE_AFTER_PX = 120; // don't hide until past this scroll position

  let hidden = false;
  let lastY = window.scrollY;
  let rafId = null;

  const hide = () => {
    if (hidden) return;
    hidden = true;
    gsap.to(navbar, { y: HIDE_Y, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
  };

  const show = () => {
    if (!hidden) return;
    hidden = false;
    gsap.to(navbar, { y: 0, duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
  };

  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      // Ignore sub-threshold changes (caused by GSAP pin spacer insertion)
      if (Math.abs(delta) < 1) return;

      if (delta > THRESHOLD_PX && currentY > HIDE_AFTER_PX) {
        hide();
      } else if (delta < -SHOW_THRESHOLD) {
        show();
      }

      lastY = currentY;
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Store cleanup on window so it survives DOM replacement on astro:after-swap
  window._navbarScrollCleanup = () => {
    window.removeEventListener('scroll', onScroll);
    if (rafId) cancelAnimationFrame(rafId);
    delete window._navbarScrollCleanup;
  };
}

/**
 * Phase 13 — Background shift: a colored bg slides up behind a subject and locks.
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
      scrub: 0.8,
      onUpdate: (self) => {
        const p = Math.min(self.progress * 1.5, 1);
        overlay.style.clipPath = `inset(${(1 - p) * 100}% 0 0 0)`;
      },
    });
  });
}

/**
 * Phase 14 — Parallax: image moves vertically slower than scroll.
 * Uses gsap.quickSetter for zero-overhead per-frame updates.
 */
function initParallax() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-parallax]').forEach((container) => {
    const img = container.querySelector('img, picture img');
    if (!img) return;

    const speed = parseFloat(container.dataset.parallaxSpeed || '0.2');
    const setY = gsap.quickSetter(img, 'yPercent');

    gsap.set(img, { yPercent: -speed * 50, scale: 1 + speed });

    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        setY((self.progress - 0.5) * speed * 100);
      },
    });
  });
}

/**
 * Phase 15 — Ken Burns: subtle slow zoom (1.0→1.08) on featured images.
 * Uses gsap.quickSetter for zero-overhead per-frame updates.
 */
function initKenBurns() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-ken-burns]').forEach((container) => {
    const img = container.querySelector('img, picture img');
    if (!img) return;

    gsap.fromTo(
      img,
      { scale: 1 },
      {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      },
    );
  });
}

/**
 * Fixed-image parallax: the image stays fixed while content scrolls over it.
 * clip-path: inset(0) on the container clips the fixed image to the column bounds.
 * The image is sized to match its container column, not the viewport.
 * Desktop only.
 */
function initEngagementParallax() {
  if (isReducedMotionPreferred()) return;

  document.querySelectorAll('[data-engagement-parallax]').forEach((container) => {
    const wrapper = container.querySelector('[data-parallax-img-wrapper]');
    if (!wrapper) return;

    const setY = gsap.quickSetter(wrapper, 'yPercent');
    // Start flush with the section edge to avoid a visible gap before scroll begins.
    const startY = 0;
    const endY = -28;

    ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        setY(startY + self.progress * (endY - startY));
      },
    });
  });
}

/**
 * Kill all existing ScrollTriggers and navbar scroll listener before re-init.
 * Called at the start of initGlobalAnimations to prevent accumulation on page navigation.
 */
function cleanupGlobalAnimations() {
  // Kill previous navbar scroll listener (stored on window, survives DOM replacement)
  if (window._navbarScrollCleanup) {
    window._navbarScrollCleanup();
  }

  // Kill expertise sticky tabs ticker callback (survives DOM replacement)
  if (window._stickyTabsTickerFn) {
    gsap.ticker.remove(window._stickyTabsTickerFn);
    window._stickyTabsTickerFn = null;
  }

  // Kill all ScrollTriggers to prevent accumulation across page navigations.
  // Page-specific scripts (expertisesPage, groupePage, etc.) register AFTER this
  // via their own astro:after-swap handlers, so their triggers are re-created fresh.
  ScrollTrigger.getAll().forEach((t) => t.kill());

  // Reset navbar position without animation on page swap
  const navbar = document.getElementById('navbar');
  if (navbar) {
    gsap.killTweensOf(navbar);
    gsap.set(navbar, { clearProps: 'y' });
  }
}

export function initGlobalAnimations() {
  cleanupGlobalAnimations();

  initHeadingReveal();
  initSecondaryReveal();
  initStaggeredContainers();
  initStatCounters();
  initCircleCharts();
  initNavbarScrollToggle();
  initBgShift();
  initParallax();
  initKenBurns();
  initEngagementParallax();

  // Refresh ScrollTrigger positions after fonts AND images have settled.
  // Single consolidated refresh — page-specific scripts should NOT call refresh separately.
  const refreshOnce = () => ScrollTrigger.refresh();
  document.fonts.ready.then(refreshOnce);
  if (document.readyState !== 'complete') {
    window.addEventListener('load', refreshOnce, { once: true });
  }
}
