// const titles = document.querySelectorAll(".title");

// titles.forEach(button => {

// button.addEventListener("click", function(){

// const content = this.nextElementSibling;

// content.classList.toggle("active");

// });

// });
const titles=document.querySelectorAll(".title");
titles.forEach(button => {
    addEventListener("click",function(){
        const content=this.nextElementSibling;
        content.classList.toggle("active")
    });
    
});
// =============================================
// DREAMSCAPE - Interactive JavaScript Effects
// =============================================

// ── 1. CUSTOM CURSOR TRAIL ──────────────────
(function initCursorTrail() {
  const trailCount = 12;
  const trails = [];

  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${14 - i * 0.8}px;
      height: ${14 - i * 0.8}px;
      border-radius: 50%;
      background: hsl(${200 + i * 10}, 100%, ${70 - i * 2}%);
      pointer-events: none;
      z-index: 9999;
      opacity: ${1 - i * 0.07};
      transition: transform 0.1s ease;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(dot);
    trails.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    let prevX = mouseX, prevY = mouseY;
    trails.forEach((trail, i) => {
      const speed = 0.18 + i * 0.015;
      trail.x += (prevX - trail.x) * speed;
      trail.y += (prevY - trail.y) * speed;
      trail.el.style.left = trail.x - trail.el.offsetWidth / 2 + 'px';
      trail.el.style.top = trail.y - trail.el.offsetHeight / 2 + 'px';
      prevX = trail.x;
      prevY = trail.y;
    });
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
})();


// ── 2. DYNAMIC STAR FIELD (canvas overlay) ──
(function initStarField() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 160;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.4 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      color: `hsl(${Math.random() * 60 + 190}, 80%, 80%)`
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.twinkle += star.twinkleSpeed;
      const alpha = 0.4 + Math.sin(star.twinkle) * 0.6;
      const scale = 0.8 + Math.sin(star.twinkle) * 0.3;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => { resize(); createStars(); });
  resize();
  createStars();
  drawStars();
})();


// ── 3. SHOOTING STARS ────────────────────────
(function initShootingStars() {
  function createShootingStar() {
    const star = document.createElement('div');
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.5;
    const length = Math.random() * 120 + 60;
    const angle = Math.random() * 20 + 20;

    star.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      width: ${length}px;
      height: 2px;
      background: linear-gradient(90deg, white, transparent);
      pointer-events: none;
      z-index: 1;
      transform: rotate(${angle}deg);
      opacity: 0;
      border-radius: 2px;
      animation: shootStar 0.8s ease-in forwards;
    `;

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 900);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes shootStar {
      0%   { opacity: 0; transform: rotate(30deg) translateX(0); }
      20%  { opacity: 1; }
      100% { opacity: 0; transform: rotate(30deg) translateX(220px); }
    }
  `;
  document.head.appendChild(style);

  function scheduleNext() {
    setTimeout(() => {
      createShootingStar();
      scheduleNext();
    }, Math.random() * 2500 + 800);
  }
  scheduleNext();
})();


// ── 4. SCROLL REVEAL ANIMATION ───────────────
(function initScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .dream-reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .dream-reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll('section, .world-card, .exp-text, .exp-img, .about p');
  targets.forEach((el, i) => {
    el.classList.add('dream-reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();


// ── 5. WORLD CARD 3D TILT + GLOW EFFECT ──────
(function initCardTilt() {
  const style = document.createElement('style');
  style.textContent = `
    .world-card {
      transform-style: preserve-3d;
      transition: box-shadow 0.3s ease;
      cursor: pointer;
    }
    .world-card-glow {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(100,200,255,0.25), transparent 65%);
      z-index: 2;
    }
    .world-card:hover .world-card-glow { opacity: 1; }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.world-card').forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';

    const glow = document.createElement('div');
    glow.className = 'world-card-glow';
    card.appendChild(glow);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -12;
      const rotY = ((x - cx) / cx) * 12;

      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
      card.style.boxShadow = `0 20px 50px rgba(0,150,255,0.3), 0 0 30px rgba(0,200,255,0.15)`;
      glow.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      glow.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  });
})();


// ── 6. NAVBAR SCROLL GLASS EFFECT ────────────
(function initNavbarEffect() {
  const navbar = document.querySelector('.dream-navbar, nav.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(0,0,10,0.85)';
      navbar.style.backdropFilter = 'blur(12px)';
      navbar.style.boxShadow = '0 2px 30px rgba(0,150,255,0.15)';
    } else {
      navbar.style.background = '';
      navbar.style.backdropFilter = '';
      navbar.style.boxShadow = '';
    }
  });
})();


// ── 7. HERO PARALLAX ON SCROLL ───────────────
(function initParallax() {
  const hero = document.querySelector('header#home, header, .hero-content');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    hero.style.transform = `translateY(${scrollY * 0.35}px)`;
    hero.style.opacity = Math.max(0, 1 - scrollY / 500);
  }, { passive: true });
})();


// ── 8. CTA BUTTON RIPPLE EFFECT ──────────────
(function initRipple() {
  const style = document.createElement('style');
  style.textContent = `
    .cta-btn { position: relative; overflow: hidden; }
    @keyframes rippleAnim {
      0%   { transform: scale(0); opacity: 0.6; }
      100% { transform: scale(4); opacity: 0; }
    }
    .ripple-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.5);
      width: 60px; height: 60px;
      margin: -30px 0 0 -30px;
      animation: rippleAnim 0.6s ease-out forwards;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      circle.className = 'ripple-circle';
      const rect = this.getBoundingClientRect();
      circle.style.left = (e.clientX - rect.left) + 'px';
      circle.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 700);
    });
  });
})();


