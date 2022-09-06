<template>
    <pre v-html="values" />
</template>

<script>
export default {
    props: {
        values: {
            type: Array,
            default: () => [],
        },
    },
}
</script>
