import { productsData, scentQuizQuestions } from './data.js';
import { cart } from './cart.js';

// State
let currentCategoryFilter = 'all';
let currentSearchQuery = '';

// Varian terpilih per produk
const selectedVariants = {
  'mxp-royale-noir': '30ml',
  'mxp-velvet-blossom': '30ml',
  'mxp-grand-heritage': '30ml'
};

// State Kuis
let quizCurrentStep = 0;
let quizAnswers = [];

document.addEventListener('DOMContentLoaded', () => {
  initPerfumeAtmosphereCanvas();
  initDarkroomMotions();
  initScrollObserver();
  initNavbar();
  initProductDetailModal();
  initDiscoverySet();
  initCatalog();
  initScentQuiz();
  initCartDrawer();
  initCheckoutModal();

  // Dengarkan perubahan keranjang belanja
  cart.subscribe((items, total, count) => {
    updateCartUI(items, total, count);
  });
});

/* ========================================================
   0. ANIMASI LATAR BELAKANG REMPAH BOTANI PARFUM BERGERAK
   (Floating Cloves, Star Anise, Cinnamon Bark, Jasmine Petals)
   ======================================================== */
function initPerfumeAtmosphereCanvas() {
  const canvas = document.getElementById('perfume-ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, active: false, speedX: 0, speedY: 0 };
  let lastMouse = { x: width / 2, y: height / 2 };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    mouse.active = true;
    mouse.speedX = (e.clientX - lastMouse.x) * 0.15;
    mouse.speedY = (e.clientY - lastMouse.y) * 0.15;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    lastMouse.x = e.clientX;
    lastMouse.y = e.clientY;
  }, { passive: true });

  // Koleksi Jenis Rempah Bahan Dasar Parfum Maxxipluss (Cinnamon Sticks, Cloves, Resin Crystals, Leaves)
  const spiceTypes = ['cinnamon', 'clove', 'resin', 'leaf'];
  const spiceCount = 22; // Elemen rempah lebih tenang dan rapi agar fokus pada produk
  const spices = [];

  const palette = [
    { r: 215, g: 110, b: 50 },  // Cengkeh Pesisir / Ember Amber
    { r: 178, g: 96, b: 48 },   // Kulit Kayu Manis Tua (Cinnamon Bark)
    { r: 245, g: 185, b: 95 },  // Kristal Getah Resin Amber Emas (Resin Crystals)
    { r: 235, g: 155, b: 82 },  // Bunga Lawang Emas
    { r: 255, g: 215, b: 150 }, // Kilau Kristal Resin Berlian
    { r: 150, g: 78, b: 35 }    // Resin Benzoin Pekat
  ];

  for (let i = 0; i < spiceCount; i++) {
    spices.push({
      type: spiceTypes[i % spiceTypes.length],
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 12, // Ukuran rempah proporsional dan tidak mendominasi
      speedY: -(Math.random() * 0.35 + 0.14), // Melayang naik perlahan
      speedX: (Math.random() - 0.5) * 0.2,
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.008, // Berputar pelan alami
      wobbleSpeed: Math.random() * 0.015 + 0.004,
      wobbleAmp: Math.random() * 1.2 + 0.4,
      wobbleAngle: Math.random() * Math.PI * 2,
      color: palette[Math.floor(Math.random() * palette.length)],
      alpha: Math.random() * 0.12 + 0.05 // Transparan lembut agar fokus utama tetap pada botol parfum
    });
  }

  // 1. Menggambar Kuncup Cengkeh (Coastal Clove Bud)
  function drawClove(size, alpha, color) {
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    ctx.strokeStyle = `rgba(${color.r + 25}, ${color.g + 18}, ${color.b + 10}, ${alpha * 1.2})`;
    ctx.lineWidth = 1;

    // Batang Silinder Cengkeh (stalk)
    const w = size * 0.28;
    const h = size * 1.1;
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h * 0.05);
    ctx.lineTo(w / 2, -h * 0.05);
    ctx.lineTo(w * 0.32, h * 0.85);
    ctx.lineTo(-w * 0.32, h * 0.85);
    ctx.closePath();
    ctx.fill();

    // 4 Kelopak Gigi Calyx Mahkota (sepals)
    ctx.beginPath();
    ctx.moveTo(-size * 0.42, -size * 0.12);
    ctx.quadraticCurveTo(-size * 0.2, -size * 0.02, 0, -size * 0.08);
    ctx.quadraticCurveTo(size * 0.2, -size * 0.02, size * 0.42, -size * 0.12);
    ctx.lineTo(size * 0.28, -size * 0.32);
    ctx.lineTo(0, -size * 0.18);
    ctx.lineTo(-size * 0.28, -size * 0.32);
    ctx.closePath();
    ctx.fill();

    // Kepala Kuncup Cengkeh Bulat Lonjong (flower bud)
    ctx.beginPath();
    ctx.arc(0, -size * 0.38, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // 2. Menggambar Bunga Lawang / Bintang Adas (Star Anise)
  function drawStarAnise(size, alpha, color) {
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    ctx.strokeStyle = `rgba(${color.r + 30}, ${color.g + 20}, ${color.b + 10}, ${alpha * 1.1})`;
    ctx.lineWidth = 0.9;

    const points = 8;
    const outerR = size * 0.85;

    for (let i = 0; i < points; i++) {
      const a = (i * Math.PI * 2) / points;
      ctx.save();
      ctx.rotate(a);

      // Kelopak perahu bintang
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(size * 0.2, outerR * 0.45, 0, outerR);
      ctx.quadraticCurveTo(-size * 0.2, outerR * 0.45, 0, 0);
      ctx.fill();
      ctx.stroke();

      // Biji harum di ujung kelopak
      ctx.beginPath();
      ctx.arc(0, outerR * 0.55, size * 0.07, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 237, 215, ${alpha * 1.4})`;
      ctx.fill();

      ctx.restore();
    }

    // Titik pusat bunga lawang
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${Math.max(color.r - 25, 0)}, ${Math.max(color.g - 20, 0)}, ${Math.max(color.b - 15, 0)}, ${alpha * 1.3})`;
    ctx.fill();
  }

  // 3. Menggambar Batang Gulungan Kayu Manis (Cinnamon Bark Quill)
  function drawCinnamon(size, alpha, color) {
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    ctx.strokeStyle = `rgba(${color.r + 30}, ${color.g + 20}, ${color.b + 10}, ${alpha * 1.15})`;
    ctx.lineWidth = 1;

    const w = size * 0.42;
    const h = size * 1.35;

    // Tabung kulit kayu gulung
    ctx.beginPath();
    ctx.moveTo(-w / 2, -h / 2);
    ctx.lineTo(w / 2, -h / 2);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(-w / 2, h / 2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Gulungan melengkung di ujung atas (scroll curl)
    ctx.beginPath();
    ctx.ellipse(0, -h / 2, w / 2, w * 0.22, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${Math.max(color.r - 28, 0)}, ${Math.max(color.g - 22, 0)}, ${Math.max(color.b - 18, 0)}, ${alpha * 1.4})`;
    ctx.fill();
    ctx.stroke();

    // Serat longitudinal kayu manis
    ctx.beginPath();
    ctx.moveTo(-w * 0.2, -h * 0.35);
    ctx.lineTo(-w * 0.2, h * 0.35);
    ctx.moveTo(w * 0.18, -h * 0.3);
    ctx.lineTo(w * 0.18, h * 0.4);
    ctx.strokeStyle = `rgba(16, 9, 4, ${alpha * 0.7})`;
    ctx.stroke();
  }

  // 4. Menggambar Kristal Getah Resin Botani (Faceted Amber & Benzoin Resin Crystal)
  function drawResinCrystal(size, alpha, color) {
    // Bentuk faset kristal getah alami
    const vertices = [
      { x: 0, y: -size * 0.9 },
      { x: size * 0.72, y: -size * 0.35 },
      { x: size * 0.58, y: size * 0.65 },
      { x: 0, y: size * 0.88 },
      { x: -size * 0.62, y: size * 0.58 },
      { x: -size * 0.72, y: -size * 0.38 }
    ];

    // Poligon dasar kristal
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.9})`;
    ctx.fill();

    // Faset bidang kristal dalam yang membiaskan cahaya
    const centerPt = { x: size * 0.08, y: -size * 0.08 };
    for (let i = 0; i < vertices.length; i++) {
      const next = vertices[(i + 1) % vertices.length];
      ctx.beginPath();
      ctx.moveTo(centerPt.x, centerPt.y);
      ctx.lineTo(vertices[i].x, vertices[i].y);
      ctx.lineTo(next.x, next.y);
      ctx.closePath();

      const shade = (i % 2 === 0) ? 0.35 : -0.25;
      const fr = Math.min(Math.max(color.r + 40 * shade, 0), 255);
      const fg = Math.min(Math.max(color.g + 35 * shade, 0), 255);
      const fb = Math.min(Math.max(color.b + 20 * shade, 0), 255);

      ctx.fillStyle = `rgba(${fr}, ${fg}, ${fb}, ${alpha * 0.95})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(255, 237, 215, ${alpha * 0.75})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Kilau bias cahaya faset atas kristal
    ctx.beginPath();
    ctx.arc(vertices[0].x, vertices[0].y, size * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 245, 225, ${alpha * 1.5})`;
    ctx.fill();
  }

  // 5. Menggambar Kelopak Bunga Melati / Daun Botani (Jasmine Petal)
  function drawLeaf(size, alpha, color) {
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
    ctx.strokeStyle = `rgba(${color.r + 30}, ${color.g + 25}, ${color.b + 15}, ${alpha * 1.1})`;
    ctx.lineWidth = 0.9;

    ctx.beginPath();
    ctx.moveTo(0, -size * 0.85);
    ctx.quadraticCurveTo(size * 0.45, -size * 0.15, 0, size * 0.75);
    ctx.quadraticCurveTo(-size * 0.45, -size * 0.15, 0, -size * 0.85);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Urat daun melati tengah
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.65);
    ctx.quadraticCurveTo(size * 0.04, 0, 0, size * 0.6);
    ctx.strokeStyle = `rgba(${color.r + 35}, ${color.g + 30}, ${color.b + 15}, ${alpha * 0.85})`;
    ctx.stroke();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Redam angin hembusan kursor perlahan
    mouse.speedX *= 0.95;
    mouse.speedY *= 0.95;

    // Render Setiap Rempah-Rempah yang Melayang
    for (let i = 0; i < spices.length; i++) {
      const s = spices[i];

      // Gerak naik perlahan & mengayun horizontal lembut
      s.wobbleAngle += s.wobbleSpeed;
      s.angle += s.rotationSpeed;
      s.x += s.speedX + Math.sin(s.wobbleAngle) * s.wobbleAmp;
      s.y += s.speedY;

      // Respon interaktif hembusan saat kursor mendekati rempah
      if (mouse.active) {
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180 && dist > 0) {
          const force = (1 - dist / 180) * 1.6;
          s.x += (dx / dist) * force + mouse.speedX * 0.2;
          s.y += (dy / dist) * force + mouse.speedY * 0.2;
          s.angle += (dx > 0 ? 0.02 : -0.02);
        }
      }

      // Reset posisi saat mencapai puncak layar (muncul kembali dari bawah)
      if (s.y < -50) {
        s.y = height + 50;
        s.x = Math.random() * width;
      }
      if (s.x < -50) s.x = width + 50;
      if (s.x > width + 50) s.x = -50;

      // Gambar Rempah dengan Transformasi Koordinat (Posisi & Rotasi)
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.angle);

      if (s.type === 'cinnamon') {
        drawCinnamon(s.size, s.alpha, s.color);
      } else if (s.type === 'clove') {
        drawClove(s.size, s.alpha, s.color);
      } else if (s.type === 'resin') {
        drawResinCrystal(s.size, s.alpha, s.color);
      } else {
        drawLeaf(s.size, s.alpha, s.color);
      }

      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

/* ========================================================
   1. MOTIONS & DARKROOM INTERACTIVE ANIMATIONS
   ======================================================== */
function initDarkroomMotions() {
  // A. Darkroom Spotlight yang mengikuti kursor
  window.addEventListener('pointermove', (e) => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
  }, { passive: true });

  // B. 3D Tilt Interaktif pada Objek Botol Parfum
  const tiltContainers = document.querySelectorAll('.tilt-card, #hero-tilt-frame');
  tiltContainers.forEach(container => {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Hitung derajat kemiringan halus (-10deg s.d 10deg)
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      const img = container.querySelector('img');
      if (img) {
        img.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
      }
    });

    container.addEventListener('mouseleave', () => {
      const img = container.querySelector('img');
      if (img) {
        img.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      }
    });
  });
}

