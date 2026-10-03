/**
 * Maxxipluss Perfume - Slide-over Cart Drawer Component
 */

import React from 'react';
import { CartItem } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onUpdateQuantity: (itemKey: string, delta: number) => void;
  onRemoveItem: (itemKey: string) => void;
  onOpenCheckout: () => void;
  formatRupiah: (amount: number) => string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  total,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  formatRupiah
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="cart-drawer-overlay active"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className="cart-drawer-panel active" aria-label="Keranjang Pesanan">
        <div className="cart-drawer-header flex items-center justify-between pb-4 border-b border-[rgba(212,175,55,0.15)]">
          <div className="drawer-header-title text-xs tracking-[2px] font-semibold text-[#f3e5d0]">
            DAFTAR PESANAN SAYA
          </div>
          <button
            onClick={onClose}
            className="drawer-close-btn text-[#a89278] hover:text-white transition-colors"
            aria-label="Tutup Keranjang"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer-body flex-grow overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 text-[#a89278]">
              <p className="text-xs tracking-[1.5px] uppercase">Keranjang belanja Anda masih kosong</p>
              <p className="text-[11px] text-[#8c7862] mt-2">Silakan pilih varian aroma dari koleksi kami</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.itemKey} className="cart-item-card p-3 rounded-lg bg-[rgba(22,13,8,0.5)] border border-[rgba(212,175,55,0.1)] flex gap-3 items-center">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-contain rounded bg-[rgba(12,6,3,0.8)] p-1" />
                <div className="flex-grow min-w-0">
                  <h4 className="text-xs font-semibold text-[#f3e5d0] truncate">{item.name}</h4>
                  <p className="text-[10px] text-[#a89278]">Ukuran: {item.size}</p>
                  <p className="text-xs font-semibold text-[#d4af37] mt-1">{formatRupiah(item.price * item.quantity)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="quantity-controls flex items-center border border-[rgba(212,175,55,0.2)] rounded-full px-2 py-0.5">
                    <button onClick={() => onUpdateQuantity(item.itemKey, -1)} className="text-[#d4af37] text-xs px-1 hover:text-white">-</button>
                    <span className="text-xs px-1 text-[#f3e5d0]">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.itemKey, 1)} className="text-[#d4af37] text-xs px-1 hover:text-white">+</button>
                  </div>
                  <button onClick={() => onRemoveItem(item.itemKey)} className="text-red-400 text-xs hover:text-red-300 ml-1">✕</button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer-footer pt-4 border-t border-[rgba(212,175,55,0.15)]">
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-[#a89278]">ESTIMASI SUBTOTAL:</span>
              <span className="font-semibold text-[#f3e5d0] text-base">{formatRupiah(total)}</span>
            </div>
            <button
              onClick={onOpenCheckout}
              className="btn-pill-solid w-full justify-center text-xs tracking-[2px] py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#120803] font-semibold rounded-full hover:scale-[1.01] transition-transform"
            >
              LANJUT KE PEMESANAN WHATSAPP
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
