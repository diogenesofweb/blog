// import adapter from '@sveltejs/adapter-cloudflare';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html', // may differ from host to host
		}),
		// adapter: adapter({
		// 	routes: {
		// 		include: ['/*'],
		// 		exclude: ['<all>'],
		// 	},
		// }),
	},
};

export default config;