// ── 9. SECTION TITLE TYPEWRITER EFFECT ───────
(function initTypewriter() {
  const titles = document.querySelectorAll('.section-title');
  if (!titles.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent;
      el.textContent = '';
      el.style.borderRight = '2px solid currentColor';
      let i = 0;
      const interval = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => el.style.borderRight = 'none', 400);
        }
      }, 55);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  titles.forEach(el => observer.observe(el));
})();


// ── 10. MOUSE-REACTIVE HERO PARTICLE BURST ───
(function initHeroClickBurst() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes burstParticle {
      0%   { transform: translate(0,0) scale(1); opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('click', (e) => {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const angle = (360 / count) * i;
      const dist = Math.random() * 80 + 40;
      const tx = Math.cos((angle * Math.PI) / 180) * dist + 'px';
      const ty = Math.sin((angle * Math.PI) / 180) * dist + 'px';
      const hue = Math.random() * 60 + 180;

      p.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${Math.random() * 6 + 3}px;
        height: ${Math.random() * 6 + 3}px;
        border-radius: 50%;
        background: hsl(${hue}, 100%, 70%);
        pointer-events: none;
        z-index: 9998;
        --tx: ${tx}; --ty: ${ty};
        animation: burstParticle 0.55s ease-out forwards;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }
  });
})();
// =============================================
// DREAMSCAPE - Interactive JavaScript Effects
// =============================================

// ── 1. CUSTOM CURSOR TRAIL ──────────────────
(function initCursorTrail() {
  const trailCount = 12;
  const trails = [];

  for (let i = 0; i < trailCount; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      width: ${14 - i * 0.8}px;
      height: ${14 - i * 0.8}px;
      border-radius: 50%;
      background: hsl(${200 + i * 10}, 100%, ${70 - i * 2}%);
      pointer-events: none;
      z-index: 9999;
      opacity: ${1 - i * 0.07};
      transition: transform 0.1s ease;
      mix-blend-mode: screen;
    `;
    document.body.appendChild(dot);
    trails.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    let prevX = mouseX, prevY = mouseY;
    trails.forEach((trail, i) => {
      const speed = 0.18 + i * 0.015;
      trail.x += (prevX - trail.x) * speed;
      trail.y += (prevY - trail.y) * speed;
      trail.el.style.left = trail.x - trail.el.offsetWidth / 2 + 'px';
      trail.el.style.top = trail.y - trail.el.offsetHeight / 2 + 'px';
      prevX = trail.x;
      prevY = trail.y;
    });
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
})();


// ── 2. DYNAMIC STAR FIELD (canvas overlay) ──
(function initStarField() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  `;
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let stars = [];
  const STAR_COUNT = 160;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      speed: Math.random() * 0.4 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      color: `hsl(${Math.random() * 60 + 190}, 80%, 80%)`
    }));
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      star.twinkle += star.twinkleSpeed;
      const alpha = 0.4 + Math.sin(star.twinkle) * 0.6;
      const scale = 0.8 + Math.sin(star.twinkle) * 0.3;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => { resize(); createStars(); });
  resize();
  createStars();
  drawStars();
})();


