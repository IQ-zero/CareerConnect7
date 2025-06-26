import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Building2, 
  Briefcase,
  UserCircle,
  ChevronRight,
  BookOpen,
  Users,
  Settings,
  BarChart3,
  Shield,
  Clock,
  Target,
  GraduationCap,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, isCollapsed, toggleCollapse }) => {
  const { user } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { name: 'Dashboard', path: '/app', icon: <LayoutDashboard size={20} /> },
          { name: 'Resume Builder', path: '/app/resume', icon: <FileText size={20} /> },
          { name: 'Job Listings', path: '/app/jobs', icon: <Briefcase size={20} /> },
          { name: 'Companies', path: '/app/companies', icon: <Building2 size={20} /> },
          { name: 'Events', path: '/app/events', icon: <Calendar size={20} /> },
          { name: 'Courses', path: '/app/courses', icon: <BookOpen size={20} /> },
          { name: 'Appointments', path: '/app/appointments', icon: <Clock size={20} /> },
          { name: 'Profile', path: '/app/profile', icon: <UserCircle size={20} /> },
        ];
      
      case 'employer':
        return [
          { name: 'Dashboard', path: '/app/employer', icon: <LayoutDashboard size={20} /> },
          { name: 'Job Management', path: '/app/employer/jobs', icon: <Briefcase size={20} /> },
          { name: 'Candidates', path: '/app/employer/candidates', icon: <Users size={20} /> },
          { name: 'Company Profile', path: '/app/employer/company', icon: <Building2 size={20} /> },
          { name: 'Events', path: '/app/employer/events', icon: <Calendar size={20} /> },
          { name: 'Profile', path: '/app/profile', icon: <UserCircle size={20} /> },
        ];
      
      case 'career_counselor':
        return [
          { name: 'Dashboard', path: '/app/counselor', icon: <LayoutDashboard size={20} /> },
          { name: 'Students', path: '/app/counselor/students', icon: <GraduationCap size={20} /> },
          { name: 'Appointments', path: '/app/counselor/appointments', icon: <Clock size={20} /> },
          { name: 'Consultations', path: '/app/counselor/consultations', icon: <Target size={20} /> },
          { name: 'Availability', path: '/app/counselor/availability', icon: <Calendar size={20} /> },
          { name: 'Courses', path: '/app/counselor/courses', icon: <BookOpen size={20} /> },
          { name: 'Profile', path: '/app/profile', icon: <UserCircle size={20} /> },
        ];
      
      case 'admin':
        return [
          { name: 'Dashboard', path: '/app/admin', icon: <LayoutDashboard size={20} /> },
          { name: 'User Management', path: '/app/admin/users', icon: <Users size={20} /> },
          { name: 'Analytics', path: '/app/admin/analytics', icon: <BarChart3 size={20} /> },
          { name: 'Content Management', path: '/app/admin/content', icon: <FileText size={20} /> },
          { name: 'System Settings', path: '/app/admin/settings', icon: <Settings size={20} /> },
          { name: 'Profile', path: '/app/profile', icon: <UserCircle size={20} /> },
        ];
      
      default:
        return [
          { name: 'Dashboard', path: '/app', icon: <LayoutDashboard size={20} /> },
          { name: 'Profile', path: '/app/profile', icon: <UserCircle size={20} /> },
        ];
    }
  };

  const navItems = getNavItems();

  // Mobile sidebar backdrop
  const Backdrop = () => (
    <div 
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={toggleSidebar}
    />
  );

  return (
    <>
      <Backdrop />
      
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-30 transition-all duration-300 ease-in-out overflow-hidden shadow-lg md:shadow-none ${
          // Mobile behavior - slide in/out
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          // Desktop behavior - always visible, width changes
          'md:translate-x-0'
        } ${
          // Width classes
          isCollapsed ? 'w-3/4 md:w-16' : 'w-3/4 md:w-64'
        }`}
      >
        {/* Desktop Toggle Button */}
        <button
          onClick={toggleCollapse}
          className="hidden md:block absolute -right-3 top-6 z-50 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ChevronRight 
            size={16} 
            className={`text-gray-600 transition-transform duration-300 ${
              isCollapsed ? 'rotate-0' : 'rotate-180'
            }`} 
          />
        </button>

        <div className="h-full overflow-y-auto">
          <div className={`p-4 ${isCollapsed ? 'md:p-2' : ''} transition-all duration-300`}>
            {/* Role indicator */}
            <div className={`mb-4 p-3 bg-primary-50 rounded-lg transition-all duration-300 ${
              isCollapsed ? 'md:p-2 md:mx-0' : ''
            }`}>
              <div className="flex items-center">
                <div className={`p-2 bg-primary-100 rounded-full flex-shrink-0 ${
                  isCollapsed ? 'md:mx-auto' : 'mr-3'
                } transition-all duration-300`}>
                  {user?.role === 'student' && <GraduationCap size={16} className="text-primary-600" />}
                  {user?.role === 'employer' && <Building2 size={16} className="text-primary-600" />}
                  {user?.role === 'career_counselor' && <UserCheck size={16} className="text-primary-600" />}
                  {user?.role === 'admin' && <Shield size={16} className="text-primary-600" />}
                </div>
                {!isCollapsed && (
                  <div className="md:block transition-all duration-300">
                    <p className="text-sm font-medium text-primary-900 capitalize">
                      {user?.role?.replace('_', ' ')}
                    </p>
                    <p className="text-xs text-primary-600">Dashboard</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col space-y-1.5">
              {navItems.map((item) => (
                  <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    // Close mobile sidebar when navigating
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                  className={({ isActive }) =>
                    `group flex items-center rounded-lg transition-all duration-200 relative ${
                      isActive
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    } ${
                      isCollapsed 
                        ? 'md:justify-center md:px-2 py-2.5 px-3' 
                        : 'px-3 py-2.5'
                    }`
                  }
                  title={isCollapsed ? item.name : ''}
                >
                  <span className={`flex-shrink-0 transition-all duration-300 ${
                    isCollapsed ? '' : 'mr-3'
                  }`}>
                    {item.icon}
                  </span>
                  
                  {!isCollapsed && (
                    <>
                      <span className="transition-all duration-300 truncate flex-1">
                        {item.name}
                      </span>
                      <ChevronRight 
                        size={16} 
                        className="opacity-50 group-hover:opacity-70 transition-opacity flex-shrink-0" 
                      />
                    </>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;