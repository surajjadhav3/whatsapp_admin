import React, { useState } from 'react';
import { BusinessInfo } from '../types';

interface BusinessInfoFormProps {
  businessInfo?: BusinessInfo;
  onSave: (data: BusinessInfo) => Promise<boolean>;
}

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({ businessInfo, onSave }) => {
  const [formData, setFormData] = useState<BusinessInfo>(
    businessInfo || {
      businessName: '',
      category: '',
      whatsappNumber: '',
      publicLink: ''
    }
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      const result = await onSave(formData);
      if (result) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(formData.publicLink);
    alert('Public link copied to clipboard!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 dark:bg-secondary-700/30 p-6 rounded-lg space-y-6">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white sm:text-sm py-3 px-4"
            placeholder="Your business name"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white sm:text-sm py-3 px-4"
          >
            <option value="">Select a category</option>
            <option value="Gym">Gym</option>
            <option value="Wellness">Wellness</option>
            <option value="Tuition">Tuition</option>
            <option value="Yoga">Yoga</option>
            <option value="Dance">Dance</option>
            <option value="Other">Other</option>
          </select>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            This helps us optimize your experience
          </p>
        </div>
        
        <div>
          <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            WhatsApp Number
          </label>
          <input
            type="text"
            id="whatsappNumber"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            required
            placeholder="+91 9876543210"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white sm:text-sm py-3 px-4"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Include country code (e.g., +91 for India)
          </p>
        </div>
        
        <div>
          <label htmlFor="publicLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Public Link
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="text"
              id="publicLink"
              name="publicLink"
              value={formData.publicLink}
              readOnly
              className="block w-full rounded-l-md border-gray-300 bg-gray-50 dark:bg-secondary-800 dark:border-secondary-600 dark:text-gray-300 sm:text-sm py-3 px-4"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 dark:border-secondary-600 rounded-r-md bg-gray-50 dark:bg-secondary-700 text-gray-500 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-secondary-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Share this link with your customers
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
            loading ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : 'Save Changes'}
        </button>
        
        {success && (
          <div className="flex items-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Changes saved successfully
          </div>
        )}
      </div>
    </form>
  );
};

export default BusinessInfoForm; 