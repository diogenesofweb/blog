import fs from 'fs';
import matter from 'gray-matter';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const fileNames = await fs.promises.readdir('articles');
	// const articles = fileNames.filter((fileName) => /.+\.md$/.test(fileName))

	const blogs = await Promise.all(
		fileNames.map(async (fileName) => {
			const doc = await fs.promises.readFile(`articles/${fileName}`, 'utf8');

			const { data } = matter(doc);
			/** @type {import('../../typings/types').BlogMetadata } */
			const md = data;
			return md;
		})
	);

	blogs.sort((a, b) => b.created.getTime() - a.created.getTime());
	blogs.forEach((b) => (b.tags = b.tags.map((t) => t.toLowerCase())));
	// console.log({ blogs })

	return { blogs };
}
