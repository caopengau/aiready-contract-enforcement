import {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import * as d3 from 'd3';
import {
  GraphNode,
  LayoutType,
  ForceDirectedGraphHandle,
  ForceDirectedGraphProps,
} from './types';
import {
  useGraphZoom,
  useWindowDrag,
  useNodeInteractions,
} from './useGraphInteractions';
import { useGraphLayout, useSimulationControls } from './useGraphLayout';
import { useImperativeHandleMethods } from './useImperativeHandle';
import { GraphCanvas } from './GraphCanvas';

export const ForceDirectedGraph = forwardRef<
  ForceDirectedGraphHandle,
  ForceDirectedGraphProps
>(
  (
    {
      nodes: initialNodes,
      links: initialLinks,
      width,
      height,
      enableZoom = true,
      enableDrag = true,
      onNodeClick,
      onNodeHover,
      onLinkClick,
      selectedNodeId,
      hoveredNodeId,
      defaultNodeColor,
      defaultNodeSize,
      defaultLinkColor,
      defaultLinkWidth,
      showNodeLabels,
      showLinkLabels,
      className,
      manualLayout = false,
      onManualLayoutChange,
      packageBounds,
      layout: externalLayout,
      onLayoutChange,
    },
    ref
  ) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const gRef = useRef<SVGGElement>(null);
    const [transform, setTransform] = useState({ k: 1, x: 0, y: 0 });
    const transformRef = useRef(transform);
    const dragNodeRef = useRef<GraphNode | null>(null);
    const dragActiveRef = useRef(false);
    const [pinnedNodes, setPinnedNodes] = useState<Set<string>>(new Set());
    const internalDragEnabledRef = useRef(enableDrag);
    const [layout, setLayout] = useState<LayoutType>(externalLayout || 'force');

    useEffect(() => {
      if (externalLayout && externalLayout !== layout)
        setLayout(externalLayout);
    }, [externalLayout, layout]);

    const handleLayoutChange = useCallback(
      (newLayout: LayoutType) => {
        setLayout(newLayout);
        onLayoutChange?.(newLayout);
      },
      [onLayoutChange]
    );

    useEffect(() => {
      internalDragEnabledRef.current = enableDrag;
    }, [enableDrag]);

    const { restart, stop, setForcesEnabled } = useSimulationControls();
    const { nodes } = useGraphLayout(
      initialNodes,
      width,
      height,
      layout,
      restart
    );

    useEffect(() => {
      setForcesEnabled(!(manualLayout || pinnedNodes.size > 0));
    }, [manualLayout, pinnedNodes, setForcesEnabled]);

    useImperativeHandle(
      ref,
      () =>
        useImperativeHandleMethods({
          nodes,
          pinnedNodes,
          setPinnedNodes,
          restart,
          width,
          height,
          layout,
          handleLayoutChange,
          setForcesEnabled,
          svgRef,
          gRef,
          setTransform,
          internalDragEnabledRef,
        }),
      [
        nodes,
        pinnedNodes,
        restart,
        width,
        height,
        layout,
        handleLayoutChange,
        setForcesEnabled,
      ]
    );

    useEffect(() => {
      onManualLayoutChange?.(manualLayout);
    }, [manualLayout, onManualLayoutChange]);

    useGraphZoom(svgRef, gRef, enableZoom, setTransform, transformRef);
    useWindowDrag(
      enableDrag,
      svgRef,
      transformRef,
      dragActiveRef,
      dragNodeRef,
      () => {
        setForcesEnabled(true);
        restart();
      }
    );

    useEffect(() => {
      if (!gRef.current) return;
      const g = d3.select(gRef.current);
      g.selectAll('g.node').each(function (this: any) {
        const d = d3.select(this).datum() as any;
        if (d)
          d3.select(this).attr(
            'transform',
            `translate(${d.x || 0},${d.y || 0})`
          );
      });
      g.selectAll('line').each(function (this: any) {
        const l = d3.select(this).datum() as any;
        if (!l) return;
        const s =
          typeof l.source === 'object'
            ? l.source
            : nodes.find((n) => n.id === l.source);
        const t =
          typeof l.target === 'object'
            ? l.target
            : nodes.find((n) => n.id === l.target);
        if (s && t)
          d3.select(this)
            .attr('x1', s.x)
            .attr('y1', s.y)
            .attr('x2', t.x)
            .attr('y2', t.y);
      });
    }, [nodes, initialLinks]);

    const { handleDragStart, handleNodeDoubleClick } = useNodeInteractions(
      enableDrag,
      nodes,
      pinnedNodes,
      setPinnedNodes,
      restart,
      stop
    );

    useEffect(() => {
      if (!gRef.current || !enableDrag) return;
      const g = d3.select(gRef.current);
      const dragBehavior = (d3 as any)
        .drag()
        .on('start', (event: any) => {
          const target = (event.sourceEvent?.target || event.target) as Element;
          const id = target.closest?.('g.node')?.getAttribute('data-id');
          if (!id || !internalDragEnabledRef.current) return;
          const node = nodes.find((n) => n.id === id);
          if (!node) return;
          if (!event.active) restart();
          dragActiveRef.current = true;
          dragNodeRef.current = node;
        })
        .on('drag', (event: any) => {
          if (!dragActiveRef.current || !dragNodeRef.current || !svgRef.current)
            return;
          const rect = svgRef.current.getBoundingClientRect();
          dragNodeRef.current.fx =
            (event.sourceEvent.clientX - rect.left - transform.x) / transform.k;
          dragNodeRef.current.fy =
            (event.sourceEvent.clientY - rect.top - transform.y) / transform.k;
        })
        .on('end', () => {
          setForcesEnabled(true);
          restart();
        });

      g.selectAll('g.node').call(dragBehavior);
      return () => {
        g.selectAll('g.node').on('.drag', null);
      };
    }, [gRef, enableDrag, nodes, transform, restart, setForcesEnabled]);

    return (
      <GraphCanvas
        svgRef={svgRef}
        gRef={gRef}
        width={width}
        height={height}
        className={className}
        nodes={nodes}
        links={initialLinks}
        pinnedNodes={pinnedNodes}
        selectedNodeId={selectedNodeId}
        hoveredNodeId={hoveredNodeId}
        defaultNodeColor={defaultNodeColor}
        defaultNodeSize={defaultNodeSize}
        defaultLinkColor={defaultLinkColor}
        defaultLinkWidth={defaultLinkWidth}
        showNodeLabels={showNodeLabels}
        showLinkLabels={showLinkLabels}
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
        onLinkClick={onLinkClick}
        packageBounds={packageBounds}
        handleNodeDoubleClick={handleNodeDoubleClick}
        handleDragStart={handleDragStart}
        restart={restart}
        setPinnedNodes={setPinnedNodes}
      />
    );
  }
);

ForceDirectedGraph.displayName = 'ForceDirectedGraph';
