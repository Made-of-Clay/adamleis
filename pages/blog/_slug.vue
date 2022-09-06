<template>
    <nuxt-content :document="page" />
</template>

<script>
export default {
    async asyncData({ $content, route }) {
        try {
            // console.log({ route, slug: route.params.slug })
            const page = await $content(`articles/${route.params.slug}`).fetch()
            // console.log({ page: JSON.parse(JSON.stringify(page)) })
            return { page }
        } catch (thrown) {
            console.error(thrown)
        }
    },
}
</script>
