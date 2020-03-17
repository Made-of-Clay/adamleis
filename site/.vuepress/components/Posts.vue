<template>
    <div>
        <div v-if="posts.length" class="posts">
            <div v-for="post in posts" class="post">
                <router-link :to="post.path">
                    <div>
                        <img v-if="post.frontmatter.image" :src="$withBase(post.frontmatter.image)" alt="">
                    </div>
                    <h2>{{post.frontmatter.title}}</h2>
                    <p>{{post.frontmatter.description}}</p>
                </router-link>
            </div>
        </div>
        <Tattle>Posts.vue</Tattle>
    </div>
    <!-- 
        Displays a list of posts of a given type (within some directory, e.g. tests)
     -->
</template>

<script>
export default {
    props: ["page"],
    computed: {
        posts() {
            let currentPage = this.page ? this.page : this.$page.regularPath;
            let posts = this.$site.pages
                .filter(page => page.path.match(new RegExp(`(${currentPage})(?=.*html)`)))
                .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
            return posts;
        }
    }
}
</script>

<style>
.posts {
    box-shadow: 1px 3px 5px hsla(0, 0, 0, 0.25);
}
</style>