import React from 'react';
import { cn } from '../../utils/cn';
import NodeItem from '../NodeItem';
import LinkItem from '../LinkItem';
import { PackageBoundaries } from '../PackageBoundaries';
import {
  DEFAULT_NODE_COLOR,
  DEFAULT_NODE_SIZE,
  DEFAULT_LINK_COLOR,
  DEFAULT_LINK_WIDTH,
} from '../constants';
import { GraphNode, GraphLink, ForceDirectedGraphProps } from './types';
import { unpinAllNodes } from './useGraphInteractions';

interface GraphCanvasProps extends Pick<
  ForceDirectedGraphProps,
  | 'width'
  | 'height'
  | 'className'
  | 'selectedNodeId'
  | 'hoveredNodeId'
  | 'defaultNodeColor'
  | 'defaultNodeSize'
  | 'defaultLinkColor'
  | 'defaultLinkWidth'
  | 'showNodeLabels'
  | 'showLinkLabels'
  | 'onNodeClick'
  | 'onNodeHover'
  | 'onLinkClick'
  | 'packageBounds'
> {
  svgRef: React.RefObject<SVGSVGElement | null>;
  gRef: React.RefObject<SVGGElement | null>;
  nodes: GraphNode[];
  links: GraphLink[];
  pinnedNodes: Set<string>;
  handleNodeDoubleClick: (e: React.MouseEvent, node: GraphNode) => void;
  handleDragStart: (e: React.MouseEvent, node: GraphNode) => void;
  restart: () => void;
  setPinnedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  svgRef,
  gRef,
  width,
  height,
  className,
  nodes,
  links,
  pinnedNodes,
  selectedNodeId,
  hoveredNodeId,
  defaultNodeColor = DEFAULT_NODE_COLOR,
  defaultNodeSize = DEFAULT_NODE_SIZE,
  defaultLinkColor = DEFAULT_LINK_COLOR,
  defaultLinkWidth = DEFAULT_LINK_WIDTH,
  showNodeLabels = true,
  showLinkLabels = false,
  onNodeClick,
  onNodeHover,
  onLinkClick,
  packageBounds,
  handleNodeDoubleClick,
  handleDragStart,
  restart,
  setPinnedNodes,
}) => {
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className={cn('bg-white dark:bg-gray-900', className)}
      onDoubleClick={() => {
        unpinAllNodes(nodes);
        setPinnedNodes(new Set());
        restart();
      }}
    >
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="20"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={defaultLinkColor} />
        </marker>
      </defs>

      <g ref={gRef}>
        {links.map((link, i) => (
          <LinkItem
            key={`link-${i}`}
            link={link as GraphLink}
            onClick={onLinkClick}
            defaultWidth={defaultLinkWidth}
            showLabel={showLinkLabels}
            nodes={nodes}
          />
        ))}

        {nodes.map((node) => (
          <NodeItem
            key={node.id}
            node={node}
            isSelected={selectedNodeId === node.id}
            isHovered={hoveredNodeId === node.id}
            pinned={pinnedNodes.has(node.id)}
            defaultNodeSize={defaultNodeSize}
            defaultNodeColor={defaultNodeColor}
            showLabel={showNodeLabels}
            onClick={onNodeClick}
            onDoubleClick={handleNodeDoubleClick}
            onMouseEnter={(n) => onNodeHover?.(n)}
            onMouseLeave={() => onNodeHover?.(null)}
            onMouseDown={handleDragStart}
          />
        ))}
        <PackageBoundaries packageBounds={packageBounds || {}} />
      </g>
    </svg>
  );
};
