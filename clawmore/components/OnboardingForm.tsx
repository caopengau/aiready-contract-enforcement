'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Zap,
  RefreshCcw,
  Loader2,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

interface OnboardingFormProps {
  userEmail: string;
}

export default function OnboardingForm({ userEmail }: OnboardingFormProps) {
  const [coEvolution, setCoEvolution] = useState(true);
  const [agreedToAutoRecharge, setAgreedToAutoRecharge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!agreedToAutoRecharge) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/billing/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userEmail,
          coEvolutionOptIn: coEvolution,
        }),
      });

      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black italic tracking-tighter mb-2">
          Activate Your <span className="text-cyber-blue">Managed Node</span>
        </h2>
        <p className="text-zinc-500 text-sm">
          Set up your autonomous infrastructure engine.
        </p>
      </div>

      <div className="space-y-6">
        {/* Subscription Detail */}
        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
              Monthly Subscription
            </p>
            <h3 className="text-xl font-bold">Managed Platform Fee</h3>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-white">$29.00</span>
            <span className="text-xs text-zinc-600 ml-1">/mo</span>
          </div>
        </div>

        {/* Co-evolution Choice */}
        <div className="space-y-3">
          <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">
            Evolution Strategy
          </label>
          <div
            onClick={() => setCoEvolution(true)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 ${coEvolution ? 'border-cyber-blue bg-cyber-blue/5' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}`}
          >
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${coEvolution ? 'border-cyber-blue bg-cyber-blue text-black' : 'border-zinc-700'}`}
            >
              {coEvolution && <CheckCircle className="w-4 h-4" />}
            </div>
            <div>
              <p className="font-bold text-sm flex items-center gap-2">
                Co-evolution Protocol
                <span className="text-[9px] bg-cyber-green/20 text-cyber-green px-2 py-0.5 rounded-full uppercase">
                  Free Mutations
                </span>
              </p>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Allow the Harvester to extract anonymous design improvements.
                Mutation taxes are permanently waived.
              </p>
            </div>
          </div>

          <div
            onClick={() => setCoEvolution(false)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 ${!coEvolution ? 'border-amber-500 bg-amber-500/5' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}`}
          >
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${!coEvolution ? 'border-amber-500 bg-amber-500 text-black' : 'border-zinc-700'}`}
            >
              {!coEvolution && <CheckCircle className="w-4 h-4" />}
            </div>
            <div>
              <p className="font-bold text-sm flex items-center gap-2">
                Private Evolution
                <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full uppercase">
                  $1.00 / mutation
                </span>
              </p>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Keep all optimizations private. Mutation taxes are deducted from
                your pre-paid AI token balance.
              </p>
            </div>
          </div>
        </div>

        {/* Legal Consent */}
        <div className="p-6 rounded-2xl bg-zinc-800/30 border border-zinc-700 space-y-4">
          <div
            className="flex gap-4 cursor-pointer"
            onClick={() => setAgreedToAutoRecharge(!agreedToAutoRecharge)}
          >
            <div
              className={`w-6 h-6 rounded border shrink-0 transition-all flex items-center justify-center ${agreedToAutoRecharge ? 'border-cyber-blue bg-cyber-blue text-black' : 'border-zinc-600 bg-zinc-900'}`}
            >
              {agreedToAutoRecharge && <CheckCircle className="w-4 h-4" />}
            </div>
            <p className="text-[11px] text-zinc-400 leading-normal">
              I authorize ClawMore to automatically charge my payment method{' '}
              <strong>$10.00</strong> for AI token refills whenever my balance
              drops below <strong>$5.00</strong> to ensure uninterrupted
              infrastructure evolution.
            </p>
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={!agreedToAutoRecharge || isLoading}
          className="w-full py-5 rounded-2xl bg-white text-black hover:bg-cyber-blue transition-all font-black uppercase tracking-widest flex items-center justify-center gap-3 disabled:opacity-20 disabled:grayscale group"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Confirm & Continue to Payment
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center text-[10px] text-zinc-600 font-mono uppercase tracking-tighter">
          Powered by Stripe • Cancel Anytime • Encrypted Governance
        </p>
      </div>
    </div>
  );
}
