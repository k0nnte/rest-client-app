import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  color?: 'blue' | 'red' | 'gray';
  width?: 'full' | 'half' | 'auto';
  direction?: 'vertical' | 'horizontal';
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  color = 'blue',
  width = 'full',
  direction = 'vertical',
  className,
  ...props
}) => {
  const baseStyles = 'p-3 rounded-xl border transition focus:outline-none';

  const colorStyles: Record<string, string> = {
    blue: 'border-2 border-blue-950 focus:ring-1 focus:ring-blue-950 focus:shadow-blue-600/30 focus:shadow-lg',
    red: 'border-red-600 text-white focus:ring-2 focus:ring-red-500 focus:shadow-red-600/30 focus:shadow-lg',
    gray: 'border-gray-600 text-white focus:ring-2 focus:ring-gray-500 focus:shadow-gray-600/30 focus:shadow-lg',
  };

  const widthStyles: Record<string, string> = {
    full: 'w-full',
    half: 'w-1/2',
    auto: 'w-auto',
  };

  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={clsx(
        widthStyles[width],
        'mb-4',
        isHorizontal ? 'flex items-center gap-2' : 'flex flex-col'
      )}
    >
      {label && <label className="font-semibold text-gray-700">{label}</label>}
      <div className="flex flex-col w-full">
        <input
          className={clsx(baseStyles, colorStyles[color], className)}
          {...props}
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default Input;
