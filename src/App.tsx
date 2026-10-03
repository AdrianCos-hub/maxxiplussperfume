import React, { useState, useEffect, useRef } from 'react';
import { productsData as _productsData } from './data/products';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { Catalog } from './components/home/Catalog';
import { DiscoverySet } from './components/home/DiscoverySet';
import { OutletSection } from './components/home/OutletSection';
import { CartDrawer } from './components/ui/CartDrawer';
import { CheckoutModal } from './components/ui/CheckoutModal';
import { ProductDetailModal } from './components/ui/ProductDetailModal';
import { PerfumeProduct, CartItem, Variant } from './types';

/**
 * Interface representing a floating botanical perfume spice element
 */
interface BotanicalSpice {
  type: 'cinnamon' | 'clove' | 'resin' | 'starAnise';
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  rotationSpeed: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  wobbleAngle: number;
  color: { r: number; g: number; b: number };
  alpha: number;
}

export const SpiceAtmosphereCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, active: false, speedX: 0, speedY: 0 };
    const lastMouse = { x: width / 2, y: height / 2 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.active = true;
      mouse.speedX = (e.clientX - lastMouse.x) * 0.15;
      mouse.speedY = (e.clientY - lastMouse.y) * 0.15;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMouse.x = e.clientX;
      lastMouse.y = e.clientY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const spiceTypes: BotanicalSpice['type'][] = ['cinnamon', 'clove', 'resin', 'starAnise'];
    const spiceCount = 22;
    const spices: BotanicalSpice[] = [];

    const palette = [
      { r: 215, g: 110, b: 50 },
      { r: 178, g: 96, b: 48 },
      { r: 245, g: 185, b: 95 },
      { r: 235, g: 155, b: 82 },
      { r: 255, g: 215, b: 150 },
      { r: 150, g: 78, b: 35 }
    ];

    for (let i = 0; i < spiceCount; i++) {
      spices.push({
        type: spiceTypes[i % spiceTypes.length],
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 12,
        speedY: -(Math.random() * 0.35 + 0.14),
        speedX: (Math.random() - 0.5) * 0.2,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        wobbleSpeed: Math.random() * 0.015 + 0.004,
        wobbleAmp: Math.random() * 1.2 + 0.4,
        wobbleAngle: Math.random() * Math.PI * 2,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.12 + 0.05
      });
    }

    const drawCinnamon = (size: number, alpha: number, color: { r: number; g: number; b: number }) => {
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
      ctx.strokeStyle = `rgba(${color.r + 30}, ${color.g + 20}, ${color.b + 10}, ${alpha * 1.15})`;
      ctx.lineWidth = 1;

      const w = size * 0.42;
      const h = size * 1.35;

      ctx.beginPath();
      ctx.moveTo(-w / 2, -h / 2);
      ctx.lineTo(w / 2, -h / 2);
      ctx.lineTo(w / 2, h / 2);
      ctx.lineTo(-w / 2, h / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const drawClove = (size: number, alpha: number, color: { r: number; g: number; b: number }) => {
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
      ctx.strokeStyle = `rgba(${color.r + 25}, ${color.g + 18}, ${color.b + 10}, ${alpha * 1.2})`;
      ctx.lineWidth = 1;

      const w = size * 0.28;
      const h = size * 1.1;
      ctx.beginPath();
      ctx.moveTo(-w / 2, -h * 0.05);
      ctx.lineTo(w / 2, -h * 0.05);
      ctx.lineTo(w * 0.32, h * 0.85);
      ctx.lineTo(-w * 0.32, h * 0.85);
      ctx.closePath();
      ctx.fill();
    };

    const drawResinCrystal = (size: number, alpha: number, color: { r: number; g: number; b: number }) => {
      const vertices = [
        { x: 0, y: -size * 0.9 },
        { x: size * 0.72, y: -size * 0.35 },
        { x: size * 0.58, y: size * 0.65 },
        { x: 0, y: size * 0.88 },
        { x: -size * 0.62, y: size * 0.58 },
        { x: -size * 0.72, y: -size * 0.38 }
      ];

      ctx.beginPath();
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.9})`;
      ctx.fill();
    };

    const drawStarAnise = (size: number, alpha: number, color: { r: number; g: number; b: number }) => {
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
      ctx.strokeStyle = `rgba(${color.r + 30}, ${color.g + 20}, ${color.b + 10}, ${alpha * 1.1})`;
      ctx.lineWidth = 0.9;

      const points = 8;
      const outerR = size * 0.85;

      for (let i = 0; i < points; i++) {
        const a = (i * Math.PI * 2) / points;
        ctx.save();
        ctx.rotate(a);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size * 0.2, outerR * 0.45, 0, outerR);
        ctx.quadraticCurveTo(-size * 0.2, outerR * 0.45, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    };

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < spices.length; i++) {
        const s = spices[i];
        s.wobbleAngle += s.wobbleSpeed;
        s.angle += s.rotationSpeed;
        s.x += s.speedX + Math.sin(s.wobbleAngle) * s.wobbleAmp;
        s.y += s.speedY;

        if (s.y < -50) s.y = height + 50;
        if (s.x < -50) s.x = width + 50;
        if (s.x > width + 50) s.x = -50;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        if (s.type === 'cinnamon') drawCinnamon(s.size, s.alpha, s.color);
        else if (s.type === 'clove') drawClove(s.size, s.alpha, s.color);
        else if (s.type === 'resin') drawResinCrystal(s.size, s.alpha, s.color);
        else drawStarAnise(s.size, s.alpha, s.color);

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="perfume-ambient-canvas"
      className="perfume-ambient-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.92
      }}
    />
  );
};

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PerfumeProduct | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('maxxipluss_cart_v1');
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch {
      // fallback
    }

    const handleCartChanged = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail?.items) {
        setCartItems(customEv.detail.items);
      }
    };

    window.addEventListener('cart-changed', handleCartChanged);
    return () => window.removeEventListener('cart-changed', handleCartChanged);
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleAddToCart = (product: PerfumeProduct, variant: Variant, quantity: number) => {
    const cartKey = `${product.id}-${variant.size}`;
    const existingIndex = cartItems.findIndex(it => it.cartKey === cartKey);
    let updated: CartItem[];

    if (existingIndex > -1) {
      updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
    } else {
      updated = [
        ...cartItems,
        {
          cartKey,
          id: product.id,
          name: product.name,
          size: variant.size,
          price: variant.price,
          image: product.image,
          category: product.category,
          quantity,
        },
      ];
    }

    setCartItems(updated);
    try {
      localStorage.setItem('maxxipluss_cart_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (cartKey: string, delta: number) => {
    const updated = cartItems
      .map(item => {
        if (item.cartKey === cartKey) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    setCartItems(updated);
    try {
      localStorage.setItem('maxxipluss_cart_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleRemoveItem = (cartKey: string) => {
    const updated = cartItems.filter(item => item.cartKey !== cartKey);
    setCartItems(updated);
    try {
      localStorage.setItem('maxxipluss_cart_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#001122] text-white relative">
      <SpiceAtmosphereCanvas />

      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQuiz={() => scrollToSection('discovery-set')}
        onOpenOutlets={() => scrollToSection('outlets')}
        onSelectKoleksi={() => scrollToSection('catalog')}
      />

      <main className="relative z-10 space-y-12">
        <HeroSection
          onOpenProductModal={(p) => setSelectedProduct(p)}
          onOpenQuiz={() => scrollToSection('discovery-set')}
        />

        <Catalog
          onOpenProductModal={(p) => setSelectedProduct(p)}
          onQuickAdd={(p) => handleAddToCart(p, p.variants[0], 1)}
        />

        <DiscoverySet />

        <OutletSection />
      </main>

      <Footer
        onOpenOutlets={() => scrollToSection('outlets')}
        onOpenQuiz={() => scrollToSection('discovery-set')}
        onSelectKoleksi={() => scrollToSection('catalog')}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
