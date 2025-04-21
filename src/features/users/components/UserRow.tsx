import React from 'react';
import { User } from '../types/user';
import SendReminderButton from './SendReminderButton';

interface UserRowProps {
  user: User;
  onSendReminder: (userId: string) => Promise<void>;
  showGroupName?: boolean;
}

const UserRow: React.FC<UserRowProps> = ({ user, onSendReminder, showGroupName = false }) => {
  const getStatusBadgeClass = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800 dark:bg-success-800 dark:text-success-100';
      case 'expired':
        return 'bg-danger-100 text-danger-800 dark:bg-danger-800 dark:text-danger-100';
      case 'expiring_soon':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-800 dark:text-warning-100';
      default:
        return 'bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusText = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'expired':
        return 'Expired';
      case 'expiring_soon':
        return 'Expiring Soon';
      default:
        return status;
    }
  };

  return (
    <tr className="hover:bg-secondary-50 dark:hover:bg-secondary-700/30 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
            <span className="text-primary-700 dark:text-primary-300 font-medium text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-secondary-900 dark:text-white">
              {user.name}
            </div>
            <div className="text-sm text-secondary-500 dark:text-secondary-400">
              {user.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-secondary-900 dark:text-white">{user.phone}</div>
      </td>
      {showGroupName && (
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-secondary-900 dark:text-white">{user.groupName || '-'}</div>
        </td>
      )}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-secondary-900 dark:text-white">{user.plan.title}</div>
        <div className="text-xs text-secondary-500 dark:text-secondary-400">
          {formatDate(user.plan.startDate)} - {formatDate(user.plan.endDate)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
          {getStatusText(user.status)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {(user.status === 'expiring_soon' || user.status === 'expired') && (
          <SendReminderButton 
            userId={user.id} 
            onSend={() => onSendReminder(user.id)} 
          />
        )}
      </td>
    </tr>
  );
};

export default UserRow; 