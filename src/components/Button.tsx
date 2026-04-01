import React from 'react';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'whatsapp';
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'text-white shadow-sm hover:shadow-md',
  secondary:
    'bg-white text-white hover:opacity-90 active:opacity-80',
  whatsapp:
    'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-sm hover:shadow-md',
};

export default function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const variantStyle: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
    primary: { background: 'linear-gradient(135deg, var(--brand-mauve) 0%, var(--brand-deep) 100%)', boxShadow: '0 2px 12px rgba(42,12,31,0.25)' },
    secondary: { background: 'linear-gradient(135deg, var(--brand-pink) 0%, var(--brand-rose) 100%)', boxShadow: '0 2px 12px rgba(232,123,191,0.3)' },
    whatsapp: {},
  };
  const focusRing: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary: 'focus-visible:ring-[var(--brand-mauve)]',
    secondary: 'focus-visible:ring-[var(--brand-pink)]',
    whatsapp: 'focus-visible:ring-emerald-400',
  };
  const classes = `${base} ${variantClasses[variant]} ${focusRing[variant]} ${className}`;
  const style = variantStyle[variant];

  if (href) {
    return (
      <a href={href} className={classes} style={style} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} style={style}>
      {children}
    </button>
  );
}
