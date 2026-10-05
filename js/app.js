/**
 * Vijayawada Runners - Red & Blue Multi-Page Portal Application
 * Features:
 * - Dynamic Runner Boy Speed Controls (Sprint / Jog / Marathon)
 * - Live Race Day Countdown Timer
 * - Interactive Pace & Pacer Bus Calculator
 * - Live Bib Results & Certificate Lookup Simulator
 * - Mobile Navigation Menu Toggle
 * - Registration Modal Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  // Permanent Clean Light Theme Enforcement
  try {
    localStorage.removeItem('vr_theme');
  } catch (e) {}
  document.body.classList.add('theme-light');
  document.body.classList.remove('theme-crimson');

  initRunnerAnimationControls();
  initCountdownTimer();
  initPaceCalculator();
  initBibSearch();
  initMobileMenu();
  initRegistrationModal();
  initScrollAnimations();
});
function initRunnerAnimationControls() {
  const speedBtns = document.querySelectorAll('.btn-pace-speed');
  const runnerEl = document.querySelector('.real-runner-stage') || document.querySelector('.runner-boy-svg');
  const roadDashes = document.querySelector('.road-dashes');
  const speedPaceDisplay = document.getElementById('runner-live-pace');
  const speedKmhDisplay = document.getElementById('runner-live-kmh');
  const speedCadenceDisplay = document.getElementById('runner-live-cadence');

  if (!runnerEl || !roadDashes) return;

  speedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-speed');

      if (mode === 'sprint') {
        runnerEl.style.animationDuration = '0.3s';
        roadDashes.style.animationDuration = '0.22s';
        if (speedPaceDisplay) speedPaceDisplay.textContent = '3:20 /km';
        if (speedKmhDisplay) speedKmhDisplay.textContent = '18.0 km/h';
        if (speedCadenceDisplay) speedCadenceDisplay.textContent = '195 SPM';
      } else if (mode === 'jog') {
        runnerEl.style.animationDuration = '0.85s';
        roadDashes.style.animationDuration = '0.85s';
        if (speedPaceDisplay) speedPaceDisplay.textContent = '6:30 /km';
        if (speedKmhDisplay) speedKmhDisplay.textContent = '9.2 km/h';
        if (speedCadenceDisplay) speedCadenceDisplay.textContent = '162 SPM';
      } else {
        // Marathon default
        runnerEl.style.animationDuration = '0.55s';
        roadDashes.style.animationDuration = '0.45s';
        if (speedPaceDisplay) speedPaceDisplay.textContent = '4:58 /km';
        if (speedKmhDisplay) speedKmhDisplay.textContent = '12.1 km/h';
        if (speedCadenceDisplay) speedCadenceDisplay.textContent = '178 SPM';
      }
    });
  });
}

/* ===================================================================
   2. LIVE RACE DAY COUNTDOWN TIMER
   =================================================================== */
function initCountdownTimer() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 42);
  targetDate.setHours(5, 15, 0, 0);

  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ===================================================================
   3. INTERACTIVE PACE & PACER BUS CALCULATOR
   =================================================================== */
