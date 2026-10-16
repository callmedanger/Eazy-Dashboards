import React from 'react';
import { BRAND_NAME } from '../config/siteConfig';

interface LogoProps {
  variant?: 'color' | 'white' | 'dark';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'color',
  className = '',
  showText = true,
  size = 'md',
}) => {
  const sizeMap = {
    sm: { img: 'h-7', text: 'text-base' },
    md: { img: 'h-9', text: 'text-xl' },
    lg: { img: 'h-12', text: 'text-2xl' },
    xl: { img: 'h-16', text: 'text-3xl' },
  };

  const isWhite = variant === 'white';
  const logoSrc = isWhite ? '/logo-white.png' : '/logo-transparent.png';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src={logoSrc}
        alt={BRAND_NAME}
        className={`${sizeMap[size].img} w-auto object-contain transition-opacity duration-200`}
        loading="eager"
      />
      {showText && (
        <span
          className={`font-display font-extrabold tracking-display leading-tightest ${sizeMap[size].text} ${
            isWhite ? 'text-white' : 'text-navy'
          }`}
        >
          Eazy<span className={isWhite ? 'text-[#1BA6A6]' : 'text-teal'}> Dashboard</span>
        </span>
      )}
    </div>
  );
};
