import React, { useState } from 'react';
import { 
  Plus, 
  Save, 
  Eye, 
  BookOpen, 
  Clock, 
  Users, 
  Video,
  FileText,
  Upload,
  X,
  Edit2,
  Trash2
} from 'lucide-react';

const CourseCreation: React.FC = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    duration: '',
    price: 0,
    isFree: true,
    maxStudents: 50,
    prerequisites: '',
    learningObjectives: [''],
    syllabus: [{ title: '', description: '', duration: '' }]
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'content' | 'settings'>('basic');

  const categories = [
    'Career Development',
    'Interview Skills',
    'Resume Writing',
    'Networking',
    'Industry Insights',
    'Professional Skills',
    'Leadership',
    'Communication'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const addLearningObjective = () => {
    setCourseData({
      ...courseData,
      learningObjectives: [...courseData.learningObjectives, '']
    });
  };

  const updateLearningObjective = (index: number, value: string) => {
    const updated = [...courseData.learningObjectives];
    updated[index] = value;
    setCourseData({ ...courseData, learningObjectives: updated });
  };

  const removeLearningObjective = (index: number) => {
    const updated = courseData.learningObjectives.filter((_, i) => i !== index);
    setCourseData({ ...courseData, learningObjectives: updated });
  };

  const addSyllabusItem = () => {
    setCourseData({
      ...courseData,
      syllabus: [...courseData.syllabus, { title: '', description: '', duration: '' }]
    });
  };

  const updateSyllabusItem = (index: number, field: string, value: string) => {
    const updated = [...courseData.syllabus];
    updated[index] = { ...updated[index], [field]: value };
    setCourseData({ ...courseData, syllabus: updated });
  };

  const removeSyllabusItem = (index: number) => {
    const updated = courseData.syllabus.filter((_, i) => i !== index);
    setCourseData({ ...courseData, syllabus: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle course creation logic here
    console.log('Course data:', courseData);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
        <p className="mt-2 text-gray-600">Design and publish educational content for students</p>
      </div>

      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('basic')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'basic'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Basic Information
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'content'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Course Content
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Title *
                </label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  className="input w-full"
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Description *
                </label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  className="input w-full min-h-[120px]"
                  placeholder="Describe what students will learn in this course"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={courseData.category}
                    onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                    className="input w-full"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    value={courseData.level}
                    onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
                    className="input w-full"
                    required
                  >
                    {levels.map(level => (
                      <option key={level} value={level.toLowerCase()}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={courseData.duration}
                    onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                    className="input w-full"
                    placeholder="e.g., 6 weeks, 20 hours"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Students
                  </label>
                  <input
                    type="number"
                    value={courseData.maxStudents}
                    onChange={(e) => setCourseData({ ...courseData, maxStudents: parseInt(e.target.value) })}
                    className="input w-full"
                    min="1"
                    max="500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prerequisites
                </label>
                <textarea
                  value={courseData.prerequisites}
                  onChange={(e) => setCourseData({ ...courseData, prerequisites: e.target.value })}
                  className="input w-full min-h-[80px]"
                  placeholder="List any prerequisites or recommended background knowledge"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Course Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Learning Objectives
                  </label>
                  <button
                    type="button"
                    onClick={addLearningObjective}
                    className="btn btn-outline text-sm py-1.5 px-3"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Objective
                  </button>
                </div>
                <div className="space-y-3">
                  {courseData.learningObjectives.map((objective, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => updateLearningObjective(index, e.target.value)}
                        className="input flex-1"
                        placeholder={`Learning objective ${index + 1}`}
                      />
                      {courseData.learningObjectives.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLearningObjective(index)}
                          className="p-2 text-gray-400 hover:text-error-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Course Syllabus
                  </label>
                  <button
                    type="button"
                    onClick={addSyllabusItem}
                    className="btn btn-outline text-sm py-1.5 px-3"
                  >
                    <Plus size={16} className="mr-1" />
                    Add Module
                  </button>
                </div>
                <div className="space-y-4">
                  {courseData.syllabus.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Module {index + 1}</h4>
                        {courseData.syllabus.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSyllabusItem(index)}
                            className="text-gray-400 hover:text-error-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => updateSyllabusItem(index, 'title', e.target.value)}
                          className="input w-full"
                          placeholder="Module title"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) => updateSyllabusItem(index, 'description', e.target.value)}
                          className="input w-full min-h-[80px]"
                          placeholder="Module description"
                        />
                        <input
                          type="text"
                          value={item.duration}
                          onChange={(e) => updateSyllabusItem(index, 'duration', e.target.value)}
                          className="input w-full"
                          placeholder="Duration (e.g., 2 hours)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Course Pricing
                </label>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="free"
                      name="pricing"
                      checked={courseData.isFree}
                      onChange={() => setCourseData({ ...courseData, isFree: true, price: 0 })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="free" className="ml-2 block text-sm text-gray-700">
                      Free Course
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="paid"
                      name="pricing"
                      checked={!courseData.isFree}
                      onChange={() => setCourseData({ ...courseData, isFree: false })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="paid" className="ml-2 block text-sm text-gray-700">
                      Paid Course
                    </label>
                  </div>
                  {!courseData.isFree && (
                    <div className="ml-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        value={courseData.price}
                        onChange={(e) => setCourseData({ ...courseData, price: parseFloat(e.target.value) })}
                        className="input w-32"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Status
                </label>
                <select className="input w-full">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enrollment Settings
                </label>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="autoEnroll"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoEnroll" className="ml-2 block text-sm text-gray-700">
                      Allow automatic enrollment
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="waitlist"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="waitlist" className="ml-2 block text-sm text-gray-700">
                      Enable waitlist when full
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="certificate"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="certificate" className="ml-2 block text-sm text-gray-700">
                      Provide completion certificate
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button
              type="button"
              className="btn btn-outline"
            >
              <Eye size={16} className="mr-2" />
              Preview Course
            </button>
            
            <div className="flex space-x-3">
              <button
                type="button"
                className="btn btn-outline"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <Save size={16} className="mr-2" />
                Create Course
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Course Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-primary-100 mb-3 mx-auto w-fit">
            <BookOpen size={24} className="text-primary-600" />
          </div>
          <h3 className="font-medium mb-1">Total Courses</h3>
          <p className="text-2xl font-bold text-primary-600">12</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-secondary-100 mb-3 mx-auto w-fit">
            <Users size={24} className="text-secondary-600" />
          </div>
          <h3 className="font-medium mb-1">Total Students</h3>
          <p className="text-2xl font-bold text-secondary-600">347</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-accent-100 mb-3 mx-auto w-fit">
            <Clock size={24} className="text-accent-600" />
          </div>
          <h3 className="font-medium mb-1">Course Hours</h3>
          <p className="text-2xl font-bold text-accent-600">156</p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-success-100 mb-3 mx-auto w-fit">
            <Video size={24} className="text-success-600" />
          </div>
          <h3 className="font-medium mb-1">Completion Rate</h3>
          <p className="text-2xl font-bold text-success-600">87%</p>
        </div>
      </div>
    </div>
  );
};

export default CourseCreation;