import React, { useId, forwardRef } from 'react';
import clsx from 'clsx';

const Input = forwardRef(function Input(
  {
    label,
    type = 'text',
    className = '',
    ...props
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-gray-600"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={clsx(
          'w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'transition duration-150 ease-in-out',
          className
        )}
        {...props}
      />
    </div>
  );
});

export default Input;
