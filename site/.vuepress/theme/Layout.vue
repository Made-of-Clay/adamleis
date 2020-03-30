<template>
    <div id="layout" class="flex flex-col md:flex-row h-full">
        <header
            id="theHeader"
            class="flex flex-wrap h-64 md:h-auto md:w-400 bg-black md:bg-center md:bg-cover"
            style="background-image: url('/photo.jpg')"
        >
            <div v-if="topSearchShowing" class="w-full">
                <span class="spacer" />
                <!-- <site-search /> -->
                <search-box />
            </div>

            <div class="layout__siteMasthead shim-order">
                <div>
                    <router-link to="/">
                        Adam Leis
                    </router-link>
                    <span>
                        Person with face and parts
                    </span>
                </div>

                <span class="spacer" />

                <div class="layout__socialLinks shim-order">
                    <a href="https://facebook.com">
                        F
                    </a>
                    <a href="https://linkedin.com">
                        L
                    </a>
                </div>
            </div>
            <!--
                SMALL SCREEN
                spacer          search (order:1)
                site title      social links
                -- desc
                site nav (listed horizontally)

                MD-XL SCREEN
                (vertical) spacer
                site title
                -- desc
                site nav
                search
                social links
             -->
            <!-- ============================ -->
            <!-- see phone sketches on layout -->
            <!-- ============================ -->

            <nav class="layout__siteNav shim-order">
                <router-link
                    v-for="nav in navLinks"
                    :key="nav.link"
                    :to="nav.link"
                >
                    {{nav.text}}
                </router-link>
            </nav>

            <span class="layout__siteSearch shim-order">
                <input type="text" placeholder="Site Search" />
            </span>

        </header>

        <div class="layout__body">
            <Index v-if="$page.frontmatter.home" />
            <Page v-else>
                <Content />
            </Page>
        </div>

        <!-- <Tattle>Layout.vue</Tattle> -->
    </div>
</template>

<script>
// import '~vue-material-design-icons/styles.css';
import SearchBox from '@SearchBox'
// import siteSearch from '../components/SiteSearch.vue';

export default {
    components: {
        SearchBox,
    },

    data: () => ({
        topSearchShowing: true,
    }),
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

    $mdBreakpoint = 768px

    .spacer {
        @apply flex-1;

        @media (max-width: $mdBreakpoint) {
            @apply order-1;
        }
    }

    .shim-order {
        @media (max-width: $mdBreakpoint) {
            @apply order-2;
        }
    }
</style>