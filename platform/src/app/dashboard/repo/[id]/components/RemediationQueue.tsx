'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import * as Icons from '@/components/Icons';

// Fail-safe icon helper
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const SvgIcon = (Icons as any)[name];
  if (!SvgIcon) {
    return <div className={className + ' bg-slate-800 rounded-sm'} />;
  }
  return <SvgIcon className={className} />;
};

interface RemediationQueueProps {
  repoId: string;
  hasIssues: boolean;
}

export function RemediationQueue({ repoId, hasIssues }: RemediationQueueProps) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/50">
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/20">
            <Icon name="HammerIcon" className="w-5 h-5 text-amber-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Remediation Queue</h3>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest bg-slate-800 px-3 py-1 rounded-full border border-slate-700 text-slate-400">
          Alpha • Agentic
        </span>
      </div>

      <div className="p-8 text-center space-y-6">
        {!hasIssues ? (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
              <Icon name="ShieldCheckIcon" className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-lg font-bold">Queue is Empty</h4>
            <p className="text-slate-400 max-w-sm mx-auto text-sm">
              Great job! Your repository meets all the AI-readiness standards.
              No pending remediations detected.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-left flex items-start gap-4">
                <div className="p-2 bg-red-500/10 rounded-lg shrink-0">
                  <Icon
                    name="AlertTriangleIcon"
                    className="w-5 h-5 text-red-500"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">
                    Consolidate Duplicate Patterns
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    Multiple similar patterns detected in Auth and User modules.
                    Potential for 80% context saving.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase p-1 rounded bg-red-500/10 text-red-500 border border-red-500/20">
                      High ROI
                    </span>
                    <span className="text-[9px] font-black uppercase p-1 rounded bg-slate-700 text-slate-300">
                      Agent Proposed
                    </span>
                  </div>
                </div>
                <button
                  disabled
                  className="ml-auto p-2 bg-cyan-500/10 text-cyan-500 rounded-lg hover:bg-cyan-500/20 transition-colors opacity-50 cursor-not-allowed"
                >
                  <Icon name="ArrowRightIcon" className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-left flex items-start gap-4 opacity-75">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                  <Icon name="InfoIcon" className="w-5 h-5 text-blue-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-white">
                    Standardize Naming Conventions
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    Fix terminology drift in API layer to improve zero-shot
                    agent grounding.
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase p-1 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      Quality
                    </span>
                  </div>
                </div>
                <button
                  disabled
                  className="ml-auto p-2 bg-cyan-500/10 text-cyan-500 rounded-lg hover:bg-cyan-500/20 transition-colors opacity-50 cursor-not-allowed"
                >
                  <Icon name="ArrowRightIcon" className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="pt-4 p-6 rounded-2xl bg-cyan-500/5 border border-dashed border-cyan-500/30">
              <p className="text-xs text-cyan-400 font-bold mb-3 uppercase tracking-widest">
                Upgrade to AIReady Pro
              </p>
              <h5 className="text-sm font-bold mb-2 text-white">
                Automate your remediation agent
              </h5>
              <p className="text-xs text-slate-400 mb-4">
                Pro accounts get one-click "Apply Fix" via GitHub Actions and
                human-in-the-loop validation.
              </p>
              <Link
                href="/dashboard/billing"
                className="inline-flex items-center gap-2 px-6 py-2 bg-cyan-500 text-slate-950 rounded-xl font-black text-[11px] hover:bg-cyan-400 transition-colors"
              >
                Learn More
                <Icon name="ArrowRightIcon" className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
