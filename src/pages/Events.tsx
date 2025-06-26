import { useState, useMemo, useEffect } from 'react';
import { mockEvents } from '../data/mockData';
import { useSavedItems } from '../context/SavedItemsContext';
import { Calendar, MapPin, Users, Clock, ExternalLink, Search, X, Bookmark, AlertCircle, CheckCircle } from 'lucide-react';
import { format, isAfter, isBefore, addDays, isToday, isTomorrow, differenceInDays } from 'date-fns';

const Events = () => {
  const { addItem, removeItem, isItemSaved } = useSavedItems();
  const [selectedType, setSelectedType] = useState<string>('');
  const [showVirtualOnly, setShowVirtualOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<'date' | 'attendees' | 'alphabetical'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showRegisteredOnly, setShowRegisteredOnly] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
    eventName: string;
  } | null>(null);

  // Helper function to get event urgency
  const getEventUrgency = (eventDate: string) => {
    const date = new Date(eventDate);
    if (isToday(date)) return 'today';
    if (isTomorrow(date)) return 'tomorrow';
    const daysUntil = differenceInDays(date, new Date());
    if (daysUntil <= 7) return 'thisWeek';
    return 'later';
  };

  // Helper function to format date with relative indicators
  const formatEventDate = (eventDate: string) => {
    const date = new Date(eventDate);
    const urgency = getEventUrgency(eventDate);
    
    switch (urgency) {
      case 'today':
        return 'Today';
      case 'tomorrow':
        return 'Tomorrow';
      case 'thisWeek':
        return format(date, 'EEEE'); // Day of week
      default:
        return format(date, 'EEEE, MMMM d, yyyy');
    }
  };

  const eventTypes = Array.from(
    new Set(mockEvents.map(event => event.type))
  ).sort();

  // Auto-hide notification effect
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Helper function to show notifications
  const showNotification = (type: 'success' | 'error' | 'info', message: string, eventName: string) => {
    setNotification({ type, message, eventName });
  };

  const filteredAndSortedEvents = useMemo(() => {
    let filtered = mockEvents.filter(event => {
      const matchesType = !selectedType || event.type === selectedType;
      const matchesVirtual = !showVirtualOnly || event.virtual;
      const matchesRegistered = !showRegisteredOnly || registeredEvents.has(event.id);
      const matchesSearch = !searchTerm || 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.host.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Date filtering
      const eventDate = new Date(event.date);
      const today = new Date();
      let matchesDate = true;
      
      if (dateFilter === 'today') {
        matchesDate = eventDate.toDateString() === today.toDateString();
      } else if (dateFilter === 'week') {
        const weekFromNow = addDays(today, 7);
        matchesDate = isAfter(eventDate, today) && isBefore(eventDate, weekFromNow);
      } else if (dateFilter === 'month') {
        const monthFromNow = addDays(today, 30);
        matchesDate = isAfter(eventDate, today) && isBefore(eventDate, monthFromNow);
      }
      
      return matchesType && matchesVirtual && matchesRegistered && matchesSearch && matchesDate;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === 'attendees') {
        return (b.attendees || 0) - (a.attendees || 0);
      } else if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return filtered;
  }, [mockEvents, selectedType, showVirtualOnly, showRegisteredOnly, searchTerm, dateFilter, sortBy, registeredEvents]);

  const toggleBookmark = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (!event) return;

    if (isItemSaved(eventId)) {
      removeItem(eventId);
    } else {
      addItem({
        id: event.id,
        type: 'event',
        title: event.title,
        subtitle: event.host,
        description: event.description,
        location: event.virtual ? 'Virtual Event' : event.location,
        date: event.date,
        time: `${event.startTime} - ${event.endTime}`,
        attendees: event.attendees
      });
    }
  };

  const handleRegisterEvent = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (!event) return;

    setRegisteredEvents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(eventId)) {
        newSet.delete(eventId);
        showNotification('info', 'You have unregistered from', event.title);
      } else {
        newSet.add(eventId);
        showNotification('success', 'Successfully registered for', event.title);
      }
      return newSet;
    });
  };

  const clearFilters = () => {
    setSelectedType('');
    setShowVirtualOnly(false);
    setShowRegisteredOnly(false);
    setSearchTerm('');
    setDateFilter('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {notification.type === 'success' && <CheckCircle size={20} />}
              {notification.type === 'error' && <AlertCircle size={20} />}
              {notification.type === 'info' && <AlertCircle size={20} />}
            </div>
            <div className="flex-1">
              <p className="font-medium">{notification.message}</p>
              <p className="text-sm opacity-90">"{notification.eventName}"</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="flex-shrink-0 ml-3 text-white hover:text-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {showRegisteredOnly ? 'My Registered Events' : 'Upcoming Events'}
        </h1>
        <p className="mt-2 text-gray-600">
          {showRegisteredOnly 
            ? `You have registered for ${registeredEvents.size} event${registeredEvents.size !== 1 ? 's' : ''}`
            : 'Browse and register for career events, workshops, and networking opportunities'
          }
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search events by title, description, or host..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input w-full pl-10"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Filter Row */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Event Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input w-full sm:w-48"
            >
              <option value="">All Event Types</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>
                  {type.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as 'all' | 'today' | 'week' | 'month')}
              className="input w-full sm:w-48"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'attendees' | 'alphabetical')}
              className="input w-full sm:w-48"
            >
              <option value="date">Sort by Date</option>
              <option value="attendees">Sort by Popularity</option>
              <option value="alphabetical">Sort Alphabetically</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            {/* Virtual Only Toggle */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showVirtualOnly}
                onChange={(e) => setShowVirtualOnly(e.target.checked)}
                className="form-checkbox h-4 w-4 text-primary-600 rounded"
              />
              <span className="ml-2 text-gray-700 whitespace-nowrap">Virtual Only</span>
            </label>

            {/* Registered Only Toggle */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showRegisteredOnly}
                onChange={(e) => setShowRegisteredOnly(e.target.checked)}
                className="form-checkbox h-4 w-4 text-primary-600 rounded"
              />
              <span className="ml-2 text-gray-700 whitespace-nowrap">My Events</span>
            </label>

            {/* View Mode Toggle */}
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 text-sm rounded-l-lg ${
                  viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 text-sm rounded-r-lg ${
                  viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                List
              </button>
            </div>

            {/* Clear Filters */}
            {(selectedType || showVirtualOnly || showRegisteredOnly || searchTerm || dateFilter !== 'all') && (
              <button
                onClick={clearFilters}
                className="btn btn-outline text-sm px-3 py-1.5"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredAndSortedEvents.length} of {mockEvents.length} events
        </p>
        {filteredAndSortedEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>

      {/* Events Grid/List */}
      {filteredAndSortedEvents.length > 0 && (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredAndSortedEvents.map(event => (
            <div 
              key={event.id} 
              className={`bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 overflow-hidden group ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {event.image && (
                <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'} overflow-hidden relative`}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <button
                    onClick={() => toggleBookmark(event.id)}
                    className={`absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all duration-200 ${
                      isItemSaved(event.id) ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    <Bookmark size={16} fill={isItemSaved(event.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              )}
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`badge ${
                      event.type === 'workshop' ? 'badge-primary' :
                      event.type === 'career_fair' ? 'badge-secondary' :
                      event.type === 'info_session' ? 'badge-accent' :
                      event.type === 'networking' ? 'badge-success' :
                      event.type === 'interview' ? 'badge-warning' :
                      'badge-info'
                    }`}>
                      {event.type.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                    {event.virtual && (
                      <span className="badge badge-success">Virtual</span>
                    )}
                    {registeredEvents.has(event.id) && (
                      <span className="badge bg-green-100 text-green-800">
                        ✓ Registered
                      </span>
                    )}
                    {getEventUrgency(event.date) === 'today' && (
                      <span className="badge bg-red-100 text-red-800 flex items-center gap-1">
                        <AlertCircle size={12} />
                        Today
                      </span>
                    )}
                    {getEventUrgency(event.date) === 'tomorrow' && (
                      <span className="badge bg-orange-100 text-orange-800">
                        Tomorrow
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-primary-500" />
                    <span className="font-medium">
                      {formatEventDate(event.date)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-primary-500" />
                    <span>{event.startTime} - {event.endTime}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-2 text-primary-500" />
                    <span>{event.virtual ? 'Online Event' : event.location}</span>
                  </div>
                  {event.attendees && (
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-primary-500" />
                      <span>{event.attendees} attendees</span>
                      {event.maxAttendees && (
                        <span className="text-gray-400 ml-1">/ {event.maxAttendees} max</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">Hosted by</span>
                    <br />
                    <span className="text-gray-700">{event.host}</span>
                  </div>
                  <div className="flex gap-2">
                    {event.virtual ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRegisterEvent(event.id)}
                          className={`btn text-sm py-2 px-4 transition-colors ${
                            registeredEvents.has(event.id)
                              ? 'btn-outline text-green-600 border-green-300 hover:bg-green-50'
                              : 'btn-outline'
                          }`}
                        >
                          {registeredEvents.has(event.id) ? 'Registered ✓' : 'Register'}
                        </button>
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary text-sm py-2 px-4 flex items-center hover:bg-primary-700 transition-colors"
                        >
                          Join Online <ExternalLink size={14} className="ml-1" />
                        </a>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleRegisterEvent(event.id)}
                        className={`btn text-sm py-2 px-4 transition-colors ${
                          registeredEvents.has(event.id)
                            ? 'btn-outline text-green-600 border-green-300 hover:bg-green-50'
                            : 'btn-primary hover:bg-primary-700'
                        }`}
                      >
                        {registeredEvents.has(event.id) ? 'Registered ✓' : 'Register Now'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;