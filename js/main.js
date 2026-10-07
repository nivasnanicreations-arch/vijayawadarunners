/**
 * VIJAYAWADA MARATHON 2026 — 10TH EDITION
 * Master Cinematic Script: "BEFORE THE CITY WAKES."
 * 
 * Features:
 * 1. Scroll-Driven Cinematic Hero Engine (8-Frame Title Sequence & Dawn Lighting Shift)
 * 2. Side Chapter Progress Tracker (●──●──●)
 * 3. Dynamic Interactive Route Map Engine (05K / 10K / 21K SVG Drawing & Checkpoints)
 * 4. High-Precision Race Countdown Clock (Target: 6 Dec 2026 5:00 AM IST)
 * 5. Interactive Masonry Photography Wall & Lightbox
 * 6. Multi-Step Registration Modal with Simulated Bib Generator
 * 7. Sponsor & Partner Inquiry Modal
 * 8. FAQ Accordion with Accessibility
 * 9. GPU-Friendly Atmospheric Particle Canvas (Morning mist & dust motes)
 * 10. Web Audio API Dawn Ambiance (Wind & gentle heartbeat, muted by default)
 * 11. Contextual Custom Desktop Cursor
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Canvas & Background Atmosphere
  initAtmosphericCanvas();

  // 2. Initialize Master Cinematic Hero Engine
  initCinematicHeroScroll();

  // 3. Initialize Adaptive Header Theme Switcher
  initAdaptiveHeader();

  // 4. Initialize Giant Distance Numbers Parallax
  initGiantDistanceParallax();

  // 5. Initialize Dynamic Route Map
  initRouteMapEngine();

  // 6. Initialize Race Day Countdown Timer
  initRaceCountdown();

  // 7. Initialize Photography Wall Filter & Lightbox
  initGalleryAndLightbox();

  // 8. Initialize FAQ Accordion
  initFaqAccordion();

  // 9. Initialize Registration & Sponsor Modals
  initModals();

  // 10. Initialize Mobile Drawer
  initMobileDrawer();
});

/* ===================================================================
   1. ATMOSPHERIC CANVAS (Subtle Mist & Early Dawn Dust Particles)
   =================================================================== */
function initAtmosphericCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const PARTICLE_COUNT = 38;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.radius = Math.random() * 2.2 + 0.6;
      this.speedY = -(Math.random() * 0.45 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.25;
      this.opacity = Math.random() * 0.45 + 0.15;
      this.fadeSpeed = Math.random() * 0.003 + 0.001;
      this.isGlowing = Math.random() > 0.6;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      if (this.isGlowing) {
        ctx.fillStyle = `rgba(243, 154, 82, ${this.opacity})`;
      } else {
        ctx.fillStyle = `rgba(245, 239, 229, ${this.opacity * 0.7})`;
      }
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(loop);
  }
  loop();
}



/* ===================================================================
   3. MASTER CINEMATIC HERO ENGINE ("BEFORE THE CITY WAKES")
   =================================================================== */
