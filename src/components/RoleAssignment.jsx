import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Stethoscope, CheckCircle } from 'lucide-react';

export const RoleAssignment = () => {
  const { myPlayer, completeSoloTask } = useSocket();
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    setCompleted(true);
    completeSoloTask();
  };

  const renderRoleTask = () => {
    switch (myPlayer?.role) {
      case 'Biophysicist':
        return (
          <div className="space-y-6">
            <p className="text-cybermed-teal">Task: Identify mechanism of action and calibrate base frequency.</p>
            <div className="bg-black/40 p-4 rounded-xl border border-cybermed-slate space-y-4">
              <label className="text-xs uppercase tracking-wider text-cybermed-cyan">Target Frequency Range</label>
              <input type="range" className="w-full accent-cybermed-cyan" min="0" max="100" defaultValue="50"/>
              <div className="flex justify-between text-xs text-cybermed-teal">
                <span>0 Hz</span><span>500 MHz</span><span>3 GHz</span>
              </div>
            </div>
          </div>
        );
      case 'Clinical Strategist':
        return (
          <div className="space-y-6">
            <p className="text-cybermed-teal">Task: Classify and select the correct therapeutic modality based on pathology.</p>
            <div className="grid grid-cols-1 gap-3">
              {['UHF Therapy', 'Microwave Therapy', 'Magnetotherapy'].map(mod => (
                <button key={mod} className="bg-black/40 border border-cybermed-slate p-3 rounded-xl hover:border-cybermed-cyan transition-colors text-left pl-4 w-full focus:bg-cybermed-teal/20 focus:border-cybermed-cyan">
                  {mod}
                </button>
              ))}
            </div>
          </div>
        );
      case 'Safety Expert':
        return (
          <div className="space-y-6">
            <p className="text-cybermed-teal">Task: Screen patient history for absolute and relative contraindications.</p>
            <div className="space-y-3">
              {[
                { label: 'Pacemaker present', safe: false },
                { label: 'Acute Inflammation', safe: false },
                { label: 'Mild muscle pain', safe: true }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-cybermed-slate">
                  <span className="text-sm">{item.label}</span>
                  <div className="flex space-x-2">
                    <button className="text-xs px-3 py-1 border border-red-500/50 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors">Risk</button>
                    <button className="text-xs px-3 py-1 border border-green-500/50 text-green-500 rounded hover:bg-green-500 hover:text-white transition-colors">Clear</button>
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
      case 'Biophysicist': return <Zap className="w-12 h-12 text-cybermed-cyan mb-4" />;
      case 'Clinical Strategist': return <Stethoscope className="w-12 h-12 text-cybermed-cyan mb-4" />;
      case 'Safety Expert': return <ShieldAlert className="w-12 h-12 text-cybermed-cyan mb-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cybermed-dark text-white p-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg glass-panel bg-cybermed-slate/40 border border-cybermed-teal/50 rounded-2xl p-8 backdrop-blur-md"
      >
        <div className="flex flex-col items-center text-center mb-8 border-b border-cybermed-slate pb-6">
          {getRoleIcon()}
          <h2 className="text-sm tracking-widest text-cybermed-teal uppercase mb-1">Your Role Assignment</h2>
          <h1 className="text-3xl font-bold text-white">{myPlayer?.role}</h1>
        </div>

        <div className="mb-8">
          {renderRoleTask()}
        </div>

        <div className="mt-8">
          <button 
            disabled={completed}
            onClick={handleComplete}
            className={`w-full py-4 rounded-xl font-bold flex flex-col items-center justify-center transition-all ${
              completed 
               ? 'bg-cybermed-teal/20 text-cybermed-teal border border-cybermed-teal cursor-not-allowed' 
               : 'bg-cybermed-cyan text-black hover:bg-white'
            }`}
          >
            {completed ? (
               <><CheckCircle className="w-5 h-5 mb-1" /> DATA LOCKED & READY</>
            ) : (
               'SUBMIT ANALYSIS TO BOARD'
            )}
          </button>
          
          {completed && (
            <p className="text-center text-xs text-cybermed-teal mt-4 animate-pulse">Waiting for remaining board members to finalize...</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
