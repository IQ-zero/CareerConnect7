import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  Globe,
  Users,
  Calendar,
  Plus,
  X,
  Upload
} from 'lucide-react';

const CompanyProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: 'TechVision Inc.',
    industry: 'Technology',
    size: '1000-5000',
    founded: '2005',
    location: 'San Francisco, CA',
    website: 'https://techvision.com',
    email: 'contact@techvision.com',
    phone: '+1 (555) 123-4567',
    description: 'TechVision is a leading technology company focused on innovative software solutions that transform businesses and improve lives.',
    mission: 'To empower businesses through cutting-edge technology solutions.',
    values: ['Innovation', 'Integrity', 'Collaboration', 'Excellence'],
    benefits: [
      'Health, Dental & Vision Insurance',
      'Flexible Work Arrangements',
      'Professional Development Budget',
      'Stock Options',
      'Unlimited PTO'
    ],
    newValue: '',
    newBenefit: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const addValue = () => {
    if (formData.newValue.trim()) {
      setFormData({
        ...formData,
        values: [...formData.values, formData.newValue.trim()],
        newValue: ''
      });
    }
  };

  const removeValue = (valueToRemove: string) => {
    setFormData({
      ...formData,
      values: formData.values.filter(value => value !== valueToRemove)
    });
  };

  const addBenefit = () => {
    if (formData.newBenefit.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, formData.newBenefit.trim()],
        newBenefit: ''
      });
    }
  };

  const removeBenefit = (benefitToRemove: string) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter(benefit => benefit !== benefitToRemove)
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-soft overflow-hidden">
        {/* Header/Banner */}
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-800 relative">
          {isEditing && (
            <button className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-lg hover:bg-opacity-30 transition-colors">
              <Upload size={16} />
            </button>
          )}
        </div>
        
        {/* Profile Content */}
        <div className="px-6 py-8">
          {/* Company Logo and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start -mt-16 mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-lg border-4 border-white shadow-md bg-white flex items-center justify-center">
                <Building2 size={40} className="text-primary-600" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-md hover:bg-primary-700 transition-colors">
                  <Edit2 size={14} />
                </button>
              )}
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{formData.companyName}</h1>
              <p className="text-gray-600">{formData.industry}</p>
              <p className="text-sm text-gray-500">{formData.size} employees • Founded {formData.founded}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Company Information */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Company Information</h2>
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="btn btn-outline text-sm py-1.5 px-3 flex items-center"
                  >
                    {isEditing ? (
                      <>
                        <Save size={16} className="mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit2 size={16} className="mr-2" />
                        Edit Profile
                      </>
                    )}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Building2 size={16} className="mr-2 text-gray-400" />
                        {formData.companyName}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900">{formData.industry}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                    {isEditing ? (
                      <select
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        className="input"
                      >
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000-5000">1000-5000 employees</option>
                        <option value="5000+">5000+ employees</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Users size={16} className="mr-2 text-gray-400" />
                        {formData.size} employees
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Founded</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.founded}
                        onChange={(e) => setFormData({ ...formData, founded: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        {formData.founded}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        {formData.location}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <a
                        href={formData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center"
                      >
                        <Globe size={16} className="mr-2" />
                        {formData.website}
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                  {isEditing ? (
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input min-h-[100px]"
                      placeholder="Describe your company..."
                    />
                  ) : (
                    <p className="text-gray-900">{formData.description}</p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Mail size={16} className="mr-2 text-gray-400" />
                        {formData.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input"
                      />
                    ) : (
                      <p className="text-gray-900 flex items-center">
                        <Phone size={16} className="mr-2 text-gray-400" />
                        {formData.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Mission & Values */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Mission & Values</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
                  {isEditing ? (
                    <textarea
                      value={formData.mission}
                      onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                      className="input min-h-[80px]"
                      placeholder="Your company mission..."
                    />
                  ) : (
                    <p className="text-gray-900">{formData.mission}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Values</label>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.newValue}
                          onChange={(e) => setFormData({ ...formData, newValue: e.target.value })}
                          className="input flex-1"
                          placeholder="Add a company value"
                          onKeyPress={(e) => e.key === 'Enter' && addValue()}
                        />
                        <button
                          type="button"
                          onClick={addValue}
                          className="btn btn-primary px-4"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.values.map((value, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm flex items-center"
                          >
                            {value}
                            <button
                              type="button"
                              onClick={() => removeValue(value)}
                              className="ml-2 text-primary-400 hover:text-primary-600"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {formData.values.map((value, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                        >
                          {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Benefits & Perks */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits & Perks</h2>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.newBenefit}
                        onChange={(e) => setFormData({ ...formData, newBenefit: e.target.value })}
                        className="input flex-1"
                        placeholder="Add a benefit or perk"
                        onKeyPress={(e) => e.key === 'Enter' && addBenefit()}
                      />
                      <button
                        type="button"
                        onClick={addBenefit}
                        className="btn btn-primary px-4"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span>{benefit}</span>
                          <button
                            type="button"
                            onClick={() => removeBenefit(benefit)}
                            className="text-gray-400 hover:text-error-600"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {formData.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;