function initPaceCalculator() {
  const distSelect = document.getElementById('calc-distance');
  const hoursInput = document.getElementById('calc-hours');
  const minsInput = document.getElementById('calc-mins');
  const calcBtn = document.getElementById('btn-calculate-pace');

  const paceResultEl = document.getElementById('calc-pace-display');
  const speedResultEl = document.getElementById('calc-speed-display');
  const busResultEl = document.getElementById('calc-bus-recommendation');

  if (!calcBtn || !distSelect) return;

  function calculatePace() {
    const distanceKm = parseFloat(distSelect.value);
    const hours = parseInt(hoursInput.value) || 0;
    const mins = parseInt(minsInput.value) || 0;

    const totalMinutes = (hours * 60) + mins;
    if (totalMinutes <= 0 || distanceKm <= 0) return;

    const paceDecimal = totalMinutes / distanceKm;
    const paceMin = Math.floor(paceDecimal);
    const paceSec = Math.round((paceDecimal - paceMin) * 60);
    const speedKmh = (distanceKm / (totalMinutes / 60)).toFixed(1);

    if (paceResultEl) paceResultEl.textContent = `${paceMin}:${String(paceSec).padStart(2, '0')} /km`;
    if (speedResultEl) speedResultEl.textContent = `Required Speed: ${speedKmh} km/h`;

    if (busResultEl) {
      if (distanceKm === 21.1) {
        if (totalMinutes <= 110) busResultEl.textContent = '🚀 Assigned: Sub-1:45 Express Red Bus';
        else if (totalMinutes <= 125) busResultEl.textContent = '🔵 Assigned: 2:00 Hr Royal Blue Bus (Coach Kalyan)';
        else if (totalMinutes <= 140) busResultEl.textContent = '🔴 Assigned: 2:15 Hr Cruise Bus (Sireesha)';
        else busResultEl.textContent = '🔵 Assigned: 2:30 Hr Finisher Bus (Pavan & Team)';
      } else if (distanceKm === 10) {
        if (totalMinutes <= 55) busResultEl.textContent = '🚀 Assigned: 50 Min Rocket Red Bus';
        else if (totalMinutes <= 65) busResultEl.textContent = '🔵 Assigned: 60 Min Steady Blue Bus';
        else busResultEl.textContent = '🔴 Assigned: 70 Min Cruiser Bus';
      } else {
        busResultEl.textContent = '🌟 Awesome target for 5K! Maintain a conversational stride.';
      }
    }
  }

  calcBtn.addEventListener('click', calculatePace);
  distSelect.addEventListener('change', calculatePace);
}

/* ===================================================================
   4. LIVE BIB & RESULTS LOOKUP SIMULATOR
   =================================================================== */
