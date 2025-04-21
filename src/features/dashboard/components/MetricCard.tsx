import React, { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  subtitle: string;
  value: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  subtitle,
  value,
  icon,
  className = "",
}) => {
  return (
    <div className={`bg-white dark:bg-secondary-800 rounded-lg shadow-card hover:shadow-card-hover p-6 transition-all duration-200 ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-display font-semibold text-secondary-800 dark:text-white">{title}</h3>
          <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">{subtitle}</p>
        </div>
        {icon && <div className="text-primary-600 dark:text-primary-400 text-2xl">{icon}</div>}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-display font-bold text-secondary-900 dark:text-white">{value}</div>
      </div>
    </div>
  );
};

export default MetricCard; 