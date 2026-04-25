import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, MousePointer2, ShieldAlert } from 'lucide-react';

export const OnboardingModal = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "ASSEMBLE YOUR TEAM",
      subtitle: "The Clinical Board",
      text: "Form a secure network with 2 other doctors.",
      color: "border-cybermed-cyan",
      shadow: "shadow-[0_0_30px_rgba(6,182,212,0.4)]",
      visual: () => (
        <div className="relative w-full h-40 bg-black/50 border border-cybermed-cyan/30 rounded-2xl flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute z-50 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [100, 0, 0, -80, -80, 80, 80], 
               y: [100, 0, 0, 0,   0,   0,  0], 
               scale: [1, 1, 0.8, 1, 0.8, 1, 0.8] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.45, 0.5, 0.7, 0.75] }}
          >
            <MousePointer2 className="w-5 h-5 fill-white/20" />
          </motion.div>

          <div className="flex gap-4">
            {['Biophysicist', 'Strategist', 'Safety Expert'].map((role, i) => (
              <motion.div 
                key={i}
                animate={{ 
                  backgroundColor: i === 1 ? ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(168,85,247,0.3)', 'rgba(168,85,247,0.3)'] : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
                  borderColor: i === 1 ? ['rgba(6,182,212,0.3)', 'rgba(6,182,212,0.3)', 'rgba(168,85,247,1)', 'rgba(168,85,247,1)'] : ['rgba(6,182,212,0.3)', 'rgba(6,182,212,0.3)']
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-20 h-24 border rounded-xl flex items-center justify-center bg-black/40 text-[9px] font-black uppercase text-center"
              >
                {role}
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "PHASE 1: SOLO ANALYSIS",
      subtitle: "Private pathology review",
      text: "Analyze the case alone. Make your choice and secure your data.",
      color: "border-purple-500",
      shadow: "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
      visual: () => (
        <div className="relative w-full h-48 bg-black/50 border border-purple-500/30 rounded-2xl flex items-center justify-center overflow-hidden flex-col gap-3 p-4">
          <motion.div
            className="absolute z-50 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [150, 0, 0,    0,   0, 150], 
               y: [100, -20, -20, 25, 25, 100], 
               scale: [1, 1, 0.8, 1, 0.8, 1] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.5, 0.55, 0.8] }}
          >
            <MousePointer2 className="w-5 h-5 fill-white/20" />
          </motion.div>

          <motion.div 
            animate={{ backgroundColor: ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)', 'rgba(168,85,247,0.4)', 'rgba(168,85,247,0.4)'] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-full border border-purple-500/50 py-3 rounded-lg text-[10px] font-black text-purple-300 text-center"
          >
            UHF THERAPY
          </motion.div>

          <motion.div 
            animate={{ opacity: [1, 1, 1, 1, 0], scale: [1,1,1,1,1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-full bg-purple-500/20 border border-purple-500 text-purple-200 py-3 rounded-lg text-[10px] font-black tracking-widest text-center"
          >
            SUBMIT ANALYSIS
          </motion.div>

          <motion.div 
            animate={{ opacity: [0,0,0,0,1,1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-x-4 bottom-4 bg-purple-600 border border-purple-400 text-white py-3 rounded-lg text-[10px] font-black tracking-widest text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,1)]"
          >
            <CheckCircle className="w-4 h-4"/> SECURE
          </motion.div>
        </div>
      )
    },
    {
      title: "PHASE 2: THE CONSOLE",
      subtitle: "Team Synchronization",
      text: "Calibrate frequency, confirm modality, unlock the safety.",
      color: "border-yellow-400",
      shadow: "shadow-[0_0_30px_rgba(250,204,21,0.4)]",
      visual: () => (
        <div className="relative w-full h-56 bg-black/50 border border-yellow-500/30 rounded-2xl flex flex-col justify-center items-center gap-3 overflow-hidden p-4">
          <motion.div
            className="absolute z-50 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [150, -50, 50,  50, 0,   0, 0, 0, 150], 
               y: [150, -60, -60, -60, 0,   0, 50, 50, 150],
               scale:[1, 1,   1,   1, 0.8, 1, 1, 0.8, 1] 
            }}
            transition={{ duration: 5, repeat: Infinity, times: [0, 0.15, 0.35, 0.4, 0.5, 0.55, 0.7, 0.75, 1] }}
          >
            <MousePointer2 className="w-5 h-5 fill-white/20" />
          </motion.div>

          <div className="w-full bg-black border border-cybermed-slate rounded-lg p-2">
            <div className="text-[8px] text-cybermed-cyan mb-2">FREQUENCY</div>
            <div className="h-2 bg-cybermed-cyan/20 rounded-full w-full relative">
              <motion.div 
                animate={{ width: ['20%', '20%', '80%', '80%', '80%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute left-0 top-0 h-full bg-cybermed-cyan rounded-full shadow-[0_0_10px_#06b6d4]"
              ></motion.div>
              <motion.div
                animate={{ left: ['20%', '20%', '80%', '80%', '80%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 bg-white rounded-full shadow"
              ></motion.div>
            </div>
          </div>

          <motion.div 
            animate={{ 
              backgroundColor: ['rgba(34,197,94,0)', 'rgba(34,197,94,0)', 'rgba(34,197,94,0)', 'rgba(34,197,94,0.3)', 'rgba(34,197,94,0.3)'],
              borderColor: ['rgba(239,68,68,0.5)', 'rgba(239,68,68,0.5)', 'rgba(239,68,68,0.5)', 'rgba(34,197,94,1)', 'rgba(34,197,94,1)'],
              color: ['rgba(239,68,68,1)', 'rgba(239,68,68,1)', 'rgba(239,68,68,1)', 'rgba(34,197,94,1)', 'rgba(34,197,94,1)']
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-full py-2 border rounded-lg text-[10px] font-black text-center uppercase"
          >
            Safety Override
          </motion.div>

          <motion.div 
             animate={{
                backgroundColor: ['#1e293b', '#1e293b', '#1e293b', '#1e293b', '#06b6d4'],
                boxShadow: ['none', 'none', 'none', 'none', '0 0 20px #06b6d4'],
                color: ['#06b6d4', '#06b6d4', '#06b6d4', '#06b6d4', '#000']
             }}
             transition={{ duration: 5, repeat: Infinity }}
             className="w-full bg-cybermed-slate py-3 rounded-lg text-xs font-black tracking-widest text-center"
          >
             INITIATE
          </motion.div>
        </div>
      )
    },
    {
      title: "TOURNAMENT RULES",
      subtitle: "Survive the clinical board",
      text: "You possess 3 lives. Ignoring absolute contraindications directly terminates your game.",
      color: "border-red-500",
      shadow: "shadow-[0_0_30px_rgba(239,68,68,0.4)]",
      visual: () => (
        <div className="relative w-full h-48 bg-black/50 border border-red-500/30 rounded-2xl flex flex-col items-center justify-center overflow-hidden">
          <motion.div
            className="absolute z-50 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [150, 0, 0, 150], 
               y: [150, 30, 30, 150],
               scale:[1, 1, 0.8, 1] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.5] }}
          >
            <MousePointer2 className="w-5 h-5 fill-white/20" />
          </motion.div>

          <div className="text-[10px] text-red-500 bg-red-900/30 border border-red-500 px-3 py-1 mb-4 rounded font-black uppercase">
            PATIENT HAS PACEMAKER
          </div>

          <div className="w-32 bg-cybermed-slate py-2 rounded-lg text-[9px] font-black text-center text-cybermed-cyan mb-4">
            INITIATE
          </div>

          <div className="flex gap-2">
             {[0,1,2].map(i => (
               <motion.div 
                 key={i}
                 animate={{ opacity: [1, 1, 1, 0.2, 0.2], scale: [1, 1, 1, 0.5, 0.5] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"
               />
             ))}
          </div>

          <motion.div 
            animate={{ opacity: [0, 0, 0, 1, 1], scale: [0, 0, 0, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-red-950/80 backdrop-blur-sm flex items-center justify-center flex-col"
          >
            <ShieldAlert className="w-10 h-10 text-red-500 mb-2"/>
            <div className="text-xl font-black text-red-500 block">FATAL ERROR</div>
            <div className="text-[8px] uppercase tracking-widest text-red-300 mt-1">Moved to Spectator</div>
          </motion.div>
        </div>
      )
    }
  ];

  const currentStep = steps[step];
  const isLast = step === steps.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8 bg-cybermed-dark/80 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`w-full max-w-lg bg-[#020813] border ${currentStep.color} rounded-t-3xl md:rounded-3xl p-6 md:p-8 relative overflow-hidden transition-all duration-500 ${currentStep.shadow}`}
      >
        <div className="flex gap-2 mb-6">
          {steps.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= step ? `bg-white` : 'bg-white/20'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col relative z-10 min-h-[300px]"
          >
            <h2 className={`text-[10px] uppercase tracking-widest mb-1 font-bold ${currentStep.color.replace('border-', 'text-')}`}>
              Step 0{step + 1}
            </h2>
            <h1 className="text-2xl font-black text-white mb-1 tracking-widest">{currentStep.title}</h1>
            <p className="text-white/60 text-xs md:text-sm mb-6 max-w-[280px]">
              {currentStep.text}
            </p>
            
            <div className="w-full flex justify-center mt-auto mb-2">
              {currentStep.visual()}
            </div>
            
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex gap-3 relative z-10">
          {step > 0 && (
            <button 
              onClick={handlePrev}
              className="flex-none p-4 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <button 
            onClick={handleNext}
            className={`flex-1 py-4 px-6 rounded-xl text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
              isLast 
                ? 'bg-gradient-to-r from-cybermed-teal to-cybermed-cyan text-black shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-[1.02]' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            {isLast ? (
              <><CheckCircle className="w-4 h-4" /> START MISSION</>
            ) : (
              <>NEXT <ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
