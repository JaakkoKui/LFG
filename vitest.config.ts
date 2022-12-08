import { mergeConfig } from 'vite'
import viteConfig from './vite.config'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default mergeConfig(viteConfig, defineConfig({
	server: {
		proxy: {
			'/api': 'https://localhost:5001',
			'/Auth': 'https://localhost:5001',
		},
	},
	
	test: {
		globals: true
	},
}))
