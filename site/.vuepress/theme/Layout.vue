<template>
    <div id="global-layout">
        <header id="theHeader" class="flex">
            <span class="spacer" />
            <span>Adam Leis home link</span>
            <span>search</span>
            <nav>
                <router-link
                    v-for="nav in navLinks"
                    :key="nav.link"
                    :to="nav.link"
                >
                    {{nav.text}}
                </router-link>
            </nav>
        </header>

        <Index v-if="$page.frontmatter.home" />
        <Page v-else>
            <Content />
        </Page>

        <Tattle>Layout.vue</Tattle>
    </div>
</template>

<script>
export default {
    computed: {
        layout () {
            if (this.$page.path) {
                if (this.$frontmatter.layout) {
                   // You can also check whether layout exists first as the default global layout does.
                    return this.$frontmatter.layout;
                }
                return 'Layout';
            }
            return 'NotFound';
        },
        navLinks: vm => vm.$site.themeConfig.nav,
    },
};
</script>

<style lang="stylus">
    @import './styles/theme.styl';

    .spacer {
        @apply flex-1;
    }

    #theHeader {
        background: url('/photo.jpg') black;
        background-size: cover;
        height: 100px;
    }
</style>