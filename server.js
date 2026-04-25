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
    
    // 4. Disconnect
  socket.on('disconnect', () => {
    console.log(`[Socket] Student disconnected: ${socket.id}`);
    
    // We don't remove them entirely to allow reconnecting via sessionStorage
    if (socket.roomId && rooms[socket.roomId]) {
      const room = rooms[socket.roomId];
      const player = room.players.find(p => p.socketId === socket.id || p.id === socket.id);
      if (player) {
         player.connected = false;
         // Broadcast that they are offline (optional visual)
         io.to(socket.roomId).emit('sync_room', {
            players: room.players,
            phase: room.phase,
            patientState: room.patientState
         });
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
        id: existingPlayer.id 
      });

      io.to(roomCode).emit('sync_room', {
        players: room.players,
        phase: room.phase,
        patientState: room.patientState
      });
  // 6. Leave Room / Start Over
  socket.on('leave_room', () => {
    if (socket.roomId && rooms[socket.roomId]) {
      const room = rooms[socket.roomId];
      const playerIndex = room.players.findIndex(p => p.socketId === socket.id || p.id === socket.id);
      
      if (playerIndex !== -1) {
        const removedPlayer = room.players.splice(playerIndex, 1)[0];
        if (removedPlayer && removedPlayer.role) {
          room.availableRoles.push(removedPlayer.role);
          console.log(`[Socket] ${removedPlayer.name} left. Freed role ${removedPlayer.role}`);
        }

        if (room.players.length === 0) {
          delete rooms[socket.roomId];
          console.log(`[Socket] Room ${socket.roomId} is empty and deleted.`);
        } else {
          io.to(socket.roomId).emit('sync_room', {
            players: room.players,
            phase: room.phase,
            patientState: room.patientState
          });
        }
      }
      
      socket.leave(socket.roomId);
      socket.roomId = null;
      socket.playerId = null;
    }
  });

});

const PORT = 3001;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`[Server] Socket.io Backend running on http://0.0.0.0:${PORT}`);
});
