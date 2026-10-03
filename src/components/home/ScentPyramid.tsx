import React from 'react';
import { FragranceNotes } from '../../types';

interface ScentPyramidProps {
  notes?: FragranceNotes;
}

export const ScentPyramid: React.FC<ScentPyramidProps> = ({ notes }) => {
  if (!notes) return null;

  return (
    <div className="space-y-4 p-6 liquid-glass rounded-2xl border border-white/10 text-white">
      <h4 className="text-sm font-semibold tracking-wider uppercase text-white/80 mb-2">Piramida Aroma</h4>

      <div className="space-y-3 text-xs">
        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <span className="font-semibold text-amber-300 block mb-1">Top Notes (Awal Spray)</span>
          <p className="text-white/80">{notes.top.join(' • ')}</p>
        </div>

        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <span className="font-semibold text-amber-400 block mb-1">Heart Notes (Jantung Utama)</span>
          <p className="text-white/80">{notes.heart.join(' • ')}</p>
        </div>

        <div className="p-3 bg-white/5 rounded-xl border border-white/5">
          <span className="font-semibold text-amber-500 block mb-1">Base Notes (Aroma Bertahan)</span>
          <p className="text-white/80">{notes.base.join(' • ')}</p>
        </div>
      </div>
    </div>
  );
};

export default ScentPyramid;
