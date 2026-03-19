import {
  ANIMATION_TYPES,
  ScrollTrigger,
  createScrollTimeline,
  gsap,
  isReducedMotionPreferred,
  setAnimationInitial,
  toAnimation,
} from './animation.js';

/** Breakpoint: skip heavy scroll-driven parallax on mobile for performance. */
const isDesktop = () => window.innerWidth >= 768;

function formatCountValue(value, decimals = 0) {
  return decimals > 0 ? value.toFixed(decimals).replace('.', ',') : Math.round(value).toString();
}

function animateCountUp(targets) {
  const elements = Array.isArray(targets) ? targets : Array.from(targets);
  const counter = { value: 0 };

  return gsap.to(counter, {
    value: 1,
    duration: 1.7,
    ease: 'expo.out',
    stagger: 0.1,
    onUpdate: function onUpdate() {
      elements.forEach((element, index) => {
        const targetValue = Number(element.dataset.countValue || '0');
        const decimals = Number(element.dataset.countDecimals || '0');
        const staggerDelay = index * 0.1;
        const progress = Math.min(Math.max((this.progress() - staggerDelay / 1.4) / (1 - staggerDelay / 1.4), 0), 1);
        const rawValue = targetValue * progress;
        const currentValue = decimals > 0 ? Number(rawValue.toFixed(decimals)) : Math.round(rawValue);

        element.textContent = `${element.dataset.countPrefix || ''}${formatCountValue(currentValue, decimals)}${element.dataset.countSuffix || ''}`;
      });
    },
  });
}

function initCountsOnView(targets, options = {}) {
  const {
    start = 'top 85%',
    triggerResolver = (element) => element,
    entranceAnimation,
  } = options;

  targets.forEach((element) => {
    const trigger = triggerResolver(element);
    if (!trigger || element.dataset.countInitialized === 'true') return;

    element.dataset.countInitialized = 'true';

    ScrollTrigger.create({
      trigger,
      start,
      once: true,
      onEnter: () => {
        if (entranceAnimation) {
          entranceAnimation(element, trigger);
        }

        animateCountUp([element]);
      },
    });
  });
}

/**
 * Hero "deep sea" parallax: the hero background image (120% tall)
 * drifts upward as the user scrolls, creating a diving effect.
 */
function initHeroParallax() {
  if (!isDesktop() || isReducedMotionPreferred()) return;

  const heroSection = document.querySelector('[data-hero-parallax-bg]')?.closest('section');
  const img = heroSection?.querySelector('[data-hero-parallax-bg]');
  if (!heroSection || !img) return;

  gsap.fromTo(img,
    { yPercent: 0 },
    {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: heroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        fastScrollEnd: true,
      },
    },
  );
}

/**
 * Fishing section ocean background parallax: the underwater scene (120% tall)
 * slowly shifts upward as the user scrolls through the fishing content.
 */
function initSeaParallax() {
  if (!isDesktop() || isReducedMotionPreferred()) return;

  const wrapper = document.querySelector('[data-sea-parallax-bg]')?.closest('.relative');
  const img = wrapper?.querySelector('[data-sea-parallax-bg]');
  if (!wrapper || !img) return;

  gsap.fromTo(img,
    { yPercent: 0 },
    {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
        fastScrollEnd: true,
      },
    },
  );
}

/**
 * Double-layered smoke parallax: two smoke images at different speeds.
 * Top smoke moves slower (-15%), bottom smoke moves faster (-30%) for depth.
 * ease: "none" keeps movement locked 1:1 with scroll.
 */
function initSmokeParallax() {
  if (!isDesktop() || isReducedMotionPreferred()) return;

  const smokeLayers = document.querySelectorAll('[data-smoke-parallax]');
  if (!smokeLayers.length) return;

  smokeLayers.forEach((img) => {
    const isTop = img.dataset.smokeParallax === 'top';
    const wrapper = img.closest('.overflow-hidden');

    gsap.fromTo(img,
      { yPercent: isTop ? 8 : 15 },
      {
        yPercent: isTop ? -15 : -30,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper || img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          fastScrollEnd: true,
        },
      },
    );
  });
}

function initFishingSectionAnimations() {
  const section = document.getElementById('peche-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const countItems = Array.from(section.querySelectorAll('[data-anim="4"][data-count-value]'));
  const statLines = Array.from(section.querySelectorAll('[data-stat-line]'));
  const quotaDonuts = Array.from(section.querySelectorAll('[data-quota-donut]'));
  const quotaArcs = Array.from(section.querySelectorAll('[data-quota-donut-arc]'));
  const quotaCenters = Array.from(section.querySelectorAll('[data-quota-donut-center]'));
  const quotaCountItems = Array.from(section.querySelectorAll('[data-quota-count="true"][data-count-value]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
    gsap.set(item, { autoAlpha: 0, y: 10 });
  });
  statLines.forEach((line) => gsap.set(line, { scaleX: 0, transformOrigin: 'left center' }));
  quotaDonuts.forEach((donut) => gsap.set(donut, { autoAlpha: 0, y: 24 }));
  quotaArcs.forEach((arc) => {
    const dashArray = String(arc.getAttribute('stroke-dasharray') || '0 0').split(' ');
    const visibleLength = Number(dashArray[0] || '0');
    const totalLength = Number(dashArray[1] || dashArray[0] || '0');

    arc.dataset.arcVisibleLength = String(visibleLength);
    arc.dataset.arcTotalLength = String(totalLength);

    gsap.set(arc, { strokeDasharray: `0 ${totalLength}` });
  });
  quotaCenters.forEach((center) => {
    gsap.set(center, { autoAlpha: 0, scale: 0.88, transformOrigin: 'center center' });
  });
  quotaCountItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
  });

  const timeline = createScrollTimeline({ trigger: section, start: 'top 72%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.08 }));
  }

  if (statLines.length) {
    timeline.to(statLines, { scaleX: 1, duration: 0.85, ease: 'power4.out', stagger: 0.07 }, '<');
  }

  if (quotaDonuts.length) {
    timeline.to(
      quotaDonuts,
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.13 },
      '-=0.2',
    );
  }

  if (quotaArcs.length) {
    timeline.to(
      quotaArcs,
      {
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.13,
        strokeDasharray: (_, arc) => `${arc.dataset.arcVisibleLength || '0'} ${arc.dataset.arcTotalLength || '0'}`,
      },
      '<',
    );
  }

  if (quotaCenters.length) {
    timeline.to(
      quotaCenters,
      { autoAlpha: 1, scale: 1, duration: 0.65, ease: 'power3.out', stagger: 0.13 },
      '-=0.5',
    );
  }

  initCountsOnView(countItems, {
    triggerResolver: (element) => element.closest('.flex') || element,
    entranceAnimation: (element) => {
      gsap.to(element, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    },
  });

  initCountsOnView(quotaCountItems, {
    triggerResolver: (element) => element.closest('[data-quota-donut]') || element,
  });

}

function initRhSectionAnimations() {
  const section = document.getElementById('rh-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const donuts = Array.from(section.querySelectorAll('[data-rh-donut]'));
  const arcs = Array.from(section.querySelectorAll('[data-rh-donut-arc]'));
  const donutCenters = Array.from(section.querySelectorAll('[data-rh-donut-center]'));
  const countItems = Array.from(section.querySelectorAll('[data-rh-count="true"][data-count-value]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  donuts.forEach((donut) => gsap.set(donut, { autoAlpha: 0, y: 24 }));
  arcs.forEach((arc) => {
    const dashArray = String(arc.getAttribute('stroke-dasharray') || '0 0').split(' ');
    const visibleLength = Number(dashArray[0] || '0');
    const totalLength = Number(dashArray[1] || dashArray[0] || '0');

    arc.dataset.arcVisibleLength = String(visibleLength);
    arc.dataset.arcTotalLength = String(totalLength);

    gsap.set(arc, { strokeDasharray: `0 ${totalLength}` });
  });
  donutCenters.forEach((center) => {
    gsap.set(center, { autoAlpha: 0, scale: 0.88, transformOrigin: 'center center' });
  });
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
  });

  const timeline = createScrollTimeline({ trigger: section, start: 'top 72%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.08 }));
  }

  if (donuts.length) {
    timeline.to(
      donuts,
      { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.13 },
      '-=0.2',
    );
  }

  if (arcs.length) {
    timeline.to(
      arcs,
      {
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.13,
        strokeDasharray: (_, arc) => `${arc.dataset.arcVisibleLength || '0'} ${arc.dataset.arcTotalLength || '0'}`,
      },
      '<',
    );
  }

  if (donutCenters.length) {
    timeline.to(
      donutCenters,
      { autoAlpha: 1, scale: 1, duration: 0.65, ease: 'power3.out', stagger: 0.13 },
      '-=0.45',
    );
  }

  if (countItems.length) {
    timeline.add(animateCountUp(countItems), '<');
  }
}


function initSupportSectionAnimations() {
  const section = document.getElementById('support-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const countItems = Array.from(section.querySelectorAll('[data-anim="4"][data-count-value]'));
  const statLines = Array.from(section.querySelectorAll('[data-stat-line]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
    gsap.set(item, { autoAlpha: 0, y: 10 });
  });
  statLines.forEach((line) => gsap.set(line, { scaleX: 0, transformOrigin: 'left center' }));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 72%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.08 }));
  }

  if (countItems.length) {
    timeline.to(countItems, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.35');
    timeline.add(animateCountUp(countItems), '<');
  }

  if (statLines.length) {
    timeline.to(statLines, { scaleX: 1, duration: 0.65, ease: 'power3.out', stagger: 0.08 }, '<');
  }
}

