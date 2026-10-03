/**
 * Maxxipluss Perfume - DiscoverySet Component (Sample Box 5ml Vials Configurator)
 */

import React, { useState } from 'react';
import { DISCOVERY_OPTIONS } from '../../data/products';
import { Button } from '../ui/Button';

interface DiscoverySetProps {
  onAddToCart: (productObj: any, size: string) => void;
  formatRupiah: (amount: number) => string;
}

export const DiscoverySet: React.FC<DiscoverySetProps> = ({
  onAddToCart,
  formatRupiah
}) => {
  const [tier, setTier] = useState<'trio' | 'complete'>('trio');
  const [selectedScents, setSelectedScents] = useState<string[]>([
    'mxp-royale-noir',
    'mxp-velvet-blossom',
    'mxp-grand-heritage'
  ]);

  const maxScents = tier === 'trio' ? 3 : 5;
  const totalPrice = tier === 'trio' ? 45000 : 75000;

  const handleToggleScent = (id: string) => {
    if (selectedScents.includes(id)) {
      if (selectedScents.length > 1) {
        setSelectedScents(selectedScents.filter(s => s !== id));
      }
    } else {
      if (selectedScents.length < maxScents) {
        setSelectedScents([...selectedScents, id]);
      } else {
        setSelectedScents([...selectedScents.slice(1), id]);
      }
    }
  };

  const handleTierChange = (newTier: 'trio' | 'complete') => {
    setTier(newTier);
    if (newTier === 'complete') {
      setSelectedScents(DISCOVERY_OPTIONS.map(o => o.id));
    } else if (selectedScents.length > 3) {
      setSelectedScents(selectedScents.slice(0, 3));
    }
  };

  const handleAddToCartClick = () => {
    const customProduct = {
      id: `discovery-set-${tier}`,
      name: tier === 'trio' ? 'Maxxipluss Trio Discovery Set' : 'Maxxipluss All Variant Master Box',
      category: 'Discovery Box',
      image: 'image/foto3.jpeg',
      variants: [
        {
          size: `${selectedScents.length} Vials (5ml)`,
          price: totalPrice,
          label: `${selectedScents.length} x 5ml Mini Vials`
        }
      ]
    };
    onAddToCart(customProduct, `${selectedScents.length} Vials (5ml)`);
  };

  const handleBuyWA = () => {
    const scentNames = selectedScents
      .map(id => DISCOVERY_OPTIONS.find(o => o.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Halo Admin Maxxipluss, saya mau beli *${tier === 'trio' ? 'Trio Discovery Set (3x5ml)' : 'All Variant Master Box (5x5ml)'}* (${formatRupiah(totalPrice)}).\n\nPilihan Varian: ${scentNames}.\nMohon info total dan ongkir ya!`;
    window.open(`https://wa.me/6282284033320?text=${encodeURIComponent(text)}`, '_blank');
  };

  const selectedObjs = selectedScents
    .map(id => DISCOVERY_OPTIONS.find(o => o.id === id))
    .filter(Boolean);

  return (
    <section id="discovery-set" className="discovery-editorial-section py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="discovery-container motion-reveal">
        <div className="discovery-header-block text-center mb-12">
          <div className="editorial-subheading text-xs tracking-[2px] text-[#d4af37] font-semibold mb-2">
            EKSPEDISI AROMA — COBA SEBELUM MEMBELI BOTOL BESAR
          </div>
          <h2 className="heading-title text-2xl sm:text-4xl font-serif text-[#f3e5d0] mb-3">
            MAXXIPLUSS DISCOVERY SET.
          </h2>
          <p className="editorial-body text-xs sm:text-sm text-[#a89278] max-w-2xl mx-auto leading-relaxed">
            Eksplorasi wewangian botani rempah khas Painan langsung pada kulit Anda. Setiap paket menghadirkan botol mini vial kaca amber 5ml dengan precision mist atomizer, dikemas dalam hardbox eksklusif berembos foil emas dan dilengkapi voucher potongan harga.
          </p>
        </div>

        <div className="discovery-interactive-card bg-[rgba(22,13,8,0.35)] border border-[rgba(212,175,55,0.15)] rounded-2xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Visual Box & Mini Vials Tray */}
          <div className="discovery-visual-wrap lg:col-span-6 flex justify-center">
            <div className="discovery-box-mockup bg-[rgba(16,9,4,0.8)] border border-[rgba(212,175,55,0.25)] rounded-xl p-6 w-full max-w-md shadow-2xl">
              <div className="discovery-box-header flex justify-between items-center text-[10px] text-[#a89278] border-b border-[rgba(212,175,55,0.1)] pb-3 mb-4">
                <span className="discovery-box-badge text-[#d4af37] font-semibold tracking-[1px]">5ML MINI SPRAY VIALS</span>
                <span className="discovery-box-brand tracking-[2px] font-serif font-bold text-[#f3e5d0]">MAXXIPLUSS</span>
              </div>

              {/* Vials Tray */}
              <div className="discovery-vials-tray flex justify-center items-end gap-3 py-6 min-h-[180px] overflow-x-auto">
                {selectedObjs.map((scent, i) => (
                  <div key={scent?.id || i} className="discovery-vial-item flex flex-col items-center group flex-shrink-0">
                    <div className="vial-spray-head w-3 h-2 bg-[#d4af37] rounded-t-sm" />
                    <div className="vial-neck w-2 h-1 bg-[#b89228]" />
                    <div className="vial-glass-body w-6 h-20 bg-[rgba(255,255,255,0.05)] border border-[rgba(212,175,55,0.3)] rounded-b-md relative overflow-hidden flex items-end">
                      <div
                        className="vial-liquid w-full transition-all duration-500 rounded-b-md"
                        style={{
                          height: '70%',
                          background: `linear-gradient(to top, ${scent?.color} 0%, ${scent?.color}aa 60%, transparent 100%)`
                        }}
                      >
                        <div className="vial-label-band text-[7px] text-[#120803] font-bold text-center tracking-tighter bg-amber-200/80 py-0.5">
                          5ML · MXP
                        </div>
                      </div>
                    </div>
                    <div className="vial-name-tag text-[9px] text-[#f3e5d0] mt-2 font-medium text-center truncate max-w-[60px]">
                      {scent?.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="discovery-box-footer border-t border-[rgba(212,175,55,0.1)] pt-3 text-center">
                <span className="text-[10px] text-[#d4af37] tracking-[1px] font-medium">
                  BONUS VOUCHER RP 20.000 DIDALAM KOTAK
                </span>
              </div>
            </div>
          </div>

          {/* Controls & Scent Selection */}
          <div className="discovery-controls-wrap lg:col-span-6 space-y-5">
            {/* Tier Tabs */}
            <div className="discovery-tier-tabs grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`p-3 rounded-xl border text-left transition-all ${
                  tier === 'trio'
                    ? 'border-[#d4af37] bg-[rgba(212,175,55,0.12)]'
                    : 'border-[rgba(212,175,55,0.15)] bg-transparent hover:border-[rgba(212,175,55,0.3)]'
                }`}
                onClick={() => handleTierChange('trio')}
              >
                <div className="tab-title text-xs font-semibold text-[#f3e5d0]">TRIO DISCOVERY</div>
                <div className="tab-sub text-[10px] text-[#a89278]">3 Varian x 5ml · Rp 45.000</div>
              </button>
              <button
                type="button"
                className={`p-3 rounded-xl border text-left transition-all ${
                  tier === 'complete'
                    ? 'border-[#d4af37] bg-[rgba(212,175,55,0.12)]'
                    : 'border-[rgba(212,175,55,0.15)] bg-transparent hover:border-[rgba(212,175,55,0.3)]'
                }`}
                onClick={() => handleTierChange('complete')}
              >
                <div className="tab-title text-xs font-semibold text-[#f3e5d0]">ALL VARIANT MASTER BOX</div>
                <div className="tab-sub text-[10px] text-[#a89278]">5 Varian x 5ml · Rp 75.000</div>
              </button>
            </div>

            {/* Selection Counter */}
            <div className="discovery-selection-status flex justify-between items-center text-xs">
              <span className="status-label text-[#a89278]">PILIH VARIAN AROMA ANDA:</span>
              <span className="counter-badge font-semibold text-[#d4af37]">
                {selectedScents.length} / {maxScents} Terpilih
              </span>
            </div>

            {/* Scent Chips Grid */}
            <div className="discovery-scent-grid space-y-2">
              {DISCOVERY_OPTIONS.map(opt => {
                const isSelected = selectedScents.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    className={`discovery-scent-chip p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#d4af37] bg-[rgba(212,175,55,0.1)]'
                        : 'border-[rgba(212,175,55,0.1)] bg-[rgba(16,9,4,0.4)] hover:border-[rgba(212,175,55,0.3)]'
                    }`}
                    onClick={() => handleToggleScent(opt.id)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: opt.color }} />
                      <div>
                        <div className="text-xs font-semibold text-[#f3e5d0]">{opt.fullName}</div>
                        <div className="text-[10px] text-[#8c7862]">{opt.notes}</div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                      isSelected ? 'bg-[#d4af37] text-[#120803] border-[#d4af37]' : 'border-[rgba(212,175,55,0.3)]'
                    }`}>
                      {isSelected && '✓'}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary & Buttons */}
            <div className="discovery-summary-box border-t border-[rgba(212,175,55,0.15)] pt-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a89278]">TOTAL HARGA DISCOVERY SET</span>
                <span className="text-lg font-semibold text-[#d4af37]">{formatRupiah(totalPrice)}</span>
              </div>

              <div className="discovery-action-buttons flex flex-col sm:flex-row gap-2">
                <Button variant="solid" onClick={handleAddToCartClick} className="flex-1">
                  TAMBAH KE KERANJANG
                </Button>
                <Button variant="outline" onClick={handleBuyWA} className="flex-1">
                  BELI VIA WHATSAPP
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
