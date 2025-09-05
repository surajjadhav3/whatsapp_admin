import React, { useEffect, useState } from "react";
import { User, UserFilter } from "./types/user";
import { userService } from "./services/userService";
import UserFilterTabs from "./components/UserFilterTabs";
import UserTable from "./components/UserTable";
import SendReminderButton from "./components/SendReminderButton";
import GroupFilter from "./components/GroupFilter";
import { useUsers } from './hooks/useUsers';

const UserDashboard: React.FC = () => {
  const { users, loading, error } = useUsers();
  const [activeFilter, setActiveFilter] = useState<UserFilter>("all");
  const [activeTab, setActiveTab] = useState<"all" | "expiring">("all");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const expiringSoonUsers = users.filter((user) => {
    const statusMatch = user.status === "expiring_soon";
    return statusMatch;
  });

  const counts = {
    all: users.length,
    active: users.filter((user) => user.status === "active").length,
    expired: users.filter((user) => user.status === "expired").length,
    expiring_soon: users.filter((user) => user.status === "expiring_soon")
      .length,
  };

  const handleSendReminder = async (userId: string) => {
    try {
      await userService.sendReminder(userId);
      // You could show a success toast here
    } catch (error) {
      console.error("Error sending reminder:", error);
      // You could show an error toast here
    }
  };

  const handleSendReminderToAll = async () => {
    try {
      // If a group is selected, only send reminders to that group
      if (selectedGroup) {
        const userIds = expiringSoonUsers.map((user) => user.id);
        for (const userId of userIds) {
          await userService.sendReminder(userId);
        }
        console.log(`Reminders sent to all users in group: ${selectedGroup}`);
      } else {
        await userService.sendReminderToAll();
      }
      // You could show a success toast here
    } catch (error) {
      console.error("Error sending reminders:", error);
      // You could show an error toast here
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-secondary-900 dark:text-white">
          User Management
        </h1>
        <p className="mt-1 text-sm text-secondary-500 dark:text-secondary-400">
          Manage your users and their subscription plans
        </p>
      </div>

      {/* Main tabs for switching between All Users and Expiring Soon */}
      <div className="flex border-b border-secondary-200 dark:border-secondary-700 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`py-3 px-6 font-medium text-sm focus:outline-none ${
            activeTab === "all"
              ? "border-b-2 border-primary-500 text-primary-600 dark:text-primary-400"
              : "text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300"
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => setActiveTab("expiring")}
          className={`py-3 px-6 font-medium text-sm focus:outline-none ${
            activeTab === "expiring"
              ? "border-b-2 border-primary-500 text-primary-600 dark:text-primary-400"
              : "text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-300"
          }`}
        >
          Expiring Soon
          {counts.expiring_soon > 0 && (
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-warning-100 text-warning-800 dark:bg-warning-800 dark:text-warning-100">
              {counts.expiring_soon}
            </span>
          )}
        </button>
      </div>

      {activeTab === "all" ? (
        <>
          <UserFilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />

          {users.length > 0 ? (
            <UserTable
              users={users}
              onSendReminder={handleSendReminder}
            />
          ) : (
            <div className="bg-white dark:bg-secondary-800 shadow rounded-lg p-6 text-center">
              <p className="text-secondary-500 dark:text-secondary-400">
                No users found with the selected filter.
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <h2 className="text-xl font-display font-semibold text-secondary-900 dark:text-white mr-6">
                Expiring Soon Users
              </h2>
              {expiringSoonUsers.length > 0 && (
                <SendReminderButton
                  isAll
                  onSend={handleSendReminderToAll}
                  className="ml-4"
                />
              )}
            </div>
          </div>

          {expiringSoonUsers.length > 0 ? (
            <UserTable
              users={expiringSoonUsers}
              onSendReminder={handleSendReminder}
            />
          ) : (
            <div className="bg-white dark:bg-secondary-800 shadow rounded-lg p-6 text-center">
              <p className="text-secondary-500 dark:text-secondary-400">
                No users with expiring plans found.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboard;
