const api = {
    baseUrl: 'http://api.adamleis.com/wp-json/wp/v2',

    /**
     * Fetches json content from wp-rest path given
     * @param {String} path URL fragment built onto this.baseUrl - should be valid wp-rest endpoint
     * @return {Promise} then-able object or pending promise
     */
    get(path = '') {
        if (path.substr(0, 1) !== '/') {
            path = `/${path}`;
        }
        return fetch(`${this.baseUrl}${path}`).then(response => {
            let json = response.json();
            if (response.status >= 400) {
                throw new Error(`(${json.code}) ${json.message}`);
            } else {
                return json;
            }
        });
    }
};

export default {
    install: Vue => {
        Vue.prototype.$api = api;
    },
};