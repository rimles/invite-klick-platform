import React from 'react';

export function Card({
  children,
  className = '',
  padded = true,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={[
        'bg-white rounded-2xl border border-[#E9E1D8]',
        padded ? 'p-5' : '',
        hover ? 'transition-all duration-200 hover:shadow-[0_8px_24px_-8px_rgba(72,35,55,0.12)] hover:-translate-y-0.5' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = '',
  align = 'left',
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`${align === 'center' ? 'text-center mx-auto' : ''} ${className}`}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#7A2E42] mb-3">{eyebrow}</p>
      )}
      <h2 className="font-serif text-[2rem] sm:text-[2.5rem] leading-[1.1] text-[#241A1C]">{title}</h2>
      {subtitle && <p className="mt-4 text-[#6F6467] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
