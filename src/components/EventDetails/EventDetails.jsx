import React, { useState } from 'react';
import { Edit2, Trash2, Clock, MapPin, User } from 'lucide-react';
import { useEvents } from '../../context/EventContext';
import { formatDisplayDate } from '../../utils/dateUtils';
import Modal from '../common/Modal';
import EventModal from '../EventModal';

const EventDetails = ({ event, isOpen, onClose }) => {
  const { deleteEvent } = useEvents();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id);
      onClose();
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setShowEditModal(false);
    onClose();
  };

  if (!event) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Event Details
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Edit event"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-red-400 hover:text-red-600 transition-colors"
                title="Delete event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                {event.title}
              </h4>
            </div>
            
            {event.description && (
              <div>
                <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
              </div>
            )}
            
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Clock className="w-4 h-4 mr-2" />
              <span>
                {formatDisplayDate(new Date(event.date))}
                {(event.startTime || event.endTime) && (
                  <span className="ml-2">
                    • {event.startTime} - {event.endTime}
                  </span>
                )}
              </span>
            </div>
            
            {event.location && (
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.location}</span>
              </div>
            )}
            
            {event.attendees && (
              <div className="flex items-start text-gray-600 dark:text-gray-300">
                <User className="w-4 h-4 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium mb-1">Attendees:</p>
                  <p className="text-sm">{event.attendees}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {showEditModal && (
        <EventModal
          isOpen={showEditModal}
          onClose={handleEditClose}
          event={event}
        />
      )}
    </>
  );
};

export default EventDetails;