import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  MapPin,
  DollarSign,
  X,
  Save,
  Copy,
  Share2,
  BarChart3,
  Clock,
  Building
} from 'lucide-react';

// TypeScript interfaces
interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: string;
  status: 'active' | 'draft' | 'closed' | 'paused';
  applications: number;
  postedDate: string;
  deadline: string;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  remote: boolean;
}

interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: Job['type'];
  salary: string;
  description: string;
  requirements: string;
  benefits: string;
  deadline: string;
  remote: boolean;
}

const JobManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [viewingJob, setViewingJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    deadline: '',
    remote: false
  });

  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      status: 'active',
      applications: 45,
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      description: 'We are looking for a Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions.',
      requirements: ['5+ years of software development experience', 'Proficiency in React, Node.js, and TypeScript', 'Experience with cloud platforms (AWS/GCP)', 'Strong problem-solving skills'],
      benefits: ['Health insurance', 'Dental coverage', '401k matching', 'Flexible work hours', 'Remote work options'],
      remote: true
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $130,000',
      status: 'active',
      applications: 32,
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      description: 'Join our product team to drive strategy and execution for our core products. You will work closely with engineering, design, and business teams.',
      requirements: ['3+ years of product management experience', 'Strong analytical skills', 'Experience with Agile methodologies', 'Excellent communication skills'],
      benefits: ['Competitive salary', 'Stock options', 'Health benefits', 'Learning stipend'],
      remote: true
    },
    {
      id: '3',
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$60,000 - $80,000',
      status: 'draft',
      applications: 0,
      postedDate: '2024-01-20',
      deadline: '2024-03-01',
      description: 'We are seeking a creative Marketing Specialist to help grow our brand presence and drive customer acquisition.',
      requirements: ['2+ years of marketing experience', 'Proficiency in digital marketing tools', 'Creative thinking', 'Data-driven mindset'],
      benefits: ['Health insurance', 'PTO', 'Professional development budget', 'Team events'],
      remote: false
    },
    {
      id: '4',
      title: 'UX Designer',
      department: 'Design',
      location: 'Seattle, WA',
      type: 'Contract',
      salary: '$80 - $100/hour',
      status: 'active',
      applications: 28,
      postedDate: '2024-01-08',
      deadline: '2024-02-08',
      description: 'Looking for a talented UX Designer to create intuitive and engaging user experiences for our digital products.',
      requirements: ['3+ years of UX design experience', 'Proficiency in Figma and Adobe Creative Suite', 'Portfolio demonstrating user-centered design', 'Strong collaboration skills'],
      benefits: ['Competitive hourly rate', 'Flexible schedule', 'Remote work options', 'Creative freedom'],
      remote: true
    }
  ];

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePostNewJob = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      salary: '',
      description: '',
      requirements: '',
      benefits: '',
      deadline: '',
      remote: false
    });
    setShowJobForm(true);
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description || '',
      requirements: job.requirements?.join('\n') || '',
      benefits: job.benefits?.join('\n') || '',
      deadline: job.deadline,
      remote: job.remote
    });
    setShowJobForm(true);
  };

  const handleViewJob = (job: Job) => {
    setViewingJob(job);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Deleting job:', jobId);
      setIsLoading(false);
    }
  };

  const handleSubmitJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (editingJob) {
      console.log('Updating job:', editingJob.id, formData);
    } else {
      console.log('Creating new job:', formData);
    }
    
    setIsLoading(false);
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleCloseForm = () => {
    setShowJobForm(false);
    setEditingJob(null);
  };

  const handleCloseView = () => {
    setViewingJob(null);
  };

  const handleStatusChange = async (jobId: string, newStatus: Job['status']) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Updating job ${jobId} status to ${newStatus}`);
    setIsLoading(false);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'draft': return 'badge-warning';
      case 'paused': return 'badge-accent';
      case 'closed': return 'badge-error';
      default: return 'badge-primary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Management</h1>
          <p className="text-gray-600">Create and manage your job postings</p>
        </div>
        <button 
          onClick={handlePostNewJob}
          className="btn btn-primary mt-4 md:mt-0"
        >
          <Plus size={16} className="mr-2" />
          Post New Job
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building size={20} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Jobs</p>
              <p className="text-lg font-semibold">{mockJobs.length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 size={20} className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-lg font-semibold">{mockJobs.filter(j => j.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users size={20} className="text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-lg font-semibold">{mockJobs.reduce((sum, job) => sum + job.applications, 0)}</p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">Draft Jobs</p>
              <p className="text-lg font-semibold">{mockJobs.filter(j => j.status === 'draft').length}</p>
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
              placeholder="Search jobs by title, department, or location..."
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
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <button className="btn btn-outline">
          <Filter size={16} className="mr-2" />
          More Filters
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map(job => {
          const daysLeft = getDaysUntilDeadline(job.deadline);
          return (
            <div key={job.id} className="card p-6 hover:shadow-medium transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-600 flex items-center">
                        <Building size={14} className="mr-1" />
                        {job.department}
                        {job.remote && (
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Remote
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`badge ${getStatusColor(job.status)}`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                      {daysLeft > 0 && daysLeft <= 7 && (
                        <span className="badge badge-warning">
                          {daysLeft} days left
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={16} className="mr-2 text-gray-400" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users size={16} className="mr-2 text-gray-400" />
                      {job.applications} applications
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                    <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-4 lg:mt-0 lg:ml-6 lg:w-48">
                  <button 
                    onClick={() => handleViewJob(job)}
                    className="btn btn-outline text-sm"
                  >
                    <Eye size={14} className="mr-2" />
                    View Details
                  </button>
                  <button 
                    onClick={() => handleEditJob(job)}
                    className="btn btn-outline text-sm"
                  >
                    <Edit size={14} className="mr-2" />
                    Edit Job
                  </button>
                  
                  {/* Status Quick Actions */}
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value as Job['status'])}
                    className="input text-sm"
                    disabled={isLoading}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="paused">Paused</option>
                    <option value="closed">Closed</option>
                  </select>
                  
                  <div className="flex gap-1">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.origin + `/jobs/${job.id}`);
                        alert('Job link copied to clipboard!');
                      }}
                      className="btn btn-outline text-sm flex-1"
                      title="Copy job link"
                    >
                      <Copy size={12} />
                    </button>
                    <button 
                      onClick={() => {
                        const url = window.location.origin + `/jobs/${job.id}`;
                        if (navigator.share) {
                          navigator.share({ title: job.title, url });
                        } else {
                          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(job.title)}&url=${encodeURIComponent(url)}`, '_blank');
                        }
                      }}
                      className="btn btn-outline text-sm flex-1"
                      title="Share job"
                    >
                      <Share2 size={12} />
                    </button>
                    <button 
                      onClick={() => handleDeleteJob(job.id)}
                      className="btn btn-outline text-sm flex-1 text-red-600 border-red-200 hover:bg-red-50"
                      title="Delete job"
                      disabled={isLoading}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search filters or create a new job posting</p>
            <button 
              onClick={handlePostNewJob}
              className="btn btn-primary mt-4"
            >
              <Plus size={16} className="mr-2" />
              Post Your First Job
            </button>
          </div>
        )}
      </div>

      {/* Job Form Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingJob ? 'Edit Job' : 'Post New Job'}
                </h2>
                <button 
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmitJob} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="input w-full"
                      required
                      placeholder="e.g. Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="input w-full"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Product">Product</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">Human Resources</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="input w-full"
                      required
                      placeholder="e.g. San Francisco, CA or Remote"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as Job['type']})}
                      className="input w-full"
                      required
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range *
                    </label>
                    <input
                      type="text"
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                      className="input w-full"
                      required
                      placeholder="e.g. $80,000 - $120,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                      className="input w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.remote}
                      onChange={(e) => setFormData({...formData, remote: e.target.checked})}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Remote work available</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="input w-full h-32"
                    required
                    placeholder="Describe the role, responsibilities, and what you're looking for..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Requirements (one per line)
                  </label>
                  <textarea
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    className="input w-full h-24"
                    placeholder="e.g. 3+ years of experience&#10;Bachelor's degree&#10;Proficiency in JavaScript"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Benefits (one per line)
                  </label>
                  <textarea
                    value={formData.benefits}
                    onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                    className="input w-full h-24"
                    placeholder="e.g. Health insurance&#10;401k matching&#10;Flexible hours"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary flex-1"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {editingJob ? 'Updating...' : 'Creating...'}
                      </div>
                    ) : (
                      <>
                        <Save size={16} className="mr-2" />
                        {editingJob ? 'Update Job' : 'Post Job'}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="btn btn-outline flex-1"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Job View Modal */}
      {viewingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{viewingJob.title}</h2>
                  <p className="text-gray-600">{viewingJob.department} • {viewingJob.location}</p>
                </div>
                <button 
                  onClick={handleCloseView}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-medium">{viewingJob.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Salary</p>
                    <p className="font-medium">{viewingJob.salary}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Applications</p>
                    <p className="font-medium">{viewingJob.applications}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`badge ${getStatusColor(viewingJob.status)}`}>
                      {viewingJob.status.charAt(0).toUpperCase() + viewingJob.status.slice(1)}
                    </span>
                  </div>
                </div>

                {viewingJob.description && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{viewingJob.description}</p>
                  </div>
                )}

                {viewingJob.requirements && viewingJob.requirements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {viewingJob.requirements.map((req, index) => (
                        <li key={index} className="text-gray-700">{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {viewingJob.benefits && viewingJob.benefits.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {viewingJob.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between text-sm text-gray-500 pt-4 border-t">
                  <span>Posted: {new Date(viewingJob.postedDate).toLocaleDateString()}</span>
                  <span>Deadline: {new Date(viewingJob.deadline).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      handleCloseView();
                      handleEditJob(viewingJob);
                    }}
                    className="btn btn-primary"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Job
                  </button>
                  <button
                    onClick={handleCloseView}
                    className="btn btn-outline"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManagement;