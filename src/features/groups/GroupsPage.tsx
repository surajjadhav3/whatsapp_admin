import React, { useState } from "react";
import GroupList from "./components/GroupList";
import { useGroups } from "./hooks/useGroups";
import { Group } from "./types";

const GroupsPage: React.FC = () => {
  const { groups, loading, error } = useGroups();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCapacity, setFilterCapacity] = useState<string | null>(null);

  if (loading)
    return <div className="flex justify-center p-8">Loading groups...</div>;
  if (error)
    return (
      <div className="text-red-500 p-8">Error loading groups: {error}</div>
    );

  // Filter groups based on search term and capacity filter
  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.admin?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    let matchesFilter = true;
    if (filterCapacity === "full") {
      const userCount = group.userCount || 0;
      const capacity = group.capacity || 1;
      matchesFilter = userCount / capacity >= 0.9;
    } else if (filterCapacity === "filling") {
      const userCount = group.userCount || 0;
      const capacity = group.capacity || 1;
      const percentFilled = userCount / capacity;
      matchesFilter = percentFilled >= 0.7 && percentFilled < 0.9;
    } else if (filterCapacity === "available") {
      const userCount = group.userCount || 0;
      const capacity = group.capacity || 1;
      matchesFilter = userCount / capacity < 0.7;
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-secondary-800 dark:text-white">
          Groups
        </h1>
        <p className="text-secondary-600 dark:text-secondary-400 mt-1">
          Manage your groups
        </p>
      </div>

      <div className="bg-white dark:bg-secondary-800 shadow-card rounded-lg overflow-hidden transition-colors duration-200 mb-8">
        <div className="p-6 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-secondary-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-500 dark:placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFilterCapacity(null)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  filterCapacity === null
                    ? "bg-primary-100 dark:bg-primary-700/30 text-primary-800 dark:text-primary-300"
                    : "bg-white dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-600"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterCapacity("available")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  filterCapacity === "available"
                    ? "bg-success-50 dark:bg-success-700/20 text-success-700 dark:text-success-500"
                    : "bg-white dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-600"
                }`}
              >
                Available
              </button>
              <button
                onClick={() => setFilterCapacity("filling")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  filterCapacity === "filling"
                    ? "bg-warning-50 dark:bg-warning-700/20 text-warning-700 dark:text-warning-500"
                    : "bg-white dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-600"
                }`}
              >
                Filling Up
              </button>
              <button
                onClick={() => setFilterCapacity("full")}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  filterCapacity === "full"
                    ? "bg-danger-50 dark:bg-danger-700/20 text-danger-700 dark:text-danger-500"
                    : "bg-white dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-600"
                }`}
              >
                Almost Full
              </button>
            </div>

            <button className="btn-primary flex items-center">
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Group
            </button>
          </div>
        </div>

        <div className="p-6">
          {filteredGroups.length > 0 ? (
            <GroupList groups={filteredGroups} />
          ) : (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-secondary-400"
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
              <h3 className="mt-2 text-lg font-medium text-secondary-900 dark:text-secondary-200">
                No groups found
              </h3>
              <p className="mt-1 text-secondary-500 dark:text-secondary-400">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
