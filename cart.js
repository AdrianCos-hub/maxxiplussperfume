/**
 * Maxxipluss Perfume - Cart State Manager & Checkout Logic
 */

export class CartManager {
  constructor() {
    this.storageKey = 'maxxipluss_cart_v1';
    this.items = this.load();
    this.listeners = [];
  }

  load() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Gagal membaca cart dari localStorage:", e);
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
      this.emit();
    } catch (e) {
      console.error("Gagal menyimpan cart:", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.items, this.getTotal());
  }

  emit() {
    const total = this.getTotal();
    const count = this.getCount();
    this.listeners.forEach(fn => fn(this.items, total, count));
    window.dispatchEvent(new CustomEvent('cart-changed', {
      detail: { items: this.items, total, count }
    }));
  }

  addItem(product, variantSize, quantity = 1) {
    const selectedVariant = product.variants.find(v => v.size === variantSize) || product.variants[0];
    const itemKey = `${product.id}-${selectedVariant.size}`;

    const existingIndex = this.items.findIndex(item => item.itemKey === itemKey);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        itemKey,
        id: product.id,
        name: product.name,
        size: selectedVariant.size,
        price: selectedVariant.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }
    this.save();
  }

  updateQuantity(itemKey, delta) {
    const itemIndex = this.items.findIndex(item => item.itemKey === itemKey);
    if (itemIndex > -1) {
      this.items[itemIndex].quantity += delta;
      if (this.items[itemIndex].quantity <= 0) {
        this.items.splice(itemIndex, 1);
      }
      this.save();
    }
  }

  removeItem(itemKey) {
    this.items = this.items.filter(item => item.itemKey !== itemKey);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  /**
   * Format mata uang rupiah
   */
  formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  }

  /**
   * Membuat URL WhatsApp dengan pesan pesanan terstruktur & elegan
   */
  generateWhatsAppUrl(customer) {
    const adminPhone = "6282284033320";
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    let text = `✨ *PESANAN BARU - MAXXIPLUSS PERFUME* ✨\n`;
    text += `Tanggal: ${dateStr}\n`;
    text += `===================================\n\n`;

    text += `👤 *DATA PELANGGAN:*\n`;
    text += `• Nama: ${customer.name || '-'}\n`;
    text += `• No. WhatsApp: ${customer.phone || '-'}\n`;
    text += `• Alamat Kirim: ${customer.address || '-'}\n`;
    text += `• Opsi Pengiriman: ${customer.courier || 'J&T / Sicepat'}\n`;
    if (customer.notes) {
      text += `• Catatan Khusus: ${customer.notes}\n`;
    }
    text += `\n📦 *RINCIAN PRODUK:*\n`;

    this.items.forEach((item, index) => {
      text += `${index + 1}. *${item.name}*\n`;
      text += `   Ukuran: ${item.size}\n`;
      text += `   Jumlah: ${item.quantity} botol x ${this.formatRupiah(item.price)}\n`;
      text += `   Subtotal: ${this.formatRupiah(item.price * item.quantity)}\n\n`;
    });

    text += `===================================\n`;
    text += `💰 *TOTAL PESANAN: ${this.formatRupiah(this.getTotal())}*\n`;
    text += `🎁 *Promo:* Free Tester Mini Vial (Selama Persediaan Ada)\n\n`;
    text += `Halo admin MAXXIPLUSS, mohon konfirmasi ketersediaan stok dan info total pembayaran beserta ongkir ke alamat saya ya. Terima kasih! 🙏`;

    return `https://wa.me/${adminPhone}?text=${encodeURIComponent(text)}`;
  }
}

export const cart = new CartManager();
