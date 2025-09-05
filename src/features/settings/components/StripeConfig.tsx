import React, { useState } from 'react';
import { StripeConfig as StripeConfigType } from '../types';
import * as settingsApi from '../api/settingsApi';
import { useToast } from '../../../components/Toast';

interface StripeConfigProps {
  stripeConfig?: StripeConfigType;
  onSave: (data: StripeConfigType) => Promise<boolean>;
}

const StripeConfigComponent: React.FC<StripeConfigProps> = ({ stripeConfig, onSave }) => {
  const [formData, setFormData] = useState<StripeConfigType>(
    stripeConfig || {
      publishableKey: '',
      webhookConnected: false
    }
  );
  const [loading, setLoading] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [connectSuccess, setConnectSuccess] = useState(false);
  const [showKey, setShowKey] = useState(false);
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

  const handleConnectWebhook = async () => {
    setConnectLoading(true);
    setConnectSuccess(false);
    
    try {
      const result = await settingsApi.connectStripeWebhook();
      console.log('Connect webhook response:', result);
      
      if (result.success) {
        setConnectSuccess(true);
        setFormData(prev => ({ ...prev, webhookConnected: true }));
        showToast('success', 'Stripe webhook connected successfully');
        setTimeout(() => setConnectSuccess(false), 3000);
      } else {
        showToast('error', result.message || 'Failed to connect webhook');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect webhook';
      console.error('Error connecting webhook:', err);
      showToast('error', errorMessage);
    } finally {
      setConnectLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="publishableKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Publishable Key
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type={showKey ? "text" : "password"}
              id="publishableKey"
              name="publishableKey"
              value={formData.publishableKey}
              onChange={handleChange}
              required
              className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-secondary-700 dark:border-secondary-600 dark:text-white sm:text-sm"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-secondary-600 rounded-r-md bg-gray-50 dark:bg-secondary-700 text-gray-500 dark:text-gray-300 text-sm"
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Webhook Status:</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              formData.webhookConnected 
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            }`}>
              {formData.webhookConnected ? '✓ Connected' : '✗ Not Connected'}
            </span>
          </div>
          
          <button
            type="button"
            onClick={handleConnectWebhook}
            disabled={connectLoading || formData.webhookConnected}
            className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white ${
              connectLoading || formData.webhookConnected 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {connectLoading ? 'Connecting...' : formData.webhookConnected ? 'Connected' : 'Connect Webhook'}
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
        
        {connectSuccess && (
          <span className="text-green-600 dark:text-green-400">
            ✓ Webhook connected successfully
          </span>
        )}
      </div>
    </form>
  );
};

export default StripeConfigComponent; 