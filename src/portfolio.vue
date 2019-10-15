<template>
    <article>
        Portfolio component: foo {{foo}}
        <h1>Portfolio</h1>

        <div>chevron arrows and drop down (select) of project names</div>
        <!-- <project-select /> -->

        <section class="portfolio__projText">
            <h2>Project names</h2>
            <p>Project Desc/caption</p>
            <p>(desc scrolls vert if needed</p>
        </section>

        <v-alert
            :value="!!loadError"
            type="error"
            v-text="'There was an error loading Portfolio content. (See log for details)'"
        />

        <section class="portfolio__projPics">
            carousel? no timing
            images saved to media lib w/ cat: "Whatever" under parent "Portfolio"
            click big thumb to expand (dialog?)
            
            <v-carousel :cycle="false">
                <v-carousel-item
                    v-for="m in media"
                    :key="m.id"
                    :src="m.source_url"
                />
            </v-carousel>
        </section>
    </article>
</template>

<script>
import PortfolioService from './services/Portfolio.js';

const portfolio = new PortfolioService();

export default {
    name: 'Portfolio',

    data: () => ({
        foo: 'bar',
        media: [],
        loadError: null,
    }),

    created() {
        this.getMedia();
    },

    methods: {
        /**
         * Fetches media post types from API & saves for later
         */
        getMedia() {
            portfolio.getMedia().then(media => this.media = media);
            this.$api.get('/media?filter[category_name]=portfolio')
                .then(data => {
                    this.media = data;
                })
                .catch(thrown => console.error('Error fetching media', thrown))
            ;
        },
    },
}
</script>

<style>

</style>
