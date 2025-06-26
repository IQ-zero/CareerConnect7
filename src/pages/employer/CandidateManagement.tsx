import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  Calendar,
  Download,
  Star,
  MapPin,
  GraduationCap,
  Briefcase,
  CheckSquare,
  Square,
  Mail,
  Phone,
  ExternalLink,
  SortAsc,
  SortDesc,
  Users,
  TrendingUp,
  Clock,
  X,
  FileText
} from 'lucide-react';

// TypeScript interfaces
interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  position: string;
  location: string;
  education: string;
  experience: string;
  skills: string[];
  status: 'applied' | 'review' | 'interview' | 'offer' | 'rejected' | 'hired';
  appliedDate: string;
  rating: number;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  notes?: string;
  salary_expectation?: string;
  coverLetter?: string;
  technicalRating?: number;
  culturalFitRating?: number;
  communicationRating?: number;
  interviewNotes?: InterviewNote[];
  tags?: string[];
}

interface InterviewNote {
  id: string;
  interviewer: string;
  date: string;
  type: 'phone' | 'video' | 'onsite' | 'technical';
  notes: string;
  rating: number;
  recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no' | 'strong_no';
}

interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  type: 'phone' | 'video' | 'onsite' | 'technical';
  interviewer: string;
  location?: string;
  meetingLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
}

interface SortState {
  field: keyof Candidate | 'none';
  direction: 'asc' | 'desc';
}

const CandidateManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<SortState>({ field: 'none', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // New state for enhanced functionality
  const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedCandidateForInterview, setSelectedCandidateForInterview] = useState<Candidate | null>(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedCandidateForMessage, setSelectedCandidateForMessage] = useState<Candidate | null>(null);
  const [showResumeViewer, setShowResumeViewer] = useState(false);
  const [selectedCandidateResume, setSelectedCandidateResume] = useState<Candidate | null>(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedCandidateForAssessment, setSelectedCandidateForAssessment] = useState<Candidate | null>(null);

  // Interview form state
  const [interviewForm, setInterviewForm] = useState({
    date: '',
    time: '',
    type: 'video' as Interview['type'],
    interviewer: '',
    location: '',
    meetingLink: '',
    notes: ''
  });

  // Message form state
  const [messageForm, setMessageForm] = useState({
    subject: '',
    message: '',
    template: 'custom'
  });

  // Assessment form state
  const [assessmentForm, setAssessmentForm] = useState({
    technicalRating: 0,
    culturalFitRating: 0,
    communicationRating: 0,
    overallRating: 0,
    notes: '',
    recommendation: 'maybe' as InterviewNote['recommendation']
  });

  const mockCandidates: Candidate[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      education: 'MS Computer Science, Stanford',
      experience: '5 years',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'TypeScript'],
      status: 'interview',
      appliedDate: '2024-01-15',
      rating: 4.5,
      resumeUrl: '/resumes/sarah-johnson.pdf',
      portfolioUrl: 'https://sarah-portfolio.com',
      linkedinUrl: 'https://linkedin.com/in/sarah-johnson',
      salary_expectation: '$120,000 - $140,000',
      notes: 'Strong technical background with excellent communication skills.',
      coverLetter: 'I am excited to apply for the Senior Software Engineer position...',
      technicalRating: 4.5,
      culturalFitRating: 4.2,
      communicationRating: 4.8,
      tags: ['React Expert', 'Team Lead', 'Remote Ready'],
      interviewNotes: [
        {
          id: '1',
          interviewer: 'John Smith',
          date: '2024-01-20',
          type: 'video',
          notes: 'Excellent technical skills, great communication, would be a strong addition to the team.',
          rating: 4.5,
          recommendation: 'strong_yes'
        }
      ]
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      position: 'Product Manager',
      location: 'New York, NY',
      education: 'MBA, Harvard Business School',
      experience: '7 years',
      skills: ['Product Strategy', 'Analytics', 'Leadership', 'Agile', 'SQL'],
      status: 'review',
      appliedDate: '2024-01-12',
      rating: 4.2,
      resumeUrl: '/resumes/michael-chen.pdf',
      linkedinUrl: 'https://linkedin.com/in/michael-chen',
      salary_expectation: '$130,000 - $150,000',
      notes: 'Proven track record in scaling products from 0 to 1M+ users.',
      coverLetter: 'With 7 years of product management experience...',
      technicalRating: 4.0,
      culturalFitRating: 4.5,
      communicationRating: 4.3,
      tags: ['Product Strategy', 'Analytics Pro', 'Leadership'],
      interviewNotes: []
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      position: 'Marketing Specialist',
      location: 'Los Angeles, CA',
      education: 'BA Marketing, UCLA',
      experience: '3 years',
      skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'Analytics', 'SEO'],
      status: 'applied',
      appliedDate: '2024-01-18',
      rating: 4.0,
      resumeUrl: '/resumes/emily-rodriguez.pdf',
      portfolioUrl: 'https://emily-marketing.com',
      linkedinUrl: 'https://linkedin.com/in/emily-rodriguez',
      salary_expectation: '$65,000 - $75,000',
      notes: 'Creative marketer with strong analytical skills.',
      coverLetter: 'I am passionate about digital marketing and excited about this opportunity...',
      technicalRating: 3.8,
      culturalFitRating: 4.2,
      communicationRating: 4.0,
      tags: ['Digital Marketing', 'Creative', 'Growth Focused'],
      interviewNotes: []
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '+1 (555) 321-9876',
      avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
      position: 'UX Designer',
      location: 'Seattle, WA',
      education: 'BS Design, Art Center',
      experience: '4 years',
      skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research', 'Adobe Creative Suite'],
      status: 'offer',
      appliedDate: '2024-01-10',
      rating: 4.7,
      resumeUrl: '/resumes/david-kim.pdf',
      portfolioUrl: 'https://davidkim-design.com',
      linkedinUrl: 'https://linkedin.com/in/david-kim-ux',
      salary_expectation: '$90,000 - $110,000',
      notes: 'Exceptional design portfolio with strong user empathy.',
      coverLetter: 'As a UX designer with 4 years of experience...',
      technicalRating: 4.8,
      culturalFitRating: 4.5,
      communicationRating: 4.6,
      tags: ['UX Expert', 'Design Systems', 'User Research'],
      interviewNotes: []
    },
    {
      id: '5',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@email.com',
      phone: '+1 (555) 654-3210',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      position: 'Data Scientist',
      location: 'Austin, TX',
      education: 'PhD Statistics, UT Austin',
      experience: '6 years',
      skills: ['Python', 'Machine Learning', 'SQL', 'R', 'TensorFlow', 'Statistics'],
      status: 'hired',
      appliedDate: '2024-01-05',
      rating: 4.8,
      resumeUrl: '/resumes/lisa-thompson.pdf',
      linkedinUrl: 'https://linkedin.com/in/lisa-thompson-ds',
      salary_expectation: '$140,000 - $160,000',
      notes: 'PhD with extensive experience in ML and statistical modeling.',
      coverLetter: 'With my PhD in Statistics and 6 years of industry experience...',
      technicalRating: 4.9,
      culturalFitRating: 4.3,
      communicationRating: 4.4,
      tags: ['ML Expert', 'PhD', 'Statistics Pro', 'Python'],
      interviewNotes: [
        {
          id: '2',
          interviewer: 'Dr. Sarah Wilson',
          date: '2024-01-08',
          type: 'technical',
          notes: 'Outstanding technical knowledge, great problem-solving approach. Highly recommended.',
          rating: 4.9,
          recommendation: 'strong_yes'
        }
      ]
    }
  ];

  // Memoized filtered and sorted candidates
  const filteredAndSortedCandidates = useMemo(() => {
    let filtered = mockCandidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      const matchesExperience = experienceFilter === 'all' || 
        (experienceFilter === 'junior' && parseInt(candidate.experience) <= 2) ||
        (experienceFilter === 'mid' && parseInt(candidate.experience) >= 3 && parseInt(candidate.experience) <= 5) ||
        (experienceFilter === 'senior' && parseInt(candidate.experience) > 5);
      
      const matchesLocation = locationFilter === 'all' || 
        candidate.location.toLowerCase().includes(locationFilter.toLowerCase());
      
      const matchesRating = ratingFilter === 'all' || 
        (ratingFilter === '4+' && candidate.rating >= 4) ||
        (ratingFilter === '4.5+' && candidate.rating >= 4.5);

      return matchesSearch && matchesStatus && matchesExperience && matchesLocation && matchesRating;
    });

    // Sorting
    if (sortConfig.field !== 'none') {
      filtered.sort((a, b) => {
        const field = sortConfig.field as keyof Candidate;
        let aValue: any = a[field];
        let bValue: any = b[field];

        if (sortConfig.field === 'appliedDate') {
          aValue = new Date(aValue as string).getTime();
          bValue = new Date(bValue as string).getTime();
        }

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [mockCandidates, searchQuery, statusFilter, experienceFilter, locationFilter, ratingFilter, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCandidates.length / itemsPerPage);
  const paginatedCandidates = filteredAndSortedCandidates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Statistics
  const stats = useMemo(() => {
    return {
      total: mockCandidates.length,
      applied: mockCandidates.filter(c => c.status === 'applied').length,
      interview: mockCandidates.filter(c => c.status === 'interview').length,
      offer: mockCandidates.filter(c => c.status === 'offer').length,
      hired: mockCandidates.filter(c => c.status === 'hired').length,
    };
  }, [mockCandidates]);

  const handleSort = (field: keyof Candidate) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedCandidates(prev => 
      prev.length === paginatedCandidates.length 
        ? [] 
        : paginatedCandidates.map(c => c.id)
    );
  };

  const handleBulkStatusUpdate = async (newStatus: Candidate['status']) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Here you would update the status in your backend
    console.log(`Updating ${selectedCandidates.length} candidates to status: ${newStatus}`);
    setSelectedCandidates([]);
    setIsLoading(false);
  };

  const exportCandidates = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Position,Status,Applied Date,Rating\n" +
      filteredAndSortedCandidates.map(c => 
        `"${c.name}","${c.email}","${c.position}","${c.status}","${c.appliedDate}","${c.rating}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "candidates.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'badge-primary';
      case 'review': return 'badge-warning';
      case 'interview': return 'badge-accent';
      case 'offer': return 'badge-success';
      case 'hired': return 'badge-success';
      case 'rejected': return 'badge-error';
      default: return 'badge-primary';
    }
  };

  const getSortIcon = (field: keyof Candidate) => {
    if (sortConfig.field !== field) return null;
    return sortConfig.direction === 'asc' ? 
      <SortAsc size={14} className="ml-1" /> : 
      <SortDesc size={14} className="ml-1" />;
  };

  // New functional handlers
  const handleViewProfile = (candidate: Candidate) => {
    setViewingCandidate(candidate);
  };

  const handleScheduleInterview = (candidate: Candidate) => {
    setSelectedCandidateForInterview(candidate);
    setInterviewForm({
      date: '',
      time: '',
      type: 'video',
      interviewer: '',
      location: '',
      meetingLink: '',
      notes: ''
    });
    setShowInterviewModal(true);
  };

  const handleSendMessage = (candidate: Candidate) => {
    setSelectedCandidateForMessage(candidate);
    setMessageForm({
      subject: `Regarding your application for ${candidate.position}`,
      message: '',
      template: 'custom'
    });
    setShowMessageModal(true);
  };

  const handleViewResume = (candidate: Candidate) => {
    setSelectedCandidateResume(candidate);
    setShowResumeViewer(true);
  };

  const handleAddAssessment = (candidate: Candidate) => {
    setSelectedCandidateForAssessment(candidate);
    setAssessmentForm({
      technicalRating: candidate.technicalRating || 0,
      culturalFitRating: candidate.culturalFitRating || 0,
      communicationRating: candidate.communicationRating || 0,
      overallRating: candidate.rating,
      notes: '',
      recommendation: 'maybe'
    });
    setShowAssessmentModal(true);
  };

  const handleSubmitInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Scheduling interview for:', selectedCandidateForInterview?.name, interviewForm);
    
    setIsLoading(false);
    setShowInterviewModal(false);
    setSelectedCandidateForInterview(null);
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Sending message to:', selectedCandidateForMessage?.name, messageForm);
    
    setIsLoading(false);
    setShowMessageModal(false);
    setSelectedCandidateForMessage(null);
  };

  const handleSubmitAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Adding assessment for:', selectedCandidateForAssessment?.name, assessmentForm);
    
    setIsLoading(false);
    setShowAssessmentModal(false);
    setSelectedCandidateForAssessment(null);
  };

  const handleDownloadResume = (candidate: Candidate) => {
    if (candidate.resumeUrl) {
      // Simulate download
      const link = document.createElement('a');
      link.href = candidate.resumeUrl;
      link.download = `${candidate.name.replace(' ', '_')}_Resume.pdf`;
      link.click();
    } else {
      alert('Resume not available for download');
    }
  };

  const getMessageTemplates = () => {
    return {
      interview_invite: {
        subject: 'Interview Invitation - {{position}}',
        message: `Dear {{name}},\n\nWe are pleased to invite you for an interview for the {{position}} position. We were impressed with your application and would like to discuss your qualifications further.\n\nPlease let us know your availability for the coming week.\n\nBest regards,\nHiring Team`
      },
      rejection: {
        subject: 'Application Update - {{position}}',
        message: `Dear {{name}},\n\nThank you for your interest in the {{position}} position and for taking the time to apply. After careful consideration, we have decided to move forward with other candidates.\n\nWe appreciate the time you invested in the application process and wish you the best in your job search.\n\nBest regards,\nHiring Team`
      },
      offer: {
        subject: 'Job Offer - {{position}}',
        message: `Dear {{name}},\n\nCongratulations! We are pleased to extend an offer for the {{position}} position. We believe your skills and experience make you an excellent fit for our team.\n\nPlease find the detailed offer attached. We look forward to your response.\n\nBest regards,\nHiring Team`
      }
    };
  };

  const applyMessageTemplate = (template: string) => {
    const templates = getMessageTemplates();
    if (template in templates && selectedCandidateForMessage) {
      const templateData = templates[template as keyof typeof templates];
      setMessageForm({
        ...messageForm,
        subject: templateData.subject
          .replace('{{position}}', selectedCandidateForMessage.position)
          .replace('{{name}}', selectedCandidateForMessage.name),
        message: templateData.message
          .replace('{{position}}', selectedCandidateForMessage.position)
          .replace('{{name}}', selectedCandidateForMessage.name)
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidate Management</h1>
          <p className="text-gray-600">Review and manage job applications</p>
        </div>
        
        {/* Quick Stats */}
        <div className="flex gap-4 mt-4 lg:mt-0">
          <div className="text-center">
            <div className="flex items-center text-blue-600">
              <Users size={16} className="mr-1" />
              <span className="font-semibold">{stats.total}</span>
            </div>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="text-center">
            <div className="flex items-center text-yellow-600">
              <Clock size={16} className="mr-1" />
              <span className="font-semibold">{stats.applied}</span>
            </div>
            <p className="text-xs text-gray-500">Applied</p>
          </div>
          <div className="text-center">
            <div className="flex items-center text-purple-600">
              <Calendar size={16} className="mr-1" />
              <span className="font-semibold">{stats.interview}</span>
            </div>
            <p className="text-xs text-gray-500">Interview</p>
          </div>
          <div className="text-center">
            <div className="flex items-center text-green-600">
              <TrendingUp size={16} className="mr-1" />
              <span className="font-semibold">{stats.hired}</span>
            </div>
            <p className="text-xs text-gray-500">Hired</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates by name, position, email, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input w-40"
            >
              <option value="all">All Status</option>
              <option value="applied">Applied</option>
              <option value="review">Under Review</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="btn btn-outline"
            >
              <Filter size={16} className="mr-2" />
              Filters
            </button>
            
            <button onClick={exportCandidates} className="btn btn-outline">
              <Download size={16} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <select
              value={experienceFilter}
              onChange={(e) => setExperienceFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Experience</option>
              <option value="junior">Junior (0-2 years)</option>
              <option value="mid">Mid (3-5 years)</option>
              <option value="senior">Senior (5+ years)</option>
            </select>
            
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Locations</option>
              <option value="san francisco">San Francisco</option>
              <option value="new york">New York</option>
              <option value="los angeles">Los Angeles</option>
              <option value="seattle">Seattle</option>
              <option value="austin">Austin</option>
            </select>
            
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Ratings</option>
              <option value="4.5+">4.5+ Stars</option>
              <option value="4+">4+ Stars</option>
            </select>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      {selectedCandidates.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700">
            {selectedCandidates.length} candidate(s) selected
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => handleBulkStatusUpdate('review')}
              className="btn btn-sm btn-outline"
              disabled={isLoading}
            >
              Move to Review
            </button>
            <button 
              onClick={() => handleBulkStatusUpdate('interview')}
              className="btn btn-sm btn-outline"
              disabled={isLoading}
            >
              Schedule Interview
            </button>
            <button 
              onClick={() => handleBulkStatusUpdate('rejected')}
              className="btn btn-sm btn-outline text-red-600"
              disabled={isLoading}
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="text-gray-500">Sort by:</span>
        <button 
          onClick={() => handleSort('name')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          Name {getSortIcon('name')}
        </button>
        <button 
          onClick={() => handleSort('appliedDate')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          Applied Date {getSortIcon('appliedDate')}
        </button>
        <button 
          onClick={() => handleSort('rating')}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          Rating {getSortIcon('rating')}
        </button>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {paginatedCandidates.map(candidate => (
          <div key={candidate.id} className="card p-6 hover:shadow-medium transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Selection and Candidate Info */}
              <div className="flex items-start gap-4 flex-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleCandidateSelection(candidate.id)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    {selectedCandidates.includes(candidate.id) ? 
                      <CheckSquare size={20} className="text-blue-600" /> : 
                      <Square size={20} />
                    }
                  </button>
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{candidate.name}</h3>
                      <div className="flex items-center gap-4 text-gray-600">
                        <span className="flex items-center">
                          <Mail size={14} className="mr-1" />
                          {candidate.email}
                        </span>
                        {candidate.phone && (
                          <span className="flex items-center">
                            <Phone size={14} className="mr-1" />
                            {candidate.phone}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star size={16} className="text-warning-500 mr-1" />
                      <span className="text-sm font-medium">{candidate.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className={`badge ${getStatusColor(candidate.status)}`}>
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </span>
                    <span className="ml-2 text-sm text-gray-500">
                      Applied for {candidate.position}
                    </span>
                    {candidate.salary_expectation && (
                      <span className="ml-2 text-sm text-green-600">
                        • {candidate.salary_expectation}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap size={16} className="mr-2 text-gray-400" />
                      {candidate.education}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase size={16} className="mr-2 text-gray-400" />
                      {candidate.experience}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {candidate.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Notes:</p>
                      <p className="text-sm text-gray-700 italic">{candidate.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      Applied on {new Date(candidate.appliedDate).toLocaleDateString()}
                    </p>
                    
                    {/* External Links */}
                    <div className="flex gap-2">
                      {candidate.portfolioUrl && (
                        <a 
                          href={candidate.portfolioUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {candidate.linkedinUrl && (
                        <a 
                          href={candidate.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 lg:w-48">
                <button 
                  onClick={() => handleViewProfile(candidate)}
                  className="btn btn-primary text-sm"
                >
                  <Eye size={14} className="mr-2" />
                  View Profile
                </button>
                <button 
                  onClick={() => handleDownloadResume(candidate)}
                  className="btn btn-outline text-sm"
                >
                  <Download size={14} className="mr-2" />
                  Download Resume
                </button>
                <button 
                  onClick={() => handleSendMessage(candidate)}
                  className="btn btn-outline text-sm"
                >
                  <MessageSquare size={14} className="mr-2" />
                  Send Message
                </button>
                <button 
                  onClick={() => handleScheduleInterview(candidate)}
                  className="btn btn-outline text-sm"
                >
                  <Calendar size={14} className="mr-2" />
                  Schedule Interview
                </button>
                
                {/* Status Update Dropdown */}
                <div className="relative">
                  <select 
                    value={candidate.status}
                    onChange={(e) => {
                      // Handle status update
                      console.log(`Update ${candidate.name} status to ${e.target.value}`);
                    }}
                    className="input text-sm w-full"
                  >
                    <option value="applied">Applied</option>
                    <option value="review">Under Review</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {paginatedCandidates.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No candidates found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading candidates...</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-outline btn-sm"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages} 
              ({filteredAndSortedCandidates.length} total candidates)
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-outline btn-sm"
            >
              Next
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSelectAll}
              className="btn btn-outline btn-sm"
            >
              {selectedCandidates.length === paginatedCandidates.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>
      )}

      {/* Candidate Profile Modal */}
      {viewingCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={viewingCandidate.avatar}
                    alt={viewingCandidate.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{viewingCandidate.name}</h2>
                    <p className="text-gray-600">{viewingCandidate.position}</p>
                    <div className="flex items-center mt-1">
                      <Star size={16} className="text-warning-500 mr-1" />
                      <span className="text-sm font-medium">{viewingCandidate.rating}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setViewingCandidate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail size={16} className="mr-2 text-gray-400" />
                        <span>{viewingCandidate.email}</span>
                      </div>
                      {viewingCandidate.phone && (
                        <div className="flex items-center">
                          <Phone size={16} className="mr-2 text-gray-400" />
                          <span>{viewingCandidate.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <span>{viewingCandidate.location}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Professional Background</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">Education:</span>
                        <p className="text-gray-700">{viewingCandidate.education}</p>
                      </div>
                      <div>
                        <span className="font-medium">Experience:</span>
                        <p className="text-gray-700">{viewingCandidate.experience}</p>
                      </div>
                      <div>
                        <span className="font-medium">Salary Expectation:</span>
                        <p className="text-gray-700">{viewingCandidate.salary_expectation}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {viewingCandidate.skills.map(skill => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {viewingCandidate.tags && viewingCandidate.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {viewingCandidate.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {viewingCandidate.coverLetter && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Cover Letter</h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                        {viewingCandidate.coverLetter}
                      </p>
                    </div>
                  )}

                  {viewingCandidate.notes && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Notes</h3>
                      <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg">
                        {viewingCandidate.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column - Assessment & Actions */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Assessment Scores</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Technical:</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(viewingCandidate.technicalRating || 0) * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{viewingCandidate.technicalRating || 0}/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Cultural Fit:</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(viewingCandidate.culturalFitRating || 0) * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{viewingCandidate.culturalFitRating || 0}/5</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Communication:</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${(viewingCandidate.communicationRating || 0) * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{viewingCandidate.communicationRating || 0}/5</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddAssessment(viewingCandidate)}
                      className="btn btn-outline text-sm w-full mt-3"
                    >
                      Add Assessment
                    </button>
                  </div>

                  {viewingCandidate.interviewNotes && viewingCandidate.interviewNotes.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Interview Notes</h3>
                      <div className="space-y-3">
                        {viewingCandidate.interviewNotes.map(note => (
                          <div key={note.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium">{note.interviewer}</p>
                                <p className="text-sm text-gray-600">{new Date(note.date).toLocaleDateString()}</p>
                              </div>
                              <span className={`badge ${
                                note.recommendation === 'strong_yes' ? 'badge-success' :
                                note.recommendation === 'yes' ? 'badge-success' :
                                note.recommendation === 'maybe' ? 'badge-warning' :
                                'badge-error'
                              }`}>
                                {note.recommendation.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">{note.notes}</p>
                            <div className="flex items-center mt-2">
                              <Star size={14} className="text-warning-500 mr-1" />
                              <span className="text-sm">{note.rating}/5</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        setViewingCandidate(null);
                        handleScheduleInterview(viewingCandidate);
                      }}
                      className="btn btn-primary w-full text-sm"
                    >
                      <Calendar size={14} className="mr-2" />
                      Schedule Interview
                    </button>
                    <button 
                      onClick={() => {
                        setViewingCandidate(null);
                        handleSendMessage(viewingCandidate);
                      }}
                      className="btn btn-outline w-full text-sm"
                    >
                      <MessageSquare size={14} className="mr-2" />
                      Send Message
                    </button>
                    <button 
                      onClick={() => handleViewResume(viewingCandidate)}
                      className="btn btn-outline w-full text-sm"
                    >
                      <FileText size={14} className="mr-2" />
                      View Resume
                    </button>
                  </div>

                  {/* External Links */}
                  <div className="space-y-2">
                    {viewingCandidate.portfolioUrl && (
                      <a 
                        href={viewingCandidate.portfolioUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline w-full text-sm"
                      >
                        <ExternalLink size={14} className="mr-2" />
                        View Portfolio
                      </a>
                    )}
                    {viewingCandidate.linkedinUrl && (
                      <a 
                        href={viewingCandidate.linkedinUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-outline w-full text-sm"
                      >
                        <ExternalLink size={14} className="mr-2" />
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interview Scheduling Modal */}
      {showInterviewModal && selectedCandidateForInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Schedule Interview</h2>
                <button 
                  onClick={() => setShowInterviewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">
                  Scheduling interview with <strong>{selectedCandidateForInterview.name}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Position: {selectedCandidateForInterview.position}
                </p>
              </div>

              <form onSubmit={handleSubmitInterview} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={interviewForm.date}
                      onChange={(e) => setInterviewForm({...interviewForm, date: e.target.value})}
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={interviewForm.time}
                      onChange={(e) => setInterviewForm({...interviewForm, time: e.target.value})}
                      className="input w-full"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interview Type *
                  </label>
                  <select
                    value={interviewForm.type}
                    onChange={(e) => setInterviewForm({...interviewForm, type: e.target.value as Interview['type']})}
                    className="input w-full"
                    required
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="onsite">On-site</option>
                    <option value="technical">Technical Interview</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interviewer *
                  </label>
                  <input
                    type="text"
                    value={interviewForm.interviewer}
                    onChange={(e) => setInterviewForm({...interviewForm, interviewer: e.target.value})}
                    className="input w-full"
                    placeholder="Enter interviewer name"
                    required
                  />
                </div>

                {interviewForm.type === 'video' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Meeting Link
                    </label>
                    <input
                      type="url"
                      value={interviewForm.meetingLink}
                      onChange={(e) => setInterviewForm({...interviewForm, meetingLink: e.target.value})}
                      className="input w-full"
                      placeholder="https://zoom.us/j/..."
                    />
                  </div>
                )}

                {interviewForm.type === 'onsite' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={interviewForm.location}
                      onChange={(e) => setInterviewForm({...interviewForm, location: e.target.value})}
                      className="input w-full"
                      placeholder="Office address or room number"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={interviewForm.notes}
                    onChange={(e) => setInterviewForm({...interviewForm, notes: e.target.value})}
                    className="input w-full h-20"
                    placeholder="Additional notes or instructions..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary flex-1"
                  >
                    {isLoading ? 'Scheduling...' : 'Schedule Interview'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInterviewModal(false)}
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

      {/* Message Modal */}
      {showMessageModal && selectedCandidateForMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Send Message</h2>
                <button 
                  onClick={() => setShowMessageModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">
                  Sending message to <strong>{selectedCandidateForMessage.name}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  {selectedCandidateForMessage.email}
                </p>
              </div>

              <form onSubmit={handleSubmitMessage} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template
                  </label>
                  <select
                    value={messageForm.template}
                    onChange={(e) => {
                      setMessageForm({...messageForm, template: e.target.value});
                      if (e.target.value !== 'custom') {
                        applyMessageTemplate(e.target.value);
                      }
                    }}
                    className="input w-full"
                  >
                    <option value="custom">Custom Message</option>
                    <option value="interview_invite">Interview Invitation</option>
                    <option value="rejection">Rejection Letter</option>
                    <option value="offer">Job Offer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={messageForm.subject}
                    onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                    className="input w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    value={messageForm.message}
                    onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                    className="input w-full h-40"
                    required
                    placeholder="Enter your message..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary flex-1"
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMessageModal(false)}
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

      {/* Resume Viewer Modal */}
      {showResumeViewer && selectedCandidateResume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh]">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedCandidateResume.name}'s Resume
                </h2>
                <button 
                  onClick={() => setShowResumeViewer(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 h-96 overflow-y-auto">
              {selectedCandidateResume.resumeUrl ? (
                <div className="text-center space-y-4">
                  <FileText size={48} className="mx-auto text-gray-400" />
                  <p className="text-gray-600">Resume preview would be displayed here</p>
                  <p className="text-sm text-gray-500">
                    In a real application, this would show the actual PDF or document content
                  </p>
                  <button 
                    onClick={() => handleDownloadResume(selectedCandidateResume)}
                    className="btn btn-primary"
                  >
                    <Download size={16} className="mr-2" />
                    Download Resume
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No resume available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Assessment Modal */}
      {showAssessmentModal && selectedCandidateForAssessment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add Assessment</h2>
                <button 
                  onClick={() => setShowAssessmentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">
                  Assessing <strong>{selectedCandidateForAssessment.name}</strong>
                </p>
              </div>

              <form onSubmit={handleSubmitAssessment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Technical Skills (0-5)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={assessmentForm.technicalRating}
                    onChange={(e) => setAssessmentForm({...assessmentForm, technicalRating: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span className="font-medium">{assessmentForm.technicalRating}</span>
                    <span>5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cultural Fit (0-5)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={assessmentForm.culturalFitRating}
                    onChange={(e) => setAssessmentForm({...assessmentForm, culturalFitRating: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span className="font-medium">{assessmentForm.culturalFitRating}</span>
                    <span>5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Communication (0-5)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={assessmentForm.communicationRating}
                    onChange={(e) => setAssessmentForm({...assessmentForm, communicationRating: parseFloat(e.target.value)})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span className="font-medium">{assessmentForm.communicationRating}</span>
                    <span>5</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recommendation
                  </label>
                  <select
                    value={assessmentForm.recommendation}
                    onChange={(e) => setAssessmentForm({...assessmentForm, recommendation: e.target.value as InterviewNote['recommendation']})}
                    className="input w-full"
                  >
                    <option value="strong_yes">Strong Yes</option>
                    <option value="yes">Yes</option>
                    <option value="maybe">Maybe</option>
                    <option value="no">No</option>
                    <option value="strong_no">Strong No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={assessmentForm.notes}
                    onChange={(e) => setAssessmentForm({...assessmentForm, notes: e.target.value})}
                    className="input w-full h-20"
                    placeholder="Assessment notes..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary flex-1"
                  >
                    {isLoading ? 'Saving...' : 'Save Assessment'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAssessmentModal(false)}
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
    </div>
  );
};

export default CandidateManagement;