function initBrandsSectionAnimations() {
  const section = document.getElementById('brands-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const cards = Array.from(section.querySelectorAll('[data-brand-card]'));
  if (!cards.length) return;

  cards.forEach((card) => setAnimationInitial(card, ANIMATION_TYPES.FADE_RIGHT));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 75%' });
  timeline.add(toAnimation(cards, ANIMATION_TYPES.FADE_RIGHT, { stagger: 0.16 }));
}

/**
 * Fish curtain animation:
 * A separate white div sits inside an overflow-clip container behind the fish.
 * It starts pushed down 50% (yPercent: 50) so only the bottom half is visible,
 * then slides up to yPercent: 0 (full white) as the user scrolls.
 * GPU-accelerated via transform — no clip-path needed.
 */
function initFishCurtainAnimation() {
  const wrapper = document.getElementById('fish-transition');
  const curtain = document.getElementById('fish-white-curtain');
  if (!wrapper || !curtain || isReducedMotionPreferred()) return;

  gsap.fromTo(curtain,
    { yPercent: 50 },
    {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom',
        end: '+=600',
        scrub: 0.8,
        fastScrollEnd: true,
      },
    },
  );
}

/**
 * Plate backdrop pin animation:
 * 1. The plate starts fully visible on a white background.
 * 2. When the plate center hits the viewport center, the page pins (plate stays fixed).
 * 3. While pinned, the dark backdrop slides up from the bottom until it covers
 *    exactly the bottom half of the plate (clip stops at inset(50%)).
 * 4. Because the plate is centered in a 100vh container, inset(50%) from the top
 *    aligns exactly with the plate's vertical midpoint.
 * 5. After the animation completes, the pin releases and normal scroll resumes.
 */
function initPlateBackdropAnimation() {
  const wrapper = document.getElementById('plate-pin-wrapper');
  const backdrop = document.getElementById('plate-backdrop');
  if (!wrapper || !backdrop || isReducedMotionPreferred()) return;

  gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: 'center center',
      end: '+=600',
      pin: true,
      anticipatePin: 1,
      scrub: 1.5,
    },
  }).fromTo(
    backdrop,
    { clipPath: 'inset(50% 0 0 0)' },
    { clipPath: 'inset(0% 0 0 0)', ease: 'none' },
  );
}

function initDistributionSectionAnimations() {
  const section = document.getElementById('distribution-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="2"]'));
  const cards = Array.from(section.querySelectorAll('[data-distribution-card]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.FADE_LEFT));
  cards.forEach((card) => setAnimationInitial(card, ANIMATION_TYPES.FADE_UP));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 75%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.FADE_LEFT, { stagger: 0.12 }));
  }

  if (cards.length) {
    timeline.add(toAnimation(cards, ANIMATION_TYPES.FADE_UP, { stagger: 0.16 }), '-=0.25');
  }
}

function initQualitySectionAnimations() {
  const section = document.getElementById('quality-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const textItems = Array.from(section.querySelectorAll('[data-anim="1"]'));
  const countItems = Array.from(section.querySelectorAll('[data-anim="4"][data-count-value]'));
  const statLines = Array.from(section.querySelectorAll('[data-stat-line]'));

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z));
  countItems.forEach((item) => {
    const decimals = Number(item.dataset.countDecimals || '0');
    item.textContent = `${item.dataset.countPrefix || ''}${formatCountValue(0, decimals)}${item.dataset.countSuffix || ''}`;
    gsap.set(item, { autoAlpha: 0, y: 10 });
  });
  statLines.forEach((line) => gsap.set(line, { scaleX: 0, transformOrigin: 'left center' }));

  const timeline = createScrollTimeline({ trigger: section, start: 'top 72%' });

  if (textItems.length) {
    timeline.add(toAnimation(textItems, ANIMATION_TYPES.APPEAR_Z, { stagger: 0.08 }));
  }

  if (countItems.length) {
    timeline.to(countItems, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 }, '-=0.3');
    timeline.add(animateCountUp(countItems), '<');
  }

  if (statLines.length) {
    timeline.to(statLines, { scaleX: 1, duration: 0.65, ease: 'power3.out', stagger: 0.08 }, '<');
  }
}

