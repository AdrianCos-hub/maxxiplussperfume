/**
 * Maxxipluss Perfume - Product Detail Bottle Modal Component
 */

import React, { useState } from 'react';
import { Product } from '../../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  formatRupiah: (amount: number) => string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  formatRupiah
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(product.variants[0].size);
  const currentVariant = product.variants.find(v => v.size === selectedSize) || product.variants[0];

  const topNotes = product.fragranceNotes.top.join(', ');
  const heartNotes = product.fragranceNotes.heart.join(', ');
  const baseNotes = product.fragranceNotes.base.join(', ');

  const handleBuyNowWA = () => {
    const text = `Halo Admin Maxxipluss Perfume, saya ingin pesan *${product.name}* ukuran *${selectedSize}* (${formatRupiah(currentVariant.price)}). Mohon info stok dan ongkir ya!`;
    window.open(`https://wa.me/6282284033320?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="product-detail-backdrop active" onClick={onClose}>
      <div className="product-detail-card-window" onClick={(e) => e.stopPropagation()}>
        <button className="detail-modal-close-btn" onClick={onClose} aria-label="Tutup Detail Botol">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="product-detail-layout grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Visual Left Pane */}
          <div className="product-detail-visual-pane flex flex-col items-center justify-center relative">
            <div className="detail-bottle-frame relative p-4 rounded-xl">
              <div className="detail-bottle-ambient-glow" aria-hidden="true"></div>
              <span className="detail-floating-tier-badge text-[9px] tracking-[1.5px] uppercase text-[#d4af37] bg-[rgba(16,9,4,0.85)] px-3 py-1 rounded-full border border-[rgba(212,175,55,0.2)] mb-3 block text-center">
                {product.specs.concentration || 'EAU DE PARFUM'}
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="detail-bottle-hero-img max-h-[320px] object-contain mx-auto"
                draggable="false"
              />
            </div>
          </div>

          {/* Narrative Right Pane */}
          <div className="product-detail-narrative-pane flex flex-col justify-between">
            <div>
              <div className="detail-meta-eyebrow flex justify-between items-center mb-2 text-xs">
                <span className="detail-category-badge text-[#d4af37] font-semibold">
                  {product.category} — {product.gender}
                </span>
                <span className="detail-longevity-badge text-ember">
                  {product.specs.longevity}
                </span>
              </div>

              <h2 className="detail-product-name text-2xl font-serif text-[#f3e5d0] mb-1">
                {product.name}
              </h2>
              <p className="detail-product-subtitle text-xs text-[#a89278] mb-3">
                {product.subtitle}
              </p>

              <p className="detail-product-desc text-xs text-[#d1c2b0] leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Fragrance Pyramid Notes */}
              <div className="detail-pyramid-card bg-[rgba(22,13,8,0.5)] border border-[rgba(212,175,55,0.12)] rounded-lg p-3 space-y-2 mb-4 text-xs">
                <div className="pyramid-row">
                  <span className="pyramid-label font-semibold text-[#d4af37] block text-[10px]">
                    NADA AWAL (TOP NOTES — 00-15 MENIT)
                  </span>
                  <span className="pyramid-notes text-[#f3e5d0]">{topNotes}</span>
                </div>
                <div className="pyramid-row">
                  <span className="pyramid-label font-semibold text-[#d4af37] block text-[10px]">
                    NADA TENGAH (HEART NOTES — 01-04 JAM)
                  </span>
                  <span className="pyramid-notes text-[#f3e5d0]">{heartNotes}</span>
                </div>
                <div className="pyramid-row">
                  <span className="pyramid-label font-semibold text-[#d4af37] block text-[10px]">
                    NADA DASAR (BASE NOTES — 04-12 JAM)
                  </span>
                  <span className="pyramid-notes text-[#f3e5d0]">{baseNotes}</span>
                </div>
              </div>
            </div>

            {/* Purchase Box */}
            <div className="detail-purchase-box border-t border-[rgba(212,175,55,0.15)] pt-4 space-y-3">
              <div className="detail-size-header-row flex justify-between items-center text-xs">
                <span className="variant-label text-[#a89278]">PILIH UKURAN BOTOL:</span>
                <span className="price-indicator text-lg font-semibold text-[#d4af37]">
                  {formatRupiah(currentVariant.price)}
                </span>
              </div>

              <div className="variant-selector-pills flex gap-2">
                {product.variants.map(v => (
                  <button
                    key={v.size}
                    type="button"
                    className={`variant-pill-btn flex-1 py-2 text-xs font-medium tracking-[1px] rounded-lg border transition-all ${
                      v.size === selectedSize
                        ? 'bg-[#d4af37] text-[#120803] border-[#d4af37] font-semibold'
                        : 'border-[rgba(212,175,55,0.25)] text-[#f3e5d0] hover:border-[#d4af37]'
                    }`}
                    onClick={() => setSelectedSize(v.size)}
                  >
                    {v.size}
                  </button>
                ))}
              </div>

              <div className="detail-modal-action-row flex gap-2 pt-2">
                <button
                  type="button"
                  className="btn-pill-solid flex-1 py-3 text-xs tracking-[1.5px] rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#120803] font-semibold hover:scale-[1.01] transition-transform"
                  onClick={() => {
                    onAddToCart(product, selectedSize);
                    onClose();
                  }}
                >
                  TAMBAH KE KERANJANG
                </button>
                <button
                  type="button"
                  className="btn-ghost-outline py-3 px-4 text-xs tracking-[1.5px] rounded-full border border-[rgba(212,175,55,0.4)] text-[#f3e5d0] hover:border-[#d4af37]"
                  onClick={handleBuyNowWA}
                >
                  BELI VIA WA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
