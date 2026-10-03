import React, { useState } from 'react';

export interface DiscoveryScent {
  id: string;
  name: string;
  fullName: string;
  family: string;
  notes: string;
  tag: string;
  color: string;
}

export const DISCOVERY_OPTIONS: DiscoveryScent[] = [
  {
    id: 'mxp-royale-noir',
    name: 'Royale Noir',
    fullName: 'Maxxipluss Royale Noir',
    family: 'Woody Spicy',
    notes: 'Kayu Manis Painan · Black Pepper · Cedarwood',
    tag: 'Best Seller Pria',
    color: '#d4652f'
  },
  {
    id: 'mxp-velvet-blossom',
    name: 'Velvet Blossom',
    fullName: 'Maxxipluss Velvet Blossom',
    family: 'Floral Sweet',
    notes: 'Melati Putih · Bourbon Vanilla · Red Pear',
    tag: 'Favorit Wanita',
    color: '#e28471'
  },
  {
    id: 'mxp-grand-heritage',
    name: 'Grand Heritage 24K',
    fullName: 'Maxxipluss Grand Heritage 24K',
    family: 'Warm Amber Oud',
    notes: 'Cengkeh Pesisir · Saffron Emas · Ambergris',
    tag: 'Extrait 24 Jam',
    color: '#d49a37'
  },
  {
    id: 'mxp-vanilla-spice',
    name: 'Vanilla Nusantara',
    fullName: 'Maxxipluss Vanilla Nusantara',
    family: 'Warm Gourmand',
    notes: 'Bourbon Vanilla · Kayu Manis · Brown Sugar',
    tag: 'Comforting Sweet',
    color: '#c98a52'
  },
  {
    id: 'mxp-ocean-breeze',
    name: 'Ocean Breeze',
    fullName: 'Maxxipluss Ocean Breeze',
    family: 'Fresh Aquatic',
    notes: 'Garam Laut · Bergamot Sisilia · Cedar Driftwood',
    tag: 'Segar & Bersih',
    color: '#5b9eb9'
  }
];

export interface TierConfig {
  key: 'trio' | 'complete';
  title: string;
  maxCount: number;
  price: number;
  voucher: string;
  bonusText: string;
  defaultScents: string[];
}

export const DISCOVERY_TIERS: Record<'trio' | 'complete', TierConfig> = {
  trio: {
    key: 'trio',
    title: 'Trio Discovery Box (3 x 5ml)',
    maxCount: 3,
    price: 45000,
    voucher: 'BONUS VOUCHER RP 20.000 DIDALAM KOTAK',
    bonusText: '✓ Termasuk Voucher Belanja Rp 20.000 untuk Botol Besar',
    defaultScents: ['mxp-royale-noir', 'mxp-velvet-blossom', 'mxp-grand-heritage']
  },
  complete: {
    key: 'complete',
    title: 'All Variant Master Box (5 x 5ml)',
    maxCount: 5,
    price: 75000,
    voucher: 'GRATIS HARDBOX KOLEKTOR + VOUCHER RP 35.000',
    bonusText: '✓ Hemat Rp 25.000 + Voucher Belanja Rp 35.000 untuk Botol Besar',
    defaultScents: ['mxp-royale-noir', 'mxp-velvet-blossom', 'mxp-grand-heritage', 'mxp-vanilla-spice', 'mxp-ocean-breeze']
  }
};

