import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SocketProvider } from './context/SocketContext.jsx'
import GameDirector from './GameDirector.jsx'
import { TeacherDashboard } from './components/TeacherDashboard.jsx'
import './index.css'

const App = () => {
  if (window.location.pathname === '/admin') {
    return <TeacherDashboard />;
  }
  
  return (
    <SocketProvider>
      <GameDirector />
    </SocketProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
