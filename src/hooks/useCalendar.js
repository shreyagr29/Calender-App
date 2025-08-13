import { useState, useCallback } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../utils/dateUtils';

export const useCalendar = (initialDate = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDate, setSelectedDate] = useState(null);

  const navigateMonth = useCallback((direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  }, []);

  const goToMonth = useCallback((year, month) => {
    setCurrentDate(new Date(year, month, 1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  }, []);

  const goToDate = useCallback((date) => {
    setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    setSelectedDate(date);
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  }, []);

  const selectDate = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const getCalendarData = useCallback(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    
    const days = [];
    const today = new Date();

    // Previous month's trailing days
    const prevMonth = new Date(year, month - 1, 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
        isPrevMonth: true,
        isNextMonth: false,
        isToday: false
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push({
        day,
        date,
        isCurrentMonth: true,
        isPrevMonth: false,
        isNextMonth: false,
        isToday: date.toDateString() === today.toDateString()
      });
    }

    // Next month's leading days (to fill the grid)
    const totalCells = Math.ceil(days.length / 7) * 7;
    const remainingCells = totalCells - days.length;
    
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        date: new Date(year, month + 1, day),
        isCurrentMonth: false,
        isPrevMonth: false,
        isNextMonth: true,
        isToday: false
      });
    }

    return days;
  }, [currentDate]);

  const isDateSelected = useCallback((date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  }, [selectedDate]);

  return {
    currentDate,
    viewMode,
    selectedDate,
    navigateMonth,
    goToMonth,
    goToToday,
    goToDate,
    toggleViewMode,
    selectDate,
    setViewMode,
    getCalendarData,
    isDateSelected
  };
};