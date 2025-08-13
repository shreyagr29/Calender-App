import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { EventProvider } from './context/EventContext';
import { CalendarProvider } from './context/CalenderContext';
import Layout from './components/Layout';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <EventProvider>
        <CalendarProvider>
          <Layout>
            <Calendar />
          </Layout>
        </CalendarProvider>
      </EventProvider>
    </ThemeProvider>
  );
}

export default App;