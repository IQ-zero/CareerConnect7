import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'student' | 'employer' | 'career_counselor') => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Demo users for different roles
const demoUsers: Record<string, User> = {
  'student@example.com': {
    id: 'student-1',
    name: 'Alex Johnson',
    email: 'student@example.com',
    role: 'student',
    major: 'Computer Science',
    university: 'University of Technology',
    graduationYear: 2025,
    gpa: 3.8,
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Passionate computer science student with a focus on web development and artificial intelligence.',
    location: 'San Francisco, CA',
    phoneNumber: '+1 (555) 123-4567',
    linkedIn: 'https://linkedin.com/in/alexjohnson',
    github: 'https://github.com/alexjohnson',
    portfolio: 'https://alexjohnson.dev',
    isActive: true,
    createdAt: '2023-01-15T00:00:00.000Z',
    lastLogin: new Date().toISOString(),
  },
  'employer@example.com': {
    id: 'employer-1',
    name: 'Sarah Mitchell',
    email: 'employer@example.com',
    role: 'employer',
    companyId: 'company-1',
    position: 'Senior Talent Acquisition Manager',
    department: 'Human Resources',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Experienced talent acquisition professional with 8+ years in tech recruiting.',
    location: 'New York, NY',
    phoneNumber: '+1 (555) 987-6543',
    linkedIn: 'https://linkedin.com/in/sarahmitchell',
    isActive: true,
    createdAt: '2022-08-20T00:00:00.000Z',
    lastLogin: new Date().toISOString(),
  },
  'counselor@example.com': {
    id: 'counselor-1',
    name: 'Dr. Michael Rodriguez',
    email: 'counselor@example.com',
    role: 'career_counselor',
    specialization: ['Career Planning', 'Resume Writing', 'Interview Preparation', 'Tech Industry'],
    experience: 12,
    rating: 4.9,
    totalSessions: 1247,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Career counselor with over 12 years of experience helping students and professionals achieve their career goals.',
    location: 'Boston, MA',
    phoneNumber: '+1 (555) 456-7890',
    linkedIn: 'https://linkedin.com/in/michaelrodriguez',
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
      { day: 'Friday', startTime: '09:00', endTime: '15:00', isAvailable: true },
    ],
    isActive: true,
    createdAt: '2021-03-10T00:00:00.000Z',
    lastLogin: new Date().toISOString(),
  },
  'admin@example.com': {
    id: 'admin-1',
    name: 'Jennifer Chen',
    email: 'admin@example.com',
    role: 'admin',
    permissions: ['user_management', 'system_settings', 'analytics', 'content_management'],
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'System administrator with expertise in platform management and user experience optimization.',
    location: 'Seattle, WA',
    phoneNumber: '+1 (555) 321-0987',
    linkedIn: 'https://linkedin.com/in/jenniferchen',
    isActive: true,
    createdAt: '2020-01-01T00:00:00.000Z',
    lastLogin: new Date().toISOString(),
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Check demo credentials
      const demoUser = demoUsers[email];
      if (demoUser && password === 'password123') {
        // Update last login
        const updatedUser = { ...demoUser, lastLogin: new Date().toISOString() };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: 'student' | 'employer' | 'career_counselor') => {
    setIsLoading(true);
    try {
      // Create new user
      const newUser: User = {
        id: `${role}-${Date.now()}`,
        name: name,
        email: email,
        role: role,
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      
      // Add role-specific defaults
      if (role === 'student') {
        newUser.skills = [];
        newUser.graduationYear = new Date().getFullYear() + 2;
      } else if (role === 'career_counselor') {
        newUser.specialization = [];
        newUser.experience = 0;
        newUser.rating = 0;
        newUser.totalSessions = 0;
        newUser.availability = [];
      }
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};