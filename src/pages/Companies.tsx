import { useState, useMemo } from 'react';
import { mockCompanies, mockJobs } from '../data/mockData';
import { Company, Job } from '../types';
import { useSavedItems } from '../context/SavedItemsContext';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Users, 
  Search, 
  Briefcase, 
  Filter,
  Grid3X3,
  List,
  TrendingUp,
  Calendar,
  Bookmark,
  ExternalLink,
  ChevronDown,
  X,
  GraduationCap,
  Award,
  Clock,
  Star
} from 'lucide-react';

type SortOption = 'name' | 'openPositions' | 'founded' | 'alumni';
type ViewMode = 'grid' | 'list';

interface CompanyCardProps {
  company: Company;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onViewDetails: () => void;
}

interface JobCardProps {
  job: Job;
  isCompact?: boolean;
  onApply?: (jobId: string) => void;
  isApplied?: boolean;
}

const JobCard = ({ job, isCompact = false, onApply, isApplied = false }: JobCardProps) => {
  const formatSalary = (salary?: string) => {
    if (!salary) return 'Salary not specified';
    return salary;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'fulltime': return 'bg-green-100 text-green-800';
      case 'parttime': return 'bg-blue-100 text-blue-800';
      case 'internship': return 'bg-purple-100 text-purple-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h4>
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              {job.location}
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              Posted {formatDate(job.postedDate)}
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJobTypeColor(job.type)}`}>
          {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
        </span>
      </div>

      {!isCompact && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{job.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-primary-600">
          {formatSalary(job.salary)}
        </div>
        {job.deadline && (
          <div className="text-xs text-gray-500">
            Deadline: {formatDate(job.deadline)}
          </div>
        )}
      </div>

      {!isCompact && job.tags && job.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {job.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {job.tags.length > 4 && (
            <span className="text-xs text-gray-500">+{job.tags.length - 4} more</span>
          )}
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex gap-2">
          {isApplied ? (
            <button 
              disabled
              className="btn btn-secondary text-sm flex-1 cursor-not-allowed opacity-75"
            >
              ✓ Applied
            </button>
          ) : (
            <button 
              onClick={() => onApply?.(job.id)}
              className="btn btn-primary text-sm flex-1"
            >
              Apply Now
            </button>
          )}
          <button className="btn btn-outline text-sm px-3">
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const CompanyCard = ({ company, isFavorite, onToggleFavorite, onViewDetails }: CompanyCardProps) => (
  <div className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 p-6 group">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start space-x-4 flex-1">
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
            <Building2 size={32} className="text-primary-600" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold text-gray-900 truncate">{company.name}</h3>
            {company.alumni && company.alumni >= 10 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Award size={12} className="mr-1" />
                Top Employer
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 flex items-center mt-1">
            <MapPin size={14} className="mr-1 flex-shrink-0" /> 
            <span className="truncate">{company.location}</span>
          </p>
          {company.founded && (
            <p className="text-xs text-gray-400 flex items-center mt-1">
              <Calendar size={12} className="mr-1" />
              Founded {company.founded} • {new Date().getFullYear() - company.founded} years of experience
            </p>
          )}
        </div>
      </div>
      <button
        onClick={onToggleFavorite}
        className={`p-2 rounded-lg transition-colors ${
          isFavorite 
            ? 'text-blue-500 hover:text-blue-600' 
            : 'text-gray-300 hover:text-blue-400'
        }`}
      >
        <Bookmark size={18} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
    </div>

    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{company.description}</p>

    <div className="flex flex-wrap gap-2 mb-4">
      {company.industry.slice(0, 3).map((ind: string) => (
        <span
          key={ind}
          className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
        >
          {ind}
        </span>
      ))}
      {company.industry.length > 3 && (
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
          +{company.industry.length - 3} more
        </span>
      )}
    </div>

    <div className="pt-4 border-t border-gray-100">
      {/* Company Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Users size={16} className="mr-2 flex-shrink-0" />
          <span className="truncate">{company.size || 'Not specified'}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Briefcase size={16} className="mr-2 flex-shrink-0" />
          <span>{company.openPositions || 0} positions</span>
        </div>
        
        {/* Alumni Information */}
        {company.alumni && (
          <div className="flex items-center text-sm text-primary-600 font-medium">
            <GraduationCap size={16} className="mr-2 flex-shrink-0" />
            <span>{company.alumni} alumni</span>
          </div>
        )}
        
        {/* Founded Year */}
        {company.founded && (
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span>Est. {company.founded}</span>
          </div>
        )}
      </div>

      {/* Additional Company Info */}
      {(company.alumni || company.founded) && (
        <div className="mb-4 p-3 bg-gradient-to-r from-gray-50 to-primary-50 rounded-lg border border-gray-100">
          <div className="text-xs font-medium text-gray-700 mb-2">Company Insights</div>
          <div className="text-xs text-gray-600 space-y-1">
            {company.alumni && (
              <div className="flex justify-between items-center">
                <span>Working Graduates:</span>
                <span className="font-medium text-primary-600 flex items-center">
                  <GraduationCap size={12} className="mr-1" />
                  {company.alumni} alumni
                </span>
              </div>
            )}
            {company.founded && (
              <div className="flex justify-between items-center">
                <span>Years in Business:</span>
                <span className="font-medium flex items-center">
                  <Clock size={12} className="mr-1" />
                  {new Date().getFullYear() - company.founded} years
                </span>
              </div>
            )}
            {company.size && (
              <div className="flex justify-between items-center">
                <span>Company Size:</span>
                <span className="font-medium">{company.size} employees</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span>Industry Focus:</span>
              <span className="font-medium">{company.industry.length} sector{company.industry.length !== 1 ? 's' : ''}</span>
            </div>
            {company.alumni && company.alumni >= 5 && (
              <div className="mt-2 p-1 bg-green-100 rounded text-green-700 text-center">
                🌟 Popular among alumni
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center gap-2">
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1 flex-1 min-w-0"
        >
          <Globe size={16} className="flex-shrink-0" /> 
          <span className="truncate">Website</span>
          <ExternalLink size={12} className="flex-shrink-0" />
        </a>
        <button 
          onClick={onViewDetails}
          className="btn btn-primary text-sm py-1.5 px-3 flex-shrink-0"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
);

// Company List Item Component for List View
const CompanyListItem = ({ company, isFavorite, onToggleFavorite, onViewDetails }: CompanyCardProps) => (
  <div className="bg-white rounded-lg shadow-soft hover:shadow-medium transition-all duration-200 p-6 group">
    <div className="flex items-start gap-4">
      {/* Logo */}
      <div className="flex-shrink-0">
        {company.logo ? (
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
            <Building2 size={24} className="text-primary-600" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold text-gray-900 truncate">{company.name}</h3>
              {company.alumni && company.alumni >= 10 && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Award size={12} className="mr-1" />
                  Top Employer
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                {company.location}
              </div>
              {company.founded && (
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  Founded {company.founded} • {new Date().getFullYear() - company.founded} years
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-lg transition-colors ${
              isFavorite 
                ? 'text-blue-500 hover:text-blue-600' 
                : 'text-gray-300 hover:text-blue-400'
            }`}
          >
            <Bookmark size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{company.description}</p>

        {/* Company Details Section for List View */}
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="text-center">
              <div className="font-semibold text-gray-900">{company.openPositions || 0}</div>
              <div className="text-gray-500">Open Positions</div>
            </div>
            {company.alumni && (
              <div className="text-center">
                <div className="font-semibold text-primary-600">{company.alumni}</div>
                <div className="text-gray-500">Alumni Working</div>
              </div>
            )}
            {company.founded && (
              <div className="text-center">
                <div className="font-semibold text-gray-900">{new Date().getFullYear() - company.founded}</div>
                <div className="text-gray-500">Years Active</div>
              </div>
            )}
            <div className="text-center">
              <div className="font-semibold text-gray-900">{company.industry.length}</div>
              <div className="text-gray-500">Industries</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {company.industry.slice(0, 2).map((ind: string) => (
                <span
                  key={ind}
                  className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                >
                  {ind}
                </span>
              ))}
              {company.industry.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{company.industry.length - 2} more
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Users size={14} className="mr-1" />
                {company.size || 'Not specified'}
              </div>
              <div className="flex items-center">
                <Briefcase size={14} className="mr-1" />
                {company.openPositions || 0} positions
              </div>
              {company.alumni && (
                <div className="flex items-center text-primary-600 font-medium">
                  <GraduationCap size={14} className="mr-1" />
                  {company.alumni} alumni
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1"
            >
              <Globe size={14} />
              Website
              <ExternalLink size={12} />
            </a>
            <button 
              onClick={onViewDetails}
              className="btn btn-primary text-sm py-1.5 px-3"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Companies = () => {
  const { addItem, removeItem, isItemSaved } = useSavedItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  const industries = useMemo(() => 
    Array.from(new Set(mockCompanies.flatMap(company => company.industry))).sort(),
    []
  );

  const companySizes = useMemo(() => 
    Array.from(new Set(mockCompanies.map(company => company.size).filter(Boolean))).sort(),
    []
  );

  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = mockCompanies.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = !selectedIndustry || company.industry.includes(selectedIndustry);
      const matchesSize = !selectedSize || company.size === selectedSize;
      return matchesSearch && matchesIndustry && matchesSize;
    });

    // Sort companies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'openPositions':
          return (b.openPositions || 0) - (a.openPositions || 0);
        case 'founded':
          return (b.founded || 0) - (a.founded || 0);
        case 'alumni':
          return (b.alumni || 0) - (a.alumni || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedIndustry, selectedSize, sortBy]);

  const toggleFavorite = (companyId: string) => {
    const company = mockCompanies.find(c => c.id === companyId);
    if (!company) return;

    if (isItemSaved(companyId)) {
      removeItem(companyId);
    } else {
      addItem({
        id: company.id,
        type: 'company',
        title: company.name,
        subtitle: Array.isArray(company.industry) ? company.industry.join(', ') : company.industry,
        description: company.description,
        location: company.location,
        imageUrl: company.logo
      });
    }
  };

  const getCompanyJobs = (companyId: string) => {
    return mockJobs.filter(job => job.company.id === companyId);
  };

  const handleApply = (jobId: string) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
    // Here you would typically make an API call to submit the application
    alert('Application submitted successfully!');
  };

  const handleViewDetails = (company: Company) => {
    setSelectedCompany(company);
    setShowCompanyModal(true);
  };

  const closeModal = () => {
    setShowCompanyModal(false);
    setSelectedCompany(null);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('');
    setSelectedSize('');
    setSortBy('name');
  };

  const hasActiveFilters = searchQuery || selectedIndustry || selectedSize || sortBy !== 'name';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
        <p className="mt-2 text-gray-600">
          Discover {mockCompanies.length} companies and explore career opportunities
        </p>
        
        {/* Enhanced Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {filteredAndSortedCompanies.reduce((sum, c) => sum + (c.openPositions || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Open Positions</div>
              </div>
              <TrendingUp className="text-primary-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{industries.length}</div>
                <div className="text-sm text-gray-500">Industries</div>
              </div>
              <Building2 className="text-primary-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary-600">
                  {filteredAndSortedCompanies.reduce((sum, c) => sum + (c.alumni || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Total Alumni</div>
              </div>
              <GraduationCap className="text-primary-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">{filteredAndSortedCompanies.length}</div>
                <div className="text-sm text-gray-500">Companies Found</div>
              </div>
              <Search className="text-primary-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 space-y-4">
        {/* Main Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search companies, descriptions, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid3X3 size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
            <ChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="input w-full"
                >
                  <option value="">All Industries</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="input w-full"
                >
                  <option value="">All Sizes</option>
                  {companySizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="input w-full"
                >
                  <option value="name">Company Name</option>
                  <option value="openPositions">Open Positions</option>
                  <option value="founded">Founded Year</option>
                  <option value="alumni">Alumni Count</option>
                </select>
              </div>
            </div>
            
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-gray-600">
                  {filteredAndSortedCompanies.length} companies found
                </span>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                >
                  <X size={14} />
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Companies Display */}
      {filteredAndSortedCompanies.length === 0 ? (
        <div className="text-center py-12">
          <Building2 size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No companies found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or filters</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredAndSortedCompanies.map(company => (
            viewMode === 'grid' ? (
              <CompanyCard 
                key={company.id} 
                company={company} 
                isFavorite={isItemSaved(company.id)}
                onToggleFavorite={() => toggleFavorite(company.id)}
                onViewDetails={() => handleViewDetails(company)}
              />
            ) : (
              <CompanyListItem 
                key={company.id} 
                company={company} 
                isFavorite={isItemSaved(company.id)}
                onToggleFavorite={() => toggleFavorite(company.id)}
                onViewDetails={() => handleViewDetails(company)}
              />
            )
          ))}
        </div>
      )}

      {/* Company Details Modal */}
      {showCompanyModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {selectedCompany.logo ? (
                    <img
                      src={selectedCompany.logo}
                      alt={selectedCompany.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Building2 size={40} className="text-primary-600" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h2>
                      {selectedCompany.alumni && selectedCompany.alumni >= 10 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <Award size={16} className="mr-1" />
                          Top Employer
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {selectedCompany.location}
                      </div>
                      {selectedCompany.founded && (
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          Founded {selectedCompany.founded}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Company Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Company</h3>
                <p className="text-gray-700 leading-relaxed">{selectedCompany.description}</p>
              </div>

              {/* Company Statistics */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600">
                      {getCompanyJobs(selectedCompany.id).length}
                    </div>
                    <div className="text-sm text-gray-600">Available Jobs</div>
                  </div>
                  {selectedCompany.alumni && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-700">{selectedCompany.alumni}</div>
                      <div className="text-sm text-green-600">Alumni Working</div>
                    </div>
                  )}
                  {selectedCompany.founded && (
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">{new Date().getFullYear() - selectedCompany.founded}</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                  )}
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedCompany.industry.length}</div>
                    <div className="text-sm text-gray-600">Industries</div>
                  </div>
                </div>
              </div>

              {/* Industries */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Industries & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCompany.industry.map((industry, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full font-medium"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Building2 size={20} className="text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Company Size</div>
                        <div className="font-medium">{selectedCompany.size || 'Not specified'}</div>
                      </div>
                    </div>
                    {selectedCompany.founded && (
                      <div className="flex items-center">
                        <Clock size={20} className="text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Founded</div>
                          <div className="font-medium">{selectedCompany.founded}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin size={20} className="text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm text-gray-500">Location</div>
                        <div className="font-medium">{selectedCompany.location}</div>
                      </div>
                    </div>
                    {selectedCompany.alumni && (
                      <div className="flex items-center">
                        <GraduationCap size={20} className="text-primary-500 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Alumni Network</div>
                          <div className="font-medium text-primary-600">{selectedCompany.alumni} graduates working</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Available Jobs */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Positions</h3>
                {(() => {
                  const companyJobs = getCompanyJobs(selectedCompany.id);
                  if (companyJobs.length === 0) {
                    return (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No Open Positions</h4>
                        <p className="text-gray-500">This company doesn't have any open positions at the moment.</p>
                        <p className="text-sm text-gray-400 mt-1">Check back later or add this company to favorites to get notified.</p>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600 mb-4">
                        Found {companyJobs.length} open position{companyJobs.length !== 1 ? 's' : ''}
                      </div>
                      <div className="grid gap-4">
                        {companyJobs.map(job => (
                          <JobCard 
                            key={job.id} 
                            job={job} 
                            onApply={handleApply}
                            isApplied={appliedJobs.has(job.id)}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Special Recognition */}
              {selectedCompany.alumni && selectedCompany.alumni >= 5 && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <Star className="text-yellow-500 mr-2" size={20} />
                    <div>
                      <div className="font-semibold text-gray-900">Highly Recommended</div>
                      <div className="text-sm text-gray-600">
                        This company is popular among our alumni with {selectedCompany.alumni} graduates currently working there.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <a
                  href={selectedCompany.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary flex items-center justify-center gap-2 flex-1"
                >
                  <Globe size={18} />
                  Visit Company Website
                  <ExternalLink size={16} />
                </a>
                <button 
                  onClick={() => toggleFavorite(selectedCompany.id)}
                  className={`btn flex items-center justify-center gap-2 ${
                    isItemSaved(selectedCompany.id) 
                      ? 'btn-secondary bg-blue-50 text-blue-700 border-blue-200' 
                      : 'btn-outline'
                  }`}
                >
                  <Bookmark 
                    size={18} 
                    fill={isItemSaved(selectedCompany.id) ? 'currentColor' : 'none'} 
                  />
                  {isItemSaved(selectedCompany.id) ? 'Remove from Saved' : 'Save Company'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;