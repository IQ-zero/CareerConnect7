import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Calendar, 
  Clock, 
  Target, 
  Star, 
  TrendingUp,
  BookOpen,
  MessageSquare,
  Award,
  CheckCircle,
  Plus,
  GraduationCap
} from 'lucide-react';

const CounselorDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for counselor dashboard
  const stats = {
    totalStudents: 45,
    upcomingAppointments: 8,
    completedSessions: 127,
    averageRating: 4.8,
  };

  const upcomingAppointments = [
    {
      id: '1',
      studentName: 'Alex Johnson',
      time: '10:00 AM',
      date: '2024-01-16',
      type: 'resume_review',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      studentName: 'Sarah Wilson',
      time: '2:00 PM',
      date: '2024-01-16',
      type: 'career_guidance',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      studentName: 'Michael Chen',
      time: '4:00 PM',
      date: '2024-01-16',
      type: 'mock_interview',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
  ];

  const recentStudents = [
    {
      id: '1',
      name: 'Emily Rodriguez',
      major: 'Computer Science',
      lastSession: '2024-01-15',
      progress: 'excellent',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'David Kim',
      major: 'Business Administration',
      lastSession: '2024-01-14',
      progress: 'good',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      name: 'Lisa Thompson',
      major: 'Marketing',
      lastSession: '2024-01-13',
      progress: 'needs_attention',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
  ];

  const getSessionTypeLabel = (type: string) => {
    switch (type) {
      case 'resume_review': return 'Resume Review';
      case 'career_guidance': return 'Career Guidance';
      case 'mock_interview': return 'Mock Interview';
      case 'job_search': return 'Job Search Strategy';
      default: return type;
    }
  };

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case 'excellent': return 'text-success-600 bg-success-100';
      case 'good': return 'text-primary-600 bg-primary-100';
      case 'needs_attention': return 'text-warning-600 bg-warning-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-accent-600 to-accent-800 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name.split(' ')[0]}!</h1>
              <p className="mt-2 text-accent-100">Help students achieve their career goals and track their progress.</p>
              <div className="mt-3 flex items-center space-x-4 text-sm">
                <span className="bg-accent-500 px-3 py-1 rounded-full flex items-center">
                  <Star size={14} className="mr-1" />
                  {user?.rating} Rating
                </span>
                <span className="bg-accent-500 px-3 py-1 rounded-full">
                  {user?.totalSessions} Sessions Completed
                </span>
                <span className="bg-accent-500 px-3 py-1 rounded-full">
                  {user?.experience} Years Experience
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link to="/app/counselor/availability" className="btn bg-white text-accent-700 hover:bg-accent-50">
                <Calendar size={16} className="mr-2" />
                Set Availability
              </Link>
              <Link to="/app/counselor/students" className="btn bg-accent-500 text-white hover:bg-accent-400">
                View Students
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-primary-100 mr-3">
            <GraduationCap size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-xl font-semibold">{stats.totalStudents}</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-secondary-100 mr-3">
            <Clock size={20} className="text-secondary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Upcoming Sessions</p>
            <p className="text-xl font-semibold">{stats.upcomingAppointments}</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-accent-100 mr-3">
            <CheckCircle size={20} className="text-accent-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completed Sessions</p>
            <p className="text-xl font-semibold">{stats.completedSessions}</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-success-100 mr-3">
            <Star size={20} className="text-success-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Average Rating</p>
            <p className="text-xl font-semibold">{stats.averageRating}</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/app/counselor/appointments" className="card p-4 hover:shadow-medium transition-shadow text-center">
            <Plus size={24} className="mx-auto mb-2 text-primary-600" />
            <h3 className="font-medium">Schedule Session</h3>
            <p className="text-sm text-gray-600">Book new appointment</p>
          </Link>
          
          <Link to="/app/counselor/students" className="card p-4 hover:shadow-medium transition-shadow text-center">
            <Users size={24} className="mx-auto mb-2 text-secondary-600" />
            <h3 className="font-medium">Manage Students</h3>
            <p className="text-sm text-gray-600">Track progress</p>
          </Link>
          
          <Link to="/app/counselor/courses" className="card p-4 hover:shadow-medium transition-shadow text-center">
            <BookOpen size={24} className="mx-auto mb-2 text-accent-600" />
            <h3 className="font-medium">Create Course</h3>
            <p className="text-sm text-gray-600">Educational content</p>
          </Link>
          
          <Link to="/app/counselor/consultations" className="card p-4 hover:shadow-medium transition-shadow text-center">
            <Target size={24} className="mx-auto mb-2 text-success-600" />
            <h3 className="font-medium">Consultations</h3>
            <p className="text-sm text-gray-600">Long-term guidance</p>
          </Link>
        </div>
      </section>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Today's Appointments</h2>
            <Link to="/app/counselor/appointments" className="text-primary-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {upcomingAppointments.map(appointment => (
              <div key={appointment.id} className="card p-4 hover:shadow-medium transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={appointment.avatar} 
                      alt={appointment.studentName} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-medium">{appointment.studentName}</h3>
                      <p className="text-sm text-gray-600">{getSessionTypeLabel(appointment.type)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary-600">{appointment.time}</p>
                    <p className="text-sm text-gray-500">{new Date(appointment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end space-x-2">
                  <button className="btn btn-outline text-sm py-1.5 px-3">Reschedule</button>
                  <button className="btn btn-primary text-sm py-1.5 px-3">Start Session</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Students */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Students</h2>
            <Link to="/app/counselor/students" className="text-primary-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentStudents.map(student => (
              <div key={student.id} className="card p-4 hover:shadow-medium transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={student.avatar} 
                      alt={student.name} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-medium">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.major}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getProgressColor(student.progress)}`}>
                      {student.progress.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    Last session: {new Date(student.lastSession).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-primary-600 text-sm hover:underline">View Profile</button>
                    <button className="text-secondary-600 text-sm hover:underline">Schedule Session</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Performance Analytics */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Performance Analytics</h2>
          <button className="text-primary-600 text-sm hover:underline flex items-center">
            <TrendingUp size={16} className="mr-1" />
            View Detailed Analytics
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-primary-100 mb-3 mx-auto w-fit">
              <MessageSquare size={24} className="text-primary-600" />
            </div>
            <h3 className="font-medium mb-1">Student Satisfaction</h3>
            <p className="text-2xl font-bold text-primary-600">96%</p>
            <p className="text-sm text-gray-600">Based on recent feedback</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-secondary-100 mb-3 mx-auto w-fit">
              <Target size={24} className="text-secondary-600" />
            </div>
            <h3 className="font-medium mb-1">Goal Achievement Rate</h3>
            <p className="text-2xl font-bold text-secondary-600">78%</p>
            <p className="text-sm text-gray-600">Students reaching career goals</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-accent-100 mb-3 mx-auto w-fit">
              <Award size={24} className="text-accent-600" />
            </div>
            <h3 className="font-medium mb-1">Session Completion Rate</h3>
            <p className="text-2xl font-bold text-accent-600">94%</p>
            <p className="text-sm text-gray-600">Scheduled sessions completed</p>
          </div>
        </div>
      </section>

      {/* Specialization Areas */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Specialization Areas</h2>
        <div className="card p-6">
          <div className="flex flex-wrap gap-2">
            {user?.specialization?.map((area, index) => (
              <span key={index} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                {area}
              </span>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-2">Recent feedback highlights:</p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• "Excellent guidance on resume optimization"</li>
              <li>• "Very helpful with interview preparation techniques"</li>
              <li>• "Great insights into the tech industry"</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CounselorDashboard;