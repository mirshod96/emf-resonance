import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Stethoscope, CheckCircle, FileText } from 'lucide-react';

export const RoleAssignment = () => {
  const { myPlayer, completeSoloTask, leaveRoom, clinicalCase } = useSocket();
  const [completed, setCompleted] = useState(false);

  const [selectedModality, setSelectedModality] = useState(null);
  const [screenedItems, setScreenedItems] = useState({});

  const handleComplete = () => {
    setCompleted(true);
    completeSoloTask();
  };

  const renderRoleTask = () => {
    switch (myPlayer?.role) {
      case 'Biophysicist':
        return (
          <div className="space-y-6">
            <p className="text-cybermed-teal font-bold uppercase tracking-widest">Task: Identify mechanism of action & calibrate depth.</p>
            <div className="bg-black/40 p-4 rounded-xl border border-cybermed-slate space-y-4">
              <label className="text-xs uppercase tracking-wider text-cybermed-cyan">Target Freq (Penetration Depth)</label>
              <input type="range" className="w-full accent-cybermed-cyan" min="0" max="100" defaultValue="50"/>
              <div className="flex justify-between text-[10px] text-cybermed-teal/70 font-mono">
                <span>Low Hz (Deep)</span><span>High MHz (Superficial)</span>
              </div>
            </div>
          </div>
        );
      case 'Clinical Strategist':
        return (
          <div className="space-y-6">
            <p className="text-cybermed-teal font-bold uppercase tracking-widest">Task: Classify pathology & select modality.</p>
            <div className="grid grid-cols-1 gap-3">
              {['UHF Therapy', 'Microwave Therapy', 'Magnetotherapy', 'Electrotherapy'].map(mod => (
                <button 
                  key={mod} 
                  onClick={() => setSelectedModality(mod)}
                  className={`border p-3 rounded-xl transition-colors text-left pl-4 w-full ${
                    selectedModality === mod 
                      ? 'bg-cybermed-teal/30 border-cybermed-cyan text-white shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                      : 'bg-black/40 border-cybermed-slate hover:border-cybermed-cyan/50 text-white/70'
                  }`}
                >
                  {mod}
                </button>
              ))}
            </div>
          </div>
        );
      case 'Safety Expert':
        return (
          <div className="space-y-6">
            <p className="text-cybermed-teal font-bold uppercase tracking-widest">Task: Screen patient history for contraindications.</p>
            <div className="space-y-3">
              {[
                { label: 'Check for Pacemaker/Implants' },
                { label: 'Check for Acute Inflammation' },
                { label: 'Check for Oncological History' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-cybermed-slate">
                  <span className="text-xs text-white/80">{item.label}</span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setScreenedItems({...screenedItems, [idx]: 'risk'})}
                      className={`text-[10px] uppercase font-bold px-3 py-1 border rounded transition-colors ${
                        screenedItems[idx] === 'risk' ? 'bg-red-500 text-white border-red-500' : 'border-red-500/50 text-red-500 hover:bg-red-500/20'
                      }`}
                    >
                      Risk
                    </button>
                    <button 
                      onClick={() => setScreenedItems({...screenedItems, [idx]: 'clear'})}
                      className={`text-[10px] uppercase font-bold px-3 py-1 border rounded transition-colors ${
                        screenedItems[idx] === 'clear' ? 'bg-green-500 text-white border-green-500' : 'border-green-500/50 text-green-500 hover:bg-green-500/20'
                      }`}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getRoleIcon = () => {
    switch (myPlayer?.role) {
      case 'Biophysicist': return <Zap className="w-10 h-10 text-cybermed-cyan mb-2" />;
      case 'Clinical Strategist': return <Stethoscope className="w-10 h-10 text-cybermed-cyan mb-2" />;
      case 'Safety Expert': return <ShieldAlert className="w-10 h-10 text-cybermed-cyan mb-2" />;
      default: return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cybermed-dark text-white p-4 md:p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg glass-panel bg-cybermed-slate/40 border border-cybermed-teal/50 rounded-2xl p-6 md:p-8 backdrop-blur-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex flex-col items-center text-center mb-6 border-b border-white/10 pb-4">
          {getRoleIcon()}
          <h2 className="text-[10px] tracking-widest text-cybermed-teal uppercase mb-1">Your Role Assignment</h2>
          <h1 className="text-2xl font-black text-white uppercase">{myPlayer?.role}</h1>
        </div>

        {clinicalCase && (
          <div className="mb-8 bg-black/60 border border-cybermed-slate rounded-xl p-5 shadow-inner text-left">
            <h3 className="text-cybermed-cyan text-xs font-black mb-3 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-4 h-4"/> Clinical Case File
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-cybermed-teal/50 text-[10px] uppercase tracking-widest block mb-1">Diagnosed Pathology</span>
                <p className="text-white font-mono bg-black/80 px-3 py-2 rounded text-sm border border-white/5">{clinicalCase.title}</p>
              </div>
              <div>
                <span className="text-cybermed-teal/50 text-[10px] uppercase tracking-widest block mb-1">Patient History & Symptoms</span>
                <p className="text-white/80 leading-relaxed text-sm bg-black/40 px-3 py-2 rounded border border-white/5">{clinicalCase.text}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 bg-cybermed-slate/20 p-5 rounded-xl border border-white/5">
          {renderRoleTask()}
        </div>

        <div className="mt-8">
          <button 
            disabled={completed}
            onClick={handleComplete}
            className={`w-full py-4 rounded-xl text-xs font-black tracking-widest flex flex-col items-center justify-center transition-all ${
              completed 
               ? 'bg-cybermed-teal/20 text-cybermed-teal border border-cybermed-teal cursor-not-allowed' 
               : 'bg-gradient-to-r from-cybermed-teal to-cybermed-cyan text-black hover:scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.5)]'
            }`}
          >
            {completed ? (
               <><CheckCircle className="w-5 h-5 mb-1" /> DATA LOCKED & SECURED</>
            ) : (
               'SUBMIT ANALYSIS TO BOARD'
            )}
          </button>
          
          {completed && (
            <p className="text-center text-[10px] uppercase tracking-widest text-cybermed-teal mt-4 animate-pulse">Waiting for remaining board members to finalize...</p>
          )}
        </div>

        <div className="absolute top-4 right-4">
          <button 
            onClick={leaveRoom}
            className="text-[10px] uppercase tracking-widest text-red-500 hover:text-white transition-colors bg-red-950/40 border border-red-500/30 hover:bg-red-600 px-3 py-1.5 rounded-md"
          >
            Abort
          </button>
        </div>
      </motion.div>
    </div>
  );
};
