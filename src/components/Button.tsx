import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined';
  color?: 'blue' | 'red' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  color = 'blue',
  size = 'md',
  className,
  ...props
}) => {
  const baseStyles =
    'rounded-xl transition-all duration-300 ease-in-out focus:outline-none';

  const sizeStyles: Record<string, string> = {
    sm: 'text-sm px-3 py-2',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3',
  };

  const variants: Record<string, Record<string, string>> = {
    contained: {
      blue: 'bg-blue-950 text-white hover:shadow-blue-600/30 hover:shadow-lg',
      red: 'bg-red-600 text-white hover:shadow-red-600/30 hover:shadow-lg',
      gray: 'bg-gray-600 text-white hover:shadow-gray-600/30 hover:shadow-lg',
    },
    outlined: {
      blue: 'border-2 border-blue-950 text-blue-950 hover:shadow-blue-600/30 hover:shadow-lg',
      red: 'border-2 border-red-600 text-red-600 hover:shadow-red-600/30 hover:shadow-lg',
      gray: 'border-2 border-gray-600 text-gray-600 hover:shadow-gray-600/30 hover:shadow-lg',
    },
  };

  const variantStyles = variants[variant][color];
  const sizeClass = sizeStyles[size];

  return (
    <button
      className={clsx(baseStyles, variantStyles, sizeClass, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
