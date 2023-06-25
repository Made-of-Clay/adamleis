<template>
    <v-content>
        <v-container>
            <component
                v-for="section in sectionOrder"
                :key="`component-${section}`"
                :is="section"
                :id="section.substr(7)"
                class="siteContent__section"
            />
        </v-container>
    </v-content>
</template>

<script>
import * as sections from './sections';

export default {
    components: {
        ...sections,
    },

    data: () => ({
    }),
    computed: {
        sectionOrder: vm => vm.$store.state.sectionOrder,
    },
};
</script>

<style lang="scss">
.siteContent__section {
    margin: 55vh 0 50vh;
    padding-top: 10vh;

    &:first-child {
        margin-top: 0;
        padding-top: 0;
    }

    > h1 { // TODO change heading font-family (maybe in app.vue) and add dashed underline
        margin-bottom: 4px;
    }
}
.multipleColumns {
    @media (min-width: 960px) { // vuetify "medium" starts at 960
        column-width: 28rem;
    }
}
</style>