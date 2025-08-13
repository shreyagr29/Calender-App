import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCalendar } from '../../context/CalenderContext';
import Navigation from './Navigation';
import ViewToggle from './ViewToggle';
import ThemeToggle from './ThemeToggle';
import EventModal from '../EventModal';

const Header = () => {
  const { currentDate } = useCalendar();
  const [showEventModal, setShowEventModal] = useState(false);

  const openEventModal = () => {
    setShowEventModal(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendar</h1>
          <Navigation />
        </div>

        <div className="flex items-center space-x-4">
          <ViewToggle />
          <ThemeToggle />
          
          <button
            onClick={openEventModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {showEventModal && (
        <EventModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
        />
      )}
    </>
  );
};

export default Header;