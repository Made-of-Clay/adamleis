<template>
    <div>
        <h2>Highlights</h2>

        <div>
            <ul>
                <li
                    v-for="gallery in galleryData"
                    :key="gallery.id"
                    @click="selectedGalleryId = gallery.id"
                >
                    {{ gallery.text }}
                </li>
            </ul>

            <div v-if="selectedGallery.id" class="gallery" :data-tab="selectedGallery.id">
                <p class="gallery__blerb">
                    {{ selectedGallery.blerb }}
                </p>
                <div>
                    <img src="" alt="">
                    <div class="gallery__thumbnails">
                        <figure
                            v-for="image in selectedGallery.images"
                            :key="`${selectedGallery.id}-${image.src}`"
                            @click="selectImage(image)"
                        >
                            <img src="{{ image.src }}" alt="">
                        </figure>
                    </div>
                    <p>{{ selectedCaption }}</p>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
/**
 * @GalleryImage
 * @property {string} src
 * @property {string} caption
 * 
 * @typedef Gallery
 * @property {string} id
 * @property {string} text
 * @property {string} blerb
 * @property {GalleryImage[]} images
 */
/** @type {Gallery[]} */
import galleryData from './galleries.json';
import { computed, ref } from 'vue';

const selectedGalleryId = ref(galleryData.at(0)?.id);
const selectedGallery = computed(
    () => galleryData.find(g => g.id == selectedGalleryId.value) ?? {},
);
const selectedSource = ref('');
const selectedCaption = ref('');
/**
 * I could just cache the source and compute the caption, but what's the point?
 * @param {GalleryImage} image 
 */
function selectImage(image) {
    selectedSource.value = image.src;
    selectedCaption.value = image.caption;
}
</script>
