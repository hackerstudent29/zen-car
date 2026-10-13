// --- ZEN Automotive Interactive Application Logic ---
import { analytics } from './analytics.js';

// Force page to always load at the top (hero section)
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  setupScrollytelling();
  setupShowcase();
  setupZenMode();
  setupHeaderBackground();
  setupPhilosophyScrollytelling();
  setupReservationModal();
  setupCookieBanner();
  setupSmoothNavigation();
});

// 1. Scrollytelling Canvas Animation
function setupScrollytelling() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  const scrollContainer = document.querySelector('.hero-scroll-container');
  const textLayers = document.querySelectorAll('.hero-text-layer');
  const loader = document.querySelector('.scrolly-loader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderText = document.getElementById('loader-text');

  const totalFrames = 120;
  const images = [];
  let loadedCount = 0;
  
  let currentFrameIndex = 0;
  let targetFrameIndex = 0;
  let scrollProgress = 0;

  // Preload all frames
  for (let i = 1; i <= totalFrames; i++) {
    const img = new Image();
    const frameNum = String(i).padStart(4, '0');
    img.src = `/opening_shot_frames/frames/${frameNum}.jpg`;
    
    img.onload = onFrameLoad;
    img.onerror = onFrameError;
    images.push(img);
  }

  function onFrameLoad() {
    loadedCount++;
    updateLoader();
  }

  function onFrameError(e) {
    console.error('Failed to load frame:', e.target.src);
    // Continue loading process anyway so page isn't blocked
    loadedCount++;
    updateLoader();
  }

  function updateLoader() {
    const percent = Math.round((loadedCount / totalFrames) * 100);
    if (loaderBar) loaderBar.style.width = `${percent}%`;
    if (loaderText) loaderText.textContent = `Waking sanctuary... ${percent}%`;

    if (loadedCount >= totalFrames) {
      setTimeout(() => {
        if (loader) loader.classList.add('hidden');
        initializeScrolly();
      }, 500); // Muted delay for visual grace
    }
  }

  function initializeScrolly() {
    // Perform initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);

    // Run first scroll check
    handleScroll();
    
    // Start interpolation render loop
    requestAnimationFrame(renderLoop);
  }

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = document.documentElement.clientWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    
    // Immediately draw current interpolated frame
    drawFrame(Math.round(currentFrameIndex));
  }

  function drawFrame(index) {
    const img = images[index];
    if (!img || !img.complete) return;

    const canvasWidth = document.documentElement.clientWidth;
    const canvasHeight = window.innerHeight;

    const imgWidth = img.width;
    const imgHeight = img.height;

    // Cover calculation (object-fit: cover for canvas)
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }

  function handleScroll() {
    if (!scrollContainer) return;

    const rect = scrollContainer.getBoundingClientRect();
    const scrollPath = rect.height - window.innerHeight;
    
    // Calculate progress (0.0 to 1.0)
    scrollProgress = Math.max(0, Math.min(1, -rect.top / scrollPath));

    // Map progress to target frame index
    targetFrameIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(scrollProgress * (totalFrames - 1))));

    // Update active text layer based on scroll progress thresholds
    updateTextLayers(scrollProgress);
  }

  function updateTextLayers(progress) {
    let activeIndex = -1;

    if (progress >= 0.0 && progress <= 0.16) {
      activeIndex = 0;
    } else if (progress >= 0.26 && progress <= 0.46) {
      activeIndex = 1;
    } else if (progress >= 0.56 && progress <= 0.76) {
      activeIndex = 2;
    } else if (progress >= 0.86 && progress <= 1.0) {
      activeIndex = 3;
    }

    textLayers.forEach((layer, idx) => {
      if (idx === activeIndex) {
        layer.classList.add('active');
      } else {
        layer.classList.remove('active');
      }
    });
  }

  let lastDrawnIndex = -1;

  function renderLoop() {
    // Linear Interpolation (LERP) for buttery-smooth scrolling updates
    const diff = targetFrameIndex - currentFrameIndex;
    
    if (Math.abs(diff) > 0.01) {
      currentFrameIndex += diff * 0.15;
      
      const nextDrawnIndex = Math.round(currentFrameIndex);
      if (nextDrawnIndex !== lastDrawnIndex) {
        drawFrame(nextDrawnIndex);
        lastDrawnIndex = nextDrawnIndex;
      }
    }
    
    requestAnimationFrame(renderLoop);
  }
}

// 2. Showcase Gallery & HUD Controller
function setupShowcase() {
  const tabs = document.querySelectorAll('.tab-btn');
  const canvasVideo = document.getElementById('canvas-video');
  const canvasFallback = document.getElementById('canvas-fallback');
  const hudStatus = document.querySelector('.pulse-green');
  const hudPowertrain = document.querySelector('.hud-item.bottom-left .hud-val');
  const hudBalance = document.querySelector('.hud-item.bottom-right .hud-val');

  const hudData = {
    motion: {
      status: 'ACTIVE',
      powertrain: 'REAR-BIASED DIRECT DRIVE',
      balance: '50:50 DYNAMIC SLIP'
    },
    interior: {
      status: 'LUXURY & BOOST',
      powertrain: 'NITRO INJECTION PREP',
      balance: 'THERMAL EXHAUST PURGE'
    },
    engine: {
      status: 'EFFICIENT',
      powertrain: 'DUAL MOTOR SILENT LIQUID',
      balance: '98% ENERGETIC FLOW'
    },
    tyre: {
      status: 'MONITORING',
      powertrain: '320mm LOW-FRICTION COMPOUND',
      balance: 'GRIP RATIO 1.15 G'
    },
    garage: {
      status: 'STANDBY',
      powertrain: 'INDUCTIVE CHARGE GRID',
      balance: 'LOCKS SECURE 100%'
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Clear active states
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      
      // Activate clicked tab
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Reset 3D canvas position to default on desktop only
      const canvasWrapper = document.querySelector('.canvas-wrapper');
      if (canvasWrapper) {
        if (window.innerWidth > 768) {
          canvasWrapper.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        } else {
          canvasWrapper.style.transform = 'none';
        }
      }

      const target = tab.getAttribute('data-target');
      const videoSrc = tab.getAttribute('data-video');
      const fallbackSrc = tab.getAttribute('data-fallback');

      analytics.track('showcase_tab_selected', { tab: target });

      // Update HUD status to loading
      if (hudStatus) {
        hudStatus.textContent = 'LOADING';
        hudStatus.className = 'hud-val';
      }

      // Smooth media transition
      if (canvasVideo) {
        canvasVideo.style.opacity = '0';
        if (canvasFallback) canvasFallback.style.opacity = '0';

        setTimeout(() => {
          const source = canvasVideo.querySelector('source');
          if (source) {
            source.src = videoSrc;
            canvasVideo.load();
            
            canvasVideo.play()
              .then(() => {
                canvasVideo.classList.remove('hidden');
                if (canvasFallback) canvasFallback.classList.add('hidden');
                canvasVideo.style.opacity = '1';
                updateHUD(target);
              })
              .catch(err => {
                console.warn('Video autoplay prevented, displaying static image fallback:', err);
                showFallback(fallbackSrc);
                updateHUD(target);
              });
          } else {
            showFallback(fallbackSrc);
            updateHUD(target);
          }
        }, 300);
      }
    });
  });

  function showFallback(src) {
    if (canvasVideo) canvasVideo.classList.add('hidden');
    if (canvasFallback) {
      canvasFallback.src = src;
      canvasFallback.classList.remove('hidden');
      canvasFallback.style.opacity = '1';
    }
  }

  function updateHUD(key) {
    const data = hudData[key] || hudData.motion;
    setTimeout(() => {
      if (hudStatus) {
        hudStatus.textContent = data.status;
        hudStatus.className = `hud-val ${data.status === 'STANDBY' ? 'pulse-green' : ''}`;
      }
      if (hudPowertrain) hudPowertrain.textContent = data.powertrain;
      if (hudBalance) hudBalance.textContent = data.balance;
    }, 200);
  }

  // 3D Tilt Interaction on mouse move
  setupShowcase3DTilt();

  function setupShowcase3DTilt() {
    const canvasWrapper = document.querySelector('.canvas-wrapper');
    const container = document.querySelector('.dashboard-canvas');
    if (!canvasWrapper || !container) return;

    container.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const maxTilt = 10;
      const rotateX = ((centerY - y) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * -maxTilt;

      canvasWrapper.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    container.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 768) {
        canvasWrapper.style.transform = 'none';
        return;
      }
      canvasWrapper.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });

    container.addEventListener('dblclick', () => {
      if (window.innerWidth <= 768) {
        canvasWrapper.style.transform = 'none';
        return;
      }
      canvasWrapper.style.transform = `perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  }
}

// 3. Zen Mode Immersive Overlay
function setupZenMode() {
  const zenToggle = document.getElementById('zen-toggle');
  const exitZen = document.getElementById('exit-zen');
  const zenSanctuary = document.getElementById('zen-sanctuary');
  const body = document.body;
  const quoteText = document.getElementById('zen-quote');
  const quoteAuthor = document.getElementById('zen-author');

  const zenQuotes = [
    { text: "Breathe in. Let go of the noise.", author: "Zen Philosophy" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "Quiet the mind and the soul will speak.", author: "Ma Jaya Sati Bhagavati" },
    { text: "In the midst of movement, let peace reside.", author: "Lao Tzu" },
    { text: "Silence is the source of great strength.", author: "Lao Tzu" }
  ];

  let quoteInterval = null;
  let quoteIndex = 0;

  if (zenToggle && zenSanctuary) {
    zenToggle.addEventListener('click', () => {
      zenSanctuary.classList.remove('hidden');
      body.classList.add('zen-active');
      analytics.track('zen_mode_entered');
      startQuoteRotation();
    });
  }

  if (exitZen && zenSanctuary) {
    exitZen.addEventListener('click', () => {
      zenSanctuary.classList.add('hidden');
      body.classList.remove('zen-active');
      analytics.track('zen_mode_exited');
      stopQuoteRotation();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zenSanctuary && !zenSanctuary.classList.contains('hidden')) {
      zenSanctuary.classList.add('hidden');
      body.classList.remove('zen-active');
      stopQuoteRotation();
    }
  });

  function startQuoteRotation() {
    quoteIndex = 0;
    displayQuote();
    
    quoteInterval = setInterval(() => {
      quoteIndex = (quoteIndex + 1) % zenQuotes.length;
      
      if (quoteText && quoteAuthor) {
        quoteText.style.opacity = '0';
        quoteAuthor.style.opacity = '0';
        
        setTimeout(() => {
          displayQuote();
          quoteText.style.opacity = '1';
          quoteAuthor.style.opacity = '1';
        }, 800);
      }
    }, 6000);
  }

  function stopQuoteRotation() {
    if (quoteInterval) {
      clearInterval(quoteInterval);
      quoteInterval = null;
    }
  }

  function displayQuote() {
    if (quoteText && quoteAuthor) {
      const q = zenQuotes[quoteIndex];
      quoteText.textContent = q.text;
      quoteAuthor.textContent = q.author;
    }
  }
}

// 4. Header Background Setup
function setupHeaderBackground() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// 5. Philosophy Scrollytelling
function setupPhilosophyScrollytelling() {
  const cards = document.querySelectorAll('.phil-card-wrapper');
  const videos = document.querySelectorAll('.phil-video');
  
  if (cards.length === 0 || videos.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const vidId = entry.target.getAttribute('data-vid');
        const activeCard = entry.target.querySelector('.phil-card');
        
        cards.forEach(c => {
          const innerCard = c.querySelector('.phil-card');
          if (innerCard) innerCard.classList.remove('in-view');
        });
        if (activeCard) activeCard.classList.add('in-view');
        
        videos.forEach(v => {
          if (v.id === `phil-vid-${vidId}`) {
            v.classList.add('active');
          } else {
            v.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  cards.forEach(card => observer.observe(card));
}

// 6. Reservation Modal & Form Validation with Spam/Bot Protection (Items 17, 18, 20)
function setupReservationModal() {
  const modal = document.getElementById('reservation-modal');
  const triggers = document.querySelectorAll('.reserve-trigger');
  const closeBtn = document.getElementById('close-reservation');
  const form = document.getElementById('reservation-form');
  const formContainer = document.getElementById('reservation-form-container');
  const successState = document.getElementById('reservation-success');
  const closeSuccessBtn = document.getElementById('close-success-btn');
  const submitBtn = document.getElementById('submit-reservation');
  const refCodeEl = document.getElementById('success-ref-code');

  if (!modal || !form) return;

  let modalOpenedTime = 0;

  function openModal() {
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalOpenedTime = Date.now();
    analytics.track('reservation_modal_opened');

    // Focus on first input
    const firstInput = document.getElementById('res-name');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

  // Close when clicking modal backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Inputs & Validation
  const nameInput = document.getElementById('res-name');
  const emailInput = document.getElementById('res-email');
  const phoneInput = document.getElementById('res-phone');
  const consentInput = document.getElementById('res-consent');
  const hpInput = document.getElementById('zen_hp_trap');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const consentError = document.getElementById('consent-error');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  function validateField(input, errorEl, isValid) {
    if (isValid) {
      input.classList.remove('invalid');
      input.classList.add('valid');
      if (errorEl) errorEl.classList.remove('show');
      return true;
    } else {
      input.classList.remove('valid');
      input.classList.add('invalid');
      if (errorEl) errorEl.classList.add('show');
      return false;
    }
  }

  // Live validation on blur & input
  nameInput?.addEventListener('input', () => {
    validateField(nameInput, nameError, nameInput.value.trim().length >= 2);
  });
  emailInput?.addEventListener('input', () => {
    validateField(emailInput, emailError, emailRegex.test(emailInput.value.trim()));
  });
  phoneInput?.addEventListener('input', () => {
    validateField(phoneInput, phoneError, phoneRegex.test(phoneInput.value.trim()));
  });
  consentInput?.addEventListener('change', () => {
    validateField(consentInput, consentError, consentInput.checked);
  });

  // Form submission handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // 1. Bot Honeypot Check (Item 18)
    if (hpInput && hpInput.value.trim() !== '') {
      console.warn('Bot submission blocked via honeypot field.');
      // Silently pretend success to deceive bot
      showSuccess('ZEN-BOT-TRAP');
      return;
    }

    // 2. Submission speed trap (minimum 1200ms human interaction)
    const timeSpentMs = Date.now() - modalOpenedTime;
    if (timeSpentMs < 1200) {
      console.warn('Submission completed suspiciously fast (<1.2s), blocked.');
      return;
    }

    // 3. Client-side Rate-limiting Cooldown (30 seconds)
    const lastSubmit = localStorage.getItem('zen_last_reservation_timestamp');
    if (lastSubmit && (Date.now() - Number(lastSubmit)) < 30000) {
      alert('You have recently submitted a reservation request. Please allow 30 seconds before submitting another.');
      return;
    }

    // 4. Validate All Fields
    const isNameValid = validateField(nameInput, nameError, nameInput.value.trim().length >= 2);
    const isEmailValid = validateField(emailInput, emailError, emailRegex.test(emailInput.value.trim()));
    const isPhoneValid = validateField(phoneInput, phoneError, phoneRegex.test(phoneInput.value.trim()));
    const isConsentValid = validateField(consentInput, consentError, consentInput.checked);

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isConsentValid) {
      // Focus first invalid element
      if (!isNameValid) nameInput.focus();
      else if (!isEmailValid) emailInput.focus();
      else if (!isPhoneValid) phoneInput.focus();
      else if (!isConsentValid) consentInput.focus();
      return;
    }

    // Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      const btnText = submitBtn.querySelector('.btn-text');
      const btnSpinner = submitBtn.querySelector('.btn-spinner');
      if (btnText) btnText.textContent = 'Securing Allocation...';
      if (btnSpinner) btnSpinner.classList.remove('hidden');
    }

    // Simulate high-security allocation reservation
    setTimeout(() => {
      const randomSerial = 'ZEN-GT-' + Math.floor(1000 + Math.random() * 9000);
      localStorage.setItem('zen_last_reservation_timestamp', String(Date.now()));
      
      analytics.track('reservation_confirmed', {
        allocationId: randomSerial,
        model: document.getElementById('res-model')?.value || 'ZEN GT-1',
        timeline: document.getElementById('res-timeline')?.value || '2026 Q4'
      });

      showSuccess(randomSerial);

      if (submitBtn) {
        submitBtn.disabled = false;
        const btnText = submitBtn.querySelector('.btn-text');
        const btnSpinner = submitBtn.querySelector('.btn-spinner');
        if (btnText) btnText.textContent = 'Confirm Allocation Request';
        if (btnSpinner) btnSpinner.classList.add('hidden');
      }
    }, 1200);
  });

  function showSuccess(refCode) {
    if (refCodeEl) refCodeEl.textContent = refCode;
    if (formContainer) formContainer.classList.add('hidden');
    if (successState) successState.classList.remove('hidden');
  }
}

// 7. Cookie Consent Banner (Item 5)
function setupCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');

  if (!banner) return;

  const savedConsent = localStorage.getItem('zen_cookie_consent');

  if (!savedConsent) {
    setTimeout(() => {
      banner.classList.remove('hidden');
    }, 1500);
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', () => {
      analytics.setConsent(true);
      banner.classList.add('hidden');
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      analytics.setConsent(false);
      banner.classList.add('hidden');
    });
  }
}

// 8. Smooth Nav Anchors
function setupSmoothNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#hero') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}
