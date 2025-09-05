import React from "react";
import ThemeToggle from "../components/ThemeToggle";

interface HeaderProps {
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  return (
    <header className="bg-white dark:bg-secondary-800 shadow-sm h-16 flex items-center px-4">
      <button
        onClick={openSidebar}
        className="lg:hidden text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <div className="ml-4 lg:ml-0 flex-1">
        <h1 className="text-lg font-medium text-secondary-900 dark:text-white">WhatsApp Admin</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <div className="relative">
          <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200">
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              A
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 