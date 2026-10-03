/**
 * Maxxipluss Perfume - Main Entry Point App.tsx
 * Senior Lead Full-Stack Engineer & UI/UX Architecture
 */

import React, { useState, useEffect, useRef } from 'react';
import { productsData } from './data/products';
import { Product, CartItem, CustomerCheckoutInfo } from './types';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { Catalog } from './components/home/Catalog';
import { DiscoverySet } from './components/home/DiscoverySet';
import { ScentPyramid } from './components/home/ScentPyramid';
import { OutletSection } from './components/home/OutletSection';
import { CartDrawer } from './components/ui/CartDrawer';
import { CheckoutModal } from './components/ui/CheckoutModal';
import { ProductDetailModal } from './components/ui/ProductDetailModal';
import './components/ui/CustomScrollbar.css';

const CART_STORAGE_KEY = 'maxxipluss_cart_v1';

export const App: React.FC = () => {
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // UI Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Save Cart to LocalStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Gagal menyimpan keranjang:", e);
    }
  }, [cartItems]);

  // Cart Calculations
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Format Currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Cart Handlers
  const handleAddToCart = (product: any, variantSize: string, quantity = 1) => {
    const selectedVariant = product.variants?.find((v: any) => v.size === variantSize) || product.variants?.[0] || {
      size: variantSize,
      price: product.price || 35000
    };
    const itemKey = `${product.id}-${selectedVariant.size}`;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          itemKey,
          id: product.id,
          name: product.name,
          size: selectedVariant.size,
          price: selectedVariant.price,
          image: product.image,
          category: product.category || 'Parfum',
          quantity
        }
      ];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemKey: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.itemKey === itemKey) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (itemKey: string) => {
    setCartItems(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  // WhatsApp Checkout Trigger
  const handleConfirmCheckout = (customer: CustomerCheckoutInfo) => {
    const adminPhone = "6282284033320";
    const dateStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    let text = `✨ *PESANAN BARU - MAXXIPLUSS PERFUME* ✨\n`;
    text += `Tanggal: ${dateStr}\n`;
    text += `===================================\n\n`;

    text += `👤 *DATA PELANGGAN:*\n`;
    text += `• Nama: ${customer.name || '-'}\n`;
    text += `• No. WhatsApp: ${customer.phone || '-'}\n`;
    text += `• Alamat Kirim: ${customer.address || '-'}\n`;
    text += `• Opsi Pengiriman: ${customer.courier || 'J&T / Sicepat'}\n`;
    if (customer.notes) {
      text += `• Catatan Khusus: ${customer.notes}\n`;
    }
    text += `\n📦 *RINCIAN PRODUK:*\n`;

    cartItems.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n`;
      text += `   Ukuran: ${item.size}\n`;
      text += `   Jumlah: ${item.quantity} botol x ${formatRupiah(item.price)}\n`;
      text += `   Subtotal: ${formatRupiah(item.price * item.quantity)}\n\n`;
    });

    text += `===================================\n`;
    text += `💰 *TOTAL PESANAN: ${formatRupiah(cartTotal)}*\n`;
    text += `🎁 *Promo:* Free Tester Mini Vial (Selama Persediaan Ada)\n\n`;
    text += `Halo admin MAXXIPLUSS, mohon konfirmasi ketersediaan stok dan total pembayaran beserta ongkir ya. Terima kasih! 🙏`;

    window.open(`https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`, '_blank');
    setIsCheckoutOpen(false);
  };

  // Canvas Ambient Particle Background Effect
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 0.4 + 0.1),
      alpha: Math.random() * 0.3 + 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y += p.speedY;
        if (p.y < -10) p.y = height + 10;

        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0603] text-[#f3e5d0] font-sans antialiased selection:bg-[#d4af37] selection:text-[#120803] relative overflow-x-hidden">
      {/* Background Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-60"
        aria-hidden="true"
      />

      {/* Main Navigation */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection />
        <Catalog
          products={productsData}
          onOpenDetail={(prod) => setSelectedProduct(prod)}
          formatRupiah={formatRupiah}
        />
        <DiscoverySet
          onAddToCart={handleAddToCart}
          formatRupiah={formatRupiah}
        />
        <ScentPyramid
          onOpenDetail={(prod) => setSelectedProduct(prod)}
        />
        <OutletSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        formatRupiah={formatRupiah}
      />

      {/* WhatsApp Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        total={cartTotal}
        formatRupiah={formatRupiah}
        onConfirmCheckout={handleConfirmCheckout}
      />

      {/* Product Detail Bottle Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        formatRupiah={formatRupiah}
      />
    </div>
  );
};

export default App;
