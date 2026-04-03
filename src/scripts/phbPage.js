import {
  ANIMATION_TYPES,
  countUp,
  createScrollTimeline,
  gsap,
  isReducedMotionPreferred,
  ScrollTrigger,
  setAnimationInitial,
  toAnimation,
} from "./animation.js"

function initHeroAnimations() {
  const heroSection = document.querySelector('[data-phb-hero]')
  if (!heroSection || isReducedMotionPreferred() || heroSection.dataset.animInitialized === 'true') return

  heroSection.dataset.animInitialized = 'true'

  const textItems = Array.from(heroSection.querySelectorAll('[data-anim="2"]'))
  if (!textItems.length) return

  textItems.forEach((item) => setAnimationInitial(item, ANIMATION_TYPES.FADE_LEFT))

  // Above-fold — load-triggered entrance, not scroll-triggered
  gsap.to(textItems, {
    autoAlpha: 1,
    x: 0,
    duration: 0.85,
    ease: 'power3.out',
    stagger: 0.13,
    delay: 0.4,
  })
}

function initSectionAnimations(sectionId) {
  const section = document.getElementById(sectionId)
  if (
    !section ||
    isReducedMotionPreferred() ||
    section.dataset.animInitialized === "true"
  )
    return

  section.dataset.animInitialized = "true"

  const appearItems = Array.from(section.querySelectorAll('[data-anim="1"]'))
  const fadeLeftItems = Array.from(section.querySelectorAll('[data-anim="2"]'))
  const fadeUpItems = Array.from(section.querySelectorAll('[data-anim="3"]'))
  const fadeRightItems = Array.from(section.querySelectorAll('[data-anim="4"]'))
  const statLines = Array.from(section.querySelectorAll("[data-stat-line]"))
  const countEls = Array.from(section.querySelectorAll("[data-count]"))

  appearItems.forEach((item) =>
    setAnimationInitial(item, ANIMATION_TYPES.APPEAR_Z),
  )
  fadeLeftItems.forEach((item) =>
    setAnimationInitial(item, ANIMATION_TYPES.FADE_LEFT),
  )
  fadeUpItems.forEach((item) =>
    setAnimationInitial(item, ANIMATION_TYPES.FADE_UP),
  )
  fadeRightItems.forEach((item) =>
    setAnimationInitial(item, ANIMATION_TYPES.FADE_RIGHT),
  )
  statLines.forEach((line) =>
    gsap.set(line, {scaleX: 0, transformOrigin: "left center"}),
  )

  const timeline = createScrollTimeline({trigger: section, start: "top 75%"})

  if (fadeLeftItems.length) {
    timeline.add(
      toAnimation(fadeLeftItems, ANIMATION_TYPES.FADE_LEFT, {stagger: 0.08}),
    )
  }

  if (appearItems.length) {
    timeline.add(
      toAnimation(appearItems, ANIMATION_TYPES.APPEAR_Z, {stagger: 0.08}),
      fadeLeftItems.length ? "-=0.6" : undefined,
    )
  }

  if (fadeUpItems.length) {
    timeline.add(
      toAnimation(fadeUpItems, ANIMATION_TYPES.FADE_UP, {stagger: 0.12}),
      fadeLeftItems.length || appearItems.length ? "-=0.5" : undefined,
    )
  }

  if (fadeRightItems.length) {
    timeline.add(
      toAnimation(fadeRightItems, ANIMATION_TYPES.FADE_RIGHT, {stagger: 0.12}),
      fadeLeftItems.length || appearItems.length || fadeUpItems.length ? "-=0.5" : undefined,
    )
  }

  if (statLines.length) {
    timeline.to(
      statLines,
      {scaleX: 1, duration: 0.85, ease: "power4.out", stagger: 0.07},
      "<",
    )
  }

  // Each count element gets its own ScrollTrigger so it fires when visible
  countEls.forEach((el) => {
    const original = el.textContent.trim()
    const match = original.match(/^([^\d]*)(\d[\d\s.,]*\d|\d)(.*)$/)
    if (match) el.textContent = match[1] + "0" + match[3]

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter() {
        el.textContent = original
        countUp(el, {duration: 1.8})
      },
    })
  })
}

export function initPhbPage() {
  initHeroAnimations()
  initSectionAnimations("presentation")
  initSectionAnimations("historique")
  initSectionAnimations("chiffres-cles")
  initSectionAnimations("production")
  initSectionAnimations("nos-produits")
}
