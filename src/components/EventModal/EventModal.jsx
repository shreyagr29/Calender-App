import React, { useState, useEffect } from 'react';
import { useEvents } from '../../context/EventContext';
import { formatDate } from '../../utils/dateUtils';
import Modal from '../common/Modal';
import EventForm from './EventForm';

const EventModal = ({ isOpen, onClose, event = null, initialDate = null }) => {
  const { addEvent, updateEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    attendees: ''
  });

  useEffect(() => {
    if (event) {
      // Editing existing event
      setFormData(event);
    } else if (initialDate) {
      // Creating new event for specific date
      setFormData(prev => ({
        ...prev,
        date: formatDate(initialDate)
      }));
    } else {
      // Creating new event for today
      setFormData(prev => ({
        ...prev,
        date: formatDate(new Date())
      }));
    }
  }, [event, initialDate]);

  const handleSubmit = () => {
    if (!formData.title.trim()) return;

    if (event) {
      updateEvent(event.id, formData);
    } else {
      addEvent(formData);
    }

    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      attendees: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {event ? 'Edit Event' : 'Create New Event'}
        </h3>
        
        <EventForm
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={!!event}
        />
      </div>
    </Modal>
  );
};

export default EventModal;