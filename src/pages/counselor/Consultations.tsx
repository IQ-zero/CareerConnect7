import React, { useState } from 'react';
import { 
  MessageSquare, 
  Clock, 
  User, 
  Calendar,
  Plus,
  Eye,
  Search,
  Star,
  TrendingUp,
  CheckCircle,
  Target
} from 'lucide-react';

const Consultations: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Mock consultations data
  const consultations = [
    {
      id: '1',
      studentName: 'Alex Johnson',
      studentId: 'ST001',
      date: '2025-06-25',
      duration: 60,
      type: 'Career Planning',
      status: 'completed',
      rating: 5,
      topics: ['Software Engineering', 'Interview Prep', 'Resume Review'],
      goals: ['Land software engineering internship', 'Improve technical skills'],
      outcomes: ['Updated resume', 'Interview strategy developed', 'Skills gap identified'],
      notes: 'Student showed great progress in understanding technical interview process. Recommended practice with coding challenges.',
      nextSession: '2025-07-02',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      studentName: 'Sarah Wilson',
      studentId: 'ST002',
      date: '2025-06-24',
      duration: 45,
      type: 'Academic Guidance',
      status: 'completed',
      rating: 5,
      topics: ['Course Selection', 'Career Path', 'Networking'],
      goals: ['Choose marketing specialization', 'Build professional network'],
      outcomes: ['Course plan finalized', 'LinkedIn profile updated', 'Networking events identified'],
      notes: 'Student is very motivated and clear about career direction. Provided contacts in marketing field.',
      nextSession: '2025-07-01',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      studentName: 'Michael Chen',
      studentId: 'ST003',
      date: '2025-06-26',
      duration: 45,
      type: 'Crisis Support',
      status: 'in-progress',
      rating: null,
      topics: ['Academic Stress', 'Career Uncertainty', 'Mental Health'],
      goals: ['Reduce academic anxiety', 'Clarify career direction'],
      outcomes: ['Stress management techniques learned', 'Academic support resources provided'],
      notes: 'Student experiencing high stress levels. Referred to mental health services. Follow-up scheduled.',
      nextSession: '2025-06-28',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '4',
      studentName: 'Emily Rodriguez',
      studentId: 'ST004',
      date: '2025-06-23',
      duration: 60,
      type: 'Goal Setting',
      status: 'completed',
      rating: 4,
      topics: ['Graduate School', 'Research Opportunities', 'Time Management'],
      goals: ['Apply to graduate programs', 'Develop research skills'],
      outcomes: ['Graduate school list created', 'Research mentor identified', 'Application timeline set'],
      notes: 'Well-prepared student with clear academic goals. Needs help with time management for application process.',
      nextSession: '2025-07-05',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '5',
      studentName: 'David Thompson',
      studentId: 'ST005',
      date: '2025-06-22',
      duration: 30,
      type: 'Follow-up',
      status: 'completed',
      rating: 5,
      topics: ['Job Search Update', 'Interview Feedback', 'Networking'],
      goals: ['Secure finance internship', 'Improve interview performance'],
      outcomes: ['Interview feedback analyzed', 'New applications planned', 'Networking strategy refined'],
      notes: 'Student has made significant progress. Received positive feedback from recent interviews.',
      nextSession: '2025-06-29',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const consultationTypes = ['Career Planning', 'Academic Guidance', 'Crisis Support', 'Goal Setting', 'Follow-up'];

  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = consultation.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      consultation.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
    const matchesType = typeFilter === 'all' || consultation.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'badge-success';
      case 'in-progress': return 'badge-warning';
      case 'scheduled': return 'badge-primary';
      case 'cancelled': return 'badge-error';
      default: return 'badge-gray';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Career Planning': return 'bg-blue-100 text-blue-800';
      case 'Academic Guidance': return 'bg-green-100 text-green-800';
      case 'Crisis Support': return 'bg-red-100 text-red-800';
      case 'Goal Setting': return 'bg-purple-100 text-purple-800';
      case 'Follow-up': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400 text-sm">Not rated</span>;
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultations</h1>
          <p className="text-gray-600">Track and review your counseling sessions</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="btn btn-primary">
            <Plus size={16} className="mr-2" />
            New Session
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-lg font-semibold text-gray-900">{consultations.length}</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-lg font-semibold text-gray-900">
                {consultations.filter(c => c.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-lg font-semibold text-gray-900">
                {(consultations.filter(c => c.rating).reduce((sum, c) => sum + (c.rating || 0), 0) / 
                  consultations.filter(c => c.rating).length || 0).toFixed(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-lg font-semibold text-gray-900">
                {consultations.filter(c => {
                  const consultationDate = new Date(c.date);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return consultationDate >= weekAgo;
                }).length}
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
              placeholder="Search by student name, type, or topics..."
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
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="scheduled">Scheduled</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>        <div className="w-full md:w-48">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="input w-full"
          >
            <option value="all">All Types</option>
            {consultationTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
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
      </div>      {/* Consultations List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredConsultations.length > 0 ? (
          filteredConsultations.map((consultation) => (
            <div key={consultation.id} className={`card hover:shadow-medium transition-shadow ${viewMode === 'grid' ? 'p-4' : 'p-6'}`}>
              <div className={`flex ${viewMode === 'grid' ? 'flex-col space-y-4' : 'items-start justify-between'} mb-4`}>
                <div className={`flex ${viewMode === 'grid' ? 'flex-col items-center text-center' : 'items-start'} space-x-${viewMode === 'grid' ? '0' : '4'} ${viewMode === 'grid' ? 'space-y-3' : ''}`}>
                  <img
                    src={consultation.avatar}
                    alt={consultation.studentName}
                    className={`${viewMode === 'grid' ? 'w-16 h-16' : 'w-12 h-12'} rounded-full object-cover`}
                  />
                  <div className="flex-1">
                    <div className={`flex ${viewMode === 'grid' ? 'flex-col items-center space-y-2' : 'items-center space-x-3'} mb-2`}>
                      <h3 className={`${viewMode === 'grid' ? 'text-lg text-center' : 'text-lg'} font-semibold text-gray-900`}>
                        {consultation.studentName}
                      </h3>
                      <span className={`badge ${getStatusColor(consultation.status)}`}>
                        {consultation.status.replace('-', ' ').charAt(0).toUpperCase() + 
                         consultation.status.replace('-', ' ').slice(1)}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(consultation.type)}`}>
                        {consultation.type}
                      </span>
                    </div>
                    <div className={`flex ${viewMode === 'grid' ? 'flex-col space-y-1' : 'items-center space-x-4'} text-sm text-gray-600 mb-2`}>
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {new Date(consultation.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {consultation.duration} minutes
                      </span>
                      {viewMode === 'list' && (
                        <span className="flex items-center">
                          <User size={16} className="mr-1" />
                          {consultation.studentId}
                        </span>
                      )}
                    </div>
                    {renderStars(consultation.rating)}
                  </div>
                </div>
                
                {viewMode === 'list' && (
                  <div className="flex space-x-2">
                    <button className="btn btn-primary text-sm">
                      <Eye size={14} className="mr-1" />
                      View Details
                    </button>
                  </div>
                )}
              </div>

              <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'gap-4' : 'md:grid-cols-3 gap-6'}`}>
                <div>
                  <h4 className={`font-medium text-gray-900 mb-2 ${viewMode === 'grid' ? 'text-sm' : ''}`}>Topics Discussed</h4>
                  <div className="flex flex-wrap gap-1">
                    {consultation.topics.slice(0, viewMode === 'grid' ? 2 : consultation.topics.length).map((topic, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {topic}
                      </span>
                    ))}
                    {viewMode === 'grid' && consultation.topics.length > 2 && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                        +{consultation.topics.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {viewMode === 'list' && (
                  <>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Student Goals</h4>
                      <ul className="space-y-1">
                        {consultation.goals.map((goal, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <Target size={12} className="mr-2 text-blue-500" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Key Outcomes</h4>
                      <ul className="space-y-1">
                        {consultation.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-700">
                            <CheckCircle size={12} className="mr-2 text-green-500" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>

              {viewMode === 'grid' && (
                <div className="mt-4 flex space-x-2">
                  <button className="btn btn-primary text-xs w-full">
                    <Eye size={12} className="mr-1" />
                    View Details
                  </button>
                </div>
              )}

              {viewMode === 'list' && consultation.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Session Notes</h4>
                  <p className="text-sm text-gray-700">{consultation.notes}</p>
                </div>
              )}

              {consultation.nextSession && (
                <div className="mt-4 flex items-center text-sm text-blue-600">
                  <Calendar size={16} className="mr-2" />
                  Next session scheduled: {new Date(consultation.nextSession).toLocaleDateString()}
                </div>
              )}
            </div>          ))
        ) : (
          <div className={`${viewMode === 'grid' ? 'col-span-full' : ''} card p-12 text-center`}>
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No consultations found</h3>
            <p className="text-gray-600">Try adjusting your filters or conduct a new session</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultations;
