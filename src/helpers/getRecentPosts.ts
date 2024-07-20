import { getCollection } from 'astro:content';

export const getBlogPosts = () => getCollection('blog');

export async function getRecentPosts(count = 5) {
    return (await getBlogPosts())
        .filter(post => !post.data.draft && post.data.title)
        .sort((a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime())
        .slice(0, count);
}
