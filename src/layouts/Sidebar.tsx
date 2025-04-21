import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Plans", path: "/plans", icon: "📝" },
    { name: "Users", path: "/users", icon: "👥" },
    { name: "Groups", path: "/groups", icon: "👪" },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-primary-700 to-primary-800 dark:from-secondary-800 dark:to-secondary-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:h-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Close button - mobile only */}
      <div className="flex items-center justify-between p-4 lg:hidden">
        <div className="text-xl font-display font-bold text-white">Admin Dashboard</div>
        <button 
          onClick={closeSidebar}
          className="text-white focus:outline-none hover:text-secondary-200 transition-colors"
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Logo - desktop only */}
      <div className="hidden lg:flex items-center p-4">
        <span className="text-xl font-display font-bold text-white">Admin Dashboard</span>
      </div>
      
      {/* Navigation */}
      <nav className="mt-5 px-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-primary-600 dark:bg-primary-700 text-white shadow-md"
                : "text-white hover:bg-white/10 dark:hover:bg-secondary-700"
            }`}
            onClick={() => closeSidebar()}
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4">
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center text-sm text-white/70">
            <span>© 2023 Admin Dashboard</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar; 