'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Sparkles, Rocket, ArrowLeft, Loader2 } from 'lucide-react';
import { CONTENT_TYPE_JSON } from '@/lib/constants';

interface RequestFormProps {
  title?: string;
  description?: string;
  showGlow?: boolean;
  isModal?: boolean;
}

export default function RequestForm({
  title = 'Get Your Free Codebase Audit',
  description = 'Receive a detailed PDF report with actionable insights to make your code AI-ready.',
  showGlow = true,
  isModal = false,
}: RequestFormProps) {
  const [email, setEmail] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const endpoint = process.env.NEXT_PUBLIC_REQUEST_URL;
      if (!endpoint) {
        throw new Error('Submission endpoint not configured');
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': CONTENT_TYPE_JSON },
        body: JSON.stringify({ email, repoUrl, notes }),
      });

      if (!res.ok) {
        let errorMessage = 'Failed to submit request';
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          const txt = await res.text();
          errorMessage = txt || errorMessage;
        }
        throw new Error(errorMessage);
      }

      setStatus('success');
      setMessage(
        "Thanks! Your audit request has been received. We'll analyze your codebase and email the detailed report within 24-48 hours. Expect to hear from us soon!"
      );
      // We don't clear inputs here anymore because we'll hide the form
    } catch (err: any) {
      setStatus('error');
      setMessage(err?.message || 'Something went wrong. Please try again.');
    }
  };

  const containerClasses = isModal
    ? 'relative p-6 md:p-8'
    : 'relative bg-white/80 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 md:p-10 shadow-2xl';

  return (
    <motion.div
      initial={{ opacity: 0, y: isModal ? 0 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`${isModal ? 'w-full' : 'max-w-3xl mx-auto'} relative`}
    >
      {/* Animated background glow */}
      {showGlow && !isModal && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
      )}

      <div className={containerClasses}>
        <div className={`text-center ${isModal ? 'mb-4' : 'mb-8'}`}>
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            viewport={{ once: true }}
            className="inline-block mb-2"
          >
            <BarChart3
              className={`${isModal ? 'w-8 h-8' : 'w-12 h-12'} text-blue-600`}
            />
          </motion.div>
          <h3
            className={`${isModal ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 mb-2`}
          >
            {title.includes('Audit') ? (
              <>
                {title.replace('Audit', '')}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Audit
                </span>
              </>
            ) : (
              title
            )}
          </h3>
          <p className={`${isModal ? 'text-sm' : 'text-lg'} text-slate-600`}>
            {description}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl ${isModal ? 'p-4 mb-6' : 'p-6 mb-8'}`}
        >
          <div className="flex items-start gap-3">
            <Sparkles
              className={`${isModal ? 'w-4 h-4' : 'w-6 h-6'} text-blue-600 shrink-0 mt-1`}
            />
            <div className="w-full">
              <h4
                className={`${isModal ? 'text-xs mb-2' : 'text-sm mb-2'} font-bold text-blue-900`}
              >
                What you'll get:
              </h4>
              <ul
                className={`${isModal ? 'text-[11px] grid grid-cols-2 gap-x-4 gap-y-1' : 'text-sm space-y-2'} text-blue-800`}
              >
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  ✓ Semantic duplicate report
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  ✓ Context window optimization
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  ✓ Naming consistency analysis
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  ✓ Actionable AI adoption roadmap
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-center mb-6"
            >
              <Rocket className="w-16 h-16 text-blue-600 mx-auto" />
            </motion.div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">
              Request Received!
            </h3>
            <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-6 text-green-800 mb-8 max-w-md mx-auto">
              <p className="text-lg font-medium leading-relaxed">{message}</p>
            </div>
            <motion.button
              onClick={() => {
                setStatus('idle');
                setMessage('');
                setEmail('');
                setRepoUrl('');
                setNotes('');
              }}
              className="text-blue-600 font-bold hover:text-blue-800 transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Submit another request
            </motion.button>
          </motion.div>
        ) : (
          <form
            onSubmit={onSubmit}
            className={isModal ? 'space-y-4' : 'space-y-6'}
          >
            <div
              className={isModal ? 'grid md:grid-cols-2 gap-4' : 'space-y-6'}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  GitHub Repo URL
                </label>
                <input
                  type="url"
                  required
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/owner/repo"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <label className="block text-sm font-bold text-slate-700 mb-1.5">
                Notes (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything specific you'd like us to focus on"
                className={`w-full rounded-xl border-2 border-slate-200 px-4 py-2.5 ${isModal ? 'h-20' : 'h-32'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                className={`flex-1 ${isModal ? 'py-3' : 'py-4'} bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  'Request Free Audit'
                )}
              </motion.button>
            </motion.div>

            {message && status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border-2 bg-red-50 border-red-500 text-red-800"
              >
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}
          </form>
        )}
        <p className="text-[10px] text-slate-500 text-center mt-4">
          We'll never share your data. We'll email from the address on the site
          footer.
        </p>
      </div>
    </motion.div>
  );
}
