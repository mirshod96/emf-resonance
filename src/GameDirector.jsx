import React from 'react';
import { useSocket } from './context/SocketContext';
import { Lobby } from './components/Lobby';
import { RoleAssignment } from './components/RoleAssignment';
import { GroupConsole } from './components/GroupConsole';
import { AnimatePresence, motion } from 'framer-motion';

const GameDirector = () => {
  const { phase } = useMockSocket();

  return (
    <AnimatePresence mode="wait">
      {phase.startsWith('lobby') && (
        <motion.div key="lobby" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Lobby />
        </motion.div>
      )}
      {phase === 'solo' && (
        <motion.div key="solo" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, filter: "blur(10px)" }}>
          <RoleAssignment />
        </motion.div>
      )}
      {phase === 'group' && (
        <motion.div key="group" initial={{ opacity: 0, filter: "brightness(5)" }} animate={{ opacity: 1, filter: "brightness(1)" }}>
          <GroupConsole />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameDirector;
