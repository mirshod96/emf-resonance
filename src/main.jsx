import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SocketProvider } from './context/SocketContext.jsx'
import GameDirector from './GameDirector.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <GameDirector />
    </SocketProvider>
  </StrictMode>,
)
