<template>
    <v-navigation-drawer
        ref="drawer"
        v-model="drawer"
        app clipped
    >
        <v-subheader>Sections</v-subheader>
        <v-list dense>
            <v-list-item
                v-for="section in sections"
                :key="section.id"
                @click="goToSection(section.id)"
            >
                <v-icon class="mr-2" v-text="section.icon" />
                {{section.heading}}
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <a :href="mastheadPhoto.link" class="text-no-wrap ml-2 siteNavDrawer__unsplashLink">
                <svg xmlns="http://www.w3.org/2000/svg" style="height:6px;width:auto;position:relative;vertical-align:middle;fill:currentcolor" viewBox="0 0 32 32"><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z" /></svg>
                <small>{{mastheadPhoto.kudos}}</small>
            </a>
        </template>
    </v-navigation-drawer>
</template>

<script>
export default {
    data: () => ({
    }),
    computed: {
        drawer: {
            get() {
                return this.$store.state.drawerOpen;
            },
            set(value) {
                this.$store.commit('openDrawer', value);
            },
        },
        sections: vm => vm.$store.state.sections,
        mastheadPhoto: vm => vm.$store.state.masthead,
    },

    methods: {
        goToSection(id) {
            this.$vuetify.goTo(`#${id}`);
            if (this.$vuetify.breakpoint.mdAndDown) {
                this.$store.commit('openDrawer', false);
            }
        },
    },
};
</script>

<style lang="scss">
.siteNavDrawer__unsplashLink {
    border-bottom: none !important;

    > small {
        font-size: x-small;
    }
}
</style>