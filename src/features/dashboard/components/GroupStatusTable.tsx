import React from "react";
import { Group } from "../mockDashboardData";

interface GroupStatusTableProps {
  groups: Group[];
}

const GroupStatusTable: React.FC<GroupStatusTableProps> = ({ groups }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
        <thead className="bg-secondary-50 dark:bg-secondary-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
              Group Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
              Members
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
              Capacity
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-300 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-secondary-800 divide-y divide-secondary-200 dark:divide-secondary-700">
          {groups.map((group) => {
            const percentFilled = (group.userCount / group.capacity) * 100;
            let statusColor = "bg-success-50 text-success-700 dark:bg-success-700/20 dark:text-success-500";
            
            if (percentFilled >= 90) {
              statusColor = "bg-danger-50 text-danger-700 dark:bg-danger-700/20 dark:text-danger-500";
            } else if (percentFilled >= 70) {
              statusColor = "bg-warning-50 text-warning-700 dark:bg-warning-700/20 dark:text-warning-500";
            }
            
            return (
              <tr key={group.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50 transition-colors duration-150">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-secondary-900 dark:text-white">{group.name}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-secondary-500 dark:text-secondary-400">{group.userCount}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-secondary-500 dark:text-secondary-400">{group.capacity}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                    {percentFilled >= 90 ? "Almost Full" : 
                     percentFilled >= 70 ? "Filling Up" : "Available"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GroupStatusTable; 