export const DiscoverySet: React.FC = () => {
  const [currentTier, setCurrentTier] = useState<'trio' | 'complete'>('trio');
  const [selectedScents, setSelectedScents] = useState<string[]>(DISCOVERY_TIERS.trio.defaultScents);

  const activeTier = DISCOVERY_TIERS[currentTier];

  const handleTierChange = (tierKey: 'trio' | 'complete') => {
    setCurrentTier(tierKey);
    const tier = DISCOVERY_TIERS[tierKey];
    if (tierKey === 'complete') {
      setSelectedScents([...tier.defaultScents]);
    } else {
      let trimmed = selectedScents.slice(0, tier.maxCount);
      if (trimmed.length < tier.maxCount) {
        tier.defaultScents.forEach(id => {
          if (trimmed.length < tier.maxCount && !trimmed.includes(id)) {
            trimmed.push(id);
          }
        });
      }
      setSelectedScents(trimmed);
    }
  };

  const handleToggleScent = (id: string) => {
    const exists = selectedScents.includes(id);
    if (exists) {
      if (selectedScents.length <= 1) return;
      setSelectedScents(selectedScents.filter(item => item !== id));
    } else {
      if (selectedScents.length >= activeTier.maxCount) return;
      setSelectedScents([...selectedScents, id]);
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val);
  };

  const handleAddToCart = () => {
    const chosenNames = selectedScents
      .map(id => DISCOVERY_OPTIONS.find(o => o.id === id)?.name || id)
      .join(' + ');

    // Broadcast or update localStorage cart
    try {
      const storageKey = 'maxxipluss_cart_v1';
      const existingRaw = localStorage.getItem(storageKey);
      const items = existingRaw ? JSON.parse(existingRaw) : [];
      const itemKey = `mxp-discovery-${currentTier}-${selectedScents.join('_')}`;

      const foundIndex = items.findIndex((it: { itemKey: string }) => it.itemKey === itemKey);
      if (foundIndex > -1) {
        items[foundIndex].quantity += 1;
      } else {
        items.push({
          itemKey,
          id: `mxp-discovery-${currentTier}`,
          name: `Maxxipluss Discovery Box (${activeTier.maxCount} x 5ml)`,
          size: `${selectedScents.length} Varian: ${chosenNames}`,
          price: activeTier.price,
          image: 'image/foto1.jpeg',
          category: 'Discovery Set',
          quantity: 1
        });
      }
      localStorage.setItem(storageKey, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent('cart-changed', {
        detail: { items }
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleBuyWhatsApp = () => {
    const chosenList = selectedScents
      .map((id, idx) => `   ${idx + 1}. ${DISCOVERY_OPTIONS.find(o => o.id === id)?.fullName || id} (5ml)`)
      .join('\n');

    const msg = `Halo Admin MAXXIPLUSS, saya ingin memesan *Maxxipluss Discovery Set*:\n\n` +
      `📦 *Paket:* ${activeTier.title}\n` +
      `💰 *Harga:* ${formatRupiah(activeTier.price)}\n\n` +
      `✨ *Pilihan Aroma (5ml):*\n${chosenList}\n\n` +
      `🎁 *Benefit:* ${activeTier.voucher}\n\n` +
      `Mohon info ketersediaan stok & petunjuk pembayarannya ya. Terima kasih! 🙏`;

    window.open(`https://wa.me/6282284033320?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const selectedObjects = selectedScents
    .map(id => DISCOVERY_OPTIONS.find(o => o.id === id))
    .filter(Boolean) as DiscoveryScent[];

  return (
    <section id="discovery-set" className="discovery-editorial-section void-section">
      <div className="discovery-container">
        
        {/* Header Block */}
        <div className="discovery-header-block">
          <div className="editorial-subheading" style={{ marginBottom: '8px' }}>
            EKSPEDISI AROMA // COBA SEBELUM MEMBELI BOTOL BESAR
          </div>
          <h2 className="heading-title" style={{ marginBottom: '16px' }}>
            MAXXIPLUSS DISCOVERY SET.
          </h2>
          <p className="editorial-body" style={{ maxWidth: '760px', margin: '0 auto' }}>
            Eksplorasi wewangian botani rempah khas Painan langsung pada kulit Anda. Setiap paket menghadirkan botol mini vial kaca amber 5ml dengan precision mist atomizer, dikemas dalam hardbox eksklusif berembos foil emas dan dilengkapi voucher potongan harga untuk pembelian botol besar berikutnya.
          </p>
        </div>

        {/* Interactive Configuration Card */}
        <div className="discovery-interactive-card">
          
          {/* Visual Mockup Box */}
          <div className="discovery-visual-wrap">
            <div className="discovery-box-mockup">
              <div className="discovery-box-header">
                <span className="discovery-box-badge">5ML MINI SPRAY VIALS</span>
                <span className="discovery-box-brand">MAXXIPLUSS</span>
              </div>

              {/* Vials Tray */}
              <div className="discovery-vials-tray">
                {selectedObjects.map((scent, i) => (
                  <div
                    key={scent.id}
                    className="discovery-vial-item"
                    style={{ animationDelay: `${i * 0.25}s` }}
                  >
                    <div className="vial-spray-head" />
                    <div className="vial-neck" />
                    <div className="vial-glass-body">
                      <div
                        className="vial-liquid"
                        style={{
                          background: `linear-gradient(to top, ${scent.color} 0%, ${scent.color}aa 60%, ${scent.color}44 100%)`
                        }}
                      >
                        <div className="vial-label-band">5ML // MXP</div>
                      </div>
                    </div>
                    <div className="vial-name-tag">{scent.name}</div>
                  </div>
                ))}
              </div>

              <div className="discovery-box-footer">
                <div className="discovery-box-voucher-tag">
                  <span className="voucher-icon">✦</span>
                  <span>{activeTier.voucher}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Wrap */}
          <div className="discovery-controls-wrap">
            
            {/* Tier Tabs */}
            <div className="discovery-tier-tabs">
              <button
                type="button"
                className={`discovery-tab-btn ${currentTier === 'trio' ? 'active' : ''}`}
                onClick={() => handleTierChange('trio')}
              >
                <span className="tab-title">TRIO DISCOVERY</span>
                <span className="tab-sub">3 Varian x 5ml · Rp 45.000</span>
              </button>
              <button
                type="button"
                className={`discovery-tab-btn ${currentTier === 'complete' ? 'active' : ''}`}
                onClick={() => handleTierChange('complete')}
              >
                <span className="tab-title">ALL VARIANT MASTER BOX</span>
                <span className="tab-sub">5 Varian x 5ml · Rp 75.000</span>
              </button>
            </div>

            {/* Selection Counter */}
            <div className="discovery-selection-status">
              <span className="status-label">PILIH VARIAN AROMA ANDA:</span>
              <span className="counter-badge">
                {selectedScents.length} / {activeTier.maxCount} Terpilih
              </span>
            </div>

            {/* Scent Chips Grid */}
            <div className="discovery-scent-grid">
              {DISCOVERY_OPTIONS.map(opt => {
                const isSelected = selectedScents.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    className={`discovery-scent-chip ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleScent(opt.id)}
                  >
                    <div className="scent-chip-left">
                      <span
                        className="scent-color-dot"
                        style={{ backgroundColor: opt.color, color: opt.color }}
                      />
                      <div className="scent-info-text">
                        <span className="scent-name-strong">{opt.fullName}</span>
                        <span className="scent-notes-micro">{opt.notes}</span>
                      </div>
                    </div>
                    <div className="scent-chip-right">
                      <span className="scent-tag-badge">{opt.tag}</span>
                      <div className="scent-check-circle">{isSelected ? '✓' : ''}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Box */}
            <div className="discovery-summary-box">
              <div className="discovery-price-lockup">
                <div className="price-label">TOTAL HARGA DISCOVERY SET</div>
                <div className="discovery-price-val">{formatRupiah(activeTier.price)}</div>
                <div className="discovery-bonus-text">{activeTier.bonusText}</div>
              </div>

              <div className="discovery-action-buttons">
                <button
                  type="button"
                  className="btn-pill-solid"
                  style={{ flex: 1.2 }}
                  onClick={handleAddToCart}
                >
                  <span>TAMBAH KE KERANJANG</span>
                </button>
                <button
                  type="button"
                  className="btn-ghost-outline"
                  style={{ flex: 1 }}
                  onClick={handleBuyWhatsApp}
                >
                  <span>BELI VIA WHATSAPP</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
