import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
export default defineConfig({
    plugins: [react()],
    base: '/silvercalc/',
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        target: 'es2020',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('pdfmake')) {
                        return 'pdf-worker';
                    }
                    if (id.includes('recharts')) {
                        return 'charts';
                    }
                    if (id.includes('dexie')) {
                        return 'db';
                    }
                },
            },
        },
    },
});
