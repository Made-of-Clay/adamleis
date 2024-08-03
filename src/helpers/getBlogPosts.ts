import { getCollection } from "astro:content";

export async function getBlogPosts() {
    const allPosts = await getCollection('blog');
    return allPosts
        .filter(post => post.data.draft === false)
        .sort((a, b) => {
            console.log('a.data.date', a.data.date, 'b.data.date', b.data.date)
            const aTime = a.data.date instanceof Date ? a.data.date : 0;
            const bTime = b.data.date instanceof Date ? b.data.date : 0;
            return aTime < bTime
                ? -1
                : aTime === bTime ? 0 : 1;
        })
        .reverse();
}

export const getRecentPosts = async (count = 5) => (await getBlogPosts()).slice(0, count);