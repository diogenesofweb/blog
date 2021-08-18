import fs from 'fs'
import mi from 'markdown-it'
import prism from 'markdown-it-prism'
import matter from 'gray-matter'

const md = mi({
	html: true,
	linkify: true,
	typographer: true
})

// Remember old renderer, if overridden, or proxy to default renderer
const defaultRender =
	md.renderer.rules.link_open ||
	function (tokens, idx, options, env, self) {
		return self.renderToken(tokens, idx, options)
	}

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
	// If you are sure other plugins can't add `target` - drop check below
	// const aIndex = tokens[idx].attrIndex('target')
	// if (aIndex < 0) {
	// 	tokens[idx].attrPush(['target', '_blank']) // add new attribute
	// } else {
	// 	tokens[idx].attrs[aIndex][1] = '_blank' // replace value of existing attr
	// }

	// const relIndex = tokens[idx].attrIndex('rel')
	// if (relIndex < 0) {
	// 	tokens[idx].attrPush(['rel', 'noopener noreferrer'])
	// } else {
	// 	tokens[idx].attrs[relIndex][1] = 'noopener noreferrer'
	// }

	// console.log(tokens[idx])
	const href = tokens[idx].attrs[tokens[idx].attrIndex('href')][1]
	// console.log(href)

	if (href.startsWith('http')) {
		tokens[idx].attrPush(['rel', 'noopener noreferrer'])
		tokens[idx].attrPush(['target', '_blank'])
		// tokens[idx].attrPush(['class', 'external-link'])
	}

	// pass token to default renderer.
	return defaultRender(tokens, idx, options, env, self)
}

md.use(prism, {})

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
	const { slug } = params

	/* 1. Load file {String} */
	const doc = await fs.promises.readFile(`articles/${slug}.md`, 'utf8')
	// console.log(doc)

	/* 2. Extract content {String} 
				Extract and process front-matter {JSON} */
	const { data: metadata, content } = matter(doc)
	// console.log(metadata)
	// console.log(content)

	/* 3. Process content {String}*/
	const html = md.render(content)

	return {
		body: JSON.stringify({ html, metadata })
	}
}