// ── 3. SHOOTING STARS ────────────────────────
(function initShootingStars() {
  function createShootingStar() {
    const star = document.createElement('div');
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.5;
    const length = Math.random() * 120 + 60;
    const angle = Math.random() * 20 + 20;

    star.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      width: ${length}px;
      height: 2px;
      background: linear-gradient(90deg, white, transparent);
      pointer-events: none;
      z-index: 1;
      transform: rotate(${angle}deg);
      opacity: 0;
      border-radius: 2px;
      animation: shootStar 0.8s ease-in forwards;
    `;

    document.body.appendChild(star);
    setTimeout(() => star.remove(), 900);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes shootStar {
      0%   { opacity: 0; transform: rotate(30deg) translateX(0); }
      20%  { opacity: 1; }
      100% { opacity: 0; transform: rotate(30deg) translateX(220px); }
    }
  `;
  document.head.appendChild(style);

  function scheduleNext() {
    setTimeout(() => {
      createShootingStar();
      scheduleNext();
    }, Math.random() * 2500 + 800);
  }
  scheduleNext();
})();


// ── 4. SCROLL REVEAL ANIMATION ───────────────
(function initScrollReveal() {
  const style = document.createElement('style');
  style.textContent = `
    .dream-reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .dream-reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const targets = document.querySelectorAll('section, .world-card, .exp-text, .exp-img, .about p');
  targets.forEach((el, i) => {
    el.classList.add('dream-reveal');
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();


// ── 5. WORLD CARD 3D TILT + GLOW EFFECT ──────
(function initCardTilt() {
  const style = document.createElement('style');
  style.textContent = `
    .world-card {
      transform-style: preserve-3d;
      transition: box-shadow 0.3s ease;
      cursor: pointer;
    }
    .world-card-glow {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
      background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(100,200,255,0.25), transparent 65%);
      z-index: 2;
    }
    .world-card:hover .world-card-glow { opacity: 1; }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.world-card').forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';

    const glow = document.createElement('div');
    glow.className = 'world-card-glow';
    card.appendChild(glow);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -12;
      const rotY = ((x - cx) / cx) * 12;

      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`;
      card.style.boxShadow = `0 20px 50px rgba(0,150,255,0.3), 0 0 30px rgba(0,200,255,0.15)`;
      glow.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      glow.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
      card.style.boxShadow = '';
    });
  });
})();


// ── 6. NAVBAR SCROLL GLASS EFFECT ────────────
(function initNavbarEffect() {
  const navbar = document.querySelector('.dream-navbar, nav.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(0,0,10,0.85)';
      navbar.style.backdropFilter = 'blur(12px)';
      navbar.style.boxShadow = '0 2px 30px rgba(0,150,255,0.15)';
    } else {
      navbar.style.background = '';
      navbar.style.backdropFilter = '';
      navbar.style.boxShadow = '';
    }
  });
})();


// ── 7. HERO PARALLAX ON SCROLL ───────────────
(function initParallax() {
  const hero = document.querySelector('header#home, header, .hero-content');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    hero.style.transform = `translateY(${scrollY * 0.35}px)`;
    hero.style.opacity = Math.max(0, 1 - scrollY / 500);
  }, { passive: true });
})();


// ── 8. CTA BUTTON RIPPLE EFFECT ──────────────
(function initRipple() {
  const style = document.createElement('style');
  style.textContent = `
    .cta-btn { position: relative; overflow: hidden; }
    @keyframes rippleAnim {
      0%   { transform: scale(0); opacity: 0.6; }
      100% { transform: scale(4); opacity: 0; }
    }
    .ripple-circle {
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.5);
      width: 60px; height: 60px;
      margin: -30px 0 0 -30px;
      animation: rippleAnim 0.6s ease-out forwards;
      pointer-events: none;
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      circle.className = 'ripple-circle';
      const rect = this.getBoundingClientRect();
      circle.style.left = (e.clientX - rect.left) + 'px';
      circle.style.top = (e.clientY - rect.top) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 700);
    });
  });
})();


