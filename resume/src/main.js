import Vue from 'vue';
import Vuetify from 'vuetify/lib';
// import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex';
import storeObj from './store';

import app from './app';
import xLink from './x-link';

Vue.use(Vuex);
const store = new Vuex.Store(storeObj);

Vue.use(Vuetify);
const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#da1e33',
                secondary: '#626366',
                accent: '#bcbdc0'
            },
        },
    }
});

Vue.component('x-link', xLink);

new Vue({
    el: '#app',
    vuetify,
    store,
    render: h => h(app),
});
