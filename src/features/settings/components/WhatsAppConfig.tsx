import React, { useState } from 'react';
import { WhatsAppConfig as WhatsAppConfigType } from '../types';
import * as settingsApi from '../api/settingsApi';
import { useToast } from '../../../components/Toast';

interface WhatsAppConfigProps {
  whatsappConfig?: WhatsAppConfigType;
  onSave: (data: WhatsAppConfigType) => Promise<boolean>;
}

const WhatsAppConfigComponent: React.FC<WhatsAppConfigProps> = ({ whatsappConfig, onSave }) => {
  const [formData, setFormData] = useState<WhatsAppConfigType>(
    whatsappConfig || {
      apiKey: '',
      webhookUrl: '',
      templateSyncStatus: false 
    }
  );
  const [loading, setLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSyncTemplates = async () => {
    setSyncLoading(true);
    setSyncSuccess(false);
    
    try {
      const result = await settingsApi.syncWhatsAppTemplates();
      console.log('Sync templates response:', result);
      
      if (result.success) {
        setSyncSuccess(true);
        setFormData(prev => ({ ...prev, templateSyncStatus: true }));
        showToast('success', 'WhatsApp templates synced successfully');
        setTimeout(() => setSyncSuccess(false), 3000);
      } else {
        showToast('error', result.message || 'Failed to sync templates');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sync templates';
      console.error('Error syncing templates:', err);
      showToast('error', errorMessage);
    } finally {
      setSyncLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            API Key
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type={showApiKey ? "text" : "password"}
              id="apiKey"
              name="apiKey"
              value={formData.apiKey}
              onChange={handleChange}
              required
              className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-secondary-600 rounded-r-md bg-gray-50 dark:bg-secondary-700 text-gray-500 dark:text-gray-300 text-sm"
            >
              {showApiKey ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Webhook URL
          </label>
          <input
            type="text"
            id="webhookUrl"
            name="webhookUrl"
            value={formData.webhookUrl}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white sm:text-sm"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Template Sync Status:</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              formData.templateSyncStatus 
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            }`}>
              {formData.templateSyncStatus ? '✓ Synced' : '✗ Not Synced'}
            </span>
          </div>
          
          <button
            type="button"
            onClick={handleSyncTemplates}
            disabled={syncLoading}
            className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white ${
              syncLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {syncLoading ? 'Syncing...' : 'Sync Templates'}
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
            loading ? 'bg-primary-400' : 'bg-primary-600 hover:bg-primary-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        
        {success && (
          <span className="text-green-600 dark:text-green-400">
            ✓ Changes saved successfully
          </span>
        )}
        
        {syncSuccess && (
          <span className="text-green-600 dark:text-green-400">
            ✓ Templates synced successfully
          </span>
        )}
      </div>
    </form>
  );
};

export default WhatsAppConfigComponent; 