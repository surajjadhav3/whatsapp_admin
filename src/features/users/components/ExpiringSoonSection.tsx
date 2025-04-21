import React from 'react';
import { User } from '../types/user';
import UserTable from './UserTable';
import SendReminderButton from './SendReminderButton';

interface ExpiringSoonSectionProps {
  users: User[];
  onSendReminder: (userId: string) => Promise<void>;
  onSendReminderToAll: () => Promise<void>;
}

const ExpiringSoonSection: React.FC<ExpiringSoonSectionProps> = ({ 
  users, 
  onSendReminder,
  onSendReminderToAll
}) => {
  if (users.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-semibold text-secondary-900 dark:text-white">
          Expiring Soon Users
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-warning-100 text-warning-800 dark:bg-warning-800 dark:text-warning-100">
            {users.length}
          </span>
        </h2>
        <SendReminderButton 
          isAll 
          onSend={onSendReminderToAll} 
        />
      </div>
      <UserTable 
        users={users} 
        onSendReminder={onSendReminder} 
        showGroupName={true}
      />
    </div>
  );
};

export default ExpiringSoonSection; 