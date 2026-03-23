'use client';

import { useState } from 'react';
import type { ClientProps as Props } from '@/lib/client-props';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUpIcon } from '@/components/Icons';
import PlatformShell from '@/components/PlatformShell';
import WaitingListModal from '@/components/WaitingListModal';
import { plans } from './constants';
import { PricingCard } from './components/PricingCard';

export default function PricingClient({
  user,
  teams = [],
  overallScore,
}: Props) {
  const [waitlistPlan, setWaitlistPlan] = useState<string | null>(null);

  return (
    <PlatformShell
      user={user ? (user as any) : null}
      teams={teams}
      overallScore={overallScore}
    >
      <div className="py-20 px-4">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-cyan-900/30 text-cyan-300 text-sm font-medium rounded-full border border-cyan-500/30"
            >
              <TrendingUpIcon className="w-4 h-4" />
              <span>Pricing Plans</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white mb-6"
            >
              Choose Your <span className="gradient-text-animated">Plan</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 max-w-2xl mx-auto"
            >
              Invest in your codebase's AI readiness. Start for free and scale
              as you grow.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                index={index}
                onJoinWaitlist={setWaitlistPlan}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 text-center"
          >
            <Link
              href="/dashboard"
              className="text-slate-500 hover:text-cyan-400 flex items-center justify-center gap-2 transition-colors"
            >
              <span>←</span> Back to Dashboard
            </Link>
          </motion.div>
        </div>
      </div>

      <WaitingListModal
        isOpen={!!waitlistPlan}
        onClose={() => setWaitlistPlan(null)}
        planName={waitlistPlan || ''}
      />
    </PlatformShell>
  );
}
