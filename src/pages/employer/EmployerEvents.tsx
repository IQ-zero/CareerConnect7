import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Edit,
  Trash2,
  Eye,
  Video,
  X,
  Save,
  Copy,
  Share2,
  Download,
  Mail,
  UserCheck
} from 'lucide-react';

// TypeScript interfaces
interface Event {
  id: string;
  title: string;
  type: 'career_fair' | 'info_session' | 'workshop' | 'networking' | 'webinar' | 'panel';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  virtual: boolean;
  link?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrations: number;
  maxAttendees: number;
  description: string;
  targetAudience: string;
  organizer?: string;
  requirements?: string[];
  agenda?: string[];
  speakers?: Speaker[];
  registrationDeadline?: string;
  cost?: number;
  tags?: string[];
}

interface EventFormData {
  title: string;
  type: Event['type'];
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  virtual: boolean;
  link?: string;
  maxAttendees: number;
  description: string;
  targetAudience: string;
  requirements: string[];
  agenda: string[];
  registrationDeadline: string;
  cost: number;
  tags: string[];
}

interface Registration {
  id: string;
  eventId: string;
  studentName: string;
  email: string;
  university: string;
  major: string;
  graduationYear: string;
  registrationDate: string;
  status: 'confirmed' | 'waitlist' | 'cancelled';
  attendanceStatus?: 'attended' | 'no-show';
  notes?: string;
}

interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  imageUrl?: string;
}