// C. Scroll-Triggered Stagger Motion Reveal (IntersectionObserver)
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.motion-reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }
}

/* ========================================================
   2. UTILITIES & SANITASI
   ======================================================== */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

function showToast(message) {
  let toast = document.getElementById('editorial-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'editorial-toast';
    toast.className = 'editorial-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function safeExternalRedirect(url) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ========================================================
   3. NAVIGASI (DESKTOP & MOBILE DRAWER)
   ======================================================== */
function initNavbar() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      links.forEach(l => l.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  const cartNavBtn = document.getElementById('btn-cart-nav');
  if (cartNavBtn) {
    cartNavBtn.addEventListener('click', openCartDrawer);
  }

  // Mobile Sliding Navigation Drawer
  const mobileMenuBtn = document.getElementById('btn-mobile-menu');
  const closeMobileMenuBtn = document.getElementById('btn-close-mobile-menu');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }
  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
  }
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/* ========================================================
   4. MODAL DETAIL BOTOL PRODUK (ANIMATED LUXURY CARD)
   ======================================================== */
function initProductDetailModal() {
  const backdrop = document.getElementById('product-detail-modal-backdrop');
  const closeBtn = document.getElementById('btn-close-product-detail');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeProductDetailModal);
  }
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeProductDetailModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductDetailModal();
    }
  });
}

function openProductDetailModal(productId) {
  const product = productsData.find(p => p.id === productId) || productsData[0];
  const backdrop = document.getElementById('product-detail-modal-backdrop');
  const content = document.getElementById('product-detail-card-content');
  if (!backdrop || !content) return;

  if (!selectedVariants[product.id]) {
    selectedVariants[product.id] = product.variants[0].size;
  }
  let currentSize = selectedVariants[product.id];
  let currentVariant = product.variants.find(v => v.size === currentSize) || product.variants[0];

  const topNotes = product.fragranceNotes.top.join(' · ');
  const heartNotes = product.fragranceNotes.heart.join(' · ');
  const baseNotes = product.fragranceNotes.base.join(' · ');

  content.innerHTML = `
    <div class="product-detail-layout">
      <!-- Kolom Kiri: Showcase Botol 3D Frame -->
      <div class="product-detail-visual-pane">
        <div class="detail-bottle-frame tilt-card" data-tilt>
          <div class="detail-bottle-ambient-glow" aria-hidden="true"></div>
          <span class="detail-floating-tier-badge">${escapeHTML(product.specs.concentration || 'EAU DE PARFUM')}</span>
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" class="detail-bottle-hero-img" draggable="false" />
        </div>
      </div>

      <!-- Kolom Kanan: Detail Lengkap & Kontrol Pembelian -->
      <div class="product-detail-narrative-pane">
        <div class="detail-meta-eyebrow">
          <span class="detail-category-badge">${escapeHTML(product.category)} — ${escapeHTML(product.gender)}</span>
          <span class="detail-longevity-badge">${escapeHTML(product.specs.longevity)}</span>
        </div>

        <h2 class="detail-product-name">${escapeHTML(product.name)}</h2>
        <div class="detail-product-subtitle">${escapeHTML(product.subtitle || product.specs.occasion)}</div>

        <p class="detail-product-desc">${escapeHTML(product.description)}</p>

        <!-- Piramida Nada Wewangian (Fragrance Pyramid) -->
        <div class="detail-pyramid-card">
          <div class="pyramid-row">
            <span class="pyramid-label">NADA AWAL (TOP NOTES — 00-15 MENIT)</span>
            <span class="pyramid-notes">${escapeHTML(topNotes)}</span>
          </div>
          <div class="pyramid-row">
            <span class="pyramid-label">NADA TENGAH (HEART NOTES — 01-04 JAM)</span>
            <span class="pyramid-notes">${escapeHTML(heartNotes)}</span>
          </div>
          <div class="pyramid-row">
            <span class="pyramid-label">NADA DASAR (BASE NOTES — 04-12 JAM)</span>
            <span class="pyramid-notes">${escapeHTML(baseNotes)}</span>
          </div>
        </div>

        <!-- Spesifikasi Detail (Sillage & Occasion) -->
        <div class="detail-specs-bar">
          <div class="detail-spec-item">
            <span class="spec-dim-label">JEJAK AROMA (SILLAGE)</span>
            <span class="spec-dim-val">${escapeHTML(product.specs.sillage)}</span>
          </div>
          <div class="detail-spec-item">
            <span class="spec-dim-label">JARAK PANCARAN</span>
            <span class="spec-dim-val">${escapeHTML(product.specs.projection)}</span>
          </div>
        </div>

        <!-- Pemilih Ukuran & Harga Dinamis -->
        <div class="detail-purchase-box">
          <div class="detail-size-header-row">
            <span class="variant-label">PILIH UKURAN BOTOL:</span>
            <div id="detail-modal-price" class="price-indicator">${cart.formatRupiah(currentVariant.price)}</div>
          </div>

          <div class="variant-selector-pills">
            ${product.variants.map(v => `
              <button
                type="button"
                class="variant-pill-btn ${v.size === currentSize ? 'active' : ''}"
                data-size="${escapeHTML(v.size)}"
              >
                ${escapeHTML(v.size.toUpperCase())}
              </button>
            `).join('')}
          </div>

          <div class="detail-modal-action-row">
            <button id="detail-modal-add-cart" class="btn-pill-solid" style="flex: 1.2; justify-content: center; gap: 8px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              MASUKKAN KERANJANG
            </button>
            <button id="detail-modal-direct-wa" class="btn-ghost-outline" style="flex: 1; justify-content: center;" title="Pesan langsung melalui WhatsApp Resmi">
              PESAN VIA WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach dynamic variant switcher inside modal
  const priceDisplay = content.querySelector('#detail-modal-price');
  const variantBtns = content.querySelectorAll('.variant-pill-btn');
  const addCartBtn = content.querySelector('#detail-modal-add-cart');
  const directWaBtn = content.querySelector('#detail-modal-direct-wa');

  variantBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      variantBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSize = btn.dataset.size;
      selectedVariants[product.id] = currentSize;
      currentVariant = product.variants.find(v => v.size === currentSize) || product.variants[0];
      if (priceDisplay) {
        priceDisplay.textContent = cart.formatRupiah(currentVariant.price);
      }
    });
  });

  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      cart.addItem(product, currentSize, 1);
      showToast(`${product.name.toUpperCase()} [${currentSize.toUpperCase()}] DITAMBAHKAN KE KERANJANG`);
      closeProductDetailModal();
      openCartDrawer();
    });
  }

  if (directWaBtn) {
    directWaBtn.addEventListener('click', () => {
      const v = product.variants.find(item => item.size === currentSize) || product.variants[0];
      const text = `Halo MAXXIPLUSS Perfume, saya ingin pesan varian:\n\n• Varian: ${product.name}\n• Ukuran Botol: ${currentSize.toUpperCase()}\n• Harga: ${cart.formatRupiah(v.price)}\n\nMohon info stok dan petunjuk pengiriman ke alamat saya ya. Terima kasih! 🙏`;
      safeExternalRedirect(`https://wa.me/6282284033320?text=${encodeURIComponent(text)}`);
    });
  }

  backdrop.style.display = 'flex';
  requestAnimationFrame(() => {
    backdrop.classList.add('active');
  });
  document.body.style.overflow = 'hidden';
}

