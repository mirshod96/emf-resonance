import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

// Serve the built React frontend
app.use(express.static('dist'));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins so any phone on the network can connect
    methods: ["GET", "POST"]
  }
});

const ROLES = ['Biophysicist', 'Clinical Strategist', 'Safety Expert'];
import { generateCases } from './caseGenerator.js';

// Generate 100 unique procedural cases at server start
let availableCases = generateCases(100);

const getRandomUnusedCase = () => {
  if (availableCases.length === 0) {
    // If we run out of 100 cases, generate a fresh batch of 100
    availableCases = generateCases(100);
  }
  const index = Math.floor(Math.random() * availableCases.length);
  return availableCases.splice(index, 1)[0]; // Remove and return
};

// Store rooms state in memory
const rooms = {};

const broadcastAdminSync = () => {
  io.to('admin').emit('admin_sync', rooms);
};

io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);

  // Admin Room Setup
  socket.on('join_admin', () => {
    socket.join('admin');
    console.log(`[Socket] Admin connected: ${socket.id}`);
    socket.emit('admin_sync', rooms);
  });

  // 1. Join Room
  socket.on('join_room', ({ name, code }) => {
    const roomCode = code.toUpperCase();
    
    // Initialize room if it doesn't exist
    if (!rooms[roomCode]) {
      const randomCase = getRandomUnusedCase();
      rooms[roomCode] = {
        players: [],
        availableRoles: [...ROLES],
        clinicalCase: randomCase,
        patientState: {
          frequency: 50,
          modality: '',
          isAuthorized: false,
        },
        phase: 'lobby-waiting',
        scoreData: null,
        attemptsLeft: 3
      };
    }

    const room = rooms[roomCode];

    // Reject if room is full
    if (room.players.length >= 3 && room.phase !== 'lobby-waiting') {
      socket.emit('room_full_error', { message: 'This clinical board is already full/in-progress.' });
      return;
    }

    // Assign Role
    let assignedRole = "Observer";
    if (room.availableRoles.length > 0) {
      // Pick random role from available
      const randomRoleIdx = Math.floor(Math.random() * room.availableRoles.length);
      assignedRole = room.availableRoles.splice(randomRoleIdx, 1)[0];
    }

    const playerObj = {
      id: socket.id, // using socket id as temp unique ID
      socketId: socket.id,
      name,
      role: assignedRole,
      taskCompleted: false,
      connected: true
    };

    room.players.push(playerObj);

    socket.join(roomCode);
    socket.roomId = roomCode;
    socket.playerId = socket.id;

    console.log(`[Socket] ${name} joined ${roomCode} as ${assignedRole}`);

    // Acknowledge the join to the specific user
    socket.emit('join_success', { 
      roomCode, 
      role: assignedRole,
      id: socket.id,
      name // pass it back to frontend
    });

    // Check phase logic: If 3 players are in the room, phase => solo
    if (room.players.length === 3 && room.phase === 'lobby-waiting') {
      room.phase = 'solo';
    }

    // Broadcast room state to everyone in the room
    io.to(roomCode).emit('sync_room', {
      players: room.players,
      phase: room.phase,
      clinicalCase: room.clinicalCase,
      patientState: room.patientState,
      scoreData: room.scoreData,
      attemptsLeft: room.attemptsLeft
    });
    
    broadcastAdminSync();
  });

  // 2. Submit Solo Task
  socket.on('submit_solo_task', () => {
    if (!socket.roomId) return;
    const room = rooms[socket.roomId];
    if (!room) return;

    const player = room.players.find(p => p.id === socket.playerId || p.socketId === socket.id);
    if (player) {
      player.taskCompleted = true;
      console.log(`[Socket] ${player.name} completed solo task in ${socket.roomId}`);
    }

    // Check if all 3 players completed the task
    const allCompleted = room.players.length === 3 && room.players.every(p => p.taskCompleted);
    if (allCompleted && room.phase === 'solo') {
      room.phase = 'group';
    }

    // Broadcast
    io.to(socket.roomId).emit('sync_room', {
      players: room.players,
      phase: room.phase,
      clinicalCase: room.clinicalCase,
      patientState: room.patientState,
      scoreData: room.scoreData,
      attemptsLeft: room.attemptsLeft
    });
    
    broadcastAdminSync();
  });

  // 3. Update Patient State (Phase 2 changes)
  socket.on('update_patient_state', (updates) => {
    if (!socket.roomId) return;
    const room = rooms[socket.roomId];
    if (!room) return;

    room.patientState = { ...room.patientState, ...updates };

    // Broadcast
    io.to(socket.roomId).emit('sync_room', {
      players: room.players,
      phase: room.phase,
      clinicalCase: room.clinicalCase,
      patientState: room.patientState,
      scoreData: room.scoreData,
      attemptsLeft: room.attemptsLeft
    });

    broadcastAdminSync();
  });

  // Calculate Score logic
  socket.on('evaluate_treatment', () => {
    if (!socket.roomId) return;
    const room = rooms[socket.roomId];
    if (!room) return;

    const pState = room.patientState;
    const cCase = room.clinicalCase;

    let score = 100;
    let feedback = [];

    // Critical Failure: Shocked a pacemaker
    if (cCase.requiresLock && pState.isAuthorized) {
      score = 0;
      room.attemptsLeft = 0; // INSTANT DEATH
      feedback.push("FATAL ERROR: Treatment applied despite absolute contraindication (Pacemaker). Patient safety compromised. MEDICAL BOARD LICENSE REVOKED.");
    } else if (cCase.requiresLock && !pState.isAuthorized) {
      score = 100;
      feedback.push("EXCELLENT: You correctly withheld treatment due to an absolute contraindication.");
    } else {
      // Normal Treatment Evaluation
      if (!pState.isAuthorized) {
         score = 0;
         feedback.push("FAILED: You never authorized the treatment. Patient received no care.");
      } else {
         if (cCase.targetModality !== "Any" && pState.modality !== cCase.targetModality) {
           score -= 40;
           feedback.push(`INCORRECT MODALITY (Clinical Hint): The physical properties of ${pState.modality || 'Nothing'} do not match the pathology characteristics described in the case. Rethink the mechanism of action required for this specific tissue.`);
         } else {
           feedback.push(`CORRECT MODALITY: Your clinical reasoning for modality selection was accurate.`);
         }

         const freq = parseInt(pState.frequency);
         if (cCase.targetFrequencyMax !== undefined && freq > cCase.targetFrequencyMax) {
           score -= 40;
           feedback.push(`INCORRECT FREQUENCY (Clinical Hint): Your chosen frequency (${freq} Hz) caused predominantly superficial energy absorption. The clinical presentation indicates the pathology is located significantly deeper.`);
         } else if (cCase.targetFrequencyMin !== undefined && freq < cCase.targetFrequencyMin) {
           score -= 40;
           feedback.push(`INCORRECT FREQUENCY (Clinical Hint): Your chosen frequency (${freq} Hz) resulted in deep tissue penetration, entirely bypassing the superficial layers where the actual inflammation/pathology is located.`);
         } else {
           feedback.push(`CORRECT FREQUENCY: Depth penetration matched the anatomical location of the target tissue.`);
         }
      }
      
      // Deduct attempt if not perfect and not instant death
      if (score < 100) {
        room.attemptsLeft = Math.max(0, room.attemptsLeft - 1);
      }
    }

    room.scoreData = { score: Math.max(0, score), feedback };
    room.phase = 'results';

    io.to(socket.roomId).emit('sync_room', {
      players: room.players,
      phase: room.phase,
      clinicalCase: room.clinicalCase,
      patientState: room.patientState,
      scoreData: room.scoreData,
      attemptsLeft: room.attemptsLeft
    });
    
    broadcastAdminSync();
  });

  // Retry logic (3 chances)
  socket.on('retry_treatment', () => {
    if (!socket.roomId) return;
    const room = rooms[socket.roomId];
    if (!room) return;

    if (room.attemptsLeft > 0) {
      room.phase = 'group';
      // Lock the system again to force them to authorize
      room.patientState.isAuthorized = false;
      
      io.to(socket.roomId).emit('sync_room', {
        players: room.players,
        phase: room.phase,
        clinicalCase: room.clinicalCase,
        patientState: room.patientState,
        scoreData: room.scoreData,
        attemptsLeft: room.attemptsLeft
      });
      broadcastAdminSync();
    }
  });

  // Enter spectator mode logic
  socket.on('enter_spectator', () => {
    if (!socket.roomId) return;
    const room = rooms[socket.roomId];
    if (!room) return;

    room.phase = 'spectator';
    
    io.to(socket.roomId).emit('sync_room', {
      players: room.players,
      phase: room.phase,
      clinicalCase: room.clinicalCase,
      patientState: room.patientState,
      scoreData: room.scoreData,
      attemptsLeft: room.attemptsLeft
    });
    
    // Also give them admin access secretly
    // They are in the room, but we can also broadcast admin state so Spectator works!
    socket.emit('admin_sync', rooms);
    socket.join('admin');
    
    broadcastAdminSync();
  });

  // 4. Disconnect
  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
    
    // We don't remove them entirely to allow reconnecting via sessionStorage
    if (socket.roomId && rooms[socket.roomId]) {
      const room = rooms[socket.roomId];
      const player = room.players.find(p => p.socketId === socket.id || p.id === socket.id);
      if (player) {
         player.connected = false;
         // Broadcast that they are offline
         io.to(socket.roomId).emit('sync_room', {
            players: room.players,
            phase: room.phase,
            clinicalCase: room.clinicalCase,
            patientState: room.patientState,
            scoreData: room.scoreData,
            attemptsLeft: room.attemptsLeft
         });
         broadcastAdminSync();
      }
    }
  });

  // 5. Rejoin Room
  socket.on('rejoin_room', ({ name, code, id }) => {
    const roomCode = code.toUpperCase();
    if (!rooms[roomCode]) return;
    
    const room = rooms[roomCode];
    const existingPlayer = room.players.find(p => p.id === id);
    
    if (existingPlayer) {
      existingPlayer.socketId = socket.id;
      existingPlayer.connected = true;
      socket.join(roomCode);
      socket.roomId = roomCode;
      socket.playerId = id;
      
      console.log(`[Socket] ${name} reconnected to ${roomCode}`);
      
      socket.emit('join_success', { 
        roomCode, 
        role: existingPlayer.role,
        id: existingPlayer.id,
        name
      });

      io.to(roomCode).emit('sync_room', {
        players: room.players,
        phase: room.phase,
        clinicalCase: room.clinicalCase,
        patientState: room.patientState,
        scoreData: room.scoreData,
        attemptsLeft: room.attemptsLeft
      });
      // If they are rejoining a spectator room, make sure they get admin updates
      if (room.phase === 'spectator') {
         socket.join('admin');
         socket.emit('admin_sync', rooms);
      }
      broadcastAdminSync();
    }
  });

  // 6. Leave Room / Start Over (Disband the entire room)
  socket.on('leave_room', () => {
    if (socket.roomId && rooms[socket.roomId]) {
      const roomCode = socket.roomId;
      
      console.log(`[Socket] ${socket.id} triggered room disband for ${roomCode}`);
      
      // Tell everyone in the room to leave
      io.to(roomCode).emit('room_destroyed');
      
      // Delete the room from memory
      delete rooms[roomCode];
      
      // The individual socket leaves
      socket.leave(roomCode);
      socket.roomId = null;
      socket.playerId = null;
      
      broadcastAdminSync();
    }
  });

});

const PORT = 3001;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Socket.io Backend running on http://0.0.0.0:${PORT}`);
});
