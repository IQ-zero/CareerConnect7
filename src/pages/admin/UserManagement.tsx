import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Shield,
  UserCheck,
  Building2,
  GraduationCap,
  MoreVertical,
  Ban,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react';

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const mockUsers = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@university.edu',
      role: 'student',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
      major: 'Computer Science',
      graduationYear: 2025,
      lastLogin: '2024-01-16T10:30:00Z',
      createdAt: '2023-09-01T00:00:00Z',
      location: 'San Francisco, CA',
      phone: '+1 (555) 123-4567'
    },
    {
      id: '2',
      name: 'Sarah Mitchell',
      email: 'sarah.mitchell@techvision.com',
      role: 'employer',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      company: 'TechVision Inc.',
      position: 'Senior Talent Acquisition Manager',
      lastLogin: '2024-01-16T09:15:00Z',
      createdAt: '2022-08-20T00:00:00Z',
      location: 'New York, NY',
      phone: '+1 (555) 987-6543'
    },
    {
      id: '3',
      name: 'Dr. Michael Rodriguez',
      email: 'michael.rodriguez@university.edu',
      role: 'career_counselor',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialization: ['Career Planning', 'Resume Writing', 'Tech Industry'],
      experience: 12,
      rating: 4.9,
      lastLogin: '2024-01-16T08:45:00Z',
      createdAt: '2021-03-10T00:00:00Z',
      location: 'Boston, MA',
      phone: '+1 (555) 456-7890'
    },
    {
      id: '4',
      name: 'Jennifer Chen',
      email: 'jennifer.chen@university.edu',
      role: 'admin',
      status: 'active',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      permissions: ['user_management', 'system_settings', 'analytics'],
      lastLogin: '2024-01-16T11:20:00Z',
      createdAt: '2020-01-01T00:00:00Z',
      location: 'Seattle, WA',
      phone: '+1 (555) 321-0987'
    },
    {
      id: '5',
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@university.edu',
      role: 'student',
      status: 'inactive',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
      major: 'Psychology',
      graduationYear: 2024,
      lastLogin: '2023-12-20T15:30:00Z',
      createdAt: '2023-08-15T00:00:00Z',
      location: 'Los Angeles, CA',
      phone: '+1 (555) 234-5678'
    }
  ];

  const roles = ['student', 'employer', 'career_counselor', 'admin'];
  const statuses = ['active', 'inactive', 'suspended'];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return <GraduationCap size={16} className="text-primary-600" />;
      case 'employer': return <Building2 size={16} className="text-secondary-600" />;
      case 'career_counselor': return <UserCheck size={16} className="text-accent-600" />;
      case 'admin': return <Shield size={16} className="text-success-600" />;
      default: return <UserCheck size={16} className="text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'badge-primary';
      case 'employer': return 'badge-secondary';
      case 'career_counselor': return 'badge-accent';
      case 'admin': return 'badge-success';
      default: return 'badge-primary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-warning';
      case 'suspended': return 'badge-error';
      default: return 'badge-primary';
    }
  };

  const formatRole = (role: string) => {
    return role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage users, roles, and permissions across the platform</p>
        </div>
        <button className="btn btn-primary mt-4 md:mt-0">
          <Plus size={16} className="mr-2" />
          Add New User
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-primary-100 mb-3 mx-auto w-fit">
            <GraduationCap size={24} className="text-primary-600" />
          </div>
          <h3 className="font-medium mb-1">Students</h3>
          <p className="text-2xl font-bold text-primary-600">
            {mockUsers.filter(u => u.role === 'student').length}
          </p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-secondary-100 mb-3 mx-auto w-fit">
            <Building2 size={24} className="text-secondary-600" />
          </div>
          <h3 className="font-medium mb-1">Employers</h3>
          <p className="text-2xl font-bold text-secondary-600">
            {mockUsers.filter(u => u.role === 'employer').length}
          </p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-accent-100 mb-3 mx-auto w-fit">
            <UserCheck size={24} className="text-accent-600" />
          </div>
          <h3 className="font-medium mb-1">Counselors</h3>
          <p className="text-2xl font-bold text-accent-600">
            {mockUsers.filter(u => u.role === 'career_counselor').length}
          </p>
        </div>
        
        <div className="card p-4 text-center">
          <div className="p-3 rounded-full bg-success-100 mb-3 mx-auto w-fit">
            <Shield size={24} className="text-success-600" />
          </div>
          <h3 className="font-medium mb-1">Admins</h3>
          <p className="text-2xl font-bold text-success-600">
            {mockUsers.filter(u => u.role === 'admin').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        <div className="w-full md:w-48">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="input w-full"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role} value={role}>{formatRole(role)}</option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-48">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input w-full"
          >
            <option value="all">All Status</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-outline">
          <Filter size={16} className="mr-2" />
          More Filters
        </button>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map(user => (
          <div key={user.id} className="card p-6 hover:shadow-medium transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`badge ${getRoleColor(user.role)} flex items-center`}>
                        {getRoleIcon(user.role)}
                        <span className="ml-1">{formatRole(user.role)}</span>
                      </span>
                      <span className={`badge ${getStatusColor(user.status)}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      {user.email}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      {user.phone}
                    </div>
                    <div className="text-gray-600">
                      Location: {user.location}
                    </div>
                  </div>

                  {/* Role-specific information */}
                  {user.role === 'student' && (
                    <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                      <p className="text-sm text-primary-700">
                        <strong>Major:</strong> {(user as any).major} • 
                        <strong> Graduation:</strong> {(user as any).graduationYear}
                      </p>
                    </div>
                  )}

                  {user.role === 'employer' && (
                    <div className="mb-4 p-3 bg-secondary-50 rounded-lg">
                      <p className="text-sm text-secondary-700">
                        <strong>Company:</strong> {(user as any).company} • 
                        <strong> Position:</strong> {(user as any).position}
                      </p>
                    </div>
                  )}

                  {user.role === 'career_counselor' && (
                    <div className="mb-4 p-3 bg-accent-50 rounded-lg">
                      <p className="text-sm text-accent-700">
                        <strong>Experience:</strong> {(user as any).experience} years • 
                        <strong> Rating:</strong> {(user as any).rating}/5 • 
                        <strong> Specialization:</strong> {(user as any).specialization?.join(', ')}
                      </p>
                    </div>
                  )}

                  {user.role === 'admin' && (
                    <div className="mb-4 p-3 bg-success-50 rounded-lg">
                      <p className="text-sm text-success-700">
                        <strong>Permissions:</strong> {(user as any).permissions?.join(', ')}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-medium">Last Login:</span>
                      <br />
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Member Since:</span>
                      <br />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Account Status:</span>
                      <br />
                      <span className={`inline-flex items-center ${
                        user.status === 'active' ? 'text-success-600' : 
                        user.status === 'inactive' ? 'text-warning-600' : 'text-error-600'
                      }`}>
                        {user.status === 'active' && <CheckCircle size={14} className="mr-1" />}
                        {user.status === 'suspended' && <Ban size={14} className="mr-1" />}
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-6">
                <button className="btn btn-outline text-sm py-1.5 px-3">
                  <Eye size={14} className="mr-1" />
                  View
                </button>
                <button className="btn btn-outline text-sm py-1.5 px-3">
                  <Edit size={14} className="mr-1" />
                  Edit
                </button>
                <div className="relative">
                  <button className="btn btn-outline text-sm py-1.5 px-3">
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No users found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>

      {/* Bulk Actions */}
      <div className="card p-4">
        <h3 className="font-medium mb-4">Bulk Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline text-sm">Export Users</button>
          <button className="btn btn-outline text-sm">Send Notification</button>
          <button className="btn btn-outline text-sm">Update Permissions</button>
          <button className="btn btn-outline text-sm text-error-600 border-error-200 hover:bg-error-50">
            Suspend Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;