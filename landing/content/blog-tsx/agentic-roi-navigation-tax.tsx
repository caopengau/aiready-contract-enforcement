import meta from './agentic-roi-navigation-tax.meta';
import React from 'react';

const Post = () => (
  <>
    <blockquote>
      Part 1 of our new series:{' '}
      <strong>
        &quot;The Agentic ROI: Quantifying the Business Impact of
        AI-Readiness.&quot;
      </strong>
    </blockquote>

    <div className="my-8 max-w-4xl mx-auto">
      <img
        src="/agentic-roi-1.png"
        alt="Agentic ROI - cover"
        className="w-full rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800"
      />
    </div>

    <p>
      For years, we&apos;ve treated technical debt as a &quot;developer
      preference.&quot; We refactor when we have time, or when the friction
      feels too high. But in the era of autonomous agents, technical debt has a
      <strong>literal price tag</strong>.
    </p>

    <p>
      Every time an agent like Claude Code or Cline interacts with your repo,
      you aren&apos;t just paying for the solution. You are paying for the
      <strong>Discovery</strong>.
    </p>

    <h2>What is Navigation Tax?</h2>

    <p>
      Navigation Tax is the percentage of your token budget spent on an agent
      &quot;finding its way&quot; through your folder structure, import chains,
      and non-semantic naming.
    </p>

    <p>
      In a well-architected repo, the tax is low: the agent finds the file,
      understands the context, and applies the fix. But in a
      <strong>Fragmented Repository</strong>, the agent might spend $4.95 in
      tokens just to find the right 50 lines of code to fix, only to pay $0.05
      for the actual change.
    </p>

    <h2>Quantifying the Loss</h2>

    <p>
      At <strong>AIReady</strong>, we&apos;ve benchmarked this across hundreds
      of repositories. The results are startling:
    </p>

    <ul className="list-disc pl-6 mb-8 space-y-3">
      <li>
        <strong>High-Readiness Repos (Score &gt; 80)</strong>: Navigation Tax is
        under 15%.
      </li>
      <li>
        <strong>Legacy Monoliths (Score &lt; 40)</strong>: Navigation Tax often
        exceeds 70%.
      </li>
    </ul>

    <p>
      If your team is using agents at scale, a 70% Navigation Tax isn&apos;t
      just a &quot;technical issue.&quot; It&apos;s a{' '}
      <strong>70% waste of your AI budget</strong>.
    </p>

    <h2>The Token Budget: A New Ledger</h2>

    <p>
      By using <code>aiready analyze --business</code>, you can now link your
      technical metrics to your financial ones. We provide a ledger that shows:
    </p>

    <div className="my-6 p-6 border border-slate-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-black shadow-sm">
      <div className="grid grid-cols-2 gap-4 font-mono text-sm">
        <div className="text-zinc-500 uppercase tracking-tighter text-[10px]">
          Metric
        </div>
        <div className="text-zinc-500 uppercase tracking-tighter text-[10px] text-right">
          Impact
        </div>
        <div className="border-t border-slate-100 dark:border-zinc-900 pt-2">
          Fragmentation Score
        </div>
        <div className="border-t border-slate-100 dark:border-zinc-900 pt-2 text-right text-red-400">
          +$2.15 / task
        </div>
        <div className="border-t border-slate-100 dark:border-zinc-900 pt-2">
          Semantic Duplication
        </div>
        <div className="border-t border-slate-100 dark:border-zinc-900 pt-2 text-right text-red-400">
          +12min review / PR
        </div>
        <div className="border-t border-slate-100 dark:border-zinc-900 pt-2 font-black text-indigo-400">
          AI-READINESS ROI
        </div>
        <div className="border-t border-slate-100 dark:border-zinc-900 pt-2 text-right font-black text-emerald-400">
          42% Cost Savings
        </div>
      </div>
    </div>

    <h2>Refactoring is Now an Investment</h2>

    <p>
      We need to stop seeing refactoring as a chore and start seeing it as
      <strong>Margin Expansion</strong>.
    </p>

    <p>
      Every time you flatten an import chain or improve naming consistency, you
      are lowering the recurring operational cost of your AI workforce. In an
      agentic-first company, the cleanest code isn&apos;t just the most
      readable—it&apos;s the most <strong>profitable</strong>.
    </p>

    <hr className="my-12 border-slate-200 dark:border-zinc-800" />

    <p>
      <em>
        In Part 2, we&apos;ll dive into <strong>Token ROI</strong>: Why
        modularization is your most effective cloud cost-optimization strategy
        for 2026.
      </em>
    </p>

    <p>
      <strong>Want to see the cost of your debt?</strong>
      <br />
      Run your first business audit: <code>npx @aiready/cli scan --score</code>
    </p>
  </>
);

export default Post;
