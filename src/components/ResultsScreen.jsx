import React from 'react';
import { useSocket } from '../context/SocketContext';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, CheckCircle, RefreshCcw, Eye } from 'lucide-react';

export const ResultsScreen = () => {
  const { scoreData, clinicalCase, attemptsLeft, retryTreatment, enterSpectator } = useSocket();

  if (!scoreData) return null;

  const isCriticalError = scoreData.score === 0 && attemptsLeft === 0;
  const isPerfect = scoreData.score === 100;
  const hasRetries = attemptsLeft > 0 && !isPerfect;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cybermed-dark text-white p-6 relative">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-cybermed-slate/40 border border-cybermed-teal/50 rounded-2xl p-8 backdrop-blur-md shadow-[0_0_40px_-5px_rgba(13,148,136,0.3)] text-center relative overflow-hidden"
      >
        {isCriticalError && (
          <div className="absolute top-0 left-0 w-full h-2 bg-red-600 shadow-[0_0_30px_#ef4444] animate-pulse" />
        )}
        {isPerfect && (
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500 shadow-[0_0_20px_#22c55e]" />
        )}

        <div className="mb-6">
          <h2 className="text-xs tracking-widest text-cybermed-teal uppercase mb-2">Final Resonance Assessment</h2>
          <h1 className="text-4xl font-black mb-2">
            {isCriticalError ? (
              <span className="text-red-500 flex items-center justify-center gap-3">
                <ShieldAlert className="w-10 h-10" /> FATAL ERROR
              </span>
            ) : isPerfect ? (
              <span className="text-green-400 flex items-center justify-center gap-3">
                <CheckCircle className="w-10 h-10" /> PERFECT RESONANCE
              </span>
            ) : (
              <span className="text-yellow-400 flex items-center justify-center gap-3">
                <Activity className="w-10 h-10" /> SUBOPTIMAL THERAPY
              </span>
            )}
          </h1>
          <div className="text-6xl font-black mt-6 mb-2 tracking-tighter">
            {scoreData.score}<span className="text-cybermed-teal text-3xl">%</span>
          </div>
          
          <div className="flex justify-center space-x-2 mt-4 mb-2">
             {[1, 2, 3].map(i => (
               <div key={i} className={`w-3 h-3 rounded-full ${i <= attemptsLeft ? 'bg-cybermed-cyan shadow-[0_0_10px_#06b6d4]' : 'bg-red-900 border border-red-500'}`} />
             ))}
          </div>
          <p className="text-xs text-cybermed-teal uppercase tracking-widest">
             {attemptsLeft} ATTEMPTS REMAINING
          </p>
        </div>

        <div className="bg-black/50 rounded-xl p-6 text-left border border-cybermed-slate mb-8 space-y-4">
          <h3 className="text-sm uppercase tracking-widest text-cybermed-cyan mb-2 border-b border-cybermed-slate pb-2">Medical Board Feedback</h3>
          <p className="text-xs text-cybermed-teal/70 italic mb-4">Case: {clinicalCase?.title}</p>
          
          <ul className="space-y-3">
            {scoreData.feedback.map((f, idx) => {
              const isFatal = f.includes('FATAL');
              const isError = f.includes('INCORRECT') || f.includes('FAILED') || isFatal;
              return (
                <li key={idx} className={`text-sm p-3 rounded-lg border ${isFatal ? 'bg-red-900/40 border-red-500 text-red-200 font-bold' : isError ? 'bg-red-900/20 border-red-500/30 text-red-300' : 'bg-green-900/20 border-green-500/30 text-green-300'}`}>
                   {f}
                </li>
              );
            })}
          </ul>
        </div>

        {hasRetries ? (
          <button 
            onClick={retryTreatment}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" /> RE-EVALUATE SETTINGS
          </button>
        ) : (
          <button 
            onClick={enterSpectator}
            className="w-full bg-gradient-to-r from-cybermed-teal to-cybermed-cyan text-black font-black tracking-widest py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" /> SPECTATE ACTIVE TEAMS
          </button>
        )}

      </motion.div>
    </div>
  );
};
