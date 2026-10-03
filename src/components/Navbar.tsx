import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenQuiz: () => void;
  onOpenOutlets: () => void;
  onSelectKoleksi: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenQuiz,
  onOpenOutlets,
  onSelectKoleksi,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-20 w-full">
      <nav className="flex flex-row items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <a
          href="#"
          className="text-3xl tracking-tight text-foreground transition-opacity hover:opacity-90 select-none flex items-baseline gap-0.5"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span>Maxxipluss</span>
          <sup className="text-xs">®</sup>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#"
            className="text-sm text-foreground font-medium transition-colors"
          >
            Beranda
          </a>
          <button
            type="button"
            onClick={onSelectKoleksi}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Koleksi
          </button>
          <button
            type="button"
            onClick={onOpenQuiz}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Panduan Aroma
          </button>
          <button
            type="button"
            onClick={onOpenOutlets}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Filosofi
          </button>
          <button
            type="button"
            onClick={onOpenOutlets}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Gerai
          </button>
        </div>

        {/* Desktop Cart Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 cursor-pointer flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            <span>Keranjang</span>
            <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full font-medium">
              {cartCount}
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle & Mobile Cart */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={onOpenCart}
            className="liquid-glass rounded-full px-3.5 py-1.5 text-xs text-foreground flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{cartCount}</span>
          </button>

          <button
            type="button"
            className="text-foreground p-1 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu navigasi"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-8 pb-6 max-w-7xl mx-auto animate-fade-rise">
          <div className="liquid-glass rounded-2xl p-6 flex flex-col gap-4 border border-white/10 bg-[#00172c]/90">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-base text-foreground font-medium"
            >
              Beranda
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectKoleksi();
              }}
              className="text-left text-base text-muted-foreground hover:text-foreground"
            >
              Koleksi Parfum
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="text-left text-base text-muted-foreground hover:text-foreground"
            >
              Panduan Aroma (Scent Quiz)
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOutlets();
              }}
              className="text-left text-base text-muted-foreground hover:text-foreground"
            >
              Filosofi & Gerai Fisik
            </button>

            <div className="pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full liquid-glass rounded-full px-6 py-3 text-sm text-foreground text-center hover:scale-[1.02] cursor-pointer transition-transform flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buka Keranjang ({cartCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
