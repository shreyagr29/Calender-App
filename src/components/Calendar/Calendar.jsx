import React from 'react';
import { useCalendar } from '../../context/CalenderContext';
import CalendarGrid from './CalendarGrid';
import CalendarList from './CalendarList';

const Calendar = () => {
  const { viewMode } = useCalendar();

  return (
    <div className="calendar-container">
      {viewMode === 'grid' ? <CalendarGrid /> : <CalendarList />}
    </div>
  );
};

export default Calendar;