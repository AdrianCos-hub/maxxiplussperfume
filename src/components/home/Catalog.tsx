/**
 * Maxxipluss Perfume - Catalog Component (Horizontal Carousel & Category Filters)
 */

import React, { useState } from 'react';
import { Product } from '../../types';
import { ProductCard } from '../ui/ProductCard';

interface CatalogProps {
  products: Product[];
  onOpenDetail: (product: Product) => void;
  formatRupiah: (amount: number) => string;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  onOpenDetail,
  formatRupiah
}) => {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = products.filter(prod => {
    const matchCategory =
      currentCategory === 'all' ||
      prod.gender.toLowerCase() === currentCategory.toLowerCase() ||
      prod.category.toLowerCase().includes(currentCategory.toLowerCase());

    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      !query ||
      prod.name.toLowerCase().includes(query) ||
      prod.description.toLowerCase().includes(query) ||
      prod.fragranceNotes.top.some(n => n.toLowerCase().includes(query)) ||
      prod.fragranceNotes.heart.some(n => n.toLowerCase().includes(query)) ||
      prod.fragranceNotes.base.some(n => n.toLowerCase().includes(query));

    return matchCategory && matchSearch;
  });

  return (
    <section id="catalog" className="catalog-editorial-wrap py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="catalog-header-bar motion-reveal mb-10">
        <div className="catalog-header-top flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
          <div className="catalog-title-block">
            <h2 className="heading-title text-2xl sm:text-3xl font-serif text-[#f3e5d0] tracking-[1px]">
              SEMUA VARIAN PARFUM.
            </h2>
            <p className="editorial-body text-xs text-[#a89278] mt-1 max-w-lg">
              Koleksi wewangian ekstrak rempah botani asli Painan, diracik khusus untuk karakter kepribadian yang berbeda.
            </p>
          </div>

          <div className="catalog-top-actions flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="catalog-search-box relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="CARI PARFUM ATAU REMPAH..."
                className="w-full bg-[rgba(22,13,8,0.6)] border border-[rgba(212,175,55,0.25)] rounded-full px-4 py-2 text-xs text-[#f3e5d0] placeholder-[#8c7862] focus:outline-none focus:border-[#d4af37]"
              />
            </div>
          </div>
        </div>

        {/* Filter Links Bar */}
        <div className="filter-links-row flex items-center gap-2 overflow-x-auto pb-2 border-b border-[rgba(212,175,55,0.12)]">
          {[
            { id: 'all', label: 'SEMUA KOLEKSI' },
            { id: 'pria', label: 'PRIA (MASKULIN)' },
            { id: 'wanita', label: 'WANITA (FEMININ)' },
            { id: 'unisex', label: 'UNISEX' },
            { id: 'woody', label: 'WOODY SPICY' },
            { id: 'amber', label: 'WARM AMBER' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setCurrentCategory(filter.id)}
              className={`filter-link-btn px-4 py-1.5 text-[10.5px] font-medium tracking-[1.5px] uppercase rounded-full transition-all whitespace-nowrap ${
                currentCategory === filter.id
                  ? 'bg-[#d4af37] text-[#120803] font-semibold'
                  : 'text-[#a89278] hover:text-[#f3e5d0] hover:bg-[rgba(212,175,55,0.08)]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div className="catalog-carousel-wrapper relative">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[rgba(212,175,55,0.2)] rounded-xl">
            <span className="text-xs text-[#a89278] tracking-[2px]">
              TIDAK ADA HASIL AROMA YANG COCOK DI KOLEKSI
            </span>
          </div>
        ) : (
          <div className="catalog-carousel-track flex gap-6 overflow-x-auto pb-6 scrollbar-thin">
            {filteredProducts.map(product => (
              <div key={product.id} className="flex-shrink-0 w-[280px] sm:w-[320px]">
                <ProductCard
                  product={product}
                  onOpenDetail={onOpenDetail}
                  formatRupiah={formatRupiah}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="carousel-footer-meta mt-4 flex items-center justify-between text-[11px] text-[#8c7862]">
        <span className="carousel-hint-text flex items-center gap-1.5">
          <span>⟷</span> GESER / SWIPE KE SAMPING UNTUK MENJELAJAHI KOLEKSI
        </span>
      </div>
    </section>
  );
};
