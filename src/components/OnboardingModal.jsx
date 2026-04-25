import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Stethoscope, Zap, ShieldAlert, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

export const OnboardingModal = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "THE CLINICAL SIMULATION",
      subtitle: "Assemble your medical board",
      visual: () => (
        <div className="flex gap-4 w-full justify-center opacity-90 scale-100 h-28 items-center relative">
          <div className="absolute inset-0 bg-cybermed-cyan/10 blur-[40px] rounded-full"></div>
          {['Biophysicist', 'Strategist', 'Safety Expert'].map((role, i) => (
            <motion.div 
              key={i} 
              animate={{ y: [-10, 10, -10], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
              className={`bg-black/80 border ${i===0?'border-blue-500/50':i===1?'border-purple-500/50':'border-green-500/50'} p-4 rounded-xl flex flex-col items-center backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] z-10 w-24`}
            >
              <Users className={`w-8 h-8 mb-2 ${i===0?'text-blue-400':i===1?'text-purple-400':'text-green-400'}`}/>
              <span className="text-[9px] font-black uppercase tracking-widest text-center">{role}</span>
            </motion.div>
          ))}
        </div>
      ),
      text: "Welcome to EMF Resonance. You and two other doctors will form a Clinical Board. Together, you must diagnose and treat complex patients using advanced electromagnetic therapies.",
      color: "border-cybermed-cyan",
      shadow: "shadow-[0_0_40px_rgba(6,182,212,0.5)]"
    },
    {
      title: "PHASE 1: SOLO ANALYSIS",
      subtitle: "Review the patient confidentially",
      visual: () => (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm mx-auto bg-black/80 border border-purple-500/50 rounded-2xl p-5 text-left relative overflow-hidden backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.3)] z-10"
        >
          <motion.div 
            animate={{ x: ['-100%', '200%'] }} 
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"
          ></motion.div>
          <div className="flex items-center gap-2 border-b border-purple-500/30 pb-3 mb-4">
             <Stethoscope className="w-5 h-5 text-purple-400"/>
             <span className="text-xs uppercase text-purple-400 font-black tracking-widest">Your Task</span>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-xs text-white/80 mb-4 border border-white/10 relative overflow-hidden">
             Classify and select the correct therapeutic modality based on pathology.
          </div>
          <motion.button 
            animate={{ boxShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 20px rgba(168,85,247,0.6)', '0 0 0px rgba(168,85,247,0)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-full bg-purple-500/20 border border-purple-500 text-purple-300 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest"
          >
            SUBMIT ANALYSIS
          </motion.button>
        </motion.div>
      ),
      text: "Each doctor will be assigned a unique role: Biophysicist, Clinical Strategist, or Safety Expert. You will independently review the case and lock in your individual analysis.",
      color: "border-purple-500",
      shadow: "shadow-[0_0_40px_rgba(168,85,247,0.5)]"
    },
    {
      title: "PHASE 2: THE CONSOLE",
      subtitle: "Synchronize your treatment plan",
      visual: () => (
        <div className="grid grid-cols-3 gap-3 w-full opacity-100 scale-100 relative z-10">
          <div className="absolute inset-0 bg-yellow-400/5 blur-[50px] rounded-full"></div>
          
          <motion.div whileHover={{ scale: 1.05 }} className="bg-black/70 border border-cybermed-slate/80 p-3 rounded-xl backdrop-blur-md relative overflow-hidden shadow-lg">
             <div className="text-[9px] text-cybermed-cyan mb-3 font-black tracking-widest">FREQUENCY</div>
             <div className="h-1.5 bg-cybermed-cyan/20 rounded-full w-full relative">
               <motion.div 
                 animate={{ width: ['10%', '90%', '50%'] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute left-0 top-0 h-full bg-cybermed-cyan rounded-full shadow-[0_0_10px_#06b6d4]"
               ></motion.div>
             </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-black/70 border border-cybermed-slate/80 p-3 rounded-xl backdrop-blur-md shadow-lg flex flex-col justify-center">
             <div className="text-[9px] text-cybermed-cyan mb-2 font-black tracking-widest">MODALITY</div>
             <motion.div 
               animate={{ color: ['#fff', '#6ee7b7', '#fff'] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="text-[10px] border border-cybermed-slate/50 rounded bg-white/10 px-2 py-1 font-bold truncate text-center"
             >
               UHF THERAPY
             </motion.div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-black/70 border border-cybermed-slate/80 p-3 rounded-xl backdrop-blur-md shadow-lg flex flex-col items-center justify-center">
             <div className="text-[9px] text-cybermed-cyan mb-2 font-black tracking-widest">SAFETY</div>
             <motion.div 
               animate={{ backgroundColor: ['rgba(34,197,94,0.1)', 'rgba(34,197,94,0.4)', 'rgba(34,197,94,0.1)'] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-green-400 border border-green-500 rounded px-3 py-1 text-[9px] font-black w-full text-center"
             >
               UNLOCK
             </motion.div>
          </motion.div>
        </div>
      ),
      text: "Once all 3 doctors submit their solo analysis, the central console will unlock. You must collaborate to set the correct Penetration Frequency, select the Therapy Modality, and finally Authorize (Unlock) the machine.",
      color: "border-yellow-400",
      shadow: "shadow-[0_0_40px_rgba(250,204,21,0.5)]"
    },
    {
      title: "TOURNAMENT RULES",
      subtitle: "Survive the clinical board",
      visual: () => (
        <motion.div 
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-full max-w-[240px] mx-auto bg-red-950/40 border border-red-500 rounded-2xl p-6 text-center shadow-[0_0_40px_rgba(239,68,68,0.3)] backdrop-blur-xl relative z-10 overflow-hidden"
        >
          <motion.div 
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-red-500"
          ></motion.div>

          <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-3 drop-shadow-[0_0_15px_#ef4444]"/>
          </motion.div>
          
          <div className="text-2xl font-black text-red-500 mb-2 tracking-tighter drop-shadow-[0_0_10px_#ef4444]">FATAL ERROR</div>
          
          <div className="flex justify-center gap-2 mt-4">
             <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-3 h-3 rounded-full border-2 border-red-500 bg-red-900"></motion.div>
             <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-3 h-3 rounded-full border-2 border-red-500 bg-red-900"></motion.div>
             <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-3 h-3 rounded-full border-2 border-red-500 bg-red-900"></motion.div>
          </div>
          <div className="text-[10px] text-red-400 mt-2 font-bold tracking-widest uppercase">0 Attempts Remaining</div>
        </motion.div>
      ),
      text: "Your team has exactly 3 attempts to get a 100% cure rate. WARNING: Fatal errors, such as treating a patient with a cardiac pacemaker, will instantly terminate your team and send you to the Spectator Tribune!",
      color: "border-red-500",
      shadow: "shadow-[0_0_40px_rgba(239,68,68,0.5)]"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cybermed-dark/90 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`w-full max-w-xl bg-black/60 border ${currentStep.color} rounded-3xl p-8 relative overflow-hidden transition-all duration-500 ${currentStep.shadow}`}
      >
        {/* Animated Background Elements */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] animate-spin-slow opacity-10 pointer-events-none" style={{ background: 'conic-gradient(from 0deg at 50% 50%, rgba(0,0,0,0) 0%, rgba(6,182,212,0.2) 50%, rgba(0,0,0,0) 100%)' }}></div>

        {/* Progress Bar */}
        <div className="flex gap-2 mb-8 relative z-10">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= step ? `bg-white` : 'bg-white/20'}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center relative z-10 min-h-[300px]"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="mb-8 w-full flex justify-center"
            >
              {currentStep.visual()}
            </motion.div>
            
            <h2 className={`text-[10px] uppercase tracking-widest mb-2 font-bold ${currentStep.color.replace('border-', 'text-')}`}>
              Step 0{step + 1}
            </h2>
            <h1 className="text-3xl font-black text-white mb-2 tracking-widest">{currentStep.title}</h1>
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-widest mb-6">{currentStep.subtitle}</h3>
            
            <p className="text-white/80 leading-relaxed text-sm md:text-base px-4">
              {currentStep.text}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex gap-4 relative z-10">
          {step > 0 && (
            <button 
              onClick={handlePrev}
              className="flex-none p-4 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <button 
            onClick={handleNext}
            className={`flex-1 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              isLast 
                ? 'bg-gradient-to-r from-cybermed-teal to-cybermed-cyan text-black shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-[1.02]' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
            }`}
          >
            {isLast ? (
              <><CheckCircle className="w-5 h-5" /> I UNDERSTAND, START GAME</>
            ) : (
              <>NEXT STEP <ChevronRight className="w-5 h-5" /></>
            )}
          </button>
        </div>

      </motion.div>
    </div>
  );
};
