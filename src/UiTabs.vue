<template>
    <div>
        <ul>
            <li v-for="tab in tabs" :key="tab">
                <slot name="tab" :tab="tab" />
            </li>
        </ul>

        <div>
            <slot :tab="tab" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    tabs: {
        type: Array,
        required: true
    },
});
</script>
