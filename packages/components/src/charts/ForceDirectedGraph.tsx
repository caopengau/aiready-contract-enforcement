// Re-export from the new modular structure for backward compatibility
export {
  ForceDirectedGraph,
  type ForceDirectedGraphHandle,
  type ForceDirectedGraphProps,
  type GraphNode,
  type GraphLink,
  type LayoutType,
} from './force-directed';

// Default export for backward compatibility
export { ForceDirectedGraph as default } from './force-directed';
