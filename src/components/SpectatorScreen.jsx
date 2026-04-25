import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ShieldAlert, Users, Zap, CheckCircle, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from '../context/SocketContext';

export const SpectatorScreen = () => {
  const { roomCode } = useSocket();
  const [rooms, setRooms] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to the same socket URL, but specifically ask for admin sync logic
    const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || undefined;
    const spectateSocket = io(SOCKET_URL);

    spectateSocket.on('connect', () => {
      setIsConnected(true);
      spectateSocket.emit('join_admin'); // We reuse join_admin to get the sync
    });

    spectateSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    spectateSocket.on('admin_sync', (roomsData) => {
      setRooms(roomsData);
    });

    return () => {
      spectateSocket.disconnect();
    };
  }, []);

  const getPhaseName = (phase) => {
    switch(phase) {
      case 'lobby-waiting': return 'PREPARING';
      case 'solo': return 'ANALYZING';
      case 'group': return 'TREATING';
      case 'results': return 'FINISHED';
      case 'spectator': return 'SPECTATING';
      default: return phase.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen bg-[#020813] text-white p-6 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-[20%] left-[10%] w-96 h-96 border-[40px] border-cybermed-teal rounded-full blur-[80px]"></div>
         <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] border-[50px] border-cybermed-cyan rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto z-10 relative">
        <header className="flex justify-between items-center mb-8 border-b border-cybermed-slate/40 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-cybermed-teal/20 p-3 rounded-xl border border-cybermed-teal">
              <Eye className="w-8 h-8 text-cybermed-cyan" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-widest">SPECTATOR <span className="text-cybermed-teal">MODE</span></h1>
              <p className="text-cybermed-teal/60 font-medium uppercase tracking-widest text-xs mt-1">Observing Active Medical Boards</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs font-bold uppercase tracking-widest text-cybermed-slate">Your Team:</span>
            <span className="text-sm font-black uppercase tracking-widest text-cybermed-cyan bg-cybermed-cyan/10 px-3 py-1 rounded border border-cybermed-cyan/30">
              {roomCode || 'UNKNOWN'}
            </span>
          </div>
        </header>

        {Object.keys(rooms).length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 bg-black/40 rounded-3xl border border-cybermed-slate/50">
            <Users className="w-12 h-12 text-cybermed-slate mb-4 animate-pulse" />
            <p className="text-cybermed-teal text-center uppercase tracking-widest text-sm">No active teams remaining.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {Object.entries(rooms).sort((a,b) => {
                 // Sort own team to the bottom or completely remove it? 
                 // Let's show it but visually distinguish
                 if (a[0] === roomCode) return 1;
                 if (b[0] === roomCode) return -1;
                 return 0;
              }).map(([code, room]) => {
                const isMyTeam = code === roomCode;

                return (
                  <motion.div 
                    key={code}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`border rounded-2xl flex flex-col overflow-hidden backdrop-blur-md transition-all ${isMyTeam ? 'bg-black/80 border-cybermed-slate/30 opacity-60 grayscale' : 'bg-black/60 border-cybermed-teal/30 hover:border-cybermed-cyan/60 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]'}`}
                  >
                    <div className="bg-black/60 p-4 flex justify-between items-center border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-black tracking-widest text-white">{code}</h2>
                        {isMyTeam && <span className="text-[9px] uppercase font-bold text-cybermed-slate bg-white/10 px-2 py-0.5 rounded">You</span>}
                      </div>
                      <div className={`text-[9px] uppercase font-bold px-2 py-1 rounded tracking-wider border ${
                        room.phase === 'results' || room.phase === 'spectator' ? 'text-purple-400 border-purple-400/30' :
                        room.phase === 'group' ? 'text-cybermed-cyan border-cybermed-cyan/30 animate-pulse' :
                        'text-yellow-500 border-yellow-500/30'
                      }`}>
                        {getPhaseName(room.phase)}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col gap-4">
                      {/* Status */}
                      {room.phase === 'group' && (
                        <div>
                          <div className="text-[10px] text-cybermed-teal uppercase tracking-widest mb-2 flex justify-between">
                            <span>Live Parameters</span>
                            <span className="text-red-400">{room.attemptsLeft} chances left</span>
                          </div>
                          <div className="bg-white/5 rounded-xl p-3 border border-white/10 grid grid-cols-2 gap-2 text-center text-xs">
                            <div><span className="text-cybermed-slate block mb-1 scale-75">FREQ</span><span className="font-mono">{room.patientState.frequency}Hz</span></div>
                            <div><span className="text-cybermed-slate block mb-1 scale-75">LOCK</span><span className={room.patientState.isAuthorized ? "text-green-500" : "text-red-500"}>{room.patientState.isAuthorized ? "OPEN" : "SAFE"}</span></div>
                          </div>
                        </div>
                      )}

                      {(room.phase === 'results' || room.phase === 'spectator') && room.scoreData && (
                        <div className="flex-1 flex flex-col items-center justify-center bg-white/5 rounded-xl border border-white/10 p-4">
                           <div className="text-[10px] uppercase tracking-widest text-cybermed-slate mb-2">Final Evaluation</div>
                           {room.scoreData.score === 100 ? (
                             <div className="text-3xl font-black text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]">100%</div>
                           ) : room.scoreData.score === 0 && room.attemptsLeft === 0 ? (
                             <div className="text-xl font-black text-red-500 flex items-center gap-2"><ShieldAlert className="w-5 h-5"/> ELIMINATED</div>
                           ) : (
                             <div className="text-2xl font-black text-yellow-400">{room.scoreData.score}%</div>
                           )}
                        </div>
                      )}

                      {room.phase !== 'group' && room.phase !== 'results' && room.phase !== 'spectator' && (
                         <div className="flex-1 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 p-4">
                            <span className="text-xs text-cybermed-slate uppercase tracking-widest text-center">Preparing Treatment...</span>
                         </div>
                      )}

                      <div className="text-[10px] text-cybermed-slate/60 text-center uppercase tracking-widest pt-2 border-t border-white/5">
                        Students: {room.players.map(p => p.name).join(', ') || 'None'}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
