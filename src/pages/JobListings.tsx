import { useState, useEffect } from 'react';
import { mockJobs } from '../data/mockData';
import { Job } from '../types';
import { useSavedItems } from '../context/SavedItemsContext';
import { 
  Search, MapPin, Building2, Briefcase, DollarSign, Calendar, 
  ExternalLink, X, Clock, SlidersHorizontal, Bookmark, Share2, Eye, CheckCircle
} from 'lucide-react';
import { format, isWithinInterval, subDays, subWeeks, subMonths } from 'date-fns';

const JobListings = () => {
  const { addItem, removeItem, isItemSaved, savedItems } = useSavedItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [appliedJobTitle, setAppliedJobTitle] = useState('');

  const jobTypes = Array.from(new Set(mockJobs.map(job => job.type))).sort();
  const companies = Array.from(new Set(mockJobs.map(job => job.company.name))).sort();
  const locations = Array.from(new Set(mockJobs.map(job => job.location))).sort();

  // Enhanced filtering logic
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = !selectedType || job.type === selectedType;
    const matchesCompany = !selectedCompany || job.company.name === selectedCompany;
    const matchesLocation = !selectedLocation || job.location === selectedLocation;
    
    // Date range filtering
    const matchesDate = !selectedDateRange || (() => {
      const jobDate = new Date(job.postedDate);
      const now = new Date();
      switch (selectedDateRange) {
        case 'today': return isWithinInterval(jobDate, {start: subDays(now, 1), end: now});
        case 'week': return isWithinInterval(jobDate, {start: subWeeks(now, 1), end: now});
        case 'month': return isWithinInterval(jobDate, {start: subMonths(now, 1), end: now});
        default: return true;
      }
    })();

    // Bookmarked filter
    const matchesBookmarked = !showBookmarked || isItemSaved(job.id);
    
    return matchesSearch && matchesType && matchesCompany && matchesLocation && 
           matchesDate && matchesBookmarked;
  });

  // Sorting logic
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      case 'oldest':
        return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
      case 'company':
        return a.company.name.localeCompare(b.company.name);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'location':
        return a.location.localeCompare(b.location);
      default:
        return 0;
    }
  });

  const toggleBookmark = (jobId: string) => {
    const job = mockJobs.find(j => j.id === jobId);
    if (!job) return;

    if (isItemSaved(jobId)) {
      removeItem(jobId);
    } else {
      addItem({
        id: job.id,
        type: 'job',
        title: job.title,
        subtitle: job.company.name,
        description: job.description,
        location: job.location,
        company: job.company.name,
        salary: job.salary,
        imageUrl: job.company.logo
      });
    }
  };

  const applyForJob = (jobId: string) => {
    const job = mockJobs.find(j => j.id === jobId);
    if (job) {
      const newApplied = new Set(appliedJobs);
      newApplied.add(jobId);
      setAppliedJobs(newApplied);
      setAppliedJobTitle(job.title);
      setShowSuccessMessage(true);
    }
  };

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return format(date, 'MMM d, yyyy');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
            <p className="mt-2 text-gray-600">
              Discover {mockJobs.length} opportunities that match your skills and interests
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2zm0 4h14a1 1 0 110 2H3a1 1 0 110-2z"/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
            </div>
            <button
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={`btn ${showBookmarked ? 'btn-primary' : 'btn-outline'} text-sm py-2`}
            >
              <Bookmark size={16} className="mr-2" />
              {showBookmarked ? 'All Jobs' : 'Saved Jobs'}
            </button>
          </div>
        </div>
      </div>

      {/* Search and Quick Filters */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs by title, company, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 pr-4 w-full h-12 text-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="input w-40"
            >
              <option value="">All Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="input w-48"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'} px-4`}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="mb-6 bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="input w-full"
              >
                <option value="">All Companies</option>
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Posted Date</label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="input w-full"
              >
                <option value="">Any Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input w-full"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="company">Company A-Z</option>
                <option value="title">Job Title A-Z</option>
                <option value="location">Location A-Z</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {sortedJobs.length} jobs found
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('');
                setSelectedCompany('');
                setSelectedLocation('');
                setSelectedDateRange('');
                setSortBy('newest');
              }}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}

      {/* Job Stats */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-soft p-4">
          <div className="flex items-center">
            <Briefcase className="text-primary-600 mr-3" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{sortedJobs.length}</p>
              <p className="text-sm text-gray-600">Available Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-soft p-4">
          <div className="flex items-center">
            <Building2 className="text-green-600 mr-3" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
              <p className="text-sm text-gray-600">Companies Hiring</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-soft p-4">
          <div className="flex items-center">
            <MapPin className="text-blue-600 mr-3" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{locations.length}</p>
              <p className="text-sm text-gray-600">Locations</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-soft p-4">
          <div className="flex items-center">
            <Bookmark className="text-blue-600 mr-3" size={24} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{savedItems.filter(item => item.type === 'job').length}</p>
              <p className="text-sm text-gray-600">Saved Jobs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
        {sortedJobs.map(job => (
          <div 
            key={job.id} 
            className={`bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 ${
              viewMode === 'grid' ? 'p-6' : 'p-6'
            } ${appliedJobs.has(job.id) ? 'ring-2 ring-green-200' : ''}`}
          >
            {viewMode === 'list' ? (
              // List View
              <div className="flex items-start gap-4">
                {job.company.logo ? (
                  <img
                    src={job.company.logo}
                    alt={job.company.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 size={32} className="text-primary-600" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-semibold text-gray-900 truncate">{job.title}</h2>
                        {appliedJobs.has(job.id) && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Applied
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 font-medium">{job.company.name}</p>
                      <p className="text-sm text-gray-500">
                        {Array.isArray(job.company.industry) ? job.company.industry.join(', ') : job.company.industry}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleBookmark(job.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isItemSaved(job.id) 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'text-gray-400 hover:bg-gray-100 hover:text-blue-600'
                        }`}
                        title={isItemSaved(job.id) ? 'Remove from saved' : 'Save job'}
                      >
                        <Bookmark size={18} fill={isItemSaved(job.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="p-2 text-gray-400 hover:bg-gray-100 hover:text-primary-600 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{job.type}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center text-gray-600">
                        <DollarSign size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{job.salary}</span>
                      </div>
                    )}
                    <div className="flex items-center text-gray-600">
                      <Clock size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{formatTimeAgo(job.postedDate)}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600 line-clamp-2 leading-relaxed">{job.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.slice(0, 4).map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {job.tags.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{job.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => applyForJob(job.id)}
                      disabled={appliedJobs.has(job.id)}
                      className={`btn ${
                        appliedJobs.has(job.id) 
                          ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                          : 'btn-primary'
                      }`}
                    >
                      {appliedJobs.has(job.id) ? 'Applied' : 'Apply Now'}
                    </button>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="btn btn-outline"
                    >
                      View Details
                    </button>
                    {job.company.website && (
                      <a
                        href={job.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                      >
                        Company Website <ExternalLink size={14} className="ml-1" />
                      </a>
                    )}
                    <button className="text-gray-400 hover:text-primary-600 text-sm flex items-center">
                      <Share2 size={14} className="mr-1" />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Grid View
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    {job.company.logo ? (
                      <img
                        src={job.company.logo}
                        alt={job.company.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Building2 size={24} className="text-primary-600" />
                      </div>
                    )}
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
                      <p className="text-sm text-gray-600 truncate">{job.company.name}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleBookmark(job.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isItemSaved(job.id) 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-400 hover:bg-gray-100 hover:text-blue-600'
                    }`}
                  >
                    <Bookmark size={16} fill={isItemSaved(job.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2 text-gray-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase size={14} className="mr-2 text-gray-400" />
                    {job.type}
                  </div>
                  {job.salary && (
                    <div className="flex items-center">
                      <DollarSign size={14} className="mr-2 text-gray-400" />
                      {job.salary}
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">{job.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {job.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => applyForJob(job.id)}
                    disabled={appliedJobs.has(job.id)}
                    className={`btn btn-sm flex-1 ${
                      appliedJobs.has(job.id) 
                        ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                        : 'btn-primary'
                    }`}
                  >
                    {appliedJobs.has(job.id) ? 'Applied' : 'Apply'}
                  </button>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="btn btn-outline btn-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {sortedJobs.length === 0 && (
          <div className="col-span-full text-center py-12">
            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              {showBookmarked 
                ? "You haven't saved any jobs yet. Browse jobs and click the heart icon to save them."
                : "Try adjusting your search filters or search terms"
              }
            </p>
            {(searchQuery || selectedType || selectedCompany || selectedLocation) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('');
                  setSelectedCompany('');                setSelectedLocation('');
                setSelectedDateRange('');
                setShowBookmarked(false);
                }}
                className="btn btn-outline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <div className="flex items-center">
                {selectedJob.company.logo ? (
                  <img
                    src={selectedJob.company.logo}
                    alt={selectedJob.company.name}
                    className="w-12 h-12 rounded-lg object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <Building2 size={24} className="text-primary-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                  <p className="text-gray-600">{selectedJob.company.name}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-600 p-2"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    {selectedJob.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Briefcase size={16} className="mr-2 text-gray-400" />
                    {selectedJob.type}
                  </div>
                  {selectedJob.salary && (
                    <div className="flex items-center text-gray-600">
                      <DollarSign size={16} className="mr-2 text-gray-400" />
                      {selectedJob.salary}
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Calendar size={16} className="mr-2 text-gray-400" />
                    {formatTimeAgo(selectedJob.postedDate)}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Skills & Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Company Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Company</p>
                        <p className="font-medium">{selectedJob.company.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Industry</p>
                        <p className="font-medium">
                          {Array.isArray(selectedJob.company.industry) 
                            ? selectedJob.company.industry.join(', ') 
                            : selectedJob.company.industry || 'Not specified'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-6 bg-gray-50">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => applyForJob(selectedJob.id)}
                  disabled={appliedJobs.has(selectedJob.id)}
                  className={`btn ${
                    appliedJobs.has(selectedJob.id) 
                      ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                      : 'btn-primary'
                  } flex-1 md:flex-none`}
                >
                  {appliedJobs.has(selectedJob.id) ? 'Applied' : 'Apply for this job'}
                </button>
                <button
                  onClick={() => toggleBookmark(selectedJob.id)}
                  className={`btn btn-outline ${
                    isItemSaved(selectedJob.id) ? 'text-blue-600 border-blue-600' : ''
                  }`}
                >
                  <Bookmark size={16} className="mr-2" fill={isItemSaved(selectedJob.id) ? 'currentColor' : 'none'} />
                  {isItemSaved(selectedJob.id) ? 'Saved' : 'Save Job'}
                </button>
                <button className="btn btn-outline">
                  <Share2 size={16} className="mr-2" />
                  Share
                </button>
                {selectedJob.company.website && (
                  <a
                    href={selectedJob.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Company Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm">
            <CheckCircle size={20} className="text-white" />
            <div className="flex-1">
              <p className="font-medium">Application Submitted</p>
              <p className="text-sm opacity-90">Successfully applied for {appliedJobTitle}</p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="text-white hover:text-gray-200 p-1"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListings;