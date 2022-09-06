<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <article>
        <nuxt-content :document="articles" />
    </article>
</template>

<script>
export default {
    async asyncData({ $content, params }) {
        const articles = await $content('articles', params.slug).fetch()
        return { articles }
    },
}
</script>
