import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Eye,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

const SystemAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  // Mock analytics data
  const overviewStats = {
    totalUsers: 2847,
    totalJobs: 156,
    totalEvents: 23,
    totalApplications: 1234,
    userGrowth: 12.5,
    jobGrowth: 8.3,
    eventGrowth: -2.1,
    applicationGrowth: 15.7
  };

  const usersByRole = [
    { role: 'Students', count: 2234, percentage: 78.5, color: 'bg-primary-500' },
    { role: 'Employers', count: 89, percentage: 3.1, color: 'bg-secondary-500' },
    { role: 'Counselors', count: 24, percentage: 0.8, color: 'bg-accent-500' },
    { role: 'Admins', count: 5, percentage: 0.2, color: 'bg-success-500' }
  ];

  const monthlyData = [
    { month: 'Jan', users: 1850, jobs: 120, applications: 890 },
    { month: 'Feb', users: 2100, jobs: 135, applications: 1050 },
    { month: 'Mar', users: 2350, jobs: 142, applications: 1180 },
    { month: 'Apr', users: 2600, jobs: 148, applications: 1220 },
    { month: 'May', users: 2750, jobs: 152, applications: 1200 },
    { month: 'Jun', users: 2847, jobs: 156, applications: 1234 }
  ];

  const topCompanies = [
    { name: 'TechVision', applications: 234, jobs: 12 },
    { name: 'FinanceHub', applications: 189, jobs: 8 },
    { name: 'MediHealth', applications: 156, jobs: 15 },
    { name: 'GreenEco', applications: 98, jobs: 6 },
    { name: 'CreativeDesign', applications: 87, jobs: 9 }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp size={16} className="text-success-600" />
    ) : (
      <TrendingDown size={16} className="text-error-600" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-success-600' : 'text-error-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Analytics</h1>
          <p className="text-gray-600">Monitor platform performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input w-32"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn btn-outline"
          >
            <RefreshCw size={16} className={`mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button className="btn btn-primary">
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-primary-100">
              <Users size={24} className="text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getGrowthIcon(overviewStats.userGrowth)}
            <span className={`ml-1 text-sm font-medium ${getGrowthColor(overviewStats.userGrowth)}`}>
              {Math.abs(overviewStats.userGrowth)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.totalJobs}</p>
            </div>
            <div className="p-3 rounded-full bg-secondary-100">
              <Briefcase size={24} className="text-secondary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getGrowthIcon(overviewStats.jobGrowth)}
            <span className={`ml-1 text-sm font-medium ${getGrowthColor(overviewStats.jobGrowth)}`}>
              {Math.abs(overviewStats.jobGrowth)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Events</p>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.totalEvents}</p>
            </div>
            <div className="p-3 rounded-full bg-accent-100">
              <Calendar size={24} className="text-accent-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getGrowthIcon(overviewStats.eventGrowth)}
            <span className={`ml-1 text-sm font-medium ${getGrowthColor(overviewStats.eventGrowth)}`}>
              {Math.abs(overviewStats.eventGrowth)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Applications</p>
              <p className="text-2xl font-bold text-gray-900">{overviewStats.totalApplications.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-success-100">
              <Activity size={24} className="text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {getGrowthIcon(overviewStats.applicationGrowth)}
            <span className={`ml-1 text-sm font-medium ${getGrowthColor(overviewStats.applicationGrowth)}`}>
              {Math.abs(overviewStats.applicationGrowth)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">User Distribution by Role</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <Eye size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {usersByRole.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-700">{item.role}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">{item.count.toLocaleString()}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Growth */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Monthly Growth Trends</h2>
            <button className="text-gray-400 hover:text-gray-600">
              <BarChart3 size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {monthlyData.slice(-3).map((month, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{month.month} 2024</h3>
                  <span className="text-sm text-gray-500">{month.users.toLocaleString()} users</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Jobs:</span>
                    <span className="ml-1 font-medium">{month.jobs}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Apps:</span>
                    <span className="ml-1 font-medium">{month.applications}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Users:</span>
                    <span className="ml-1 font-medium">{month.users.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Companies */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Top Companies by Applications</h2>
          <button className="btn btn-outline text-sm">
            <Filter size={14} className="mr-2" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Applications</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Active Jobs</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Avg. per Job</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Trend</th>
              </tr>
            </thead>
            <tbody>
              {topCompanies.map((company, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-primary-700">
                          {company.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{company.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{company.applications}</td>
                  <td className="py-3 px-4 text-gray-700">{company.jobs}</td>
                  <td className="py-3 px-4 text-gray-700">
                    {Math.round(company.applications / company.jobs)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <TrendingUp size={16} className="text-success-600 mr-1" />
                      <span className="text-sm text-success-600">+{(Math.random() * 20).toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 text-center">
          <div className="p-3 rounded-full bg-primary-100 mb-4 mx-auto w-fit">
            <Activity size={24} className="text-primary-600" />
          </div>
          <h3 className="font-medium mb-2">Server Uptime</h3>
          <p className="text-2xl font-bold text-primary-600">99.9%</p>
          <p className="text-sm text-gray-500">Last 30 days</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="p-3 rounded-full bg-secondary-100 mb-4 mx-auto w-fit">
            <TrendingUp size={24} className="text-secondary-600" />
          </div>
          <h3 className="font-medium mb-2">Response Time</h3>
          <p className="text-2xl font-bold text-secondary-600">245ms</p>
          <p className="text-sm text-gray-500">Average</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="p-3 rounded-full bg-accent-100 mb-4 mx-auto w-fit">
            <Users size={24} className="text-accent-600" />
          </div>
          <h3 className="font-medium mb-2">Active Sessions</h3>
          <p className="text-2xl font-bold text-accent-600">1,247</p>
          <p className="text-sm text-gray-500">Current</p>
        </div>
      </div>
    </div>
  );
};

export default SystemAnalytics;