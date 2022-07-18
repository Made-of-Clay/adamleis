// not the xml lang; abbrev. for "external link"
export default {
    functional: true,

    render(h, context) {
        const text = context.slots().default
            ? context.slots().default
            : (context.data && context.data.domProps && context.data.domProps.textContent)
                ? context.data.domProps.textContent
                : ''; // could conditionally use href if I cared/others used this
        const icon = h('v-icon', {
            props: { 'x-small':true },
            class: 'ml-1 mt-n3 primary--text',
        }, 'mdi-open-in-new');
        const children = [
            text,
            icon,
        ];
        return h('a', {
            domProps: context.props,
            class: context.data && context.data.staticClass ? context.data.staticClass : '',
        }, children);
    },
};