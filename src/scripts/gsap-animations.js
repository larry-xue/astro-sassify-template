import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Targets the main content area for page transitions
const MAIN_CONTENT_SELECTOR = '#main-content';

/**
 * Handles the animation for when a new page loads.
 * Fades in and slides up the main content.
 */
function pageLoadAnimation() {
  const mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
  if (mainContent) {
    // Ensure initial state is set before animation
    gsap.set(mainContent, { opacity: 0, y: 20 });
    gsap.to(mainContent, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  }
}

/**
 * Handles the animation for when the current page is about to be swapped.
 * Fades out and slides up the main content.
 * @param {Function} onComplete - Callback function to execute once the animation is finished.
 */
function pageExitAnimation(onComplete) {
  const mainContent = document.querySelector(MAIN_CONTENT_SELECTOR);
  if (mainContent) {
    gsap.to(mainContent, {
      opacity: 0,
      y: -20, // Slide up on exit
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        if (typeof onComplete === 'function') {
          onComplete();
        }
      }
    });
  } else if (typeof onComplete === 'function') {
    onComplete(); // If no main content, just call onComplete
  }
}

/**
 * Animates service cards using ScrollTrigger.
 * Cards fade and slide in when they enter the viewport.
 */
function animateServiceCards() {
  const cards = gsap.utils.toArray('.gsap-service-card');
  if (cards.length === 0) return;

  cards.forEach((card, index) => {
    gsap.set(card, { autoAlpha: 0, y: 50 }); // Initial state
    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%', // When top of card is 85% from top of viewport
      end: 'bottom 15%', // Optional: for scrub or toggleActions
      once: true, // Animate only once
      onEnter: () => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1, // Stagger animation
          ease: 'power2.out'
        });
      }
    });
  });
}

/**
 * Animates featured work items using ScrollTrigger.
 * Items fade, slide, and scale in when they enter the viewport.
 */
function animateFeaturedWorkItems() {
  const items = gsap.utils.toArray('.gsap-featured-work-item');
  if (items.length === 0) return;

  items.forEach((item, index) => {
    gsap.set(item, { autoAlpha: 0, y: 50, scale: 0.95 }); // Initial state
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(item, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out'
        });
      }
    });
  });
}

/**
 * Animates testimonial cards and the CTA section using ScrollTrigger.
 */
function animateTestimonials() {
  const cards = gsap.utils.toArray('.gsap-testimonial-card');
  const cta = document.querySelector('.gsap-testimonials-cta');

  if (cards.length > 0) {
    cards.forEach((card, index) => {
      gsap.set(card, { autoAlpha: 0, y: 50 }); // Initial state
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(card, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.15, // Stagger animation
            ease: 'power2.out'
          });
        }
      });
    });
  }

  if (cta) {
    gsap.set(cta, { autoAlpha: 0, y: 50 }); // Initial state
    ScrollTrigger.create({
      trigger: cta,
      start: 'top 90%', // Trigger a bit later for CTA
      once: true,
      onEnter: () => {
        gsap.to(cta, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      }
    });
  }
}

/**
 * Animates the main CTA section using ScrollTrigger.
 */
function animateCtaSection() {
  const section = document.querySelector('.gsap-cta-section');
  if (!section) return;

  gsap.set(section, { autoAlpha: 0, y: 50 }); // Initial state
  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(section, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    }
  });
}

// Astro page lifecycle event listeners
document.addEventListener('astro:page-load', () => {
  pageLoadAnimation(); // Animates #main-content

  // Hero Section Animations (if Hero component is on the page)
  const heroText = document.querySelector('.gsap-hero-text-content');
  const heroImage = document.querySelector('.gsap-hero-image-container');
  const heroTrustedBy = document.querySelector('.gsap-hero-trusted-by');

  if (heroText && heroImage) { // Check if primary hero elements exist
    // Ensure they are initially hidden if not already by CSS
    // Filter out null elements before passing to gsap.set
    const elementsToAnimate = [heroText, heroImage, heroTrustedBy].filter(el => el);
    if (elementsToAnimate.length > 0) {
      gsap.set(elementsToAnimate, { autoAlpha: 0, y: 30 });

      const tlHero = gsap.timeline({ delay: 0.3 }); // Delay slightly after main content fade-in
      tlHero
        .to(heroText, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        .to(heroImage, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, "-=0.4"); // Overlap animation slightly

      if (heroTrustedBy) { // Only animate if heroTrustedBy exists
        tlHero.to(heroTrustedBy, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, "-=0.3");
      }
    }
  }

  // Service Cards Animations
  animateServiceCards();

  // Featured Work Animations
  animateFeaturedWorkItems();

  // Testimonials animations
  animateTestimonials();

  // Main CTA Section animations
  animateCtaSection();
});

document.addEventListener('astro:before-swap', (event) => {
  // console.log('Astro: before-swap triggered');
  // To take full control of the transition and wait for GSAP:
  // 1. Add `data-astro-transition="manual"` to links or html element.
  // 2. Call `event.preventDefault()` here.
  // 3. Then, in the onComplete callback of pageExitAnimation, call `event.swap()`.

  // For now, we're letting Astro swap immediately after this handler.
  // The exit animation might be cut short or look janky without manual control.
  pageExitAnimation(() => {
    // console.log('GSAP exit animation complete. Astro will now swap.');
    // If event.preventDefault() was called, event.swap() would be called here.
  });
});