function closeProductDetailModal() {
  const backdrop = document.getElementById('product-detail-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    setTimeout(() => {
      backdrop.style.display = 'none';
    }, 280);
    document.body.style.overflow = '';
  }
}

/* ========================================================
   4.5. MODUL DISCOVERY SET / BELI SAMPLE
   ======================================================== */
const DISCOVERY_OPTIONS = [
  {
    id: 'mxp-royale-noir',
    name: 'Royale Noir',
    fullName: 'Maxxipluss Royale Noir',
    family: 'Woody Spicy',
    notes: 'Kayu Manis Painan · Black Pepper · Cedarwood',
    tag: 'Best Seller Pria',
    color: '#d4652f'
  },
  {
    id: 'mxp-velvet-blossom',
    name: 'Velvet Blossom',
    fullName: 'Maxxipluss Velvet Blossom',
    family: 'Floral Sweet',
    notes: 'Melati Putih · Bourbon Vanilla · Red Pear',
    tag: 'Favorit Wanita',
    color: '#e28471'
  },
  {
    id: 'mxp-grand-heritage',
    name: 'Grand Heritage 24K',
    fullName: 'Maxxipluss Grand Heritage 24K',
    family: 'Warm Amber Oud',
    notes: 'Cengkeh Pesisir · Saffron Emas · Ambergris',
    tag: 'Extrait 24 Jam',
    color: '#d49a37'
  },
  {
    id: 'mxp-coastline-breeze',
    name: 'Coastline Breeze',
    fullName: 'Maxxipluss Coastline Breeze',
    family: 'Fresh Aquatic',
    notes: 'Garam Laut · Jeruk Purut · Daun Mint · Driftwood',
    tag: 'Rilis Terbaru',
    color: '#4fa3c7'
  },
  {
    id: 'mxp-sweet-serenade',
    name: 'Sweet Serenade',
    fullName: 'Maxxipluss Sweet Serenade',
    family: 'Floral Sweet Gourmand',
    notes: 'Caramel Praline · Mawar · Madu Hutan · Vanilla',
    tag: 'Favorit Baru',
    color: '#d47385'
  }
];

const DISCOVERY_TIERS = {
  trio: {
    key: 'trio',
    title: 'Trio Discovery Box (3 x 5ml)',
    maxCount: 3,
    price: 45000,
    voucher: 'BONUS VOUCHER RP 20.000 DIDALAM KOTAK',
    bonusText: '✓ Termasuk Voucher Belanja Rp 20.000 untuk Botol Besar',
    defaultScents: ['mxp-royale-noir', 'mxp-velvet-blossom', 'mxp-grand-heritage']
  },
  complete: {
    key: 'complete',
    title: 'All Variant Master Box (5 x 5ml)',
    maxCount: 5,
    price: 75000,
    voucher: 'GRATIS HARDBOX KOLEKTOR + VOUCHER RP 35.000',
    bonusText: '✓ Hemat Rp 25.000 + Voucher Belanja Rp 35.000 untuk Botol Besar',
    defaultScents: ['mxp-royale-noir', 'mxp-velvet-blossom', 'mxp-grand-heritage', 'mxp-coastline-breeze', 'mxp-sweet-serenade']
  }
};

let currentDiscoveryTier = 'trio';
let selectedDiscoveryScents = [...DISCOVERY_TIERS.trio.defaultScents];

