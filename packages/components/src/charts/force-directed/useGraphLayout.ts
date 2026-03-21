import { useCallback, useEffect, useMemo } from 'react';
import { GraphNode, LayoutType } from './types';
import {
  applyCircularLayout,
  applyHierarchicalLayout,
  applyInitialForceLayout,
} from '../layout-utils';

/**
 * Hook for managing graph layout algorithms.
 */
export function useGraphLayout(
  initialNodes: GraphNode[],
  width: number,
  height: number,
  layout: LayoutType,
  restart: () => void
) {
  // Initial positioning - delegate to layout utils
  const nodes = useMemo(() => {
    if (!initialNodes || !initialNodes.length) return initialNodes;
    const copy = initialNodes.map((n) => ({ ...n }));
    if (layout === 'circular') applyCircularLayout(copy, width, height);
    else if (layout === 'hierarchical')
      applyHierarchicalLayout(copy, width, height);
    else applyInitialForceLayout(copy, width, height);
    return copy;
  }, [initialNodes, width, height, layout]);

  // Apply layout-specific positioning when layout changes
  useEffect(() => {
    if (!nodes || nodes.length === 0) return;
    if (layout === 'circular') applyCircularLayout(nodes, width, height);
    else if (layout === 'hierarchical')
      applyHierarchicalLayout(nodes, width, height);

    restart();
  }, [layout, nodes, width, height, restart]);

  return { nodes };
}

/**
 * Hook for managing simulation controls (stubs for API compatibility).
 */
export function useSimulationControls() {
  const restart = useCallback(() => {}, []);
  const stop = useCallback(() => {}, []);
  const setForcesEnabled = useCallback((enabled?: boolean) => {
    void enabled;
  }, []);

  return { restart, stop, setForcesEnabled };
}
