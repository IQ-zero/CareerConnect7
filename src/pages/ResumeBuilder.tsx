import { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Download, Eye, Edit2, Save, Share2, Calendar } from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  linkedin: string;
  portfolio: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  gpa: string;
  achievements: string[];
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  url: string;
  github: string;
}

interface Resume {
  id: string;
  name: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  createdAt: string;
  updatedAt: string;
  template: string;
}

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [savedResumes, setSavedResumes] = useState<Resume[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  
  const sections = [
    { id: 'personal', title: 'Personal Info', icon: '👤' },
    { id: 'education', title: 'Education', icon: '🎓' },
    { id: 'experience', title: 'Experience', icon: '💼' },
    { id: 'skills', title: 'Skills', icon: '⚡' },
    { id: 'projects', title: 'Projects', icon: '🚀' },
  ];

  const skillCategories = ['Technical', 'Programming Languages', 'Tools & Technologies', 'Soft Skills', 'Languages'];

  // Initialize with sample data
  useEffect(() => {
    const sampleResume: Resume = {
      id: '1',
      name: 'Software Engineer Resume',
      personalInfo: {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        portfolio: ''
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      template: 'modern'
    };
    
    setCurrentResume(sampleResume);
    setSavedResumes([
      {
        ...sampleResume,
        name: 'Software Engineer',
        personalInfo: { ...sampleResume.personalInfo, fullName: 'John Doe', title: 'Full Stack Developer' },
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]);
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && currentResume) {
      const timer = setTimeout(() => {
        saveResume();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentResume, autoSave]);

  const createNewResume = () => {
    const newResume: Resume = {
      id: Date.now().toString(),
      name: 'Untitled Resume',
      personalInfo: {
        fullName: '',
        title: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        linkedin: '',
        portfolio: ''
      },
      education: [],
      experience: [],
      skills: [],
      projects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      template: 'modern'
    };
    setCurrentResume(newResume);
    setActiveSection('personal');
  };

  const saveResume = () => {
    if (!currentResume) return;
    
    const updatedResume = {
      ...currentResume,
      updatedAt: new Date().toISOString()
    };
    
    setSavedResumes(prev => {
      const existingIndex = prev.findIndex(r => r.id === updatedResume.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = updatedResume;
        return updated;
      }
      return [...prev, updatedResume];
    });
    
    setCurrentResume(updatedResume);
  };

  const loadResume = (resume: Resume) => {
    setCurrentResume(resume);
    setActiveSection('personal');
  };

  const deleteResume = (resumeId: string) => {
    setSavedResumes(prev => prev.filter(r => r.id !== resumeId));
    if (currentResume?.id === resumeId) {
      setCurrentResume(null);
    }
  };

  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    if (!currentResume) return;
    setCurrentResume(prev => ({
      ...prev!,
      personalInfo: {
        ...prev!.personalInfo,
        [field]: value
      }
    }));
  };

  const addEducation = () => {
    if (!currentResume) return;
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      gpa: '',
      achievements: []
    };
    setCurrentResume(prev => ({
      ...prev!,
      education: [...prev!.education, newEducation]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    if (!currentResume) return;
    setCurrentResume(prev => ({
      ...prev!,
      education: prev!.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id: string) => {
    if (!currentResume) return;
    setCurrentResume(prev => ({
      ...prev!,
      education: prev!.education.filter(edu => edu.id !== id)
    }));
  };

  const addExperience = () => {
    if (!currentResume) return;
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    };
    setCurrentResume(prev => ({
      ...prev!,
      experience: [...prev!.experience, newExperience]
    }));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    if (!currentResume) return;
    setCurrentResume(prev => ({
      ...prev!,
      experience: prev!.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id: string) => {
    if (!currentResume) return;
    setCurrentResume(prev => ({
      ...prev!,
      experience: prev!.experience.filter(exp => exp.id !== id)
    }));
  };

  const addSkill = () => {
    if (!currentResume) return;
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    };
    setCurrentResume(prev => ({
      ...prev!,
      skills: [...prev!.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, field: keyof Skill, value: any) => {
    if (!currentResume) return;
    setCurrentResume(prev => ({
      ...prev!,
      skills: prev!.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const removeSkill = (id: string) => {
    if (!currentResume) return;
    setCurrentResume(prev => ({
      ...prev!,
      skills: prev!.skills.filter(skill => skill.id !== id)
    }));
  };

  const addProject = () => {
    if (!currentResume) return;
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      startDate: '',
      endDate: '',
      url: '',
      github: ''
    };
    setCurrentResume(prev => ({
      ...prev!,
      projects: [...prev!.projects, newProject]
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    if (!currentResume) return;
    setCurrentResume(prev => ({
      ...prev!,
      projects: prev!.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const removeProject = (id: string) => {
    if (!currentResume) return;
    setCurrentResume(prev => ({
      ...prev!,
      projects: prev!.projects.filter(project => project.id !== id)
    }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-2 text-gray-600">Create and manage your professional resumes</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autosave"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="autosave" className="ml-2 text-sm text-gray-700">
                Auto-save
              </label>
            </div>
            {currentResume && (
              <span className="text-xs text-gray-500">
                Last saved: {formatDate(currentResume.updatedAt)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Saved Resumes */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Resumes</h2>
              <span className="text-sm text-gray-500">{savedResumes.length} saved</span>
            </div>
            
            <div className="space-y-4">
              {savedResumes.map((resume) => (
                <div
                  key={resume.id}
                  className={`p-4 border rounded-lg hover:border-primary-300 transition-colors cursor-pointer ${
                    currentResume?.id === resume.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`}
                  onClick={() => loadResume(resume)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center flex-1">
                      <FileText size={20} className="text-primary-600 mr-3 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium truncate">{resume.name}</h3>
                        <p className="text-sm text-gray-500">
                          {resume.personalInfo.fullName || 'Untitled'}
                        </p>
                        <p className="text-xs text-gray-400">
                          Updated: {formatDate(resume.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1 ml-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPreview(true);
                          loadResume(resume);
                        }}
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-100 rounded"
                        title="Preview"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          loadResume(resume);
                        }}
                        className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-100 rounded"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Are you sure you want to delete this resume?')) {
                            deleteResume(resume.id);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-error-600 hover:bg-error-100 rounded"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={createNewResume}
                className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center justify-center"
              >
                <Plus size={20} className="mr-2" />
                Create New Resume
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          {currentResume && (
            <div className="mt-6 bg-white rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold mb-4">Resume Completeness</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Personal Info</span>
                  <span className="text-sm font-medium text-primary-600">
                    {Object.values(currentResume.personalInfo).filter(v => v).length}/8
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Education</span>
                  <span className="text-sm font-medium text-primary-600">
                    {currentResume.education.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Experience</span>
                  <span className="text-sm font-medium text-primary-600">
                    {currentResume.experience.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Skills</span>
                  <span className="text-sm font-medium text-primary-600">
                    {currentResume.skills.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Projects</span>
                  <span className="text-sm font-medium text-primary-600">
                    {currentResume.projects.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Resume Editor */}
        <div className="lg:col-span-2">
          {currentResume ? (
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={currentResume.name}
                    onChange={(e) => setCurrentResume(prev => prev ? { ...prev, name: e.target.value } : null)}
                    className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
                    placeholder="Resume Title"
                  />
                  {!autoSave && (
                    <button
                      onClick={saveResume}
                      className="btn btn-outline text-sm py-1.5"
                    >
                      <Save size={16} className="mr-2" />
                      Save
                    </button>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="btn btn-outline text-sm py-1.5"
                  >
                    <Eye size={16} className="mr-2" />
                    {showPreview ? 'Edit' : 'Preview'}
                  </button>
                  <button className="btn btn-outline text-sm py-1.5">
                    <Share2 size={16} className="mr-2" />
                    Share
                  </button>
                  <button className="btn btn-primary text-sm py-1.5">
                    <Download size={16} className="mr-2" />
                    Download PDF
                  </button>
                </div>
              </div>

              {!showPreview ? (
                <>
                  {/* Section Navigation */}
                  <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                    {sections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center space-x-2 ${
                          activeSection === section.id
                            ? 'bg-primary-100 text-primary-700 border border-primary-200'
                            : 'text-gray-600 hover:bg-gray-100 border border-transparent'
                        }`}
                      >
                        <span>{section.icon}</span>
                        <span>{section.title}</span>
                      </button>
                    ))}
                  </div>

                  {/* Section Content */}
                  <div className="space-y-6">
                    {activeSection === 'personal' && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              value={currentResume.personalInfo.fullName}
                              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                              className="input"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Professional Title *
                            </label>
                            <input
                              type="text"
                              value={currentResume.personalInfo.title}
                              onChange={(e) => updatePersonalInfo('title', e.target.value)}
                              className="input"
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              value={currentResume.personalInfo.email}
                              onChange={(e) => updatePersonalInfo('email', e.target.value)}
                              className="input"
                              placeholder="john@example.com"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone *
                            </label>
                            <input
                              type="tel"
                              value={currentResume.personalInfo.phone}
                              onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                              className="input"
                              placeholder="(123) 456-7890"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Location
                            </label>
                            <input
                              type="text"
                              value={currentResume.personalInfo.location}
                              onChange={(e) => updatePersonalInfo('location', e.target.value)}
                              className="input"
                              placeholder="City, State"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              LinkedIn Profile
                            </label>
                            <input
                              type="url"
                              value={currentResume.personalInfo.linkedin}
                              onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                              className="input"
                              placeholder="https://linkedin.com/in/johndoe"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Portfolio Website
                          </label>
                          <input
                            type="url"
                            value={currentResume.personalInfo.portfolio}
                            onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                            className="input"
                            placeholder="https://johndoe.dev"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Professional Summary *
                          </label>
                          <textarea
                            value={currentResume.personalInfo.summary}
                            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                            className="input min-h-[120px]"
                            placeholder="Write a compelling professional summary that highlights your key achievements, skills, and career objectives..."
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {currentResume.personalInfo.summary.length}/500 characters
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSection === 'education' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">Education History</h3>
                          <button
                            onClick={addEducation}
                            className="btn btn-outline text-sm py-1.5"
                          >
                            <Plus size={16} className="mr-1" />
                            Add Education
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {currentResume.education.map((edu) => (
                            <div key={edu.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                              <div className="flex justify-between items-start mb-4">
                                <h4 className="font-medium text-gray-900">Education Entry</h4>
                                <button
                                  onClick={() => removeEducation(edu.id)}
                                  className="text-gray-400 hover:text-error-600"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                  type="text"
                                  value={edu.institution}
                                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                  className="input"
                                  placeholder="Institution Name"
                                />
                                <input
                                  type="text"
                                  value={edu.degree}
                                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                  className="input"
                                  placeholder="Degree (e.g., Bachelor's, Master's)"
                                />
                                <input
                                  type="text"
                                  value={edu.major}
                                  onChange={(e) => updateEducation(edu.id, 'major', e.target.value)}
                                  className="input"
                                  placeholder="Major/Field of Study"
                                />
                                <input
                                  type="text"
                                  value={edu.gpa}
                                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                  className="input"
                                  placeholder="GPA (optional)"
                                />
                                <input
                                  type="month"
                                  value={edu.startDate}
                                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                  className="input"
                                  placeholder="Start Date"
                                />
                                <input
                                  type="month"
                                  value={edu.endDate}
                                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                  className="input"
                                  placeholder="End Date (or Expected)"
                                />
                              </div>
                            </div>
                          ))}
                          {currentResume.education.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                              <p>No education entries yet. Click "Add Education" to get started.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSection === 'experience' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                          <button
                            onClick={addExperience}
                            className="btn btn-outline text-sm py-1.5"
                          >
                            <Plus size={16} className="mr-1" />
                            Add Experience
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {currentResume.experience.map((exp) => (
                            <div key={exp.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                              <div className="flex justify-between items-start mb-4">
                                <h4 className="font-medium text-gray-900">Experience Entry</h4>
                                <button
                                  onClick={() => removeExperience(exp.id)}
                                  className="text-gray-400 hover:text-error-600"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                  type="text"
                                  value={exp.company}
                                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                  className="input"
                                  placeholder="Company Name"
                                />
                                <input
                                  type="text"
                                  value={exp.position}
                                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                  className="input"
                                  placeholder="Job Title"
                                />
                                <input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                  className="input"
                                  placeholder="Start Date"
                                />
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="month"
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                    className="input flex-1"
                                    placeholder="End Date"
                                    disabled={exp.current}
                                  />
                                  <label className="flex items-center text-sm">
                                    <input
                                      type="checkbox"
                                      checked={exp.current}
                                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                      className="mr-1"
                                    />
                                    Current
                                  </label>
                                </div>
                              </div>
                              <textarea
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                className="input min-h-[100px] mb-4"
                                placeholder="Describe your role, responsibilities, and key achievements..."
                              />
                            </div>
                          ))}
                          {currentResume.experience.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                              <p>No work experience yet. Click "Add Experience" to get started.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSection === 'skills' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">Skills & Competencies</h3>
                          <button
                            onClick={addSkill}
                            className="btn btn-outline text-sm py-1.5"
                          >
                            <Plus size={16} className="mr-1" />
                            Add Skill
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {skillCategories.map(category => {
                            const categorySkills = currentResume.skills.filter(skill => skill.category === category);
                            if (categorySkills.length === 0) return null;
                            
                            return (
                              <div key={category} className="p-4 border border-gray-200 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {categorySkills.map(skill => (
                                    <div key={skill.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                                      <input
                                        type="text"
                                        value={skill.name}
                                        onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                        className="input flex-1 text-sm py-1"
                                        placeholder="Skill name"
                                      />
                                      <select
                                        value={skill.level}
                                        onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                                        className="input text-sm py-1"
                                      >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                      </select>
                                      <button
                                        onClick={() => removeSkill(skill.id)}
                                        className="text-gray-400 hover:text-error-600 p-1"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                          
                          {/* New skill form */}
                          {currentResume.skills.some(skill => !skill.name) && (
                            <div className="p-4 border border-gray-200 rounded-lg bg-blue-50">
                              <h4 className="font-medium text-gray-900 mb-3">New Skills</h4>
                              <div className="space-y-3">
                                {currentResume.skills.filter(skill => !skill.name).map(skill => (
                                  <div key={skill.id} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <input
                                      type="text"
                                      value={skill.name}
                                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                      className="input"
                                      placeholder="Skill name"
                                    />
                                    <select
                                      value={skill.category}
                                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                                      className="input"
                                    >
                                      {skillCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                      ))}
                                    </select>
                                    <div className="flex items-center space-x-2">
                                      <select
                                        value={skill.level}
                                        onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                                        className="input flex-1"
                                      >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                      </select>
                                      <button
                                        onClick={() => removeSkill(skill.id)}
                                        className="text-gray-400 hover:text-error-600 p-1"
                                      >
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {currentResume.skills.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                              <p>No skills added yet. Click "Add Skill" to get started.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeSection === 'projects' && (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-semibold text-gray-900">Projects & Portfolio</h3>
                          <button
                            onClick={addProject}
                            className="btn btn-outline text-sm py-1.5"
                          >
                            <Plus size={16} className="mr-1" />
                            Add Project
                          </button>
                        </div>
                        
                        <div className="space-y-4">
                          {currentResume.projects.map((project) => (
                            <div key={project.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                              <div className="flex justify-between items-start mb-4">
                                <h4 className="font-medium text-gray-900">Project Entry</h4>
                                <button
                                  onClick={() => removeProject(project.id)}
                                  className="text-gray-400 hover:text-error-600"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                  type="text"
                                  value={project.name}
                                  onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                  className="input"
                                  placeholder="Project Name"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  <input
                                    type="month"
                                    value={project.startDate}
                                    onChange={(e) => updateProject(project.id, 'startDate', e.target.value)}
                                    className="input"
                                    placeholder="Start Date"
                                  />
                                  <input
                                    type="month"
                                    value={project.endDate}
                                    onChange={(e) => updateProject(project.id, 'endDate', e.target.value)}
                                    className="input"
                                    placeholder="End Date"
                                  />
                                </div>
                                <input
                                  type="url"
                                  value={project.url}
                                  onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                                  className="input"
                                  placeholder="Live Demo URL (optional)"
                                />
                                <input
                                  type="url"
                                  value={project.github}
                                  onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                                  className="input"
                                  placeholder="GitHub Repository (optional)"
                                />
                              </div>
                              <textarea
                                value={project.description}
                                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                className="input min-h-[100px] mb-4"
                                placeholder="Describe the project, your role, challenges overcome, and impact..."
                              />
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Technologies Used
                                </label>
                                <input
                                  type="text"
                                  value={project.technologies.join(', ')}
                                  onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(', ').filter(Boolean))}
                                  className="input"
                                  placeholder="React, Node.js, PostgreSQL, AWS (comma-separated)"
                                />
                              </div>
                            </div>
                          ))}
                          {currentResume.projects.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                              <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                              <p>No projects added yet. Click "Add Project" to showcase your work.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Save Button */}
                    <div className="mt-8 flex justify-between items-center pt-6 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          Last saved: {formatDate(currentResume.updatedAt)}
                        </span>
                        {autoSave && (
                          <span className="flex items-center text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            Auto-save enabled
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-3">
                        {!autoSave && (
                          <button
                            onClick={saveResume}
                            className="btn btn-primary"
                          >
                            <Save size={16} className="mr-2" />
                            Save Changes
                          </button>
                        )}
                        <button
                          onClick={() => setShowPreview(true)}
                          className="btn btn-outline"
                        >
                          <Eye size={16} className="mr-2" />
                          Preview Resume
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Resume Preview */
                <div className="bg-white max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Preview</h2>
                    <p className="text-gray-600">This is how your resume will look when downloaded</p>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
                    {/* Header */}
                    <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {currentResume.personalInfo.fullName || 'Your Name'}
                      </h1>
                      <h2 className="text-xl text-primary-600 mb-4">
                        {currentResume.personalInfo.title || 'Professional Title'}
                      </h2>
                      <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
                        {currentResume.personalInfo.email && (
                          <span>{currentResume.personalInfo.email}</span>
                        )}
                        {currentResume.personalInfo.phone && (
                          <span>{currentResume.personalInfo.phone}</span>
                        )}
                        {currentResume.personalInfo.location && (
                          <span>{currentResume.personalInfo.location}</span>
                        )}
                      </div>
                      {(currentResume.personalInfo.linkedin || currentResume.personalInfo.portfolio) && (
                        <div className="flex justify-center flex-wrap gap-4 text-sm text-primary-600 mt-2">
                          {currentResume.personalInfo.linkedin && (
                            <a href={currentResume.personalInfo.linkedin} className="hover:underline">
                              LinkedIn
                            </a>
                          )}
                          {currentResume.personalInfo.portfolio && (
                            <a href={currentResume.personalInfo.portfolio} className="hover:underline">
                              Portfolio
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Professional Summary */}
                    {currentResume.personalInfo.summary && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                          Professional Summary
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {currentResume.personalInfo.summary}
                        </p>
                      </div>
                    )}

                    {/* Experience */}
                    {currentResume.experience.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-1">
                          Professional Experience
                        </h3>
                        <div className="space-y-6">
                          {currentResume.experience.map((exp) => (
                            <div key={exp.id}>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                                  <p className="text-primary-600 font-medium">{exp.company}</p>
                                </div>
                                <div className="text-right text-sm text-gray-600">
                                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </div>
                              </div>
                              {exp.description && (
                                <p className="text-gray-700 text-sm leading-relaxed">
                                  {exp.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {currentResume.education.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-1">
                          Education
                        </h3>
                        <div className="space-y-4">
                          {currentResume.education.map((edu) => (
                            <div key={edu.id} className="flex justify-between items-start">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {edu.degree} {edu.major && `in ${edu.major}`}
                                </h4>
                                <p className="text-primary-600">{edu.institution}</p>
                                {edu.gpa && (
                                  <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                                )}
                              </div>
                              <div className="text-right text-sm text-gray-600">
                                {edu.startDate} - {edu.endDate}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    {currentResume.skills.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-1">
                          Skills & Competencies
                        </h3>
                        <div className="space-y-4">
                          {skillCategories.map(category => {
                            const categorySkills = currentResume.skills.filter(skill => skill.category === category && skill.name);
                            if (categorySkills.length === 0) return null;
                            
                            return (
                              <div key={category}>
                                <h4 className="font-medium text-gray-900 mb-2">{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                  {categorySkills.map(skill => (
                                    <span
                                      key={skill.id}
                                      className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                                    >
                                      {skill.name} ({skill.level})
                                    </span>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {currentResume.projects.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-1">
                          Projects
                        </h3>
                        <div className="space-y-6">
                          {currentResume.projects.map((project) => (
                            <div key={project.id}>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{project.name}</h4>
                                  <div className="flex space-x-4 text-sm text-primary-600 mt-1">
                                    {project.url && (
                                      <a href={project.url} className="hover:underline">Live Demo</a>
                                    )}
                                    {project.github && (
                                      <a href={project.github} className="hover:underline">GitHub</a>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right text-sm text-gray-600">
                                  {project.startDate} - {project.endDate}
                                </div>
                              </div>
                              {project.description && (
                                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                                  {project.description}
                                </p>
                              )}
                              {project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {project.technologies.map((tech, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-soft p-12 text-center">
              <FileText size={64} className="mx-auto mb-6 text-gray-300" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Create Your First Resume</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Get started by creating a new resume. Our intuitive builder will guide you through each step.
              </p>
              <button
                onClick={createNewResume}
                className="btn btn-primary px-8 py-3"
              >
                <Plus size={20} className="mr-2" />
                Create New Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;