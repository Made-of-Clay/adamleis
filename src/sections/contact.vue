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
                        @verify="checkValidation"
                        @expired="resetCaptcha"
                    />
                    <v-alert v-if="feedback" :type="this.emailResult.type" class="mt-4">
                        {{this.emailResult.feedback}}
                    </v-alert>
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
                            :loading="emailing"
                            @click="send"
                        >
                            Send
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="6">
                <p>You can also reach out to me through social media:</p>
                <v-list>
                    <v-list-item>
                        <v-icon color="primary" class="mr-2" v-text="'mdi-facebook'" />
                        <x-link href="https://www.facebook.com/people/Adam-Leis/20927251" v-text="'Facebook'" />
                    </v-list-item>
                    <v-list-item>
                        <v-icon color="primary" class="mr-2" v-text="'mdi-linkedin'" />
                        <x-link href="https://www.linkedin.com/in/adam-leis-75018b23/" v-text="'LinkedIn'" />
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import sectionMixin from './section.mixin.js';
import vueRecaptcha from 'vue-recaptcha';

let recaptchaToken = '';

export default {
    components: {
        vueRecaptcha,
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
    }),
    computed: {
        nameRules: vm => ['required', 'nameLength'].map(rule => vm.rules[rule]),
        emailRules: vm => ['required', 'validEmail'].map(rule => vm.rules[rule]),
        emailResult: vm => ({
            feedback: vm.feedback,
            type: vm.emailError ? 'error' : 'success',
        }),
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
            this.feedback = '';
            this.$refs.form.resetValidation();
        },
        clear() {
            this.feedback = '';
            this.$refs.form.reset();
        },
        validate() {
            this.$refs.form.validate();
        },
        checkValidation(token) {
            this.validate();
            recaptchaToken = token;
            // if (this.validForm) {
            //     this.$refs.recaptcha.execute();
            // }
            // this.$nextTick(() => this.send());
        },
        send() {
            if (!this.validForm) return;
            this.emailing = true;
            this.resetCaptcha();
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
                .then(feedback => this.feedback = feedback)
                .catch(thrown => console.error(thrown))
                .finally(() => this.emailing = false)
            ;
        },
        resetCaptcha() {
            this.$refs.recaptcha.reset();
        },
    },
};
</script>

<style>

</style>