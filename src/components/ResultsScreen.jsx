import React from 'react';
import { useSocket } from '../context/SocketContext';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, CheckCircle, RefreshCcw } from 'lucide-react';

export const ResultsScreen = () => {
  const { scoreData, clinicalCase, leaveRoom } = useSocket();

  if (!scoreData) return null;

  const isCriticalError = scoreData.score === 0;
  const isPerfect = scoreData.score === 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cybermed-dark text-white p-6 relative">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-cybermed-slate/40 border border-cybermed-teal/50 rounded-2xl p-8 backdrop-blur-md shadow-[0_0_40px_-5px_rgba(13,148,136,0.3)] text-center relative overflow-hidden"
      >
        {isCriticalError && (
          <div className="absolute top-0 left-0 w-full h-1 bg-red-500 shadow-[0_0_20px_#ef4444]" />
        )}
        {isPerfect && (
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_#22c55e]" />
        )}

        <div className="mb-6">
          <h2 className="text-xs tracking-widest text-cybermed-teal uppercase mb-2">Final Resonance Assessment</h2>
          <h1 className="text-4xl font-black mb-2">
            {isCriticalError ? (
              <span className="text-red-500 flex items-center justify-center gap-3">
                <ShieldAlert className="w-10 h-10" /> CRITICAL FAILURE
              </span>
            ) : isPerfect ? (
              <span className="text-green-400 flex items-center justify-center gap-3">
                <CheckCircle className="w-10 h-10" /> PERFECT RESONANCE
              </span>
            ) : (
              <span className="text-cybermed-cyan flex items-center justify-center gap-3">
                <Activity className="w-10 h-10" /> PARTIAL SUCCESS
              </span>
            )}
          </h1>
          <div className="text-6xl font-black mt-6 mb-2 tracking-tighter">
            {scoreData.score}<span className="text-cybermed-teal text-3xl">%</span>
          </div>
          <p className="text-sm text-cybermed-teal">Diagnostic Accuracy Score</p>
        </div>

        <div className="bg-black/50 rounded-xl p-6 text-left border border-cybermed-slate mb-8 space-y-4">
          <h3 className="text-sm uppercase tracking-widest text-cybermed-cyan mb-2 border-b border-cybermed-slate pb-2">Medical Board Feedback</h3>
          <p className="text-xs text-cybermed-teal/70 italic mb-4">Case: {clinicalCase?.title}</p>
          
          <ul className="space-y-3">
            {scoreData.feedback.map((f, idx) => {
              const isError = f.includes('INCORRECT') || f.includes('FAILED') || f.includes('CRITICAL');
              return (
                <li key={idx} className={`text-sm p-3 rounded-lg border ${isError ? 'bg-red-900/20 border-red-500/30 text-red-300' : 'bg-green-900/20 border-green-500/30 text-green-300'}`}>
                   {f}
                </li>
              );
            })}
          </ul>
        </div>

        <button 
          onClick={leaveRoom}
          className="w-full bg-gradient-to-r from-cybermed-teal to-cybermed-cyan text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" /> RE-ENTER LOBBY
        </button>

      </motion.div>
    </div>
  );
};
