import React, { useState } from 'react';
import { useCalendar } from '../../context/CalenderContext';
import { useEvents } from '../../context/EventContext';
import { getDaysInMonth, getFirstDayOfMonth, dayNames, isToday } from '../../utils/dateUtils';
import EventDetails from '../EventDetails';

const CalendarGrid = () => {
  const { currentDate, selectDate } = useCalendar();
  const { getEventsForDate } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = [];

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    selectDate(clickedDate);
    const dayEvents = getEventsForDate(clickedDate);
    if (dayEvents.length > 0) {
      setSelectedEvent(dayEvents[0]);
      setShowEventDetails(true);
    }
  };

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div key={`empty-${i}`} className="h-32 border border-gray-200 dark:border-gray-700"></div>
    );
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayEvents = getEventsForDate(date);
    const todayClass = isToday(date);

    days.push(
      <div
        key={day}
        className={`h-32 border border-gray-200 dark:border-gray-700 p-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
          todayClass ? 'bg-blue-50 dark:bg-blue-900' : ''
        }`}
        onClick={() => handleDateClick(day)}
      >
        <div className={`text-sm font-medium ${
          todayClass ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'
        }`}>
          {day}
        </div>
        <div className="mt-1 space-y-1">
          {dayEvents.slice(0, 3).map(event => (
            <div
              key={event.id}
              className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1 py-0.5 rounded truncate"
            >
              {event.startTime} {event.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              +{dayEvents.length - 3} more
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-7 gap-0 border border-gray-200 dark:border-gray-700">
        {dayNames.map(day => (
          <div key={day} className="bg-gray-50 dark:bg-gray-800 p-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            {day}
          </div>
        ))}
        {days}
      </div>

      {showEventDetails && selectedEvent && (
        <EventDetails
          event={selectedEvent}
          isOpen={showEventDetails}
          onClose={() => setShowEventDetails(false)}
        />
      )}
    </>
  );
};

export default CalendarGrid;