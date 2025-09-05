import React from 'react';
import { Payment } from '../types/payment';

interface TransactionStatsProps {
  payments: Payment[];
}

const TransactionStats: React.FC<TransactionStatsProps> = ({ payments }) => {
  // Calculate stats
  const totalRevenue = payments.reduce((sum, payment) => {
    if (payment.status === 'paid' || payment.status === 'partially_refunded') {
      return sum + payment.amount - (payment.refundAmount || 0);
    }
    return sum;
  }, 0);

  const successfulPayments = payments.filter(
    (payment) => payment.status === 'paid' || payment.status === 'partially_refunded'
  ).length;

  const failedPayments = payments.filter(
    (payment) => payment.status === 'failed'
  ).length;

  const totalRefunds = payments.reduce((sum, payment) => {
    return sum + (payment.refundAmount || 0);
  }, 0);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {/* Total Revenue */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card p-6 transition-all duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-800/30 p-3 rounded-full">
            <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Total Revenue</p>
            <h3 className="mt-1 text-xl font-display font-semibold text-secondary-900 dark:text-white">
              {formatCurrency(totalRevenue)}
            </h3>
          </div>
        </div>
      </div>

      {/* Successful Payments */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card p-6 transition-all duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-success-100 dark:bg-success-800/30 p-3 rounded-full">
            <svg className="h-6 w-6 text-success-600 dark:text-success-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Successful Payments</p>
            <h3 className="mt-1 text-xl font-display font-semibold text-secondary-900 dark:text-white">
              {successfulPayments}
            </h3>
          </div>
        </div>
      </div>

      {/* Failed Payments */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card p-6 transition-all duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-danger-100 dark:bg-danger-800/30 p-3 rounded-full">
            <svg className="h-6 w-6 text-danger-600 dark:text-danger-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Failed Payments</p>
            <h3 className="mt-1 text-xl font-display font-semibold text-secondary-900 dark:text-white">
              {failedPayments}
            </h3>
          </div>
        </div>
      </div>

      {/* Total Refunds */}
      <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card p-6 transition-all duration-200">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-warning-100 dark:bg-warning-800/30 p-3 rounded-full">
            <svg className="h-6 w-6 text-warning-600 dark:text-warning-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
            </svg>
          </div>
          <div className="ml-5">
            <p className="text-sm font-medium text-secondary-500 dark:text-secondary-400">Total Refunds</p>
            <h3 className="mt-1 text-xl font-display font-semibold text-secondary-900 dark:text-white">
              {formatCurrency(totalRefunds)}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStats; 