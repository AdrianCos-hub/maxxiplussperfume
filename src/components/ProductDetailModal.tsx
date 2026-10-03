import React, { useState } from 'react';
import { X, ShoppingBag, Sparkles, Clock, Compass } from 'lucide-react';
import { PerfumeProduct, Variant } from '../types';
import { formatRupiah } from '../data/perfumes';

interface ProductDetailModalProps {
  product: PerfumeProduct | null;
  onClose: () => void;
  onAddToCart: (product: PerfumeProduct, variant: Variant, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleDirectWhatsApp = () => {
    const text = `Halo MAXXIPLUSS Perfume, saya ingin pesan langsung:\n\n• Varian: ${product.name}\n• Ukuran: ${selectedVariant.size}\n• Jumlah: ${quantity} botol\n• Total: ${formatRupiah(selectedVariant.price * quantity)}\n\nMohon info ketersediaan stok & estimasi ongkir ke alamat saya ya. Terima kasih!`;
    const url = `https://wa.me/6282284033320?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-rise">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto liquid-glass rounded-3xl p-6 sm:p-10 text-foreground border border-white/10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors z-20"
          aria-label="Tutup"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Product Image & Specs Pill */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-black/20">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 px-3 py-1 text-xs rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white font-medium">
                {product.badge}
              </span>
            </div>

            <div className="w-full max-w-[340px] grid grid-cols-2 gap-2 mt-4 text-xs">
              <div className="liquid-glass rounded-xl p-2.5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <span className="block text-muted-foreground text-[10px]">Ketahanan</span>
                  <span className="font-medium">{product.specs.longevity}</span>
                </div>
              </div>
              <div className="liquid-glass rounded-xl p-2.5 flex items-center gap-2">
                <Compass className="w-4 h-4 text-muted-foreground" />
                <div>
                  <span className="block text-muted-foreground text-[10px]">Proyeksi</span>
                  <span className="font-medium">{product.specs.projection}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Pyramid & Variant Selector */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1 uppercase tracking-wider">
              <span>{product.category}</span>
              <span>•</span>
              <span>{product.gender}</span>
            </div>

            <h2
              className="text-4xl sm:text-5xl font-normal leading-[1.0] text-foreground mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {product.name}
            </h2>

            <p className="text-sm text-muted-foreground italic mb-4">{product.tagline}</p>

            <div className="text-3xl font-normal text-foreground mb-4">
              {formatRupiah(selectedVariant.price)}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Fragrance Pyramid */}
            <div className="liquid-glass rounded-2xl p-4 mb-6 border border-white/5 space-y-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Piramida Aroma (Fragrance Pyramid)</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Top Notes (0-15 Menit):</span>
                  <span className="text-foreground font-medium">{product.notes.top.join(' • ')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Heart Notes (1-4 Jam):</span>
                  <span className="text-foreground font-medium">{product.notes.heart.join(' • ')}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Base Notes (4-24 Jam):</span>
                  <span className="text-foreground font-medium">{product.notes.base.join(' • ')}</span>
                </div>
              </div>
            </div>

            {/* Size Variant Selector */}
            <div className="mb-6">
              <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-2 font-medium">
                Pilih Ukuran Varian:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.size}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`py-2 px-3 rounded-full text-xs font-medium transition-all ${
                      selectedVariant.size === variant.size
                        ? 'bg-white text-black shadow-lg scale-100 font-semibold'
                        : 'liquid-glass text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div>{variant.size}</div>
                    <div className="text-[10px] opacity-80">{formatRupiah(variant.price)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Stepper */}
              <div className="liquid-glass rounded-full px-3 py-1.5 flex items-center justify-between gap-4 w-32 mx-auto sm:mx-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-sm font-semibold"
                >
                  -
                </button>
                <span className="text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-sm font-semibold"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, selectedVariant, quantity);
                  onClose();
                }}
                className="liquid-glass rounded-full px-6 py-3 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 flex items-center justify-center gap-2 cursor-pointer flex-1"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tambah ke Keranjang</span>
              </button>
            </div>

            {/* Quick WhatsApp Order */}
            <button
              type="button"
              onClick={handleDirectWhatsApp}
              className="mt-3 text-xs text-muted-foreground hover:text-foreground text-center underline underline-offset-4 transition-colors"
            >
              Atau pesan langsung via WhatsApp →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
