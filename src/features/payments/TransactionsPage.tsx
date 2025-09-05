import React, { useEffect, useState } from 'react';
import { Payment, PaymentFilter } from './types/payment';
import paymentService from './services/paymentService';
import TransactionStats from './components/TransactionStats';
import TransactionFilters from './components/TransactionFilters';
import TransactionTable from './components/TransactionTable';

const TransactionsPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for plans and groups - in a real app, these would come from an API
  const plans = [
    { id: 'basic', name: 'Basic Plan' },
    { id: 'premium', name: 'Premium Plan' },
    { id: 'enterprise', name: 'Enterprise Plan' },
  ];

  const groups = [
    { id: 'group1', name: 'Marketing Team' },
    { id: 'group2', name: 'Sales Team' },
    { id: 'group3', name: 'Development Team' },
    { id: 'group5', name: 'Customer Support' },
  ];

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const data = await paymentService.getAll();
        setPayments(data);
        setFilteredPayments(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load payment data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleFilterChange = async (filter: PaymentFilter) => {
    try {
      setLoading(true);
      const filtered = await paymentService.getFiltered(filter);
      setFilteredPayments(filtered);
      setError(null);
    } catch (err) {
      console.error('Error filtering payments:', err);
      setError('Failed to filter payments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefund = async (paymentId: string) => {
    try {
      const result = await paymentService.processRefund(paymentId);
      console.log(result.message);
      
      // Show success message (in a real app, use a toast notification)
      alert(result.message);
      
      // Refresh the payments list
      const updatedPayments = await paymentService.getAll();
      setPayments(updatedPayments);
      setFilteredPayments(updatedPayments);
      
    } catch (err: any) {
      console.error('Error processing refund:', err);
      // Show error message (in a real app, use a toast notification)
      alert(err.message || 'Failed to process refund');
    }
  };

  const handleExportCSV = () => {
    // In a real application, this would generate and download a CSV file
    console.log('Exporting payments to CSV...');
    alert('CSV export functionality would be implemented here.');
  };

  const handleManualEntry = () => {
    // In a real application, this would open a form to add a manual payment
    console.log('Opening manual payment entry form...');
    alert('Manual payment entry form would be implemented here.');
  };

  if (loading && payments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white">
            Payment Transactions
          </h1>
          <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
            View and manage all payment transactions
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center px-4 py-2 border border-secondary-300 dark:border-secondary-600 shadow-sm text-sm font-medium rounded-md text-secondary-700 dark:text-secondary-200 bg-white dark:bg-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <svg className="-ml-1 mr-2 h-5 w-5 text-secondary-500 dark:text-secondary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export CSV
          </button>
          <button
            onClick={handleManualEntry}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Manual Entry
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <TransactionStats payments={payments} />

      {/* Filters */}
      <TransactionFilters
        onFilterChange={handleFilterChange}
        plans={plans}
        groups={groups}
      />

      {/* Error message */}
      {error && (
        <div className="bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 text-danger-700 dark:text-danger-400 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Loading indicator for filter changes */}
      {loading && payments.length > 0 && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* Transactions Table */}
      {!loading && filteredPayments.length > 0 ? (
        <TransactionTable
          payments={filteredPayments}
          onRefund={handleRefund}
        />
      ) : !loading && !error ? (
        <div className="bg-white dark:bg-secondary-800 shadow rounded-lg p-8 text-center">
          <svg className="mx-auto h-12 w-12 text-secondary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-secondary-900 dark:text-secondary-200">No transactions found</h3>
          <p className="mt-1 text-secondary-500 dark:text-secondary-400">Try adjusting your filters to find what you're looking for.</p>
        </div>
      ) : null}
    </div>
  );
};

export default TransactionsPage; 