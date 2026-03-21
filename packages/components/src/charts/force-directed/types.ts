export interface GraphNode {
  id: string;
  label?: string;
  color?: string;
  size?: number;
  group?: string;
  kind?: 'file' | 'package';
  packageGroup?: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  color?: string;
  width?: number;
  label?: string;
  type?: string;
}

export type LayoutType = 'force' | 'hierarchical' | 'circular';

/**
 * Handle for imperative actions on the ForceDirectedGraph.
 */
export interface ForceDirectedGraphHandle {
  /** Pins all nodes to their current positions. */
  pinAll: () => void;
  /** Unpins all nodes, allowing them to move freely in the simulation. */
  unpinAll: () => void;
  /** Resets the layout by unpinning all nodes and restarting the simulation. */
  resetLayout: () => void;
  /** Rescales and re-centers the view to fit all nodes. */
  fitView: () => void;
  /** Returns the IDs of all currently pinned nodes. */
  getPinnedNodes: () => string[];
  /**
   * Enable or disable drag mode for nodes.
   * @param enabled - When true, nodes can be dragged; when false, dragging is disabled
   */
  setDragMode: (enabled: boolean) => void;
  /** Sets the current layout type. */
  setLayout: (layout: LayoutType) => void;
  /** Gets the current layout type. */
  getLayout: () => LayoutType;
}

/**
 * Props for the ForceDirectedGraph component.
 */
export interface ForceDirectedGraphProps {
  /** Array of node objects to render. */
  nodes: GraphNode[];
  /** Array of link objects to render. */
  links: GraphLink[];
  /** Width of the SVG canvas. */
  width: number;
  /** Height of the SVG canvas. */
  height: number;
  /** Whether to enable zoom and pan interactions. */
  enableZoom?: boolean;
  /** Whether to enable node dragging. */
  enableDrag?: boolean;
  /** Callback fired when a node is clicked. */
  onNodeClick?: (node: GraphNode) => void;
  /** Callback fired when a node is hovered. */
  onNodeHover?: (node: GraphNode | null) => void;
  /** Callback fired when a link is clicked. */
  onLinkClick?: (link: GraphLink) => void;
  /** ID of the currently selected node. */
  selectedNodeId?: string;
  /** ID of the currently hovered node. */
  hoveredNodeId?: string;
  /** Default fallback color for nodes. */
  defaultNodeColor?: string;
  /** Default fallback size for nodes. */
  defaultNodeSize?: number;
  /** Default fallback color for links. */
  defaultLinkColor?: string;
  /** Default fallback width for links. */
  defaultLinkWidth?: number;
  /** Whether to show labels on nodes. */
  showNodeLabels?: boolean;
  /** Whether to show labels on links. */
  showLinkLabels?: boolean;
  /** Additional CSS classes for the SVG element. */
  className?: string;
  /** Whether manual layout mode is active. */
  manualLayout?: boolean;
  /** Callback fired when manual layout mode changes. */
  onManualLayoutChange?: (enabled: boolean) => void;
  /** Optional bounds for package groups. */
  packageBounds?: Record<string, { x: number; y: number; r: number }>;
  /** Current layout algorithm. */
  layout?: LayoutType;
  /** Callback fired when layout changes. */
  onLayoutChange?: (layout: LayoutType) => void;
}
