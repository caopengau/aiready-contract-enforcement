import React from 'react';
import { cn } from '../../utils/cn';
import { ControlButton } from './ControlButton';

export interface GraphControlsProps {
  dragEnabled?: boolean;
  onDragToggle?: (enabled: boolean) => void;
  manualLayout?: boolean;
  onManualLayoutToggle?: (enabled: boolean) => void;
  onPinAll?: () => void;
  onUnpinAll?: () => void;
  onReset?: () => void;
  onFitView?: () => void;
  pinnedCount?: number;
  totalNodes?: number;
  visible?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  dragEnabled = true,
  onDragToggle,
  manualLayout = false,
  onManualLayoutToggle,
  onPinAll,
  onUnpinAll,
  onReset,
  onFitView,
  pinnedCount = 0,
  totalNodes = 0,
  visible = true,
  position = 'top-left',
  className,
}) => {
  if (!visible) return null;

  const positionClasses: Record<string, string> = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div
      className={cn(
        'fixed z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 border border-gray-200 dark:border-gray-700',
        positionClasses[position],
        className
      )}
    >
      <div className="flex flex-col gap-2">
        <ControlButton
          onClick={() => onDragToggle?.(!dragEnabled)}
          active={dragEnabled}
          icon="✋"
          label={dragEnabled ? 'Drag enabled' : 'Drag disabled'}
        />

        <ControlButton
          onClick={() => onManualLayoutToggle?.(!manualLayout)}
          active={manualLayout}
          icon="🔧"
          label={manualLayout ? 'Manual layout: ON' : 'Manual layout: OFF'}
        />

        <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 mx-auto my-1" />

        <div className="flex gap-1">
          <ControlButton
            onClick={() => onPinAll?.()}
            disabled={totalNodes === 0}
            icon="📌"
            label={`Pin all nodes (${totalNodes})`}
          />
          <ControlButton
            onClick={() => onUnpinAll?.()}
            disabled={pinnedCount === 0}
            icon="📍"
            label={`Unpin all (${pinnedCount} pinned)`}
          />
        </div>

        <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 mx-auto my-1" />

        <ControlButton
          onClick={() => onFitView?.()}
          disabled={totalNodes === 0}
          icon="🎯"
          label="Fit all nodes in view"
        />

        <ControlButton
          onClick={() => onReset?.()}
          disabled={totalNodes === 0}
          icon="↺"
          label="Reset to auto-layout"
        />
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
        <div className="whitespace-nowrap">
          <strong>Nodes:</strong> {totalNodes}
        </div>
        {pinnedCount > 0 && (
          <div className="whitespace-nowrap">
            <strong>Pinned:</strong> {pinnedCount}
          </div>
        )}
      </div>
    </div>
  );
};

GraphControls.displayName = 'GraphControls';
