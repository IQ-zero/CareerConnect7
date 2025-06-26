import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Job, Event, Notification, JobApplication } from '../types';
import { mockJobs, mockEvents, mockNotifications } from '../data/mockData';

interface UserContextType {
  savedJobs: Job[];
  appliedJobs: JobApplication[];
  registeredEvents: Event[];
  notifications: Notification[];
  saveJob: (job: Job) => void;
  unsaveJob: (jobId: string) => void;
  applyToJob: (jobId: string, resumeId: string) => void;
  registerForEvent: (eventId: string) => void;
  unregisterFromEvent: (eventId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

const UserContext = createContext<UserContextType>({
  savedJobs: [],
  appliedJobs: [],
  registeredEvents: [],
  notifications: [],
  saveJob: () => {},
  unsaveJob: () => {},
  applyToJob: () => {},
  registerForEvent: () => {},
  unregisterFromEvent: () => {},
  markNotificationAsRead: () => {},
  clearAllNotifications: () => {},
});

export const useUserData = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<JobApplication[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize with mock data
  useEffect(() => {
    if (isAuthenticated && user) {
      // In a real app, we would fetch this data from an API
      setSavedJobs(mockJobs.slice(0, 3).map(job => ({ ...job, saved: true })));
      setRegisteredEvents(mockEvents.slice(0, 2).map(event => ({ ...event, registered: true })));
      setNotifications(mockNotifications);
      
      // Mock applied jobs
      const mockApplications: JobApplication[] = mockJobs.slice(0, 2).map(job => ({
        id: `app-${job.id}`,
        jobId: job.id,
        userId: user.id,
        resumeId: 'resume-1',
        status: Math.random() > 0.5 ? 'applied' : 'review',
        appliedDate: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdated: new Date().toISOString(),
      }));
      setAppliedJobs(mockApplications);
    }
  }, [isAuthenticated, user]);

  const saveJob = (job: Job) => {
    setSavedJobs(prev => [...prev, { ...job, saved: true }]);
  };

  const unsaveJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
  };

  const applyToJob = (jobId: string, resumeId: string) => {
    const newApplication: JobApplication = {
      id: `app-${Date.now()}`,
      jobId,
      userId: user?.id || '',
      resumeId,
      status: 'applied',
      appliedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    setAppliedJobs(prev => [...prev, newApplication]);
    
    // Add a notification
    const job = mockJobs.find(j => j.id === jobId);
    if (job) {
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId: user?.id || '',
        type: 'application_update',
        title: 'Application Submitted',
        message: `Your application for ${job.title} at ${job.company.name} has been submitted successfully.`,
        read: false,
        timestamp: new Date().toISOString(),
        link: '/app/jobs',
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
  };

  const registerForEvent = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId);
    if (event) {
      setRegisteredEvents(prev => [...prev, { ...event, registered: true }]);
      
      // Add a notification
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId: user?.id || '',
        type: 'event_reminder',
        title: 'Event Registration Confirmed',
        message: `You're registered for ${event.title} on ${event.date}. We'll send you a reminder before the event.`,
        read: false,
        timestamp: new Date().toISOString(),
        link: '/app/events',
      };
      setNotifications(prev => [newNotification, ...prev]);
    }
  };

  const unregisterFromEvent = (eventId: string) => {
    setRegisteredEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  return (
    <UserContext.Provider
      value={{
        savedJobs,
        appliedJobs,
        registeredEvents,
        notifications,
        saveJob,
        unsaveJob,
        applyToJob,
        registerForEvent,
        unregisterFromEvent,
        markNotificationAsRead,
        clearAllNotifications,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};