export const sampleEvents = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team standup meeting',
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '11:00',
    location: 'Conference Room A',
    attendees: 'john@example.com, jane@example.com'
  },
  {
    id: '2',
    title: 'Project Review',
    description: 'Quarterly project review with stakeholders',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    startTime: '14:00',
    endTime: '16:00',
    location: 'Zoom Meeting',
    attendees: 'manager@example.com'
  },
  {
    id: '3',
    title: 'Client Presentation',
    description: 'Present new features to client',
    date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    startTime: '15:30',
    endTime: '16:30',
    location: 'Client Office',
    attendees: 'client@example.com, sales@example.com'
  }
];