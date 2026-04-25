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

// Store rooms state in memory
const rooms = {};

io.on('connection', (socket) => {
  console.log(`[Socket] Student connected: ${socket.id}`);

  // 1. Join Room
  socket.on('join_room', ({ name, code }) => {
    const roomCode = code.toUpperCase();
    
    // Initialize room if it doesn't exist
    if (!rooms[roomCode]) {
      rooms[roomCode] = {
        players: [],
        availableRoles: [...ROLES],
        patientState: {
          frequency: 50,
          modality: '',
          isAuthorized: false,
        },
        phase: 'lobby-waiting'
      };
    }

    const room = rooms[roomCode];

    // Check if room is full
    if (room.players.length >= 3) {
      // If user is just reconnecting, maybe handle it, but for now reject
      const existingPlayer = room.players.find(p => p.name === name);
      if (!existingPlayer) {
        socket.emit('room_full_error', { message: 'Room is already full! (Max 3 players)' });
        return;
      }
    }

    // Assign a random role and remove it from available roles
    let assignedRole;
    const existingPlayer = room.players.find(p => p.name === name);
    
    if (existingPlayer) {
      assignedRole = existingPlayer.role;
      existingPlayer.socketId = socket.id; // Update socket id on reconnect
    } else {
      const roleIndex = Math.floor(Math.random() * room.availableRoles.length);
      assignedRole = room.availableRoles.splice(roleIndex, 1)[0];
      
      const newPlayer = {
        id: socket.id,
        name,
        role: assignedRole,
        taskCompleted: false
      };
      room.players.push(newPlayer);
    }

    socket.join(roomCode);
    console.log(`[Socket] ${name} (${assignedRole}) joined ${roomCode}`);

    socket.roomId = roomCode; // Store room code on the socket instance
    socket.playerId = socket.id;

    // Acknowledge the join to the specific user
    socket.emit('join_success', { 
      roomCode, 
      role: assignedRole,
      id: socket.id 
    });

    // Check phase logic: If 3 players are in the room, phase => solo
    if (room.players.length === 3 && room.phase === 'lobby-waiting') {
      room.phase = 'solo';
    }

    // Broadcast room state to everyone in the room
    io.to(roomCode).emit('sync_room', {
      players: room.players,
      phase: room.phase,
      patientState: room.patientState
    });
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
      patientState: room.patientState
    });
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
      patientState: room.patientState
    });
  });

  // 4. Disconnect
  socket.on('disconnect', () => {
    console.log(`[Socket] Student disconnected: ${socket.id}`);
    
    if (socket.roomId && rooms[socket.roomId]) {
      const room = rooms[socket.roomId];
      // We don't remove them entirely to allow reconnecting, 
      // but you could add a timeout/cleanup if needed.
    }
  });
});

const PORT = 3001;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Socket.io Backend running on http://0.0.0.0:${PORT}`);
});
