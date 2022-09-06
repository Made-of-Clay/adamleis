<template>
    <section>
        <h1>Experience</h1>
        <timeline :values="experiences" />
    </section>
</template>

<script>
import MyTimeline from '@/components/MyTimeline.vue'
import { getExperience } from '@/services/experience'

export default {
    name: 'ResumeExperience',

    components: {
        timeline: MyTimeline,
    },

    data: () => ({
        experiences: getExperience(),
    }),
}
</script>
