import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  Calendar,
  Star,
  MapPin,
  GraduationCap,
  TrendingUp,
  Target,
  Award,
  MoreHorizontal,
  Phone,
  Mail,
  FileText,
  AlertCircle
} from 'lucide-react';

const StudentManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [majorFilter, setMajorFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const mockStudents = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@university.edu',
      phone: '+1 (555) 123-4567',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      major: 'Computer Science',
      graduationYear: 2025,
      gpa: 3.8,
      location: 'San Francisco, CA',
      status: 'active',
      progress: 'excellent',
      lastSession: '2024-01-15',
      totalSessions: 8,
      goals: ['Land software engineering internship', 'Improve technical interview skills'],
      achievements: ['Completed resume review', 'Secured 3 interviews'],
      nextAppointment: '2024-01-20',
      skills: ['JavaScript', 'React', 'Python', 'SQL'],
      courses: ['Data Structures', 'Algorithms', 'Software Engineering'],
      internships: ['Google Summer Intern 2023'],
      careerInterests: ['Software Development', 'Machine Learning', 'Startup Environment'],
      notes: 'Highly motivated student with strong technical skills. Needs help with interview confidence.',
      mentor: 'Dr. Sarah Smith',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@university.edu',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      major: 'Business Administration',
      graduationYear: 2024,
      gpa: 3.6,
      location: 'New York, NY',
      status: 'active',
      progress: 'good',
      lastSession: '2024-01-12',
      totalSessions: 5,
      goals: ['Find marketing role', 'Build professional network'],
      achievements: ['Updated LinkedIn profile', 'Attended networking event'],
      nextAppointment: '2024-01-22',
      skills: ['Marketing', 'Analytics', 'Communication', 'Project Management'],
      courses: ['Marketing Strategy', 'Business Analytics', 'Leadership'],
      internships: ['Marketing Intern at Coca-Cola'],
      careerInterests: ['Digital Marketing', 'Brand Management', 'Consulting'],
      notes: 'Strong communicator with good analytical skills. Ready for job applications.',
      mentor: 'Prof. Michael Brown',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael.chen@university.edu',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      major: 'Mechanical Engineering',
      graduationYear: 2025,
      gpa: 3.9,
      location: 'Boston, MA',
      status: 'active',
      progress: 'needs_attention',
      lastSession: '2024-01-08',
      totalSessions: 3,
      goals: ['Explore engineering career paths', 'Prepare for graduate school'],
      achievements: ['Career assessment completed'],
      nextAppointment: null,
      skills: ['CAD', 'MATLAB', 'Problem Solving', 'Research'],
      courses: ['Thermodynamics', 'Fluid Mechanics', 'Design Engineering'],
      internships: [],
      careerInterests: ['Aerospace', 'Automotive', 'Research & Development'],
      notes: 'Excellent academic performance but uncertain about career direction. Needs guidance.',
      mentor: 'Dr. Jennifer Lee',
      priority: 'high'
    },
    {
      id: '4',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@university.edu',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      major: 'Psychology',
      graduationYear: 2024,
      gpa: 3.7,
      location: 'Los Angeles, CA',
      status: 'inactive',
      progress: 'good',
      lastSession: '2023-12-20',
      totalSessions: 12,
      goals: ['Apply to graduate programs', 'Research career options'],
      achievements: ['GRE preparation completed', 'Applied to 5 programs'],
      nextAppointment: null,
      skills: ['Research', 'Data Analysis', 'Writing', 'Counseling'],
      courses: ['Clinical Psychology', 'Research Methods', 'Statistics'],
      internships: ['Research Assistant at UCLA'],
      careerInterests: ['Clinical Psychology', 'Research', 'Therapy'],
      notes: 'Preparing for graduate school applications. Strong research background.',
      mentor: 'Dr. Robert Wilson',
      priority: 'low'
    },
    {
      id: '5',
      name: 'David Thompson',
      email: 'david.thompson@university.edu',
      phone: '+1 (555) 567-8901',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
      major: 'Finance',
      graduationYear: 2024,
      gpa: 3.5,
      location: 'Chicago, IL',
      status: 'active',
      progress: 'good',
      lastSession: '2024-01-18',
      totalSessions: 6,
      goals: ['Secure investment banking role', 'Build financial modeling skills'],
      achievements: ['Completed CFA Level 1', 'Networked with 10 professionals'],
      nextAppointment: '2024-01-25',
      skills: ['Financial Modeling', 'Excel', 'Bloomberg Terminal', 'Valuation'],
      courses: ['Corporate Finance', 'Investment Analysis', 'Risk Management'],
      internships: ['Finance Intern at JPMorgan Chase'],
      careerInterests: ['Investment Banking', 'Private Equity', 'Asset Management'],
      notes: 'Strong quantitative skills and motivated. Good potential for finance roles.',
      mentor: 'Prof. Lisa Davis',
      priority: 'medium'
    }
  ];

  const majors = Array.from(new Set(mockStudents.map(student => student.major))).sort();

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.major.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesMajor = majorFilter === 'all' || student.major === majorFilter;
    return matchesSearch && matchesStatus && matchesMajor;
  });

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case 'excellent': return 'text-success-600 bg-success-100';
      case 'good': return 'text-primary-600 bg-primary-100';
      case 'needs_attention': return 'text-warning-600 bg-warning-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-error';
      case 'on_hold': return 'badge-warning';
      default: return 'badge-primary';
    }
  };



  const handleViewStudent = (student: any) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Students</h1>
          <p className="text-gray-600">Monitor progress and provide guidance to your students</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-primary-100 mb-3 mx-auto w-fit">
            <GraduationCap size={24} className="text-primary-600" />
          </div>
          <h3 className="font-medium mb-1">My Students</h3>
          <p className="text-2xl font-bold text-primary-600">{mockStudents.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total assigned</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-secondary-100 mb-3 mx-auto w-fit">
            <TrendingUp size={24} className="text-secondary-600" />
          </div>
          <h3 className="font-medium mb-1">Active</h3>
          <p className="text-2xl font-bold text-secondary-600">
            {mockStudents.filter(s => s.status === 'active').length}
          </p>
          <p className="text-xs text-success-600 mt-1">Engaging well</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-warning-100 mb-3 mx-auto w-fit">
            <AlertCircle size={24} className="text-warning-600" />
          </div>
          <h3 className="font-medium mb-1">Need Attention</h3>
          <p className="text-2xl font-bold text-warning-600">
            {mockStudents.filter(s => s.progress === 'needs_attention').length}
          </p>
          <p className="text-xs text-warning-600 mt-1">Require follow-up</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-success-100 mb-3 mx-auto w-fit">
            <Award size={24} className="text-success-600" />
          </div>
          <h3 className="font-medium mb-1">Success Rate</h3>
          <p className="text-2xl font-bold text-success-600">87%</p>
          <p className="text-xs text-success-600 mt-1">Goals achieved</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students by name, email, or major..."
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
            <option value="inactive">Inactive</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>
        <div className="w-full md:w-48">
          <select
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            className="input w-full"
          >
            <option value="all">All Majors</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
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
        <button className="btn btn-outline">
          <Filter size={16} className="mr-2" />
          More Filters
        </button>
      </div>

      {/* Students List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredStudents.map(student => (
          <div key={student.id} className={`card hover:shadow-medium transition-shadow ${viewMode === 'grid' ? 'p-4' : 'p-6'}`}>
            <div className={`flex ${viewMode === 'grid' ? 'flex-col' : 'flex-col lg:flex-row'} gap-${viewMode === 'grid' ? '4' : '6'}`}>
              {/* Student Info */}
              <div className={`flex ${viewMode === 'grid' ? 'flex-col items-center text-center' : 'items-start'} gap-4 flex-1`}>
                <img
                  src={student.avatar}
                  alt={student.name}
                  className={`${viewMode === 'grid' ? 'w-20 h-20' : 'w-16 h-16'} rounded-full object-cover`}
                />
                <div className="flex-1">
                  <div className={`flex ${viewMode === 'grid' ? 'flex-col items-center' : 'items-start justify-between'} mb-2`}>
                    <div className={viewMode === 'grid' ? 'text-center' : ''}>
                      <h3 className={`${viewMode === 'grid' ? 'text-lg' : 'text-xl'} font-semibold text-gray-900`}>{student.name}</h3>
                      <p className="text-gray-600">{student.email}</p>
                      {viewMode === 'list' && (
                        <p className="text-sm text-gray-500">{student.phone}</p>
                      )}
                    </div>
                    <div className={`flex items-center space-x-2 ${viewMode === 'grid' ? 'mt-2' : ''}`}>
                      <span className={`badge ${getStatusColor(student.status)}`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProgressColor(student.progress)}`}>
                        {student.progress.replace('_', ' ')}
                      </span>
                      {student.priority === 'high' && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`grid grid-cols-1 ${viewMode === 'grid' ? 'gap-2' : 'md:grid-cols-3 gap-4'} mb-4`}>
                    <div className={`flex items-center ${viewMode === 'grid' ? 'justify-center' : ''} text-gray-600`}>
                      <GraduationCap size={16} className="mr-2 text-gray-400" />
                      <span className={viewMode === 'grid' ? 'text-sm' : ''}>{student.major} • {student.graduationYear}</span>
                    </div>
                    <div className={`flex items-center ${viewMode === 'grid' ? 'justify-center' : ''} text-gray-600`}>
                      <Star size={16} className="mr-2 text-gray-400" />
                      <span className={viewMode === 'grid' ? 'text-sm' : ''}>GPA: {student.gpa}</span>
                    </div>
                    <div className={`flex items-center ${viewMode === 'grid' ? 'justify-center' : ''} text-gray-600`}>
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      <span className={viewMode === 'grid' ? 'text-sm' : ''}>{student.location}</span>
                    </div>
                  </div>

                  {viewMode === 'list' && (
                    <>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Current Goals:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          {student.goals.slice(0, 2).map((goal, index) => (
                            <li key={index} className="flex items-center">
                              <Target size={12} className="mr-2 text-primary-500" />
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Career Interests:</p>
                        <div className="flex flex-wrap gap-1">
                          {student.careerInterests.slice(0, 3).map((interest, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2">Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {student.skills.slice(0, 4).map(skill => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {student.skills.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{student.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        <div>
                          <span className="font-medium">Last Session:</span>
                          <br />
                          {new Date(student.lastSession).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Total Sessions:</span>
                          <br />
                          {student.totalSessions}
                        </div>
                        <div>
                          <span className="font-medium">Next Appointment:</span>
                          <br />
                          {student.nextAppointment ? new Date(student.nextAppointment).toLocaleDateString() : 'Not scheduled'}
                        </div>
                        <div>
                          <span className="font-medium">Mentor:</span>
                          <br />
                          {student.mentor}
                        </div>
                      </div>
                    </>
                  )}

                  {viewMode === 'grid' && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        {student.totalSessions} sessions • {student.nextAppointment ? 'Next: ' + new Date(student.nextAppointment).toLocaleDateString() : 'No appointment'}
                      </p>
                      <div className="flex flex-wrap justify-center gap-1 mb-3">
                        {student.skills.slice(0, 3).map(skill => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className={`flex ${viewMode === 'grid' ? 'flex-row justify-center space-x-2' : 'flex-col gap-2 lg:w-48'}`}>
                <button 
                  className={`btn btn-primary ${viewMode === 'grid' ? 'text-xs px-2 py-1' : 'text-sm'}`}
                  onClick={() => handleViewStudent(student)}
                >
                  <Eye size={14} className="mr-1" />
                  View
                </button>
                <button className={`btn btn-outline ${viewMode === 'grid' ? 'text-xs px-2 py-1' : 'text-sm'}`}>
                  <Calendar size={14} className="mr-1" />
                  Schedule
                </button>
                {viewMode === 'list' && (
                  <>
                    <button className="btn btn-outline text-sm">
                      <MessageSquare size={14} className="mr-2" />
                      Message
                    </button>
                    <button className="btn btn-outline text-sm">
                      <Target size={14} className="mr-2" />
                      Update Goals
                    </button>
                  </>
                )}
                {viewMode === 'grid' && (
                  <button className="btn btn-outline text-xs px-2 py-1">
                    <MoreHorizontal size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Recent Achievements - Only in list view */}
            {viewMode === 'list' && student.achievements.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Recent Achievements:</p>
                <div className="flex flex-wrap gap-2">
                  {student.achievements.map((achievement, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-success-50 text-success-700 text-xs rounded-full flex items-center"
                    >
                      <Award size={12} className="mr-1" />
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Notes - Only in list view */}
            {viewMode === 'list' && student.notes && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                <p className="text-sm text-gray-600 italic">{student.notes}</p>
              </div>
            )}
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No students found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {showStudentModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Student Profile</h2>
                <button 
                  onClick={() => setShowStudentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedStudent.name}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      {selectedStudent.email}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      {selectedStudent.phone}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <GraduationCap size={16} className="mr-2 text-gray-400" />
                      {selectedStudent.major} • {selectedStudent.graduationYear}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2 text-gray-400" />
                      {selectedStudent.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Academic Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>GPA:</strong> {selectedStudent.gpa}</p>
                      <p><strong>Graduation Year:</strong> {selectedStudent.graduationYear}</p>
                      <p><strong>Mentor:</strong> {selectedStudent.mentor}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Current Courses</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedStudent.courses.map((course: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedStudent.skills.map((skill: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Career Information</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Interests:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedStudent.careerInterests.map((interest: string, index: number) => (
                            <span key={index} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong>Internships:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {selectedStudent.internships.length > 0 ? (
                            selectedStudent.internships.map((internship: string, index: number) => (
                              <li key={index}>{internship}</li>
                            ))
                          ) : (
                            <li className="text-gray-500">No internships yet</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Session Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Total Sessions:</strong> {selectedStudent.totalSessions}</p>
                      <p><strong>Last Session:</strong> {new Date(selectedStudent.lastSession).toLocaleDateString()}</p>
                      <p><strong>Next Appointment:</strong> {selectedStudent.nextAppointment ? new Date(selectedStudent.nextAppointment).toLocaleDateString() : 'Not scheduled'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Current Goals</h4>
                <ul className="space-y-1">
                  {selectedStudent.goals.map((goal: string, index: number) => (
                    <li key={index} className="flex items-center text-sm">
                      <Target size={12} className="mr-2 text-primary-500" />
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Achievements</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.achievements.map((achievement: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-success-50 text-success-700 text-sm rounded-full flex items-center">
                      <Award size={14} className="mr-1" />
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>

              {selectedStudent.notes && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 italic">{selectedStudent.notes}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowStudentModal(false)}
                className="btn btn-outline"
              >
                Close
              </button>
              <button className="btn btn-outline">
                <Calendar size={16} className="mr-2" />
                Schedule Session
              </button>
              <button className="btn btn-primary">
                <FileText size={16} className="mr-2" />
                View Full Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;