import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PerfumeProduct } from '../types';
import { perfumes, formatRupiah } from '../data/perfumes';

interface HeroSectionProps {
  onOpenProductModal: (product: PerfumeProduct) => void;
  onOpenQuiz: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenProductModal,
  onOpenQuiz,
}) => {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 sm:pt-32 sm:pb-36 max-w-7xl mx-auto w-full my-auto">
      {/* Origin Pill Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass text-xs uppercase tracking-widest text-muted-foreground mb-8 animate-fade-rise">
        <Sparkles className="w-3.5 h-3.5 text-white" />
        <span>Rempah Botani Murni • Painan, Sumatera Barat</span>
      </div>

      {/* Cinematic H1 */}
      <h1
        className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground animate-fade-rise select-none"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Di mana <em className="not-italic text-muted-foreground">aroma abadi</em> bangkit{' '}
        <em className="not-italic text-muted-foreground">melalui heningnya alam.</em>
      </h1>

      {/* Subtext */}
      <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
        Kami meracik wewangian botani konsentrat tinggi dari kayu manis asli, cengkeh pesisir selatan,
        dan vanila nusantara. Di tengah riuhnya dunia, kami hadirkan ruang ketenangan dan kemewahan aroma
        yang bertahan hingga 24 jam.
      </p>

      {/* Hero CTA Button */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 animate-fade-rise-delay-2">
        <button
          type="button"
          onClick={() => onOpenProductModal(perfumes[0])}
          className="liquid-glass rounded-full px-12 sm:px-14 py-4 sm:py-5 text-base text-foreground hover:scale-[1.03] cursor-pointer transition-transform select-none font-medium flex items-center gap-2"
        >
          <span>Mulai Perjalanan</span>
          <ArrowRight className="w-4 h-4 text-muted-foreground" />
        </button>

        <button
          type="button"
          onClick={onOpenQuiz}
          className="liquid-glass rounded-full px-8 py-4 sm:py-5 text-sm text-muted-foreground hover:text-foreground hover:scale-[1.03] cursor-pointer transition-all select-none"
        >
          Kuis Panduan Aroma →
        </button>
      </div>

      {/* Bottom Floating Curated Bottles Dock */}
      <div className="w-full max-w-4xl mt-16 sm:mt-24 pt-8 border-t border-white/10 animate-fade-rise-delay-2">
        <div className="flex items-center justify-between mb-4 px-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            3 Mahakarya Terkurasi
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Klik botol untuk piramida aroma & pilihan varian
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {perfumes.map((perfume) => (
            <div
              key={perfume.id}
              onClick={() => onOpenProductModal(perfume)}
              className="liquid-glass rounded-2xl p-4 border border-white/5 hover:border-white/20 hover:scale-[1.02] cursor-pointer transition-all text-left flex items-center gap-3.5 group"
            >
              <img
                src={perfume.image}
                alt={perfume.name}
                className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 group-hover:brightness-110 transition-all"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4
                    className="text-lg font-normal text-foreground truncate"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {perfume.name}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {formatRupiah(perfume.variants[0].price)}
                  </span>
                </div>
                <div className="text-[11px] text-muted-foreground truncate">
                  {perfume.category} • {perfume.specs.longevity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
