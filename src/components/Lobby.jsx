import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export const Lobby = () => {
  const { phase, joinRoom, leaveRoom, players, myPlayer, errorMessage } = useSocket();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleJoin = (e) => {
    e.preventDefault();
    if (name && code) {
      joinRoom(name, code);
    }
  };

  if (phase === 'lobby-waiting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cybermed-dark text-white p-6 relative">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full max-w-md bg-cybermed-slate/40 border border-cybermed-teal/50 rounded-2xl p-8 backdrop-blur-md shadow-[0_0_40px_-10px_rgba(13,148,136,0.3)]"
        >
          <div className="text-center mb-8">
            <Activity className="w-12 h-12 text-cybermed-cyan mx-auto mb-4" />
            <h2 className="text-2xl font-bold tracking-wider text-cybermed-cyan">AWAITING TEAM...</h2>
            <p className="text-cybermed-teal mt-2">Room: {code}</p>
          </div>

          <div className="space-y-4">
            {players.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-cybermed-slate"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-cybermed-cyan pulse-glow"></div>
                  <span className="font-medium">{p.name}</span>
                </div>
                {p.id === myPlayer?.id && <span className="text-xs text-cybermed-teal border border-cybermed-teal px-2 py-1 rounded-md">YOU ({p.role.substring(0, 4).toUpperCase()})</span>}
              </motion.div>
            ))}
          </div>

          {players.length < 3 && (
            <motion.div className="mt-8 flex flex-col items-center space-y-4">
              <p className="text-cybermed-teal/70 text-sm italic">Waiting for {3 - players.length} more doctors to connect...</p>
              <button 
                onClick={leaveRoom}
                className="text-xs text-red-400 hover:text-red-300 transition-colors border border-red-500/30 px-4 py-2 rounded-lg"
              >
                Start Over / Leave Team
              </button>
            </motion.div>
          )}

        </motion.div>

        <style>{`.pulse-glow { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; } @keyframes pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 10px #06b6d4; } 50% { opacity: .5; box-shadow: none; } }`}</style>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cybermed-dark text-white p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-cybermed-teal rounded-full blur-[120px]"></div>
         <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-cybermed-cyan rounded-full blur-[150px]"></div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md z-10 glass-panel border border-cybermed-slate bg-cybermed-slate/40 p-8 rounded-2xl backdrop-blur-xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tighter mb-2 bg-gradient-to-br from-white to-cybermed-teal bg-clip-text text-transparent">
            EMF RESONANCE
          </h1>
          <p className="text-cybermed-teal font-medium tracking-widest text-sm uppercase">Clinical Board Simulator</p>
        </div>

        {errorMessage && (
          <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleJoin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-cybermed-cyan tracking-wider mb-2 uppercase">Dr. Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black/50 border border-cybermed-slate rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cybermed-cyan focus:ring-1 focus:ring-cybermed-cyan transition-all"
              placeholder="e.g. Dr. House"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-cybermed-cyan tracking-wider mb-2 uppercase">Team Code</label>
            <input 
              type="text" 
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full bg-black/50 border border-cybermed-slate rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cybermed-cyan focus:ring-1 focus:ring-cybermed-cyan transition-all uppercase"
              placeholder="e.g. TEAM-1"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-cybermed-teal to-cybermed-cyan text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:-translate-y-1"
          >
            JOIN CLINICAL BOARD
          </button>
        </form>
      </motion.div>
    </div>
  );
};
