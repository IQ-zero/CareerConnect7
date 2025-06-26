import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Shield, 
  AlertTriangle,
  BarChart3,
  Settings,
  Database,
  Activity,
  UserCheck,
  Building2,
  GraduationCap,
  Eye
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 2847,
    totalJobs: 156,
    totalEvents: 23,
    systemHealth: 98.5,
  };

  const usersByRole = {
    students: 2234,
    employers: 89,
    counselors: 24,
    admins: 5,
  };

  const recentActivity = [
    {
      id: '1',
      type: 'user_registration',
      description: 'New student registered: Alex Johnson',
      timestamp: '2024-01-16T10:30:00Z',
      severity: 'info'
    },
    {
      id: '2',
      type: 'job_posted',
      description: 'TechVision posted new job: Senior Software Engineer',
      timestamp: '2024-01-16T09:15:00Z',
      severity: 'info'
    },
    {
      id: '3',
      type: 'system_alert',
      description: 'High server load detected on database cluster',
      timestamp: '2024-01-16T08:45:00Z',
      severity: 'warning'
    },
    {
      id: '4',
      type: 'security',
      description: 'Failed login attempts from suspicious IP',
      timestamp: '2024-01-16T07:20:00Z',
      severity: 'error'
    },
  ];

  const systemAlerts = [
    {
      id: '1',
      title: 'Database Performance',
      message: 'Query response time increased by 15% in the last hour',
      severity: 'warning',
      timestamp: '2024-01-16T10:00:00Z'
    },
    {
      id: '2',
      title: 'Storage Usage',
      message: 'File storage is at 85% capacity',
      severity: 'warning',
      timestamp: '2024-01-16T09:30:00Z'
    },
    {
      id: '3',
      title: 'Security Alert',
      message: 'Multiple failed login attempts detected',
      severity: 'error',
      timestamp: '2024-01-16T08:15:00Z'
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-error-600 bg-error-100';
      case 'warning': return 'text-warning-600 bg-warning-100';
      case 'info': return 'text-primary-600 bg-primary-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'info': return <Activity size={16} />;
      default: return <Activity size={16} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome section */}
      <section className="mb-8">
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
              <p className="mt-2 text-gray-300">Monitor and manage the CareerConnect platform.</p>
              <div className="mt-3 flex items-center space-x-4 text-sm">
                <span className="bg-gray-700 px-3 py-1 rounded-full flex items-center">
                  <Shield size={14} className="mr-1" />
                  System Administrator
                </span>
                <span className="bg-gray-700 px-3 py-1 rounded-full flex items-center">
                  <Activity size={14} className="mr-1" />
                  System Health: {stats.systemHealth}%
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link to="/app/admin/settings" className="btn bg-white text-gray-700 hover:bg-gray-50">
                <Settings size={16} className="mr-2" />
                System Settings
              </Link>
              <Link to="/app/admin/analytics" className="btn bg-gray-700 text-white hover:bg-gray-600">
                <BarChart3 size={16} className="mr-2" />
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats overview */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-primary-100 mr-3">
            <Users size={20} className="text-primary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-xl font-semibold">{stats.totalUsers.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-secondary-100 mr-3">
            <Briefcase size={20} className="text-secondary-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Jobs</p>
            <p className="text-xl font-semibold">{stats.totalJobs}</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-accent-100 mr-3">
            <Calendar size={20} className="text-accent-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Events</p>
            <p className="text-xl font-semibold">{stats.totalEvents}</p>
          </div>
        </div>
        
        <div className="card flex items-center p-4">
          <div className="p-3 rounded-full bg-success-100 mr-3">
            <TrendingUp size={20} className="text-success-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">System Health</p>
            <p className="text-xl font-semibold">{stats.systemHealth}%</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/app/admin/users" className="card p-4 hover:shadow-medium transition-shadow text-center">
            <UserCheck size={24} className="mx-auto mb-2 text-primary-600" />
            <h3 className="font-medium">Manage Users</h3>
            <p className="text-sm text-gray-600">User administration</p>
          </Link>
          
          <Link to="/app/admin/content" className="card p-4 hover:shadow-medium transition-shadow text-center">
            <Database size={24} className="mx-auto mb-2 text-secondary-600" />
            <h3 className="font-medium">Content Management</h3>
            <p className="text-sm text-gray-600">Jobs, events, courses</p>
          </Link>
          
          <Link to="/app/admin/analytics" className="card p-4 hover:shadow-medium transition-shadow text-center">
            <BarChart3 size={24} className="mx-auto mb-2 text-accent-600" />
            <h3 className="font-medium">Analytics</h3>
            <p className="text-sm text-gray-600">Platform insights</p>
          </Link>
          
          <Link to="/app/admin/settings" className="card p-4 hover:shadow-medium transition-shadow text-center">
            <Settings size={24} className="mx-auto mb-2 text-success-600" />
            <h3 className="font-medium">System Settings</h3>
            <p className="text-sm text-gray-600">Configuration</p>
          </Link>
        </div>
      </section>

      {/* User Distribution */}
      <section>
        <h2 className="text-xl font-semibold mb-4">User Distribution by Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-primary-100 mb-3 mx-auto w-fit">
              <GraduationCap size={24} className="text-primary-600" />
            </div>
            <h3 className="font-medium mb-1">Students</h3>
            <p className="text-2xl font-bold text-primary-600">{usersByRole.students.toLocaleString()}</p>
            <p className="text-sm text-gray-600">{((usersByRole.students / stats.totalUsers) * 100).toFixed(1)}% of total</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-secondary-100 mb-3 mx-auto w-fit">
              <Building2 size={24} className="text-secondary-600" />
            </div>
            <h3 className="font-medium mb-1">Employers</h3>
            <p className="text-2xl font-bold text-secondary-600">{usersByRole.employers}</p>
            <p className="text-sm text-gray-600">{((usersByRole.employers / stats.totalUsers) * 100).toFixed(1)}% of total</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-accent-100 mb-3 mx-auto w-fit">
              <UserCheck size={24} className="text-accent-600" />
            </div>
            <h3 className="font-medium mb-1">Counselors</h3>
            <p className="text-2xl font-bold text-accent-600">{usersByRole.counselors}</p>
            <p className="text-sm text-gray-600">{((usersByRole.counselors / stats.totalUsers) * 100).toFixed(1)}% of total</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-success-100 mb-3 mx-auto w-fit">
              <Shield size={24} className="text-success-600" />
            </div>
            <h3 className="font-medium mb-1">Admins</h3>
            <p className="text-2xl font-bold text-success-600">{usersByRole.admins}</p>
            <p className="text-sm text-gray-600">{((usersByRole.admins / stats.totalUsers) * 100).toFixed(1)}% of total</p>
          </div>
        </div>
      </section>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">System Alerts</h2>
            <Link to="/app/admin/settings" className="text-primary-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {systemAlerts.map(alert => (
              <div key={alert.id} className="card p-4 hover:shadow-medium transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${getSeverityColor(alert.severity)}`}>
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div>
                      <h3 className="font-medium">{alert.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                  <div className="flex space-x-2">
                    <button className="text-primary-600 text-sm hover:underline">Investigate</button>
                    <button className="text-secondary-600 text-sm hover:underline">Dismiss</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <Link to="/app/admin/analytics" className="text-primary-600 text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map(activity => (
              <div key={activity.id} className="card p-4 hover:shadow-medium transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${getSeverityColor(activity.severity)}`}>
                      {getSeverityIcon(activity.severity)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-primary-600">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Platform Performance */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Platform Performance</h2>
          <Link to="/app/admin/analytics" className="text-primary-600 text-sm hover:underline flex items-center">
            <BarChart3 size={16} className="mr-1" />
            Detailed Analytics
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-primary-100 mb-3 mx-auto w-fit">
              <Activity size={24} className="text-primary-600" />
            </div>
            <h3 className="font-medium mb-1">Server Uptime</h3>
            <p className="text-2xl font-bold text-primary-600">99.9%</p>
            <p className="text-sm text-gray-600">Last 30 days</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-secondary-100 mb-3 mx-auto w-fit">
              <TrendingUp size={24} className="text-secondary-600" />
            </div>
            <h3 className="font-medium mb-1">Daily Active Users</h3>
            <p className="text-2xl font-bold text-secondary-600">1,247</p>
            <p className="text-sm text-gray-600">+12% from yesterday</p>
          </div>
          
          <div className="card p-4 text-center">
            <div className="p-3 rounded-full bg-accent-100 mb-3 mx-auto w-fit">
              <Database size={24} className="text-accent-600" />
            </div>
            <h3 className="font-medium mb-1">Database Performance</h3>
            <p className="text-2xl font-bold text-accent-600">2.3ms</p>
            <p className="text-sm text-gray-600">Average query time</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;