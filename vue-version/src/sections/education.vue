<template>
    <section class="education">
        <h1>
            <v-icon v-text="section.icon" />
            {{section.heading}}
        </h1>

        <div>
            <v-row>
                <v-col cols="12" md="6">
                    <h2>
                        <div>
                            Bowling Green State University
                        </div>
                        <b class="primary--text wholeWord">Bachelor of Fine Arts</b>
                        in
                        <b class="secondary--text wholeWord">Digital Arts</b>
                    </h2>
                    <p>
                        <span class="d-block">Minor in Astronomy</span>
                        <b class="d-block accent--text">
                            <span>May 2010</span>
                            <em>Cum Laude</em>
                        </b>
                    </p>
                    <p>My schooling at BGSU piqued my interest in learning new and diverse things. After studying animation for a year, I shifted focus to web development, both of which fell under "Digital Arts". Animation taught me the value of synergizing different fields of study for the sake of improving another. In web development, this meant learning about graphic design, composition, color psychology, as well as programming, logic, and some server management. Cross-disciplinary learning, unbeknownst to me at the time, would become critical in my next educational journey.</p>
                </v-col>
                <v-col cols="12" md="6">
                    <h2>
                        <div>
                            Liberty University
                        </div>
                        <b class="primary--text">Master of Arts</b>
                        in
                        <b class="secondary--text">Christian Apologetics</b>
                    </h2>
                    <p><b class="accent--text">2019-present</b></p>
                    <p>This education experience has been new on a number of fronts for me. It is the first fully-online program I have been enrolled in during my higher education career. It is also very different from the kind of course work I had with BGSU in the Fine Arts program. The critical lessons of learning carry over though. Apologetics demands study in diverse fields like philosophy, science, history, and religions. It also focuses on critical thinking and analytical skills for interpretation and assessment of arguments. I have so far thoroughly enjoyed the range of topics the courses have covered and look forward to more.</p>
                    <p>I do not know how this education will be used in the future, but as for now, it has provided invaluable skills and insights that I share with my church community. It has also helped build my confidence in the various leadership roles I am in with the youth and college programs as well as my role as a church Elder.</p>
                </v-col>
            </v-row>
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
            heading: 'Education',
            icon: 'mdi-school',
            id: 'education',
        },
    }),
    computed: {
    },
};
</script>

<style lang="scss">
.education {
    h2 {
        font-weight: normal;
    }
}
</style>