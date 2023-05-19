/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import jsconfigPaths from 'vite-jsconfig-paths';

const resolve = (dir) => path.resolve(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    proxy: {
      '/rest': {
        target: 'http://192.168.45.246:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rest/, ''),
        ws: true,
      },
      '/socket.io': {
        target: 'http://192.168.45.246:8909',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
