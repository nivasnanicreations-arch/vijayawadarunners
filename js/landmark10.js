/**
 * VIJAYAWADA RUNNERS - 10TH LANDMARK EDITION MARATHON
 * Professional Athletic Interaction Engine
 * Features: Timeline Progress, Route Telemetry, Dynamic Bib Customizer, Accordions
 */

(function () {
  'use strict';

  // Smooth Anchor Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // =========================================================================
  // 1. THE LEGACY TIMELINE: PROGRESSION TRACK
  // =========================================================================
  function initTimelineGrowth() {
    const timelineSection = document.getElementById('legacy');
    const redTrack = document.getElementById('timeline-red-growth');
    const timelineNodes = document.querySelectorAll('.timeline-node-item');

    if (!timelineSection || !redTrack) return;

    function updateTimeline() {
      const rect = timelineSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startOffset = windowHeight * 0.75;
      const totalDistance = rect.height - windowHeight * 0.2;
      const currentScroll = startOffset - rect.top;

      let progress = currentScroll / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      redTrack.style.height = `${progress * 100}%`;

      const trackRect = redTrack.getBoundingClientRect();
      const currentRedTip = trackRect.top + trackRect.height;

      timelineNodes.forEach(node => {
        const marker = node.querySelector('.timeline-milestone-marker');
        if (marker) {
          const markerRect = marker.getBoundingClientRect();
          const markerCenter = markerRect.top + markerRect.height / 2;

          if (markerCenter <= currentRedTip + 15) {
            node.classList.add('active-node');
          } else {
            node.classList.remove('active-node');
          }
        }
      });
    }

    window.addEventListener('scroll', updateTimeline, { passive: true });
    window.addEventListener('resize', updateTimeline, { passive: true });
    updateTimeline();
  }

  // =========================================================================
  // 2. SVG ROUTE ANIMATION & RUNNER BEACON PROGRESSION
  // =========================================================================
  function initRouteMapAnimator() {
    const routeSection = document.getElementById('route');
    const path21k = document.getElementById('svg-race-path-21k');
    const runnerBeacon = document.getElementById('runner-beacon-group');
    const hudKm = document.getElementById('hud-km-val');
    const hudElev = document.getElementById('hud-elevation-val');
    const routeSwitches = document.querySelectorAll('.btn-route-switch');

    if (!routeSection || !path21k || !runnerBeacon) return;

    const pathLength = path21k.getTotalLength();
    path21k.style.strokeDasharray = pathLength;
    path21k.style.strokeDashoffset = pathLength;

    let targetDistanceKm = 21.1;

    routeSwitches.forEach(btn => {
      btn.addEventListener('click', () => {
        routeSwitches.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const dist = btn.dataset.route;

        if (dist === '5k') {
          targetDistanceKm = 5.0;
          path21k.setAttribute('d', 'M 320 280 C 370 295, 450 310, 520 330 C 580 345, 620 365, 660 380');
          if (hudElev) hudElev.textContent = '+6M FLAT CANAL';
        } else if (dist === '10k') {
          targetDistanceKm = 10.0;
          path21k.setAttribute('d', 'M 320 280 C 370 295, 450 310, 520 330 C 580 345, 640 375, 710 405 C 760 425, 800 450, 830 475 C 800 500, 740 480, 680 440');
          if (hudElev) hudElev.textContent = '+24M RIVER GRADIENT';
        } else {
          targetDistanceKm = 21.1;
          path21k.setAttribute('d', 'M 180 230 C 230 250, 270 265, 320 280 C 390 300, 470 320, 540 338 C 610 355, 680 380, 740 415 C 800 450, 840 490, 860 540 C 880 590, 850 630, 790 650 C 720 670, 630 650, 570 610 C 500 565, 440 500, 390 440 C 340 380, 270 320, 220 280 Z');
          if (hudElev) hudElev.textContent = '+42M BARRAGE & HIGHWAY';
        }

        const newLen = path21k.getTotalLength();
        path21k.style.strokeDasharray = newLen;
        path21k.style.strokeDashoffset = newLen;
        updateRouteOnScroll();
      });
    });

    function updateRouteOnScroll() {
      const rect = routeSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visibleRange = windowHeight + rect.height;
      const progressIntoSection = (windowHeight - rect.top) / visibleRange;
      const clamped = Math.max(0, Math.min(1, (progressIntoSection - 0.25) / 0.55));

      const currentPathLength = path21k.getTotalLength();
      const currentDash = currentPathLength * (1 - clamped);
      path21k.style.strokeDashoffset = currentDash;

      const pointAtLength = path21k.getPointAtLength(currentPathLength * clamped);
      runnerBeacon.setAttribute('transform', `translate(${pointAtLength.x}, ${pointAtLength.y})`);

      const currentKm = (targetDistanceKm * clamped).toFixed(1);
      if (hudKm) hudKm.textContent = `${currentKm} KM`;
    }

    window.addEventListener('scroll', updateRouteOnScroll, { passive: true });
    updateRouteOnScroll();
  }

  // =========================================================================
  // 3. ROTATING REGISTRATION BADGE
  // =========================================================================
  function initRotatingBadge() {
    const badge = document.getElementById('floating-badge');
    const svgCircle = badge ? badge.querySelector('.badge-rotating-svg') : null;

    if (!badge || !svgCircle) return;

    let rotationDegree = 0;
    let lastScroll = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScroll;
      rotationDegree += delta * 0.35;
      svgCircle.style.transform = `rotate(${rotationDegree}deg)`;
      lastScroll = currentScroll;
    }, { passive: true });

    badge.addEventListener('click', () => {
      openRegistrationModal('21.1k');
    });
  }

  // =========================================================================
  // 4. OFFICIAL COUNTDOWN TIMER TO 06.12.2026 (05:00 AM IST)
  // =========================================================================
  function initCountdownTimer() {
    const targetDate = new Date('2026-12-06T05:00:00+05:30').getTime();

    const dEl = document.getElementById('count-days');
    const hEl = document.getElementById('count-hours');
    const mEl = document.getElementById('count-mins');
    const sEl = document.getElementById('count-secs');

    if (!dEl || !hEl || !mEl || !sEl) return;

    function update() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        dEl.textContent = '00';
        hEl.textContent = '00';
        mEl.textContent = '00';
        sEl.textContent = '00';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      dEl.textContent = String(days).padStart(2, '0');
      hEl.textContent = String(hours).padStart(2, '0');
      mEl.textContent = String(minutes).padStart(2, '0');
      sEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // =========================================================================
  // 5. REGISTRATION MODAL / DRAWER SYSTEM & DYNAMIC BIB CUSTOMIZER
  // =========================================================================
  const modalBackdrop = document.getElementById('reg-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const catButtons = document.querySelectorAll('.modal-cat-btn');
  const bibNumberEl = document.getElementById('bib-number-val');
  const bibNameEl = document.getElementById('bib-name-val');
  const inputName = document.getElementById('reg-fullname');
  const regForm = document.getElementById('landmark-reg-form');

  window.openRegistrationModal = function (category) {
    if (!modalBackdrop) return;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (category) {
      selectCategory(category);
    }
  };

  function closeRegistrationModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeRegistrationModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeRegistrationModal();
    });
  }

  document.querySelectorAll('.btn-open-register').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.dataset.category || '21.1k';
      openRegistrationModal(cat);
    });
  });

  function selectCategory(categoryKey) {
    catButtons.forEach(b => {
      if (b.dataset.category === categoryKey) {
        b.classList.add('selected');
      } else {
        b.classList.remove('selected');
      }
    });

    if (bibNumberEl) {
      if (categoryKey === '21.1k') bibNumberEl.textContent = '21' + Math.floor(100 + Math.random() * 899);
      else if (categoryKey === '10k') bibNumberEl.textContent = '10' + Math.floor(100 + Math.random() * 899);
      else bibNumberEl.textContent = '05' + Math.floor(100 + Math.random() * 899);
    }
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectCategory(btn.dataset.category);
    });
  });

  if (inputName && bibNameEl) {
    inputName.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      bibNameEl.textContent = val ? val.toUpperCase() : 'ATHLETE NAME';
    });
  }

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = inputName ? inputName.value : 'Athlete';
      const bib = bibNumberEl ? bibNumberEl.textContent : '21098';

      regForm.innerHTML = `
        <div style="text-align: center; padding: 20px 0;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--red); color: var(--cream); font-size: 1.8rem; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <i class="fa-solid fa-check"></i>
          </div>
          <h3 style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--cream); margin-bottom: 6px;">ENTRY RESERVED</h3>
          <p style="font-size: 1rem; color: var(--cream-soft); margin-bottom: 20px;">
            Registration confirmed for <strong>${name}</strong>!<br>
            Your Official Race Bib is <span style="font-family: var(--font-display); font-size: 1.4rem; color: var(--red); font-weight: 800;">#${bib}</span>.
          </p>
          <div style="background: rgba(245, 245, 220, 0.08); border: 1px solid var(--cream-border); border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: left; font-size: 0.85rem; color: var(--cream-dim); line-height: 1.6;">
            <div>• DATE: 06.12.2026 | SUNDAY 05:00 AM IST</div>
            <div>• VENUE: PRAKASAM BARRAGE, VIJAYAWADA</div>
            <div>• TIMING CHIP: RFID MAT ASSIGNED</div>
            <div>• FINISHER PERK: 10TH LANDMARK DIE-CAST MEDAL</div>
          </div>
          <button type="button" class="btn-confirm-reg" onclick="window.print()" style="margin-bottom: 10px;">
            <i class="fa-solid fa-print"></i> PRINT CONFIRMATION SLIP
          </button>
          <button type="button" class="btn-hero-secondary" style="width: 100%; justify-content: center;" onclick="document.getElementById('reg-modal-backdrop').classList.remove('open'); document.body.style.overflow='';">
            CLOSE & EXPLORE DETAILS
          </button>
        </div>
      `;
    });
  }

  // =========================================================================
  // 6. FAQ ACCORDION HANDLER
  // =========================================================================
  function initFaqAccordion() {
    const items = document.querySelectorAll('.faq-accordion-item');
    items.forEach(item => {
      const trigger = item.querySelector('.faq-header-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          items.forEach(other => other.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      }
    });
  }

  // =========================================================================
  // 7. GALLERY FILTER HANDLER
  // =========================================================================
  function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card-item');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // =========================================================================
  // 8. NAVBAR SCROLL ELEVATION
  // =========================================================================
  function initNavScroll() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // =========================================================================
  // 9. HERO VIDEO AUTOPLAY ASSURANCE
  // =========================================================================
  function initHeroVideoAutoplay() {
    const video = document.getElementById('hero-bg-video');
    if (!video) return;

    video.muted = true;
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // In case of browser strict policy, trigger play on first interaction
        const startVideo = () => {
          video.play();
          ['click', 'touchstart', 'scroll'].forEach(evt => {
            window.removeEventListener(evt, startVideo);
          });
        };
        ['click', 'touchstart', 'scroll'].forEach(evt => {
          window.addEventListener(evt, startVideo, { passive: true });
        });
      });
    }
  }

  // =========================================================================
  // BOOTSTRAP ALL SYSTEMS
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initHeroVideoAutoplay();
    initTimelineGrowth();
    initRouteMapAnimator();
    initRotatingBadge();
    initCountdownTimer();
    initNavScroll();
    initFaqAccordion();
    initGalleryFilters();
  });

})();
