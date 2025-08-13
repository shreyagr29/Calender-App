export const generateEventId = () => {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const createDefaultEvent = (date = new Date()) => {
  return {
    id: '',
    title: '',
    description: '',
    date: date.toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    location: '',
    attendees: '',
    color: 'blue',
    category: 'general'
  };
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const parseAttendees = (attendeesString) => {
  if (!attendeesString) return [];
  return attendeesString
    .split(',')
    .map(email => email.trim())
    .filter(email => email && validateEmail(email));
};

export const formatAttendeesForDisplay = (attendees) => {
  const emails = parseAttendees(attendees);
  if (emails.length === 0) return 'No attendees';
  if (emails.length === 1) return emails[0];
  if (emails.length <= 3) return emails.join(', ');
  return `${emails.slice(0, 2).join(', ')} and ${emails.length - 2} more`;
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
