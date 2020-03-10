<template>
    <div id="global-layout">
        Layout
        <!-- <Index v-if="$page.frontmatter.home" />
        <Page v-else>
            <Content />
        </Page> -->
    </div>
</template>

<script>
import Index from './components/Index';
import Page from './components/Page';

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
        }
    }
};
</script>

<style lang="stylus">
@import './styles/theme.styl';
</style>