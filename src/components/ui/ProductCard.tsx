/**
 * Maxxipluss Perfume - Sleek & Minimalist Product Card Component
 */

import React from 'react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
  formatRupiah: (amount: number) => string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetail,
  formatRupiah
}) => {
  const basePrice = product.variants[0].price;
  const availableSizes = product.variants.map(v => v.size).join(' · ');
  const topNotes = product.fragranceNotes.top.slice(0, 2).join(', ');
  const heartNotes = product.fragranceNotes.heart.slice(0, 2).join(', ');
  const baseNotes = product.fragranceNotes.base.slice(0, 2).join(', ');

  return (
    <article
      className="editorial-card group cursor-pointer"
      onClick={() => onOpenDetail(product)}
      data-product-id={product.id}
    >
      <div className="card-img-wrap relative overflow-hidden rounded-xl">
        <div className="card-ambient-aura" aria-hidden="true"></div>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          draggable="false"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <span className="card-floating-badge">{product.tag || product.category}</span>
      </div>

      <div className="card-content-wrap mt-4 flex flex-col justify-between flex-grow">
        <div>
          <div className="card-meta-line flex justify-between items-center mb-1">
            <span className="card-category-label text-[10px] tracking-[1.5px] uppercase text-[#d4af37]">
              {product.category}
            </span>
            <span className="card-longevity-marker text-ember text-[10px] tracking-[1px]">
              {product.specs.longevity}
            </span>
          </div>

          <h3 className="card-title-text text-lg font-serif text-[#f3e5d0] group-hover:text-white transition-colors mb-1">
            {product.name}
          </h3>
          <p className="card-desc-text text-xs text-[#a89278] line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>

          <div className="card-notes-editorial text-[10.5px] text-[#8c7862] space-y-1 mb-4 border-t border-[rgba(212,175,55,0.08)] pt-2">
            <div className="note-line">
              <span className="note-type font-semibold text-[#d4af37] mr-1">NADA:</span>
              <span className="note-content">{topNotes} · {heartNotes} · {baseNotes}</span>
            </div>
            <div className="note-line volume-line">
              <span className="note-type font-semibold text-[#d4af37] mr-1">BOTOL:</span>
              <span className="note-content">{availableSizes}</span>
            </div>
          </div>
        </div>

        <div className="card-actions-row flex items-center justify-between border-t border-[rgba(212,175,55,0.12)] pt-3 mt-2">
          <div className="card-pricing-block">
            <span className="price-eyebrow block text-[9px] tracking-[1.2px] text-[#8c7862]">MULAI DARI</span>
            <span className="price-val-highlight font-semibold text-sm text-[#f3e5d0]">{formatRupiah(basePrice)}</span>
          </div>
          <button
            type="button"
            className="card-editorial-btn btn-open-detail bg-[rgba(212,175,55,0.12)] hover:bg-[#d4af37] hover:text-[#120803] text-[#d4af37] text-[10.5px] font-semibold tracking-[1.5px] px-4 py-2 rounded-full transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(product);
            }}
          >
            <span>PESAN</span>
          </button>
        </div>
      </div>
    </article>
  );
};
