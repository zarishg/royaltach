// ---------- Royaltach Interactive Scripts ----------

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initMarquee();
  initServices();
  initOrbit();
  initProjectGlows();
  initCeoTabs();
  initScrollReveal();
  initTypewriter();
  initContactForm();
  
  // Set current footer year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ---------- Custom Cursor ----------
function initCursor() {
  const dot = document.getElementById('curDot');
  const ring = document.getElementById('curRing');
  
  if (!dot || !ring) return;

  let mx = 0, my = 0; // Mouse targets
  let rx = 0, ry = 0; // Interpolated ring positions
  let scale = 1;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    
    // Instantly position the central dot
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    
    if (!isMoving) {
      isMoving = true;
      rx = mx;
      ry = my;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });

  // Hide cursor when leaving viewport
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  // Re-show and snap cursor when entering viewport
  document.addEventListener('mouseenter', (e) => {
    mx = e.clientX;
    my = e.clientY;
    rx = mx;
    ry = my;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    
    if (isMoving) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });

  // Spring animation loop for the outer ring
  function updateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
    requestAnimationFrame(updateRing);
  }
  updateRing();

  // Hover animations on interactive elements
  function addCursorListeners() {
    const interactives = document.querySelectorAll('a, button, .service-row, .project-card, .ceo-card, .team-member-card, input, select, textarea');
    interactives.forEach(el => {
      // Avoid duplicate binding
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = 'true';

      el.addEventListener('mouseenter', () => {
        scale = 2;
        ring.classList.add('big');
      });
      
      el.addEventListener('mouseleave', () => {
        scale = 1;
        ring.classList.remove('big');
      });
    });
  }

  addCursorListeners();
  
  // Re-run listener attachment if dynamic elements are added
  window.addEventListener('cursorRefresh', addCursorListeners);
}

// ---------- Infinite Marquee ----------
function initMarquee() {
  const words = [
    "Web Development", "Mobile Apps", "AI Chatbots", "CRM Systems",
    "Game Development", "SEO & Branding", "Desktop Software", "Inventory Systems"
  ];
  const track = document.getElementById('marqueeTrack');
  if (!track) return;
  
  // Double-fill elements to ensure seamless loop
  const content = words.map(w => `<span>${w}</span>`).join('');
  track.innerHTML = content + content;
}

// ---------- Services Accordion ----------
const servicesData = [
  { t: "Web Design & Development", d: "Bespoke marketing websites and complex web applications designed with modern architecture. We use robust styling and performance-first frameworks to ship secure, scalable applications tailored to your business model.", tags: "REACT · NEXTJS · NODE · TS" },
  { t: "Mobile App Development", d: "High-performance native and cross-platform mobile apps for iOS and Android. Engineered from visual prototype to App Store and Google Play launch, ensuring offline capabilities, push systems, and seamless payments.", tags: "FLUTTER · DART · IOS · ANDROID" },
  { t: "Desktop Software", d: "Custom offline-first desktop systems for Windows, macOS, and Linux platforms. Designed around internal corporate workflows, secure localized databases, and real-time operations.", tags: "ELECTRON · C# · MACOS · LINUX" },
  { t: "AI Agents & Chatbots", d: "Design custom AI agents, intelligent chatbots, and workflow automation solutions. We develop virtual assistants for websites, WhatsApp, and customer support platforms, integrating NLP and AI model deployment to automate repetitive business processes and improve operational workflows.", tags: "AI AGENTS · CHATBOTS · NLP · DEPLOYMENT" },
  { t: "CRM Systems", d: "Bespoke client relationship management platforms built precisely for how your sales pipeline converts. Track deals, manage funnels, and automate client follow-ups with robust custom reporting.", tags: "DASHBOARDS · API · WORKFLOWS" },
  { t: "Inventory Systems", d: "Warehouse management and stock-tracking applications syncing suppliers, shipments, and live retail counts. Integrated with barcode scanning, custom alerts, and predictive stock analytics.", tags: "STOCK · ORDERS · DB · REALTIME" },
  { t: "Game Development", d: "Stunning 2D and 3D visual experiences and interactive gamification modules. Built on modern engines for mobile platforms, browsers, and desktop launches.", tags: "UNITY · C# · 3D · WEBGL" },
  { t: "Search Engine Optimization", d: "Deep technical audits, semantic code optimizations, and strategic content architectures built to improve your rankings. We optimize structure, speed, and metadata so your site is easier to find on Google.", tags: "AUDITS · CORE WEB VITALS · SCHEMA" },
  { t: "Branding & Identity", d: "Premium naming, logo systems, brand guidelines, and design languages. We craft unified corporate aesthetics that align visual design with strategic corporate positioning.", tags: "IDENTITY · STYLEGUIDE · TYPOGRAPHY" },
  { t: "Bespoke Enterprise Software", d: "End-to-end proprietary technology suites built for corporations outgrowing generic off-the-shelf tools. Fully audited API integrations, robust user permission systems, and bank-grade data security.", tags: "ENTERPRISE · SECURITY · ARCHITECTURE" }
];

