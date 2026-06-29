const transitionState = window.__sassifyTransitions ??= {
  initialized: false,
  pageController: null,
  cleanupTimeouts: []
};

function cleanupPageEffects() {
  transitionState.pageController?.abort();
  transitionState.pageController = null;

  transitionState.cleanupTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  transitionState.cleanupTimeouts = [];
}

function initializePageEffects() {
  cleanupPageEffects();

  const controller = new AbortController();
  const { signal } = controller;
  transitionState.pageController = controller;

  document.querySelectorAll('[data-animate]').forEach((element, index) => {
    const animationType = element.getAttribute('data-animate');
    const delay = element.getAttribute('data-delay') || index * 100;

    if (!animationType) return;

    element.style.animationDelay = `${delay}ms`;

    const timeoutId = window.setTimeout(() => {
      if (signal.aborted) return;

      element.classList.add(animationType);
      element.classList.add('animated');
    }, 10);

    transitionState.cleanupTimeouts.push(timeoutId);
  });

  const parallaxElements = document.querySelectorAll('[data-parallax]');

  if (parallaxElements.length > 0) {
    const handleParallax = () => {
      parallaxElements.forEach((element) => {
        const speed = Number(element.getAttribute('data-parallax') || 0.1);
        const yPos = -(window.scrollY * speed);

        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax, { signal, passive: true });
  }

  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId) return;

      const targetElement = document.querySelector(targetId);

      if (!targetElement) return;

      event.preventDefault();

      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.pageYOffset,
        behavior: 'smooth'
      });
    }, { signal });
  });

  document.querySelectorAll('[data-page-transition]').forEach((element) => {
    const transitionType = element.getAttribute('data-page-transition');

    if (transitionType) {
      element.classList.add(`transition-${transitionType}`);
    }
  });

  const navDirection = localStorage.getItem('navigationDirection');

  if (navDirection) {
    document.documentElement.setAttribute('data-navigation', navDirection);

    const timeoutId = window.setTimeout(() => {
      localStorage.removeItem('navigationDirection');
    }, 1000);

    transitionState.cleanupTimeouts.push(timeoutId);
  }
}

if (!transitionState.initialized) {
  transitionState.initialized = true;

  document.addEventListener('astro:before-preparation', ({ from, to }) => {
    if (!from || !to) return;

    const fromPath = new URL(from).pathname;
    const toPath = new URL(to).pathname;
    const fromDepth = fromPath.split('/').filter(Boolean).length;
    const toDepth = toPath.split('/').filter(Boolean).length;
    let navDirection = 'same';

    if (toDepth > fromDepth) {
      navDirection = 'deeper';
    } else if (toDepth < fromDepth) {
      navDirection = 'shallower';
    }

    localStorage.setItem('navigationDirection', navDirection);
  });

  document.addEventListener('astro:before-swap', cleanupPageEffects);
  document.addEventListener('astro:page-load', initializePageEffects);
}