function initDiscoverySet() {
  const container = document.getElementById('discovery-set');
  if (!container) return;

  const tabButtons = container.querySelectorAll('.discovery-tab-btn');
  const addCartBtn = document.getElementById('btn-add-discovery-cart');
  const buyWaBtn = document.getElementById('btn-buy-discovery-wa');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tierKey = btn.dataset.tier;
      if (tierKey === currentDiscoveryTier) return;

      currentDiscoveryTier = tierKey;
      tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tier === tierKey));

      const tier = DISCOVERY_TIERS[tierKey];
      if (tierKey === 'complete') {
        selectedDiscoveryScents = [...tier.defaultScents];
      } else {
        selectedDiscoveryScents = selectedDiscoveryScents
          .filter(id => DISCOVERY_OPTIONS.some(o => o.id === id))
          .slice(0, tier.maxCount);

        if (selectedDiscoveryScents.length < tier.maxCount) {
          tier.defaultScents.forEach(id => {
            if (selectedDiscoveryScents.length < tier.maxCount && !selectedDiscoveryScents.includes(id)) {
              selectedDiscoveryScents.push(id);
            }
          });
        }
      }

      renderDiscoveryUI();
    });
  });

  if (addCartBtn) {
    addCartBtn.addEventListener('click', () => {
      const tier = DISCOVERY_TIERS[currentDiscoveryTier];
      if (selectedDiscoveryScents.length === 0) {
        showToast('PILIH MINIMAL 1 VARIAN UNTUK DISCOVERY SET');
        return;
      }

      const chosenNames = selectedDiscoveryScents
        .map(id => DISCOVERY_OPTIONS.find(o => o.id === id)?.name || id)
        .join(' + ');

      const discoveryProduct = {
        id: `mxp-discovery-${currentDiscoveryTier}`,
        name: `Maxxipluss Discovery Box (${tier.maxCount} x 5ml)`,
        category: 'Discovery Set',
        image: 'image/foto1.jpeg',
        variants: [
          {
            size: `${selectedDiscoveryScents.length} Varian: ${chosenNames}`,
            price: tier.price
          }
        ]
      };

      cart.addItem(discoveryProduct, discoveryProduct.variants[0].size, 1);
      showToast(`DISCOVERY SET (${tier.maxCount}x5ml) DITAMBAHKAN KE KERANJANG!`);
      openCartDrawer();
    });
  }

  if (buyWaBtn) {
    buyWaBtn.addEventListener('click', () => {
      const tier = DISCOVERY_TIERS[currentDiscoveryTier];
      const chosenList = selectedDiscoveryScents
        .map((id, idx) => `   ${idx + 1}. ${DISCOVERY_OPTIONS.find(o => o.id === id)?.fullName || id} (5ml)`)
        .join('\n');

      const message = `Halo Admin MAXXIPLUSS, saya ingin memesan *Maxxipluss Discovery Set*:\n\n` +
        `📦 *Paket:* ${tier.title}\n` +
        `💰 *Harga:* ${cart.formatRupiah(tier.price)}\n\n` +
        `*Pilihan Aroma (5ml):*\n${chosenList}\n\n` +
        `🎁 *Benefit:* ${tier.voucher}\n\n` +
        `Mohon info ketersediaan stok & petunjuk pembayarannya ya. Terima kasih! 🙏`;

      safeExternalRedirect(`https://wa.me/6282284033320?text=${encodeURIComponent(message)}`);
    });
  }

  renderDiscoveryUI();
}

function renderDiscoveryUI() {
  selectedDiscoveryScents = selectedDiscoveryScents.filter(id => DISCOVERY_OPTIONS.some(o => o.id === id));
  const tier = DISCOVERY_TIERS[currentDiscoveryTier];
  const tray = document.getElementById('discovery-vials-tray');
  const scentGrid = document.getElementById('discovery-scent-grid');
  const counterBadge = document.getElementById('discovery-counter-badge');
  const totalPrice = document.getElementById('discovery-total-price');
  const bonusNote = document.getElementById('discovery-bonus-note');
  const voucherText = document.getElementById('discovery-voucher-text');

  if (counterBadge) {
    counterBadge.textContent = `${selectedDiscoveryScents.length} / ${tier.maxCount} Terpilih`;
  }

  if (totalPrice) {
    totalPrice.textContent = cart.formatRupiah(tier.price);
  }

  if (bonusNote) {
    bonusNote.textContent = tier.bonusText;
  }

  if (voucherText) {
    voucherText.textContent = tier.voucher;
  }

  // 1. Render Visual Vials di Kotak
  if (tray) {
    const selectedObjs = selectedDiscoveryScents
      .map(id => DISCOVERY_OPTIONS.find(o => o.id === id))
      .filter(Boolean);

    tray.innerHTML = selectedObjs.map((scent, i) => `
      <div class="discovery-vial-item" style="animation-delay: ${i * 0.25}s;">
        <div class="vial-spray-head"></div>
        <div class="vial-neck"></div>
        <div class="vial-glass-body">
          <div class="vial-liquid" style="background: linear-gradient(to top, ${scent.color} 0%, ${scent.color}aa 60%, ${scent.color}44 100%);">
            <div class="vial-label-band">5ML · MXP</div>
          </div>
        </div>
        <div class="vial-name-tag">${escapeHTML(scent.name)}</div>
      </div>
    `).join('');
  }

  // 2. Render Checkbox Chips Pilihan Varian Aroma
  if (scentGrid) {
    scentGrid.innerHTML = DISCOVERY_OPTIONS.map(opt => {
      const isSelected = selectedDiscoveryScents.includes(opt.id);
      return `
        <div class="discovery-scent-chip ${isSelected ? 'selected' : ''}" data-id="${opt.id}">
          <div class="scent-chip-left">
            <span class="scent-color-dot" style="background-color: ${opt.color}; color: ${opt.color};"></span>
            <div class="scent-info-text">
              <span class="scent-name-strong">${escapeHTML(opt.fullName)}</span>
              <span class="scent-notes-micro">${escapeHTML(opt.notes)}</span>
            </div>
          </div>
          <div class="scent-chip-right">
            <span class="scent-tag-badge">${escapeHTML(opt.tag)}</span>
            <div class="scent-check-circle">${isSelected ? '✓' : ''}</div>
          </div>
        </div>
      `;
    }).join('');

    scentGrid.querySelectorAll('.discovery-scent-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.id;
        const exists = selectedDiscoveryScents.includes(id);

        if (exists) {
          if (selectedDiscoveryScents.length <= 1) {
            showToast('MINIMAL 1 VARIAN HARUS DIPILIH');
            return;
          }
          selectedDiscoveryScents = selectedDiscoveryScents.filter(item => item !== id);
        } else {
          if (selectedDiscoveryScents.length >= tier.maxCount) {
            showToast(`MAKSIMAL ${tier.maxCount} VARIAN UNTUK ${tier.title.toUpperCase()}`);
            return;
          }
          selectedDiscoveryScents.push(id);
        }

        renderDiscoveryUI();
      });
    });
  }
}

