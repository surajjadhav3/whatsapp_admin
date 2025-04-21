import React from "react";
import { Group } from "../types";

interface GroupListProps {
  groups: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.map((group) => {
        const userCount = group.userCount || 0;
        const capacity = group.capacity || 1;
        const percentFilled = (userCount / capacity) * 100;

        let statusColor =
          "bg-success-50 text-success-700 dark:bg-success-700/20 dark:text-success-500";
        let statusText = "Available";

        if (percentFilled >= 90) {
          statusColor =
            "bg-danger-50 text-danger-700 dark:bg-danger-700/20 dark:text-danger-500";
          statusText = "Almost Full";
        } else if (percentFilled >= 70) {
          statusColor =
            "bg-warning-50 text-warning-700 dark:bg-warning-700/20 dark:text-warning-500";
          statusText = "Filling Up";
        }

        return (
          <div key={group.id} className="card p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-display font-semibold text-secondary-800 dark:text-white">
                  {group.name}
                </h3>
                <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
                  Created {new Date(group.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
              >
                {statusText}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary-600 dark:text-secondary-400">
                  Capacity
                </span>
                <span className="font-medium text-secondary-800 dark:text-secondary-200">
                  {userCount} / {capacity}
                </span>
              </div>
              <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    percentFilled >= 90
                      ? "bg-danger-500"
                      : percentFilled >= 70
                      ? "bg-warning-500"
                      : "bg-success-500"
                  }`}
                  style={{ width: `${percentFilled}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600 dark:text-secondary-400">
                  Link
                </span>
                {group.link ? (
                  <a
                    href={group.link}
                    className="font-medium text-primary-600 dark:text-primary-400 hover:underline truncate max-w-[180px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {group.link.substring(0, 25)}...
                  </a>
                ) : (
                  <span className="text-secondary-500 dark:text-secondary-400">
                    No link available
                  </span>
                )}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600 dark:text-secondary-400">
                  Admin
                </span>
                <span className="font-medium text-secondary-800 dark:text-secondary-200">
                  {group.admin || "No admin assigned"}
                </span>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-secondary-200 dark:border-secondary-700 flex justify-between">
              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors">
                Manage
              </button>
              <button className="text-danger-600 dark:text-danger-400 hover:text-danger-700 dark:hover:text-danger-300 text-sm font-medium transition-colors">
                Archive
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupList;
