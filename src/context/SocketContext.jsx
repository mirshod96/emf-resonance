import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

// Connect dynamically. Locally it connects to the hosting domain (localtunnel).
// In production (Vercel), it will use the VITE_BACKEND_URL environment variable.
const SOCKET_URL = import.meta.env.VITE_BACKEND_URL || undefined;
const socket = io(SOCKET_URL, { autoConnect: false });

export const SocketProvider = ({ children }) => {
  const [phase, setPhase] = useState('lobby'); // 'lobby', 'lobby-waiting', 'solo', 'group'
  const [roomCode, setRoomCode] = useState('');
  const [myPlayer, setMyPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [patientState, setPatientState] = useState({
    frequency: 50, // Hz
    modality: '',
    isAuthorized: false,
  });

  useEffect(() => {
    socket.connect();

    socket.on('join_success', ({ roomCode: rCode, role, id }) => {
      setRoomCode(rCode);
      setMyPlayer({ id, role, taskCompleted: false });
      setPhase('lobby-waiting');
      setErrorMessage('');
    });

    socket.on('sync_room', (data) => {
      setPlayers(data.players);
      setPhase(data.phase);
      setPatientState(data.patientState);
      
      // Update myPlayer's taskCompleted status locally if synced from server
      setMyPlayer(prev => {
        if (!prev) return null;
        const serverMe = data.players.find(p => p.socketId === socket.id || p.id === socket.id || p.id === prev.id);
        return serverMe ? { ...prev, taskCompleted: serverMe.taskCompleted } : prev;
      });
    });

    socket.on('room_full_error', ({ message }) => {
      setErrorMessage(message);
    });

    return () => {
      socket.off('join_success');
      socket.off('sync_room');
      socket.off('room_full_error');
    };
  }, []);

  const joinRoom = (name, code) => {
    socket.emit('join_room', { name, code });
  };

  const completeSoloTask = () => {
    setMyPlayer(prev => ({ ...prev, taskCompleted: true }));
    socket.emit('submit_solo_task');
  };

  const updatePatientState = (updates) => {
    // Optimistic UI update
    setPatientState(prev => ({ ...prev, ...updates }));
    socket.emit('update_patient_state', updates);
  };

  return (
    <SocketContext.Provider value={{
      phase,
      roomCode,
      myPlayer,
      players,
      patientState,
      errorMessage,
      joinRoom,
      completeSoloTask,
      updatePatientState
    }}>
      {children}
    </SocketContext.Provider>
  );
};
