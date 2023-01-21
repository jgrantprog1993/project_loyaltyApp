const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
	dynamicStartUrl: false,
	
});


module.exports = withPWA({
	
	pwa: {
		dest: 'public',
		disable: process.env.NODE_ENV === "development",
		disableDevLogs: true,
		swcMinify: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [{loader: '@svgr/webpack', options: { icon:true}}],
			
		})
		return config
	},
});
