const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
	pwa: {
		dest: 'public',
		register: false,
		skipWaiting: false,
		dynamicStartUrl: false,
		runtimeCaching,
		disable: process.env.NODE_ENV === "development",
		runtimeCaching,
	},

	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [{loader: '@svgr/webpack', options: { icon:true}}],
		})
		return config
	},
})
