export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'employer' | 'career_counselor' | 'admin';
  avatar?: string;
  bio?: string;
  location?: string;
  phoneNumber?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  isActive?: boolean;
  createdAt?: string;
  lastLogin?: string;
  
  // Student-specific fields
  major?: string;
  university?: string;
  graduationYear?: number;
  gpa?: number;
  skills?: string[];
  
  // Employer-specific fields
  companyId?: string;
  position?: string;
  department?: string;
  
  // Career Counselor-specific fields
  specialization?: string[];
  experience?: number;
  rating?: number;
  totalSessions?: number;
  availability?: AvailabilitySlot[];
  
  // Admin-specific fields
  permissions?: string[];
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  type: 'fulltime' | 'parttime' | 'internship' | 'contract';
  description: string;
  requirements: string[];
  salary?: string;
  postedDate: string;
  deadline?: string;
  tags: string[];
  applied?: boolean;
  saved?: boolean;
  employerId: string;
  status: 'active' | 'closed' | 'draft';
  applicationsCount?: number;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description: string;
  industry: string[];
  location: string;
  website: string;
  size?: string;
  founded?: number;
  alumni?: number;
  openPositions?: number;
  employerId?: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'workshop' | 'career_fair' | 'info_session' | 'networking' | 'interview' | 'course';
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  virtual?: boolean;
  link?: string;
  host: string;
  hostId?: string;
  registered?: boolean;
  attendees?: number;
  maxAttendees?: number;
  image?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
  summary?: string;
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  gpa?: number;
  location?: string;
  achievements?: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  location?: string;
  description: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expires?: string;
  link?: string;
}

export interface Appointment {
  id: string;
  counselorId: string;
  studentId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'resume_review' | 'career_guidance' | 'mock_interview' | 'job_search';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  studentNotes?: string;
  counselorNotes?: string;
  virtual?: boolean;
  link?: string;
  rating?: number;
  feedback?: string;
}

export interface Consultation {
  id: string;
  studentId: string;
  counselorId: string;
  goals: string[];
  progress: ConsultationProgress[];
  resources: Resource[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'completed' | 'paused';
}

export interface ConsultationProgress {
  id: string;
  date: string;
  notes: string;
  achievements: string[];
  nextSteps: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'document' | 'course' | 'tool';
  url?: string;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  image?: string;
  enrolledCount: number;
  rating: number;
  price?: number;
  isFree: boolean;
  lessons: Lesson[];
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  materials?: string[];
  order: number;
}

export interface Advisor {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  specialization: string[];
  bio: string;
  availability: AvailabilitySlot[];
  rating?: number;
  totalSessions?: number;
  experience?: number;
}

export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'file' | 'appointment';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'application_update' | 'event_reminder' | 'message' | 'appointment' | 'system' | 'course_update';
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  link?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  resumeId: string;
  coverLetterId?: string;
  status: 'applied' | 'review' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  appliedDate: string;
  lastUpdated: string;
  notes?: string;
  employerNotes?: string;
  interviewDate?: string;
}

export interface Analytics {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  totalEvents: number;
  usersByRole: Record<string, number>;
  applicationsByStatus: Record<string, number>;
  jobsByType: Record<string, number>;
  monthlyGrowth: {
    users: number;
    jobs: number;
    applications: number;
  };
}

export interface SystemSettings {
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  emailNotifications: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
  sessionTimeout: number;
}