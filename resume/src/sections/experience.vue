<template>
    <section>
        <h1>
            <v-icon v-text="section.icon" />
            {{section.heading}}
        </h1>

        <v-timeline :dense="timelineCondensed" :clipped="timelineCondensed">
            <v-timeline-item
                v-for="item in experienceList"
                :key="item.id"
                data-note="add logic for bigger dots when time is greater than x years"
            >
                <template v-slot:opposite>
                    <job-time
                        :start="item.jobStart"
                        :end="item.jobEnd"
                        :total="item.totalTime"
                        class="secondary--text"
                    />
                </template>
                <v-card>
                    <v-card-title class="experience__cardTitle">
                        <div>
                            {{item.employer}}
                            <div class="primary--text" v-text="item.title" />
                        </div>
                    </v-card-title>
                    <job-time
                        v-if="timelineCondensed"
                        :start="item.jobStart"
                        :end="item.jobEnd"
                        :total="item.totalTime"
                        class="secondary--text px-4"
                    />
                    <v-card-text>
                        <p v-if="item.id === 'rsbm'">
                            This position began as the front-end developer advancing technology and unifying the many (about 15) application UIs. Eventually became full stack developer building DevOps (Webpack), adding unit testing, and converting jQuery-based apps to use Vue.js and Vuex. Worked with Node.js & WebSockets for real-time updates. I also worked on converting CodeIgniter apps to use Phalcon in PHP; MySQL and SQL Server databases.
                        </p>
                        <p v-else-if="item.id === 'arm'">
                            Director of Web Development included managing client &amp; in-house website content, design, development, third-party and hosting. Worked with designers for client sites &amp; implemented designs in WordPress websites. Implemented SEO strategies for clients. Managed projects and worked with clients to determine website needs as well as communicating needs to relevant parties at Anderson Robertson Marketing.
                        </p>
                        <p v-else-if="item.id === 'lfn'">
                            Worked as the front-end developer with a back-end developer and designer to quickly generate single-page sites giving our lawyer clients increased web presence and search engine visibility. Also worked to upkeep country-wide legal directories for specific practices (e.g. DUI, Bankruptcy, ...). Eventually became a full stack developer and assumed responsibilities of back-end developer as well. Frequently interacted with clients to work on the content and design of their web pages.
                        </p>
                        <p v-else-if="item.id === 'ssi'">
                            Lead web developer, occasionally over-seeing others, in a small company providing web services for local businesses and community organizations.
                        </p>
                    </v-card-text>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Tools Used</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <ul v-if="item.id === 'rsbm'">
                                    <li>front-end: jQuery, jQuery widget factory, d3, socket.io, Handlebars, Vuejs, Vuex, ApexCharts</li>
                                    <li>back-end: CodeIgniter, Phalcon, Handlebars, Parsedown</li>
                                    <li>dev-ops: Webpack, Mocha, Chai</li>
                                    <li>Git using BitBucket, Sublime Text, VS Code</li>
                                </ul>
                                <ul v-else-if="item.id === 'arm'">
                                    <li>jQuery, WordPress</li>
                                    <li>Sublime Text</li>
                                    <li>Filezilla</li>
                                </ul>
                                <ul v-else-if="item.id === 'lfn'">
                                    <li>Vanilla Javascript/jQuery, PHP custom framework</li>
                                    <li>Sublime Text, Notepad++</li>
                                    <li>Filezilla</li>
                                </ul>
                                <ul v-else-if="item.id === 'ssi'">
                                    <li>jQuery, WordPress</li>
                                    <li>Notepad++</li>
                                    <li>Filezilla</li>
                                </ul>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </section>
</template>

<script>
import sectionMixin from './section.mixin.js';

const stringDefault = {
    type: String,
    default: '',
};
const timeComponent = {
    props: {
        start: stringDefault,
        end: stringDefault,
        total: stringDefault,
    },
    // template: `
    // <div>
    //     <span class="text-no-wrap">{{start}}</span> - <span class="text-no-wrap">{{end}}</span>: <span class="text-no-wrap">{{total}}</span>
    // </div>`,
    render(h) {
        const span = text => h('span', {
            class: 'text-no-wrap',
            domProps: {
                innerText: text,
            },
        });
        return h('div', [
            span(`${this.start} -`),
            span(`${this.end}: `),
            span(this.total),
        ]);
    },
};

export default {
    components: {
        jobTime: timeComponent,
    },

    mixins: [
        sectionMixin,
    ],

    data: () => ({
        section: {
            heading: 'Experience',
            icon: 'mdi-check-circle',
            id: 'experience',
        },
        experienceList: [{
            id: 'rsbm',
            employer: 'Rosenboom Machine & Tool',
            title: 'Software Engineer',
            jobStart: 'Nov 2014',
            jobEnd: 'Mar 2020',
            totalTime: '5.3 years',
        }, {
            id: 'arm',
            employer: 'Anderson Robertson Marketing',
            title: 'Director of Web Development',
            jobStart: 'Feb 2014',
            jobEnd: 'Nov 2014',
            totalTime: '9 months',
        }, {
            id: 'lfn',
            employer: 'Lawyerfind Network',
            title: 'Front-end Developer',
            jobStart: 'Sep 2012',
            jobEnd: 'Feb 2014',
            totalTime: '1.5 years',
        }, {
            id: 'ssi',
            employer: 'Smart Sites Imaging',
            title: 'Web Developer',
            jobStart: 'Aug 2011',
            jobEnd: 'Oct 2012',
            totalTime: '10 months',
        }],
    }),
    computed: {
        timelineCondensed: vm => vm.$vuetify.breakpoint.mdAndDown,
    },
};
</script>

<style>
.experience__cardTitle {
    word-break: initial;
}
</style>