export default {
    state: {
        drawerOpen: false,
        sections: [], // [{ heading, icon, id }]
        sectionOrder: [
            'sectionAbout',
            'sectionExperience',
            'sectionHighlights',
            'sectionSkills',
            'sectionResearchDevelopment',
            'sectionEducation',
            'sectionContact',
        ],
        masthead: { src:'', kudos: '', link: '' },
    },

    mutations: {
        openDrawer(state, shouldOpen = true) {
            state.drawerOpen = !!shouldOpen;
        },
        addSection(state, info) {
            const matches = state.sections.find(section => section.id === info.id);
            if (!matches) {
                state.sections.push(info);
            }
        },
        updateMasthead(state, data) {
            state.masthead = data;
        },
    },

    actions: {
        //
    },
};