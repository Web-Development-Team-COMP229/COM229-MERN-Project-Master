import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const { PORT = 3000 } = process.env;

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: `https://com229-mern-project-master.onrender.com`,
                changeOrigin: true,
            },
            '/auth': {
                target: `https://com229-mern-project-master.onrender.com`,
                changeOrigin: true,
            },
        },
    },

    build: {
        manifest: true,
        rollupOptions: {
            input: ["./src/main.jsx", './index.html'],
        },
    },
});
