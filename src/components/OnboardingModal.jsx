import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, MousePointer2, ShieldAlert, Users, Zap, Heart, Lock, Unlock, FileText, Activity } from 'lucide-react';

export const OnboardingModal = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "STEP 1: LOGIN & TEAM CODE",
      subtitle: "How to connect together",
      text: "Every player must enter their own Name, but you MUST all enter the EXACT SAME Team Code to end up in the same group.",
      color: "border-blue-500",
      shadow: "shadow-[0_0_50px_rgba(59,130,246,0.3)]",
      glow: "bg-blue-500/20",
      visual: () => (
        <div className="relative w-full h-56 bg-black/40 border border-white/10 rounded-3xl flex flex-col items-center justify-center overflow-hidden p-6 backdrop-blur-xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/30 rounded-full blur-[60px]"></div>

          <motion.div
            className="absolute z-50 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [120, 10,  10,   50, 50,  120], 
               y: [100, -20, -20,  5,  5,   100], 
               scale: [1, 1, 0.8, 1, 0.8, 1] 
            }}
            transition={{ duration: 5, repeat: Infinity, times: [0, 0.2, 0.25, 0.45, 0.5, 0.8] }}
          >
            <MousePointer2 className="w-6 h-6 fill-white/50 stroke-white stroke-2" />
          </motion.div>

          <div className="w-full max-w-[220px] mb-3 bg-black/80 border border-white/10 rounded-xl p-3 text-xs text-white/50 shadow-inner z-10">
            Player Name
            <motion.div animate={{ opacity:[0,1,1,1] }} transition={{ duration: 5, repeat: Infinity }} className="text-white font-bold text-sm mt-1">Alex</motion.div>
          </div>

          <motion.div 
            animate={{ 
              borderColor: ['rgba(255,255,255,0.1)', 'rgba(59,130,246,0.8)', 'rgba(255,255,255,0.1)'],
              boxShadow: ['0 0 0px rgba(59,130,246,0)', '0 0 20px rgba(59,130,246,0.4)', '0 0 0px rgba(59,130,246,0)']
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-full max-w-[220px] bg-black/80 border border-white/10 rounded-xl p-3 text-xs text-white/50 z-10"
          >
            Team Code
            <div className="text-blue-400 font-black text-sm mt-1 tracking-widest flex">
               {['G','R','O','U','P','_','5'].map((char, i) => (
                  <motion.span key={i} animate={{ opacity:[0,1] }} transition={{ duration: 0.1, delay: i*0.1 + 1.5, repeat: Infinity, repeatDelay: 5 }}>
                    {char}
                  </motion.span>
               ))}
               <motion.span animate={{ opacity:[0,1,0] }} transition={{ duration: 0.5, repeat: Infinity }} className="ml-1 w-1.5 h-4 bg-blue-400"></motion.span>
            </div>
          </motion.div>

          <div className="flex gap-4 mt-6 z-10 relative">
            <motion.div animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }} transition={{ delay: 3, duration: 5, repeat: Infinity }} className="bg-blue-500 text-white p-2 rounded-full shadow-[0_0_15px_#3b82f6]"><Users className="w-5 h-5"/></motion.div>
            <motion.div animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }} transition={{ delay: 3.2, duration: 5, repeat: Infinity }} className="bg-blue-500 text-white p-2 rounded-full shadow-[0_0_15px_#3b82f6]"><Users className="w-5 h-5"/></motion.div>
            <motion.div animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }} transition={{ delay: 3.4, duration: 5, repeat: Infinity }} className="bg-blue-500 text-white p-2 rounded-full shadow-[0_0_15px_#3b82f6]"><Users className="w-5 h-5"/></motion.div>
            
            <motion.div animate={{ width: [0, 40], opacity: [0, 1] }} transition={{ delay: 3.5, duration: 5, repeat: Infinity }} className="absolute top-1/2 left-8 h-0.5 bg-blue-400 -z-10"></motion.div>
            <motion.div animate={{ width: [0, 40], opacity: [0, 1] }} transition={{ delay: 3.6, duration: 5, repeat: Infinity }} className="absolute top-1/2 left-20 h-0.5 bg-blue-400 -z-10"></motion.div>
          </div>
        </div>
      )
    },
    {
      title: "STEP 2: CHOOSE ROLES",
      subtitle: "Divide the responsibilities",
      text: "Your team needs exactly 1 Biophysicist, 1 Clinical Strategist, and 1 Safety Expert. Talk to your team and pick unique roles!",
      color: "border-cyan-400",
      shadow: "shadow-[0_0_50px_rgba(34,211,238,0.3)]",
      glow: "bg-cyan-400/20",
      visual: () => (
        <div className="relative w-full h-56 bg-black/40 border border-white/10 rounded-3xl flex flex-col items-center justify-center overflow-hidden p-6 perspective-[1000px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400/20 rounded-full blur-[60px]"></div>

          <motion.div
            className="absolute z-50 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [120, 0, 0, 120], 
               y: [120, -10, -10, 120], 
               scale: [1, 1, 0.8, 1] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.4, 0.8] }}
          >
            <MousePointer2 className="w-6 h-6 fill-white/50 stroke-white stroke-2" />
          </motion.div>

          {['Biophysicist', 'Strategist', 'Safety Expert'].map((role, i) => (
            <motion.div 
              key={i}
              animate={i === 0 ? { 
                scale: [1, 1, 1.1, 1.1, 1],
                backgroundColor: ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(34,211,238,0.2)', 'rgba(34,211,238,0.2)', 'rgba(0,0,0,0.8)'],
                borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'rgba(34,211,238,1)', 'rgba(34,211,238,1)', 'rgba(255,255,255,0.1)'],
                boxShadow: ['none', 'none', '0 0 30px rgba(34,211,238,0.5)', '0 0 30px rgba(34,211,238,0.5)', 'none']
              } : i === 1 ? {
                opacity: [1, 1, 0.4, 0.4, 1]
              } : {
                opacity: [1, 1, 0.4, 0.4, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ rotateX: 10, rotateY: i === 0 ? 5 : i === 2 ? -5 : 0 }}
              className="w-full max-w-[220px] mb-2 bg-black/80 border border-white/10 p-3 rounded-xl text-xs uppercase font-black flex justify-between items-center z-10 transition-all"
            >
              <div className="flex items-center gap-2">
                 <Users className={`w-4 h-4 ${i===0 ? 'text-cyan-400' : 'text-white/30'}`}/>
                 <span className={i===0 ? 'text-white' : 'text-white/50'}>{role}</span>
              </div>
              {i === 1 && <span className="text-[9px] text-white/30 bg-white/5 px-2 py-0.5 rounded">Taken</span>}
            </motion.div>
          ))}
        </div>
      )
    },
    {
      title: "STEP 3: SOLO ANALYSIS",
      subtitle: "Read the case & lock in your choice",
      text: "Read the clinical case alone. Select the correct Therapy Modality based on the symptoms and submit it confidentially.",
      color: "border-purple-500",
      shadow: "shadow-[0_0_50px_rgba(168,85,247,0.3)]",
      glow: "bg-purple-500/20",
      visual: () => (
        <div className="relative w-full h-56 bg-black/40 border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden flex-col gap-3 p-6 backdrop-blur-xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/30 rounded-full blur-[60px]"></div>
          
          <motion.div
            className="absolute z-50 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [150, 0, 0,    0,   0, 150], 
               y: [100, -10, -10, 45, 45, 100], 
               scale: [1, 1, 0.8, 1, 0.8, 1] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.5, 0.55, 0.8] }}
          >
            <MousePointer2 className="w-6 h-6 fill-white/50 stroke-white stroke-2" />
          </motion.div>

          <div className="w-full max-w-[220px] bg-black/80 border border-white/10 p-3 rounded-xl text-[10px] text-white/70 mb-1 z-10 shadow-inner overflow-hidden">
             <div className="flex items-center gap-1 text-purple-400 font-bold mb-1 uppercase"><FileText className="w-3 h-3"/> Case File</div>
             <motion.div animate={{ y: [0, -20] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="leading-relaxed">
               Patient presents with deep muscle spasms in the lower back...
             </motion.div>
          </div>

          <motion.div 
            animate={{ 
               backgroundColor: ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(168,85,247,0.3)', 'rgba(168,85,247,0.3)'],
               borderColor: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)', 'rgba(168,85,247,1)', 'rgba(168,85,247,1)'] 
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-full max-w-[220px] bg-black/80 border border-white/10 py-3 rounded-xl text-[10px] font-black text-white text-center z-10 flex items-center justify-between px-4 uppercase tracking-widest"
          >
            MODALITY: <span className="text-purple-400">UHF</span> <Activity className="w-3 h-3 text-purple-400"/>
          </motion.div>

          <motion.div 
            animate={{ opacity: [1, 1, 1, 1, 0], scale: [1,1,1,1,1.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-full max-w-[220px] bg-purple-500 text-white py-3 rounded-xl text-[11px] font-black tracking-widest text-center mt-1 z-10 shadow-[0_0_20px_rgba(168,85,247,0.5)] uppercase"
          >
            SUBMIT ANALYSIS
          </motion.div>

          <motion.div 
            animate={{ opacity: [0,0,0,0,1,1], scale: [0.8, 0.8, 0.8, 0.8, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-x-8 bottom-6 bg-purple-600 border border-purple-400 text-white py-4 rounded-2xl text-[12px] font-black tracking-widest text-center flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(168,85,247,1)] z-20"
          >
            <CheckCircle className="w-5 h-5"/> DATA SECURED
          </motion.div>
        </div>
      )
    },
    {
      title: "STEP 4: GROUP CONSOLE",
      subtitle: "Unlocking actual treatment",
      text: "When the console unlocks, talk to your team! Decide the Frequency, verify the Modality, and hit the Safety Override to initiate.",
      color: "border-yellow-500",
      shadow: "shadow-[0_0_50px_rgba(234,179,8,0.3)]",
      glow: "bg-yellow-500/20",
      visual: () => (
        <div className="relative w-full h-64 bg-black/40 border border-white/10 rounded-3xl flex flex-col justify-center items-center gap-4 p-6 backdrop-blur-xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-yellow-500/20 rounded-full blur-[70px]"></div>
          
          <motion.div
            className="absolute z-50 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [150, -50, 40,  40, 0,   0,  0, 0, 150], 
               y: [150, -70, -70,-70, -10,-10, 50, 50, 150],
               scale:[1, 1,   1,   1, 1, 0.8, 1, 0.8, 1] 
            }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.35, 0.4, 0.55, 0.6, 0.75, 0.8, 1] }}
          >
            <MousePointer2 className="w-6 h-6 fill-white/50 stroke-white stroke-2" />
          </motion.div>

          <div className="w-full bg-black/80 border border-white/10 rounded-xl p-4 z-10">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black tracking-widest text-cyan-400">FREQ</span>
              <motion.span animate={{ opacity:[0.5,1,0.5] }} transition={{duration:2, repeat:Infinity}} className="text-xs font-mono font-bold text-white">50 Hz</motion.span>
            </div>
            <div className="h-3 bg-cyan-500/20 rounded-full w-full relative overflow-hidden">
              <motion.div 
                animate={{ width: ['20%', '20%', '80%', '80%', '80%'] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute left-0 top-0 h-full bg-cyan-500 rounded-full shadow-[0_0_15px_#06b6d4]"
              ></motion.div>
            </div>
          </div>

          <div className="flex gap-4 w-full z-10">
            <div className="flex-1 bg-black/80 border border-white/10 rounded-xl p-3 flex flex-col justify-center items-center">
              <div className="text-[8px] uppercase tracking-widest text-white/50 mb-1">Modality</div>
              <div className="text-xs font-black uppercase text-yellow-400">MAG</div>
            </div>
            
            <motion.div 
              animate={{ 
                backgroundColor: ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(34,197,94,0.2)', 'rgba(34,197,94,0.2)'],
                borderColor: ['rgba(239,68,68,0.5)', 'rgba(239,68,68,0.5)', 'rgba(239,68,68,0.5)', 'rgba(34,197,94,0.5)', 'rgba(34,197,94,0.5)'],
                color: ['rgba(239,68,68,1)', 'rgba(239,68,68,1)', 'rgba(239,68,68,1)', 'rgba(34,197,94,1)', 'rgba(34,197,94,1)']
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="flex-1 border rounded-xl flex items-center justify-center flex-col p-2"
            >
              <div className="text-[8px] uppercase tracking-widest text-white/50 mb-1">Safety</div>
              <motion.div animate={{ rotateY: [0, 0, 0, 180, 180] }} transition={{ duration: 6, repeat: Infinity }}>
                 <Lock className="w-5 h-5 absolute opacity-100" style={{ backfaceVisibility: 'hidden' }} />
                 <Unlock className="w-5 h-5" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}/>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
             animate={{
                backgroundColor: ['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.8)', 'rgba(6,182,212,1)'],
                boxShadow: ['none', 'none', 'none', 'none', '0 0 30px rgba(6,182,212,0.8)'],
                color: ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)', '#000'],
                scale: [1, 1, 1, 1, 1.05]
             }}
             transition={{ duration: 6, repeat: Infinity }}
             className="w-full border border-white/10 py-4 rounded-xl text-xs font-black tracking-widest text-center uppercase z-10"
          >
             INITIATE TREATMENT
          </motion.div>
        </div>
      )
    },
    {
      title: "STEP 5: INSTANT DEATH",
      subtitle: "Tournament Elimination",
      text: "You have 3 lives. Ignoring an absolute contraindication (e.g. Pacemaker) is a FATAL ERROR. The patient dies, and you are sent to the Spectators Tribunal.",
      color: "border-red-600",
      shadow: "shadow-[0_0_60px_rgba(220,38,38,0.5)]",
      glow: "bg-red-600/30",
      visual: () => (
        <div className="relative w-full h-60 bg-black/40 border border-white/10 rounded-3xl flex flex-col items-center justify-center overflow-hidden p-6 backdrop-blur-xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-red-600/20 rounded-full blur-[70px]"></div>

          <motion.div
            className="absolute z-50 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] text-white"
            animate={{ 
               x: [180, 0, 0, 180], 
               y: [150, 10, 10, 150],
               scale:[1, 1, 0.8, 1] 
            }}
            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.25, 0.6] }}
          >
            <MousePointer2 className="w-6 h-6 fill-white/50 stroke-white stroke-2" />
          </motion.div>

          <div className="flex gap-3 mb-6 relative z-10">
             {[0,1,2].map(i => (
               <motion.div 
                 key={i}
                 animate={{ 
                    opacity: [1, 1, 1, 0.2, 0.2], 
                    scale: [1, 1, 1, 0.5, 0.5],
                    y: [0, 0, 0, 20, 20],
                    rotate: [0, 0, 0, i % 2 === 0 ? 45 : -45, i % 2 === 0 ? 45 : -45]
                 }}
                 transition={{ duration: 4, repeat: Infinity }}
               >
                 <Heart className="w-8 h-8 text-red-500 fill-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)]"/>
               </motion.div>
             ))}
          </div>

          <div className="text-[10px] text-red-100 bg-red-900/50 border border-red-500/50 px-4 py-2 mb-4 rounded-lg font-black uppercase tracking-widest z-10 backdrop-blur-md">
            <Zap className="w-3 h-3 inline mr-2 text-red-400"/> PATIENT HAS PACEMAKER <Zap className="w-3 h-3 inline ml-2 text-red-400"/>
          </div>

          <div className="w-40 bg-black/80 border border-white/10 py-3 rounded-xl text-[10px] font-black tracking-widest text-center text-white/50 mb-4 z-10 shadow-inner">
            INITIATE
          </div>

          <motion.div 
            animate={{ opacity: [0, 0, 0, 1, 1], scale: [0.5, 0.5, 0.5, 1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-2 bg-red-950/90 backdrop-blur-xl border border-red-500 rounded-2xl flex items-center justify-center flex-col z-20 shadow-[0_0_50px_rgba(220,38,38,0.8)]"
          >
            <motion.div animate={{ rotate: [0, -10, 10, -10, 10, 0] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.8, 0.85, 0.9, 0.95, 1] }}>
              <ShieldAlert className="w-16 h-16 text-red-500 mb-3 drop-shadow-[0_0_20px_rgba(239,68,68,1)]"/>
            </motion.div>
            <div className="text-3xl font-black text-red-500 block tracking-tighter drop-shadow-[0_0_10px_rgba(239,68,68,1)]">FATAL ERROR</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-red-300 mt-2 bg-red-900/50 px-3 py-1 rounded">Spectator License Revoked</div>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-2xl">
      <motion.div 
        key={step}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className={`w-full max-w-2xl bg-black/60 border ${currentStep.color} rounded-3xl p-8 md:p-10 relative overflow-hidden transition-all duration-700 ${currentStep.shadow}`}
      >
        <div className={`absolute -top-32 -left-32 w-64 h-64 ${currentStep.glow} blur-[100px] rounded-full opacity-50`}></div>

        <div className="flex gap-2 mb-8 relative z-10">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? `bg-white` : 'bg-white/10'}`} />
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-8 relative z-10 w-full min-h-[350px]">
          <motion.div 
            key={`text-${step}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col justify-center"
          >
            <h2 className={`text-[11px] uppercase tracking-widest mb-2 font-black ${currentStep.color.replace('border-', 'text-')}`}>
              Step 0{step + 1}
            </h2>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter leading-tight">{currentStep.title}</h1>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              {currentStep.text}
            </p>
          </motion.div>
          
          <motion.div 
             key={`visual-${step}`}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             className="flex-1 flex items-center justify-center"
          >
             {currentStep.visual()}
          </motion.div>
        </div>

        <div className="mt-8 flex gap-4 relative z-10">
          {step > 0 && (
            <button 
              onClick={handlePrev}
              className="flex-none p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <button 
            onClick={handleNext}
            className={`flex-1 py-5 px-8 rounded-2xl text-sm font-black tracking-widest uppercase flex items-center justify-center gap-3 transition-all backdrop-blur-md ${
              isLast 
                ? 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:bg-red-500 hover:scale-[1.02] border border-red-400/50' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10 hover:border-white/30'
            }`}
          >
            {isLast ? (
              <><CheckCircle className="w-5 h-5" /> ACCEPT MISSION & SURVIVE</>
            ) : (
              <>NEXT MODULE <ChevronRight className="w-5 h-5" /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
