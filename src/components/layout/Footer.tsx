/**
 * Maxxipluss Perfume - Footer & Legal Text Component
 */

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-editorial bg-[#0c0603] border-t border-[rgba(212,175,55,0.12)] pt-16 pb-10 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-start gap-8">
        <div>
          <div className="text-lg font-serif font-bold text-[#f3e5d0] tracking-[2px] mb-2">
            MAXXIPLUSS PERFUME
          </div>
          <p className="text-xs text-[#a89278] max-w-md leading-relaxed">
            Haute Parfumerie berbasis ekstrak rempah botani alami asal Painan, Pesisir Selatan, Sumatera Barat. Meracik harmoni kayu manis, cengkeh pesisir, dan resin hangat berkualitas tinggi.
          </p>
        </div>

        <div className="flex gap-3 items-center">
          <a
            href="https://wa.me/6282284033320"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon-btn w-10 h-10 rounded-full border border-[rgba(212,175,55,0.3)] hover:border-[#d4af37] bg-[rgba(212,175,55,0.08)] flex items-center justify-center text-[#d4af37] hover:text-white transition-all"
            aria-label="WhatsApp Resmi Maxxipluss"
            title="Hubungi WhatsApp Resmi"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.905.534 3.687 1.458 5.216L2 22l4.908-1.428A10.01 10.01 0 0 0 12.031 22C17.567 22 22 17.505 22 12.031 22 6.495 17.567 2 12.031 2zm5.795 14.53c-.244.686-1.422 1.319-1.956 1.365-.515.044-1.189.062-3.83-1.028-3.177-1.31-5.215-4.544-5.374-4.756-.157-.212-1.28-1.705-1.28-3.253 0-1.547.81-2.308 1.097-2.622.288-.315.629-.393.839-.393.209 0 .419.002.602.012.194.01.453-.074.708.539.263.63.896 2.19.974 2.35.078.16.13.348.025.56-.104.212-.157.348-.313.535-.157.186-.33.415-.47.558-.157.158-.322.33-.138.647.184.316.818 1.349 1.755 2.184 1.205 1.074 2.22 1.406 2.535 1.564.315.157.498.131.682-.08.184-.21.785-.914.994-1.228.21-.314.419-.262.707-.156.289.105 1.832.864 2.146 1.021.314.157.524.236.602.367.079.131.079.76-.165 1.446z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com/maxxiplussperfumesofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-icon-btn w-10 h-10 rounded-full border border-[rgba(212,175,55,0.3)] hover:border-[#d4af37] bg-[rgba(212,175,55,0.08)] flex items-center justify-center text-[#d4af37] hover:text-white transition-all"
            aria-label="Instagram Resmi Maxxipluss"
            title="Kunjungi Instagram Resmi"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[rgba(212,175,55,0.1)] mt-10 pt-6 text-[11px] text-[#8c7862] text-center">
        * Diracik di Painan, Sumatera Barat menggunakan rempah botani lokal pilihan. © 2026 Maxxipluss Perfume. All rights reserved.
      </div>
    </footer>
  );
};
