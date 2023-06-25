<template>
    <section>
        <h1>
            <v-icon v-text="section.icon" />
            {{section.heading}}
        </h1>

        <v-row>
            <v-col cols="12" sm="6">
                <v-card class="pa-4" max-width="500">
                    <v-form ref="form" v-model="validForm" lazy-validation>
                        <v-text-field
                            v-model="formData.name"
                            label="Name"
                            required
                            :rules="nameRules"
                            maxlength="20"
                            :counter="20"
                            color="success"
                        />
                        <v-text-field
                            v-model="formData.email"
                            :rules="emailRules"
                            type="email"
                            label="E-mail"
                            required
                            color="success"
                        />
                        <v-textarea
                            v-model="formData.message"
                            :rules="[rules.required]"
                            label="Message"
                            required
                            color="success"
                        />
                    </v-form>
                    <vue-recaptcha
                        ref="recaptcha"
                        sitekey="6LeyM-YUAAAAAHOIz1GgVLNoJvK9r2D302ks3mZx"
                        load-recaptcha-script
                        type="checkbox"
                        @verify="verify"
                        @expired="resetCaptcha"
                    />
                    <v-fade-transition>
                        <v-alert v-if="feedback" :type="this.emailResult.type" class="mt-4">
                            {{this.emailResult.feedback}}
                        </v-alert>
                    </v-fade-transition>
                    <v-card-actions>
                        <v-spacer />
                        <v-btn text @click="resetValidation">
                            Reset
                        </v-btn>
                        <v-btn text @click="clear">
                            Clear
                        </v-btn>
                        <v-btn
                            text
                            color="success"
                            :disabled="submitDisabled"
                            :loading="emailing"
                            @click="checkValidation"
                        >
                            Send
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <p>You can also reach out to me through social media:</p>
                <v-list>
                    <v-list-item v-for="link in links" :key="link.icon">
                        <github-icon v-if="link.icon === 'github'" class="mr-2 primary--text" />
                        <v-icon
                            v-else
                            color="primary"
                            class="mr-2"
                            v-text="link.icon"
                        />
                        <x-link :href="link.href" v-text="link.text" />
                    </v-list-item>
                </v-list>
                <p>References are available upon request.</p>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import sectionMixin from './section.mixin.js';
import vueRecaptcha from 'vue-recaptcha';
import githubIcon from '../icon-github';

export default {
    components: {
        vueRecaptcha,
        githubIcon,
    },

    mixins: [
        sectionMixin,
    ],

    data: () => ({
        section: {
            heading: 'Contact',
            icon: 'mdi-email',
            id: 'contact',
        },
        formData: {
            name: '',
            email: '',
            message: '',
        },
        validForm: true,
        rules: {
            required: value => !!value || 'Required field',
            nameLength: value => value && value.length <= 20 || 'Name must be shorter than 20 characters',
            validEmail: value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
        },
        feedback: '',
        emailError: false,
        emailing: false,
        recaptchaToken: '',
        links: [
            {
                icon: 'mdi-facebook',
                text: 'Facebook',
                href: 'https://www.facebook.com/people/Adam-Leis/20927251',
            }, {
                icon: 'github',
                text: 'GitHub',
                href: 'https://github.com/Made-of-Clay/adamleis',
            }, {
                icon: 'mdi-linkedin',
                text: 'LinkedIn',
                href: 'https://www.linkedin.com/in/adam-leis-75018b23/',
            },
        ],
    }),
    computed: {
        nameRules: vm => ['required', 'nameLength'].map(rule => vm.rules[rule]),
        emailRules: vm => ['required', 'validEmail'].map(rule => vm.rules[rule]),
        emailResult: vm => ({
            feedback: vm.feedback,
            type: vm.emailError ? 'error' : 'success',
        }),
        submitDisabled: vm => !vm.validForm || !vm.recaptchaToken,
    },

    watch: {
        'formData.name'(name) {
            if (typeof value !== 'string') {
                this.formData.name = name ? String(name) : '';
            }
        },
        'formData.email'(email) {
            if (typeof value !== 'string') {
                this.formData.email = email ? String(email) : '';
            }
        },
        'formData.message'(message) {
            if (typeof value !== 'string') {
                this.formData.message = message ? String(message) : '';
            }
        },
    },

    methods: {
        resetValidation() {
            this.$refs.form.resetValidation();
        },
        clear() {
            this.$refs.form.reset();
        },
        validate() {
            this.$refs.form.validate();
        },
        checkValidation() {
            this.validate();
            this.$nextTick(() => this.send());
        },
        verify(token) {
            this.validate();
            this.recaptchaToken = token;
        },
        send() {
            if (!this.validForm && this.recaptchaToken) return;
            this.emailing = true;
            const {recaptchaToken} = this.$data;
            const data = Object.assign({ recaptchaToken }, this.formData);
            const opts = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            };
            fetch('http://adamleis.com/emailer.php', opts)
                .then(response => {
                    this.emailError = response.status >= 400;
                    return response.json();
                })
                .then(feedback => {
                    this.feedback = feedback;
                    if (!this.emailError) {
                        setTimeout(() => {
                            this.feedback = ''; // doing this instead of v-snackbar so errors don't disappear too quickly
                        }, 5000);
                        this.resetCaptcha();
                        this.clear();
                        this.resetValidation();
                    }
                })
                .catch(thrown => console.error(thrown))
                .finally(() => this.emailing = false)
            ;
        },
        resetCaptcha() {
            this.recaptchaToken = '';
            this.$refs.recaptcha.reset();
        },
    },
};
</script>

<style>

</style>