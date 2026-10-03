/**
 * Maxxipluss Perfume - OutletSection Component (Painan & Kambang Physical Stores)
 */

import React from 'react';

export const OutletSection: React.FC = () => {
  return (
    <section id="outlets" className="editorial-section-block py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-left motion-reveal mb-10">
        <div className="text-[11px] text-[#a89278] tracking-[2px] uppercase mb-2">
          GERAI FISIK RESMI
        </div>
        <h2 className="heading-title text-2xl sm:text-4xl font-serif text-[#f3e5d0] mb-3">
          KUNJUNGI GERAI RESMI MAXXIPLUSS.
        </h2>
        <p className="editorial-body text-xs sm:text-sm text-[#a89278] leading-relaxed">
          Nikmati pengalaman meracik & menguji wewangian botani rempah secara langsung pada kulit Anda di gerai fisik resmi kami.
        </p>
      </div>

      <div className="outlets-editorial-grid grid grid-cols-1 md:grid-cols-2 gap-6 motion-reveal">
        {/* Outlet Painan */}
        <div className="outlet-box bg-[rgba(22,13,8,0.28)] backdrop-blur-md border border-[rgba(212,175,55,0.12)] rounded-2xl p-8 hover:border-[rgba(212,175,55,0.35)] transition-all">
          <div className="text-[10px] text-[#a89278] tracking-[1.5px] mb-2">LOKASI 01</div>
          <h3 className="text-xl font-serif text-[#f3e5d0] mb-2">OUTLET PAINAN</h3>
          <p className="text-xs text-[#a89278] leading-relaxed mb-6">
            Pusat Kota Painan, Kabupaten Pesisir Selatan, Sumatera Barat.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Outlet+Maxxipluss+Painan"
            target="_blank"
            rel="noopener noreferrer"
            className="outlet-maps-link inline-flex items-center text-[11.5px] font-medium tracking-[1.5px] uppercase text-[#d4af37] hover:text-white transition-colors"
          >
            <span>BUKA GOOGLE MAPS</span>
          </a>
        </div>

        {/* Outlet Kambang */}
        <div className="outlet-box bg-[rgba(22,13,8,0.28)] backdrop-blur-md border border-[rgba(212,175,55,0.12)] rounded-2xl p-8 hover:border-[rgba(212,175,55,0.35)] transition-all">
          <div className="text-[10px] text-[#a89278] tracking-[1.5px] mb-2">LOKASI 02</div>
          <h3 className="text-xl font-serif text-[#f3e5d0] mb-2">OUTLET KAMBANG</h3>
          <p className="text-xs text-[#a89278] leading-relaxed mb-6">
            Jln. Raya Lintas Padang – Bengkulu, Kambang, Pesisir Selatan.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Jln+Raya+Padang+Bengkulu+Kambang"
            target="_blank"
            rel="noopener noreferrer"
            className="outlet-maps-link inline-flex items-center text-[11.5px] font-medium tracking-[1.5px] uppercase text-[#d4af37] hover:text-white transition-colors"
          >
            <span>BUKA GOOGLE MAPS</span>
          </a>
        </div>
      </div>
    </section>
  );
};
