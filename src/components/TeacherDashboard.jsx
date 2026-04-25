import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ShieldAlert, Users, Zap, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const TeacherDashboard = () => {
  const [rooms, setRooms] = useState({});
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect as Admin
    const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || undefined;
    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join_admin');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('admin_sync', (roomsData) => {
      setRooms(roomsData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getPhaseColor = (phase) => {
    switch(phase) {
      case 'lobby-waiting': return 'text-yellow-500 border-yellow-500/30 bg-yellow-500/10';
      case 'solo': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'group': return 'text-cybermed-cyan border-cybermed-cyan/30 bg-cybermed-cyan/10';
      case 'results': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  const getPhaseName = (phase) => {
    switch(phase) {
      case 'lobby-waiting': return 'WAITING TO START';
      case 'solo': return 'PHASE 1: SOLO MASTERY';
      case 'group': return 'PHASE 2: GROUP CONSOLE';
      case 'results': return 'PHASE 3: FINISHED';
      default: return phase.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen bg-cybermed-dark text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-cybermed-slate pb-6">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-cybermed-cyan to-white bg-clip-text text-transparent tracking-widest">INSTRUCTOR OVERVIEW</h1>
            <p className="text-cybermed-teal font-medium uppercase tracking-widest text-xs mt-1">Real-time Clinical Board Monitor</p>
          </div>
          <div className="flex items-center gap-3 bg-black/40 px-4 py-2 rounded-xl border border-cybermed-slate">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-xs font-bold uppercase tracking-wider text-cybermed-teal">
              {isConnected ? 'Server Connected' : 'Offline'}
            </span>
          </div>
        </header>

        {Object.keys(rooms).length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 bg-black/20 rounded-2xl border border-cybermed-slate border-dashed">
            <Users className="w-16 h-16 text-cybermed-slate mb-4" />
            <p className="text-cybermed-teal text-center uppercase tracking-widest">No active teams.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(rooms).map(([code, room]) => (
              <motion.div 
                key={code}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-cybermed-slate/20 border border-cybermed-slate rounded-2xl flex flex-col overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-black/40 p-4 border-b border-cybermed-slate flex justify-between items-center">
                  <h2 className="text-xl font-black tracking-widest text-white">{code}</h2>
                  <div className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full border ${getPhaseColor(room.phase)}`}>
                    {getPhaseName(room.phase)}
                  </div>
                </div>

                {/* Patient Case Mini */}
                {room.clinicalCase && (
                  <div className="px-4 py-3 bg-blue-900/10 border-b border-cybermed-slate/50">
                    <p className="text-[10px] text-cybermed-cyan uppercase font-bold tracking-wider mb-1">Target Patient</p>
                    <p className="text-xs text-cybermed-teal leading-tight">{room.clinicalCase.title}</p>
                  </div>
                )}

                {/* Live Metrics (Only during Group Phase) */}
                {room.phase === 'group' && (
                  <div className="p-4 bg-cybermed-teal/5 border-b border-cybermed-slate grid grid-cols-3 gap-2 text-center">
                    <div className="bg-black/30 rounded p-2 border border-cybermed-slate/50">
                       <Zap className="w-4 h-4 mx-auto mb-1 text-cybermed-teal"/>
                       <div className="text-xs font-bold text-white">{room.patientState.frequency}Hz</div>
                    </div>
                    <div className="bg-black/30 rounded p-2 border border-cybermed-slate/50">
                       <Activity className="w-4 h-4 mx-auto mb-1 text-cybermed-teal"/>
                       <div className="text-[10px] font-bold text-white leading-tight truncate">{room.patientState.modality || 'None'}</div>
                    </div>
                    <div className={`rounded p-2 border ${room.patientState.isAuthorized ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
                       <ShieldAlert className={`w-4 h-4 mx-auto mb-1 ${room.patientState.isAuthorized ? 'text-green-500' : 'text-red-500'}`}/>
                       <div className={`text-[10px] font-bold ${room.patientState.isAuthorized ? 'text-green-500' : 'text-red-500'}`}>
                         {room.patientState.isAuthorized ? 'UNLOCKED' : 'LOCKED'}
                       </div>
                    </div>
                  </div>
                )}

                {/* Results Phase */}
                {room.phase === 'results' && room.scoreData && (
                  <div className="p-4 border-b border-cybermed-slate flex items-center justify-center bg-black/40">
                    {room.scoreData.score === 100 ? (
                      <div className="text-green-400 flex items-center font-bold text-lg"><CheckCircle className="w-6 h-6 mr-2"/> SCORE: 100%</div>
                    ) : room.scoreData.score === 0 ? (
                      <div className="text-red-500 flex items-center font-bold text-lg"><ShieldAlert className="w-6 h-6 mr-2"/> FATAL ERROR</div>
                    ) : (
                      <div className="text-yellow-400 flex items-center font-bold text-lg">SCORE: {room.scoreData.score}%</div>
                    )}
                  </div>
                )}

                {/* Players List */}
                <div className="p-4 flex-1">
                  <h3 className="text-[10px] uppercase tracking-widest text-cybermed-slate mb-3">Connected Students ({room.players.length}/3)</h3>
                  <div className="space-y-2">
                    {room.players.map(p => (
                      <div key={p.id} className="flex justify-between items-center text-xs bg-black/20 p-2 rounded border border-cybermed-slate/30">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${p.connected ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                          <span className="font-bold text-white max-w-[120px] truncate">{p.name}</span>
                        </div>
                        <span className="text-[10px] text-cybermed-teal bg-cybermed-teal/10 px-2 py-0.5 rounded">{p.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
