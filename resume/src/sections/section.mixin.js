export default {
    computed: {
        sectionIsObject: vm => typeof vm.section === 'object',
    },

    created() {
        if (this.sectionIsObject) {
            this.$store.commit('addSection', this.section);
        }
    },
    mounted() {
        if (this.sectionIsObject && this.section.id) {
            this.$el.id = this.section.id;
        }
    },
};