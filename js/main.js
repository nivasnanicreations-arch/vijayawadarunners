/**
 * VIJAYAWADA MARATHON 2026 — 10TH LANDMARK EDITION
 * Interactive Engine & Experience Controller
 *
 * Theme: "RUN THE CITY. FEEL THE MOMENT."
 * Palette: Warm Sunrise Editorial (#F7F1E8, #FFF9F3, #D96F3D, #332C28)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initRaceProgressBar();
  initCountdown();
  initRouteCarousel();
  initFaqAccordion();
  initModals();
  initMobileMenu();
  initGalleryLightbox();
  initReducedMotionObserver();
});

/* ===================================================================
   1. STICKY HEADER & SCROLL BEHAVIOR
   =================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===================================================================
   2. RACE SCROLL PROGRESS & PACE TRAIL BREADCRUMB
   START ───●─── 5K ───●─── 10K ───●─── 21K ───●─── FINISH
   =================================================================== */
function initRaceProgressBar() {
  const progressFill = document.querySelector('.race-progress-fill');
  const paceLabel = document.querySelector('.pace-trail-text');

  const checkpoints = [
    { threshold: 0.00, label: 'START ARENA' },
    { threshold: 0.25, label: '5K CHECKPOINT' },
    { threshold: 0.50, label: '10K RIVERFRONT' },
    { threshold: 0.75, label: '21K HALF MARATHON' },
    { threshold: 0.95, label: 'FINISH ARCH' }
  ];

  const onScroll = () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal <= 0) return;

    const currentScroll = window.scrollY;
    const progress = Math.min(Math.max(currentScroll / scrollTotal, 0), 1);

    if (progressFill) {
      progressFill.style.width = `${(progress * 100).toFixed(1)}%`;
    }

    if (paceLabel) {
      let currentMarker = checkpoints[0].label;
      for (const cp of checkpoints) {
        if (progress >= cp.threshold) {
          currentMarker = cp.label;
        }
      }
      paceLabel.textContent = currentMarker;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===================================================================
   3. LIVE COUNTDOWN TO 6 DECEMBER 2026, 5:00 AM IST
   =================================================================== */
function initCountdown() {
  const targetIso = (window.MARATHON_CONFIG && window.MARATHON_CONFIG.event && window.MARATHON_CONFIG.event.targetDateIso)
    ? window.MARATHON_CONFIG.event.targetDateIso
    : '2026-12-06T05:00:00+05:30';

  const targetDate = new Date(targetIso).getTime();

  const daysEls = document.querySelectorAll('[data-unit="days"]');
  const hoursEls = document.querySelectorAll('[data-unit="hours"]');
  const minsEls = document.querySelectorAll('[data-unit="minutes"]');
  const secsEls = document.querySelectorAll('[data-unit="seconds"]');

  if (!daysEls.length) return;

  function update() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      setDigits('00', '00', '00', '00');
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    setDigits(
      String(d).padStart(2, '0'),
      String(h).padStart(2, '0'),
      String(m).padStart(2, '0'),
      String(s).padStart(2, '0')
    );
  }

  function setDigits(d, h, m, s) {
    daysEls.forEach(el => el.textContent = d);
    hoursEls.forEach(el => el.textContent = h);
    minsEls.forEach(el => el.textContent = m);
    secsEls.forEach(el => el.textContent = s);
  }

  update();
  setInterval(update, 1000);
}

/* ===================================================================
   4. ROUTE CAROUSEL TABS (5K · 10K · 21K)
   =================================================================== */
