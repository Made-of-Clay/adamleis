<template>
    <section>
        <h1>
            <v-icon v-text="section.icon" />
            <template v-if="$vuetify.breakpoint.width < 400">
                {{section.heading}}
            </template>
            <template v-else>
                Research &amp; Development
            </template>
        </h1>

        <div class="multipleColumns">
            <p>As indicated in the <a href="#about" @click="$vuetify.goTo('#about')">About</a> section, I love learning. I have included this section to point out what tech &amp; web topics are on my horizon for further study and learning.</p>

            <ul>
                <li><b><x-link href="https://www.docker.com/" v-text="'Docker'" /></b> - containerization is an awesome concept and we began using it at Rosenboom before I was laid off during the COVID-19 outbreak. I want to learn more about this powerful tool.</li>
                <li><b>Atomic/Utility-first CSS</b> - initially suspicious of atomic CSS, I see value in it now after having used Vuetify's utility and helper classes. As with any potentially great tool, it must be carefully used so as not to create the exact problems it is often criticized over. Upon a fuller version of my website, I am planning on using <x-link href="https://tailwindcss.com/" v-text="'Tailwind CSS'" /> to scratch this itch.</li>
                <li><b>Data Visualization</b> - I gained some experience with this at Rosenboom when needing to display Employee performance data as well as a plant's current labor on the floor. More about the "Floorboard" application is covered in <a>Highlights</a>, but in short, it displayed work centers, labor, and the timeliness of the work (i.e. on-time or late work) while allowing the user to toggle between other layers (phones, terminals, etc...) and navigate around the plant via pan &amp; zoom.</li>
                <li><b>AI/Machine Learning</b> - this admittedly-ambitious desire aims to fill the gap in my understanding of how AI/ML works and what practical use cases it has on whatever scale I am working at. I have gone through some courses/videos at <x-link href="https://stackskills.com/" v-text="'Stack Skills'" /> and simply need to continue learning and experimenting.</li>
                <li><b>AWS/Cloud Computing</b> - with serverless culture and the JAM stack paradigm available today, robust, fast websites can be created without having to manage an entire back-end framework or CMS. As a developer preferring to work on the front-end, this is very appealing to me. I have experimented with Google Firebase, but those experiments never fully developed into published web apps. AWS, Google Firebase, and Microsoft Azure offer awesome cloud services and I want to know more about them to utilize said awesomeness. In the future, I plan on using <x-link href="https://aws.amazon.com/lambda/" v-text="'AWS Lambda'" /> to process my contact form as an exercise.</li>
                <li><b><x-link href="https://jestjs.io/" v-text="'Jest'" /></b> - I have been using Mocha/Chai and PhantomJS/headless Chrome for my testing, but Jest looks appealing and I am interested in learning more about what it has to offer.</li>
            </ul>

            <p class="mt-4">
                There is always more to learn and this list will likely update as time goes on.
            </p>
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
            heading: 'R & D',
            icon: 'mdi-book-open-page-variant',
            id: 'research-development',
        },
    }),
};
</script>