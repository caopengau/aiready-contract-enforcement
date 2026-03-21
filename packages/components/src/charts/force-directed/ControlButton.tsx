import React from 'react';
import { cn } from '../../utils/cn';

export interface ControlButtonProps {
  onClick: () => void;
  active?: boolean;
  icon: string;
  label: string;
  disabled?: boolean;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  onClick,
  active = false,
  icon,
  label,
  disabled = false,
}) => (
  <div className="relative group">
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-2 rounded-lg transition-all duration-200',
        active
          ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-gray-100',
        'dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:active:bg-blue-600'
      )}
      title={label}
    >
      <span className="text-lg">{icon}</span>
    </button>
    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
      {label}
    </div>
  </div>
);
