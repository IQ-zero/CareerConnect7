import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  Briefcase,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  Link as LinkIcon,
  Plus,
  X,
  Award,
  Clock,
  Users,
  Star,
  BookOpen,
  Shield,
  CheckCircle,
  AlertCircle,
  Key,
  Lock
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  
  // Base form data that applies to all user types
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    phone: user?.phoneNumber || '',
    bio: user?.bio || '',
    linkedIn: user?.linkedIn || '',
    github: user?.github || '',
    portfolio: user?.portfolio || '',
    // Password fields
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    // Student-specific fields
    major: user?.major || '',
    university: user?.university || '',
    graduationYear: user?.graduationYear || '',
    gpa: user?.gpa || '',
    skills: user?.skills || [],
    newSkill: '',
    // Employer-specific fields
    companyId: user?.companyId || '',
    position: user?.position || '',
    department: user?.department || '',
    // Counselor-specific fields
    specialization: user?.specialization || [],
    experience: user?.experience || '',
    rating: user?.rating || 0,
    totalSessions: user?.totalSessions || 0,
    newSpecialization: '',
    // Admin-specific fields
    permissions: user?.permissions || [],
  });

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

  const handleCancel = () => {
    // Clear password fields when canceling
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password fields if user is trying to change password
    if (formData.currentPassword || formData.newPassword || formData.confirmPassword) {
      // Check if all password fields are filled
      if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
        showNotification('error', 'Please fill in all password fields to change your password.');
        return;
      }
      
      // Check if new password matches confirmation
      if (formData.newPassword !== formData.confirmPassword) {
        showNotification('error', 'New password and confirmation do not match.');
        return;
      }
      
      // Check password strength
      if (formData.newPassword.length < 8) {
        showNotification('error', 'New password must be at least 8 characters long.');
        return;
      }
      
      // Check if new password is different from current
      if (formData.currentPassword === formData.newPassword) {
        showNotification('error', 'New password must be different from current password.');
        return;
      }
    }
    
    // In a real app, this would update the user profile and optionally the password
    if (formData.currentPassword) {
      showNotification('success', 'Profile and password updated successfully!');
    } else {
      showNotification('success', 'Profile updated successfully!');
    }
    
    // Clear password fields after successful update
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setIsEditing(false);
  };

  const addSkill = () => {
    if (formData.newSkill.trim()) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill.trim()],
        newSkill: ''
      });
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const addSpecialization = () => {
    if (formData.newSpecialization.trim()) {
      setFormData({
        ...formData,
        specialization: [...formData.specialization, formData.newSpecialization.trim()],
        newSpecialization: ''
      });
    }
  };

  const removeSpecialization = (specToRemove: string) => {
    setFormData({
      ...formData,
      specialization: formData.specialization.filter(spec => spec !== specToRemove)
    });
  };

  // Helper function to get role-specific header info
  const getRoleSpecificInfo = () => {
    switch (user?.role) {
      case 'student':
        return {
          subtitle: `${user?.major} Student`,
          additionalInfo: `Class of ${user?.graduationYear}`
        };
      case 'employer':
        return {
          subtitle: user?.position || 'Employer',
          additionalInfo: user?.department || 'Human Resources'
        };
      case 'career_counselor':
        return {
          subtitle: 'Career Counselor',
          additionalInfo: `${user?.experience || 0} years experience`
        };
      case 'admin':
        return {
          subtitle: 'System Administrator',
          additionalInfo: 'Platform Management'
        };
      default:
        return {
          subtitle: 'User',
          additionalInfo: ''
        };
    }
  };

  const roleInfo = getRoleSpecificInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Notification Toast */}
        {notification && (
          <div className={`fixed top-4 right-4 left-4 sm:left-auto z-50 p-3 sm:p-4 rounded-xl shadow-2xl transition-all duration-500 transform animate-slide-in ${
            notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
            notification.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' :
            'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
          } backdrop-blur-lg border border-white/20`}>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex-shrink-0">
                {notification.type === 'success' && <CheckCircle size={18} className="sm:w-5 sm:h-5" />}
                {notification.type === 'error' && <AlertCircle size={18} className="sm:w-5 sm:h-5" />}
                {notification.type === 'info' && <AlertCircle size={18} className="sm:w-5 sm:h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm sm:text-base truncate">{notification.message}</p>
              </div>
              <button
                onClick={() => setNotification(null)}
                className="flex-shrink-0 ml-2 sm:ml-3 text-white hover:text-gray-200 transition-all duration-200 hover:scale-110"
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-300 hover:shadow-3xl animate-fade-in-up">
        {/* Header/Banner - Enhanced with modern design */}
        <div className={`relative h-32 sm:h-40 md:h-48 overflow-hidden ${
          user?.role === 'student' ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700' :
          user?.role === 'employer' ? 'bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700' :
          user?.role === 'career_counselor' ? 'bg-gradient-to-br from-purple-500 via-violet-600 to-purple-700' :
          user?.role === 'admin' ? 'bg-gradient-to-br from-rose-500 via-red-600 to-red-700' :
          'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700'
        }`}>
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-white/10 rounded-full -translate-y-24 sm:-translate-y-32 translate-x-24 sm:translate-x-32 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 bg-white/5 rounded-full translate-y-16 sm:translate-y-20 md:translate-y-24 -translate-x-16 sm:-translate-x-20 md:-translate-x-24 animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
          </div>
          
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M20 20h40v40H20z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          
          {/* Role-specific icons */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white/30">
            {user?.role === 'student' && <GraduationCap size={24} className="sm:w-8 sm:h-8" />}
            {user?.role === 'employer' && <Briefcase size={24} className="sm:w-8 sm:h-8" />}
            {user?.role === 'career_counselor' && <Users size={24} className="sm:w-8 sm:h-8" />}
            {user?.role === 'admin' && <Shield size={24} className="sm:w-8 sm:h-8" />}
          </div>
        </div>
        
        {/* Profile Content - Enhanced spacing and design */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 bg-gradient-to-b from-gray-50/30 to-white relative">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          
          {/* Avatar and Basic Info - Improved layout */}
          <div className="flex flex-col items-center space-y-6 lg:flex-row lg:items-start lg:space-y-0 lg:space-x-10 -mt-16 sm:-mt-20 lg:-mt-24 mb-8 sm:mb-10">
            <div className="relative group flex-shrink-0">
              {user?.avatar ? (
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl sm:rounded-3xl border-4 sm:border-6 border-white shadow-2xl object-cover ring-4 sm:ring-8 ring-gray-100/50 transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl"
                  />
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-2xl sm:rounded-3xl border-4 sm:border-6 border-white shadow-2xl bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center ring-4 sm:ring-8 ring-gray-100/50 group-hover:shadow-3xl transition-all duration-500">
                  <User size={32} className="sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-gray-400" />
                </div>
              )}
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:rotate-3">
                  <Edit2 size={14} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              )}
              
              {/* Enhanced online status indicator */}
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-2 sm:border-4 border-white shadow-xl">
                <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <div className="space-y-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent break-words">{user?.name}</h1>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                    <span className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold shadow-lg ring-2 ring-inset transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                      user?.role === 'student' ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 ring-blue-200 hover:from-blue-100 hover:to-blue-200' :
                      user?.role === 'employer' ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 ring-emerald-200 hover:from-emerald-100 hover:to-emerald-200' :
                      user?.role === 'career_counselor' ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 ring-purple-200 hover:from-purple-100 hover:to-purple-200' :
                      user?.role === 'admin' ? 'bg-gradient-to-r from-rose-50 to-rose-100 text-rose-800 ring-rose-200 hover:from-rose-100 hover:to-rose-200' :
                      'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 ring-gray-200 hover:from-gray-100 hover:to-gray-200'
                    }`}>
                      {user?.role === 'career_counselor' ? (
                        <>🎯 <span className="hidden sm:inline">Counselor</span><span className="sm:hidden">Counselor</span></>
                      ) : user?.role === 'student' ? (
                        <>🎓 <span className="hidden sm:inline">Student</span><span className="sm:hidden">Student</span></>
                      ) : user?.role === 'employer' ? (
                        <>🏢 <span className="hidden sm:inline">Employer</span><span className="sm:hidden">Employer</span></>
                      ) : user?.role === 'admin' ? (
                        <>⚡ <span className="hidden sm:inline">Admin</span><span className="sm:hidden">Admin</span></>
                      ) : (
                        <>👤 <span className="hidden sm:inline">User</span><span className="sm:hidden">User</span></>
                      )}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 font-semibold break-words">{roleInfo.subtitle}</p>
                  <p className="text-base sm:text-lg text-gray-600 break-words">{roleInfo.additionalInfo}</p>
                </div>
              </div>
              
              {/* Enhanced Role-specific metrics with cards */}
              <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">
                {user?.role === 'career_counselor' && (
                  <>
                    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl sm:rounded-2xl border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="p-1.5 sm:p-2 bg-yellow-500 rounded-lg sm:rounded-xl">
                        <Star size={16} className="sm:w-5 sm:h-5 text-white fill-current" />
                      </div>
                      <div>
                        <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide">Rating</p>
                        <p className="text-sm sm:text-lg font-bold text-yellow-800">{user.rating}/5.0</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl sm:rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="p-1.5 sm:p-2 bg-purple-500 rounded-lg sm:rounded-xl">
                        <Users size={16} className="sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-purple-600 font-medium uppercase tracking-wide">Sessions</p>
                        <p className="text-sm sm:text-lg font-bold text-purple-800">{user.totalSessions}</p>
                      </div>
                    </div>
                  </>
                )}
                {user?.role === 'admin' && (
                  <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl sm:rounded-2xl border-2 border-red-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="p-1.5 sm:p-2 bg-red-500 rounded-lg sm:rounded-xl">
                      <Shield size={16} className="sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-red-600 font-medium uppercase tracking-wide">Permissions</p>
                      <p className="text-sm sm:text-lg font-bold text-red-800">{user.permissions?.length || 0}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              {/* Personal Information Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 px-8 py-6 border-b border-primary-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100 rounded-xl">
                        <User size={24} className="text-primary-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                        <p className="text-sm text-gray-500">Your basic contact details and profile</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEditing(!isEditing)}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg ${
                        isEditing 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-primary-600 hover:bg-primary-700 text-white'
                      }`}
                    >
                      {isEditing ? (
                        <>
                          <Save size={18} />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit2 size={18} />
                          Edit Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 lg:p-8">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-sm sm:text-base"
                          />
                        ) : (
                          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 group-hover:bg-gray-100 transition-colors duration-300">
                            <User size={18} className="sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-900 font-medium text-sm sm:text-base break-words">{formData.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-sm sm:text-base"
                          />
                        ) : (
                          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 group-hover:bg-gray-100 transition-colors duration-300">
                            <Mail size={18} className="sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-900 font-medium text-sm sm:text-base break-all">{formData.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4 sm:space-y-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Location</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-sm sm:text-base"
                          />
                        ) : (
                          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 group-hover:bg-gray-100 transition-colors duration-300">
                            <MapPin size={18} className="sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-900 font-medium text-sm sm:text-base break-words">{formData.location || 'Not specified'}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 text-sm sm:text-base"
                          />
                        ) : (
                          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 group-hover:bg-gray-100 transition-colors duration-300">
                            <Phone size={18} className="sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                            <span className="text-gray-900 font-medium text-sm sm:text-base break-words">{formData.phone || 'Not specified'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="mb-6 lg:mb-8">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="p-1.5 sm:p-2 bg-slate-100 rounded-lg sm:rounded-xl">
                        <User size={18} className="sm:w-5 sm:h-5 text-slate-600" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900">About Me</h3>
                        <p className="text-xs sm:text-sm text-gray-500">Tell others about yourself</p>
                      </div>
                    </div>
                    {isEditing ? (
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
                        placeholder="Write a brief bio about yourself..."
                      />
                    ) : (
                      <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-lg sm:rounded-xl border border-gray-200">
                        <p className="text-gray-800 leading-relaxed text-sm sm:text-base break-words">{formData.bio || 'No bio provided'}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Divider */}
              <div className="flex items-center justify-center py-2 sm:py-4">
                <div className="w-full max-w-xs sm:max-w-md mx-auto">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-3 sm:px-4 bg-gray-50 text-gray-500 rounded-full font-medium">
                        {user?.role === 'student' ? '📚 Academic & Skills' :
                         user?.role === 'employer' ? '💼 Professional Details' :
                         user?.role === 'career_counselor' ? '🎯 Expertise & Experience' :
                         user?.role === 'admin' ? '⚡ System Access' : '📋 Professional Information'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Role-specific Professional Information */}
              
              {/* Student Education & Skills */}
              {user?.role === 'student' && (
                <>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 px-8 py-6 border-b border-blue-200">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-100 rounded-xl">
                          <GraduationCap size={24} className="text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                          <p className="text-sm text-gray-500">Your academic background and achievements</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Major</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.major}
                              onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                              placeholder="Your major"
                            />
                          ) : (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <GraduationCap size={20} className="text-gray-500" />
                              <span className="text-gray-900 font-medium">{formData.major || 'Major not specified'}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">University</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.university}
                              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                              placeholder="Your university"
                            />
                          ) : (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <Building2 size={20} className="text-gray-500" />
                              <span className="text-gray-900 font-medium">{formData.university || 'University not specified'}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Graduation Year</label>
                          {isEditing ? (
                            <input
                              type="number"
                              value={formData.graduationYear}
                              onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) || '' })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                              placeholder="Graduation year"
                            />
                          ) : (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <Clock size={20} className="text-gray-500" />
                              <span className="text-gray-900 font-medium">{formData.graduationYear || 'Not specified'}</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">GPA</label>
                          {isEditing ? (
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="4"
                              value={formData.gpa}
                              onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) || '' })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                              placeholder="GPA (0-4.0)"
                            />
                          ) : (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <Award size={20} className="text-gray-500" />
                              <span className="text-gray-900 font-medium">{formData.gpa ? `${formData.gpa}/4.0` : 'Not specified'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 px-8 py-6 border-b border-emerald-200">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-emerald-100 rounded-xl">
                          <BookOpen size={24} className="text-emerald-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                          <p className="text-sm text-gray-500">Your technical and professional skills</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={formData.newSkill}
                              onChange={(e) => setFormData({ ...formData, newSkill: e.target.value })}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                              placeholder="Add a new skill"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                            />
                            <button
                              type="button"
                              onClick={addSkill}
                              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors duration-300"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-2 border border-blue-200"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="text-blue-400 hover:text-blue-600 transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.length > 0 ? formData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200"
                            >
                              {skill}
                            </span>
                          )) : (
                            <p className="text-gray-500 italic">No skills added yet</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Employer Professional Information */}
              {user?.role === 'employer' && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-50 to-green-100/50 px-8 py-6 border-b border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-green-100 rounded-xl">
                        <Briefcase size={24} className="text-green-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Professional Information</h2>
                        <p className="text-sm text-gray-500">Your work experience and company details</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Position</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                            placeholder="Your job title"
                          />
                        ) : (
                          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <Briefcase size={20} className="text-gray-500" />
                            <span className="text-gray-900 font-medium">{formData.position || 'Position not specified'}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Department</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                            placeholder="Your department"
                          />
                        ) : (
                          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <Building2 size={20} className="text-gray-500" />
                            <span className="text-gray-900 font-medium">{formData.department || 'Department not specified'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Career Counselor Professional Details */}
              {user?.role === 'career_counselor' && (
                <>                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 px-8 py-6 border-b border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-xl">
                          <Award size={24} className="text-purple-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Professional Details</h2>
                          <p className="text-sm text-gray-500">Your counseling experience and performance</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Experience (Years)</label>
                          {isEditing ? (
                            <input
                              type="number"
                              value={formData.experience}
                              onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) || '' })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                              placeholder="Years of experience"
                            />
                          ) : (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <Clock size={20} className="text-gray-500" />
                              <span className="text-gray-900 font-medium">{formData.experience || 0} years</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Rating</label>
                          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <Star size={20} className="text-yellow-500" />
                            <span className="text-gray-900 font-medium">{formData.rating || 'Not rated'}/5.0</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Total Sessions</label>
                          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <Users size={20} className="text-gray-500" />
                            <span className="text-gray-900 font-medium">{formData.totalSessions || 0} sessions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 px-8 py-6 border-b border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-100 rounded-xl">
                          <BookOpen size={24} className="text-purple-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">Specializations</h2>
                          <p className="text-sm text-gray-500">Areas of expertise and focus</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={formData.newSpecialization}
                              onChange={(e) => setFormData({ ...formData, newSpecialization: e.target.value })}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                              placeholder="Add a specialization"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                            />
                            <button
                              type="button"
                              onClick={addSpecialization}
                              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-300"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {formData.specialization.map((spec, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm flex items-center gap-2 border border-purple-200"
                              >
                                {spec}
                                <button
                                  type="button"
                                  onClick={() => removeSpecialization(spec)}
                                  className="text-purple-400 hover:text-purple-600 transition-colors"
                                >
                                  <X size={14} />
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {formData.specialization.length > 0 ? formData.specialization.map((spec, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm border border-purple-200"
                            >
                              {spec}
                            </span>
                          )) : (
                            <p className="text-gray-500 italic">No specializations added yet</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Admin System Permissions */}
              {user?.role === 'admin' && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-red-50 to-red-100/50 px-8 py-6 border-b border-red-200">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-red-100 rounded-xl">
                        <Shield size={24} className="text-red-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">System Permissions</h2>
                        <p className="text-sm text-gray-500">Administrative access and privileges</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex flex-wrap gap-3">
                      {formData.permissions.length > 0 ? formData.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm flex items-center gap-2 border border-red-200"
                        >
                          <Shield size={14} />
                          {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      )) : (
                        <p className="text-gray-500 italic">No permissions assigned</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Section Divider */}
              <div className="flex items-center justify-center py-4">
                <div className="w-full max-w-md mx-auto">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-gray-50 text-gray-500 rounded-full font-medium">
                        🌐 Social Presence
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 px-8 py-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <Globe size={24} className="text-gray-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Social Links</h2>
                      <p className="text-sm text-gray-500">Connect your professional profiles</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Linkedin size={16} className="text-blue-600" />
                        LinkedIn Profile
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={formData.linkedIn}
                          onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                          placeholder="https://linkedin.com/in/username"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <Linkedin size={20} className="text-blue-600" />
                          {formData.linkedIn ? (
                            <a
                              href={formData.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                              LinkedIn Profile
                            </a>
                          ) : (
                            <span className="text-gray-500 italic">Not provided</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Github size={16} className="text-gray-800" />
                        GitHub Profile
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={formData.github}
                          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                          placeholder="https://github.com/username"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <Github size={20} className="text-gray-800" />
                          {formData.github ? (
                            <a
                              href={formData.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                              GitHub Profile
                            </a>
                          ) : (
                            <span className="text-gray-500 italic">Not provided</span>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <LinkIcon size={16} className="text-purple-600" />
                        Portfolio Website
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300"
                          placeholder="https://yourportfolio.com"
                        />
                      ) : (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <LinkIcon size={20} className="text-purple-600" />
                          {formData.portfolio ? (
                            <a
                              href={formData.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 font-medium"
                            >
                              Portfolio Website
                            </a>
                          ) : (
                            <span className="text-gray-500 italic">Not provided</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Change Section - Only shown when editing */}
              {isEditing && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 px-8 py-6 border-b border-orange-200">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-orange-100 rounded-xl">
                        <Lock size={24} className="text-orange-600" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                        <p className="text-sm text-gray-500">Update your account security (optional)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Current Password</label>
                        <input
                          type="password"
                          value={formData.currentPassword}
                          onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                          placeholder="Enter current password"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">New Password</label>
                        <input
                          type="password"
                          value={formData.newPassword}
                          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                          placeholder="Enter new password"
                        />
                        {formData.newPassword && formData.newPassword.length < 8 && (
                          <p className="mt-1 text-sm text-red-600">Password must be at least 8 characters</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Confirm New Password</label>
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                          placeholder="Confirm new password"
                        />
                        {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Key size={16} className="text-blue-600 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p className="font-medium mb-1">Password Requirements:</p>
                          <ul className="space-y-1 text-blue-700">
                            <li>• At least 8 characters long</li>
                            <li>• Must be different from your current password</li>
                            <li>• Leave blank if you don't want to change your password</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {isEditing && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                    <div className="text-xs sm:text-sm text-gray-600">
                      <p className="font-medium">Ready to save your changes?</p>
                      <p className="hidden sm:block">Make sure all information is correct before saving.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors duration-300 font-medium text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-primary-600 text-white rounded-lg sm:rounded-xl hover:bg-primary-700 transition-colors duration-300 font-medium shadow-md hover:shadow-lg text-sm sm:text-base"
                      >
                        <span className="hidden sm:inline">Save All Changes</span>
                        <span className="sm:hidden">Save Changes</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;