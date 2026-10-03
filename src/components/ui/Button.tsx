/**
 * Maxxipluss Perfume - Reusable Gold/Brass Buttons
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium uppercase tracking-[1.8px] text-[11px] transition-all duration-300 rounded-full cursor-pointer select-none px-6 py-3 min-h-[44px]";
  
  const variants = {
    solid: "bg-gradient-to-r from-[#d4af37] via-[#f0c850] to-[#b89228] text-[#120803] font-semibold hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.02] active:scale-[0.98]",
    outline: "border border-[rgba(212,175,55,0.4)] text-[#f3e5d0] hover:border-[#d4af37] hover:bg-[rgba(212,175,55,0.1)] hover:text-white active:scale-[0.98]",
    ghost: "text-[#d4af37] hover:text-white hover:bg-[rgba(212,175,55,0.08)]"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