function initBibSearch() {
  const searchBtn = document.getElementById('btn-search-bib');
  const searchInput = document.getElementById('bib-search-input');
  const resultPanel = document.getElementById('results-output');

  if (!searchBtn || !searchInput) return;

  const mockRunners = [
    { bib: 'VR2101', name: 'Kalyan Chakravarthy', category: '21.1K Half Marathon', time: '01:46:22', rank: '24 / 1,420', catRank: '8 / 450', pace: '5:02 /km', split5k: '25:10', split10k: '50:20', split15k: '1:15:35', splitFinish: '1:46:22' },
    { bib: 'VR2102', name: 'Ananya Reddy', category: '21.1K Half Marathon', time: '01:58:45', rank: '88 / 1,420', catRank: '12 / 380', pace: '5:37 /km', split5k: '28:05', split10k: '56:10', split15k: '1:24:30', splitFinish: '1:58:45' },
    { bib: 'VR1025', name: 'Ch. Srinivasa Rao', category: '10K Timed Challenge', time: '00:54:18', rank: '42 / 2,100', catRank: '15 / 620', pace: '5:25 /km', split5k: '27:00', split10k: '54:18', split15k: 'N/A', splitFinish: '54:18' },
    { bib: 'VR0540', name: 'Deepika Murthy', category: '5K Fitness Run', time: '00:27:50', rank: '19 / 1,800', catRank: '4 / 520', pace: '5:34 /km', split5k: '27:50', split10k: 'N/A', split15k: 'N/A', splitFinish: '27:50' }
  ];

  searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim().toUpperCase();
    if (!query) {
      alert('Please enter a Bib Number (e.g. VR2101, VR1025, VR0540) or runner name.');
      return;
    }

    let found = mockRunners.find(r => r.bib === query || r.name.toUpperCase().includes(query));

    if (!found) {
      found = {
        bib: query.startsWith('VR') ? query : `VR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: query.startsWith('VR') ? 'Krishna Riverfront Finisher' : query,
        category: '21.1K Half Marathon',
        time: '02:05:30',
        rank: '185 / 1,420',
        catRank: '38 / 450',
        pace: '5:57 /km',
        split5k: '29:40',
        split10k: '59:20',
        split15k: '1:29:10',
        splitFinish: '2:05:30'
      };
    }

    const nameEl = document.getElementById('res-runner-name');
    const bibEl = document.getElementById('res-runner-bib');
    const chipEl = document.getElementById('res-chip-time');
    const overallEl = document.getElementById('res-overall-rank');
    const catEl = document.getElementById('res-cat-rank');
    const paceEl = document.getElementById('res-avg-pace');
    const s5El = document.getElementById('res-split-5k');
    const s10El = document.getElementById('res-split-10k');
    const s15El = document.getElementById('res-split-15k');
    const sFinEl = document.getElementById('res-split-finish');
    const certName = document.getElementById('cert-display-name');

    if (nameEl) nameEl.textContent = found.name;
    if (bibEl) bibEl.textContent = `BIB: #${found.bib} • ${found.category}`;
    if (chipEl) chipEl.textContent = found.time;
    if (overallEl) overallEl.textContent = found.rank;
    if (catEl) catEl.textContent = found.catRank;
    if (paceEl) paceEl.textContent = found.pace;
    if (s5El) s5El.textContent = found.split5k;
    if (s10El) s10El.textContent = found.split10k;
    if (s15El) s15El.textContent = found.split15k;
    if (sFinEl) sFinEl.textContent = found.splitFinish;
    if (certName) certName.textContent = found.name;

    if (resultPanel) {
      resultPanel.style.display = 'block';
      resultPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* ===================================================================
   5. MOBILE NAVIGATION MENU
   =================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('desktop-nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu when clicking outside or clicking any nav link
    document.querySelectorAll('.nav-item-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}

/* ===================================================================
   6. REGISTRATION MODAL
   =================================================================== */
function initRegistrationModal() {
  const modal = document.getElementById('registration-modal');
  const openButtons = document.querySelectorAll('.btn-open-register');
  const closeButton = document.getElementById('close-reg-modal');
  const regForm = document.getElementById('marathon-reg-form');
  const formContent = document.getElementById('modal-form-content');
  const successContent = document.getElementById('modal-success-content');
  const categorySelect = document.getElementById('reg-race-category');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const preset = btn.getAttribute('data-category');
      if (preset && categorySelect) {
        categorySelect.value = preset;
      }
      if (formContent) formContent.style.display = 'block';
      if (successContent) successContent.style.display = 'none';
      modal.classList.add('open');
    });
  });

  if (window.location.hash === '#register') {
    if (formContent) formContent.style.display = 'block';
    if (successContent) successContent.style.display = 'none';
    modal.classList.add('open');
  }

  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#register') {
      if (formContent) formContent.style.display = 'block';
      if (successContent) successContent.style.display = 'none';
      modal.classList.add('open');
    }
  });

  if (closeButton) {
    closeButton.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value;
      const category = categorySelect.options[categorySelect.selectedIndex].text;
      const bibGenerated = 'VR-' + Math.floor(1000 + Math.random() * 9000);

      const confName = document.getElementById('conf-runner-name');
      const confCat = document.getElementById('conf-race-category');
      const confBib = document.getElementById('conf-bib-number');

      if (confName) confName.textContent = name;
      if (confCat) confCat.textContent = category;
      if (confBib) confBib.textContent = `#${bibGenerated}`;

      if (formContent) formContent.style.display = 'none';
      if (successContent) successContent.style.display = 'block';
    });
  }
}

/* ===================================================================
   7. FULL-WEBSITE SCROLL-REVEAL & DYNAMIC ANIMATIONS
   =================================================================== */
function initScrollAnimations() {
  const autoAnimateSelectors = [
    '.section-head',
    '.hub-card',
    '.why-run-card',
    '.sponsor-card',
    '.sponsors-banner-wrapper',
    '.quote-banner-box',
    '.countdown-strip',
    '.runner-stage-card',
    '.faq-accordion-item',
    '.certificate-border-box',
    '.gallery-item'
  ];

  autoAnimateSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, index) => {
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
        const delayClass = `reveal-delay-${(index % 4) + 1}`;
        el.classList.add(delayClass);
      }
    });
  });

  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-revealed'));
  }
}

