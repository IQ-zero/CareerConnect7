import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Settings,
  Copy
} from 'lucide-react';

const Availability: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Mock availability data
  const [availability, setAvailability] = useState({
    monday: [
      { id: '1', start: '09:00', end: '12:00', status: 'available' },
      { id: '2', start: '14:00', end: '17:00', status: 'available' }
    ],
    tuesday: [
      { id: '3', start: '10:00', end: '16:00', status: 'available' }
    ],
    wednesday: [
      { id: '4', start: '09:00', end: '11:00', status: 'booked' },
      { id: '5', start: '14:00', end: '18:00', status: 'available' }
    ],
    thursday: [
      { id: '6', start: '09:00', end: '15:00', status: 'available' }
    ],
    friday: [
      { id: '7', start: '10:00', end: '14:00', status: 'available' }
    ],
    saturday: [],
    sunday: []
  });

  // Settings state
  const [settings, setSettings] = useState({
    defaultSessionDuration: 60,
    bufferTime: 15,
    maxDailyHours: 8,
    allowWeekends: false,
    autoConfirm: false,
    timezone: 'America/New_York'
  });

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'booked': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle size={14} className="text-green-600" />;
      case 'booked': return <Clock size={14} className="text-blue-600" />;
      case 'blocked': return <X size={14} className="text-red-600" />;
      default: return <AlertCircle size={14} className="text-gray-600" />;
    }
  };

  const getTotalHours = () => {
    let total = 0;
    Object.values(availability).forEach((daySlots: any[]) => {
      daySlots.forEach(slot => {
        const start = new Date(`2000-01-01T${slot.start}`);
        const end = new Date(`2000-01-01T${slot.end}`);
        total += (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      });
    });
    return total;
  };

  const getAvailableHours = () => {
    let total = 0;
    Object.values(availability).forEach((daySlots: any[]) => {
      daySlots.forEach(slot => {
        if (slot.status === 'available') {
          const start = new Date(`2000-01-01T${slot.start}`);
          const end = new Date(`2000-01-01T${slot.end}`);
          total += (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        }
      });
    });
    return total;
  };

  const copyPreviousWeek = () => {
    // Logic to copy previous week's availability
    console.log('Copying previous week availability...');
  };

  const clearAllAvailability = () => {
    const emptyAvailability = Object.keys(availability).reduce((acc, day) => {
      acc[day] = [];
      return acc;
    }, {} as any);
    setAvailability(emptyAvailability);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Availability Management</h1>
          <p className="text-gray-600">Set your weekly schedule and manage time slots</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button 
            onClick={() => setShowSettings(true)}
            className="btn btn-outline text-sm"
          >
            <Settings size={16} className="mr-2" />
            Settings
          </button>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`btn ${isEditing ? 'btn-success' : 'btn-primary'} text-sm`}
          >
            {isEditing ? (
              <>
                <Save size={16} className="mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 size={16} className="mr-2" />
                Edit Schedule
              </>
            )}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-lg font-semibold text-gray-900">{getTotalHours()}h</p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Available Hours</p>
              <p className="text-lg font-semibold text-gray-900">{getAvailableHours()}h</p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Working Days</p>
              <p className="text-lg font-semibold text-gray-900">
                {Object.values(availability).filter((daySlots: any[]) => daySlots.length > 0).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm text-gray-600">Booked Slots</p>
              <p className="text-lg font-semibold text-gray-900">
                {Object.values(availability).flat().filter((slot: any) => slot.status === 'booked').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {isEditing && (
        <div className="card p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={copyPreviousWeek}
              className="btn btn-outline text-sm"
            >
              <Copy size={16} className="mr-2" />
              Copy Previous Week
            </button>
            <button className="btn btn-outline text-sm">
              <Plus size={16} className="mr-2" />
              Add Standard Hours
            </button>
            <button 
              onClick={clearAllAvailability}
              className="btn btn-outline text-sm text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 size={16} className="mr-2" />
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Weekly Calendar */}
      <div className="card">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
            <div className="flex items-center space-x-3">
              <input
                type="week"
                value={selectedWeek.toISOString().split('T')[0]}
                onChange={(e) => setSelectedWeek(new Date(e.target.value))}
                className="input text-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
          {daysOfWeek.map((day, index) => (
            <div key={day} className="p-4">
              <div className="text-center mb-4">
                <h4 className="font-medium text-gray-900">{dayLabels[index]}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(selectedWeek.getTime() + index * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-2">
                {availability[day as keyof typeof availability].map((slot: any) => (
                  <div key={slot.id} className={`p-2 rounded-lg border ${getStatusColor(slot.status)}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(slot.status)}
                        <span className="text-sm font-medium">
                          {slot.start} - {slot.end}
                        </span>
                      </div>
                      {isEditing && (
                        <div className="flex space-x-1">
                          <button className="p-1 hover:bg-white rounded">
                            <Edit3 size={12} />
                          </button>
                          <button className="p-1 hover:bg-white rounded text-red-600">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                    {slot.status === 'booked' && (
                      <p className="text-xs text-gray-600 mt-1">
                        Student appointment
                      </p>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <button className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
                    <Plus size={16} className="mx-auto" />
                    <span className="block text-xs mt-1">Add Time Slot</span>
                  </button>
                )}

                {availability[day as keyof typeof availability].length === 0 && !isEditing && (
                  <div className="text-center py-4 text-gray-400">
                    <Calendar size={24} className="mx-auto mb-2" />
                    <p className="text-xs">Not available</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Availability Settings</h2>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Session Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.defaultSessionDuration}
                    onChange={(e) => setSettings({...settings, defaultSessionDuration: parseInt(e.target.value)})}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buffer Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.bufferTime}
                    onChange={(e) => setSettings({...settings, bufferTime: parseInt(e.target.value)})}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Daily Hours
                  </label>
                  <input
                    type="number"
                    value={settings.maxDailyHours}
                    onChange={(e) => setSettings({...settings, maxDailyHours: parseInt(e.target.value)})}
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({...settings, timezone: e.target.value})}
                    className="input w-full"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.allowWeekends}
                    onChange={(e) => setSettings({...settings, allowWeekends: e.target.checked})}
                    className="checkbox mr-3"
                  />
                  <span className="text-sm text-gray-700">Allow weekend appointments</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.autoConfirm}
                    onChange={(e) => setSettings({...settings, autoConfirm: e.target.checked})}
                    className="checkbox mr-3"
                  />
                  <span className="text-sm text-gray-700">Auto-confirm appointments</span>
                </label>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowSettings(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowSettings(false)}
                className="btn btn-primary"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Availability;
