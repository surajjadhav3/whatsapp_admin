import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  
  CreditCardIcon,
  CalendarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const navItems = [
    { name: "Dashboard", path: "/", icon: HomeIcon },
    { name: "Users", path: "/users", icon: UsersIcon },
    { name: "Payments", path: "/payments", icon: CreditCardIcon },
    { name: "Plans", path: "/plans", icon: CreditCardIcon },
    { name: "Batches", path: "/batches", icon: CalendarIcon },
    { name: "Settings", path: "/settings", icon: CogIcon },
  ];

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
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                        : "text-secondary-600 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:bg-secondary-700"
                    }`
                  }
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      closeSidebar();
                    }
                  }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
