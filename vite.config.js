import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        displacement: path.resolve(__dirname, 'src/simulations/displacement_final.html'),
        reflection: path.resolve(__dirname, 'src/simulations/reflection_of_light.html'),
      },
    },
  },
})
