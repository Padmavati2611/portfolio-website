/* =============================================
   PADMAVATI PORTFOLIO - MAIN SCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // LOADING SCREEN
  // =============================================
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1200);
  });

  // Fallback: hide after 3s if load event already fired
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 3000);

  // =============================================
  // TYPING ANIMATION
  // =============================================
  const roles = [
    'Full Stack Developer',
    'Frontend Developer',
    'UI/UX Enthusiast',
    'Problem Solver'
  ];
  const typedRole = document.getElementById('typed-role');
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];
    if (!isDeleting) {
      typedRole.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1500;
      } else {
        typeSpeed = 80 + Math.random() * 60;
      }
    } else {
      typedRole.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 300;
      } else {
        typeSpeed = 40 + Math.random() * 30;
      }
    }
    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // =============================================
  // PARTICLES BACKGROUND
  // =============================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouseX = 0;
  let mouseY = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse interaction: slight attraction
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const force = (200 - dist) / 200;
        this.x -= dx * force * 0.003;
        this.y -= dy * force * 0.003;
      }

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108, 99, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  const particleCount = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let connectionOpacity = 0.08;

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.update();
      p.draw();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(108, 99, 255, ${connectionOpacity * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Adjust connection opacity based on scroll
  document.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    connectionOpacity = 0.04 + scrollPercent * 0.08;
  });

  // =============================================
  // CURSOR GLOW
  // =============================================
  const cursorGlow = document.getElementById('cursor-glow');

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
  });

  // Hide cursor glow on touch devices
  if ('ontouchstart' in window) {
    cursorGlow.style.display = 'none';
  }

  // =============================================
  // SCROLL PROGRESS BAR
  // =============================================
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = progress + '%';

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (scrollTop > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =============================================
  // NAVBAR SCROLL EFFECT
  // =============================================
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link based on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // =============================================
  // MOBILE NAV TOGGLE
  // =============================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // =============================================
  // REVEAL ON SCROLL (IntersectionObserver)
  // =============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // =============================================
  // ANIMATED COUNTERS
  // =============================================
  const statNumbers = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const count = parseInt(target.getAttribute('data-count'), 10);
          animateCounter(target, count);
          counterObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => counterObserver.observe(el));

  function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 40);
    const duration = 1500;
    const stepTime = Math.floor(duration / 40);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current;
    }, stepTime);
  }

  // =============================================
  // SKILL BAR FILL ANIMATION
  // =============================================
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.getAttribute('data-width');
          fill.style.width = width + '%';
          skillObserver.unobserve(fill);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillFills.forEach((fill) => skillObserver.observe(fill));

  // =============================================
  // FORM VALIDATION
  // =============================================
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    // Reset errors
    document.querySelectorAll('.form-group').forEach((g) => g.classList.remove('error'));

    if (!name.value.trim()) {
      showError(name, 'Please enter your name');
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, 'Please enter your email');
      isValid = false;
    } else if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'Please enter your message');
      isValid = false;
    }

    if (isValid) {
      const btn = contactForm.querySelector('.submit-btn');
      btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
        contactForm.reset();

        setTimeout(() => {
          btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    }
  });

  function showError(input, msg) {
    const group = input.closest('.form-group');
    group.classList.add('error');
    const errorEl = group.querySelector('.form-error');
    errorEl.textContent = msg;
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Clear error on input
  document.querySelectorAll('.form-group input, .form-group textarea').forEach((input) => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      group.classList.remove('error');
    });
  });

  // =============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // 3D SCROLL PARALLAX
  // =============================================
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollY / maxScroll;

    // 3D scene rotation based on scroll
    const scene3d = document.querySelector('.scene-3d');
    if (scene3d) {
      const cube = scene3d.querySelector('.cube-3d');
      const pyramid = scene3d.querySelector('.pyramid-3d');
      const rings = scene3d.querySelectorAll('.ring-3d');
      const dodeca = scene3d.querySelector('.dodecahedron-3d');

      if (cube) {
        const extraRotate = scrollPercent * 360;
        cube.style.animation = 'none';
        cube.style.transform = `rotateX(${extraRotate}deg) rotateY(${extraRotate * 0.7}deg) translateY(${Math.sin(scrollPercent * Math.PI * 2) * 30}px)`;
      }
      if (pyramid) {
        const extraRotate = scrollPercent * 180;
        pyramid.style.animation = 'none';
        pyramid.style.transform = `rotateX(${20 + scrollPercent * 20}deg) rotateY(${extraRotate}deg) translateY(${Math.sin(scrollPercent * Math.PI) * -40}px)`;
      }
      if (dodeca) {
        dodeca.style.animation = 'none';
        dodeca.style.transform = `rotateX(${15 + scrollPercent * 30}deg) rotateY(${scrollPercent * 720}deg)`;
      }
      rings.forEach((ring, i) => {
        ring.style.animation = 'none';
        const dir = i === 0 ? 1 : -1;
        ring.style.transform = `rotateX(60deg) rotateY(${scrollPercent * 360 * dir}deg) rotateZ(${scrollPercent * 180 * dir}deg) scale(${1 + scrollPercent * 0.2})`;
      });
    }
  });

  // =============================================
  // 3D DEPTH PARALLAX ON MOUSE MOVE
  // =============================================
  document.addEventListener('mousemove', (e) => {
    const xFactor = (e.clientX / window.innerWidth - 0.5) * 2;
    const yFactor = (e.clientY / window.innerHeight - 0.5) * 2;

    // Move hero content with depth layers
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.transform = `perspective(1200px) rotateY(${xFactor * 2}deg) rotateX(${yFactor * -1.5}deg)`;
    }

    // Move elements with data-depth attributes (exclude hero-content which has its own transform)
    document.querySelectorAll('[data-depth]').forEach((el) => {
      if (el.classList.contains('hero-content')) return;
      const depth = parseFloat(el.getAttribute('data-depth')) || 0.3;
      const moveX = xFactor * 15 * depth;
      const moveY = yFactor * 15 * depth;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    // 3D scene shapes parallax
    const scene3d = document.querySelector('.scene-3d');
    if (scene3d) {
      scene3d.style.transform = `translate(${xFactor * -10}px, ${yFactor * -10}px)`;
    }
  });

  // =============================================
  // ENHANCED 3D TILT WITH INNER ELEMENT DEPTH
  // =============================================
  const enhancedTiltCards = document.querySelectorAll('[data-tilt]');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    enhancedTiltCards.forEach((card) => {
      card.style.transform = 'none !important';
    });
  } else {
    enhancedTiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -12;
      const rotateY = (x - centerX) / centerX * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

      // Move direct children with depth effect
      card.querySelectorAll(':scope > *').forEach((child, i) => {
        const depth = 5 + (i * 3);
        child.style.transform = `translateZ(${depth}px)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.querySelectorAll(':scope > *').forEach((child) => {
        child.style.transform = '';
      });
    });
  });
  }

  console.log('%c Padmavati Portfolio ', 'background: linear-gradient(135deg, #6c63ff, #00d4ff); color: #fff; font-size: 1.2rem; padding: 10px 20px; border-radius: 4px; font-weight: bold;');
  console.log('%c Built with ❤ using HTML, CSS & JavaScript ', 'color: #a0a0b8; font-size: 0.9rem;');
});
