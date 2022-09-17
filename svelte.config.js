import adapter from '@sveltejs/adapter-auto';
import preprocessor from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocessor(),
	kit: {
		adapter: adapter(),
		prerender: {
			enabled: false
		}
	}
};

export async function handle({ event /* previously: request */, resolve }) {
	const response = await resolve(event, {
		ssr: false
	});
	return response;
}

export default config;
