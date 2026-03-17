import { motion } from 'framer-motion';
import Breadcrumb from '../Breadcrumb';

export default function GettingStarted() {
  return (
    <section id="getting-started" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Documentation', href: '/docs' },
          ]}
        />

        <h1 className="text-5xl font-black text-slate-900 mb-4">
          Documentation
        </h1>
        <p className="text-xl text-slate-600 mb-8">
          Make your codebase AI-ready with our suite of analysis tools
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            🚀 Quick Start
          </h2>
          <p className="text-slate-700 mb-4">
            Get started in seconds with zero configuration:
          </p>
          <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <div className="mb-2"># Run all tools at once</div>
            <div>npx @aiready/cli scan ./src</div>
          </div>
        </div>

        <div className="prose prose-slate max-w-none">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Installation
          </h3>
          <p className="text-slate-600 mb-4">
            You can use AIReady tools without installation via <code>npx</code>,
            or install globally for faster runs:
          </p>
          <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
            <div className="mb-2"># Unified CLI (recommended)</div>
            <div className="mb-4">npm install -g @aiready/cli</div>
            <div className="mb-2"># Or install individual tools</div>
            <div>npm install -g @aiready/pattern-detect</div>
            <div>npm install -g @aiready/context-analyzer</div>
            <div>npm install -g @aiready/consistency</div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            ⏩ Next Steps
          </h3>
          <p className="text-slate-600 mb-4">
            Once installed, initialize your project to save your settings:
          </p>
          <div className="bg-slate-900 text-blue-400 p-4 rounded-lg font-mono text-sm mb-4">
            <div className="mb-2">
              # Create aiready.json with smart defaults
            </div>
            <div>aiready init</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
