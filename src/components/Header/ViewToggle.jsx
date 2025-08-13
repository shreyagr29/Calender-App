import React from 'react';
import { Calendar, List } from 'lucide-react';
import { useCalendar } from '../../context/CalenderContext';

const ViewToggle = () => {
  const { viewMode, setViewMode } = useCalendar();

  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-md ${
          viewMode === 'grid'
            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow'
            : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        <Calendar className="w-5 h-5" />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md ${
          viewMode === 'list'
            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow'
            : 'text-gray-600 dark:text-gray-300'
        }`}
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ViewToggle;