import React from 'react';

const Input = ({ 
  label, 
  error, 
  helperText, 
  required = false, 
  className = '',
  ...props 
}) => {
  const inputClasses = `
    w-full p-2 border rounded-md transition-colors
    focus:ring-blue-500 focus:border-blue-500 
    dark:bg-gray-700 dark:text-white
    ${error 
      ? 'border-red-300 dark:border-red-600' 
      : 'border-gray-300 dark:border-gray-600'
    }
    ${className}
  `.trim();

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        className={inputClasses}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
};

export default Input;