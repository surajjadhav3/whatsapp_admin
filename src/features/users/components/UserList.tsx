import React from "react";
import { User } from "../types";

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div key={user.id} className="card p-6 flex flex-col">
          <div className="flex items-start space-x-4 mb-4">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center text-white text-lg font-medium">
                {user.name.charAt(0)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-display font-semibold text-secondary-800 dark:text-white">{user.name}</h3>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">{user.email}</p>
              <div className="mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'active' 
                    ? 'bg-success-50 text-success-700 dark:bg-success-700/20 dark:text-success-500' 
                    : 'bg-secondary-100 text-secondary-800 dark:bg-secondary-700/50 dark:text-secondary-300'
                }`}>
                  {user.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600 dark:text-secondary-400">Phone</span>
              <span className="font-medium text-secondary-800 dark:text-secondary-200">{user.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600 dark:text-secondary-400">Plan</span>
              <span className="font-medium text-secondary-800 dark:text-secondary-200">{user.plan}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-secondary-600 dark:text-secondary-400">Joined</span>
              <span className="font-medium text-secondary-800 dark:text-secondary-200">{new Date(user.joinedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div className="mt-auto pt-4 border-t border-secondary-200 dark:border-secondary-700 flex justify-between">
            <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors">
              View Details
            </button>
            <button className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 text-sm font-medium transition-colors">
              Send Message
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList; 