function initServices() {
  const list = document.getElementById('serviceList');
  if (!list) return;

  list.innerHTML = servicesData.map((s, i) => `
    <div class="service-row reveal" data-i="${i}">
      <div class="service-num">${String(i + 1).padStart(2, '0')}</div>
      <div class="service-title">${s.t}</div>
      <div class="service-tags">${s.tags}</div>
      <div class="service-arrow">
        <svg viewBox="0 0 24 24" fill="none"><path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="service-desc-wrapper">
        <div class="service-desc-content">${s.d}</div>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.service-row').forEach(row => {
    row.addEventListener('click', () => {
      const wasOpen = row.classList.contains('open');
      
      // Close all service rows
      list.querySelectorAll('.service-row').forEach(r => r.classList.remove('open'));
      
      // Toggle current row
      if (!wasOpen) {
        row.classList.add('open');
      }
    });
  });
  
  // Notify custom cursor that new items are loaded
  window.dispatchEvent(new Event('cursorRefresh'));
}

// ---------- Constellation Orbit (Signature Visual Element) ----------
function initOrbit() {
  const orbit = document.getElementById('orbit');
  if (!orbit) return;
  
  const svgNS = "http://www.w3.org/2000/svg";
  const cx = 250, cy = 250;
  const rings = [
    { r: 100, count: 3, speed: 0.0006 },
    { r: 160, count: 4, speed: -0.0004 },
    { r: 220, count: 3, speed: 0.0003 }
  ];
  
  let nodes = [];

  // Draw concentric helper rings
  rings.forEach((ring) => {
    const ringEl = document.createElementNS(svgNS, 'circle');
    ringEl.setAttribute('r', ring.r);
    ringEl.setAttribute('cx', cx);
    ringEl.setAttribute('cy', cy);
    ringEl.setAttribute('fill', 'none');
    ringEl.setAttribute('stroke', 'rgba(243, 241, 234, 0.05)');
    ringEl.setAttribute('stroke-width', '1');
    orbit.appendChild(ringEl);
    
    // Create orbiting nodes
    for (let i = 0; i < ring.count; i++) {
      const angle = (i / ring.count) * Math.PI * 2 + Math.random() * 0.5;
      
      // Create dot element
      const dot = document.createElementNS(svgNS, 'circle');
      const size = (i % 2 === 0) ? 4.5 : 2.5;
      dot.setAttribute('r', size);
      dot.setAttribute('fill', (i % 2 === 0) ? '#e6c27a' : '#6c4fe0');
      dot.style.filter = (i % 2 === 0) ? 'drop-shadow(0 0 4px rgba(230,194,122,0.6))' : 'drop-shadow(0 0 4px rgba(108,79,224,0.6))';
      
      orbit.appendChild(dot);
      
      nodes.push({
        r: ring.r,
        angle: angle,
        speed: ring.speed * (1 + Math.random() * 0.2),
        el: dot
      });
    }
  });

  // Center core star
  const centerStar = document.createElementNS(svgNS, 'circle');
  centerStar.setAttribute('cx', cx);
  centerStar.setAttribute('cy', cy);
  centerStar.setAttribute('r', 6);
  centerStar.setAttribute('fill', '#f3f1ea');
  centerStar.style.filter = 'drop-shadow(0 0 10px rgba(243,241,234,0.8))';
  orbit.appendChild(centerStar);

  // Parallax properties
  let targetParX = 0, targetParY = 0;
  let curParX = 0, curParY = 0;

  window.addEventListener('mousemove', (e) => {
    // Parallax relative to center
    targetParX = (e.clientX / window.innerWidth - 0.5) * 28;
    targetParY = (e.clientY / window.innerHeight - 0.5) * 28;
  });

  function animate() {
    nodes.forEach(n => {
      n.angle += n.speed;
      const x = cx + Math.cos(n.angle) * n.r;
      const y = cy + Math.sin(n.angle) * n.r;
      n.el.setAttribute('cx', x);
      n.el.setAttribute('cy', y);
    });

    // Smooth lerp parallax
    curParX += (targetParX - curParX) * 0.08;
    curParY += (targetParY - curParY) * 0.08;
    
    // Apply transform (translateY matches desktop CSS spacing)
    orbit.style.transform = `translateY(-50%) translate3d(${curParX}px, ${curParY}px, 0)`;
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// ---------- Project Mouse Follow Glows ----------
function initProjectGlows() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
}

// ---------- IntersectionObserver Scroll Reveal ----------
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ---------- Typewriter Effect ----------
function initTypewriter() {
  const heroSub = document.querySelector('.hero-sub');
  if (!heroSub) return;
  
  const text = heroSub.textContent.trim();
  heroSub.textContent = '';
  
  // Create cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  heroSub.appendChild(cursor);
  
  let i = 0;
  
  function type() {
    if (i < text.length) {
      cursor.insertAdjacentText('beforebegin', text.charAt(i));
      i++;
      // Natural typewriter speed variance (15ms - 35ms)
      const speed = Math.random() * 20 + 15;
      setTimeout(type, speed);
    } else {
      // Fade cursor out and then remove it
      setTimeout(() => {
        cursor.style.opacity = '0';
        setTimeout(() => cursor.remove(), 500);
      }, 1500);
    }
  }
  
  // Start typing when the element gets revealed on screen
  if (heroSub.classList.contains('in')) {
    setTimeout(type, 300);
  } else {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && heroSub.classList.contains('in')) {
          setTimeout(type, 300);
          observer.disconnect();
        }
      });
    });
    observer.observe(heroSub, { attributes: true });
  }
}

// ---------- Interactive Glassmorphic Contact Form ----------
function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (!form || !feedback) return;

  const CONTACT_EMAIL = 'royaltachofficial@gmail.com';
  const ENDPOINT = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('.cta-btn');
    const originalText = submitBtn.innerHTML;
    const val = (id) => (document.getElementById(id)?.value || '').trim();
    const typeSelect = document.getElementById('projectType');
    const typeLabel = typeSelect && typeSelect.selectedIndex >= 0 ? typeSelect.options[typeSelect.selectedIndex].text : '';

    // Hidden honeypot field: real visitors never fill it, bots usually do.
    if (form.querySelector('[name="_honey"]')?.value) return;

    feedback.className = 'form-feedback';
    feedback.textContent = 'Sending your message...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: val('name'),
          email: val('email'),
          project_type: typeLabel,
          message: val('message'),
          _subject: 'New project enquiry from Royaltach website — ' + val('name'),
          _replyto: val('email'),
          _template: 'table',
          _captcha: 'false'
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === 'false' || data.success === false) {
        throw new Error(data.message || 'Request failed');
      }
      feedback.classList.add('success');
      feedback.textContent = 'Message sent! Our team will contact you shortly.';
      form.reset();
    } catch (err) {
      console.error('Contact form error:', err);
      feedback.className = 'form-feedback error';
      feedback.innerHTML = 'Sorry, your message could not be sent. Please email us directly at <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      submitBtn.innerHTML = originalText;
    }
  });
}

// ---------- CEO Spotlight Tabs ----------
function initCeoTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  if (tabBtns.length === 0) return;
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      // Deactivate all buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      // Hide all panes
      tabPanes.forEach(p => p.classList.remove('active'));
      
      // Activate clicked button
      btn.classList.add('active');
      // Show corresponding pane
      const activePane = document.getElementById(`pane-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
      
      // Notify custom cursor that new hover targets might have appeared
      window.dispatchEvent(new Event('cursorRefresh'));
    });
  });
}

