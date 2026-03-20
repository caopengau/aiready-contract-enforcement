import meta from './10-minute-ai-audit.meta';
import React from 'react';

const Post = () => (
  <>
    <div className="my-8 max-w-4xl mx-auto">
      <img
        src="/10-minute-audit.png"
        alt="10-Minute AI Audit - cover"
        className="w-full rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800"
      />
    </div>

    <p className="text-xl font-medium text-indigo-400">
      The hype is real. Claude Code and Cline are changing the way we build. But
      if you&apos;ve noticed your agent sometimes getting stuck in infinite
      loops or generating hallucinated fixes, the problem likely isn&apos;t the
      model—it&apos;s your repo.
    </p>

    <p>
      AI agents are high-speed crawlers. If your codebase is a maze of deep
      import chains and inconsistent naming, you are charging your agent a
      <strong>Navigation Tax</strong> that slows it down and drains your token
      budget.
    </p>

    <p>
      Here is how to perform a forensic audit of your repository&apos;s
      &quot;Agentic Readiness&quot; in under 10 minutes.
    </p>

    <h2 className="text-2xl font-black mt-12 mb-6">
      Step 1: Install the AIReady CLI
    </h2>
    <p>
      We built the <code>@aiready/cli</code> to be the standard tool for
      measuring signal clarity. Start by installing it globally:
    </p>
    <div className="my-6 p-4 bg-slate-100 dark:bg-zinc-900 rounded-xl font-mono text-sm">
      <code>npm install -g @aiready/cli</code>
    </div>

    <h2 className="text-2xl font-black mt-12 mb-6">
      Step 2: Run the Score Scan
    </h2>
    <p>
      This command performs a multi-dimensional analysis of your repo, looking
      at naming consistency, context fragmentation, and semantic duplication.
    </p>
    <div className="my-6 p-4 bg-slate-100 dark:bg-zinc-900 rounded-xl font-mono text-sm">
      <code>aiready scan --score</code>
    </div>
    <p className="mt-4 text-sm text-zinc-500">
      <em>
        Tip: Look for a score above 80. If you are under 60, your agents are
        operating with a &quot;blindfold&quot; on.
      </em>
    </p>

    <h2 className="text-2xl font-black mt-12 mb-6">
      Step 3: Analyze the Context Jumps
    </h2>
    <p>
      One of the biggest reasons agents fail is **Context Fragmentation**. This
      command identifies &quot;God Files&quot; and deep import chains that force
      the agent to read dozens of unnecessary files.
    </p>
    <div className="my-6 p-4 bg-slate-100 dark:bg-zinc-900 rounded-xl font-mono text-sm">
      <code>aiready scan --context</code>
    </div>

    <h2 className="text-2xl font-black mt-12 mb-6">
      The Result: A Roadmap to 10x Velocity
    </h2>
    <p>
      Once you have your report, don&apos;t just ignore it. Follow our
      <strong>Decoupling Guide</strong> to flatten your hierarchy and improve
      signal clarity.
    </p>

    <p>
      A repo that is &quot;Agentic Ready&quot; doesn&apos;t just make your AI
      faster—it makes your human developers faster, too.
    </p>

    <hr className="my-12 border-slate-200 dark:border-zinc-800" />

    <p>
      <strong>Want to dive deeper?</strong>
      <br />
      Read our series on <a href="/blog/the-agentic-wall">
        The Agentic Wall
      </a>{' '}
      or learn about the{' '}
      <a href="/blog/agentic-roi-navigation-tax">Economics of AI-Readiness</a>.
    </p>
  </>
);

export default Post;
