import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

// We proxy to same as backend API aka 5001
export default defineConfig({
	server: {
		https: true,
		proxy: {
			'/api': 'https://localhost:5001',
			'/Auth': 'https://localhost:5001',
		},
	},
	plugins: [vue(), mkcert()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
})
