// @ts-nocheck
import Head from 'next/head'

const Meta = () => (
	<Head>
		<title>Loyalty App</title>
		<meta charSet='utf-8' />
		<meta name='mobile-web-app-capable' content='yes' />
		<meta name='apple-mobile-web-app-capable' content='yes' />
		<meta
			name='apple-mobile-web-app-status-bar-style'
			content='black-translucent'
		/>
		<meta name='apple-mobile-web-app-title' content='Loyalty App' />
		<meta name='application-name' content='Loyalty App' />
		<meta name='description' content='Scan to collect loyalty tokens' />
		<meta
			name='theme-color'
			content='#f4f4f5'
			media='(prefers-color-scheme: light)'
		/>
		<meta
			name='theme-color'
			content='#18181b'
			media='(prefers-color-scheme: dark)'
		/>
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
		/>
		<link rel='apple-touch-icon' href='/images/playstore.png' />
		<link rel='icon' type='image/png' href='/images/playstore.png' />
		<link rel='manifest' href='/manifest.json' />
		<link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.1/dist/flowbite.min.css" />
		
	</Head>
)

export default Meta
