'use client';

import { motion } from 'framer-motion';

interface ScanStatusProps {
  isScanning: boolean;
  isInView: boolean;
}

export default function ScanStatus({ isScanning, isInView }: ScanStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700"
    >
      {isScanning ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
          />
          <span className="text-sm font-bold text-cyan-400 uppercase tracking-wide">
            Scanning in progress
          </span>
        </>
      ) : (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-4 h-4 bg-green-500 rounded-full"
            style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
          />
          <span className="text-sm font-bold text-green-400 uppercase tracking-wide">
            Scan complete
          </span>
        </>
      )}
    </motion.div>
  );
}
