import tailwindcss from '@tailwindcss/vite'; // 1. Import it
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Add it here
  ],
})