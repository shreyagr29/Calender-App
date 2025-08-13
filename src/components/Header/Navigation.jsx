import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '../../context/CalenderContext';
import { monthNames } from '../../utils/dateUtils';

const Navigation = () => {
  const { currentDate, navigateMonth } = useCalendar();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => navigateMonth(-1)}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 min-w-48 text-center">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      
      <button
        onClick={() => navigateMonth(1)}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Navigation;