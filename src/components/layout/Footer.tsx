import React from 'react';

export interface FooterProps {
  onOpenOutlets?: () => void;
  onOpenQuiz?: () => void;
  onSelectKoleksi?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOutlets,
  onOpenQuiz,
  onSelectKoleksi,
}) => {
  return (
    <footer className="w-full bg-[#000d1a] border-t border-white/10 text-white/70 py-16 px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-2xl font-serif text-white tracking-wide">MAXXIPLUSS<sup>®</sup></h3>
          <p className="text-xs leading-relaxed text-white/60">
            Pioneer wewangian botani rempah alami khas Painan, Sumatera Barat. Diracik dengan konsentrasi tinggi untuk daya tahan hingga 24 jam.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Navigasi</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={onSelectKoleksi} className="hover:text-white transition-colors">
                Koleksi Utama
              </button>
            </li>
            <li>
              <button onClick={onOpenQuiz} className="hover:text-white transition-colors">
                Panduan Aroma (Quiz)
              </button>
            </li>
            <li>
              <button onClick={onOpenOutlets} className="hover:text-white transition-colors">
                Gerai Fisik Painan & Kambang
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Layanan Pelanggan</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="https://wa.me/6282284033320" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Layanan WhatsApp Resmi
              </a>
            </li>
            <li>Pengiriman Seluruh Indonesia (J&T, SiCepat, JNE)</li>
            <li>Jaminan Produk 100% Original</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Gerai Utama</h4>
          <p className="text-xs leading-relaxed text-white/60 mb-2">
            📍 Jl. Salido - Painan, Pesisir Selatan, Sumatera Barat 25611
          </p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} MAXXIPLUSS Perfume. Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
