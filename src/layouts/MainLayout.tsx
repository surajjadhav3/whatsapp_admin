import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from "../context/ThemeContext";

const MainLayout: React.FC = () => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  // Apply dark class to html element to ensure all components receive the theme
  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Track window resize for responsive adjustments
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine content width based on screen size
  const getContentMaxWidth = () => {
    if (windowWidth >= 1920) return 'max-w-screen-2xl'; // Ultra wide screens
    if (windowWidth >= 1536) return 'max-w-screen-xl';  // Wide screens
    if (windowWidth >= 1280) return 'max-w-screen-lg';  // Large screens
    return 'max-w-full';                                // Default for smaller screens
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-secondary-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-30 w-full">
        <Header openSidebar={() => setSidebarOpen(true)} />
      </div>

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 pt-6 lg:ml-64">
          <div className={`mx-auto px-4 ${getContentMaxWidth()}`}>
            <div className="bg-white dark:bg-secondary-800 shadow-sm rounded-lg p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
