// const genResponsiveImages = require('responsive-images-generator');
const fs = require('fs-extra');

/*
crawl directory ./src/assets -- use fs-extra
get list of images
loop for orig images
compare against instances of formatted images to find unformatted
    e.g. thumb-1024x768--my-sweet-image-2.jpg
    or   my-sweet-image-2@1024x768.jpg
format unmatched/unformatted images to responsive sizes
    responsive sizes based on responsive image recommended sizes (research this)
save w/ chosen format

I will then git add src/assets and push w/ code - would be cool to use Firebase maybe someday
*/
resizeImages();

async function resizeImages() {
    try {
        const items = await fs.readdir('./src/assets');
        console.log(items);
        // TODO loop images, save frag of resized, filter out resized (maybe .reduce())
    } catch (err) {
        console.error(err);
    }
}