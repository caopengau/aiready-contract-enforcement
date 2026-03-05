'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { TrendingUp } from 'lucide-react';

interface ChartContainerProps {
  title: string;
  description: string;
  children: ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
  initialScale?: number;
}

export default function ChartContainer({
  title,
  description,
  children,
  gradientFrom = 'blue-500/10',
  gradientTo = 'purple-500/10',
  initialScale = 1,
}: ChartContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: initialScale }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative h-full"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-${gradientFrom} to-${gradientTo} blur-3xl`}
      />
      <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 shadow-2xl h-full flex flex-col">
        <div className="flex-grow">
          <h3 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            {title}
          </h3>
          <p className="text-slate-600 text-center mb-6">{description}</p>
          <div className="h-80">{children}</div>
        </div>
        <div className="mt-8 flex items-center justify-center gap-8 text-sm pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm" />
            <span className="text-slate-600 font-medium flex items-center gap-1">
              Before
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <span className="text-slate-900 font-bold flex items-center gap-1">
              After AIReady <TrendingUp className="w-3 h-3 text-green-500" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
