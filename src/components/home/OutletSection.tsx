import React from 'react';

export const OutletSection: React.FC = () => {
  return (
    <section id="outlets" className="py-20 px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Kunjungi Langsung</span>
        <h2 className="text-4xl sm:text-5xl font-serif text-white mt-2">Gerai Fisik MAXXIPLUSS</h2>
        <p className="text-sm text-white/60 max-w-xl mx-auto mt-3">
          Nikmati sensasi meracik dan mencoba langsung koleksi parfum botani kami di outlet resmi Sumatera Barat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="liquid-glass rounded-3xl p-8 border border-white/10 space-y-4">
          <span className="text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
            Outlet Utama
          </span>
          <h3 className="text-2xl font-serif text-white">Gerai Fisik Painan</h3>
          <p className="text-xs text-white/70 leading-relaxed">
            📍 Jl. Salido - Painan, Pesisir Selatan, Sumatera Barat 25611
          </p>
          <p className="text-xs text-white/50">Jam Operasional: Setiap Hari 08.00 - 21.00 WIB</p>
          <a
            href="https://wa.me/6282284033320?text=Halo%20Admin,%20saya%20ingin%20menanyakan%20lokasi%20Outlet%20Painan"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-xs font-medium bg-white text-black px-6 py-2.5 rounded-full hover:bg-white/90 transition-all"
          >
            Hubungi Outlet Painan Via WA
          </a>
        </div>

        <div className="liquid-glass rounded-3xl p-8 border border-white/10 space-y-4">
          <span className="text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
            Outlet Cabang
          </span>
          <h3 className="text-2xl font-serif text-white">Gerai Fisik Kambang</h3>
          <p className="text-xs text-white/70 leading-relaxed">
            📍 Pasar Kambang, Pesisir Selatan, Sumatera Barat 25661
          </p>
          <p className="text-xs text-white/50">Jam Operasional: Setiap Hari 08.00 - 21.00 WIB</p>
          <a
            href="https://wa.me/6282284033320?text=Halo%20Admin,%20saya%20ingin%20menanyakan%20lokasi%20Outlet%20Kambang"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-xs font-medium bg-white text-black px-6 py-2.5 rounded-full hover:bg-white/90 transition-all"
          >
            Hubungi Outlet Kambang Via WA
          </a>
        </div>
      </div>
    </section>
  );
};

export default OutletSection;
