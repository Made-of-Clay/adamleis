<template>
    <div class="mt-10">
        <p
            v-for="(line, i) in content"
            :key="i"
            v-text="line"
        />
    </div>
</template>

<script>
export default {
    props: {
        singleParagraph: Boolean,
    },

    data: () => ({
        lines: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tellus ex, ornare eu aliquam a, tincidunt id nisl. Nunc in tortor dapibus, suscipit mauris ut, ultricies ante. Integer fermentum enim ut justo laoreet, pretium accumsan tortor rhoncus. Aenean ultricies risus lacus, sed commodo mi placerat quis. Aenean vehicula molestie odio, sed pretium sem fermentum nec. Morbi a nisl magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse ultrices tristique eros, mollis lacinia sapien facilisis et. Ut vel lacus malesuada, commodo nisi sed, vestibulum tellus. Vivamus aliquet libero vitae sapien blandit condimentum. Nullam commodo congue ipsum, eget venenatis velit dignissim et. Etiam sagittis consequat orci vel pharetra. Nullam iaculis odio leo, non eleifend enim tincidunt pellentesque.',
            'Integer id est at magna pretium porttitor. Sed eu scelerisque libero, sed congue turpis. Suspendisse faucibus nibh quis justo congue bibendum id non turpis. Morbi ante lectus, cursus ut lorem vitae, tempus maximus quam. Suspendisse faucibus, nibh eget porttitor convallis, metus libero viverra urna, vel sagittis magna risus at ante. Vestibulum ut magna fringilla, suscipit massa vel, imperdiet urna. Sed venenatis, diam eu sodales tincidunt, nunc tortor mattis lacus, consequat auctor arcu ligula sit amet risus. In rutrum, ante quis placerat fringilla, ex magna pellentesque sem, in consectetur turpis arcu ac diam. Vivamus non gravida urna.',
            'Nunc libero libero, sodales venenatis turpis bibendum, suscipit malesuada leo. Nunc ut urna id enim facilisis luctus a et purus. Pellentesque sed metus nec ante facilisis congue. Suspendisse auctor vel mi sed lobortis. Nunc gravida tempor nisi, quis facilisis lectus pellentesque nec. Vivamus orci tortor, accumsan in varius in, tristique nec lorem. Integer ultrices lacus eros, at aliquam neque gravida a.',
            'Nullam nec dui in ante convallis facilisis vel et mi. Aliquam gravida massa a egestas auctor. Aenean at suscipit turpis, nec laoreet odio. Pellentesque eleifend fermentum lorem vitae rutrum. Praesent lacinia nulla ac ex aliquam feugiat ut nec mauris. Cras et condimentum magna. Donec aliquam feugiat tortor, at tristique neque fringilla vitae. Vivamus nec ullamcorper turpis. Nullam ullamcorper nec magna non facilisis. Cras at maximus libero, nec commodo sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam nec tincidunt ligula. Donec dapibus sapien a odio maximus mattis. Vestibulum posuere vulputate erat, a gravida erat. Fusce in hendrerit ex. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
        ],
    }),
    computed: {
        content() {
            if (this.singleParagraph) {
                const randIndex = parseInt((Math.random() * 10) / 2);
                return [this.lines[randIndex]];
            } else {
                return this.lines;
            }
        },
    },
};
</script>