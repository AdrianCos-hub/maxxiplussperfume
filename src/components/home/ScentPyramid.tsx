/**
 * Maxxipluss Perfume - ScentPyramid Component (Interactive Scent Quiz & Character Guide)
 */

import React, { useState } from 'react';
import { scentQuizQuestions, productsData } from '../../data/products';
import { Product } from '../../types';

interface ScentPyramidProps {
  onOpenDetail: (product: Product) => void;
}

export const ScentPyramid: React.FC<ScentPyramidProps> = ({ onOpenDetail }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [resultProduct, setResultProduct] = useState<Product | null>(null);

  const currentQuestion = scentQuizQuestions[currentQuestionIndex];

  const handleSelectOption = (option: any) => {
    const updatedAnswers = [...answers, option];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < scentQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate match
      const vibe = updatedAnswers[0]?.preference || 'Woody Spicy';
      const gender = updatedAnswers[1]?.gender || 'Pria';

      let match = productsData.find(p => p.gender === gender && p.category.includes(vibe));
      if (!match) {
        match = productsData.find(p => p.gender === gender) || productsData[0];
      }
      setResultProduct(match);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResultProduct(null);
  };

  return (
    <section id="scent-quiz" className="editorial-section-block py-20 px-6 sm:px-12 max-w-7xl mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-10 motion-reveal">
        <div className="text-xs tracking-[2px] text-[#a89278] uppercase mb-2">
          PANDUAN — TEMUKAN KARAKTER
        </div>
        <h2 className="heading-title text-2xl sm:text-4xl font-serif text-[#f3e5d0] mb-3">
          PANDUAN PEMILIHAN AROMA.
        </h2>
        <p className="editorial-body text-xs sm:text-sm text-[#a89278] leading-relaxed">
          Jawab 3 pertanyaan singkat di bawah ini untuk mencocokkan suasana kegiatan, karakter diri, dan ketahanan aroma yang paling sesuai dengan Anda.
        </p>
      </div>

      <div className="quiz-editorial-container max-w-2xl mx-auto bg-[rgba(22,13,8,0.35)] border border-[rgba(212,175,55,0.15)] rounded-2xl p-6 sm:p-8 motion-reveal">
        {/* Step Progress Ticks */}
        <div className="quiz-step-progress flex justify-center gap-2 mb-8">
          {[0, 1, 2].map((idx) => (
            <div
              key={idx}
              className={`step-tick h-1 flex-1 max-w-[80px] rounded-full transition-all ${
                idx <= currentQuestionIndex
                  ? 'bg-[#d4af37]'
                  : 'bg-[rgba(212,175,55,0.15)]'
              }`}
            />
          ))}
        </div>

        {!resultProduct ? (
          <div className="space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-[#f3e5d0] text-center mb-4">
              {currentQuestion.title}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className="quiz-option-strip w-full p-4 rounded-xl border border-[rgba(212,175,55,0.15)] bg-[rgba(16,9,4,0.5)] hover:border-[#d4af37] hover:bg-[rgba(212,175,55,0.1)] transition-all flex items-center gap-3 text-left group"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{opt.icon}</span>
                  <span className="text-xs sm:text-sm text-[#f3e5d0] group-hover:text-white transition-colors">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-result-editorial text-center space-y-4">
            <div className="text-[11px] tracking-[1.5px] text-ember uppercase font-semibold">
              REKOMENDASI TERKONFIRMASI — IDENTITAS AROMA ANDA
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#f3e5d0]">
              {resultProduct.name}
            </h3>
            <p className="editorial-body text-xs sm:text-sm text-[#d1c2b0] leading-relaxed max-w-lg mx-auto">
              {resultProduct.description}
            </p>

            <div className="flex justify-center gap-3 pt-4 flex-wrap">
              <button
                type="button"
                onClick={() => onOpenDetail(resultProduct)}
                className="btn-pill-solid px-6 py-2.5 text-xs tracking-[1.5px] rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89228] text-[#120803] font-semibold hover:scale-105 transition-transform"
              >
                PESAN VARIAN INI
              </button>
              <button
                type="button"
                onClick={handleResetQuiz}
                className="btn-ghost-outline px-5 py-2.5 text-xs tracking-[1.5px] rounded-full border border-[rgba(212,175,55,0.3)] text-[#f3e5d0] hover:border-[#d4af37]"
              >
                ULANGI KUIS
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
