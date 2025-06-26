import { useState, useMemo, useEffect } from 'react';
import { useSavedItems } from '../../context/SavedItemsContext';
import { BookOpen, Clock, Star, Users, Play, Search, X, Bookmark, BarChart3, Trophy, ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';

const Courses = () => {
  const { addItem, removeItem, isItemSaved } = useSavedItems();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'popularity' | 'newest'>('rating');
  const [priceRange, setPriceRange] = useState<'all' | 'free' | 'paid'>('all');
  const [showMyCoursesOnly, setShowMyCoursesOnly] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set(['2', '5']));
  const [courseProgress, setCourseProgress] = useState<{[key: string]: number}>({
    '2': 45, // 45% complete
    '5': 80  // 80% complete
  });

  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
    courseName: string;
  } | null>(null);

  const categories = ['Programming', 'Data Science', 'Design', 'Business', 'Marketing', 'Career Development'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const courses = [
    {
      id: '1',
      title: 'Full-Stack Web Development with React and Node.js',
      instructor: 'Dr. Michael Rodriguez',
      duration: '12 weeks',
      level: 'intermediate',
      category: 'Programming',
      rating: 4.8,
      enrolledCount: 1247,
      price: 0,
      isFree: true,
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn to build modern web applications from scratch using React, Node.js, and MongoDB.',
      lessons: 45,
      prerequisites: ['Basic HTML/CSS', 'JavaScript fundamentals'],
      skills: ['React', 'Node.js', 'MongoDB', 'Express.js', 'REST APIs'],
      estimatedHours: 60,
      createdAt: '2025-01-15',
      curriculum: [
        { module: 1, title: 'HTML/CSS Fundamentals', lessons: 8 },
        { module: 2, title: 'JavaScript Basics', lessons: 10 },
        { module: 3, title: 'React Fundamentals', lessons: 12 },
        { module: 4, title: 'Node.js & Express', lessons: 10 },
        { module: 5, title: 'Database Integration', lessons: 5 }
      ]
    },
    {
      id: '2',
      title: 'Data Science Fundamentals with Python',
      instructor: 'Prof. Sarah Johnson',
      duration: '8 weeks',
      level: 'beginner',
      category: 'Data Science',
      rating: 4.9,
      enrolledCount: 892,
      price: 99,
      isFree: false,
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Master the basics of data analysis, visualization, and machine learning with Python.',
      lessons: 32,
      prerequisites: ['Basic programming knowledge'],
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'],
      estimatedHours: 40,
      createdAt: '2025-02-01',
      curriculum: [
        { module: 1, title: 'Python Basics for Data Science', lessons: 6 },
        { module: 2, title: 'Data Manipulation with Pandas', lessons: 8 },
        { module: 3, title: 'Data Visualization', lessons: 7 },
        { module: 4, title: 'Statistical Analysis', lessons: 6 },
        { module: 5, title: 'Machine Learning Intro', lessons: 5 }
      ]
    },
    {
      id: '3',
      title: 'UI/UX Design Principles and Prototyping',
      instructor: 'Emily Chen',
      duration: '6 weeks',
      level: 'beginner',
      category: 'Design',
      rating: 4.7,
      enrolledCount: 634,
      price: 0,
      isFree: true,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn design thinking, user research, wireframing, and prototyping with industry tools.',
      lessons: 28,
      prerequisites: ['None'],
      skills: ['Figma', 'Adobe XD', 'Design Thinking', 'User Research', 'Prototyping'],
      estimatedHours: 35,
      createdAt: '2025-03-10',
      curriculum: [
        { module: 1, title: 'Design Thinking Fundamentals', lessons: 6 },
        { module: 2, title: 'User Research Methods', lessons: 5 },
        { module: 3, title: 'Wireframing & Prototyping', lessons: 8 },
        { module: 4, title: 'Visual Design Principles', lessons: 6 },
        { module: 5, title: 'Usability Testing', lessons: 3 }
      ]
    },
    {
      id: '4',
      title: 'Advanced JavaScript and Modern Frameworks',
      instructor: 'David Kim',
      duration: '10 weeks',
      level: 'advanced',
      category: 'Programming',
      rating: 4.6,
      enrolledCount: 456,
      price: 149,
      isFree: false,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Deep dive into ES6+, TypeScript, React, Vue.js, and modern development practices.',
      lessons: 52,
      prerequisites: ['Intermediate JavaScript', 'Web development basics'],
      skills: ['TypeScript', 'React', 'Vue.js', 'Webpack', 'Testing'],
      estimatedHours: 80,
      createdAt: '2025-01-20'
    },
    {
      id: '5',
      title: 'Career Development and Interview Skills',
      instructor: 'Lisa Thompson',
      duration: '4 weeks',
      level: 'beginner',
      category: 'Career Development',
      rating: 4.9,
      enrolledCount: 1156,
      price: 0,
      isFree: true,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Master job search strategies, resume writing, and interview techniques.',
      lessons: 16,
      prerequisites: ['None'],
      skills: ['Resume Writing', 'Interview Skills', 'LinkedIn Optimization', 'Networking'],
      estimatedHours: 20,
      createdAt: '2025-04-05'
    },
    {
      id: '6',
      title: 'Digital Marketing and Social Media Strategy',
      instructor: 'Mark Wilson',
      duration: '8 weeks',
      level: 'intermediate',
      category: 'Marketing',
      rating: 4.5,
      enrolledCount: 723,
      price: 79,
      isFree: false,
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Learn digital marketing fundamentals, SEO, social media marketing, and analytics.',
      lessons: 36,
      prerequisites: ['Basic marketing knowledge'],
      skills: ['SEO', 'Google Analytics', 'Social Media Marketing', 'Content Strategy'],
      estimatedHours: 45,
      createdAt: '2025-02-20'
    },
  ];

  const instructors = Array.from(new Set(courses.map(course => course.instructor))).sort();

  // Auto-hide notification effect
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Helper functions
  const showNotification = (type: 'success' | 'error' | 'info', message: string, courseName: string) => {
    setNotification({ type, message, courseName });
  };

  const handleEnrollment = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    setEnrolledCourses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
        // Remove progress when unenrolling
        setCourseProgress(prevProgress => {
          const newProgress = { ...prevProgress };
          delete newProgress[courseId];
          return newProgress;
        });
        showNotification('info', 'You have been unenrolled from', course.title);
      } else {
        newSet.add(courseId);
        // Initialize progress at 0%
        setCourseProgress(prev => ({ ...prev, [courseId]: 0 }));
        showNotification('success', 'Successfully enrolled in', course.title);
      }
      return newSet;
    });
  };

  const toggleWishlist = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    if (isItemSaved(courseId)) {
      removeItem(courseId);
    } else {
      addItem({
        id: course.id,
        type: 'course' as const,
        title: course.title,
        subtitle: course.instructor,
        description: course.description,
        company: course.instructor,
        imageUrl: course.image,
        salary: course.isFree ? 'Free' : `$${course.price}`
      });
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedLevel('');
    setSelectedInstructor('');
    setSearchQuery('');
    setPriceRange('all');
    setShowMyCoursesOnly(false);
  };

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const isEnrolled = enrolledCourses.has(course.id);
      
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      const matchesLevel = !selectedLevel || course.level === selectedLevel;
      const matchesInstructor = !selectedInstructor || course.instructor === selectedInstructor;
      const matchesPrice = priceRange === 'all' || 
        (priceRange === 'free' && course.isFree) || 
        (priceRange === 'paid' && !course.isFree);
      const matchesMyCourses = !showMyCoursesOnly || isEnrolled;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesInstructor && matchesPrice && matchesMyCourses;
    });

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.price - b.price;
        case 'popularity':
          return b.enrolledCount - a.enrolledCount;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [courses, searchQuery, selectedCategory, selectedLevel, selectedInstructor, priceRange, showMyCoursesOnly, sortBy, enrolledCourses]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform ${
          notification.type === 'success' ? 'bg-green-500 text-white' :
          notification.type === 'error' ? 'bg-red-500 text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {notification.type === 'success' && <CheckCircle size={20} />}
              {notification.type === 'error' && <AlertCircle size={20} />}
              {notification.type === 'info' && <AlertCircle size={20} />}
            </div>
            <div className="flex-1">
              <p className="font-medium">{notification.message}</p>
              <p className="text-sm opacity-90">"{notification.courseName}"</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="flex-shrink-0 ml-3 text-white hover:text-gray-200 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {showMyCoursesOnly ? 'My Courses' : 'All Courses'}
        </h1>
        <p className="mt-2 text-gray-600">
          {showMyCoursesOnly 
            ? `You are enrolled in ${enrolledCourses.size} course${enrolledCourses.size !== 1 ? 's' : ''}`
            : 'Enhance your skills with our comprehensive course library'
          }
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search courses, skills, or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-10 pr-10 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input w-full sm:w-48"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="input w-full sm:w-48"
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>

            {/* Instructor Filter */}
            <select
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
              className="input w-full sm:w-48"
            >
              <option value="">All Instructors</option>
              {instructors.map(instructor => (
                <option key={instructor} value={instructor}>{instructor}</option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as 'all' | 'free' | 'paid')}
              className="input w-full sm:w-48"
            >
              <option value="all">All Prices</option>
              <option value="free">Free Courses</option>
              <option value="paid">Paid Courses</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'price' | 'popularity' | 'newest')}
              className="input w-full sm:w-48"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="popularity">Sort by Popularity</option>
              <option value="newest">Sort by Newest</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            {/* My Courses Toggle */}
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showMyCoursesOnly}
                onChange={(e) => setShowMyCoursesOnly(e.target.checked)}
                className="form-checkbox h-4 w-4 text-primary-600 rounded"
              />
              <span className="ml-2 text-gray-700 whitespace-nowrap">My Courses</span>
            </label>

            {/* Clear Filters */}
            {(selectedCategory || selectedLevel || selectedInstructor || searchQuery || priceRange !== 'all' || showMyCoursesOnly) && (
              <button
                onClick={clearFilters}
                className="btn btn-outline text-sm px-3 py-1.5"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredAndSortedCourses.length} of {courses.length} courses
        </p>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCourses.map(course => {
          const isEnrolled = enrolledCourses.has(course.id);
          const isWishlisted = isItemSaved(course.id);
          const progress = courseProgress[course.id] || 0;
          
          return (
            <div key={course.id} className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 overflow-hidden group">
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Overlay badges */}
                <div className="absolute top-4 left-4">
                  {course.isFree ? (
                    <span className="bg-success-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Free
                    </span>
                  ) : (
                    <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ${course.price}
                    </span>
                  )}
                </div>
                
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.level === 'beginner' ? 'bg-success-100 text-success-700' :
                    course.level === 'intermediate' ? 'bg-warning-100 text-warning-700' :
                    'bg-error-100 text-error-700'
                  }`}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                  
                  <button
                    onClick={() => toggleWishlist(course.id)}
                    className={`p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all duration-200 ${
                      isWishlisted ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  >
                    <Bookmark size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                {isEnrolled && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/95 rounded-lg p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700">Progress</span>
                        <span className="text-xs font-medium text-primary-600">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs text-primary-600 font-medium">{course.category}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {course.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                  {course.skills.length > 3 && (
                    <span className="text-xs text-gray-500">+{course.skills.length - 3} more</span>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {course.estimatedHours}h
                  </span>
                  <span className="mr-4 flex items-center">
                    <BookOpen size={14} className="mr-1" />
                    {course.lessons} lessons
                  </span>
                  {isEnrolled && progress > 0 && (
                    <span className="flex items-center text-primary-600">
                      <BarChart3 size={14} className="mr-1" />
                      {progress}%
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star size={16} className="text-warning-500 mr-1" />
                    <span className="text-sm font-medium">{course.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({course.enrolledCount.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={14} className="mr-1" />
                    {course.enrolledCount.toLocaleString()}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
                  
                  {/* Prerequisites */}
                  {course.prerequisites && course.prerequisites.length > 0 && course.prerequisites[0] !== 'None' && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Prerequisites:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.prerequisites.map((prereq, index) => (
                          <span key={index} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Curriculum Preview */}
                  {course.curriculum && (
                    <div className="mb-3">
                      <button
                        onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                        className="flex items-center justify-between w-full text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                      >
                        <span>Course Curriculum ({course.curriculum.length} modules)</span>
                        {expandedCourse === course.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                      
                      {expandedCourse === course.id && (
                        <div className="mt-2 space-y-1">
                          {course.curriculum.map((module: any, index: number) => (
                            <div key={index} className="flex justify-between items-center text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                              <span>{module.module}. {module.title}</span>
                              <span>{module.lessons} lessons</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {isEnrolled ? (
                      <>
                        <button 
                          className="flex-1 btn btn-primary flex items-center justify-center"
                          disabled={true}
                        >
                          {progress === 0 ? (
                            <>
                              <Play size={16} className="mr-2" />
                              Start Learning
                            </>
                          ) : progress === 100 ? (
                            <>
                              <Trophy size={16} className="mr-2" />
                              Completed
                            </>
                          ) : (
                            <>
                              <Play size={16} className="mr-2" />
                              Continue
                            </>
                          )}
                        </button>
                        <button 
                          onClick={() => handleEnrollment(course.id)}
                          className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50 px-3"
                          title="Unenroll"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => handleEnrollment(course.id)}
                        className="w-full btn btn-outline hover:btn-primary transition-all duration-200"
                      >
                        {course.isFree ? 'Enroll for Free' : `Enroll for $${course.price}`}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAndSortedCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {showMyCoursesOnly ? 'No enrolled courses' : 'No courses found'}
          </h3>
          <p className="text-gray-600 mb-4">
            {showMyCoursesOnly 
              ? 'You haven\'t enrolled in any courses yet. Browse our course library to get started!'
              : 'Try adjusting your search filters to find more courses'
            }
          </p>
          {showMyCoursesOnly && (
            <button
              onClick={() => setShowMyCoursesOnly(false)}
              className="btn btn-primary"
            >
              Browse All Courses
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;