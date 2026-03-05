'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import ChartContainer from './ChartContainer';

const data = [
  { month: 'Jan', without: 100, with: 100 },
  { month: 'Feb', without: 105, with: 98 },
  { month: 'Mar', without: 112, with: 85 },
  { month: 'Apr', without: 125, with: 78 },
  { month: 'May', without: 140, with: 72 },
  { month: 'Jun', without: 158, with: 65 },
];

export default function ComparisonChart() {
  return (
    <ChartContainer
      title="Technical Debt Growth Over Time"
      description="AIReady helps you maintain code quality as your project scales"
      gradientFrom="orange-500/10"
      gradientTo="red-500/10"
      initialScale={0.9}
    >
      {typeof window !== 'undefined' && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
            <YAxis
              stroke="#64748b"
              tick={{ fontSize: 12 }}
              label={{
                value: 'Issues',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#64748b', fontSize: 12 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="without"
              stroke="#ef4444"
              strokeWidth={3}
              name="Without AIReady"
              dot={{ fill: '#ef4444', r: 5 }}
              animationDuration={2000}
            />
            <Line
              type="monotone"
              dataKey="with"
              stroke="#10b981"
              strokeWidth={3}
              name="With AIReady"
              dot={{ fill: '#10b981', r: 5 }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
}
