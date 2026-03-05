import { motion } from 'framer-motion';
import RequestForm from '../RequestForm';

export default function DocsUnifiedCli() {
  return (
    <>
      <section id="unified-cli" className="mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-6">Unified CLI</h2>
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-slate-500 font-mono text-sm ml-2">
              Terminal — aiready scan
            </span>
          </div>
          <div className="space-y-4 font-mono text-sm">
            <p className="text-blue-400">
              $ npx @aiready/cli scan ./src --score
            </p>
            <p className="text-slate-300">🔍 Scanning 47 files...</p>
            <p className="text-slate-300">🛡️ Pattern Detection: 85/100</p>
            <p className="text-slate-300">📈 Context Analysis: 72/100</p>
            <p className="text-slate-300">⚡ Consistency: 91/100</p>
            <div className="h-px bg-slate-800 my-4"></div>
            <p className="text-green-400 font-bold text-lg">
              ✨ AI Readiness Score: 82/100 (GOOD)
            </p>
          </div>
        </div>
      </section>

      <section id="consulting" className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4">
            Need an{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Expert Audit?
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            While our tools give you the data, our experts provide the strategy.
            Get a comprehensive AI Readiness Audit for your enterprise codebase.
          </p>
        </div>

        <RequestForm
          title="Professional AI Readiness Audit"
          description="Request a comprehensive strategy session and codebase audit for your team."
          showGlow={false}
        />

        <div className="mt-12 text-center">
          <p className="text-slate-500 mb-4">Prefer direct contact?</p>
          <a
            href="mailto:hello@getaiready.dev"
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-all"
          >
            Email us: hello@getaiready.dev
          </a>
        </div>
      </section>

      <section id="options" className="mb-16">
        <h2 className="text-4xl font-black text-slate-900 mb-8">CLI Options</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { opt: '--score', desc: 'Calculate AI Readiness Score' },
            { opt: '--json', desc: 'Output report in JSON format' },
            { opt: '--include', desc: 'Glob patterns to include' },
            { opt: '--exclude', desc: 'Glob patterns to exclude' },
            { opt: '--threshold', desc: 'Set similarity threshold (0-1)' },
            { opt: '--verbose', desc: 'Show detailed output' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 transition-all group"
            >
              <code className="text-blue-600 font-bold group-hover:text-blue-700">
                {item.opt}
              </code>
              <span className="text-slate-500 text-sm">{item.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