function initTransformationSectionAnimations() {
  const section = document.getElementById('transformation-section');
  if (!section || isReducedMotionPreferred() || section.dataset.animInitialized === 'true') return;

  section.dataset.animInitialized = 'true';

  const topTextItems = Array.from(section.querySelectorAll('[data-transformation-top-text]'));
  const topImage = section.querySelector('[data-transformation-top-image]');
  const rightText = section.querySelector('[data-transformation-right-text]');
  if (!topTextItems.length && !topImage && !rightText) return;

  topTextItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.FADE_LEFT));

  if (topImage) {
    setAnimationInitial(topImage, ANIMATION_TYPES.FADE_UP);
  }

  if (rightText) {
    setAnimationInitial(rightText, ANIMATION_TYPES.FADE_UP);
  }

  const timeline = createScrollTimeline({ trigger: section, start: 'top 75%' });

  if (topTextItems.length) {
    timeline.add(toAnimation(topTextItems, ANIMATION_TYPES.FADE_LEFT, { stagger: 0.12 }));
  }

  if (topImage) {
    timeline.add(toAnimation(topImage, ANIMATION_TYPES.FADE_UP), '-=0.2');
  }

  if (rightText) {
    timeline.add(toAnimation(rightText, ANIMATION_TYPES.FADE_UP), '-=0.15');
  }
}

export function initExpertisesPage() {
  initHeroParallax();
  initSeaParallax();
  initSmokeParallax();
  initFishCurtainAnimation();
  initFishingSectionAnimations();
  initTransformationSectionAnimations();
  initQualitySectionAnimations();
  initPlateBackdropAnimation();
  initDistributionSectionAnimations();
  initBrandsSectionAnimations();
  initSupportSectionAnimations();
  initRhSectionAnimations();

  const tabs = Array.from(document.querySelectorAll('[data-expertise-tab]'));
  const sectionIds = ['peche', 'transformation', 'distribution', 'logistique', 'rh'];

  if (!tabs.length) return;

  const isMd = () => window.innerWidth >= 768;

  const setActiveTab = (targetId) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.target === targetId;
      tab.dataset.active = String(isActive);
      tab.setAttribute('aria-current', isActive ? 'page' : 'false');

      if (isMd()) {
        gsap.to(tab, {
          height: isActive ? 47 : 29,
          paddingTop: isActive ? 15 : 7,
          duration: 0.3,
          ease: 'power3.out',
          overwrite: true,
        });
      } else {
        tab.classList.toggle('md:h-[47px]', isActive);
        tab.classList.toggle('md:pt-[15px]', isActive);
        tab.classList.toggle('md:h-[29px]', !isActive);
        tab.classList.toggle('md:pt-[7px]', !isActive);
      }
    });
  };

  tabs.forEach((tab) => {
    if (tab.dataset.navInitialized === 'true') return;
    tab.dataset.navInitialized = 'true';
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      if (targetId) setActiveTab(targetId);
    });
  });

  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) {
    setActiveTab('peche');
    return;
  }

  const getStickyOffset = () => (window.innerWidth >= 1024 ? 194 : 150);

  const updateActiveFromScroll = () => {
    const referenceY = window.scrollY + getStickyOffset();
    let activeId = sections[0].id;

    sections.forEach((section) => {
      if (section.offsetTop <= referenceY) {
        activeId = section.id;
      }
    });

    setActiveTab(activeId);
  };

  const hashTarget = window.location.hash.replace('#', '');
  if (sectionIds.includes(hashTarget)) {
    setActiveTab(hashTarget);
  } else {
    updateActiveFromScroll();
  }

  if (document.body.dataset.expertisesScrollBound !== 'true') {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    }, { passive: true });

    window.addEventListener('resize', updateActiveFromScroll);
    document.body.dataset.expertisesScrollBound = 'true';
  }

  requestAnimationFrame(updateActiveFromScroll);

  // Refresh ScrollTrigger after all images load to prevent trigger drift
  if (document.readyState === 'complete') {
    ScrollTrigger.refresh();
  } else {
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }

  // Save parallax styles so orientation changes don't break layout
  ScrollTrigger.saveStyles('[data-hero-parallax-bg], [data-sea-parallax-bg], [data-smoke-parallax]');
}