const EmployerEvents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Modal states
  const [showEventModal, setShowEventModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  
  // Form states
  const [eventFormData, setEventFormData] = useState<EventFormData>({
    title: '',
    type: 'info_session',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    virtual: false,
    maxAttendees: 50,
    description: '',
    targetAudience: '',
    requirements: [],
    agenda: [],
    registrationDeadline: '',
    cost: 0,
    tags: []
  });

  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'TechVision Career Fair',
      type: 'career_fair',
      date: '2024-02-15',
      startTime: '10:00 AM',
      endTime: '4:00 PM',
      location: 'University Center Ballroom',
      virtual: false,
      status: 'upcoming',
      registrations: 156,
      maxAttendees: 200,
      description: 'Join us for our annual career fair where we\'ll be recruiting for multiple positions across engineering, product, and design teams.',
      targetAudience: 'Computer Science, Engineering students',
      organizer: 'HR Team',
      requirements: ['Bring resume copies', 'Business casual attire'],
      agenda: ['10:00 AM - Registration', '10:30 AM - Company presentations', '12:00 PM - Networking lunch', '1:00 PM - One-on-one interviews'],
      registrationDeadline: '2024-02-10',
      cost: 0,
      tags: ['recruiting', 'engineering', 'career-fair']
    },
    {
      id: '2',
      title: 'Software Engineering Info Session',
      type: 'info_session',
      date: '2024-01-25',
      startTime: '6:00 PM',
      endTime: '7:30 PM',
      location: 'Virtual Event',
      virtual: true,
      link: 'https://techvision.zoom.us/j/123456789',
      status: 'upcoming',
      registrations: 89,
      maxAttendees: 100,
      description: 'Learn about our software engineering roles, company culture, and application process. Q&A session included.',
      targetAudience: 'Computer Science, Software Engineering students',
      organizer: 'Engineering Team',
      requirements: ['Stable internet connection', 'Zoom app installed'],
      agenda: ['6:00 PM - Welcome & introductions', '6:15 PM - Company overview', '6:45 PM - Engineering culture', '7:00 PM - Q&A session'],
      registrationDeadline: '2024-01-23',
      cost: 0,
      tags: ['info-session', 'software', 'virtual']
    },
    {
      id: '3',
      title: 'Product Management Workshop',
      type: 'workshop',
      date: '2024-01-20',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      location: 'Business School, Room 301',
      virtual: false,
      status: 'completed',
      registrations: 45,
      maxAttendees: 50,
      description: 'Hands-on workshop covering product management fundamentals, case studies, and career paths.',
      targetAudience: 'Business, Engineering, Design students',
      organizer: 'Product Team',
      requirements: ['Laptop required', 'Interest in product management'],
      agenda: ['2:00 PM - Product management basics', '2:45 PM - Case study exercise', '3:30 PM - Career paths discussion'],
      registrationDeadline: '2024-01-18',
      cost: 0,
      tags: ['workshop', 'product-management', 'hands-on']
    }
  ];

  // Mock registrations data
  const mockRegistrations: Registration[] = [
    {
      id: '1',
      eventId: '1',
      studentName: 'John Smith',
      email: 'john.smith@university.edu',
      university: 'Tech University',
      major: 'Computer Science',
      graduationYear: '2024',
      registrationDate: '2024-01-15',
      status: 'confirmed'
    },
    {
      id: '2',
      eventId: '1',
      studentName: 'Sarah Johnson',
      email: 'sarah.j@university.edu',
      university: 'Engineering College',
      major: 'Software Engineering',
      graduationYear: '2024',
      registrationDate: '2024-01-16',
      status: 'confirmed'
    },
    {
      id: '3',
      eventId: '2',
      studentName: 'Mike Chen',
      email: 'mike.chen@university.edu',
      university: 'Tech University',
      major: 'Computer Science',
      graduationYear: '2025',
      registrationDate: '2024-01-20',
      status: 'confirmed'
    }
  ];

  // Event handlers
  const handleCreateEvent = () => {
    setEditingEvent(null);
    setEventFormData({
      title: '',
      type: 'info_session',
      date: '',
      startTime: '',
      endTime: '',
      location: '',
      virtual: false,
      maxAttendees: 50,
      description: '',
      targetAudience: '',
      requirements: [],
      agenda: [],
      registrationDeadline: '',
      cost: 0,
      tags: []
    });
    setShowEventModal(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventFormData({
      title: event.title,
      type: event.type,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      virtual: event.virtual,
      maxAttendees: event.maxAttendees,
      description: event.description,
      targetAudience: event.targetAudience,
      requirements: event.requirements || [],
      agenda: event.agenda || [],
      registrationDeadline: event.registrationDeadline || '',
      cost: event.cost || 0,
      tags: event.tags || []
    });
    setShowEventModal(true);
  };

  const handleViewEvent = (event: Event) => {
    setViewingEvent(event);
    setShowViewModal(true);
  };

  const handleViewRegistrations = (event: Event) => {
    setViewingEvent(event);
    setShowRegistrationsModal(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      // Simulate API call
      console.log('Deleting event:', eventId);
      // In real app, would update state/refetch data
      alert('Event deleted successfully!');
    }
  };

  const handleSaveEvent = async () => {
    try {
      // Simulate API call
      if (editingEvent) {
        console.log('Updating event:', { ...editingEvent, ...eventFormData });
        alert('Event updated successfully!');
      } else {
        console.log('Creating event:', eventFormData);
        alert('Event created successfully!');
      }
      setShowEventModal(false);
      setEditingEvent(null);
    } catch (error) {
      alert('Error saving event. Please try again.');
    }
  };

  const handleCopyEventLink = (event: Event) => {
    const link = event.virtual && event.link ? event.link : `${window.location.origin}/events/${event.id}`;
    navigator.clipboard.writeText(link);
    alert('Event link copied to clipboard!');
  };

  const handleShareEvent = (event: Event) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: `${window.location.origin}/events/${event.id}`
      });
    } else {
      handleCopyEventLink(event);
    }
  };

  const handleExportRegistrations = (event: Event) => {
    const eventRegistrations = mockRegistrations.filter(reg => reg.eventId === event.id);
    const csvContent = [
      ['Name', 'Email', 'University', 'Major', 'Graduation Year', 'Registration Date', 'Status'],
      ...eventRegistrations.map(reg => [
        reg.studentName,
        reg.email,
        reg.university,
        reg.major,
        reg.graduationYear,
        reg.registrationDate,
        reg.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, '_')}_registrations.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesType = typeFilter === 'all' || event.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'badge-primary';
      case 'ongoing': return 'badge-warning';
      case 'completed': return 'badge-success';
      case 'cancelled': return 'badge-error';
      default: return 'badge-primary';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'career_fair': return 'badge-secondary';
      case 'info_session': return 'badge-accent';
      case 'workshop': return 'badge-primary';
      case 'networking': return 'badge-success';
      default: return 'badge-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Events</h1>
          <p className="text-gray-600">Create and manage your recruitment events</p>
        </div>
        <button 
          className="btn btn-primary mt-4 md:mt-0"
          onClick={handleCreateEvent}
        >
          <Plus size={16} className="mr-2" />
          Create New Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input w-full"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="w-full md:w-48">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input w-full"
          >
            <option value="all">All Types</option>
            <option value="career_fair">Career Fair</option>
            <option value="info_session">Info Session</option>
            <option value="workshop">Workshop</option>
            <option value="networking">Networking</option>
            <option value="webinar">Webinar</option>
            <option value="panel">Panel</option>
          </select>
        </div>
        <button className="btn btn-outline">
          <Filter size={16} className="mr-2" />
          More Filters
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map(event => (
          <div key={event.id} className="card p-6 hover:shadow-medium transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`badge ${getTypeColor(event.type)}`}>
                        {event.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className={`badge ${getStatusColor(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                      {event.virtual && (
                        <span className="badge badge-success">Virtual</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-gray-600 mt-1">{event.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-2 text-gray-400" />
                    {event.startTime} - {event.endTime}
                  </div>
                  <div className="flex items-center text-gray-600">
                    {event.virtual ? (
                      <Video size={16} className="mr-2 text-gray-400" />
                    ) : (
                      <MapPin size={16} className="mr-2 text-gray-400" />
                    )}
                    {event.virtual ? 'Virtual Event' : event.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users size={16} className="mr-2 text-gray-400" />
                    {event.registrations}/{event.maxAttendees} registered
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Target Audience:</strong> {event.targetAudience}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    Registration Rate: {Math.round((event.registrations / event.maxAttendees) * 100)}%
                  </span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full" 
                      style={{ width: `${(event.registrations / event.maxAttendees) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4 lg:mt-0 lg:ml-6 lg:min-w-[140px]">
                <button 
                  className="btn btn-outline text-sm py-1.5 px-3 w-full justify-start"
                  onClick={() => handleViewEvent(event)}
                >
                  <Eye size={14} className="mr-2" />
                  View
                </button>
                <button 
                  className="btn btn-outline text-sm py-1.5 px-3 w-full justify-start"
                  onClick={() => handleEditEvent(event)}
                >
                  <Edit size={14} className="mr-2" />
                  Edit
                </button>
                <button 
                  className="btn btn-outline text-sm py-1.5 px-3 w-full justify-start"
                  onClick={() => handleViewRegistrations(event)}
                >
                  <Users size={14} className="mr-2" />
                  Registrations
                </button>
                <button 
                  className="btn btn-outline text-sm py-1.5 px-3 w-full justify-start"
                  onClick={() => handleExportRegistrations(event)}
                >
                  <Download size={14} className="mr-2" />
                  Export
                </button>
                <button 
                  className="btn btn-outline text-sm py-1.5 px-3 w-full justify-start"
                  onClick={() => handleCopyEventLink(event)}
                >
                  <Copy size={14} className="mr-2" />
                  Copy Link
                </button>
                <button 
                  className="btn btn-outline text-sm py-1.5 px-3 w-full justify-start"
                  onClick={() => handleShareEvent(event)}
                >
                  <Share2 size={14} className="mr-2" />
                  Share
                </button>
                <button 
                  className="btn btn-outline text-sm py-1.5 px-3 w-full justify-start text-error-600 border-error-200 hover:bg-error-50"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No events found</h3>
            <p className="text-gray-600">Try adjusting your search filters or create a new event</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-primary-100 mb-3 mx-auto w-fit">
            <Calendar size={24} className="text-primary-600" />
          </div>
          <h3 className="font-medium mb-1">Total Events</h3>
          <p className="text-2xl font-bold text-primary-600">{mockEvents.length}</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-secondary-100 mb-3 mx-auto w-fit">
            <Users size={24} className="text-secondary-600" />
          </div>
          <h3 className="font-medium mb-1">Total Registrations</h3>
          <p className="text-2xl font-bold text-secondary-600">
            {mockEvents.reduce((sum, event) => sum + event.registrations, 0)}
          </p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-accent-100 mb-3 mx-auto w-fit">
            <Clock size={24} className="text-accent-600" />
          </div>
          <h3 className="font-medium mb-1">Upcoming Events</h3>
          <p className="text-2xl font-bold text-accent-600">
            {mockEvents.filter(e => e.status === 'upcoming').length}
          </p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-success-100 mb-3 mx-auto w-fit">
            <Video size={24} className="text-success-600" />
          </div>
          <h3 className="font-medium mb-1">Virtual Events</h3>
          <p className="text-2xl font-bold text-success-600">
            {mockEvents.filter(e => e.virtual).length}
          </p>
        </div>
      </div>

      {/* Event Form Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {editingEvent ? 'Edit Event' : 'Create New Event'}
                </h2>
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={eventFormData.title}
                    onChange={(e) => setEventFormData({...eventFormData, title: e.target.value})}
                    className="input w-full"
                    placeholder="Enter event title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    value={eventFormData.type}
                    onChange={(e) => setEventFormData({...eventFormData, type: e.target.value as Event['type']})}
                    className="input w-full"
                  >
                    <option value="info_session">Info Session</option>
                    <option value="career_fair">Career Fair</option>
                    <option value="workshop">Workshop</option>
                    <option value="networking">Networking</option>
                    <option value="webinar">Webinar</option>
                    <option value="panel">Panel</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={eventFormData.date}
                    onChange={(e) => setEventFormData({...eventFormData, date: e.target.value})}
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Attendees *
                  </label>
                  <input
                    type="number"
                    value={eventFormData.maxAttendees}
                    onChange={(e) => setEventFormData({...eventFormData, maxAttendees: parseInt(e.target.value)})}
                    className="input w-full"
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    value={eventFormData.startTime}
                    onChange={(e) => setEventFormData({...eventFormData, startTime: e.target.value})}
                    className="input w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Time *
                  </label>
                  <input
                    type="time"
                    value={eventFormData.endTime}
                    onChange={(e) => setEventFormData({...eventFormData, endTime: e.target.value})}
                    className="input w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={eventFormData.virtual}
                    onChange={(e) => setEventFormData({...eventFormData, virtual: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Virtual Event</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={eventFormData.location}
                  onChange={(e) => setEventFormData({...eventFormData, location: e.target.value})}
                  className="input w-full"
                  placeholder={eventFormData.virtual ? "Enter virtual meeting link" : "Enter physical location"}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description *
                </label>
                <textarea
                  value={eventFormData.description}
                  onChange={(e) => setEventFormData({...eventFormData, description: e.target.value})}
                  className="input w-full"
                  rows={4}
                  placeholder="Describe your event in detail"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={eventFormData.targetAudience}
                  onChange={(e) => setEventFormData({...eventFormData, targetAudience: e.target.value})}
                  className="input w-full"
                  placeholder="e.g., Computer Science, Engineering students"
                />
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowEventModal(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEvent}
                className="btn btn-primary"
              >
                <Save size={16} className="mr-2" />
                {editingEvent ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Event View Modal */}
      {showViewModal && viewingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{viewingEvent.title}</h2>
                <button 
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Event Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className={`badge ${getTypeColor(viewingEvent.type)}`}>
                        {viewingEvent.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`badge ${getStatusColor(viewingEvent.status)}`}>
                        {viewingEvent.status.charAt(0).toUpperCase() + viewingEvent.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span>{new Date(viewingEvent.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span>{viewingEvent.startTime} - {viewingEvent.endTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span>{viewingEvent.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Registration Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registered:</span>
                      <span>{viewingEvent.registrations}/{viewingEvent.maxAttendees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available Spots:</span>
                      <span>{viewingEvent.maxAttendees - viewingEvent.registrations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Rate:</span>
                      <span>{Math.round((viewingEvent.registrations / viewingEvent.maxAttendees) * 100)}%</span>
                    </div>
                    {viewingEvent.registrationDeadline && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Deadline:</span>
                        <span>{new Date(viewingEvent.registrationDeadline).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{viewingEvent.description}</p>
              </div>
              
              {viewingEvent.agenda && viewingEvent.agenda.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Agenda</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {viewingEvent.agenda.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {viewingEvent.requirements && viewingEvent.requirements.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Requirements</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {viewingEvent.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-accent-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleCopyEventLink(viewingEvent)}
                  className="btn btn-outline"
                >
                  <Copy size={16} className="mr-2" />
                  Copy Link
                </button>
                <button 
                  onClick={() => handleShareEvent(viewingEvent)}
                  className="btn btn-outline"
                >
                  <Share2 size={16} className="mr-2" />
                  Share
                </button>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditEvent(viewingEvent);
                  }}
                  className="btn btn-primary"
                >
                  <Edit size={16} className="mr-2" />
                  Edit Event
                </button>
                <button 
                  onClick={() => handleViewRegistrations(viewingEvent)}
                  className="btn btn-primary"
                >
                  <Users size={16} className="mr-2" />
                  View Registrations
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registrations Modal */}
      {showRegistrationsModal && viewingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Registrations - {viewingEvent.title}
                </h2>
                <button 
                  onClick={() => setShowRegistrationsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-gray-600">
                  Total Registrations: {mockRegistrations.filter(reg => reg.eventId === viewingEvent.id).length}
                </div>
                <button 
                  onClick={() => handleExportRegistrations(viewingEvent)}
                  className="btn btn-primary"
                >
                  <Download size={16} className="mr-2" />
                  Export to CSV
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">University</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Major</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Graduation</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Registered</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRegistrations
                      .filter(reg => reg.eventId === viewingEvent.id)
                      .map(registration => (
                        <tr key={registration.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{registration.studentName}</td>
                          <td className="py-3 px-4">{registration.email}</td>
                          <td className="py-3 px-4">{registration.university}</td>
                          <td className="py-3 px-4">{registration.major}</td>
                          <td className="py-3 px-4">{registration.graduationYear}</td>
                          <td className="py-3 px-4">{new Date(registration.registrationDate).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <span className={`badge ${
                              registration.status === 'confirmed' ? 'badge-success' :
                              registration.status === 'waitlist' ? 'badge-warning' : 'badge-error'
                            }`}>
                              {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => window.open(`mailto:${registration.email}`)}
                                className="text-primary-600 hover:text-primary-800"
                                title="Send Email"
                              >
                                <Mail size={16} />
                              </button>
                              <button 
                                className="text-primary-600 hover:text-primary-800"
                                title="View Profile"
                              >
                                <UserCheck size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                
                {mockRegistrations.filter(reg => reg.eventId === viewingEvent.id).length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No registrations yet</h3>
                    <p className="text-gray-600">Students will appear here once they register for this event</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployerEvents;