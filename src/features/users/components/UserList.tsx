import React, { useState } from "react";
import { User } from "../types/user";
import { useNavigate } from "react-router-dom";

interface UserListProps {
  users: User[];
  onSendReminder: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onSendReminder }) => {
  const navigate = useNavigate();

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  // Helper function to get status color classes
  const getStatusClasses = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-700/20 dark:text-green-400";
      case "expiring_soon":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700/20 dark:text-yellow-400";
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-700/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-400";
    }
  };

  // Helper function to get payment status color classes
  const getPaymentStatusClasses = (status?: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-700/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-700/20 dark:text-yellow-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-700/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/20 dark:text-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm border border-secondary-200 dark:border-secondary-700 overflow-hidden transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]"
        >
          <div className="p-5">
            <div className="flex items-start space-x-4 mb-4">
              <div className="flex-shrink-0">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-lg font-medium ${
                    user.gender === "female"
                      ? "bg-primary-600"
                      : "bg-secondary-600"
                  }`}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-display font-semibold text-secondary-800 dark:text-white truncate">
                  {user.name}
                </h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400 truncate">
                  {user.email}
                </p>
                <div className="mt-1 flex flex-wrap gap-1">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                  {user.paymentStatus && (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusClasses(
                        user.paymentStatus
                      )}`}
                    >
                      {user.paymentStatus}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4 mb-4">
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    WhatsApp:
                  </span>
                  <span className="font-medium text-secondary-800 dark:text-secondary-200">
                    {user.whatsapp}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    Gender:
                  </span>
                  <span className="font-medium text-secondary-800 dark:text-secondary-200">
                    {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    Plan:
                  </span>
                  <span className="font-medium text-secondary-800 dark:text-secondary-200">
                    {user.plan.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600 dark:text-secondary-400">
                    Expiry:
                  </span>
                  <span className="font-medium text-secondary-800 dark:text-secondary-200">
                    {new Date(user.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {user.tags && user.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {user.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-secondary-200 dark:border-secondary-700 pt-4 flex justify-between">
              <button
                onClick={() => handleViewDetails(user.id)}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View Details
              </button>
              <button
                onClick={() => onSendReminder(user.id)}
                className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 text-sm font-medium transition-colors flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      ))}

      {users.length === 0 && (
        <div className="col-span-full text-center py-8">
          <div className="mx-auto h-12 w-12 text-secondary-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-secondary-900 dark:text-secondary-200">
            No users found
          </h3>
          <p className="mt-1 text-secondary-500 dark:text-secondary-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default UserList;
