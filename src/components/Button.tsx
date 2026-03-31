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
    'bg-pink-500 hover:bg-pink-600 text-white',
  secondary:
    'bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-50',
  whatsapp:
    'bg-green-500 hover:bg-green-600 text-white',
};

export default function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition duration-300 cursor-pointer';
  const classes = `${base} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
