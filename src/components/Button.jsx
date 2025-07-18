import React from 'react';
import clsx from 'clsx';

function Button({
  children,
  type = 'button',
  variant = 'primary', // options: primary, outline, subtle
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus-visible:ring-2 transition duration-150 ease-in-out';

  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-500',
    outline: 'border border-gray-300 text-gray-900 bg-white hover:bg-gray-50 focus-visible:ring-gray-500',
    subtle: 'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-400',
  };

  return (
    <button
      type={type}
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
