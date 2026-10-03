/**
 * Maxxipluss Perfume - Header Navigation & Mobile Drawer Component
 */

import React, { useState } from 'react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="top-nav fixed top-0 left-0 right-0 z-40 bg-[rgba(12,6,3,0.85)] backdrop-blur-md border-b border-[rgba(212,175,55,0.12)] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="nav-brand-lockup flex items-center">
            <span className="nav-logo-mark font-serif text-xl sm:text-2xl tracking-[3px] font-bold text-[#f3e5d0]">
              MAXXIPLUSS
            </span>
          </a>

          <nav className="nav-links hidden md:flex items-center space-x-8">
            <a href="#catalog" className="nav-link text-xs tracking-[2px] uppercase text-[#a89278] hover:text-[#d4af37] transition-colors">KOLEKSI</a>
            <a href="#discovery-set" className="nav-link text-xs tracking-[2px] uppercase text-[#a89278] hover:text-[#d4af37] transition-colors">DISCOVERY SET</a>
            <a href="#scent-quiz" className="nav-link text-xs tracking-[2px] uppercase text-[#a89278] hover:text-[#d4af37] transition-colors">PANDUAN AROMA</a>
            <a href="#outlets" className="nav-link text-xs tracking-[2px] uppercase text-[#a89278] hover:text-[#d4af37] transition-colors">GERAI</a>
          </nav>

          <div className="nav-actions flex items-center space-x-3">
            <button
              onClick={onOpenCart}
              className="nav-cart-btn flex items-center gap-2 bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.3)] hover:border-[#d4af37] text-[#f3e5d0] px-4 py-2 rounded-full text-xs tracking-[1.5px] transition-all"
              aria-label="Buka Keranjang Pesanan"
            >
              <svg className="cart-btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="cart-btn-text font-medium hidden sm:inline">KERANJANG</span>
              <span className="cart-counter-badge bg-[#d4af37] text-[#120803] font-bold text-[10px] rounded-full px-2 py-0.5 min-w-[18px] text-center">
                {cartCount}
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="hamburger-btn md:hidden text-[#f3e5d0] hover:text-[#d4af37] p-2"
              aria-label="Buka Menu Navigasi Mobile"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Backdrop & Sliding Drawer */}
      {isMobileMenuOpen && (
        <>
          <div
            className="mobile-nav-backdrop active fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="mobile-nav-drawer active fixed top-0 right-0 bottom-0 w-[82vw] max-w-[320px] bg-[#0c0603] border-l border-[rgba(212,175,55,0.2)] z-50 p-6 flex flex-col justify-between">
            <div>
              <div className="mobile-nav-header flex justify-between items-center pb-4 border-b border-[rgba(212,175,55,0.15)] mb-6">
                <span className="nav-logo-mark font-serif text-lg tracking-[2px] font-bold text-[#f3e5d0]">
                  MAXXIPLUSS
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-close-btn text-[#a89278] hover:text-white"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <nav className="mobile-nav-links flex flex-col space-y-4">
                <a
                  href="#hero"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link text-sm font-serif tracking-[2px] uppercase text-[#f3e5d0] hover:text-[#d4af37]"
                >
                  BERANDA
                </a>
                <a
                  href="#catalog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link text-sm font-serif tracking-[2px] uppercase text-[#f3e5d0] hover:text-[#d4af37]"
                >
                  KOLEKSI LENGKAP
                </a>
                <a
                  href="#discovery-set"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link text-sm font-serif tracking-[2px] uppercase text-[#f3e5d0] hover:text-[#d4af37]"
                >
                  DISCOVERY SET
                </a>
                <a
                  href="#scent-quiz"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link text-sm font-serif tracking-[2px] uppercase text-[#f3e5d0] hover:text-[#d4af37]"
                >
                  PANDUAN AROMA
                </a>
                <a
                  href="#outlets"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mobile-nav-link text-sm font-serif tracking-[2px] uppercase text-[#f3e5d0] hover:text-[#d4af37]"
                >
                  GERAI RESMI
                </a>
              </nav>
            </div>

            <div className="mobile-nav-footer pt-4 border-t border-[rgba(212,175,55,0.15)] space-y-3">
              <div className="mobile-nav-meta text-[11px] text-[#a89278]">
                <div className="meta-label font-semibold text-[#d4af37]">PAINAN, SUMATERA BARAT</div>
                <div className="meta-desc text-[10px]">Ekstrak Rempah Alami & Cengkeh Pesisir</div>
              </div>
              <a
                href="https://wa.me/6282284033320"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-solid block text-center py-3 text-xs tracking-[1.5px] rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#120803] font-semibold"
              >
                KONSULTASI VIA WHATSAPP
              </a>
            </div>
          </aside>
        </>
      )}
    </>
  );
};
