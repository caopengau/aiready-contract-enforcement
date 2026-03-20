import meta from './mcp-superpowers-context-aware.meta';
import React from 'react';

const Post = () => (
  <>
    <blockquote>
      Part 1 of our new series:{' '}
      <strong>
        &quot;MCP Superpowers: Leveraging the Model Context Protocol for Agentic
        Excellence.&quot;
      </strong>
    </blockquote>

    <div className="my-8 max-w-4xl mx-auto">
      <img
        src="/mcp-superpowers-1.png"
        alt="MCP Superpowers - cover"
        className="w-full rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800"
      />
    </div>

    <p>
      The era of the &quot;blind prompt&quot; is ending. If you&apos;ve used
      agents like Claude Code or Cline, you know the frustration: you give a
      command, and the agent spends 3 minutes just <em>finding</em> where the
      code lives.
    </p>

    <p>
      We call this the <strong>Context Gap</strong>. Humans have intuition;
      agents have crawlers. But what if the agent didn&apos;t have to crawl?
      What if the repository itself <em>spoke</em> to the agent?
    </p>

    <h2>Enter the Model Context Protocol (MCP)</h2>

    <p>
      MCP is the new universal standard for connecting AI models to data
      sources. Instead of writing custom integrations for every tool, MCP
      provides a common language for agents to request tools, resources, and
      context.
    </p>

    <p>
      At <strong>AIReady</strong>, we believe MCP is the &quot;Neural
      Spine&quot; of the agentic future. That&apos;s why we&apos;ve turned our
      core analysis tools into MCP servers.
    </p>

    <h2>The Self-Aware Codebase</h2>

    <p>
      Imagine an agent that knows it shouldn&apos;t touch a specific module
      because it&apos;s high-risk or has deep import chains—<em>before</em> it
      even starts writing code.
    </p>

    <p>
      By using the <code>@aiready/context-analyzer</code> as an MCP server, your
      agent gains <strong>Project Self-Awareness</strong>. It can query the
      repository for:
    </p>

    <ul className="list-disc pl-6 mb-4 space-y-2">
      <li>
        <strong>Fragmentation Scores</strong>: &quot;How messy is this folder
        I&apos;m about to edit?&quot;
      </li>
      <li>
        <strong>Navigation Tax</strong>: &quot;Which files must I read to
        understand this change?&quot;
      </li>
      <li>
        <strong>Semantic Clusters</strong>: &quot;Where else in the repo is this
        logic duplicated?&quot;
      </li>
    </ul>

    <h2>How to Give Your Agent Superpowers</h2>

    <p>
      Enabling this today is simple. If you&apos;re using a tool like Claude
      Desktop or Cline, you can add the AIReady MCP server to your
      configuration:
    </p>

    <div className="my-6 p-4 bg-slate-100 dark:bg-zinc-900 rounded-xl font-mono text-sm overflow-x-auto">
      <pre>
        {`{
  "mcpServers": {
    "aiready": {
      "command": "npx",
      "args": ["-y", "@aiready/cli", "mcp"]
    }
  }
}`}
      </pre>
    </div>

    <p>
      Once connected, the agent no longer asks &quot;Where is the payment
      logic?&quot; Instead, it asks the AIReady MCP tool:{' '}
      <em>
        &quot;Analyze the context for payment-processing and give me the top 5
        related files.&quot;
      </em>
    </p>

    <h2>The Result: 10x Velocity, 1/10th the Cost</h2>

    <p>
      When an agent is context-aware, it doesn&apos;t waste tokens on unrelated
      files. It doesn&apos;t hallucinate dependencies that don&apos;t exist. It
      behaves less like a fast-typing intern and more like a senior architect
      who has lived in the codebase for years.
    </p>

    <p>
      <strong>
        The future of software engineering isn&apos;t just better AI; it&apos;s
        better context.
      </strong>
    </p>

    <hr className="my-12 border-slate-200 dark:border-zinc-800" />

    <p>
      <em>
        In Part 2, we&apos;ll explore <strong>Domain-Specific Tools</strong>:
        How to build your own MCP servers to give agents access to your internal
        APIs and documentation.
      </em>
    </p>

    <p>
      <strong>Ready to make your agent self-aware?</strong>
      <br />
      Download the latest CLI: <code>npm install -g @aiready/cli</code>
    </p>
  </>
);

export default Post;
