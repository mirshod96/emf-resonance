import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows connections from local network (phones)
    port: 5173,
    // Add proxy later if we need it, but socket.io-client can just hit port 3001
  }
})
