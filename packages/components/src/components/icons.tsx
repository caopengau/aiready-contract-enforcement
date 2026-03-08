import React from 'react';

export function RocketIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2c1.5 0 3 1 3 1s1.2 1.8 1.2 4.2c0 2.4-1.2 5-3.6 7.4-2.4 2.4-5 3.6-7.4 3.6C3.8 18.2 2 17 2 17S3 15.5 3 14c0-2.1 1.5-3.6 1.5-3.6S7.5 9 9 9c2.4 0 3-7 3-7z"
        strokeWidth="0"
        fill="currentColor"
      />
      <path
        d="M14 10c.8.8 2 2 3 3"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChartIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.2" />
      <rect x="7" y="11" width="2" height="6" fill="currentColor" />
      <rect x="11" y="8" width="2" height="9" fill="currentColor" />
      <rect x="15" y="5" width="2" height="12" fill="currentColor" />
    </svg>
  );
}

export function TargetIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <path
        d="M22 12h-3M5 12H2M12 2v3M12 19v3"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RobotIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="7" width="18" height="11" rx="2" strokeWidth="1.2" />
      <rect x="7" y="10" width="2" height="2" fill="currentColor" />
      <rect x="15" y="10" width="2" height="2" fill="currentColor" />
      <path d="M9 3v2M15 3v2" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function FileIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function ShieldIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function TrendingUpIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

export function TrashIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function PlayIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export function UploadIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

export function AlertCircleIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function InfoIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function BrainIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.74-3.41A2.5 2.5 0 0 1 2 14c0-1.5 1-2 1-2s-1-.5-1-2a2.5 2.5 0 0 1 2.3-2.48A2.5 2.5 0 0 1 7 5.5a2.5 2.5 0 0 1 2.5-3.5z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.74-3.41A2.5 2.5 0 0 0 22 14c0-1.5-1-2-1-2s1-.5 1-2a2.5 2.5 0 0 0-2.3-2.48A2.5 2.5 0 0 0 17 5.5a2.5 2.5 0 0 0-2.5-3.5z" />
    </svg>
  );
}

export function TerminalIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export function CommandLineIcon(
  props: { className?: string } & React.SVGProps<SVGSVGElement>
) {
  return <TerminalIcon {...props} />;
}

export function SettingsIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function SaveIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

export function RefreshCwIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export function WalletIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
      <path d="M16 12h5" />
      <circle cx="16" cy="12" r="1" />
    </svg>
  );
}

export function ClockIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ZapIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function HammerIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18.42 13.59L7.46 2.63a1 1 0 0 0-1.42 0l-4.7 4.7a1 1 0 0 0 0 1.42L11 18.23l1.07-1.07-1.41-1.41 1.42-1.42 1.41 1.41 1.41-1.41-1.41-1.41 1.42-1.42 1.41 1.41 2-2z" />
      <path d="M13 18l6 6" />
    </svg>
  );
}

export function ArrowRightIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function ShieldCheckIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function AlertTriangleIcon({
  className = 'w-6 h-6',
  ...props
}: { className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default {
  RocketIcon,
  ChartIcon,
  TargetIcon,
  RobotIcon,
  FileIcon,
  ShieldIcon,
  TrendingUpIcon,
  TrashIcon,
  PlayIcon,
  UploadIcon,
  AlertCircleIcon,
  InfoIcon,
  BrainIcon,
  TerminalIcon,
  CommandLineIcon,
  WalletIcon,
  ClockIcon,
  ZapIcon,
  HammerIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
};
