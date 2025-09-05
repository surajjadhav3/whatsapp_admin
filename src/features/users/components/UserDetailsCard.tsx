import React, { useState } from "react";
import { User } from "../types/user";
import SendReminderButton from "./SendReminderButton";

interface UserDetailsCardProps {
  user: User;
  onSendReminder: () => Promise<void>;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({ user, onSendReminder }) => {
  const [isReminderSending, setIsReminderSending] = useState(false);

  const handleSendReminder = async () => {
    setIsReminderSending(true);
    try {
      await onSendReminder();
      // You could show a success toast here
    } catch (error) {
      console.error("Error sending reminder:", error);
      // You could show an error toast here
    } finally {
      setIsReminderSending(false);
    }
  };

  const getStatusBadgeClass = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-success-100 text-success-800 dark:bg-success-700/20 dark:text-success-500";
      case "expired":
        return "bg-danger-100 text-danger-800 dark:bg-danger-700/20 dark:text-danger-500";
      case "expiring_soon":
        return "bg-warning-100 text-warning-800 dark:bg-warning-700/20 dark:text-warning-500";
      default:
        return "bg-secondary-100 text-secondary-800 dark:bg-secondary-700/50 dark:text-secondary-300";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card overflow-hidden transition-all duration-200">
      {/* User Header with Avatar */}
      <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center mb-4">
            <span className="text-primary-700 dark:text-primary-300 font-bold text-3xl">
              {user.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <h2 className="text-xl font-display font-semibold text-secondary-900 dark:text-white text-center">
            {user.name}
          </h2>
          <div className="mt-1 flex items-center justify-center">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                user.status
              )}`}
            >
              {user.status === "active"
                ? "Active"
                : user.status === "expired"
                ? "Expired"
                : "Expiring Soon"}
            </span>
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400 mb-1">
            Contact Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                Email
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                {user.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                Phone
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                {user.whatsapp}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <h3 className="text-sm font-medium text-secondary-500 dark:text-secondary-400 mb-1">
            Plan Information
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                Plan
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                {user.plan.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                Start Date
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                {formatDate(user.plan.startDate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                Expiry Date
              </span>
              <span className="text-sm font-medium text-secondary-900 dark:text-white">
                {formatDate(user.plan.endDate)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-secondary-200 dark:border-secondary-700">
          <div className="flex flex-col space-y-3">
            {(user.status === "expiring_soon" || user.status === "expired") && (
              <SendReminderButton
                userId={user.id}
                onSend={handleSendReminder}
                className="w-full"
              />
            )}
            <button className="inline-flex justify-center items-center px-4 py-2 border border-secondary-300 dark:border-secondary-600 shadow-sm text-sm font-medium rounded-md text-secondary-700 dark:text-secondary-200 bg-white dark:bg-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
              <svg
                className="-ml-0.5 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard; 