/* ========================================================
   5. KATALOG ARSIP LENGKAP & PENCARIAN
   ======================================================== */
let isCarouselDragging = false;
let startDragX = 0;
let startScrollLeft = 0;
let dragMoved = false;

function initCatalog() {
  const searchInput = document.getElementById('catalog-search-input');
  const filterBtns = document.querySelectorAll('.filter-link-btn');
  const container = document.getElementById('editorial-catalog-grid');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderCatalogGrid();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategoryFilter = btn.dataset.filter || 'all';
      renderCatalogGrid();
    });
  });

  if (container) {
    // Scroll progress & dynamic pagination dots updater
    container.addEventListener('scroll', updateCatalogCarouselState, { passive: true });

    // Mouse Drag-to-Scroll Support
    container.addEventListener('mousedown', (e) => {
      if (e.target.closest('button, a, input')) return;
      isCarouselDragging = true;
      dragMoved = false;
      startDragX = e.pageX - container.offsetLeft;
      startScrollLeft = container.scrollLeft;
      container.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isCarouselDragging) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startDragX) * 1.5;
      if (Math.abs(walk) > 5) {
        dragMoved = true;
      }
      container.scrollLeft = startScrollLeft - walk;
    });

    window.addEventListener('mouseup', () => {
      if (isCarouselDragging) {
        isCarouselDragging = false;
        container.classList.remove('is-dragging');
      }
    });

    // Prevent navigation link triggering during dragging
    container.addEventListener('click', (e) => {
      if (dragMoved) {
        e.preventDefault();
        e.stopPropagation();
        dragMoved = false;
      }
    }, true);
  }

  renderCatalogGrid();
}

function updateCatalogCarouselState() {
  const container = document.getElementById('editorial-catalog-grid');
  const progressFill = document.getElementById('catalog-progress-fill');
  const dotsContainer = document.getElementById('catalog-pagination-dots');

  if (!container) return;

  const maxScroll = container.scrollWidth - container.clientWidth;
  const currentScroll = container.scrollLeft;
  const progress = maxScroll > 0 ? (currentScroll / maxScroll) : 0;
  
  if (progressFill) {
    const fillPercent = Math.min(100, Math.max(16, 16 + progress * 84));
    progressFill.style.width = `${fillPercent}%`;
  }

  // Update active pagination dot
  if (dotsContainer) {
    const cards = container.querySelectorAll('.editorial-card');
    if (cards.length > 0) {
      let activeIndex = 0;
      let minDistance = Infinity;
      const containerRect = container.getBoundingClientRect();

      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        const dist = Math.abs(cardRect.left - containerRect.left);
        if (dist < minDistance) {
          minDistance = dist;
          activeIndex = idx;
        }
      });

      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeIndex);
      });
    }
  }
}

function renderCatalogGrid() {
  const container = document.getElementById('editorial-catalog-grid');
  const dotsContainer = document.getElementById('catalog-pagination-dots');
  if (!container) return;

  const filtered = productsData.filter(prod => {
    const matchCategory =
      currentCategoryFilter === 'all' ||
      prod.gender.toLowerCase() === currentCategoryFilter.toLowerCase() ||
      prod.category.toLowerCase().includes(currentCategoryFilter.toLowerCase());

    const query = currentSearchQuery.toLowerCase().trim();
    const matchSearch =
      !query ||
      prod.name.toLowerCase().includes(query) ||
      prod.description.toLowerCase().includes(query) ||
      prod.fragranceNotes.top.some(n => n.toLowerCase().includes(query)) ||
      prod.fragranceNotes.heart.some(n => n.toLowerCase().includes(query)) ||
      prod.fragranceNotes.base.some(n => n.toLowerCase().includes(query));

    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="flex: 1; padding: 50px 20px; border: 1px dashed rgba(212, 175, 55, 0.2); border-radius: 14px; text-align: center; width: 100%;">
        <span class="label-caps" style="color: var(--color-driftwood); font-size: 12px; letter-spacing: 2px;">TIDAK ADA HASIL AROMA YANG COCOK DI KOLEKSI</span>
      </div>
    `;
    if (dotsContainer) dotsContainer.innerHTML = '';
    return;
  }

  container.innerHTML = filtered.map(product => {
    const basePrice = product.variants[0].price;
    const availableSizes = product.variants.map(v => v.size).join(' · ');
    const topNotes = product.fragranceNotes.top.slice(0, 2).join(', ');
    const heartNotes = product.fragranceNotes.heart.slice(0, 2).join(', ');
    const baseNotes = product.fragranceNotes.base.slice(0, 2).join(', ');

    return `
      <article class="editorial-card" data-product-id="${product.id}">
        <div class="card-img-wrap">
          <div class="card-ambient-aura" aria-hidden="true"></div>
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy" draggable="false" />
          <span class="card-floating-badge">${escapeHTML(product.tag || product.category)}</span>
        </div>
        
        <div class="card-content-wrap">
          <div class="card-meta-line">
            <span class="card-category-label">${escapeHTML(product.category)}</span>
            <span class="card-longevity-marker text-ember">${escapeHTML(product.specs.longevity)}</span>
          </div>

          <h3 class="card-title-text">${escapeHTML(product.name)}</h3>
          <p class="card-desc-text">${escapeHTML(product.description)}</p>
          
          <div class="card-notes-editorial">
            <div class="note-line">
              <span class="note-type">NADA:</span>
              <span class="note-content">${escapeHTML(topNotes)} · ${escapeHTML(heartNotes)} · ${escapeHTML(baseNotes)}</span>
            </div>
            <div class="note-line volume-line">
              <span class="note-type">BOTOL:</span>
              <span class="note-content">${escapeHTML(availableSizes)}</span>
            </div>
          </div>

          <div class="card-actions-row">
            <div class="card-pricing-block">
              <span class="price-eyebrow">MULAI DARI</span>
              <span class="price-val-highlight">${cart.formatRupiah(basePrice)}</span>
            </div>
            <button type="button" class="card-editorial-btn btn-open-detail" data-product-id="${product.id}" title="Pesan ${escapeHTML(product.name)}">
              <span>PESAN</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Attach click events to open product detail modal
  container.querySelectorAll('.editorial-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // If user dragged carousel, don't trigger modal
      if (dragMoved) return;
      const productId = card.dataset.productId;
      if (productId) {
        openProductDetailModal(productId);
      }
    });
  });

  // Reset scroll to start
  container.scrollLeft = 0;
  requestAnimationFrame(updateCatalogCarouselState);
}

