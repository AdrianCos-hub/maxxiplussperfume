import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { CartItem } from '../../types';
import { formatRupiah } from '../../data/perfumes';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
}) => {
  if (!isOpen) return null;

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    courier: 'J&T Express',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let msg = `Halo Admin MAXXIPLUSS® Perfume, saya ingin memesan:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (${item.size}) x${item.quantity} = ${formatRupiah(item.price * item.quantity)}\n`;
    });
    msg += `\n💰 *Total:* ${formatRupiah(subtotal)}\n\n`;
    msg += `📍 *Data Pengiriman:*\n`;
    msg += `• Nama: ${customer.name}\n`;
    msg += `• No. WA: ${customer.phone}\n`;
    msg += `• Alamat: ${customer.address}\n`;
    msg += `• Kurir: ${customer.courier}\n`;
    if (customer.notes) msg += `• Catatan: ${customer.notes}\n`;

    window.open(`https://wa.me/6282284033320?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="liquid-glass rounded-3xl max-w-lg w-full p-6 border border-white/10 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-serif mb-4">Checkout WhatsApp Direct</h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-white/60 uppercase mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              placeholder="Nama Anda"
            />
          </div>

          <div>
            <label className="block text-white/60 uppercase mb-1">No. WhatsApp</label>
            <input
              type="tel"
              required
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div>
            <label className="block text-white/60 uppercase mb-1">Alamat Tujuan</label>
            <textarea
              required
              rows={2}
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              placeholder="Alamat lengkap penerima"
            />
          </div>

          <div>
            <label className="block text-white/60 uppercase mb-1">Ekspedisi</label>
            <select
              value={customer.courier}
              onChange={(e) => setCustomer({ ...customer, courier: e.target.value })}
              className="w-full bg-[#051a2e] border border-white/10 rounded-xl p-3 text-white"
            >
              <option value="J&T Express">J&T Express</option>
              <option value="SiCepat">SiCepat</option>
              <option value="JNE">JNE</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 mt-6"
          >
            <Check className="w-4 h-4" />
            Kirim Pesanan Ke WhatsApp Resmi
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
