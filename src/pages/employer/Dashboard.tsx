import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  TrendingUp, 
  Plus,
  Eye,
  Edit,
  Building2,
  Clock,
  CheckCircle,
  MessageSquare,
  Star,
  Filter,
  Search,
  ArrowUpRight,
  MapPin,
  DollarSign
} from 'lucide-react';

const EmployerDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for dashboard
  const dashboardStats = {
    activeJobs: 12,
    totalApplications: 89,
    pendingInterviews: 15,
    hiresThisMonth: 7,
    applicationGrowth: 23.5,
    jobViewsThisWeek: 1247,
    averageTimeToHire: 18,
    topPerformingJob: 'Senior Software Engineer'
  };

  const recentJobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      postedDate: '2024-01-20',
      applications: 45,
      views: 234,
      status: 'active',
      urgency: 'high'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $140,000',
      postedDate: '2024-01-18',
      applications: 32,
      views: 189,
      status: 'active',
      urgency: 'medium'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$85,000 - $110,000',
      postedDate: '2024-01-15',
      applications: 28,
      views: 156,
      status: 'paused',
      urgency: 'low'
    }
  ];

  const recentApplications = [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      jobTitle: 'Senior Software Engineer',
      appliedDate: '2024-01-22',
      status: 'under_review',
      rating: 4.5,
      experience: '5 years',
      location: 'San Francisco, CA',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      education: 'BS Computer Science, Stanford University',
      previousCompanies: ['Google', 'Meta'],
      availability: 'Immediate',
      expectedSalary: '$140,000 - $160,000',
      resumeScore: 92,
      interviewsCompleted: 2
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      jobTitle: 'Product Manager',
      appliedDate: '2024-01-21',
      status: 'interview_scheduled',
      rating: 4.2,
      experience: '3 years',
      location: 'Remote',
      skills: ['Product Strategy', 'Analytics', 'Agile', 'SQL'],
      education: 'MBA, UC Berkeley',
      previousCompanies: ['Airbnb', 'Slack'],
      availability: '2 weeks notice',
      expectedSalary: '$120,000 - $140,000',
      resumeScore: 88,
      interviewsCompleted: 1
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      jobTitle: 'UX Designer',
      appliedDate: '2024-01-20',
      status: 'shortlisted',
      rating: 4.8,
      experience: '4 years',
      location: 'New York, NY',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
      education: 'BFA Design, Parsons School of Design',
      previousCompanies: ['Adobe', 'Spotify'],
      availability: 'Immediate',
      expectedSalary: '$95,000 - $115,000',
      resumeScore: 95,
      interviewsCompleted: 3
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidateName: 'Alex Thompson',
      jobTitle: 'Senior Software Engineer',
      interviewType: 'Technical Interview',
      date: '2024-01-24',
      time: '2:00 PM',
      interviewer: 'John Smith',
      status: 'confirmed'
    },
    {
      id: 2,
      candidateName: 'Maria Garcia',
      jobTitle: 'Product Manager',
      interviewType: 'Final Interview',
      date: '2024-01-24',
      time: '4:00 PM',
      interviewer: 'Jane Doe',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'paused': return 'badge-warning';
      case 'closed': return 'badge-error';
      case 'under_review': return 'badge-warning';
      case 'interview_scheduled': return 'badge-primary';
      case 'shortlisted': return 'badge-success';
      case 'rejected': return 'badge-error';
      case 'confirmed': return 'badge-success';
      case 'pending': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome section with personalized greeting */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name || 'HR Manager'}!</h1>
              <p className="mt-2 text-primary-100">
                You have {dashboardStats.totalApplications} new applications and {dashboardStats.pendingInterviews} pending interviews today.
              </p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <TrendingUp size={16} className="mr-1" />
                  <span>{dashboardStats.applicationGrowth}% more applications this week</span>
                </div>
                <div className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  <span>{dashboardStats.jobViewsThisWeek} job views this week</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button className="btn bg-white text-primary-700 hover:bg-primary-50">
                <Plus size={16} className="mr-2" />
                Post New Job
              </button>
              <button className="btn bg-primary-500 text-white hover:bg-primary-400">
                <Users size={16} className="mr-2" />
                View All Candidates
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats overview with trends */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 mr-3">
                <Briefcase size={20} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.activeJobs}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-success-600 text-sm">
                <ArrowUpRight size={16} />
                <span>+2</span>
              </div>
              <p className="text-xs text-gray-500">This week</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary-100 mr-3">
                <Users size={20} className="text-secondary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalApplications}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-success-600 text-sm">
                <ArrowUpRight size={16} />
                <span>+{dashboardStats.applicationGrowth}%</span>
              </div>
              <p className="text-xs text-gray-500">This week</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-accent-100 mr-3">
                <Calendar size={20} className="text-accent-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.pendingInterviews}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-warning-600 text-sm">
                <Clock size={16} />
                <span>2 today</span>
              </div>
              <p className="text-xs text-gray-500">Scheduled</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 mr-3">
                <CheckCircle size={20} className="text-success-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hires This Month</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.hiresThisMonth}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-success-600 text-sm">
                <ArrowUpRight size={16} />
                <span>+3</span>
              </div>
              <p className="text-xs text-gray-500">vs last month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            <MessageSquare size={20} className="text-gray-400" />
          </div>
          <div className="space-y-2">
            <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Schedule Interview
            </button>
            <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Review Applications
            </button>
            <button className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
              Send Job Offer
            </button>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Top Performing Job</h3>
            <Star size={20} className="text-yellow-400" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{dashboardStats.topPerformingJob}</p>
            <p className="text-sm text-gray-600">45 applications in 3 days</p>
            <div className="mt-2 flex items-center text-success-600 text-sm">
              <TrendingUp size={16} className="mr-1" />
              <span>High engagement rate</span>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Hiring Metrics</h3>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg. Time to Hire</span>
              <span className="text-sm font-medium">{dashboardStats.averageTimeToHire} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Interview Rate</span>
              <span className="text-sm font-medium">32%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Offer Acceptance</span>
              <span className="text-sm font-medium">85%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent job postings with enhanced data */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Job Postings</h2>
          <div className="flex space-x-2">
            <button className="btn btn-outline text-sm">
              <Filter size={16} className="mr-1" />
              Filter
            </button>
            <button className="text-primary-600 text-sm hover:underline">
              View All Jobs
            </button>
          </div>
        </div>
        
        <div className="space-y-3">
          {recentJobs.map((job) => (
            <div key={job.id} className="card p-4 hover:shadow-medium transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-start flex-1">
                  <Building2 size={20} className="text-gray-400 mr-3 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{job.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getUrgencyColor(job.urgency)}`}>
                        {job.urgency} priority
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={14} className="mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Users size={14} className="mr-1" />
                        {job.applications} applications
                      </div>
                      <div className="flex items-center">
                        <Eye size={14} className="mr-1" />
                        {job.views} views
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Posted {new Date(job.postedDate).toLocaleDateString()} • {job.department} • {job.type}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className={`badge ${getStatusColor(job.status)}`}>
                    {job.status.replace('_', ' ')}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-primary-600">
                    <Eye size={16} />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-primary-600">
                    <Edit size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced applications section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Applications</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>View:</span>
              <button className="p-1 rounded hover:bg-gray-100">
                <div className="grid grid-cols-3 gap-0.5 w-4 h-4">
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                  <div className="bg-gray-400 rounded-sm"></div>
                </div>
              </button>
              <button className="p-1 rounded bg-primary-100">
                <div className="flex flex-col space-y-0.5 w-4 h-4">
                  <div className="bg-primary-600 h-0.5 rounded"></div>
                  <div className="bg-primary-600 h-0.5 rounded"></div>
                  <div className="bg-primary-600 h-0.5 rounded"></div>
                </div>
              </button>
            </div>
            <button className="btn btn-outline text-sm">
              <Search size={16} className="mr-1" />
              Search
            </button>
            <button className="text-primary-600 text-sm hover:underline">
              View All Applications
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {recentApplications.map((application) => (
            <div key={application.id} className="card p-6 hover:shadow-medium transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Candidate Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {application.candidateName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{application.candidateName}</h3>
                        <p className="text-gray-600">Applied for {application.jobTitle}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`badge ${getStatusColor(application.status)}`}>
                          {application.status.replace('_', ' ')}
                        </span>
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{application.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        {application.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase size={16} className="mr-2 text-gray-400" />
                        {application.experience} experience
                      </div>
                      <div className="flex items-center text-gray-600">
                        <DollarSign size={16} className="mr-2 text-gray-400" />
                        {application.expectedSalary}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Education & Background:</p>
                      <p className="text-sm text-gray-700 mb-1">{application.education}</p>
                      <p className="text-sm text-gray-600">
                        Previous: {application.previousCompanies.join(', ')}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {application.skills.map(skill => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Applied:</span>
                        <br />
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Availability:</span>
                        <br />
                        {application.availability}
                      </div>
                      <div>
                        <span className="font-medium">Resume Score:</span>
                        <br />
                        <span className="text-success-600 font-medium">{application.resumeScore}%</span>
                      </div>
                      <div>
                        <span className="font-medium">Interviews:</span>
                        <br />
                        {application.interviewsCompleted} completed
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  <button className="btn btn-primary text-sm">
                    <Eye size={14} className="mr-2" />
                    View Full Profile
                  </button>
                  <button className="btn btn-outline text-sm">
                    <Calendar size={14} className="mr-2" />
                    Schedule Interview
                  </button>
                  <button className="btn btn-outline text-sm">
                    <MessageSquare size={14} className="mr-2" />
                    Send Message
                  </button>
                  <button className="btn btn-outline text-sm">
                    <Star size={14} className="mr-2" />
                    Rate Candidate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Candidate Pipeline */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Hiring Pipeline</h2>
          <button className="text-primary-600 text-sm hover:underline">
            View Full Pipeline
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="card p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Applied</h4>
              <span className="text-2xl font-bold text-blue-600">89</span>
            </div>
            <p className="text-sm text-gray-600">New applications</p>
            <div className="mt-2 flex items-center text-sm text-success-600">
              <ArrowUpRight size={14} className="mr-1" />
              <span>+12 this week</span>
            </div>
          </div>
          
          <div className="card p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Screening</h4>
              <span className="text-2xl font-bold text-yellow-600">34</span>
            </div>
            <p className="text-sm text-gray-600">Under review</p>
            <div className="mt-2 flex items-center text-sm text-warning-600">
              <Clock size={14} className="mr-1" />
              <span>Avg. 2 days</span>
            </div>
          </div>
          
          <div className="card p-4 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Interview</h4>
              <span className="text-2xl font-bold text-purple-600">15</span>
            </div>
            <p className="text-sm text-gray-600">Scheduled</p>
            <div className="mt-2 flex items-center text-sm text-primary-600">
              <Calendar size={14} className="mr-1" />
              <span>5 this week</span>
            </div>
          </div>
          
          <div className="card p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Offer</h4>
              <span className="text-2xl font-bold text-green-600">7</span>
            </div>
            <p className="text-sm text-gray-600">Pending response</p>
            <div className="mt-2 flex items-center text-sm text-success-600">
              <CheckCircle size={14} className="mr-1" />
              <span>85% accept rate</span>
            </div>
          </div>
          
          <div className="card p-4 border-l-4 border-primary-500">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Hired</h4>
              <span className="text-2xl font-bold text-primary-600">23</span>
            </div>
            <p className="text-sm text-gray-600">This quarter</p>
            <div className="mt-2 flex items-center text-sm text-success-600">
              <Star size={14} className="mr-1" />
              <span>Goal: 30</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming interviews section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Today's Interviews</h2>
          <button className="text-primary-600 text-sm hover:underline">
            View Calendar
          </button>
        </div>
        
        <div className="space-y-3">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="card p-4 border-l-4 border-primary-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-primary-100 mr-3">
                    <Calendar size={16} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{interview.candidateName}</h3>
                    <p className="text-sm text-gray-600">
                      {interview.interviewType} for {interview.jobTitle}
                    </p>
                    <p className="text-sm text-gray-500">
                      {interview.time} • Interviewer: {interview.interviewer}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`badge ${getStatusColor(interview.status)}`}>
                    {interview.status}
                  </span>
                  <button className="btn btn-outline text-sm py-1 px-3">
                    Join Meeting
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {upcomingInterviews.length === 0 && (
          <div className="card p-6 text-center">
            <Calendar size={24} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">No interviews scheduled for today</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default EmployerDashboard;