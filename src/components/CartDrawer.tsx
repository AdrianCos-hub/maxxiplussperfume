import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Gift, MessageCircle, ChevronDown, ChevronUp, Check, ExternalLink } from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah } from '../data/perfumes';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart: _onClearCart,
}) => {
  if (!isOpen) return null;

  const [showShippingForm, setShowShippingForm] = useState(false);
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    courier: 'J&T Express',
    notes: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  /**
   * Generates the pre-filled WhatsApp message with:
   * - Selected products
   * - Quantities
   * - Price breakdown
   * - Total price
   * - Optional customer shipping details
   */
  const generateWhatsAppMessage = () => {
    let message = `Halo *MAXXIPLUSS® Perfume*, saya ingin melakukan pemesanan:\n\n`;
    message += `📋 *RINGKASAN PESANAN (${totalUnits} BOTOL):*\n`;
    message += `-------------------------------------------\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* (${item.size})\n`;
      message += `   • Jumlah: ${item.quantity} botol\n`;
      message += `   • Harga Satuan: ${formatRupiah(item.price)}\n`;
      message += `   • Subtotal: ${formatRupiah(item.price * item.quantity)}\n\n`;
    });

    message += `-------------------------------------------\n`;
    message += `💰 *TOTAL PEMBAYARAN: ${formatRupiah(subtotal)}*\n`;
    message += `🎁 *Bonus Promo:* Gratis 1x Tester Mini Vial\n`;

    if (customer.name || customer.address || customer.phone) {
      message += `\n📍 *DATA PENGIRIMAN:*\n`;
      if (customer.name) message += `• Nama Penerima: ${customer.name}\n`;
      if (customer.phone) message += `• No. WhatsApp: ${customer.phone}\n`;
      if (customer.address) message += `• Alamat Tujuan: ${customer.address}\n`;
      if (customer.courier) message += `• Pilihan Kurir: ${customer.courier}\n`;
      if (customer.notes) message += `• Catatan: ${customer.notes}\n`;
    }

    message += `\nMohon konfirmasi ketersediaan stok & total biaya beserta ongkos kirim ke alamat saya. Terima kasih! 🙏`;

    return message;
  };

  /**
   * Trigger the WhatsApp Checkout
   */
  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const adminPhone = '6282284033320';
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;

    // Safe external navigation in iframe / web environment
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-rise">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md liquid-glass border-l border-white/10 flex flex-col justify-between text-foreground shadow-2xl bg-[#011425]/95">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-xl font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Keranjang Belanja
              </h3>
              {items.length > 0 && (
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-muted-foreground">
                  {totalUnits} item
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
              aria-label="Tutup keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-28 text-center text-muted-foreground flex flex-col items-center">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] mb-3 opacity-30" />
                <p className="text-sm font-medium text-foreground">Keranjang Anda masih kosong</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">
                  Pilih aroma favorit dari koleksi parfum Maxxipluss® untuk memulai pesanan.
                </p>
              </div>
            ) : (
              <>
                {/* Promo Notification */}
                <div className="liquid-glass rounded-xl p-3 border border-white/5 flex items-center gap-2.5 text-xs text-muted-foreground">
                  <Gift className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Bonus otomatis: <strong className="text-white font-medium">1x Tester Mini Vial</strong> gratis disertakan dalam setiap pesanan!
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.cartKey}
                      className="liquid-glass rounded-2xl p-3.5 border border-white/5 flex gap-3.5 items-center hover:border-white/15 transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0 bg-black/20"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-sm font-medium truncate text-foreground">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.cartKey)}
                            className="text-muted-foreground hover:text-red-400 p-1 transition-colors"
                            title="Hapus dari keranjang"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-xs text-muted-foreground mt-0.5">
                          Ukuran: <span className="text-foreground font-medium">{item.size}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2.5">
                          <div className="text-xs font-semibold text-foreground">
                            {formatRupiah(item.price * item.quantity)}
                          </div>

                          <div className="flex items-center gap-2 bg-white/5 rounded-full px-2 py-0.5 border border-white/10">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartKey, -1)}
                              className="w-5 h-5 flex items-center justify-center text-xs hover:text-white transition-colors"
                              aria-label="Kurangi jumlah"
                            >
                              -
                            </button>
                            <span className="text-xs font-medium w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartKey, 1)}
                              className="w-5 h-5 flex items-center justify-center text-xs hover:text-white transition-colors"
                              aria-label="Tambah jumlah"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Delivery Details Expander */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowShippingForm(!showShippingForm)}
                    className="w-full liquid-glass rounded-xl p-3 border border-white/5 flex items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-emerald-400">●</span>
                      <span>Tambah Data Pengiriman ke Pesanan (Opsional)</span>
                    </span>
                    {showShippingForm ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>

                  {showShippingForm && (
                    <div className="mt-3 liquid-glass rounded-2xl p-4 border border-white/5 space-y-3 text-xs animate-fade-rise">
                      <div>
                        <label className="block text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                          Nama Penerima
                        </label>
                        <input
                          type="text"
                          value={customer.name}
                          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                          placeholder="Nama lengkap Anda"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-white/30 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                          No. WhatsApp Penerima
                        </label>
                        <input
                          type="tel"
                          value={customer.phone}
                          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                          placeholder="08xxxxxxxxxx"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-white/30 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                          Alamat Tujuan Lengkap
                        </label>
                        <textarea
                          rows={2}
                          value={customer.address}
                          onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                          placeholder="Jalan, No. Rumah, RT/RW, Kecamatan, Kota, Kode Pos"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-white/30 text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                            Kurir
                          </label>
                          <select
                            value={customer.courier}
                            onChange={(e) => setCustomer({ ...customer, courier: e.target.value })}
                            className="w-full bg-[#051a2e] border border-white/10 rounded-xl px-2.5 py-2 text-foreground focus:outline-none focus:border-white/30 text-xs"
                          >
                            <option value="J&T Express">J&T Express</option>
                            <option value="SiCepat">SiCepat</option>
                            <option value="JNE">JNE</option>
                            <option value="Ambil di Outlet Painan">Outlet Painan</option>
                            <option value="Ambil di Outlet Kambang">Outlet Kambang</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-muted-foreground text-[10px] uppercase tracking-wider mb-1">
                            Catatan
                          </label>
                          <input
                            type="text"
                            value={customer.notes}
                            onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                            placeholder="Catatan packing"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-white/30 text-xs"
                          />
                        </div>
                      </div>

                      <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Data ini akan otomatis disertakan dalam format WhatsApp.</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer with Checkout via WhatsApp Button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#001222]/80 space-y-4">
              {/* Order Summary Line */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Jumlah Item:</span>
                  <span>{totalUnits} botol</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Total Harga:</span>
                  <span
                    className="text-2xl font-normal text-foreground"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {formatRupiah(subtotal)}
                  </span>
                </div>
              </div>

              {/* Primary 'Checkout via WhatsApp' Button */}
              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                className="w-full liquid-glass rounded-full px-6 py-4 text-sm text-foreground hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer font-medium border border-emerald-500/30 bg-emerald-950/30 shadow-lg shadow-emerald-950/20 group"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-semibold text-white tracking-wide text-sm">
                  Checkout via WhatsApp
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400/70 ml-1" />
              </button>

              <p className="text-[11px] text-muted-foreground text-center leading-tight">
                Pesan WhatsApp terformat otomatis dengan produk, kuantitas, dan total harga ke admin resmi Maxxipluss®.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
