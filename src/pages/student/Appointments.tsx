import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Video, MapPin, Star, Search, X, CheckCircle, AlertCircle, Bell, Phone, MessageSquare } from 'lucide-react';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'book'>('upcoming');
  const [selectedCounselor, setSelectedCounselor] = useState<string>('');
  const [selectedSessionType, setSelectedSessionType] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState<string>('');
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Auto-hide notification effect
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
  };

  const counselors = [
    {
      id: '1',
      name: 'Dr. Michael Rodriguez',
      title: 'Senior Career Counselor',
      specialization: ['Career Planning', 'Resume Writing', 'Tech Industry'],
      rating: 4.9,
      totalSessions: 1247,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      availability: 'Available today',
      nextSlot: '2:00 PM',
      availableSlots: {
        '2025-06-27': ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
        '2025-06-28': ['10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'],
        '2025-06-30': ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '5:00 PM'],
        '2025-07-01': ['10:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
        '2025-07-02': ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'],
        '2025-07-03': ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
        '2025-07-07': ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM']
      }
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      title: 'Career Development Specialist',
      specialization: ['Interview Preparation', 'Career Transition', 'Leadership'],
      rating: 4.8,
      totalSessions: 892,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      availability: 'Available tomorrow',
      nextSlot: '10:00 AM',
      availableSlots: {
        '2025-06-28': ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
        '2025-06-30': ['9:00 AM', '10:00 AM', '1:00 PM', '4:00 PM'],
        '2025-07-01': ['11:00 AM', '2:00 PM', '3:00 PM'],
        '2025-07-02': ['9:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '5:00 PM'],
        '2025-07-03': ['10:00 AM', '11:00 AM', '1:00 PM', '4:00 PM'],
        '2025-07-04': ['9:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
        '2025-07-07': ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM']
      }
    },
    {
      id: '3',
      name: 'Emily Chen',
      title: 'Industry Specialist',
      specialization: ['Design Career', 'Portfolio Review', 'Creative Industries'],
      rating: 4.7,
      totalSessions: 634,
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      availability: 'Available this week',
      nextSlot: 'Friday 3:00 PM',
      availableSlots: {
        '2025-06-27': ['11:00 AM', '1:00 PM', '3:00 PM'],
        '2025-06-28': ['9:00 AM', '2:00 PM', '4:00 PM'],
        '2025-06-30': ['10:00 AM', '11:00 AM', '3:00 PM', '4:00 PM'],
        '2025-07-01': ['9:00 AM', '1:00 PM', '4:00 PM', '5:00 PM'],
        '2025-07-02': ['11:00 AM', '2:00 PM', '3:00 PM'],
        '2025-07-03': ['9:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'],
        '2025-07-04': ['11:00 AM', '1:00 PM', '3:00 PM']
      }
    },
  ];

  const upcomingAppointments = [
    {
      id: '1',
      counselorName: 'Dr. Michael Rodriguez',
      counselorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2025-06-27',
      time: '2:00 PM - 3:00 PM',
      type: 'Resume Review',
      location: 'Virtual Meeting',
      status: 'confirmed',
      notes: 'Bring your current resume and job descriptions you\'re interested in.',
      meetingLink: 'https://university.zoom.us/j/123456789',
      reminder: true
    },
    {
      id: '2',
      counselorName: 'Dr. Sarah Johnson',
      counselorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2025-06-30',
      time: '10:00 AM - 11:00 AM',
      type: 'Career Guidance',
      location: 'Career Services Office, Room 203',
      status: 'confirmed',
      notes: 'Discussion about career paths in technology and next steps.',
      reminder: true
    },
    {
      id: '3',
      counselorName: 'Emily Chen',
      counselorAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2025-07-02',
      time: '3:00 PM - 4:00 PM',
      type: 'Portfolio Review',
      location: 'Virtual Meeting',
      status: 'pending',
      notes: 'Bring examples of your design work and current portfolio.',
      meetingLink: 'https://university.zoom.us/j/987654321',
      reminder: false
    },
  ];

  const pastAppointments = [
    {
      id: '1',
      counselorName: 'Emily Chen',
      counselorAvatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2025-06-20',
      time: '3:00 PM - 4:00 PM',
      type: 'Mock Interview',
      status: 'completed',
      rating: 5,
      feedback: 'Great session! Emily provided excellent feedback on my interview skills and helped me prepare for technical questions.',
      notes: 'Practice behavioral questions and improve body language.',
      followUpScheduled: true
    },
    {
      id: '2',
      counselorName: 'Dr. Michael Rodriguez',
      counselorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2025-06-15',
      time: '1:00 PM - 2:00 PM',
      type: 'Job Search Strategy',
      status: 'completed',
      rating: 5,
      feedback: 'Very helpful session on job search strategies and networking tips.',
      notes: 'Focus on LinkedIn optimization and networking events.',
      followUpScheduled: false
    },
    {
      id: '3',
      counselorName: 'Dr. Sarah Johnson',
      counselorAvatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      date: '2025-06-10',
      time: '11:00 AM - 12:00 PM',
      type: 'Career Planning',
      status: 'completed',
      rating: 4,
      feedback: 'Good discussion about career goals and development plan.',
      notes: 'Set 6-month career milestones and skill development goals.',
      followUpScheduled: true
    },
  ];

  const sessionTypes = [
    {
      id: 'resume_review',
      name: 'Resume Review',
      duration: '60 minutes',
      price: 'Free',
      description: 'Get personalized feedback on your resume and cover letter',
      icon: '📄',
      popular: true
    },
    {
      id: 'career_guidance',
      name: 'Career Guidance',
      duration: '60 minutes',
      price: 'Free',
      description: 'Explore career paths and develop your professional goals',
      icon: '🎯',
      popular: false
    },
    {
      id: 'mock_interview',
      name: 'Mock Interview',
      duration: '60 minutes',
      price: 'Free',
      description: 'Practice interviews with industry-specific questions',
      icon: '🎤',
      popular: true
    },
    {
      id: 'job_search',
      name: 'Job Search Strategy',
      duration: '60 minutes',
      price: 'Free',
      description: 'Learn effective job search techniques and networking',
      icon: '🔍',
      popular: false
    },
    {
      id: 'portfolio_review',
      name: 'Portfolio Review',
      duration: '90 minutes',
      price: 'Free',
      description: 'Get feedback on your creative portfolio and presentation',
      icon: '🎨',
      popular: false
    },
    {
      id: 'salary_negotiation',
      name: 'Salary Negotiation',
      duration: '45 minutes',
      price: 'Free',
      description: 'Learn strategies for negotiating salary and benefits',
      icon: '💰',
    },
  ];

  // Helper functions
  const handleBookSession = (counselorId: string, _sessionType: string, date?: string, timeSlot?: string) => {
    const counselor = counselors.find(c => c.id === counselorId);
    if (counselor && date && timeSlot) {
      showNotification('success', `Session booked with ${counselor.name} on ${new Date(date).toLocaleDateString()} at ${timeSlot}!`);
      setActiveTab('upcoming');
      // Reset form
      setSelectedCounselor('');
      setSelectedSessionType('');
      setSelectedDate('');
      setSelectedTimeSlot('');
      setShowTimeSlotModal(false);
    } else if (counselor) {
      setShowTimeSlotModal(true);
      showNotification('info', `Please select a date and time slot for ${counselor.name}`);
    }
  };

  const handleCounselorSelection = (counselorId: string) => {
    setSelectedCounselor(counselorId);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setShowTimeSlotModal(true); // فتح النافذة المنبثقة
  };

  const getAvailableDates = (counselorId: string) => {
    const counselor = counselors.find(c => c.id === counselorId);
    if (!counselor || !counselor.availableSlots) return [];
    
    return Object.keys(counselor.availableSlots).sort();
  };

  const getAvailableTimeSlots = (counselorId: string, date: string) => {
    const counselor = counselors.find(c => c.id === counselorId);
    if (!counselor || !counselor.availableSlots) return [];
    
    const slots = (counselor.availableSlots as any)[date];
    return slots || [];
  };

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleCancelAppointment = (_appointmentId: string) => {
    showNotification('info', 'Appointment cancelled successfully');
  };

  const handleReschedule = (_appointmentId: string) => {
    showNotification('info', 'Reschedule request sent to counselor');
  };

  const toggleReminder = (_appointmentId: string) => {
    showNotification('success', 'Reminder preferences updated');
  };

  const getTimeUntilAppointment = (dateStr: string, timeStr: string) => {
    const [startTime] = timeStr.split(' - ');
    const appointmentDate = new Date(`${dateStr} ${startTime}`);
    const now = new Date();
    const diffTime = appointmentDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays <= 7) return `In ${diffDays} days`;
    return `In ${Math.ceil(diffDays / 7)} weeks`;
  };

  // Filter counselors based on search and specialization
  const filteredCounselors = counselors.filter(counselor => {
    const matchesSearch = !searchQuery || 
      counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.specialization.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialization = !filterSpecialization || 
      counselor.specialization.includes(filterSpecialization);
    
    return matchesSearch && matchesSpecialization;
  });

  const allSpecializations = Array.from(
    new Set(counselors.flatMap(c => c.specialization))
  ).sort();

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
        <h1 className="text-3xl font-bold text-gray-900">Career Counseling</h1>
        <p className="mt-2 text-gray-600">Book sessions with career counselors and track your appointments</p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Upcoming Appointments
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'past'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Past Sessions
            </button>
            <button
              onClick={() => setActiveTab('book')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'book'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Book New Session
            </button>
          </nav>
        </div>
      </div>

      {/* Upcoming Appointments */}
      {activeTab === 'upcoming' && (
        <div className="space-y-6">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-xl shadow-soft p-6 border-l-4 border-primary-500">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <img
                      src={appointment.counselorAvatar}
                      alt={appointment.counselorName}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.type}</h3>
                        <span className="text-sm font-medium text-primary-600">
                          {getTimeUntilAppointment(appointment.date, appointment.time)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">with {appointment.counselorName}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                        <span className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          {appointment.time}
                        </span>
                        <span className="flex items-center">
                          {appointment.location.includes('Virtual') ? (
                            <Video size={16} className="mr-1" />
                          ) : (
                            <MapPin size={16} className="mr-1" />
                          )}
                          {appointment.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {appointment.reminder && (
                      <span className="flex items-center text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        <Bell size={14} className="mr-1" />
                        Reminder On
                      </span>
                    )}
                    <span className={`badge ${
                      appointment.status === 'confirmed' ? 'badge-success' : 
                      appointment.status === 'pending' ? 'badge-warning' : 'badge-info'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Notes:</strong> {appointment.notes}
                    </p>
                  </div>
                )}
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => handleReschedule(appointment.id)}
                      className="btn btn-outline text-sm"
                    >
                      Reschedule
                    </button>
                    {appointment.location.includes('Virtual') && appointment.meetingLink && (
                      <a
                        href={appointment.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary text-sm flex items-center"
                      >
                        <Video size={16} className="mr-2" />
                        Join Meeting
                      </a>
                    )}
                    {!appointment.location.includes('Virtual') && (
                      <button className="btn btn-primary text-sm flex items-center">
                        <MapPin size={16} className="mr-2" />
                        Get Directions
                      </button>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => toggleReminder(appointment.id)}
                      className={`btn text-sm ${appointment.reminder ? 'btn-outline' : 'btn-secondary'}`}
                    >
                      <Bell size={16} className="mr-2" />
                      {appointment.reminder ? 'Reminder On' : 'Set Reminder'}
                    </button>
                    <button 
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No upcoming appointments</h3>
              <p className="text-gray-600 mb-4">Book a session with a career counselor to get started</p>
              <button
                onClick={() => setActiveTab('book')}
                className="btn btn-primary"
              >
                Book New Session
              </button>
            </div>
          )}
        </div>
      )}

      {/* Past Sessions */}
      {activeTab === 'past' && (
        <div className="space-y-6">
          {pastAppointments.map(appointment => (
            <div key={appointment.id} className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <img
                    src={appointment.counselorAvatar}
                    alt={appointment.counselorName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{appointment.type}</h3>
                    <p className="text-gray-600 mb-2">with {appointment.counselorName}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(appointment.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {appointment.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < appointment.rating ? 'text-warning-500 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{appointment.rating}/5</span>
                  </div>
                  <span className="badge badge-success">{appointment.status}</span>
                  {appointment.followUpScheduled && (
                    <span className="badge badge-info">Follow-up Scheduled</span>
                  )}
                </div>
              </div>
              
              {appointment.notes && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Session Notes:</strong> {appointment.notes}
                  </p>
                </div>
              )}

              {appointment.feedback && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Your feedback:</strong> {appointment.feedback}
                  </p>
                </div>
              )}
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleBookSession(appointment.counselorName, appointment.type)}
                    className="btn btn-outline text-sm"
                  >
                    Book Again
                  </button>
                  <button className="btn btn-outline text-sm flex items-center">
                    <MessageSquare size={16} className="mr-2" />
                    View Notes
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="btn btn-primary text-sm flex items-center">
                    <Phone size={16} className="mr-2" />
                    Contact Counselor
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Book New Session */}
      {activeTab === 'book' && (
        <div className="space-y-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold mb-4">Find Your Perfect Counselor</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search counselors by name, specialization, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              <select
                value={filterSpecialization}
                onChange={(e) => setFilterSpecialization(e.target.value)}
                className="input md:w-64"
              >
                <option value="">All Specializations</option>
                {allSpecializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Session Types */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              Choose Session Type
              <span className="ml-3 text-sm text-gray-600 font-normal">
                ({sessionTypes.length} available)
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sessionTypes.map(type => (
                <div 
                  key={type.id} 
                  className={`card p-4 hover:shadow-medium transition-all cursor-pointer border-2 ${
                    selectedSessionType === type.id 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-transparent hover:border-primary-200'
                  }`}
                  onClick={() => setSelectedSessionType(type.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{type.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900 flex items-center">
                          {type.name}
                          {type.popular && (
                            <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                              Popular
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-primary-600 font-medium">{type.price} • {type.duration}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Available Counselors */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              Choose Your Counselor
              <span className="ml-3 text-sm text-gray-600 font-normal">
                ({filteredCounselors.length} available)
              </span>
            </h2>
            {filteredCounselors.length > 0 ? (
              <div className="space-y-4">
                {filteredCounselors.map(counselor => (
                  <div 
                    key={counselor.id} 
                    className={`bg-white rounded-xl shadow-soft p-6 border-2 transition-all ${
                      selectedCounselor === counselor.id 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-transparent hover:border-primary-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start">
                        <img
                          src={counselor.avatar}
                          alt={counselor.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{counselor.name}</h3>
                          <p className="text-gray-600 mb-2">{counselor.title}</p>
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="flex items-center">
                              <Star size={16} className="text-warning-500 mr-1" />
                              <span className="text-sm font-medium">{counselor.rating}</span>
                              <span className="text-sm text-gray-500 ml-1">
                                ({counselor.totalSessions.toLocaleString()} sessions)
                              </span>
                            </div>
                            <span className="text-sm text-success-600 flex items-center">
                              <CheckCircle size={14} className="mr-1" />
                              {counselor.availability}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {counselor.specialization.map(spec => (
                              <span key={spec} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Next available:</p>
                        <p className="font-medium text-primary-600">{counselor.nextSlot}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <button 
                        onClick={() => handleCounselorSelection(counselor.id)}
                        className={`btn text-sm ${
                          selectedCounselor === counselor.id ? 'btn-primary' : 'btn-outline'
                        }`}
                      >
                        {selectedCounselor === counselor.id ? 'Selected ✓' : 'Select Counselor'}
                      </button>
                      <div className="flex space-x-3">
                        <button className="btn btn-outline text-sm">View Profile</button>
                        <button 
                          onClick={() => {
                            if (!selectedSessionType) {
                              showNotification('error', 'Please select a session type first');
                              return;
                            }
                            setSelectedCounselor(counselor.id);
                            setShowTimeSlotModal(true);
                          }}
                          disabled={!selectedSessionType}
                          className={`btn text-sm ${
                            selectedSessionType ? 'btn-primary' : 'btn-outline opacity-50 cursor-not-allowed'
                          }`}
                        >
                          Choose Time Slot
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <User size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No counselors found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterSpecialization('');
                  }}
                  className="btn btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Quick Booking Actions */}
          {selectedSessionType && selectedCounselor && (
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Ready to Book?</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-800">
                    <strong>Session:</strong> {sessionTypes.find(t => t.id === selectedSessionType)?.name}
                  </p>
                  <p className="text-primary-800">
                    <strong>Counselor:</strong> {counselors.find(c => c.id === selectedCounselor)?.name}
                  </p>
                  <p className="text-primary-800">
                    <strong>Duration:</strong> {sessionTypes.find(t => t.id === selectedSessionType)?.duration}
                  </p>
                </div>
                <button 
                  onClick={() => setShowTimeSlotModal(true)}
                  className="btn btn-primary px-8"
                >
                  Choose Date & Time
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Time Slot Selection Modal */}
      {showTimeSlotModal && selectedCounselor && selectedSessionType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Clock className="mr-3 text-primary-600" size={28} />
                    Select Date & Time
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Booking session with {counselors.find(c => c.id === selectedCounselor)?.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowTimeSlotModal(false);
                    setSelectedDate('');
                    setSelectedTimeSlot('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Session Summary */}
              <div className="bg-primary-50 rounded-lg p-4">
                <h3 className="font-semibold text-primary-900 mb-2">Session Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-700">Type:</span>
                    <span className="font-medium">{sessionTypes.find(t => t.id === selectedSessionType)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-700">Duration:</span>
                    <span className="font-medium">{sessionTypes.find(t => t.id === selectedSessionType)?.duration}</span>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Choose Available Date</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {getAvailableDates(selectedCounselor).map(date => (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTimeSlot(''); // Reset time slot when date changes
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                        selectedDate === date
                          ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
                          : 'border-gray-200 hover:border-primary-300 hover:bg-primary-25'
                      }`}
                    >
                      <div className="font-semibold text-base">{formatDateDisplay(date)}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {getAvailableTimeSlots(selectedCounselor, date).length} slots available
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              {selectedDate && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Available Time Slots - {formatDateDisplay(selectedDate)}
                  </h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {getAvailableTimeSlots(selectedCounselor, selectedDate).map((timeSlot: string) => (
                      <button
                        key={timeSlot}
                        onClick={() => setSelectedTimeSlot(timeSlot)}
                        className={`p-4 rounded-lg border-2 transition-all text-center hover:shadow-md ${
                          selectedTimeSlot === timeSlot
                            ? 'border-primary-500 bg-primary-500 text-white shadow-md'
                            : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                      >
                        <div className="font-semibold">{timeSlot}</div>
                        <div className="text-xs opacity-75 mt-1">Available</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking Confirmation */}
              {selectedDate && selectedTimeSlot && (
                <div className="bg-gradient-to-r from-green-50 to-primary-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="mr-2 text-green-600" size={20} />
                    Confirm Your Booking
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Session:</span>
                        <span className="font-medium">{sessionTypes.find(t => t.id === selectedSessionType)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{sessionTypes.find(t => t.id === selectedSessionType)?.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-medium text-green-600">{sessionTypes.find(t => t.id === selectedSessionType)?.price}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Counselor:</span>
                        <span className="font-medium">{counselors.find(c => c.id === selectedCounselor)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{formatDateDisplay(selectedDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-primary-600">{selectedTimeSlot}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => {
                    setShowTimeSlotModal(false);
                    setSelectedDate('');
                    setSelectedTimeSlot('');
                    setSelectedCounselor('');
                  }}
                  className="btn btn-outline text-gray-600 border-gray-300 px-8"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    handleBookSession(selectedCounselor, selectedSessionType, selectedDate, selectedTimeSlot);
                    setShowTimeSlotModal(false);
                  }}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className={`btn px-8 ${
                    selectedDate && selectedTimeSlot 
                      ? 'btn-primary' 
                      : 'btn-outline opacity-50 cursor-not-allowed'
                  }`}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;