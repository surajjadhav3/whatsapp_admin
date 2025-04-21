import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-64 bg-white dark:bg-secondary-800 shadow-md transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-200 ease-in-out`}
    >
      <div className="h-full flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-secondary-200 dark:border-secondary-700">
          <span className="text-xl font-display font-semibold text-primary-700 dark:text-primary-300">
            Admin Dashboard
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                      : "text-secondary-600 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-700"
                  }`
                }
              >
                <svg
                  className="mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                      : "text-secondary-600 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-700"
                  }`
                }
              >
                <svg
                  className="mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/groups"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                      : "text-secondary-600 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-700"
                  }`
                }
              >
                <svg
                  className="mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Groups
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/plans"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                      : "text-secondary-600 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-700"
                  }`
                }
              >
                <svg
                  className="mr-3 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Plans
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar; 