function initCinematicHeroScroll() {
  const track = document.getElementById('hero-scroll-track');
  const visualStage = document.getElementById('hero-visual-stage');
  const horizonGlow = document.getElementById('hero-horizon-glow');
  const skyGradient = document.getElementById('hero-sky-gradient');
  const scrollPrompt = document.getElementById('hero-scroll-prompt');
  const heroVideo = document.getElementById('hero-video-player');
  const cyclingQuoteEl = document.getElementById('hero-cycling-quote');

  // Video autoplay assurance
  if (heroVideo) {
    heroVideo.play().catch(() => {
      const startVideo = () => {
        heroVideo.play();
        window.removeEventListener('scroll', startVideo);
        window.removeEventListener('click', startVideo);
        window.removeEventListener('touchstart', startVideo);
      };
      window.addEventListener('scroll', startVideo, { passive: true });
      window.addEventListener('click', startVideo);
      window.addEventListener('touchstart', startVideo);
    });
  }

  // Atmospheric Kinetic Quotes Cycler
  const atmosphericQuotes = [
    '"The quiet asphalt. The cool river breeze. A lone heartbeat echoing across the silence."',
    '"One step. Then another. Until the road becomes a journey."',
    '"Rhythm takes over. Shadows stretch along the riverfront. The mist begins to lift."',
    '"One decade of miles. Ten years of friendship, grit, and morning light."',
    '"Andhra Pradesh\'s premier dawn athletic celebration. Sunday, 6 December 2026."'
  ];
  let currentQuoteIdx = 0;
  if (cyclingQuoteEl) {
    setInterval(() => {
      cyclingQuoteEl.style.opacity = '0';
      cyclingQuoteEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        currentQuoteIdx = (currentQuoteIdx + 1) % atmosphericQuotes.length;
        cyclingQuoteEl.textContent = atmosphericQuotes[currentQuoteIdx];
        cyclingQuoteEl.style.opacity = '1';
        cyclingQuoteEl.style.transform = 'translateY(0)';
      }, 400);
    }, 4200);
  }

  if (!visualStage) return;

  function onScroll() {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight || 800;
    const progress = Math.max(0, Math.min(1, scrollY / heroHeight));

    // Hide scroll prompt promptly on scroll
    if (scrollPrompt) {
      scrollPrompt.style.opacity = progress > 0.08 ? '0' : '1';
    }

    // Camera subtle depth parallax
    if (visualStage) {
      const scale = 1.02 + progress * 0.18;
      const translateY = progress * 35;
      visualStage.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    }

    // Sunrise dynamic lighting transformation as user scrolls towards Screen 2
    if (horizonGlow) {
      const glowOpacity = 0.35 + progress * 0.65;
      const glowScale = 1 + progress * 0.3;
      horizonGlow.style.opacity = glowOpacity.toString();
      horizonGlow.style.transform = `translateX(-50%) scale(${glowScale})`;
    }

    // Dynamic background sky color gradient transition
    if (skyGradient) {
      if (progress < 0.3) {
        skyGradient.style.background = `radial-gradient(circle at 50% 68%, #202733 0%, #17191C 50%, #0b0d10 100%)`;
      } else if (progress < 0.7) {
        skyGradient.style.background = `radial-gradient(circle at 50% 68%, #303348 0%, #202733 45%, #17191C 100%)`;
      } else {
        skyGradient.style.background = `radial-gradient(circle at 50% 65%, #C8613F 0%, #4A332A 40%, #18202C 100%)`;
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}



/* ===================================================================
   5. ADAPTIVE HEADER COLOR THEME (Dark vs Warm Ivory)
   =================================================================== */
function initAdaptiveHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  const warmSections = document.querySelectorAll('.section-warm, .section-warm-cream');

  function updateHeaderTheme() {
    const scrollY = window.scrollY;

    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Check if header is currently over a warm section
    let isOverWarm = false;
    const headerRect = header.getBoundingClientRect();
    const headerCenter = headerRect.top + headerRect.height / 2;

    warmSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= headerCenter && rect.bottom >= headerCenter) {
        isOverWarm = true;
      }
    });

    if (isOverWarm) {
      header.classList.add('scrolled-light');
    } else {
      header.classList.remove('scrolled-light');
    }
  }

  window.addEventListener('scroll', updateHeaderTheme, { passive: true });
  updateHeaderTheme();
}

/* ===================================================================
   6. GIANT DISTANCE SCROLL NUMBERS PARALLAX
   =================================================================== */
