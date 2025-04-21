import React, { ReactNode, useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme } from "../context/ThemeContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Apply dark class to html element to ensure all components receive the theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Header - fixed at the top with higher z-index */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header toggleSidebar={toggleSidebar} />
      </div>

      {/* Content area with padding for header */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar - z-index between header and backdrop */}
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* Main content - with improved scrolling */}
        <main className="flex-1 overflow-auto bg-secondary-50 dark:bg-secondary-900 transition-colors duration-200 w-full lg:w-auto">
          <div className="container mx-auto px-4 py-6 max-w-full lg:max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
