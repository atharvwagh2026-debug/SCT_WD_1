/* ============================================================
   MEXTRAZON — script.js
   Organized into small, reusable functions grouped by feature.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initMobileMenu();
  initSmoothAnchorClose();
  initScrollReveal();
  initCounters();
  initFAQ();
  initBackToTop();
  initActiveNavLink();
  initContactForm();
});

/* ------------------------------------------------------------
   Theme Toggle (dark / light, persisted in memory for session)
   ------------------------------------------------------------ */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const body = document.body;

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const isLight = body.getAttribute('data-theme') === 'light';
    body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    toggle.setAttribute('aria-pressed', String(!isLight));
  });
}

/* ------------------------------------------------------------
   Navbar background on scroll
   ------------------------------------------------------------ */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 12) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

/* ------------------------------------------------------------
   Mobile hamburger menu
   ------------------------------------------------------------ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    hamburger.classList.toggle('is-active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

/* ------------------------------------------------------------
   Close mobile menu automatically when a nav link is clicked
   ------------------------------------------------------------ */
function initSmoothAnchorClose() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (!navLinks) return;

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      if (hamburger) {
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/* ------------------------------------------------------------
   Scroll Reveal — IntersectionObserver based fade/slide-in
   ------------------------------------------------------------ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   Animated stat counters (hero section)
   ------------------------------------------------------------ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------
   FAQ accordion
   ------------------------------------------------------------ */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-item__question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other items for a clean accordion behavior
      items.forEach((other) => {
        other.classList.remove('is-open');
        const otherQuestion = other.querySelector('.faq-item__question');
        if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ------------------------------------------------------------
   Back to top button
   ------------------------------------------------------------ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const toggleVisibility = () => {
    btn.classList.toggle('is-visible', window.scrollY > 480);
  };

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  });
}

/* ------------------------------------------------------------
   Contact form — client-side validation + fake submit feedback
   ------------------------------------------------------------ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = 'Please fill in all required fields correctly.';
      status.style.color = '#ff6f6f';
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending…</span>';

    // Simulate a network request since this is a static front-end demo
    setTimeout(() => {
      status.style.color = '';
      status.textContent = "Thanks — your message is in. We'll reply within one business day.";
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;
      form.reset();
    }, 1100);
  });
}

/* ------------------------------------------------------------
   Active nav link highlighting on scroll (scroll-spy)
   ------------------------------------------------------------ */
function initActiveNavLink() {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const sections = document.querySelectorAll('section[id], main[id]');
  if (!navLinks.length || !sections.length) return;

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isMatch);
    });
  };

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}