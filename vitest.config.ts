import { mergeConfig } from 'vite'
import viteConfig from './vite.config'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default mergeConfig(viteConfig, defineConfig({
	
	test: {
		globals: true,
		setupFiles: ['unit.setup.js'],
		environment: 'jsdom',

	},
}))
