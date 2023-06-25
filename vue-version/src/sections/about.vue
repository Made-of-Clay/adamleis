<template>
    <section class="about">
        <h1>
            <v-icon v-text="section.icon" />
            {{section.heading}}
        </h1>

        <div class="multipleColumns">
            <p>
                My name is Adam Leis and I am a web app developer, front-end and often full stack
                <b @mouseover="hoveringAsterisk = true" @mouseout="hoveringAsterisk = false">[*]</b>
                , located in northwest Ohio.
            </p>

            <figure class="about__photo float-sm-left mr-sm-2">
                <img :src="photo" alt="Photo of Adam Leis">
            </figure>

            <p>I have a wonderful wife, an amazing son, and another son on the way! Much of the work I do is to provide the best, blessing-filled life for them that I can.</p>

            <p>As for me, I am a passionate learner who loves discovering new things, studying new topics, and marveling at how often seemingly-disparate topics and lessons overlap and mimic each other. A quick example of this is how Plato's Theory of Forms mimics object-oriented programming. To Plato, physical objects (objects) are only images (instances) of the truer forms (classes) they represent. A similar pattern is seen between blueprints or plans and an actual finished project. Who knew? (I am not the only one to recognize this, as a quick Google search will reveal, but being less novel does not make it less interesting.)</p>

            <p>My love of learning was discovered in college and has only grown since then. I have since come to favor the term <em>philomath</em> to describe this delightful condition of mine. Topics I tend to favor are philosophy, religion, linguistics, art, astronomy, history (especially Ancient Near East and Mediterranean, i.e. Greco-Roman, Jewish history), music (especially music theory), and technology as it relates to any of the preceding. Most any other topic is of interest as well, but these are the ones I frequently return to.</p>

            <p>I am very active in my local church in a number of roles ranging from the a/v tech team to helping with and leading the youth group, leading a college discussion group, and being an Elder within the church. God has placed me in these leadership roles and has grown me as a result. I never thought of myself as a leader prior to these roles, but with these experiences, I see what a servant-leadership mindset looks like and have a greater appreciation for how to serve my community. It has been a blessing for which I am very grateful to have had.</p>

            <p :class="asteriskClass" class="about__asteriskNote">
                <b>[*]</b> I am sensitive to how vague "web [app] developer" is, as well as "front-end" and "full stack" developer. I suspect it facilitates flexibility in the work done as a front-end developer can focus on CSS (Sass/SCSS/LESS/Stylus) or Javascript (web games via Canvas &amp; formerly Flash, SPA frameworks like Vue, React, or Angular, etc...). Chris Coyier has a good post on <x-link href="https://css-tricks.com/job-titles-in-the-web-industry/" v-text="'CSS Tricks'" /> on this topic and it has come up on <x-link href="https://shoptalkshow.com/tag/job-titles/" v-text="'Shop Talk Show'" /> several times. Others in the web community have written or spoken on this too.
            </p>
        </div>
    </section>
</template>

<script>
import sectionMixin from './section.mixin.js';
import photo from '../assets/me-photo-sm.jpg';

export default {
    mixins: [
        sectionMixin,
    ],

    data: () => ({
        section: {
            heading: 'About',
            icon: 'mdi-information',
            id: 'about',
        },
        photo,
        hoveringAsterisk: false,
    }),
    computed: {
        asteriskClass: vm => vm.hoveringAsterisk ? 'secondary lighten-4' : '',
    },
};
</script>

<style lang="scss">
.about__photo {
    // --margin: 8px;
    border: 3px solid black;
    border-radius: 50%;
    margin: 8px auto;
    overflow: hidden;
    position: relative;
    shape-outside: circle(50%);

    &, img {
        --size: 150px;
        height: var(--size);
        width: var(--size);
    }
    &::after {
        border: 2px solid white;
        border-radius: 50%;
        content: '';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
    }
}
.about__asteriskNote {
    transition: background-color 0.3s;
}
</style>