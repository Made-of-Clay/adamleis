module.exports = {
    title: 'Site Name',
    description: 'This is my meta description',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Tests', link: '/tests/' },
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
               '@SearchBox': '@vuepress/plugin-search',
            },
        },
    },
    postcss: {
        plugins: [
            require('autoprefixer'),
            require('tailwindcss')('./tailwind.js'),
        ],
    },
    plugins: [
        ['@vuepress/search', {
           searchMaxSuggestions: 10
        }]
    ],
};

/*
home page:
    n recent posts (& their hero pics, if applicable)
    links to blog categories? (& blog hero pic, desc excerpt, etc...)
cat/tag index page:
    n recent posts (& hero pics)
    cat/tag desc/blerb
    total posts in cat/tag?
post page:
    meta (post date, tags, cat, mod date)
    title
    content
    hero image
*/