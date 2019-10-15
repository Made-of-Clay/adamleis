import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import 'vuetify/dist/vuetify.min.css';

import app from './app';
import mocPortfolio from './portfolio';
import mocHome from './home';

import api from './services/api';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(api);

const routes = [
    { path: '/', component: mocHome, },
    { path: '/portfolio', component: mocPortfolio, },
];
const router = new VueRouter({ routes });

new Vue({
    el: '#app',

    router,
    
    render: h => h(app),
});
