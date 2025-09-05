import React from "react";
import { TimelineEvent, TimelineEventType } from "../types/timeline";

interface UserTimelineProps {
  events: TimelineEvent[];
}

const UserTimeline: React.FC<UserTimelineProps> = ({ events }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEventIcon = (type: TimelineEventType) => {
    switch (type) {
      case "joined_plan":
        return (
          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-primary-600 dark:text-primary-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "payment_completed":
        return (
          <div className="h-8 w-8 rounded-full bg-success-100 dark:bg-success-800 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-success-600 dark:text-success-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "group_joined":
        return (
          <div className="h-8 w-8 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-secondary-600 dark:text-secondary-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </div>
        );
      case "reminder_sent":
        return (
          <div className="h-8 w-8 rounded-full bg-warning-100 dark:bg-warning-800 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-warning-600 dark:text-warning-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "plan_renewed":
        return (
          <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-primary-600 dark:text-primary-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      case "plan_expired":
        return (
          <div className="h-8 w-8 rounded-full bg-danger-100 dark:bg-danger-800 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-danger-600 dark:text-danger-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center">
            <svg
              className="h-5 w-5 text-secondary-600 dark:text-secondary-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        );
    }
  };

  const getEventTagClass = (type: TimelineEventType) => {
    switch (type) {
      case "joined_plan":
        return "bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100";
      case "payment_completed":
        return "bg-success-100 text-success-800 dark:bg-success-800 dark:text-success-100";
      case "group_joined":
        return "bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100";
      case "reminder_sent":
        return "bg-warning-100 text-warning-800 dark:bg-warning-800 dark:text-warning-100";
      case "plan_renewed":
        return "bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100";
      case "plan_expired":
        return "bg-danger-100 text-danger-800 dark:bg-danger-800 dark:text-danger-100";
      default:
        return "bg-secondary-100 text-secondary-800 dark:bg-secondary-800 dark:text-secondary-100";
    }
  };

  // Sort events by timestamp (newest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-card overflow-hidden transition-all duration-200">
      <div className="p-6 border-b border-secondary-200 dark:border-secondary-700 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-display font-semibold text-secondary-900 dark:text-white">
            Activity Timeline
          </h2>
          <p className="text-sm text-secondary-500 dark:text-secondary-400">
            User activity and events history
          </p>
        </div>
        <div className="flex space-x-2">
          <button className="inline-flex items-center px-3 py-1.5 border border-secondary-300 dark:border-secondary-600 shadow-sm text-sm font-medium rounded-md text-secondary-700 dark:text-secondary-200 bg-white dark:bg-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <svg
              className="-ml-0.5 mr-1 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Export
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-secondary-300 dark:border-secondary-600 shadow-sm text-sm font-medium rounded-md text-secondary-700 dark:text-secondary-200 bg-white dark:bg-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
            <svg
              className="-ml-0.5 mr-1 h-4 w-4"
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
            Add Event
          </button>
        </div>
      </div>

      <div className="p-6 max-h-[600px] overflow-y-auto">
        {sortedEvents.length > 0 ? (
          <div className="flow-root">
            <ul className="-mb-8">
              {sortedEvents.map((event, eventIdx) => (
                <li key={event.id}>
                  <div className="relative pb-8">
                    {eventIdx !== sortedEvents.length - 1 ? (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-secondary-200 dark:bg-secondary-700"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>{getEventIcon(event.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-secondary-900 dark:text-white">
                            {event.title}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEventTagClass(
                              event.type
                            )}`}
                          >
                            {event.type
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
                            {event.description}
                          </p>
                        )}
                        <div className="mt-1 flex items-center text-xs text-secondary-500 dark:text-secondary-400">
                          <span>{formatDate(event.timestamp)}</span>
                          <span className="mx-1">•</span>
                          <span>{formatTime(event.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-secondary-900 dark:text-secondary-200">
              No activity yet
            </h3>
            <p className="mt-1 text-secondary-500 dark:text-secondary-400">
              This user doesn't have any recorded activity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTimeline; 