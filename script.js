/* ════════════════════════════════════════════════════
   ABDULBARI AHMED — PORTFOLIO
   script.js — All interactive functionality
════════════════════════════════════════════════════ */

"use strict";

/* ──────────────────────────────────────────
   1. CUSTOM CURSOR
────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById("cursor");
  const cursorDot = document.getElementById("cursor-dot");
  if (!cursor || !cursorDot) return;

  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + "px";
    cursorDot.style.top = mouseY + "px";
  });

  // Smooth follow for outer ring
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Grow on hoverable elements
  const hoverables =
    "a, button, .exp-card, .project-card, .tech-tag, .about-card, .contact-link";
  document.querySelectorAll(hoverables).forEach((el) => {
    el.addEventListener(
      "mouseenter",
      () => (cursor.style.transform = "translate(-50%, -50%) scale(1.6)"),
    );
    el.addEventListener(
      "mouseleave",
      () => (cursor.style.transform = "translate(-50%, -50%) scale(1)"),
    );
  });
})();

/* ──────────────────────────────────────────
   2. NAVBAR — scroll behaviour
────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    },
    { passive: true },
  );
})();

/* ──────────────────────────────────────────
   3. MOBILE HAMBURGER MENU
────────────────────────────────────────── */
(function initHamburger() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.classList.toggle("open", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close on any mobile link click
  menu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ──────────────────────────────────────────
   4. HERO CANVAS — particle network
────────────────────────────────────────── */
(function initCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H, particles, animId;
  const PARTICLE_COUNT = 80;
  const MAX_DIST = 130;
  const ACCENT = "0, 229, 255";

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 1.5 + 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT}, 0.5)`;
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const opacity = (1 - dist / MAX_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${ACCENT}, ${opacity})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  window.addEventListener(
    "resize",
    () => {
      resize();
    },
    { passive: true },
  );
  init();
  animate();
})();

/* ──────────────────────────────────────────
   5. TYPING ANIMATION
────────────────────────────────────────── */
(function initTyping() {
  const el = document.getElementById("typed");
  if (!el) return;

  const roles = [
    "an App Developer",
    "a Data Scientist",
    "an Engineer",
    "a Problem Solver",
    "a Collaborator",
    "a Leader",
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pause = false;

  function type() {
    if (pause) return;
    const current = roles[roleIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        pause = true;
        setTimeout(() => {
          deleting = true;
          pause = false;
          type();
        }, 2000);
        return;
      }
      setTimeout(type, 80);
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(type, 500);
        return;
      }
      setTimeout(type, 40);
    }
  }

  setTimeout(type, 800);
})();

/* ──────────────────────────────────────────
   6. SCROLL REVEAL (Intersection Observer)
────────────────────────────────────────── */
(function initReveal() {
  // exp-cards handled separately — they use 3D transforms and must not get translateY
  const standard = document.querySelectorAll(
    ".project-card, .skill-group, .skill-bubble, " +
      ".contact-link, .stat-block, .hero-chips .chip, .hero-stats",
  );
  const expCards = document.querySelectorAll(".exp-card");

  standard.forEach((el) => el.classList.add("reveal"));
  expCards.forEach((el) => el.classList.add("reveal")); // CSS overrides transform for .exp-card.reveal

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible");
          }, idx * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  [...standard, ...expCards].forEach((el) => observer.observe(el));
})();

/* skill bar animation removed — using bubbles */

/* ──────────────────────────────────────────
   8. EXP CARD FLIP (click to toggle)
────────────────────────────────────────── */
(function initFlipCards() {
  document.querySelectorAll(".exp-card").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));

    // Keyboard accessible
    card.setAttribute("tabindex", "0");
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });
})();

/* ──────────────────────────────────────────
   9. ACTIVE NAV LINK highlight on scroll
────────────────────────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(
    "#navbar .nav-links a, .footer-nav a",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((link) => {
            link.style.color =
              link.getAttribute("href") === `#${id}` ? "var(--white)" : "";
          });
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => observer.observe(s));
})();

/* ──────────────────────────────────────────
   10. SMOOTH SCROLL for all anchor links
────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ──────────────────────────────────────────
   11. TERMINAL TYPEWRITER effect in contact
────────────────────────────────────────── */
(function initTerminal() {
  const terminal = document.querySelector(".terminal-body");
  if (!terminal) return;

  const lines = terminal.querySelectorAll("p");

  // Hide all lines initially
  lines.forEach((l) => {
    l.style.opacity = "0";
  });

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();

      lines.forEach((line, i) => {
        setTimeout(() => {
          line.style.transition = "opacity 0.4s ease";
          line.style.opacity = "1";
        }, i * 350);
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(terminal);
})();
