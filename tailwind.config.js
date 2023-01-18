module.exports = {
	content: [
		'src/pages/index.{js,ts,jsx,tsx}',
		'./src/pages/index.{js,ts,jsx,tsx}',
		'/src/pages/index.{js,ts,jsx,tsx}',
		'../src/pages/index.{js,ts,jsx,tsx}',
		'./index.{js,ts,jsx,tsx}',
		
		'./src/pages/*.{js,ts,jsx,tsx}',
		'src/pages/*.{js,ts,jsx,tsx}',
		'/src/pages/*.{js,ts,jsx,tsx}',
		'/src/pages/**.{js,ts,jsx,tsx}',
		'./pages/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'src/pages/**/*.{js,ts,jsx,tsx}',

		'./src/components/*.{js,ts,jsx,tsx}',
		'./src/components/**.{js,ts,jsx,tsx}',
		'../src/components/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'src/components/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
		'/src/**/*.{js,ts,jsx,tsx}',
		'src/**/*.{js,ts,jsx,tsx}',
		
	],
	darkMode: 'class',
	
	plugins: [require('tailwindcss-safe-area')],
}

