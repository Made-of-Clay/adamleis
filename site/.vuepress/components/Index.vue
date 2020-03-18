<template>
    <div>
        Check out all <router-link to="/tests">Tests</router-link> here!
        
        <div v-for="post in posts">
            <h2>
                <router-link :to="post.path">
                    {{post.frontmatter.title}}
                </router-link>
            </h2>
            
            <p v-if="post.frontmatter.description">
                {{post.frontmatter.description}}
            </p>

            <router-link :to="post.path">Read more</router-link>
        </div>
        <Tattle>Index.vue</Tattle>
    </div>
</template>

<script>
export default {
    computed: {
        posts: vm => vm.$site.pages
            .filter(x => x.path.startsWith('/tests/') && !x.frontmatter.blog_index)
            .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)),
    },
};
</script>

<style>
h2 {
    font-size: 1.25em;
}
a[href] {
    /* color: cornflowerblue; */
}
</style>