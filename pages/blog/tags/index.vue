<template>
    <article>
        <h1>Tags</h1>
        <ul>
            <li v-for="tag in tags" :key="tag" v-text="tag" />
        </ul>
    </article>
</template>

<script>
// TODO figure out what you're doing with this page
export default {
    name: 'BlogTags',

    async asyncData({ $content /* route */ }) {
        try {
            const pages = await $content(`articles`).fetch();
            const tags = pages.map((page) => page.tags ?? []).flat();
            return { page: pages, tags };
        } catch (thrown) {
            console.error(thrown);
        }
    },
};
</script>
