import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, MousePointer2, ShieldAlert, Users } from 'lucide-react';

export const OnboardingModal = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "STEP 1: LOGIN & TEAM CODE",
      subtitle: "How to connect together",
      text: "Every player must enter their own Name, but you MUST all enter the EXACT SAME Team Code to end up in the same group.",
      color: "border-blue-400",
      shadow: "shadow-[0_0_30px_rgba(96,165,250,0.4)]",
      visual: () => (
        <div className="relative w-full h-44 bg-black/50 border border-blue-400/30 rounded-2xl flex flex-col items-center justify-center overflow-hidden p-4">
          <motion.div
            className="absolute z-50 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [100, 0, 0, 0, 0, 100], 
               y: [100, 10, 10, 10, 10, 100], 
               scale: [1, 1, 0.8, 1, 1, 1] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.3, 0.5, 0.8] }}
          >
            <MousePointer2 className="w-5 h-5 fill-white/20" />
          </motion.div>

          <div className="w-full max-w-[200px] mb-2 bg-black border border-slate-700 rounded p-2 text-[10px] text-slate-500">
            Name: <span className="text-white">Alex</span>
          </div>

          <motion.div 
            animate={{ borderColor: ['rgba(30,41,59,1)', 'rgba(96,165,250,1)', 'rgba(30,41,59,1)'] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-full max-w-[200px] bg-black border border-slate-700 rounded p-2 text-[10px] text-slate-500 flex items-center gap-1"
          >
            Team Code: <motion.span animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 4, repeat: Infinity }} className="text-blue-400 font-bold">GROUP_5</motion.span>
          </motion.div>

          <motion.div 
             animate={{ opacity: [0, 0, 0, 1, 1] }}
             transition={{ duration: 4, repeat: Infinity }}
             className="flex gap-2 mt-4"
          >
            <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full"><Users className="w-4 h-4"/></div>
            <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full"><Users className="w-4 h-4"/></div>
            <div className="bg-blue-500/20 text-blue-400 p-1 rounded-full"><Users className="w-4 h-4"/></div>
          </motion.div>
        </div>
      )
    },
    {
      title: "STEP 2: CHOOSE ROLES",
      subtitle: "Divide the responsibilities",
      text: "Your team needs exactly 1 Biophysicist, 1 Clinical Strategist, and 1 Safety Expert. Talk to your team and divide them up! You cannot have duplicate roles.",
      color: "border-cyan-500",
      shadow: "shadow-[0_0_30px_rgba(6,182,212,0.4)]",
      visual: () => (
        <div className="relative w-full h-44 bg-black/50 border border-cyan-500/30 rounded-2xl flex flex-col items-center justify-center overflow-hidden p-4 gap-2">
          <motion.div
            className="absolute z-50 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [100, 0, 0, 0, 100], 
               y: [100, -10, -10, -10, 100], 
               scale: [1, 1, 0.8, 1, 1] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.3, 0.8] }}
          >
            <MousePointer2 className="w-5 h-5 fill-white/20" />
          </motion.div>

          {['Biophysicist', 'Clinical Strategist', 'Safety Expert'].map((role, i) => (
            <motion.div 
              key={i}
              animate={{ 
                backgroundColor: i === 0 ? ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(6,182,212,0.3)', 'rgba(6,182,212,0.3)'] : ['rgba(0,0,0,0)', 'rgba(0,0,0,0)']
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-full max-w-[200px] border border-slate-700/50 p-2 rounded-lg text-[10px] uppercase font-bold flex justify-between items-center"
            >
              {role}
              {i === 1 && <span className="text-[8px] text-slate-500">(Taken by Sarah)</span>}
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "STEP 3: SOLO ANALYSIS",
      subtitle: "Read the clinical case carefully",
      text: "Read the patient's file. Choose the correct Therapy Modality based on their diagnosis and submit your answer without cheating.",
      color: "border-purple-500",
      shadow: "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
      visual: () => (
        <div className="relative w-full h-48 bg-black/50 border border-purple-500/30 rounded-2xl flex items-center justify-center overflow-hidden flex-col gap-2 p-4">
          <motion.div
            className="absolute z-50 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [150, 0, 0,    0,   0, 150], 
               y: [100, -5, -5, 35, 35, 100], 
               scale: [1, 1, 0.8, 1, 0.8, 1] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.5, 0.55, 0.8] }}
          >
            <MousePointer2 className="w-5 h-5 fill-white/20" />
          </motion.div>

          <div className="w-full max-w-[200px] bg-white/5 border border-white/10 p-2 rounded text-[8px] text-white/70 mb-1">
             Patient file: Acute wrist inflammation...
          </div>

          <motion.div 
            animate={{ backgroundColor: ['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.5)', 'rgba(168,85,247,0.4)', 'rgba(168,85,247,0.4)'] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-full max-w-[200px] border border-purple-500/50 py-2 rounded-lg text-[10px] font-black text-purple-300 text-center"
          >
            SELECT: UHF THERAPY
          </motion.div>

          <motion.div 
            animate={{ opacity: [1, 1, 1, 1, 0], scale: [1,1,1,1,1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-full max-w-[200px] bg-purple-500/20 border border-purple-500 text-purple-200 py-2 rounded-lg text-[10px] font-black tracking-widest text-center mt-2"
          >
            SUBMIT ANALYSIS
          </motion.div>

          <motion.div 
            animate={{ opacity: [0,0,0,0,1,1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-x-8 bottom-4 bg-purple-600 border border-purple-400 text-white py-2 rounded-lg text-[10px] font-black tracking-widest text-center flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,1)]"
          >
            <CheckCircle className="w-4 h-4"/> SECURE
          </motion.div>
        </div>
      )
    },
    {
      title: "STEP 4: THE GROUP CONSOLE",
      subtitle: "Team Synchronization",
      text: "Once everyone submits, the main console unlocks! Talk to your team to agree on the Frequency, Modality, and Safety Lock, then Initiate.",
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

          <div className="w-full bg-black border border-slate-700 rounded-lg p-2">
            <div className="text-[8px] text-cyan-500 mb-2">FREQUENCY</div>
            <div className="h-2 bg-cyan-500/20 rounded-full w-full relative">
              <motion.div 
                animate={{ width: ['20%', '20%', '80%', '80%', '80%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute left-0 top-0 h-full bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"
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
             className="w-full bg-slate-800 py-3 rounded-lg text-xs font-black tracking-widest text-center"
          >
             INITIATE
          </motion.div>
        </div>
      )
    },
    {
      title: "STEP 5: TOURNAMENT RULES",
      subtitle: "3 Lives & Instant Death",
      text: "WARNING: Treating a patient with absolute contraindications (e.g. Pacemakers or Tumors) instantly kills the patient and eliminates your team to the Spectator Mode!",
      color: "border-red-500",
      shadow: "shadow-[0_0_30px_rgba(239,68,68,0.4)]",
      visual: () => (
        <div className="relative w-full h-48 bg-black/50 border border-red-500/30 rounded-2xl flex flex-col items-center justify-center overflow-hidden p-4">
          <motion.div
            className="absolute z-50 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [150, 0, 0, 150], 
               y: [150, 20, 20, 150],
               scale:[1, 1, 0.8, 1] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.5] }}
          >
            <MousePointer2 className="w-5 h-5 fill-white/20" />
          </motion.div>

          <div className="text-[10px] text-red-500 bg-red-900/30 border border-red-500 px-3 py-1 mb-3 rounded font-black uppercase">
            PATIENT HAS PACEMAKER
          </div>

          <div className="w-32 bg-slate-800 py-2 rounded-lg text-[9px] font-black text-center text-cyan-500 mb-4">
            INITIATE TREATMENT
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
            <div className="text-[8px] uppercase tracking-widest text-red-300 mt-1">Moved to Spectator Mode</div>
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
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl">
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
            <h1 className="text-2xl font-black text-white mb-1 tracking-widest">{currentStep.title}</h1>
            <p className="text-white/80 text-xs md:text-sm mb-6 max-w-[320px]">
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
                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:scale-[1.02]' 
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
