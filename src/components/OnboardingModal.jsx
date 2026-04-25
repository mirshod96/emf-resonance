import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Stethoscope, Zap, ShieldAlert, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';

export const OnboardingModal = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "THE CLINICAL SIMULATION",
      subtitle: "Assemble your medical board",
      icon: <Users className="w-20 h-20 text-cybermed-cyan" />,
      text: "Welcome to EMF Resonance. You and two other doctors will form a Clinical Board. Together, you must diagnose and treat complex patients using advanced electromagnetic therapies.",
      color: "border-cybermed-cyan",
      shadow: "shadow-[0_0_30px_rgba(6,182,212,0.4)]"
    },
    {
      title: "PHASE 1: SOLO ANALYSIS",
      subtitle: "Review the patient confidentially",
      icon: <Stethoscope className="w-20 h-20 text-purple-400" />,
      text: "Each doctor will be assigned a unique role: Biophysicist, Clinical Strategist, or Safety Expert. You will independently review the case and lock in your individual analysis.",
      color: "border-purple-400",
      shadow: "shadow-[0_0_30px_rgba(192,132,252,0.4)]"
    },
    {
      title: "PHASE 2: THE CONSOLE",
      subtitle: "Synchronize your treatment plan",
      icon: <Zap className="w-20 h-20 text-yellow-400" />,
      text: "Once all 3 doctors submit their solo analysis, the central console will unlock. You must collaborate to set the correct Penetration Frequency, select the Therapy Modality, and finally Authorize (Unlock) the machine.",
      color: "border-yellow-400",
      shadow: "shadow-[0_0_30px_rgba(250,204,21,0.4)]"
    },
    {
      title: "TOURNAMENT RULES",
      subtitle: "Survive the clinical board",
      icon: <ShieldAlert className="w-20 h-20 text-red-500" />,
      text: "Your team has exactly 3 attempts to get a 100% cure rate. WARNING: Fatal errors, such as treating a patient with a cardiac pacemaker, will instantly terminate your team and send you to the Spectator Tribune!",
      color: "border-red-500",
      shadow: "shadow-[0_0_30px_rgba(239,68,68,0.4)]"
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
              className="mb-8 p-6 bg-white/5 rounded-full backdrop-blur-sm border border-white/10"
            >
              {currentStep.icon}
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