// ── 9. SECTION TITLE TYPEWRITER EFFECT ───────
(function initTypewriter() {
  const titles = document.querySelectorAll('.section-title');
  if (!titles.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent;
      el.textContent = '';
      el.style.borderRight = '2px solid currentColor';
      let i = 0;
      const interval = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => el.style.borderRight = 'none', 400);
        }
      }, 55);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  titles.forEach(el => observer.observe(el));
})();


// ── 11. WORLD CARD CINEMATIC MODAL ───────────
(function initWorldModal() {

  const worldData = {
    "Galaxy Realm": {
      tag: "Deep Space",
      tagBg: "rgba(100,80,220,0.18)",
      tagColor: "#a78bfa",
      desc: "Venture beyond the Milky Way into a dimension of supernovae and ancient star clusters. Every star holds a secret civilization waiting to be discovered.",
      stats: [["12.4B", "Light Years"], ["847", "Star Systems"], ["∞", "Mysteries"]],
      btnText: "Enter the Galaxy",
      btnColor: "linear-gradient(135deg,#534AB7,#7F77DD)",
      accent: "#7F77DD"
    },
    "Neon Universe": {
      tag: "Cyberpunk",
      tagBg: "rgba(212,83,126,0.18)",
      tagColor: "#f472b6",
      desc: "A hyper-city dimension pulsing with electric energy. Holographic towers pierce neon clouds as data streams flow like rivers through the night.",
      stats: [["9.2M", "Citizens"], ["24/7", "Active"], ["404", "Districts"]],
      btnText: "Jack In Now",
      btnColor: "linear-gradient(135deg,#993556,#D4537E)",
      accent: "#D4537E"
    },
    "Cosmic Horizon": {
      tag: "Frontier",
      tagBg: "rgba(15,110,86,0.18)",
      tagColor: "#34d399",
      desc: "Stand at the edge of existence itself. Where space-time bends into unknown territory and the fabric of reality shimmers like heat above desert sand.",
      stats: [["Event", "Horizon"], ["Zero", "Gravity"], ["Time", "Dilated"]],
      btnText: "Cross the Horizon",
      btnColor: "linear-gradient(135deg,#0F6E56,#1D9E75)",
      accent: "#1D9E75"
    }
  };

  // inject styles
  const style = document.createElement('style');
  style.textContent = `
    .ds-modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,5,0.85);
      z-index: 10000;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(6px);
    }
    .ds-modal-overlay.active { display: flex; animation: dsOverlayIn 0.3s ease forwards; }
    @keyframes dsOverlayIn { from { opacity:0; } to { opacity:1; } }

    .ds-modal {
      background: #0a0a1a;
      border-radius: 20px;
      width: 90%;
      max-width: 480px;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.1);
      transform: translateY(30px) scale(0.95);
      animation: dsModalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
      position: relative;
    }
    @keyframes dsModalIn { to { transform: translateY(0) scale(1); } }

    .ds-modal-img-wrap { position: relative; height: 200px; overflow: hidden; }
    .ds-modal-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; filter:brightness(0.75); }
    .ds-modal-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom, transparent 40%, #0a0a1a 100%);
    }
    .ds-modal-img-title {
      position: absolute; bottom: 14px; left: 20px;
      font-size: 22px; font-weight: 700; color: #fff;
      text-shadow: 0 0 20px rgba(0,0,0,0.8);
      font-family: 'Orbitron', sans-serif;
    }
    .ds-modal-close {
      position: absolute; top: 12px; right: 14px;
      background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2);
      color: #fff; width: 32px; height: 32px; border-radius: 50%;
      cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center;
      transition: background 0.2s;
    }
    .ds-modal-close:hover { background: rgba(255,255,255,0.15); }

    .ds-modal-body { padding: 0 20px 22px; }
    .ds-modal-tag {
      display: inline-block; font-size: 11px; font-weight: 600;
      padding: 3px 12px; border-radius: 20px; margin: 14px 0 10px;
      letter-spacing: 0.08em; text-transform: uppercase;
    }
    .ds-modal-desc {
      font-size: 13.5px; color: rgba(255,255,255,0.65);
      line-height: 1.7; margin-bottom: 16px;
    }
    .ds-modal-stats {
      display: grid; grid-template-columns: 1fr 1fr 1fr;
      gap: 10px; margin-bottom: 18px;
    }
    .ds-stat {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px; padding: 10px 8px; text-align: center;
    }
    .ds-stat-val { font-size: 17px; font-weight: 700; color: #fff; }
    .ds-stat-lbl { font-size: 10px; color: rgba(255,255,255,0.45); margin-top: 3px; }
    .ds-modal-explore-btn {
      width: 100%; padding: 12px;
      border-radius: 10px; border: none;
      font-size: 14px; font-weight: 600; color: #fff;
      cursor: pointer; letter-spacing: 0.04em;
      transition: opacity 0.2s, transform 0.15s;
    }
    .ds-modal-explore-btn:hover { opacity:0.88; transform:scale(0.99); }
    .ds-portal-pulse {
      position: absolute; inset: -1px; border-radius: 20px;
      border: 2px solid transparent; pointer-events: none;
      animation: dsPulse 2s ease-in-out infinite;
    }
    @keyframes dsPulse {
      0%,100% { box-shadow: 0 0 0 0 transparent; }
      50% { box-shadow: 0 0 20px 4px var(--accent-color); }
    }
    .world-card { cursor: pointer; }
  `;
  document.head.appendChild(style);

  // build overlay
  const overlay = document.createElement('div');
  overlay.className = 'ds-modal-overlay';
  overlay.innerHTML = `
    <div class="ds-modal" id="dsModal">
      <div class="ds-portal-pulse" id="dsPortalPulse"></div>
      <div class="ds-modal-img-wrap">
        <img id="dsModalImg" src="" alt="">
        <div class="ds-modal-img-overlay"></div>
        <div class="ds-modal-img-title" id="dsModalTitle"></div>
        <button class="ds-modal-close" id="dsModalClose">&#x2715;</button>
      </div>
      <div class="ds-modal-body">
        <span class="ds-modal-tag" id="dsModalTag"></span>
        <div class="ds-modal-desc" id="dsModalDesc"></div>
        <div class="ds-modal-stats" id="dsModalStats"></div>
        <button class="ds-modal-explore-btn" id="dsModalBtn"></button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  function openModal(card) {
    const title = card.querySelector('h3')?.textContent?.trim();
    const imgSrc = card.querySelector('img')?.src;
    const data = worldData[title];
    if (!data) return;

    document.getElementById('dsModalImg').src = imgSrc;
    document.getElementById('dsModalTitle').textContent = title;
    document.getElementById('dsModalTag').textContent = data.tag;
    document.getElementById('dsModalTag').style.cssText = `background:${data.tagBg};color:${data.tagColor}`;
    document.getElementById('dsModalDesc').textContent = data.desc;
    document.getElementById('dsModalBtn').textContent = data.btnText;
    document.getElementById('dsModalBtn').style.background = data.btnColor;
    document.getElementById('dsPortalPulse').style.setProperty('--accent-color', data.accent);

    const statsEl = document.getElementById('dsModalStats');
    statsEl.innerHTML = data.stats.map(s =>
      `<div class="ds-stat"><div class="ds-stat-val">${s[0]}</div><div class="ds-stat-lbl">${s[1]}</div></div>`
    ).join('');

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.getElementById('dsModalClose').addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // attach to all world cards
  function attachCards() {
    document.querySelectorAll('.world-card').forEach(card => {
      if (!card.dataset.dsModal) {
        card.dataset.dsModal = '1';
        card.addEventListener('click', () => openModal(card));
      }
    });
  }

  attachCards();
  // retry after DOM settles
  setTimeout(attachCards, 800);

})();

// ── 10. MOUSE-REACTIVE HERO PARTICLE BURST ───
(function initHeroClickBurst() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes burstParticle {
      0%   { transform: translate(0,0) scale(1); opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  document.addEventListener('click', (e) => {
    const count = 14;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const angle = (360 / count) * i;
      const dist = Math.random() * 80 + 40;
      const tx = Math.cos((angle * Math.PI) / 180) * dist + 'px';
      const ty = Math.sin((angle * Math.PI) / 180) * dist + 'px';
      const hue = Math.random() * 60 + 180;

      p.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${Math.random() * 6 + 3}px;
        height: ${Math.random() * 6 + 3}px;
        border-radius: 50%;
        background: hsl(${hue}, 100%, 70%);
        pointer-events: none;
        z-index: 9998;
        --tx: ${tx}; --ty: ${ty};
        animation: burstParticle 0.55s ease-out forwards;
      `;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }
  });
})();
