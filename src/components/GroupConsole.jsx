import React from 'react';
import { useSocket } from '../context/SocketContext';
import { TissueVisualizer } from './TissueVisualizer';
import { ShieldAlert, Zap, Stethoscope, Lock, Unlock } from 'lucide-react';
import { motion } from 'framer-motion';

export const GroupConsole = () => {
  const { patientState, updatePatientState, myPlayer, players, leaveRoom, clinicalCase, evaluateTreatment } = useSocket();

  const handleFrequencyChange = (e) => {
    if (myPlayer?.role === 'Biophysicist') {
      updatePatientState({ frequency: e.target.value });
    }
  };

  const handleModalitySelect = (mod) => {
    if (myPlayer?.role === 'Clinical Strategist') {
      updatePatientState({ modality: mod });
    }
  };

  const handleAuthorize = () => {
    if (myPlayer?.role === 'Safety Expert') {
      updatePatientState({ isAuthorized: !patientState.isAuthorized });
    }
  };

  const handleStart = () => {
    if (patientState.isAuthorized) {
       evaluateTreatment();
    }
  };

  return (
    <div className="min-h-screen bg-cybermed-dark text-white p-6 md:p-12 flex flex-col items-center">
      <motion.div 
        initial={{ scale: 1.1, filter: "brightness(2) contrast(2)" }}
        animate={{ scale: 1, filter: "brightness(1) contrast(1)" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-4 gap-6"
      >
        {/* Header containing Patient Target Info */}
        <div className="col-span-1 xl:col-span-4 mb-4 bg-cybermed-slate/40 border border-t-[4px] border-t-cybermed-cyan border-cybermed-teal/30 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 backdrop-blur-md">
          <div className="md:col-span-2">
            <h1 className="text-xl font-bold text-cybermed-cyan tracking-wider mb-2 uppercase flex items-center gap-2">
              <Stethoscope className="w-5 h-5"/> 
              TARGET CLINICAL CASE: {clinicalCase?.title}
            </h1>
            <p className="text-sm text-cybermed-teal leading-relaxed p-3 bg-black/40 rounded-lg border border-cybermed-slate">
               {clinicalCase?.text}
            </p>
          </div>
          
          <div className="flex flex-col justify-center items-end">
            <div className="text-[10px] text-cybermed-teal uppercase mb-2 tracking-widest text-right">Medical Board {players.length}/3 Online</div>
            <div className="flex space-x-2">
              {players.map(p => (
                 <div key={p.id} className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${p.id === myPlayer?.id ? 'bg-cybermed-cyan text-black' : 'bg-black/50 text-cybermed-teal border border-cybermed-slate'}`}>
                   {p.role.substring(0,6)}
                 </div>
              ))}
              <button 
                onClick={leaveRoom}
                className="px-2 py-1 bg-red-900/40 text-red-500 border border-red-500/50 rounded hover:bg-red-500 hover:text-white transition-colors text-[10px] ml-2"
              >
                LEAVE
              </button>
            </div>
          </div>
        </div>

        {/* Console Controls */}
        <div className="col-span-1 md:col-span-1 space-y-6">
          {/* Biophysicist Panel */}
          <div className={`p-5 rounded-xl border ${myPlayer?.role === 'Biophysicist' ? 'border-cybermed-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)] bg-cybermed-cyan/10' : 'border-cybermed-slate bg-black/40'} transition-all`}>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-cybermed-cyan" />
              <h3 className="font-bold text-sm">BIOPHYSICS</h3>
            </div>
            <label className="text-xs text-cybermed-teal block mb-2">Penetration Frequency</label>
            <input 
              type="range" 
              min="0" max="100" 
              value={patientState.frequency} 
              onChange={handleFrequencyChange}
              disabled={myPlayer?.role !== 'Biophysicist'}
              className="w-full accent-cybermed-cyan mb-2"
            />
            <div className="text-right text-xs font-mono">{patientState.frequency} MHz equivalent</div>
          </div>

          {/* Strategist Panel */}
          <div className={`p-5 rounded-xl border ${myPlayer?.role === 'Clinical Strategist' ? 'border-cybermed-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)] bg-cybermed-cyan/10' : 'border-cybermed-slate bg-black/40'} transition-all`}>
            <div className="flex items-center space-x-2 mb-4">
              <Stethoscope className="w-5 h-5 text-cybermed-cyan" />
              <h3 className="font-bold text-sm">MODALITY</h3>
            </div>
            <div className="space-y-2 text-sm">
              {['UHF Therapy', 'Microwave Therapy', 'Magnetotherapy'].map(mod => (
                <button 
                  key={mod}
                  disabled={myPlayer?.role !== 'Clinical Strategist'}
                  onClick={() => handleModalitySelect(mod)}
                  className={`w-full text-left px-3 py-2 border rounded ${patientState.modality === mod ? 'bg-cybermed-teal/40 border-cybermed-cyan' : 'border-cybermed-slate/50 bg-black/30'}`}
                >
                  {mod}
                </button>
              ))}
            </div>
          </div>
          
          {/* Safety Panel */}
          <div className={`p-5 rounded-xl border ${myPlayer?.role === 'Safety Expert' ? 'border-cybermed-cyan shadow-[0_0_15px_rgba(6,182,212,0.2)] bg-cybermed-cyan/10' : 'border-cybermed-slate bg-black/40'} transition-all`}>
            <div className="flex items-center space-x-2 mb-4">
              <ShieldAlert className="w-5 h-5 text-cybermed-cyan" />
              <h3 className="font-bold text-sm">SAFETY OVERRIDE</h3>
            </div>
            <button 
              disabled={myPlayer?.role !== 'Safety Expert'}
              onClick={handleAuthorize}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all ${
                patientState.isAuthorized ? 'bg-green-500/20 text-green-500 border border-green-500' : 'bg-red-500/20 text-red-500 border border-red-500'
              }`}
            >
              {patientState.isAuthorized ? <Unlock className="w-4 h-4"/> : <Lock className="w-4 h-4"/>}
              <span>{patientState.isAuthorized ? 'AUTHORIZED' : 'LOCKED'}</span>
            </button>
          </div>
        </div>

        {/* Visualizer & Run */}
        <div className="col-span-1 md:col-span-2 flex flex-col space-y-6">
          <div className="flex-1 bg-cybermed-slate/20 border border-cybermed-teal/30 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-cybermed-cyan mb-4 uppercase tracking-widest text-center">Tissue Depth Simulation</h2>
            <TissueVisualizer frequency={patientState.frequency} modality={patientState.modality} />
            <div className="mt-4 flex justify-between text-xs text-cybermed-teal">
              <div>Params: {patientState.frequency} fQ // {patientState.modality || "UNSET"}</div>
              <div>Status: {patientState.isAuthorized ? "STANDBY" : "BLOCKED"}</div>
            </div>
          </div>
          
          <button 
            disabled={!patientState.isAuthorized}
            onClick={handleStart}
            className={`w-full py-5 rounded-xl font-black text-xl tracking-widest transition-all ${
              patientState.isAuthorized 
                ? 'bg-gradient-to-r from-green-500 to-cybermed-cyan text-black shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer hover:scale-[1.02]' 
                : 'bg-cybermed-slate text-cybermed-teal cursor-not-allowed opacity-50'
            }`}
          >
            INITIATE TREATMENT
          </button>
        </div>
      </motion.div>
    </div>
  );
};
