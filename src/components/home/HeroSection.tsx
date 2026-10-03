/**
 * Maxxipluss Perfume - HeroSection Component (Two-Column Desktop / Mobile Responsive Image-Top)
 */

import React from 'react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero-editorial relative min-h-screen pt-28 pb-16 px-6 sm:px-12 flex items-center justify-center border-b border-dashed border-[rgba(212,175,55,0.15)]">
      <div className="hero-two-column-layout motion-reveal max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* KOLOM KIRI (Text, Headline, Specs & Actions) - Order 2 on mobile, Order 1 on desktop */}
        <div className="hero-left-col md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <div className="hero-meta-tagline text-xs tracking-[2px] text-[#f3e5d0] mb-3 flex items-center gap-2 justify-center md:justify-start">
            <span>REMPAH ALAMI BOTANI</span>
            <span className="text-ember">— PAINAN, SUMATERA BARAT</span>
          </div>

          <h1 className="display-title hero-left-title font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#f3e5d0] leading-[1.08] mb-4">
            KEMEWAHAN AROMA REMPAH SEJATI.
          </h1>

          <p className="hero-subheading-desc font-serif text-lg sm:text-xl text-[#f3e5d0] opacity-95 leading-relaxed max-w-xl mb-6">
            Racikan rempah dan cengkeh alami khas Painan. Menghadirkan wewangian mewah berkarakter kuat yang bertahan hingga 24 jam.
          </p>

          {/* Specs Grid Ringkas */}
          <div className="hero-specs-list grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-lg mb-8 p-3 bg-[rgba(22,13,8,0.45)] rounded-xl border border-[rgba(212,175,55,0.12)]">
            <div className="spec-cell p-2 bg-[rgba(16,9,4,0.6)] rounded-lg text-center md:text-left">
              <div className="spec-label text-[9px] tracking-[1px] text-[#a89278]">METODE EKSTRAKSI</div>
              <div className="spec-val text-xs tracking-[1px] font-semibold text-[#f3e5d0]">MASERASI DINGIN</div>
            </div>
            <div className="spec-cell p-2 bg-[rgba(16,9,4,0.6)] rounded-lg text-center md:text-left">
              <div className="spec-label text-[9px] tracking-[1px] text-[#a89278]">KETAHANAN WANGI</div>
              <div className="spec-val text-xs tracking-[1px] font-semibold text-[#f3e5d0]">HINGGA 24 JAM</div>
            </div>
            <div className="spec-cell p-2 bg-[rgba(16,9,4,0.6)] rounded-lg text-center md:text-left">
              <div className="spec-label text-[9px] tracking-[1px] text-[#a89278]">NADA AROMA UTAMA</div>
              <div className="spec-val text-xs tracking-[1px] font-semibold text-[#f3e5d0]">CENGKEH SUMATERA</div>
            </div>
            <div className="spec-cell p-2 bg-[rgba(16,9,4,0.6)] rounded-lg text-center md:text-left">
              <div className="spec-label text-[9px] tracking-[1px] text-[#a89278]">JEJAK PROYEKSI</div>
              <div className="spec-val text-xs tracking-[1px] font-semibold text-[#f3e5d0]">SANGAT SEMERBAK</div>
            </div>
          </div>

          {/* Tombol Aksi Utama */}
          <div className="hero-action-buttons flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-6">
            <a href="#catalog" className="w-full sm:w-auto">
              <Button variant="solid" className="w-full">
                JELAJAHI KOLEKSI
              </Button>
            </a>
            <a href="#discovery-set" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                COBA DISCOVERY SET
              </Button>
            </a>
          </div>

          <div className="hero-footnote-line text-[10px] sm:text-xs tracking-[1.2px] text-[#a89278] pt-3 border-t border-dashed border-[rgba(212,175,55,0.15)] w-full max-w-lg">
            <span>KONSENTRAT BOTANI TERKURASI — 30ML · 50ML · 100ML</span>
          </div>
        </div>

        {/* KOLOM KANAN (Visual Botol Parfum + Ambient Glow) - Order 1 on mobile, Order 2 on desktop */}
        <div className="hero-right-col md:col-span-5 flex justify-center items-center relative order-1 md:order-2 mb-4 md:mb-0">
          <div className="hero-bottle-stage relative flex justify-center items-center w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px]">
            <div className="hero-ambient-glow absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-radial from-[rgba(212,175,55,0.28)] via-[rgba(220,80,0,0.14)] to-transparent blur-3xl pointer-events-none" />
            <img
              src="image/foto3.jpeg"
              alt="Maxxipluss Grand Heritage 24K Extrait"
              className="hero-bottle-img relative z-10 max-h-[300px] sm:max-h-[420px] md:max-h-[500px] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.85)] animate-pulse-subtle"
            />
            <div className="hero-bottle-badge absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-[rgba(16,9,4,0.88)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] px-3 py-1.5 rounded-lg z-20 flex flex-col text-right shadow-xl">
              <span className="badge-title text-[10px] font-semibold tracking-[1.5px] text-[#f3e5d0]">GRAND HERITAGE 24K</span>
              <span className="badge-sub text-[8px] tracking-[1.5px] text-[#d4af37]">EXTRAIT DE PARFUM</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
