export const formatEventTime = (startTime, endTime) => {
  if (!startTime && !endTime) return '';
  if (!endTime) return startTime;
  if (!startTime) return endTime;
  return `${startTime} - ${endTime}`;
};

export const formatEventDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return '';
  
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  const duration = end - start;
  
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
};

const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatAttendeeCount = (attendees) => {
  if (!attendees) return '';
  const count = attendees.split(',').filter(email => email.trim()).length;
  return count === 1 ? '1 attendee' : `${count} attendees`;
};

export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};