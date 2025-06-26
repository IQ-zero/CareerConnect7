import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';
import { MenuIcon, X } from 'lucide-react';

const Layout: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Get saved state from localStorage or default to false
    const saved = localStorage.getItem('sidebarCollapsed');
    return saved ? JSON.parse(saved) : false;
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Redirect to role-specific dashboard
  React.useEffect(() => {
    if (user && window.location.pathname === '/app') {
      switch (user.role) {
        case 'employer':
          navigate('/app/employer');
          break;
        case 'career_counselor':
          navigate('/app/counselor');
          break;
        case 'admin':
          navigate('/app/admin');
          break;
        // Students stay on /app (default dashboard)
      }
    }
  }, [user, navigate]);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle sidebar collapse (desktop)
  const toggleSidebarCollapse = () => {
    const newCollapsedState = !sidebarCollapsed;
    setSidebarCollapsed(newCollapsedState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsedState));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="relative flex-1 pt-16">
        {/* Mobile sidebar toggle button */}
        <div className="fixed bottom-4 right-4 md:hidden z-30">
          <button 
            onClick={toggleSidebar} 
            className="bg-primary-600 text-white p-3 rounded-full shadow-lg"
          >
            {sidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
        
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar}
          isCollapsed={sidebarCollapsed}
          toggleCollapse={toggleSidebarCollapse}
        />
        
        {/* Main content */}
        <main className={`min-h-[calc(100vh-4rem)] p-4 md:p-6 lg:p-8 pt-6 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        }`}>
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;