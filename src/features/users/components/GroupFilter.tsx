import React, { useState, useRef, useEffect } from 'react';

interface GroupFilterProps {
  groups: string[];
  selectedGroup: string | null;
  onSelectGroup: (group: string | null) => void;
}

const GroupFilter: React.FC<GroupFilterProps> = ({ 
  groups, 
  selectedGroup, 
  onSelectGroup 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredGroups = groups.filter(group => 
    group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center">
        <label className="mr-2 text-sm font-medium text-secondary-700 dark:text-secondary-300">
          Filter by Group:
        </label>
        <button
          type="button"
          className="inline-flex justify-between items-center w-64 px-4 py-2 text-sm font-medium text-secondary-700 bg-white dark:bg-secondary-800 dark:text-secondary-200 border border-secondary-300 dark:border-secondary-600 rounded-md shadow-sm hover:bg-secondary-50 dark:hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="truncate">
            {selectedGroup || 'All Groups'}
          </span>
          <svg className="h-5 w-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {selectedGroup && (
          <button
            type="button"
            className="ml-2 text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
            onClick={() => onSelectGroup(null)}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-secondary-800 shadow-lg rounded-md border border-secondary-200 dark:border-secondary-700">
          <div className="p-2">
            <input
              type="text"
              className="w-full px-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-secondary-700 dark:text-white"
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <ul className="max-h-60 overflow-auto py-1">
            <li>
              <button
                className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary-100 dark:hover:bg-secondary-700 ${
                  selectedGroup === null ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-200'
                }`}
                onClick={() => {
                  onSelectGroup(null);
                  setIsOpen(false);
                }}
              >
                All Groups
              </button>
            </li>
            {filteredGroups.map((group) => (
              <li key={group}>
                <button
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-secondary-100 dark:hover:bg-secondary-700 ${
                    selectedGroup === group ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300' : 'text-secondary-700 dark:text-secondary-200'
                  }`}
                  onClick={() => {
                    onSelectGroup(group);
                    setIsOpen(false);
                  }}
                >
                  {group}
                </button>
              </li>
            ))}
            {filteredGroups.length === 0 && (
              <li className="px-4 py-2 text-sm text-secondary-500 dark:text-secondary-400">
                No groups found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupFilter; 