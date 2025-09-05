import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Payment, PaymentStatus } from '../types/payment';

interface TransactionTableProps {
  payments: Payment[];
  onRefund: (paymentId: string) => Promise<void>;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ payments, onRefund }) => {
  const [processingRefund, setProcessingRefund] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  const getStatusBadgeClass = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return 'bg-success-100 text-success-800 dark:bg-success-800/20 dark:text-success-400';
      case 'failed':
        return 'bg-danger-100 text-danger-800 dark:bg-danger-800/20 dark:text-danger-400';
      case 'refunded':
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800/20 dark:text-secondary-400';
      case 'partially_refunded':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-800/20 dark:text-warning-400';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800/20 dark:text-secondary-400';
    }
  };

  const getStatusText = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'failed':
        return 'Failed';
      case 'refunded':
        return 'Refunded';
      case 'partially_refunded':
        return 'Partially Refunded';
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'credit_card':
        return 'Credit Card';
      case 'debit_card':
        return 'Debit Card';
      case 'upi':
        return 'UPI';
      case 'net_banking':
        return 'Net Banking';
      case 'wallet':
        return 'Wallet';
      default:
        return method;
    }
  };

  const handleRefund = async (paymentId: string) => {
    setProcessingRefund(paymentId);
    try {
      await onRefund(paymentId);
    } finally {
      setProcessingRefund(null);
    }
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
          <thead className="bg-secondary-50 dark:bg-secondary-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Payment ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Plan
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Refund
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900 dark:text-white">
                  <div className="group relative">
                    <span className="cursor-help border-b border-dotted border-secondary-500 dark:border-secondary-400">
                      {payment.id}
                    </span>
                    <div className="hidden group-hover:block absolute z-10 w-64 p-2 mt-2 text-xs bg-secondary-900 dark:bg-secondary-700 text-white rounded-md shadow-lg">
                      <p className="font-semibold mb-1">Transaction Details:</p>
                      <p>ID: {payment.id}</p>
                      <p>Date: {formatDate(payment.transactionDate)}</p>
                      <p>Method: {getPaymentMethodText(payment.paymentMethod)}</p>
                      {payment.notes && <p className="mt-1 pt-1 border-t border-secondary-700 dark:border-secondary-600">Note: {payment.notes}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                  <Link to={`/users/${payment.userId}`} className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors">
                    {payment.userName}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                  {payment.planName}
                  {payment.groupName && (
                    <span className="block text-xs text-secondary-500 dark:text-secondary-400">
                      {payment.groupName}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                  {formatCurrency(payment.amount)}
                  {payment.refundAmount && (
                    <span className="block text-xs text-danger-600 dark:text-danger-400">
                      Refunded: {formatCurrency(payment.refundAmount)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(payment.status)}`}>
                    {getStatusText(payment.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                  {getPaymentMethodText(payment.paymentMethod)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500 dark:text-secondary-400">
                  {formatDate(payment.transactionDate)}
                  {payment.refundDate && (
                    <span className="block text-xs">
                      Refunded: {formatDate(payment.refundDate)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900 dark:text-white">
                  {payment.status === 'refunded' ? (
                    <span className="text-secondary-500 dark:text-secondary-400">Full Refund</span>
                  ) : payment.status === 'partially_refunded' ? (
                    <span className="text-warning-600 dark:text-warning-400">Partial Refund</span>
                  ) : payment.status === 'paid' ? (
                    <button
                      onClick={() => handleRefund(payment.id)}
                      disabled={processingRefund === payment.id}
                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-danger-700 bg-danger-100 hover:bg-danger-200 dark:text-danger-200 dark:bg-danger-800/30 dark:hover:bg-danger-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {processingRefund === payment.id ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-danger-700 dark:text-danger-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                          </svg>
                          Refund
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-danger-600 dark:text-danger-400">Not Applicable</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable; 