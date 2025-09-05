import React, { useState } from 'react';
import { ExpiringPlan } from '../types';
import { formatDate } from '../../../utils/formatters';

interface ExpiringPlansTableProps {
  data: ExpiringPlan[];
  loading: boolean;
  days: number;
  onSendReminders: (days: number) => Promise<any>;
}

const ExpiringPlansTable: React.FC<ExpiringPlansTableProps> = ({ 
  data, 
  loading, 
  days,
  onSendReminders 
}) => {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSendReminders = async () => {
    setSending(true);
    setSuccess(null);
    setError(null);
    
    try {
      const response = await onSendReminders(3); // 3-day expiry reminders
      setSuccess(response.message);
      setTimeout(() => setSuccess(null), 5000);
    } catch (err) {
      setError('Failed to send reminders. Please try again.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-secondary-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Upcoming Expiries (Next {days} Days)
        </h2>
      </div>
      
      {loading ? (
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-secondary-700">
              <thead className="bg-gray-50 dark:bg-secondary-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Plan Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Ends On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-secondary-800 divide-y divide-gray-200 dark:divide-secondary-700">
                {data.length > 0 ? (
                  data.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50 dark:hover:bg-secondary-700/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {plan.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {plan.planName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {formatDate(plan.expiryDate)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No plans expiring in the next {days} days
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 dark:bg-secondary-700/50 border-t border-gray-200 dark:border-secondary-700">
            <button
              onClick={handleSendReminders}
              disabled={sending || data.length === 0}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                sending || data.length === 0 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {sending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Send Reminder to Customers (3-day expiry)
                </>
              )}
            </button>
            
            {success && (
              <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm rounded-md">
                {success}
              </div>
            )}
            
            {error && (
              <div className="mt-3 p-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-md">
                {error}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ExpiringPlansTable; 