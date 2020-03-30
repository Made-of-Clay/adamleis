<template>
    <div class="relative">
        <input v-model="query" type="search" placeholder="Search">
        <div class="siteSearch__results">
            <template v-if="searchResults.length">
                <router-link
                    v-for="link in searchResults"
                    :key="`link-${link}`"
                    :to="link"
                    class="block hover:bg-blue-200 p-1"
                >
                    "{{query}}" found at {{link}}
                </router-link>
            </template>

            <output v-else-if="query">
                No matches found for "{{query}}"
            </output>
        </div>
    </div>
</template>

<script>
// import Flexsearch from 'flexsearch';

export default {
    data: () => ({
        index: null,
        query: '',
        searchResults: [],
    }),

    watch: {
        query(query) {
            if (!query) {
                if (this.searchResults.length) {
                    this.searchResults = [];
                    return;
                }
            }
            // TODO debounce search
            this.querySearchAsync(query)
                .then(results => {
                    switch (results) {
                        case null:  return this.searchResults; // basically do nothing
                        case false: return [];
                        default:    return results;
                    }
                })
                .then(searchResults => this.searchResults = searchResults)
                .catch(console.error)
            ;
        },
    },
    mounted () {
        this.index = new Flexsearch({
            tokenize: 'forward',
            doc: {
                id: 'key',
                // here you choose the fields you want to index.
                // for me I will search in the title and the content of each page.
                // of course I stripped the content before so I use the plain text content not the markdown text
                field: ['title', 'content'],
            },
            async: true,
        });
        // Vuepress injects the $site global variable in the Vue instance, you can get the pages array from the $site object
        const { pages } = this.$site;
        // finally you add the pages to the FlexSearch index.
        this.index.add(pages);
    },

    methods: {
        /**
         * @param {String} queryString The string searched ($data.query)
         * @returns {Promise} Result of search; empty array if too soon or should disregard; string path, null no-search, false failed search
         */
        querySearchAsync (queryString) {
            const { pages, themeConfig } = this.$site; // pages = all pages, themeConfig.nav = main site nav
            const query = queryString.trim().toLowerCase();
            const max = 10;
            if (this.index === null || query.length < 3) { // not inited or too short? return empty
                return Promise.resolve(null);
            }
            const searchOpts = {
                limit: max,
                threshold: 2,
                encode: 'extra',
            };
            return this.index.search(query, searchOpts).then(result => {
                if (result.length) {
                    return result.map(page => page.path);
                    // getting the value and link of each page that contains the search term
                    // return result.map(page => ({
                    //     link: page.path,
                    //     // value: this.getQuerySnippet(page), // wtf is this? maybe extract snippet from page content
                    //     // value: query, // shim
                    // }));
                } else {
                    return false;
                    // return [{ value: `No results! Try something else.`, link: `#` }];
                }
            });
        },

        /**
         * Extracts snippet from matched pages; current strict (exact match only) but could be fuzzier (split on words or just search fragments)
         * Might use this on page to highlight query string searched? or something
         * @param {Object} page The page prop from Vuepress
         * @returns {String} Matched string snippet
         */
        getQuerySnippet(page) {
            let snippet = '';
            const textListToSearch = [
                page.title,
                page.path,
                page.frontmatter.description || '',
                ...(page.frontmatter.keywords || []),
            ];
            const query = this.query;
            const re = new RegExp(`(.{0,20})?${query}(.{0,20})?`, 'i');
            textListToSearch.forEach((text, i) => {
                if (!text.includes(query) || snippet) {
                    return; // if not in checked text OR snippet's filled already, move on
                }
                // figure out snippet
                const charSnippetRange = 20;
                const charIndex = text.indexOf(query);
                if (re.test(query)) {
                    const matches = query.match(re);
                    const preText = matches[1] || '';
                    const postText = matches[3] || '';
                    snippet = [preText, `<b>${query}</b>`, postText].join('');
                } else {
                    console.warn(re, 'test failed for', query);
                }
            });
            return snippet;
        },

        // getQuerySnippetFuzzy(page) {
        //     // what do I search in page for content?: title, path, frontmatter > description keywords
        //     const searchTerms = this.query.split(' ');
        //     const keywords = page.frontmatter.keywords || [];
        //     let foundTerm = '';
        //     const matchedText = [page.title, page.frontmatter.description, ...keywords].find(text => {
        //         const found = searchTerms.find(term => text.includes(term));
        //         if (found) {
        //             foundTerm = found;
        //             return true;
        //         } else return false;
        //     });
        //     if (matchedText && foundTerm) { // foundTerm check is a little redundant
        //         if (words.length > 3) {
        //             const words = matchedText.split(' ');
        //             // should split and return selected snippet
        //             const matchIndex = words.indexOf(this.query);
        //             if (matchIndex > -1) { // should always be true
        //                 const preIndex = matchIndex > 0 ? matchIndex-1 : null;
        //                 const postIndex = matchIndex < (words.length-1) ? (matchIndex+1) : null;
        //                 // const snippet = `...${} <b>${}</b> ${}...`;
        //             } else {
        //                 return matchedText;
        //             }
        //         } else {
        //             // just the matchedText is enough
        //             return matchedText;
        //         }
        //     }
        // },
    },
};
</script>

<style lang="stylus">
.siteSearch__results {
    @apply absolute left-0 bg-gray-100;
    top: 100%;
}
</style>