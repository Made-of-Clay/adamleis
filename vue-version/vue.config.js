// const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
    transpileDependencies: [
        "vuetify"
    ],
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Adam Leis | Online Resume';
                return args;
            });
    }
};