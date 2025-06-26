import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  Plus,
  Eye,
  Edit3,
  CheckCircle,
  XCircle,
  Search,
  Video,
  MapPin
} from 'lucide-react';

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Mock appointments data
  const appointments = [
    {
      id: '1',
      studentName: 'Alex Johnson',
      studentEmail: 'alex.johnson@university.edu',
      studentPhone: '+1 (555) 123-4567',
      date: '2025-06-26',
      time: '10:00 AM',
      duration: 60,
      type: 'Career Planning',
      status: 'confirmed',
      mode: 'in-person',
      location: 'Office 204',
      notes: 'Discuss software engineering career path and interview preparation',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      studentName: 'Sarah Wilson',
      studentEmail: 'sarah.wilson@university.edu',
      studentPhone: '+1 (555) 234-5678',
      date: '2025-06-26',
      time: '2:00 PM',
      duration: 45,
      type: 'Resume Review',
      status: 'confirmed',
      mode: 'video',
      location: 'Zoom Meeting',
      notes: 'Review updated resume for marketing positions',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      studentName: 'Michael Chen',
      studentEmail: 'michael.chen@university.edu',
      studentPhone: '+1 (555) 345-6789',
      date: '2025-06-26',
      time: '4:30 PM',
      duration: 45,
      type: 'Academic Guidance',
      status: 'pending',
      mode: 'in-person',
      location: 'Office 204',
      notes: 'Discuss graduate school applications and research opportunities',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '4',
      studentName: 'Emily Rodriguez',
      studentEmail: 'emily.rodriguez@university.edu',
      studentPhone: '+1 (555) 456-7890',
      date: '2025-06-27',
      time: '11:00 AM',
      duration: 60,
      type: 'Goal Setting',
      status: 'confirmed',
      mode: 'video',
      location: 'Teams Meeting',
      notes: 'Set semester goals and create action plan',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '5',
      studentName: 'David Thompson',
      studentEmail: 'david.thompson@university.edu',
      studentPhone: '+1 (555) 567-8901',
      date: '2025-06-27',
      time: '3:00 PM',
      duration: 45,
      type: 'Follow-up Session',
      status: 'cancelled',
      mode: 'in-person',
      location: 'Office 204',
      notes: 'Follow up on job search progress - CANCELLED by student',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDate = appointment.date === selectedDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'cancelled': return 'badge-error';
      case 'completed': return 'badge-primary';
      default: return 'badge-gray';
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'video': return <Video size={16} className="text-blue-600" />;
      case 'in-person': return <MapPin size={16} className="text-green-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600">Manage your student consultation schedule</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="btn btn-primary">
            <Plus size={16} className="mr-2" />
            Schedule New
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Today's Appointments</p>
              <p className="text-lg font-semibold text-gray-900">
                {appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Confirmed</p>
              <p className="text-lg font-semibold text-gray-900">
                {appointments.filter(a => a.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-lg font-semibold text-gray-900">
                {appointments.filter(a => a.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <Video className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Video Sessions</p>
              <p className="text-lg font-semibold text-gray-900">
                {appointments.filter(a => a.mode === 'video').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by student name or appointment type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="w-full md:w-48">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input w-full"
          />
        </div>

        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input w-full"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">View:</span>
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="grid grid-cols-2 gap-1 w-4 h-4">
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
            </div>
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <div className="flex flex-col space-y-1 w-4 h-4">
              <div className="bg-current h-0.5 rounded"></div>
              <div className="bg-current h-0.5 rounded"></div>
              <div className="bg-current h-0.5 rounded"></div>
            </div>
          </button>
        </div>
      </div>      {/* Appointments List */}
      {viewMode === 'list' ? (
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <img
                        src={appointment.avatar}
                        alt={appointment.studentName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {appointment.studentName}
                          </h4>
                          <span className={`badge ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock size={16} className="mr-2" />
                            {appointment.time} ({appointment.duration} min)
                          </div>
                          <div className="flex items-center">
                            {getModeIcon(appointment.mode)}
                            <span className="ml-2">{appointment.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail size={16} className="mr-2" />
                            {appointment.studentEmail}
                          </div>
                          <div className="flex items-center">
                            <Phone size={16} className="mr-2" />
                            {appointment.studentPhone}
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {appointment.type}
                          </span>
                        </div>

                        {appointment.notes && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{appointment.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <button className="btn btn-primary text-sm">
                        <Eye size={14} className="mr-1" />
                        View
                      </button>
                      <button className="btn btn-outline text-sm">
                        <Edit3 size={14} className="mr-1" />
                        Edit
                      </button>
                      {appointment.status === 'pending' && (
                        <>
                          <button className="btn btn-success text-sm">
                            <CheckCircle size={14} className="mr-1" />
                            Confirm
                          </button>
                          <button className="btn btn-error text-sm">
                            <XCircle size={14} className="mr-1" />
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
                <p className="text-gray-600">Try adjusting your filters or schedule a new appointment</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="card p-4 hover:shadow-medium transition-shadow">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-4 w-full">
                    <img
                      src={appointment.avatar}
                      alt={appointment.studentName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col items-start space-y-2">
                        <h4 className="text-lg text-center w-full font-semibold text-gray-900">
                          {appointment.studentName}
                        </h4>
                        <span className={`badge ${getStatusColor(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 mt-2">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2" />
                          {appointment.time} ({appointment.duration} min)
                        </div>
                        <div className="flex items-center">
                          {getModeIcon(appointment.mode)}
                          <span className="ml-2">{appointment.location}</span>
                        </div>
                      </div>

                      <div className="mt-2 text-center">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row justify-center space-x-2 w-full">
                    <button className="btn btn-primary text-xs px-2 py-1">
                      <Eye size={14} className="mr-1" />
                      View
                    </button>
                    <button className="btn btn-outline text-xs px-2 py-1">
                      <Edit3 size={14} className="mr-1" />
                      Edit
                    </button>
                    {appointment.status === 'pending' && (
                      <>
                        <button className="btn btn-success text-xs px-2 py-1">
                          <CheckCircle size={14} className="mr-1" />
                          OK
                        </button>
                        <button className="btn btn-error text-xs px-2 py-1">
                          <XCircle size={14} className="mr-1" />
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full p-12 text-center">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No appointments found</h3>
              <p className="text-gray-600">Try adjusting your filters or schedule a new appointment</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Appointments;
