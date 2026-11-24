/**
 * INKDROP HAUTE ÉCRITURE
 * Scrollytelling & 3D Unboxing Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Elements Cache
  // --------------------------------------------------------------------------
  const track = document.getElementById('unboxing-experience');
  const theatre = document.getElementById('stickyTheatre');
  const scrubberFill = document.getElementById('scrubberFill');
  const progressPercent = document.getElementById('progressPercent');
  const scrollProgressLabel = document.getElementById('scrollProgressLabel');
  const phaseSteps = document.querySelectorAll('.phase-step');

  const boxAssembly = document.getElementById('boxAssembly');
  const boxLid = document.getElementById('boxLid');
  const penActor = document.getElementById('penActor');
  const pen3dWrapper = document.getElementById('pen3dWrapper');

  // Pen components
  const partCrown = document.getElementById('partCrown');
  const partCap = document.getElementById('partCap');
  const partNib = document.getElementById('partNib');
  const partChamber = document.getElementById('partChamber');
  const partBarrel = document.getElementById('partBarrel');
  const capBodyShell = document.getElementById('capBodyShell');
  const barrelShell = document.getElementById('barrelShell');
  const inkFluid = document.getElementById('inkFluid');

  // Annotations & Parchment
  const annotCrown = document.getElementById('annotCrown');
  const annotNib = document.getElementById('annotNib');
  const annotChamber = document.getElementById('annotChamber');
  const annotBarrel = document.getElementById('annotBarrel');
  const parchmentReveal = document.getElementById('parchmentReveal');
  const flourishPath = document.getElementById('flourishPath');

  // HUD and Switchers
  const activeProductDisplay = document.getElementById('activeProductDisplay');
  const switcherBtns = document.querySelectorAll('.switcher-btn');
  const prevPhaseBtn = document.getElementById('prevPhaseBtn');
  const nextPhaseBtn = document.getElementById('nextPhaseBtn');
  const autoPlayToggle = document.getElementById('autoPlayToggle');
  const playIcon = document.getElementById('playIcon');
  const playText = document.getElementById('playText');

  // Trigger buttons from catalog
  const triggerUnboxBtns = document.querySelectorAll('.trigger-unbox-btn');
  const openExperienceQuickBtn = document.getElementById('openExperienceQuickBtn');

  // --------------------------------------------------------------------------
  // 2. Product State Management
  // --------------------------------------------------------------------------
  let currentProduct = 'sovereign'; // 'sovereign' | 'sapphire'

  const productsData = {
    sovereign: {
      name: 'THE SOVEREIGN IMPERIUM',
      edition: 'Edition 01 / 380',
      capBackground: 'linear-gradient(180deg, #182846 0%, #0a1120 40%, #15243f 80%, #0a1120 100%)',
      barrelBackground: 'linear-gradient(180deg, #14223b 0%, #090f1a 40%, #111d33 80%, #090f1a 100%)',
      inkColor: 'linear-gradient(90deg, #091730 0%, #1a4d8c 70%, #2970cc 100%)',
      borderColor: 'rgba(212, 175, 55, 0.5)',
      glowColor: 'rgba(212, 175, 55, 0.25)'
    },
    sapphire: {
      name: 'THE ROYAL SAPPHIRE',
      edition: 'Edition 02 / 380',
      capBackground: 'linear-gradient(180deg, #123769 0%, #091a33 40%, #1b4987 80%, #0c203d 100%)',
      barrelBackground: 'radial-gradient(ellipse at 50% 50%, #1b4c8a 0%, #0d274c 70%, #06152a 100%)',
      inkColor: 'linear-gradient(90deg, #0a254d 0%, #2269c7 70%, #4facfe 100%)',
      borderColor: 'rgba(80, 160, 255, 0.6)',
      glowColor: 'rgba(36, 99, 189, 0.4)'
    }
  };

  function setProduct(productKey) {
    currentProduct = productKey;
    const data = productsData[productKey];

    if (activeProductDisplay) {
      activeProductDisplay.textContent = data.name;
    }

    switcherBtns.forEach(btn => {
      if (btn.dataset.switch === productKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update pen styling
    if (capBodyShell) capBodyShell.style.background = data.capBackground;
    if (barrelShell) barrelShell.style.background = data.barrelBackground;
    if (inkFluid) inkFluid.style.background = data.inkColor;
  }

  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setProduct(btn.dataset.switch);
    });
  });

  // Catalog buttons trigger scroll down directly into unboxing
  triggerUnboxBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const prod = btn.dataset.product;
      setProduct(prod);
      track.scrollIntoView({ behavior: 'smooth' });
    });
  });

  if (openExperienceQuickBtn) {
    openExperienceQuickBtn.addEventListener('click', () => {
      track.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mini SVG Pen Visualizers in Product Cards
  // --------------------------------------------------------------------------
  function renderMiniPen(containerId, isSapphire) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const barrelGrad = isSapphire ? 'url(#sapphireBarrelGrad)' : 'url(#sovereignBarrelGrad)';
    const capGrad = isSapphire ? 'url(#sapphireCapGrad)' : 'url(#sovereignCapGrad)';

    el.innerHTML = `
      <svg viewBox="0 0 460 90" width="380" height="75" style="filter: drop-shadow(0 15px 25px rgba(0,0,0,0.85));">
        <defs>
          <linearGradient id="sovereignBarrelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#14223b"/>
            <stop offset="50%" stop-color="#080e18"/>
            <stop offset="100%" stop-color="#111d33"/>
          </linearGradient>
          <linearGradient id="sovereignCapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1b2e4f"/>
            <stop offset="50%" stop-color="#09101c"/>
            <stop offset="100%" stop-color="#15243f"/>
          </linearGradient>
          <linearGradient id="sapphireBarrelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#215ba3"/>
            <stop offset="50%" stop-color="#0c2344"/>
            <stop offset="100%" stop-color="#1a467f"/>
          </linearGradient>
          <linearGradient id="sapphireCapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2b71ca"/>
            <stop offset="50%" stop-color="#0f2950"/>
            <stop offset="100%" stop-color="#1d4d8a"/>
          </linearGradient>
          <linearGradient id="goldTrimGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#fff2b2"/>
            <stop offset="50%" stop-color="#d4af37"/>
            <stop offset="100%" stop-color="#aa7c11"/>
          </linearGradient>
        </defs>

        <!-- Barrel -->
        <rect x="200" y="28" width="180" height="34" rx="3" fill="${barrelGrad}" stroke="#d4af37" stroke-width="1.2"/>
        <!-- Barrel finial -->
        <path d="M 380 28 L 410 37 Q 418 45 410 53 L 380 62 Z" fill="url(#goldTrimGrad)"/>
        
        <!-- Center Gold Band -->
        <rect x="188" y="26" width="12" height="38" rx="1" fill="url(#goldTrimGrad)"/>
        
        <!-- Cap -->
        <rect x="55" y="24" width="133" height="42" rx="4" fill="${capGrad}" stroke="#d4af37" stroke-width="1.2"/>
        <!-- Cap gold ring -->
        <rect x="55" y="24" width="10" height="42" fill="url(#goldTrimGrad)"/>
        
        <!-- Crown jewel -->
        <path d="M 55 24 L 28 32 Q 22 45 28 58 L 55 66 Z" fill="url(#goldTrimGrad)"/>
        <circle cx="28" cy="45" r="4" fill="${isSapphire ? '#2979ff' : '#dc2626'}"/>

        <!-- Gold Clip with inkdrop finial -->
        <rect x="68" y="18" width="80" height="6" rx="2" fill="url(#goldTrimGrad)"/>
        <circle cx="148" cy="21" r="5" fill="#17427d" stroke="#d4af37" stroke-width="1.5"/>
      </svg>
    `;
  }

  renderMiniPen('sovereignMiniFrame', false);
  renderMiniPen('sapphireMiniFrame', true);

  // --------------------------------------------------------------------------
  // 4. Scrollytelling Unboxing Engine
  // --------------------------------------------------------------------------
  let targetProgress = 0;
  let currentProgress = 0;
  let isAutoPlaying = false;
  let autoPlayRaf = null;

  function calculateScrollProgress() {
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const trackHeight = track.offsetHeight - window.innerHeight;
    if (trackHeight <= 0) return 0;

    // How much the track has scrolled past top
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / trackHeight));
    return progress;
  }

  // Smooth lerp for buttery animation feel
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  function updateUnboxingVisuals(p) {
    // 1. Scrubber & text readouts
    const pct = Math.round(p * 100);
    if (scrubberFill) scrubberFill.style.width = `${pct}%`;
    if (progressPercent) progressPercent.textContent = `${pct}%`;

    // 2. Phase Indicators (0 to 4)
    let activePhaseIndex = 0;
    if (p >= 0.8) activePhaseIndex = 4;
    else if (p >= 0.6) activePhaseIndex = 3;
    else if (p >= 0.4) activePhaseIndex = 2;
    else if (p >= 0.2) activePhaseIndex = 1;

    phaseSteps.forEach((step, idx) => {
      if (idx === activePhaseIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    if (scrollProgressLabel) {
      if (p < 0.15) scrollProgressLabel.textContent = 'SCROLL DOWN TO UNBOX';
      else if (p < 0.38) scrollProgressLabel.textContent = 'STAGE 02: LID OPENING';
      else if (p < 0.58) scrollProgressLabel.textContent = 'STAGE 03: PEN LEVITATION';
      else if (p < 0.82) scrollProgressLabel.textContent = 'STAGE 04: PRECISION ANATOMY';
      else scrollProgressLabel.textContent = 'STAGE 05: MASTERPIECE READY';
    }

    // ------------------------------------------------------------------------
    // STAGE TRANSFORMS
    // ------------------------------------------------------------------------

    // A. Phase 1: Box Lid Opening (Progress 0.0 -> 0.35)
    // Lid opens from 0deg up to -125deg
    let lidAngle = 0;
    if (p <= 0.35) {
      const lidNorm = Math.min(1, p / 0.3);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - lidNorm, 3);
      lidAngle = ease * -125;
    } else {
      lidAngle = -125;
    }
    if (boxLid) {
      boxLid.style.transform = `rotateX(${lidAngle}deg)`;
    }

    // B. Phase 2: Pen Rises / Levitates out of Cushion (Progress 0.25 -> 0.55)
    let penLift = 0;
    let penScale = 1;
    let penRotateY = 0;
    let penRotateX = 0;
    let boxOpacity = 1;

    if (p < 0.25) {
      penLift = 0;
      penScale = 0.95;
      boxOpacity = 1;
    } else if (p >= 0.25 && p < 0.55) {
      const liftNorm = (p - 0.25) / 0.3;
      penLift = -liftNorm * 110; // rises 110px above box
      penScale = 0.95 + liftNorm * 0.25; // zooms slightly towards camera
      penRotateY = liftNorm * 180; // 3D spin showing the gold nib reflection
      penRotateX = Math.sin(liftNorm * Math.PI) * 15;
      boxOpacity = 1 - liftNorm * 0.4;
    } else {
      penLift = -110;
      penScale = 1.2;
      penRotateY = 180;
      boxOpacity = 0.5;
    }

    if (boxAssembly) {
      boxAssembly.style.opacity = boxOpacity;
      boxAssembly.style.transform = `translateY(${p > 0.4 ? (p - 0.4) * 80 : 0}px) scale(${1 - p * 0.15})`;
    }

    // C. Phase 3: Explosion / Deconstructed Anatomy (Progress 0.55 -> 0.80)
    let crownShift = 0;
    let capShift = 0;
    let nibShift = 0;
    let chamberShift = 0;
    let barrelShift = 0;

    let showAnnotations = false;

    if (p >= 0.55 && p < 0.82) {
      const explodeNorm = (p - 0.55) / 0.25;
      const easeExplode = Math.sin((explodeNorm * Math.PI) / 2);

      crownShift = -easeExplode * 60;
      capShift = -easeExplode * 40;
      nibShift = easeExplode * 20;
      chamberShift = easeExplode * 65;
      barrelShift = easeExplode * 115;

      showAnnotations = explodeNorm > 0.35;
    } else if (p >= 0.82) {
      // Re-assembled for writing
      crownShift = 0;
      capShift = 0;
      nibShift = 0;
      chamberShift = 0;
      barrelShift = 0;
      showAnnotations = false;
    }

    // Apply component offsets
    if (partCrown) partCrown.style.transform = `translateX(${crownShift}px)`;
    if (partCap) partCap.style.transform = `translateX(${capShift}px) translateY(${-Math.abs(capShift) * 0.3}px)`;
    if (partNib) partNib.style.transform = `translateX(${nibShift}px) scale(${1 + (nibShift ? 0.15 : 0)})`;
    if (partChamber) partChamber.style.transform = `translateX(${chamberShift}px)`;
    if (partBarrel) partBarrel.style.transform = `translateX(${barrelShift}px) translateY(${Math.abs(barrelShift) * 0.2}px)`;

    // Toggle Annotations
    [annotCrown, annotNib, annotChamber, annotBarrel].forEach(card => {
      if (card) {
        if (showAnnotations) card.classList.add('visible');
        else card.classList.remove('visible');
      }
    });

    // D. Phase 4: Masterpiece Ready & Calligraphy (Progress 0.82 -> 1.0)
    let finalWriteAngle = 0;
    let penXOffset = 0;

    if (p >= 0.82) {
      const readyNorm = (p - 0.82) / 0.18;
      // Pen angles like a hand holding it ready to write on the parchment
      finalWriteAngle = -readyNorm * 32;
      penLift = -110 - readyNorm * 20;
      penXOffset = readyNorm * 40;
      penRotateY = 180 + readyNorm * 180; // completes full 360 spin

      if (parchmentReveal) {
        parchmentReveal.classList.add('active');
      }
    } else {
      if (parchmentReveal) {
        parchmentReveal.classList.remove('active');
      }
    }

    // Apply primary pen container transformation
    if (penActor) {
      penActor.style.transform = `translateY(${penLift}px) translateX(${penXOffset}px) scale(${penScale}) rotateZ(${finalWriteAngle}deg)`;
    }

    if (pen3dWrapper) {
      pen3dWrapper.style.transform = `rotateY(${penRotateY}deg) rotateX(${penRotateX}deg)`;
    }
  }

  // --------------------------------------------------------------------------
  // 5. Scroll & Animation Render Loop
  // --------------------------------------------------------------------------
  function renderLoop() {
    if (!isAutoPlaying) {
      targetProgress = calculateScrollProgress();
    }

    // Smooth lerp
    currentProgress = lerp(currentProgress, targetProgress, 0.12);

    updateUnboxingVisuals(currentProgress);
    requestAnimationFrame(renderLoop);
  }
  requestAnimationFrame(renderLoop);

  // --------------------------------------------------------------------------
  // 6. Interactive Controls (Step Jump, Prev/Next, Auto Tour)
  // --------------------------------------------------------------------------
  function scrollToPhase(phaseIndex) {
    if (!track) return;
    const trackTop = track.offsetTop;
    const trackHeight = track.offsetHeight - window.innerHeight;
    const targetY = trackTop + (phaseIndex / 4) * trackHeight;
    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }

  phaseSteps.forEach(step => {
    step.addEventListener('click', () => {
      const phase = parseInt(step.dataset.phase, 10);
      scrollToPhase(phase);
    });
  });

  if (prevPhaseBtn) {
    prevPhaseBtn.addEventListener('click', () => {
      let currentPhase = Math.floor(currentProgress * 4.9);
      scrollToPhase(Math.max(0, currentPhase - 1));
    });
  }

  if (nextPhaseBtn) {
    nextPhaseBtn.addEventListener('click', () => {
      let currentPhase = Math.floor(currentProgress * 4.9);
      scrollToPhase(Math.min(4, currentPhase + 1));
    });
  }

  // Auto Tour playback feature
  if (autoPlayToggle) {
    autoPlayToggle.addEventListener('click', () => {
      isAutoPlaying = !isAutoPlaying;

      if (isAutoPlaying) {
        playIcon.textContent = '⏸';
        playText.textContent = 'Pause Tour';
        autoTourStart();
      } else {
        playIcon.textContent = '▶';
        playText.textContent = 'Auto Tour';
      }
    });
  }

  function autoTourStart() {
    if (!isAutoPlaying) return;
    targetProgress += 0.0035;
    if (targetProgress > 1) {
      targetProgress = 0; // loop back
    }
    setTimeout(autoTourStart, 25);
  }

  // --------------------------------------------------------------------------
  // 7. Ambient Gold Dust Particle System
  // --------------------------------------------------------------------------
  const dustCanvas = document.getElementById('dustCanvas');
  if (dustCanvas) {
    const ctx = dustCanvas.getContext('2d');
    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
      dustCanvas.width = dustCanvas.offsetWidth;
      dustCanvas.height = dustCanvas.offsetHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class GoldParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * dustCanvas.width;
        this.y = Math.random() * dustCanvas.height;
        this.size = Math.random() * 2.2 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = -Math.random() * 0.6 - 0.2;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.isSapphire = Math.random() > 0.75;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.y < 0 || this.x < 0 || this.x > dustCanvas.width) {
          this.reset();
          this.y = dustCanvas.height + 10;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.isSapphire) {
          ctx.fillStyle = `rgba(50, 140, 255, ${this.opacity})`;
          ctx.shadowColor = '#2b71ca';
        } else {
          ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
          ctx.shadowColor = '#d4af37';
        }
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new GoldParticle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --------------------------------------------------------------------------
  // 8. Concierge Modal / Alert Mock
  // --------------------------------------------------------------------------
  const conciergeBtn = document.getElementById('conciergeBtn');
  if (conciergeBtn) {
    conciergeBtn.addEventListener('click', () => {
      const bespokeSec = document.getElementById('bespoke');
      if (bespokeSec) bespokeSec.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
