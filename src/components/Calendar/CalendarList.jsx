import React, { useState } from 'react';
import { Plus, MapPin } from 'lucide-react';
import { useCalendar } from '../../context/CalenderContext';
import { useEvents } from '../../context/EventContext';
import { getDaysInMonth, dayNames, monthNames, isToday } from '../../utils/dateUtils';
import EventDetails from '../EventDetails';
import EventModal from '../EventModal';

const CalendarList = () => {
  const { currentDate, selectDate } = useCalendar();
  const { getEventsForDate } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [modalDate, setModalDate] = useState(null);

  const daysInMonth = getDaysInMonth(currentDate);
  const days = [];

  const openEventModal = (date) => {
    setModalDate(date);
    selectDate(date);
    setShowEventModal(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayEvents = getEventsForDate(date);
    const todayClass = isToday(date);

    days.push(
      <div
        key={day}
        className={`border-b border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
          todayClass ? 'bg-blue-50 dark:bg-blue-900' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className={`text-lg font-medium ${
            todayClass ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
          }`}>
            {dayNames[date.getDay()]}, {monthNames[date.getMonth()]} {day}
          </div>
          <button
            onClick={() => openEventModal(date)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        {dayEvents.length > 0 ? (
          <div className="mt-3 space-y-2">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleEventClick(event)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {event.startTime} - {event.endTime}
                  </span>
                </div>
                {event.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{event.description}</p>
                )}
                {event.location && (
                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    {event.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm italic">No events</p>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
        {days}
      </div>

      {showEventDetails && selectedEvent && (
        <EventDetails
          event={selectedEvent}
          isOpen={showEventDetails}
          onClose={() => setShowEventDetails(false)}
        />
      )}

      {showEventModal && (
        <EventModal
          isOpen={showEventModal}
          onClose={() => setShowEventModal(false)}
          initialDate={modalDate}
        />
      )}
    </>
  );
};

export default CalendarList;