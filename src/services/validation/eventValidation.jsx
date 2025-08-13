export const validateEventData = (eventData) => {
  const errors = {};

  // Title validation
  if (!eventData.title?.trim()) {
    errors.title = 'Title is required';
  } else if (eventData.title.trim().length > 100) {
    errors.title = 'Title must be less than 100 characters';
  }

  // Date validation
  if (!eventData.date) {
    errors.date = 'Date is required';
  } else {
    const eventDate = new Date(eventData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(eventDate.getTime())) {
      errors.date = 'Invalid date format';
    }
  }

  // Time validation
  if (eventData.startTime && eventData.endTime) {
    const startTime = parseTime(eventData.startTime);
    const endTime = parseTime(eventData.endTime);
    
    if (startTime >= endTime) {
      errors.endTime = 'End time must be after start time';
    }
  }

  // Email validation for attendees
  if (eventData.attendees?.trim()) {
    const emails = eventData.attendees.split(',').map(email => email.trim());
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    const invalidEmails = emails.filter(email => email && !emailRegex.test(email));
    if (invalidEmails.length > 0) {
      errors.attendees = `Invalid email(s): ${invalidEmails.join(', ')}`;
    }
  }

  // Description length validation
  if (eventData.description && eventData.description.length > 500) {
    errors.description = 'Description must be less than 500 characters';
  }

  // Location length validation
  if (eventData.location && eventData.location.length > 100) {
    errors.location = 'Location must be less than 100 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const parseTime = (timeString) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
};

export const formatValidationErrors = (errors) => {
  return Object.entries(errors).map(([field, message]) => ({
    field,
    message
  }));
};