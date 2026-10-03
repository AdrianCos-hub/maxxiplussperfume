import React from 'react';
import { PerfumeProduct } from '../../types';
import { perfumes, formatRupiah } from '../../data/perfumes';

interface CatalogProps {
  onOpenProductModal?: (product: PerfumeProduct) => void;
  onQuickAdd?: (product: PerfumeProduct) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  onOpenProductModal,
  onQuickAdd,
}) => {
  return (
    <section id="catalog" className="py-20 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Koleksi Utama</span>
        <h2 className="text-4xl sm:text-5xl font-serif text-white mt-2">Parfum Botani Signature</h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-3">
          Diracik secara eksklusif menggunakan minyak esensial rempah pilihan dari Pesisir Selatan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {perfumes.map((perfume) => (
          <div
            key={perfume.id}
            className="liquid-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all group"
          >
            <div>
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-black/20">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-xs px-3 py-1 rounded-full text-white/90 border border-white/10">
                  {perfume.badge}
                </span>
              </div>

              <span className="text-xs text-muted-foreground uppercase tracking-wider">{perfume.category}</span>
              <h3 className="text-2xl font-serif text-white mt-1">{perfume.name}</h3>
              <p className="text-xs text-white/70 mt-2 line-clamp-2">{perfume.tagline}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/40 block">Mulai Dari</span>
                <span className="text-lg font-semibold text-white">{formatRupiah(perfume.variants[0].price)}</span>
              </div>

              <div className="flex gap-2">
                {onOpenProductModal && (
                  <button
                    onClick={() => onOpenProductModal(perfume)}
                    className="liquid-glass px-4 py-2 rounded-full text-xs text-white hover:bg-white/20 transition-all"
                  >
                    Detail
                  </button>
                )}
                {onQuickAdd && (
                  <button
                    onClick={() => onQuickAdd(perfume)}
                    className="bg-white text-black px-4 py-2 rounded-full text-xs font-medium hover:bg-white/90 transition-all"
                  >
                    Beli
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Catalog;
