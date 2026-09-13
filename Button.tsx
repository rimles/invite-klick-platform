import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[#482337] text-white hover:bg-[#3a1c2c] shadow-sm shadow-[#482337]/20',
  secondary: 'bg-[#F4EFE9] text-[#241A1C] hover:bg-[#EADFCF]',
  outline: 'bg-transparent text-[#241A1C] border border-[#E9E1D8] hover:border-[#482337]/40 hover:bg-[#FBF8F5]',
  ghost: 'bg-transparent text-[#6F6467] hover:text-[#241A1C] hover:bg-[#F4EFE9]',
  danger: 'bg-transparent text-[#9A4A4A] border border-[#E9E1D8] hover:bg-[#FBF3F3]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg',
  md: 'text-sm px-4 py-2.5 gap-2 rounded-xl',
  lg: 'text-base px-6 py-3.5 gap-2.5 rounded-xl',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  fullWidth,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center font-medium transition-all duration-200 whitespace-nowrap',
        'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

export function IconButton({
  children,
  className = '',
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center w-9 h-9 rounded-full text-[#6F6467]',
        'hover:bg-[#F4EFE9] hover:text-[#241A1C] transition-colors duration-150',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
