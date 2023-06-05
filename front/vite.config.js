/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import jsconfigPaths from 'vite-jsconfig-paths';

const resolve = (dir) => path.resolve(__dirname, dir);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, './key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, './cert.pem')),
    // },
    proxy: {
      //   '/rest': {
      //     target: 'http://192.168.0.11:8080',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/rest/, ''),
      //     ws: true,
      //   },
      // '/socket.io': {
      //   target: 'http://192.168.45.246:8909',
      //   changeOrigin: true,
      //   ws: true,
      // },
      '/rest': {
        target: 'http://192.168.0.11:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rest/, ''),
        // withCredentials 옵션 설정
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080',
          'Access-Control-Allow-Credentials': 'true',
        },
      },
    },
  },
});
