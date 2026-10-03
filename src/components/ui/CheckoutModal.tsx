/**
 * Maxxipluss Perfume - Checkout Modal Form Component
 */

import React, { useState } from 'react';
import { CartItem, CustomerCheckoutInfo } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  formatRupiah: (amount: number) => string;
  onConfirmCheckout: (info: CustomerCheckoutInfo) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  total,
  formatRupiah,
  onConfirmCheckout
}) => {
  const [formData, setFormData] = useState<CustomerCheckoutInfo>({
    name: '',
    phone: '',
    address: '',
    courier: 'J&T Express',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmCheckout(formData);
  };

  return (
    <div className="modal-editorial-backdrop active" onClick={onClose}>
      <div className="modal-editorial-window" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Tutup Modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-header-block mb-4 text-center">
          <div className="text-[10px] tracking-[2px] text-[#d4af37] font-semibold mb-1">PROSES PEMESANAN</div>
          <h3 className="text-xl font-serif text-[#f3e5d0]">INFORMASI PENGIRIMAN</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="input-label-caps block text-[10px] tracking-[1.5px] text-[#a89278] mb-1">NAMA LENGKAP *</label>
            <input
              type="text"
              required
              className="input-underline w-full bg-[rgba(22,13,8,0.6)] border-b border-[rgba(212,175,55,0.3)] text-xs text-[#f3e5d0] px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
              placeholder="CONTOH: BIMA PRATAMA"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="input-label-caps block text-[10px] tracking-[1.5px] text-[#a89278] mb-1">NOMOR WHATSAPP *</label>
            <input
              type="tel"
              required
              className="input-underline w-full bg-[rgba(22,13,8,0.6)] border-b border-[rgba(212,175,55,0.3)] text-xs text-[#f3e5d0] px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
              placeholder="CONTOH: 08123456789"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="input-label-caps block text-[10px] tracking-[1.5px] text-[#a89278] mb-1">ALAMAT LENGKAP PENGIRIMAN *</label>
            <textarea
              required
              rows={2}
              className="input-underline w-full bg-[rgba(22,13,8,0.6)] border-b border-[rgba(212,175,55,0.3)] text-xs text-[#f3e5d0] px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
              placeholder="JALAN, KECAMATAN, KOTA/KABUPATEN, PROVINSI & KODE POS"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="input-label-caps block text-[10px] tracking-[1.5px] text-[#a89278] mb-1">PILIHAN EKSPEDISI</label>
            <select
              className="input-underline w-full bg-[rgba(22,13,8,0.8)] border-b border-[rgba(212,175,55,0.3)] text-xs text-[#f3e5d0] px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
              value={formData.courier}
              onChange={(e) => setFormData({ ...formData, courier: e.target.value })}
            >
              <option value="J&T Express">J&T EXPRESS</option>
              <option value="SiCepat">SICEPAT</option>
              <option value="JNE">JNE</option>
              <option value="Ambil Langsung di Outlet Painan">AMBIL LANGSUNG DI OUTLET PAINAN</option>
              <option value="Ambil Langsung di Outlet Kambang">AMBIL LANGSUNG DI OUTLET KAMBANG</option>
            </select>
          </div>

          <div>
            <label className="input-label-caps block text-[10px] tracking-[1.5px] text-[#a89278] mb-1">CATATAN KHUSUS</label>
            <input
              type="text"
              className="input-underline w-full bg-[rgba(22,13,8,0.6)] border-b border-[rgba(212,175,55,0.3)] text-xs text-[#f3e5d0] px-3 py-2 rounded focus:outline-none focus:border-[#d4af37]"
              placeholder="MISAL: PACKING TEBAL / UNTUK HADIAH"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="checkout-summary-box border border-dashed border-[rgba(212,175,55,0.2)] rounded-lg p-3 my-3 bg-[rgba(12,6,3,0.5)]">
            <div className="flex justify-between items-center text-xs text-[#f3e5d0] font-semibold mb-2">
              <span>TOTAL PESANAN ({items.length} ITEM):</span>
              <span className="text-[#d4af37] text-sm">{formatRupiah(total)}</span>
            </div>
            <p className="text-[10px] text-[#a89278]">
              Pesan Anda akan diformat dan dikirimkan langsung ke WhatsApp Resmi (+62 822-8403-3320) untuk konfirmasi ongkir.
            </p>
          </div>

          <button
            type="submit"
            className="btn-pill-solid w-full py-3.5 text-xs font-semibold tracking-[2px] rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#120803] hover:scale-[1.01] transition-transform"
          >
            KIRIM PESANAN KE WHATSAPP RESMI
          </button>
        </form>
      </div>
    </div>
  );
};
