import { useState, useCallback } from 'react';
import { validateEventData } from '../services/validation/eventValidation';

export const useEvents = (initialEvents = []) => {
  const [events, setEvents] = useState(initialEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addEvent = useCallback((eventData) => {
    const validation = validateEventData(eventData);
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    const newEvent = {
      ...eventData,
      id: Date.now().toString()
    };

    setEvents(prev => [...prev, newEvent]);
    setError(null);
    return { success: true, event: newEvent };
  }, []);

  const updateEvent = useCallback((eventId, eventData) => {
    const validation = validateEventData(eventData);
    if (!validation.isValid) {
      setError(validation.errors);
      return { success: false, errors: validation.errors };
    }

    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...eventData, id: eventId } : event
    ));
    setError(null);
    return { success: true };
  }, []);

  const deleteEvent = useCallback((eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setError(null);
    return { success: true };
  }, []);

  const getEventsForDate = useCallback((date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  }, [events]);

  const getEventsForDateRange = useCallback((startDate, endDate) => {
    const startStr = startDate.toISOString().split('T')[0];
    const endStr = endDate.toISOString().split('T')[0];
    
    return events.filter(event => event.date >= startStr && event.date <= endStr);
  }, [events]);

  const searchEvents = useCallback((query) => {
    const lowerQuery = query.toLowerCase();
    return events.filter(event => 
      event.title.toLowerCase().includes(lowerQuery) ||
      event.description?.toLowerCase().includes(lowerQuery) ||
      event.location?.toLowerCase().includes(lowerQuery)
    );
  }, [events]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    events,
    loading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate,
    getEventsForDateRange,
    searchEvents,
    clearError
  };
};