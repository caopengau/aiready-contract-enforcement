// Components
export { Button, buttonVariants, type ButtonProps } from './components/button';
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  GlassCard,
  GlassCardHeader,
  GlassCardContent,
} from './components/card';
export { Input, type InputProps } from './components/input';
export { Label, type LabelProps } from './components/label';
export { Badge, badgeVariants, type BadgeProps } from './components/badge';
export { Modal, type ModalProps } from './components/modal';
export * from './components/icons';

// Layout Components
export { Container, type ContainerProps } from './components/container';
export { Grid, type GridProps } from './components/grid';
export { Stack, type StackProps } from './components/stack';
export { Separator, type SeparatorProps } from './components/separator';

// Form Components
export { Checkbox, type CheckboxProps } from './components/checkbox';
export {
  RadioGroup,
  type RadioGroupProps,
  type RadioOption,
} from './components/radio-group';
export { Switch, type SwitchProps } from './components/switch';
export { Textarea, type TextareaProps } from './components/textarea';
export {
  Select,
  type SelectProps,
  type SelectOption,
} from './components/select';

// Code Block
export { CodeBlock, InlineCode, type CodeBlockProps } from './code-block';

// Navigation
export {
  Breadcrumb,
  PlatformShell,
  type BreadcrumbProps,
  type BreadcrumbItem,
  type PlatformShellProps,
  type NavItem,
  type User,
  type Team,
  type TeamMember,
} from './navigation';

// Data Display
export {
  ScoreBar,
  ScoreCard,
  ScoreCircle,
  type ScoreBarProps,
  type ScoreCardProps,
  type ScoreCircleProps,
  type ScoreRating,
} from './data-display';

// Feedback
export {
  LoadingSpinner,
  LoadingOverlay,
  ErrorDisplay,
  FeedbackWidget,
  EmptyState,
  type LoadingSpinnerProps,
  type LoadingOverlayProps,
  type ErrorDisplayProps,
  type FeedbackWidgetProps,
  type EmptyStateProps,
} from './feedback';

// Theme
export {
  ThemeProvider,
  useTheme,
  type Theme,
  type EffectiveTheme,
} from './theme';

// Utils
export { cn } from './utils/cn';
export * from './utils/colors';
export * from './utils/formatters';
export * from './utils/score';

// Hooks
export { useDebounce } from './hooks/useDebounce';
export { useD3, useD3WithResize } from './hooks/useD3';
export {
  useForceSimulation,
  useDrag,
  type SimulationNode,
  type SimulationLink,
  type ForceSimulationOptions,
  type UseForceSimulationReturn,
} from './hooks/useForceSimulation';

// Charts
export {
  ForceDirectedGraph,
  type GraphNode,
  type GraphLink,
  type ForceDirectedGraphProps,
  type ForceDirectedGraphHandle,
  type LayoutType,
} from './charts/ForceDirectedGraph';
export { GraphControls, type GraphControlsProps } from './charts/GraphControls';
