<template>
    <div>
        <h1>Fun!</h1>
        <p>Yo yo yo, partly people!</p>

        <h2>Testing out Testo</h2>

        <article>
            <h3>{{ page.title }}</h3>
            <p>
                <i>{{ page.description }}</i>
            </p>
            <nuxt-content :document="page" />
            <pre style="outline: 1px solid red" v-html="page" />
        </article>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'FunPage',

    async asyncData({ $content }) {
        const page = await $content('testo').fetch()
        return { page }
    },
})
</script>
