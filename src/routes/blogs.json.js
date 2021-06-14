import fs from 'fs'
import matter from 'gray-matter'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
	const fileNames = await fs.promises.readdir('articles')
	// const articles = fileNames.filter((fileName) => /.+\.md$/.test(fileName))

	const blogs = await Promise.all(
		fileNames.map(async (fileName) => {
			const doc = await fs.promises.readFile(`articles/${fileName}`, 'utf8')

			const { data } = matter(doc)

			return data
		})
	)

	blogs.sort((a, b) => b.created - a.created)
	// console.log({ blogs })

	return {
		body: JSON.stringify(blogs)
	}
}
