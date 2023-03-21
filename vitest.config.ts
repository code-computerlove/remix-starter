/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, './src'),
		},
	},
	test: {
		testTimeout: 50000,
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./test/setup-test-env.ts'],
		include: ['./**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		watchExclude: [
			'.*\\/node_modules\\/.*',
			'.*\\/build\\/.*',
			'.*\\/postgres-data\\/.*',
		],
		deps: {
			inline: ['vitest-canvas-mock'],
		},
		threads: false,
		environmentOptions: {
			jsdom: {
				resources: 'usable',
			},
		},
	},
});
