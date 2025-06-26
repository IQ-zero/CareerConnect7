import { useState } from 'react';
import { useSavedItems } from '../context/SavedItemsContext';
import { Bookmark, Briefcase, Building2, Calendar, BookOpen, Trash2, ExternalLink, MapPin, Clock, Users } from 'lucide-react';

const SavedItems = () => {
  const { savedItems, removeItem } = useSavedItems();
  const [filter, setFilter] = useState<'all' | 'job' | 'company' | 'event' | 'course'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on search query and type filter
  const filteredItems = savedItems.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Clear all saved items
  const clearAllItems = () => {
    filteredItems.forEach(item => removeItem(item.id));
  };

  // Get icon based on item type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'job': return <Briefcase size={20} className="text-blue-600" />;
      case 'company': return <Building2 size={20} className="text-green-600" />;
      case 'event': return <Calendar size={20} className="text-purple-600" />;
      case 'course': return <BookOpen size={20} className="text-orange-600" />;
      default: return <Bookmark size={20} className="text-gray-600" />;
    }
  };

  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'job': return 'bg-blue-100 text-blue-800';
      case 'company': return 'bg-green-100 text-green-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'course': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Bookmark className="text-primary-600" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Saved Items</h1>
            <p className="text-gray-600 mt-1">
              Your bookmarked jobs, companies, events, and courses ({savedItems.length} items)
            </p>
          </div>
        </div>

        {savedItems.length > 0 && (
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search saved items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Users size={16} className="text-gray-400" />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={clearAllItems}
                className="btn btn-outline text-red-600 hover:bg-red-50 hover:border-red-300"
                disabled={filteredItems.length === 0}
              >
                <Trash2 size={16} className="mr-2" />
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        {savedItems.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by type:</h3>
            {/* Type Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'All Items', count: savedItems.length },
                { key: 'job', label: 'Jobs', count: savedItems.filter(i => i.type === 'job').length },
                { key: 'company', label: 'Companies', count: savedItems.filter(i => i.type === 'company').length },
                { key: 'event', label: 'Events', count: savedItems.filter(i => i.type === 'event').length },
                { key: 'course', label: 'Courses', count: savedItems.filter(i => i.type === 'course').length },
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filter === key
                      ? 'bg-primary-100 text-primary-700 border-primary-300'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-soft hover:shadow-medium transition-all duration-200 overflow-hidden"
            >
              {/* Image */}
              {item.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(item.type)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(item.type)}`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-gray-600 text-sm mb-3">{item.subtitle}</p>
                )}

                {/* Details */}
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  {item.location && (
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2 text-gray-400" />
                      {item.location}
                    </div>
                  )}
                  {item.salary && (
                    <div className="flex items-center">
                      <div className="w-3.5 h-3.5 mr-2 flex items-center justify-center">
                        <span className="text-gray-400 font-bold">$</span>
                      </div>
                      {item.salary}
                    </div>
                  )}
                  {item.date && (
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      {item.date} {item.time && `• ${item.time}`}
                    </div>
                  )}
                  {item.attendees && (
                    <div className="flex items-center">
                      <Users size={14} className="mr-2 text-gray-400" />
                      {item.attendees} attendees
                    </div>
                  )}
                </div>

                {/* Description */}
                {item.description && (
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    Saved {formatDate(item.savedAt)}
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                    >
                      View Details
                      <ExternalLink size={14} className="ml-1" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {searchQuery || filter !== 'all' 
              ? 'No matching saved items found' 
              : 'No saved items yet'
            }
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || filter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Start bookmarking jobs, companies, events, and courses you\'re interested in!'
            }
          </p>
          {(!searchQuery && filter === 'all') && (
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="/app/jobs" className="btn btn-primary">
                Browse Jobs
              </a>
              <a href="/app/companies" className="btn btn-outline">
                Explore Companies
              </a>
              <a href="/app/events" className="btn btn-outline">
                View Events
              </a>
              <a href="/app/courses" className="btn btn-outline">
                Browse Courses
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedItems;
