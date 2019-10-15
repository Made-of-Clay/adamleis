<template>
    <v-app>
        <!-- <fancy-header id="site-header" class="main-header">
            <nav>
                <a
                    v-for="section in sectionLinks"
                    :href="`#${section}`"
                    class="section-link"
                    @click.prevent="scrollTo(section)"
                    v-text="section"
                ></a>
            </nav>
        </fancy-header> -->
        <v-toolbar color="primary" dense>
            <h1 class="title my-0">
                Adam Leis
            </h1>
        </v-toolbar>

        <!-- TODO add keep-alive or cache so portfolio stuff doesn't fetch every time? -->
        <router-view />
    </v-app>
</template>

<script>
import fancyHeader from './fancy-header';
import BlogService from './services/Blog';
import BaseService from './services/BaseRequest';

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default {
    name: 'AdamLeis',

    filters: {
        postDate(dateTime) {
            const date = new Date(dateTime);
            return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
        },
    },

    components: {
        fancyHeader,
    },

    data() {
        return {
            sectionLinks: [
                'welcome',
                'portfolio',
                'blog',
                'contact',
            ],

            recentPosts: [],
        };
    },

    created() {
        this.getPosts();
        //
    },

    methods: {
        scrollTo(section) {
            // window scrollto logic
        },

        /**
         * Get blog posts for front page
         */
        getPosts() {
            const blog = new BlogService();
            blog.getPosts().then(posts => {
                // filter out "Welcome" post
                this.recentPosts = posts.filter(post => post.id !== 7);
            });
        },

        /**
         * Get categories for use throughout website
         */
        getCategories() {
            const baseReq = new BaseService();
            baseReq.request(`${baseReq.baseUrl}/categories`).then(data => {
                // save to vuex
            });
        },
    },
}
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}

h1, h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

.section-link {
    text-transform: capitalize;
}

.blog-posts {
    list-style: none;
    margin: 0;
    padding: 0;
}
.blog-post__date {
    &::before {
        content: 'Posted:';
        display: inline-block;
        margin-right: 0.5em;
    }
}
</style>
