<template>
    <section>
        <h1>
            <v-icon v-text="section.icon" />
            {{section.heading}}
        </h1>

        <div>
            <div
                v-for="(skill, i) in skills"
                :key="i"
                class="text-no-wrap my-2"
            >
                <span class="text-no-wrap skills__text" v-text="skill.text" />
                <div class="d-inline-block">
                    <span
                        v-for="n in 6"
                        :key="`skill-${i}-${n}`"
                        class="skills__dot accent--text"
                        :class="n <= skill.rating ? 'primary' : ''"
                    />
                    <!-- TODO add hover effect? -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import sectionMixin from './section.mixin.js';

export default {
    mixins: [
        sectionMixin,
    ],

    data: () => ({
        section: {
            heading: 'Skills',
            icon: 'mdi-toolbox',
            id: 'skills',
        },
        skills: [ // rating n/6
            { text: 'HTML/CSS (SCSS)', rating: 6 },
            { text: 'Javascript', rating: 5 },
            { text: 'Vue.js/Vuex', rating: 5 },
            { text: 'Webpack', rating: 4 },
            { text: 'REST APIs', rating: 5 },
            { text: 'Material Design', rating: 4 },
            { text: 'PHP', rating: 4 },
            { text: 'MySQL', rating: 3 },
            { text: 'Node.js', rating: 4 },
            { text: 'Firebase', rating: 2 },
            { text: 'Photoshop', rating: 4 },
            { text: 'Illustrator', rating: 3 },
        ],
    }),
    computed: {
    },
};
</script>

<style>
.skills__text {
    display: inline-block;
    width: 140px;
}
.skills__dot {
    --size: 0.75rem;
    border-radius: 50%;
    border: 2px solid;
    display: inline-block;
    height: var(--size);
    margin-right: 8px;
    width: var(--size);
}
</style>