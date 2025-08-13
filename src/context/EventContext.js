import { createContext, useContext, useState, useEffect } from 'react';
import { sampleEvents } from '../data/sampleData';

const EventContext = createContext();

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Initialize with sample events
  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    setEvents(prev => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = (eventId, updatedEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...updatedEvent, id: eventId } : event
    ));
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventsForDate
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};