function initGiantDistanceParallax() {
  const section = document.querySelector('.race-categories-section');
  const num05 = document.querySelector('.num-05');
  const num10 = document.querySelector('.num-10');
  const num21 = document.querySelector('.num-21');

  if (!section || !num05) return;

  function onScroll() {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const offset = (window.innerHeight - rect.top) * 0.12;
      if (num05) num05.style.transform = `translateX(${-offset * 0.6}px)`;
      if (num10) num10.style.transform = `translateY(${offset * 0.4}px)`;
      if (num21) num21.style.transform = `translateX(${offset * 0.7}px)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ===================================================================
   7. DYNAMIC INTERACTIVE ROUTE MAP ENGINE
   =================================================================== */
function initRouteMapEngine() {
  const tabs = document.querySelectorAll('.btn-route-tab');
  const routeSvgContainer = document.getElementById('route-svg-mount');
  const distMetric = document.getElementById('route-metric-dist');
  const elevMetric = document.getElementById('route-metric-elev');
  const nameMetric = document.getElementById('route-metric-name');
  const cutoffMetric = document.getElementById('route-metric-cutoff');

  if (!tabs.length || !routeSvgContainer) return;

  // SVG Paths and visual data for the 3 categories
  const routeData = {
    "05k": {
      dist: "05.0 KM",
      elevation: "+12 Meters",
      name: "Canal Green Promenade Loop",
      cutoff: "60 Mins",
      pathD: "M 40 240 C 120 220, 220 180, 360 170 C 480 160, 580 200, 720 200 C 820 200, 900 230, 960 240",
      landmarks: [
        { x: 40, y: 240, label: "Start: Gantry (0.0K)", type: "start" },
        { x: 360, y: 170, label: "Hydration 1: Canal Walk (1.5K)", type: "water" },
        { x: 580, y: 190, label: "Turnaround Mat (2.5K)", type: "timing" },
        { x: 800, y: 215, label: "Electrolytes (3.8K)", type: "water" },
        { x: 960, y: 240, label: "Finish Line (5.0K)", type: "finish" }
      ]
    },
    "10k": {
      dist: "10.0 KM",
      elevation: "+26 Meters",
      name: "Riverfront & Prakasam Barrage Vista",
      cutoff: "100 Mins",
      pathD: "M 40 280 C 140 240, 240 120, 400 110 C 560 100, 680 180, 780 190 C 860 200, 920 130, 960 110",
      landmarks: [
        { x: 40, y: 280, label: "Start: Gantry (0.0K)", type: "start" },
        { x: 260, y: 160, label: "Hydration Post (2.5K)", type: "water" },
        { x: 520, y: 105, label: "Prakasam Barrage Mat (5.0K)", type: "timing" },
        { x: 740, y: 185, label: "Medical Aid & Sponges (7.5K)", type: "medical" },
        { x: 960, y: 110, label: "Golden Finish Arch (10.0K)", type: "finish" }
      ]
    },
    "21k": {
      dist: "21.1 KM",
      elevation: "+48 Meters",
      name: "Grand Krishna Twin Bridge Circuit",
      cutoff: "3 Hrs 30 Mins",
      pathD: "M 40 310 C 120 280, 180 160, 280 120 C 380 80, 480 90, 560 140 C 640 190, 720 110, 800 90 C 880 70, 930 180, 960 220",
      landmarks: [
        { x: 40, y: 310, label: "Start: Gantry (0.0K)", type: "start" },
        { x: 280, y: 120, label: "Barrage Crossing (5.0K)", type: "timing" },
        { x: 560, y: 140, label: "Halfway Checkpoint (10.5K)", type: "timing" },
        { x: 720, y: 110, label: "Kanaka Durga Foothills (16.0K)", type: "cheer" },
        { x: 860, y: 80, label: "Last Mile Hydration (19.5K)", type: "water" },
        { x: 960, y: 220, label: "Victory Finish Arch (21.1K)", type: "finish" }
      ]
    }
  };

  function renderRoute(categoryKey) {
    const data = routeData[categoryKey];
    if (!data) return;

    // Update Metrics
    if (distMetric) distMetric.textContent = data.dist;
    if (elevMetric) elevMetric.textContent = data.elevation;
    if (nameMetric) nameMetric.textContent = data.name;
    if (cutoffMetric) cutoffMetric.textContent = data.cutoff;

    // Build SVG
    let svgHtml = `
      <svg viewBox="0 0 1000 380" class="route-svg-canvas" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#C8613F" />
            <stop offset="50%" stop-color="#E4773F" />
            <stop offset="100%" stop-color="#F39A52" />
          </linearGradient>
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- River & Topography Subtle Graphic -->
        <path d="M 0 340 Q 250 300, 500 330 T 1000 310 L 1000 380 L 0 380 Z" fill="rgba(32, 39, 51, 0.4)" />
        <path d="M 0 280 Q 250 240, 500 270 T 1000 250" stroke="rgba(243, 154, 82, 0.1)" stroke-width="1" stroke-dasharray="6,6" fill="none" />

        <!-- Route Path Glow Underlay -->
        <path d="${data.pathD}" stroke="rgba(243, 154, 82, 0.35)" stroke-width="12" fill="none" stroke-linecap="round" filter="url(#routeGlow)" />

        <!-- Route Path Main Line -->
        <path class="route-path-draw" d="${data.pathD}" stroke="url(#routeGradient)" stroke-width="4.5" fill="none" stroke-linecap="round" />
    `;

    // Landmark Nodes
    data.landmarks.forEach((node, i) => {
      const isStartOrFinish = node.type === 'start' || node.type === 'finish';
      const circleFill = isStartOrFinish ? '#F39A52' : '#FFF';
      const circleRadius = isStartOrFinish ? 7 : 5;

      svgHtml += `
        <g class="landmark-node" transform="translate(${node.x}, ${node.y})">
          <circle r="${circleRadius + 4}" fill="rgba(243, 154, 82, 0.25)" />
          <circle r="${circleRadius}" fill="${circleFill}" stroke="#17191C" stroke-width="2" />
          <text y="${i % 2 === 0 ? -16 : 22}" x="0" text-anchor="middle" fill="#F8F4ED" font-size="11" font-family="'Outfit', sans-serif" font-weight="600" letter-spacing="0.04em">
            ${node.label}
          </text>
        </g>
      `;
    });

    svgHtml += `</svg>`;
    routeSvgContainer.innerHTML = svgHtml;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      renderRoute(cat);
    });
  });

  // Default initial load: 21K Half Marathon
  renderRoute('21k');
}

/* ===================================================================
   8. RACE DAY COUNTDOWN TIMER (6 Dec 2026, 05:00:00 AM IST)
   =================================================================== */
function initRaceCountdown() {
  const targetDate = new Date('2026-12-06T05:00:00+05:30').getTime();

  const elDays = document.getElementById('count-days');
  const elHours = document.getElementById('count-hours');
  const elMins = document.getElementById('count-mins');
  const elSecs = document.getElementById('count-secs');

  if (!elDays || !elHours || !elMins || !elSecs) return;

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      elDays.textContent = '00';
      elHours.textContent = '00';
      elMins.textContent = '00';
      elSecs.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMins.textContent = String(mins).padStart(2, '0');
    elSecs.textContent = String(secs).padStart(2, '0');
  }

  setInterval(update, 1000);
  update();
}

/* ===================================================================
   9. PHOTOGRAPHY WALL FILTER & LIGHTBOX MODAL
   =================================================================== */
function initGalleryAndLightbox() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const photoCards = document.querySelectorAll('.photo-wall-card');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  if (!filterPills.length || !photoCards.length) return;

  // Filter Pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const year = pill.getAttribute('data-year');

      photoCards.forEach(card => {
        const cardYear = card.getAttribute('data-year');
        if (year === 'all' || cardYear === year) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Lightbox trigger
  photoCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightbox.classList.add('open');
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });
  }
}

/* ===================================================================
   10. FAQ ACCORDION
   =================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        items.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ===================================================================
   11. REGISTRATION & SPONSOR MODALS
   =================================================================== */
function initModals() {
  // Registration Modal
  const regModal = document.getElementById('register-modal');
  const regTriggers = document.querySelectorAll('.open-register-modal');
  const regClose = document.getElementById('register-close');
  const radioCards = document.querySelectorAll('.distance-radio-card');
  const regStep1 = document.getElementById('reg-step-1');
  const regStep2 = document.getElementById('reg-step-2');
  const regStep3 = document.getElementById('reg-step-3');
  const btnNextToDetails = document.getElementById('btn-next-step2');
  const btnSubmitReg = document.getElementById('btn-submit-registration');
  const generatedBib = document.getElementById('generated-bib-num');

  regTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (regModal) {
        regModal.classList.add('open');
        // Reset to Step 1
        if (regStep1) regStep1.classList.add('active');
        if (regStep2) regStep2.classList.remove('active');
        if (regStep3) regStep3.classList.remove('active');
      }
    });
  });

  if (regClose && regModal) {
    regClose.addEventListener('click', () => regModal.classList.remove('open'));
    regModal.addEventListener('click', (e) => {
      if (e.target === regModal) regModal.classList.remove('open');
    });
  }

  // Distance selection inside registration modal
  radioCards.forEach(card => {
    card.addEventListener('click', () => {
      radioCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  // Step 1 to Step 2
  if (btnNextToDetails) {
    btnNextToDetails.addEventListener('click', () => {
      if (regStep1 && regStep2) {
        regStep1.classList.remove('active');
        regStep2.classList.add('active');
      }
    });
  }

  // Step 2 to Step 3 (Simulated Confirmation)
  if (btnSubmitReg) {
    btnSubmitReg.addEventListener('click', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('reg-input-name');
      const name = nameInput && nameInput.value ? nameInput.value.trim() : 'Runner';
      const randomBib = Math.floor(1000 + Math.random() * 9000);

      if (generatedBib) {
        generatedBib.textContent = `BIB #${randomBib} • ${name.toUpperCase()}`;
      }

      if (regStep2 && regStep3) {
        regStep2.classList.remove('active');
        regStep3.classList.add('active');
      }
    });
  }

  // Sponsor Partner Modal
  const partnerModal = document.getElementById('partner-modal');
  const partnerTriggers = document.querySelectorAll('.open-partner-modal');
  const partnerClose = document.getElementById('partner-close');

  partnerTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (partnerModal) partnerModal.classList.add('open');
    });
  });

  if (partnerClose && partnerModal) {
    partnerClose.addEventListener('click', () => partnerModal.classList.remove('open'));
    partnerModal.addEventListener('click', (e) => {
      if (e.target === partnerModal) partnerModal.classList.remove('open');
    });
  }
}



/* ===================================================================
   13. MOBILE DRAWER MENU
   =================================================================== */
function initMobileDrawer() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const links = document.querySelectorAll('.mobile-drawer-link');

  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    drawer.classList.toggle('open');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
