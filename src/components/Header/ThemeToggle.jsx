import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-full transition-colors duration-300 
                 hover:bg-gray-200 dark:hover:bg-gray-700 
                 text-yellow-500 dark:text-blue-400"
    >
      <span className="transition-transform duration-300 ease-in-out">
        {darkMode ? (
          <Sun className="w-5 h-5 rotate-0 scale-100 transition-transform" />
        ) : (
          <Moon className="w-5 h-5 rotate-0 scale-100 transition-transform" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
