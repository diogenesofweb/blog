import fs from 'fs';
import mi from 'markdown-it';
import prism from 'markdown-it-prism';
import 'prism-svelte';
import matter from 'gray-matter';

const md = mi({
	html: true,
	linkify: true,
	typographer: true,
});

// Remember old renderer, if overridden, or proxy to default renderer
const defaultRender =
	md.renderer.rules.link_open ||
	function (tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options);
	};

// @ts-ignore
md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
	// console.log(tokens[idx])
	const href = tokens[idx].attrs[tokens[idx].attrIndex('href')][1];
	// console.log(href)

	if (href.startsWith('http')) {
		tokens[idx].attrPush(['rel', 'noopener noreferrer']);
		tokens[idx].attrPush(['target', '_blank']);
		// tokens[idx].attrPush(['class', 'external-link'])
	}

	// pass token to default renderer.
	return defaultRender(tokens, idx, options, env, self);
};

md.use(prism, {});
/** @typedef {import("../../../typings/types").BlogMetadata} DM*/

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const { slug } = params;

	/* 1. Load file {String} */
	const doc = await fs.promises.readFile(`articles/${slug}.md`, 'utf8');
	// console.log(doc)

	/* 2. Extract content {String} 
				Extract and process front-matter {JSON} */
	const { data, content } = matter(doc);
	/** @type {DM} */
	const metadata = data;
	metadata.tags = metadata.tags.map((t) => t.toLowerCase());
	// console.log(metadata);
	// console.log(content)

	/* 3. Process content {String}*/
	const html = md.render(content);

	return {
		blog: { html, metadata },
	};
}