/* ========================================================
   6. KUIS PANDUAN AROMA INTERAKTIF
   ======================================================== */
function initScentQuiz() {
  renderQuizStep();
}

function renderQuizStep() {
  const container = document.getElementById('quiz-dynamic-box');
  const resultBox = document.getElementById('quiz-result-editorial');
  const tick1 = document.getElementById('tick-1');
  const tick2 = document.getElementById('tick-2');
  const tick3 = document.getElementById('tick-3');

  if (tick1 && tick2 && tick3) {
    tick1.className = quizCurrentStep >= 0 ? 'step-tick active' : 'step-tick';
    tick2.className = quizCurrentStep >= 1 ? 'step-tick active' : 'step-tick';
    tick3.className = quizCurrentStep >= 2 ? 'step-tick active' : 'step-tick';
  }

  if (quizCurrentStep >= scentQuizQuestions.length) {
    renderQuizResult();
    return;
  }

  const question = scentQuizQuestions[quizCurrentStep];
  if (container && resultBox) {
    container.style.display = 'block';
    resultBox.style.display = 'none';

    container.innerHTML = `
      <div style="font-size: 11px; color: var(--color-driftwood); letter-spacing: 1.5px; margin-bottom: 8px;">
        PERTANYAAN 0${quizCurrentStep + 1} DARI 03
      </div>
      <h3 style="font-size: 22px; color: var(--color-warm-cream); margin-bottom: 24px; line-height: 1.1;">
        ${escapeHTML(question.title)}
      </h3>

      <div>
        ${question.options.map((opt, idx) => `
          <div class="quiz-option-strip" data-idx="${idx}">
            <span class="opt-title">${escapeHTML(opt.text)}</span>
          </div>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.quiz-option-strip').forEach(strip => {
      strip.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        quizAnswers[quizCurrentStep] = question.options[idx];
        quizCurrentStep++;
        renderQuizStep();
      });
    });
  }
}

function renderQuizResult() {
  const container = document.getElementById('quiz-dynamic-box');
  const resultBox = document.getElementById('quiz-result-editorial');
  if (container) container.style.display = 'none';
  if (!resultBox) return;

  const ansVibe = quizAnswers[0]?.preference || 'Woody Spicy';
  const ansGender = quizAnswers[1]?.gender || 'Pria';

  let match = productsData.find(p => p.gender === ansGender && p.category.includes(ansVibe));
  if (!match) {
    match = productsData.find(p => p.gender === ansGender) || productsData[0];
  }

  resultBox.style.display = 'block';
  resultBox.innerHTML = `
    <div style="font-size: 11px; color: var(--color-ember-accent); letter-spacing: 1.5px; margin-bottom: 8px;">
      REKOMENDASI TERKONFIRMASI — IDENTITAS AROMA ANDA
    </div>
    <h3 style="font-size: 32px; line-height: 0.95; color: var(--color-warm-cream); margin-bottom: 12px;">
      ${escapeHTML(match.name)}
    </h3>
    <p class="editorial-body" style="font-size: 16px; margin-bottom: 20px;">
      ${escapeHTML(match.description)}
    </p>

    <div style="display: flex; gap: 14px; align-items: center; flex-wrap: wrap;">
      <button type="button" class="btn-pill-solid quiz-order-btn" data-product-id="${match.id}" style="font-size: 11px; padding: 10px 20px; cursor: pointer;">
        PESAN VARIAN INI
      </button>
      <button type="button" class="btn-ghost-outline" id="quiz-reset-btn" style="font-size: 11px; padding: 10px 18px; cursor: pointer;">
        ULANGI KUIS
      </button>
    </div>
  `;

  const orderBtn = resultBox.querySelector('.quiz-order-btn');
  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      openProductDetailModal(match.id);
    });
  }

  resultBox.querySelector('#quiz-reset-btn').addEventListener('click', () => {
    quizCurrentStep = 0;
    quizAnswers = [];
    renderQuizStep();
  });
}

/* ========================================================
   7. SLIDE-OVER DRAWER KERANJANG
   ======================================================== */
function initCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const panel = document.getElementById('cart-drawer-panel');
  const closeBtn = document.getElementById('cart-drawer-close');
  const checkoutBtn = document.getElementById('cart-checkout-trigger');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeCartDrawer);
  }
  if (overlay) {
    overlay.addEventListener('click', closeCartDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
    }
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.getCount() === 0) {
        showToast('KERANJANG PESANAN MASIH KOSONG');
        return;
      }
      closeCartDrawer();
      openCheckoutModal();
    });
  }
}

function openCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const panel = document.getElementById('cart-drawer-panel');
  if (overlay && panel) {
    overlay.classList.add('active');
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('cart-drawer-overlay');
  const panel = document.getElementById('cart-drawer-panel');
  if (overlay && panel) {
    overlay.classList.remove('active');
    panel.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function updateCartUI(items, total, count) {
  document.querySelectorAll('.cart-counter-badge').forEach(badge => {
    badge.textContent = count;
  });

  const cartList = document.getElementById('cart-drawer-items');
  const subtotalVal = document.getElementById('cart-subtotal-val');
  const checkoutBtn = document.getElementById('cart-checkout-trigger');

  if (subtotalVal) {
    subtotalVal.textContent = cart.formatRupiah(total);
  }

  if (checkoutBtn) {
    checkoutBtn.disabled = items.length === 0;
    checkoutBtn.style.opacity = items.length === 0 ? '0.4' : '1';
  }

  if (!cartList) return;

  if (items.length === 0) {
    cartList.innerHTML = `
      <div style="padding: 60px 0; text-align: center; color: var(--color-driftwood);">
        <div style="font-size: 11px; letter-spacing: 1.5px; margin-bottom: 8px;">ARSIP PESANAN KOSONG</div>
        <div style="font-size: 13px;">Belum ada varian parfum yang dipilih ke keranjang.</div>
      </div>
    `;
    return;
  }

  cartList.innerHTML = items.map(item => `
    <div class="cart-editorial-item">
      <img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" class="cart-item-thumb">
      <div style="flex: 1;">
        <div style="font-size: 14px; font-weight: 500; color: var(--color-warm-cream);">${escapeHTML(item.name)}</div>
        <div style="font-size: 11px; color: var(--color-driftwood); margin: 2px 0 6px;">UKURAN: ${escapeHTML(item.size)}</div>
        <div style="font-size: 13px; color: var(--color-warm-cream);">${cart.formatRupiah(item.price)}</div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 8px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="cart-qty-btn cart-dec" data-key="${item.itemKey}" style="background: none; border: 1px solid var(--color-cork-border); color: var(--color-warm-cream); width: 22px; height: 22px; cursor: pointer;">-</button>
            <span style="font-size: 12px;">${item.quantity}</span>
            <button class="cart-qty-btn cart-inc" data-key="${item.itemKey}" style="background: none; border: 1px solid var(--color-cork-border); color: var(--color-warm-cream); width: 22px; height: 22px; cursor: pointer;">+</button>
          </div>
          <button class="cart-remove-item" data-key="${item.itemKey}" style="background: none; border: none; color: var(--color-driftwood); font-size: 10px; cursor: pointer; text-transform: uppercase;">
            HAPUS
          </button>
        </div>
      </div>
    </div>
  `).join('');

  cartList.querySelectorAll('.cart-dec').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cart.updateQuantity(e.currentTarget.dataset.key, -1);
    });
  });

  cartList.querySelectorAll('.cart-inc').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cart.updateQuantity(e.currentTarget.dataset.key, 1);
    });
  });

  cartList.querySelectorAll('.cart-remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      cart.removeItem(e.currentTarget.dataset.key);
      showToast('ITEM DIHAPUS DARI KERANJANG');
    });
  });
}

/* ========================================================
   8. MODAL FORMULIR PEMESANAN (Underline Only Inputs)
   ======================================================== */
function initCheckoutModal() {
  const modal = document.getElementById('modal-checkout-backdrop');
  const closeBtn = document.getElementById('modal-checkout-close');
  const form = document.getElementById('checkout-form');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const customer = {
        name: document.getElementById('cust-name').value.trim(),
        phone: document.getElementById('cust-phone').value.trim(),
        address: document.getElementById('cust-address').value.trim(),
        courier: document.getElementById('cust-courier').value,
        notes: document.getElementById('cust-notes').value.trim()
      };

      if (!customer.name || !customer.phone || !customer.address) {
        showToast('MOHON LENGKAPI NAMA, NO. WA & ALAMAT LENGKAP');
        return;
      }

      const waUrl = cart.generateWhatsAppUrl(customer);
      showToast('MENGALIHKAN KE WHATSAPP RESMI...');
      setTimeout(() => {
        safeExternalRedirect(waUrl);
        modal.classList.remove('active');
      }, 400);
    });
  }
}

function openCheckoutModal() {
  const modal = document.getElementById('modal-checkout-backdrop');
  const summaryBox = document.getElementById('checkout-items-summary');

  if (summaryBox) {
    const items = cart.items;
    summaryBox.innerHTML = `
      <div style="font-size: 11px; color: var(--color-driftwood); letter-spacing: 1px; margin-bottom: 8px;">
        RINCIAN PESANAN (${cart.getCount()} BOTOL):
      </div>
      ${items.map(item => `
        <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
          <span>${escapeHTML(item.name)} [${item.size}] x ${item.quantity}</span>
          <span>${cart.formatRupiah(item.price * item.quantity)}</span>
        </div>
      `).join('')}
      <div style="border-top: 1px dashed var(--color-cork-border); margin-top: 8px; padding-top: 8px; display: flex; justify-content: space-between; font-size: 14px; font-weight: 500;">
        <span>TOTAL BELANJA:</span>
        <span>${cart.formatRupiah(cart.getTotal())}</span>
      </div>
    `;
  }

  if (modal) {
    modal.classList.add('active');
  }
}
