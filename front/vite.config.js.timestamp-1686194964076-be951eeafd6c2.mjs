// vite.config.js
import { defineConfig } from "file:///Users/dev/react/gaga_react/front/node_modules/vite/dist/node/index.js";
import react from "file:///Users/dev/react/gaga_react/front/node_modules/@vitejs/plugin-react/dist/index.mjs";
import jsconfigPaths from "file:///Users/dev/react/gaga_react/front/node_modules/vite-jsconfig-paths/dist/index.mjs";
var vite_config_default = defineConfig({
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
      "/rest": {
        target: "http://192.168.0.11:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rest/, ""),
        // withCredentials 옵션 설정
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:8080",
          "Access-Control-Allow-Credentials": "true"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGV2L3JlYWN0L2dhZ2FfcmVhY3QvZnJvbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9kZXYvcmVhY3QvZ2FnYV9yZWFjdC9mcm9udC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvZGV2L3JlYWN0L2dhZ2FfcmVhY3QvZnJvbnQvdml0ZS5jb25maWcuanNcIjsvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGpzY29uZmlnUGF0aHMgZnJvbSAndml0ZS1qc2NvbmZpZy1wYXRocyc7XG5cbmNvbnN0IHJlc29sdmUgPSAoZGlyKSA9PiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBkaXIpO1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBqc2NvbmZpZ1BhdGhzKCldLFxuICBzZXJ2ZXI6IHtcbiAgICAvLyBodHRwczoge1xuICAgIC8vICAga2V5OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4va2V5LnBlbScpKSxcbiAgICAvLyAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9jZXJ0LnBlbScpKSxcbiAgICAvLyB9LFxuICAgIHByb3h5OiB7XG4gICAgICAvLyAgICcvcmVzdCc6IHtcbiAgICAgIC8vICAgICB0YXJnZXQ6ICdodHRwOi8vMTkyLjE2OC4wLjExOjgwODAnLFxuICAgICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIC8vICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvcmVzdC8sICcnKSxcbiAgICAgIC8vICAgICB3czogdHJ1ZSxcbiAgICAgIC8vICAgfSxcbiAgICAgIC8vICcvc29ja2V0LmlvJzoge1xuICAgICAgLy8gICB0YXJnZXQ6ICdodHRwOi8vMTkyLjE2OC40NS4yNDY6ODkwOScsXG4gICAgICAvLyAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIC8vICAgd3M6IHRydWUsXG4gICAgICAvLyB9LFxuICAgICAgJy9yZXN0Jzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTkyLjE2OC4wLjExOjgwODAnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9yZXN0LywgJycpLFxuICAgICAgICAvLyB3aXRoQ3JlZGVudGlhbHMgXHVDNjM1XHVDMTU4IFx1QzEyNFx1QzgxNVxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICdodHRwOi8vbG9jYWxob3N0OjgwODAnLFxuICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFscyc6ICd0cnVlJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUdsQixPQUFPLG1CQUFtQjtBQUkxQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztBQUFBLEVBQ2xDLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS04sT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVlMLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxXQUFXLEVBQUU7QUFBQTtBQUFBLFFBRTdDLFNBQVM7QUFBQSxVQUNQLCtCQUErQjtBQUFBLFVBQy9CLG9DQUFvQztBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
