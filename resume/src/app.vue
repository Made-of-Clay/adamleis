<template>
    <v-app>
        <!-- my red: #da1e33 -->
        <!-- my gray: #626366 -->
        <!-- TODO replace src w/ my resume black background image tile (and keep always?) -->
        <!-- might also do pic w/ red/gray? gradient then change when scrolled... dunno yet -->
        <site-header />
        <site-nav-drawer />
        <site-content />
        <v-tooltip top>
            <template v-slot:activator="{on}">
                <v-btn
                    dark fab
                    fixed bottom right
                    color="primary"
                    @click="downloadResume"
                    v-on="on"
                >
                    <v-icon>mdi-download</v-icon>
                </v-btn>
            </template>
            <span>Download PDF Resume</span>
        </v-tooltip>
    </v-app>
</template>

<script>
import siteHeader from './site-header';
import siteContent from './site-content';
import siteNavDrawer from './site-nav-drawer';

export default {
    name: 'AdamLeis',

    components: {
        siteHeader,
        siteContent,
        siteNavDrawer,
    },

    created() {
        if (this.$vuetify.breakpoint.lgAndUp) {
            this.$store.commit('openDrawer');
        }
    },

    methods: {
        downloadResume() {
            window.open('/AdamLeis-resume.pdf');
        },
    },
};
</script>

<style>
/* @font-face {
    font-family: 'bebasregular';
    src: url('./assets/bebas-regular-webfont.woff2') format('woff2'),
         url('./assets/bebas-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
} */
a[href] {
    border-bottom: 1px solid;
    text-decoration: none;
    transition: all 0.25s;
}
a:hover {
    opacity: 0.65;
}
</style>