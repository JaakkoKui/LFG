/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				background: {
					darker: '#1f1f1f',
					default: '#2c2c2c',
					lighter: '#464646',
					lightest: '#606060'
				},
				text: {
					darker: '#78716c',
					default: '#d6d3d1',
					lighter: '#e7e5e4',
					white: '#FFFFFF'
				},

				primary: '#86198f',
				primaryVariant: '#55105B',
			},
		},
	},
	plugins: [],
}
