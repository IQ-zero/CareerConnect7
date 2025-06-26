import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Briefcase,
  Calendar,
  BookOpen,
  Building2,
  MoreVertical,
  Archive,
  Copy,
  ExternalLink
} from 'lucide-react';

const ContentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'events' | 'courses' | 'companies'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockJobs = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechVision Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'active',
      applications: 45,
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      postedBy: 'Sarah Mitchell'
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'FinanceHub',
      location: 'New York, NY',
      type: 'Full-time',
      status: 'active',
      applications: 32,
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      postedBy: 'Michael Chen'
    },
    {
      id: '3',
      title: 'Marketing Intern',
      company: 'CreativeDesign',
      location: 'Los Angeles, CA',
      type: 'Internship',
      status: 'draft',
      applications: 0,
      postedDate: '2024-01-20',
      deadline: '2024-03-01',
      postedBy: 'Emily Rodriguez'
    }
  ];

  const mockEvents = [
    {
      id: '1',
      title: 'Spring Career Fair',
      type: 'Career Fair',
      date: '2024-02-15',
      location: 'University Center',
      status: 'upcoming',
      registrations: 156,
      capacity: 200,
      organizer: 'Career Services'
    },
    {
      id: '2',
      title: 'Resume Workshop',
      type: 'Workshop',
      date: '2024-01-25',
      location: 'Virtual',
      status: 'upcoming',
      registrations: 89,
      capacity: 100,
      organizer: 'Dr. Sarah Johnson'
    },
    {
      id: '3',
      title: 'Tech Industry Panel',
      type: 'Info Session',
      date: '2024-01-20',
      location: 'Engineering Building',
      status: 'completed',
      registrations: 120,
      capacity: 150,
      organizer: 'Computer Science Dept'
    }
  ];

  const mockCourses = [
    {
      id: '1',
      title: 'Full-Stack Web Development',
      instructor: 'Dr. Michael Rodriguez',
      category: 'Programming',
      level: 'Intermediate',
      status: 'published',
      enrolled: 247,
      rating: 4.8,
      duration: '12 weeks'
    },
    {
      id: '2',
      title: 'Data Science Fundamentals',
      instructor: 'Prof. Sarah Johnson',
      category: 'Data Science',
      level: 'Beginner',
      status: 'published',
      enrolled: 189,
      rating: 4.9,
      duration: '8 weeks'
    },
    {
      id: '3',
      title: 'Career Development Essentials',
      instructor: 'Lisa Thompson',
      category: 'Career Development',
      level: 'Beginner',
      status: 'draft',
      enrolled: 0,
      rating: 0,
      duration: '4 weeks'
    }
  ];

  const mockCompanies = [
    {
      id: '1',
      name: 'TechVision Inc.',
      industry: 'Technology',
      size: '1000-5000',
      status: 'verified',
      openJobs: 12,
      totalApplications: 234,
      joinDate: '2022-08-20'
    },
    {
      id: '2',
      name: 'FinanceHub',
      industry: 'Finance',
      size: '500-1000',
      status: 'verified',
      openJobs: 8,
      totalApplications: 189,
      joinDate: '2023-01-15'
    },
    {
      id: '3',
      name: 'StartupCo',
      industry: 'Technology',
      size: '10-50',
      status: 'pending',
      openJobs: 3,
      totalApplications: 45,
      joinDate: '2024-01-10'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
      case 'verified':
      case 'upcoming': return 'badge-success';
      case 'draft':
      case 'pending': return 'badge-warning';
      case 'closed':
      case 'archived':
      case 'completed': return 'badge-secondary';
      case 'suspended': return 'badge-error';
      default: return 'badge-primary';
    }
  };

  const renderJobsTab = () => (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input w-full md:w-48"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="closed">Closed</option>
        </select>
        <button className="btn btn-primary">
          <Plus size={16} className="mr-2" />
          Add Job
        </button>
      </div>

      <div className="space-y-3">
        {mockJobs.map(job => (
          <div key={job.id} className="card p-4 hover:shadow-medium transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                  </div>
                  <span className={`badge ${getStatusColor(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div>Type: {job.type}</div>
                  <div>Applications: {job.applications}</div>
                  <div>Posted: {new Date(job.postedDate).toLocaleDateString()}</div>
                  <div>Deadline: {new Date(job.deadline).toLocaleDateString()}</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Posted by: {job.postedBy}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-primary-600">
                  <Eye size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-error-600">
                  <Trash2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEventsTab = () => (
    <div className="space-y-4">
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input w-full md:w-48"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn btn-primary">
          <Plus size={16} className="mr-2" />
          Add Event
        </button>
      </div>

      <div className="space-y-3">
        {mockEvents.map(event => (
          <div key={event.id} className="card p-4 hover:shadow-medium transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.type} • {event.location}</p>
                  </div>
                  <span className={`badge ${getStatusColor(event.status)}`}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div>Date: {new Date(event.date).toLocaleDateString()}</div>
                  <div>Registrations: {event.registrations}/{event.capacity}</div>
                  <div>Organizer: {event.organizer}</div>
                  <div>Capacity: {Math.round((event.registrations / event.capacity) * 100)}% full</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-primary-600">
                  <Eye size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-error-600">
                  <Trash2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCoursesTab = () => (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input w-full md:w-48"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <button className="btn btn-primary">
          <Plus size={16} className="mr-2" />
          Add Course
        </button>
      </div>

      <div className="space-y-3">
        {mockCourses.map(course => (
          <div key={course.id} className="card p-4 hover:shadow-medium transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600">by {course.instructor} • {course.category}</p>
                  </div>
                  <span className={`badge ${getStatusColor(course.status)}`}>
                    {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div>Level: {course.level}</div>
                  <div>Duration: {course.duration}</div>
                  <div>Enrolled: {course.enrolled}</div>
                  <div>Rating: {course.rating > 0 ? `${course.rating}/5` : 'No ratings'}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-primary-600">
                  <Eye size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-secondary-600">
                  <Copy size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-error-600">
                  <Archive size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompaniesTab = () => (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input w-full md:w-48"
        >
          <option value="all">All Status</option>
          <option value="verified">Verified</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
        <button className="btn btn-primary">
          <Plus size={16} className="mr-2" />
          Add Company
        </button>
      </div>

      <div className="space-y-3">
        {mockCompanies.map(company => (
          <div key={company.id} className="card p-4 hover:shadow-medium transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-600">{company.industry} • {company.size} employees</p>
                  </div>
                  <span className={`badge ${getStatusColor(company.status)}`}>
                    {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                  <div>Open Jobs: {company.openJobs}</div>
                  <div>Applications: {company.totalApplications}</div>
                  <div>Joined: {new Date(company.joinDate).toLocaleDateString()}</div>
                  <div>Industry: {company.industry}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-primary-600">
                  <Eye size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-primary-600">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-secondary-600">
                  <ExternalLink size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-error-600">
                  <Trash2 size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600">Manage jobs, events, courses, and company profiles</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-primary-100 mb-3 mx-auto w-fit">
            <Briefcase size={24} className="text-primary-600" />
          </div>
          <h3 className="font-medium mb-1">Active Jobs</h3>
          <p className="text-2xl font-bold text-primary-600">{mockJobs.filter(j => j.status === 'active').length}</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-secondary-100 mb-3 mx-auto w-fit">
            <Calendar size={24} className="text-secondary-600" />
          </div>
          <h3 className="font-medium mb-1">Upcoming Events</h3>
          <p className="text-2xl font-bold text-secondary-600">{mockEvents.filter(e => e.status === 'upcoming').length}</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-accent-100 mb-3 mx-auto w-fit">
            <BookOpen size={24} className="text-accent-600" />
          </div>
          <h3 className="font-medium mb-1">Published Courses</h3>
          <p className="text-2xl font-bold text-accent-600">{mockCourses.filter(c => c.status === 'published').length}</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-success-100 mb-3 mx-auto w-fit">
            <Building2 size={24} className="text-success-600" />
          </div>
          <h3 className="font-medium mb-1">Verified Companies</h3>
          <p className="text-2xl font-bold text-success-600">{mockCompanies.filter(c => c.status === 'verified').length}</p>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'jobs'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Briefcase size={16} className="mr-2" />
              Jobs ({mockJobs.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'events'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar size={16} className="mr-2" />
              Events ({mockEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'courses'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen size={16} className="mr-2" />
              Courses ({mockCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'companies'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Building2 size={16} className="mr-2" />
              Companies ({mockCompanies.length})
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'jobs' && renderJobsTab()}
          {activeTab === 'events' && renderEventsTab()}
          {activeTab === 'courses' && renderCoursesTab()}
          {activeTab === 'companies' && renderCompaniesTab()}
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="card p-4">
        <h3 className="font-medium mb-4">Bulk Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline text-sm">Export Data</button>
          <button className="btn btn-outline text-sm">Bulk Edit</button>
          <button className="btn btn-outline text-sm">Archive Selected</button>
          <button className="btn btn-outline text-sm text-error-600 border-error-200 hover:bg-error-50">
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;