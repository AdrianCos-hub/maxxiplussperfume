import React from 'react';
import { X, MapPin, ExternalLink, Leaf, Award } from 'lucide-react';

interface OutletsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OutletsModal: React.FC<OutletsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-rise">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto liquid-glass rounded-3xl p-6 sm:p-8 text-foreground border border-white/10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-1">
          Kunjungan Gerai & Cerita Brand
        </span>
        <h3
          className="text-3xl sm:text-4xl font-normal text-foreground mb-4"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Filosofi & Gerai Fisik
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          <strong>Maxxipluss® Perfume</strong> diracik dengan penuh ketelitian di pesisir Painan,
          Sumatera Barat. Kami memadukan kekayaan rempah alami Indonesia—seperti kayu manis nusantara,
          cengkeh pesisir, dan vanila lembut—dengan teknik maserasi modern untuk menghasilkan aroma berkelas
          tinggi yang bertahan lama.
        </p>

        {/* Story Pill */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="liquid-glass rounded-2xl p-4 border border-white/5 flex items-start gap-3">
            <Leaf className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold mb-0.5">Rempah Murni Alami</div>
              <div className="text-xs text-muted-foreground">Dipanen langsung dari tanah Sumatera Barat.</div>
            </div>
          </div>
          <div className="liquid-glass rounded-2xl p-4 border border-white/5 flex items-start gap-3">
            <Award className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold mb-0.5">Konsentrasi Ekstrak</div>
              <div className="text-xs text-muted-foreground">Eau de Parfum & Extrait tahan hingga 24 Jam.</div>
            </div>
          </div>
        </div>

        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">
          Lokasi Gerai Resmi:
        </div>

        <div className="space-y-3">
          {/* Outlet Painan */}
          <div className="liquid-glass rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold">Outlet Painan (Atelier Pusat)</div>
                <div className="text-xs text-muted-foreground">
                  Pusat Kota Painan, Kabupaten Pesisir Selatan, Sumatera Barat
                </div>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Outlet+Maxxipluss+Painan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-foreground transition-all shrink-0"
            >
              <span>Buka di Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Outlet Kambang */}
          <div className="liquid-glass rounded-2xl p-4 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold">Outlet Kambang</div>
                <div className="text-xs text-muted-foreground">
                  Jln. Raya Lintas Padang – Bengkulu, Kambang, Pesisir Selatan
                </div>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Jln+Raya+Padang+Bengkulu+Kambang"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-white/30 text-foreground transition-all shrink-0"
            >
              <span>Buka di Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
