/**
 * Vijayawada Runners — Multi-Page Application Engine
 * Adapted from authentic Harinathstudio reference architecture (https://harinathstudio.com/bez/)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHeroSlider();
  initCountdown();
  initStatsCounter();
  initLightbox();
  initRegisterModal();
  initRouteTabs();
  initFaqAccordion();
});

/* 1. Header scroll blur */
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* 2. Hero Background Image Slider (3 slides rotation) */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const pagBtns = document.querySelectorAll('.hero-pagination button');
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    pagBtns.forEach((b, i) => b.classList.toggle('is-active', i === index));
    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  timer = setInterval(nextSlide, 6500);

  pagBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      clearInterval(timer);
      showSlide(idx);
      timer = setInterval(nextSlide, 6500);
    });
  });
}

/* 3. Live Marathon Countdown: 6 December 2026, 5:00 AM IST */
function initCountdown() {
  const target = new Date('2026-12-06T05:00:00+05:30').getTime();

  const daysEl = document.querySelector('[data-unit="days"]');
  const hoursEl = document.querySelector('[data-unit="hours"]');
  const minsEl = document.querySelector('[data-unit="minutes"]');
  const secsEl = document.querySelector('[data-unit="seconds"]');

  if (!daysEl) return;

  function update() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(d).padStart(2, '0');
    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* 4. Animated Stats Counter */
function initStatsCounter() {
  const statSection = document.querySelector('.stats-section');
  if (!statSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let start = null;
        const tick = (time) => {
          start ??= time;
          const p = Math.min((time - start) / 1400, 1);
          el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      observer.disconnect();
    });
  }, { threshold: 0.3 });

  observer.observe(statSection);
}

/* 5. Lightbox & Gallery Filter */
function initLightbox() {
  const lightbox = document.querySelector('.gallery-lightbox');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const photoCards = document.querySelectorAll('.photo-card');

  if (lightbox) {
    lightbox.setAttribute('hidden', '');
  }

  if (tabBtns.length && photoCards.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const year = btn.dataset.year;
        photoCards.forEach(card => {
          if (year === 'all' || card.dataset.year === year) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  if (lightbox) {
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const imgEl = lightbox.querySelector('img');
    const capEl = lightbox.querySelector('figcaption');

    document.querySelectorAll('[data-full]').forEach(item => {
      item.addEventListener('click', () => {
        const fullSrc = item.dataset.full;
        const cap = item.dataset.caption || '';
        if (imgEl) imgEl.src = fullSrc;
        if (capEl) capEl.textContent = cap;
        lightbox.removeAttribute('hidden');
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => lightbox.setAttribute('hidden', ''));
    }
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.setAttribute('hidden', '');
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.setAttribute('hidden', '');
    });
  }
}

/* 6. Registration Modal Dialog */
function initRegisterModal() {
  const modal = document.querySelector('.register-modal');
  if (!modal) return;

  const openBtns = document.querySelectorAll('[data-register]');
  const closeBtn = modal.querySelector('.register-close');
  const form = document.querySelector('#interestForm');

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.removeAttribute('hidden');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.setAttribute('hidden', '');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.setAttribute('hidden', '');
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value;
      const phone = form.phone.value;
      const interest = form.interest.value;
      const msg = `Hi Vijayawada Runners! My name is ${name} (${phone}). I am interested in ${interest} for the 10th Marathon Edition.`;
      const url = `https://wa.me/919000000000?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
      modal.setAttribute('hidden', '');
      alert('Thank you! Redirecting to WhatsApp to complete your registration.');
    });
  }
}

/* 7. Route Carousel Tabs */
function initRouteTabs() {
  const tabs = document.querySelectorAll('.route-tab-btn');
  const panes = document.querySelectorAll('.route-pane');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* 8. FAQ Accordion */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const q = item.querySelector('.faq-question');
    if (q) {
      q.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });
}
