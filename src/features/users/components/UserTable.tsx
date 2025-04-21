import React from 'react';
import { User } from '../types/user';
import UserRow from './UserRow';

interface UserTableProps {
  users: User[];
  onSendReminder: (userId: string) => Promise<void>;
  showGroupName?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, onSendReminder, showGroupName = false }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
        <thead className="bg-secondary-50 dark:bg-secondary-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
              User
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
              Phone
            </th>
            {showGroupName && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                Group
              </th>
            )}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
              Plan
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-secondary-900 divide-y divide-secondary-200 dark:divide-secondary-800">
          {users.map((user) => (
            <UserRow 
              key={user.id} 
              user={user} 
              onSendReminder={onSendReminder}
              showGroupName={showGroupName}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable; 