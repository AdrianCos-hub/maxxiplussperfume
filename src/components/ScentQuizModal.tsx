import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { PerfumeProduct } from '../types';
import { perfumes, formatRupiah } from '../data/perfumes';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: PerfumeProduct) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{
    vibe?: string;
    gender?: string;
    longevity?: string;
  }>({});

  const questions = [
    {
      title: 'Kapan Anda paling sering memakai parfum ini?',
      options: [
        { label: 'Bekerja di kantor ber-AC, rapat, atau acara formal', value: 'formal', target: 'Woody Spicy' },
        { label: 'Kencan santai, hangout, atau aktivitas harian', value: 'casual', target: 'Floral Sweet' },
        { label: 'Pesta mewah, event bergengsi, atau wangi tahan 24 jam', value: 'luxury', target: 'Warm Amber' },
      ],
    },
    {
      title: 'Karakter aroma yang paling mencerminkan diri Anda?',
      options: [
        { label: 'Maskulin, kayu hangat, rempah tegas & berkarakter', value: 'Pria' },
        { label: 'Manis lembut, segar, anggun & mempesona', value: 'Wanita' },
        { label: 'Eksklusif, oriental amber, saffron & memikat siapa saja', value: 'Unisex' },
      ],
    },
    {
      title: 'Berapa lama ketahanan aroma yang Anda harapkan?',
      options: [
        { label: '8 - 12 Jam (Standar harian nyaman)', value: 'edp' },
        { label: 'Hingga 24 Jam (Konsentrasi Extrait tertinggi)', value: 'extrait' },
      ],
    },
  ];

  const handleSelectOption = (index: number, optionVal: string) => {
    const newAnswers = { ...answers };
    if (step === 0) newAnswers.vibe = optionVal;
    if (step === 1) newAnswers.gender = optionVal;
    if (step === 2) newAnswers.longevity = optionVal;

    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length); // Results screen
    }
  };

  // Determine recommendation
  let recommendedProduct = perfumes[0];
  if (answers.gender === 'Wanita') {
    recommendedProduct = perfumes.find((p) => p.gender === 'Wanita') || perfumes[1];
  } else if (answers.longevity === 'extrait' || answers.gender === 'Unisex') {
    recommendedProduct = perfumes.find((p) => p.id === 'mxp-grand-heritage') || perfumes[2];
  } else {
    recommendedProduct = perfumes.find((p) => p.id === 'mxp-royale-noir') || perfumes[0];
  }

  const handleReset = () => {
    setStep(0);
    setAnswers({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-rise">
      <div className="relative w-full max-w-xl liquid-glass rounded-3xl p-6 sm:p-8 text-foreground border border-white/10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {step < questions.length ? (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-2">
              <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Panduan Aroma • Langkah {step + 1} dari {questions.length}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-6">
              <div
                className="bg-white h-full transition-all duration-300"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h3
              className="text-2xl sm:text-3xl font-normal leading-tight text-foreground mb-6"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {questions[step].title}
            </h3>

            <div className="space-y-3">
              {questions[step].options.map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx, opt.value)}
                  className="w-full text-left p-4 rounded-2xl liquid-glass border border-white/5 hover:border-white/20 hover:scale-[1.01] transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="text-sm font-medium text-foreground pr-4">
                    {opt.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="text-center py-4">
            <span className="text-xs uppercase tracking-widest text-muted-foreground block mb-1">
              Rekomendasi Persona Anda
            </span>
            <h3
              className="text-3xl sm:text-4xl font-normal text-foreground mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {recommendedProduct.name}
            </h3>
            <p className="text-xs text-muted-foreground italic mb-6">
              {recommendedProduct.tagline}
            </p>

            <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black/30">
              <img
                src={recommendedProduct.image}
                alt={recommendedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
              {recommendedProduct.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => {
                  onSelectProduct(recommendedProduct);
                  onClose();
                }}
                className="liquid-glass rounded-full px-8 py-3 text-sm text-foreground hover:scale-[1.03] transition-transform duration-300 font-medium"
              >
                Lihat Detail Parfum • {formatRupiah(recommendedProduct.variants[0].price)}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 text-xs text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