function initRouteCarousel() {
  const tabBtns = document.querySelectorAll('.route-btn');
  const panes = document.querySelectorAll('.route-pane-content');

  if (!tabBtns.length || !panes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-route');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const activePane = document.getElementById(targetId);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}

/* ===================================================================
   5. ACCESSIBLE FAQ ACCORDION (13 QUESTIONS)
   =================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other accordions for clean editorial focus
      faqItems.forEach(other => {
        other.classList.remove('is-open');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ===================================================================
   6. ACCESSIBLE MODALS (REGISTRATION & SPONSOR FORMS)
   =================================================================== */
function initModals() {
  const registerModal = document.getElementById('registerModal');
  const sponsorModal = document.getElementById('sponsorModal');

  // Open triggers
  document.querySelectorAll('[data-open-register]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const distance = btn.getAttribute('data-distance');
      if (registerModal) {
        if (distance) {
          const select = registerModal.querySelector('select[name="distance"]');
          if (select) select.value = distance;
        }
        openModal(registerModal);
      }
    });
  });

  document.querySelectorAll('[data-open-sponsor]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (sponsorModal) openModal(sponsorModal);
    });
  });

  // Close triggers
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (registerModal) closeModal(registerModal);
      if (sponsorModal) closeModal(sponsorModal);
    });
  });

  // Backdrop click & Escape key listener
  [registerModal, sponsorModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (registerModal && !registerModal.hasAttribute('hidden')) closeModal(registerModal);
      if (sponsorModal && !sponsorModal.hasAttribute('hidden')) closeModal(sponsorModal);
    }
  });

  // Handle Form Submissions
  const regForm = document.getElementById('marathonRegistrationForm');
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = regForm.fullName.value.trim();
      const phone = regForm.mobile.value.trim();
      const distance = regForm.distance.value;
      const email = regForm.email.value.trim();

      const message = `Namaste Vijayawada Runners! I would like to express interest for Vijayawada Marathon 2026 (10th Edition):\nName: ${name}\nMobile: ${phone}\nEmail: ${email}\nCategory: ${distance}`;
      const waUrl = `https://wa.me/919000000000?text=${encodeURIComponent(message)}`;

      window.open(waUrl, '_blank');
      closeModal(registerModal);
      alert('Thank you! Redirecting to WhatsApp to complete your race confirmation.');
    });
  }

  const sponForm = document.getElementById('sponsorEnquiryForm');
  if (sponForm) {
    sponForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = sponForm.contactName.value.trim();
      const company = sponForm.companyName.value.trim();
      const phone = sponForm.mobile.value.trim();
      const tier = sponForm.tierInterest.value;

      const message = `Hello Vijayawada Runners Partnership Team!\nI am inquiring about official sponsorship for Vijayawada Marathon 2026:\nName: ${name}\nCompany: ${company}\nMobile: ${phone}\nTier: ${tier}`;
      const waUrl = `https://wa.me/919000000000?text=${encodeURIComponent(message)}`;

      window.open(waUrl, '_blank');
      closeModal(sponsorModal);
      alert('Thank you! Our sponsorship director will connect with your team shortly.');
    });
  }

  const contactForm = document.getElementById('contactInterestForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.fullName.value.trim();
      const phone = contactForm.mobile.value.trim();
      const interest = contactForm.interest.value;
      const message = `Namaste Vijayawada Runners! My name is ${name} (${phone}). I would like to inquire about: ${interest} for Vijayawada Marathon 2026.`;
      const waUrl = `https://wa.me/919000000000?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      alert('Thank you! Redirecting to WhatsApp to send your inquiry.');
    });
  }

  function openModal(modal) {
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input, select, textarea, button');
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  }

  function closeModal(modal) {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }
}

/* ===================================================================
   7. MOBILE NAVIGATION DRAWER
   =================================================================== */
function initMobileMenu() {
  const trigger = document.querySelector('.mobile-menu-trigger');
  const drawer = document.getElementById('mobileNavDrawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const navLinks = document.querySelectorAll('.mobile-drawer-link');

  if (!trigger || !drawer) return;

  const openDrawer = () => {
    drawer.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  trigger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });
}

/* ===================================================================
   8. PREFERS-REDUCED-MOTION OBSERVER
   =================================================================== */
function initReducedMotionObserver() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    document.documentElement.classList.add('reduced-motion');
  }
}

/* ===================================================================
   9. GALLERY FILTER & ACCESSIBLE LIGHTBOX WITH PREV/NEXT
   =================================================================== */
function initGalleryLightbox() {
  const tabBtns = document.querySelectorAll('.gallery-tab-btn');
  const photoCards = Array.from(document.querySelectorAll('.photo-card'));
  const lightbox = document.getElementById('galleryLightbox');

  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCap = document.getElementById('lightboxCaption');
  const closeBtn = lightbox.querySelector('.lightbox-close-btn');
  const prevBtn = lightbox.querySelector('.lightbox-prev-btn');
  const nextBtn = lightbox.querySelector('.lightbox-next-btn');

  let activeList = [...photoCards];
  let currentIndex = 0;

  // Filter tabs
  if (tabBtns.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const year = btn.getAttribute('data-year');
        activeList = [];

        photoCards.forEach(card => {
          if (year === 'all' || card.getAttribute('data-year') === year) {
            card.style.display = '';
            activeList.push(card);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  function showPhoto(idx) {
    if (!activeList.length) return;
    if (idx < 0) idx = activeList.length - 1;
    if (idx >= activeList.length) idx = 0;
    currentIndex = idx;

    const card = activeList[currentIndex];
    const fullSrc = card.getAttribute('data-full');
    const caption = card.getAttribute('data-caption') || '';

    if (lightboxImg) lightboxImg.src = fullSrc;
    if (lightboxCap) lightboxCap.textContent = caption;
  }

  // Open on card click
  photoCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = activeList.indexOf(card);
      if (idx !== -1) {
        showPhoto(idx);
        lightbox.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPhoto(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showPhoto(currentIndex + 1); });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener('keydown', (e) => {
    if (lightbox.hasAttribute('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });
}

