---
external: false
draft: false
title: Web Camera Component
description: Web components and how I implemented one finally
date: 2025-05-09
tags: [code, programming, js, canvas, video, webcomponent]
---

# Web Camera Component

I've been wanting to figure out web components for quite some time now. After a few attempts that established it wasn't a totally trivial affair, I gave it some time and finally buckled down. This post will explore the `web-camera` component I made, which requests access to your device's web cam, displays a stream of video, and captures photos to a canvas element. Let's get started.

## What Are Web Components?

Web components (wc) are a way of authoring reusable code that typically involves at least one of the following web APIs: [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements), [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), [templates, and slots](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_templates_and_slots). [Learn more about them at MDN.](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) Additionally, [Dave Rupert](https://daverupert.com/tag/webcomponents/) has written extensively about this topic.

One retroactive reason I'm such a big fan of Vue.js has been how much it's helped build a foundation of knowledge surrounding these topics. All component libraries (Vue, React, Angular, Svelte, etc.) help teach the value of custom elements. To the extent that any of them enable devs to write styles scoped to the component, they imperfectly illustrate the shadow DOM as well. Vue specifically uses `template` and `slot` in its SFCs (single-file components), which was helpful as a sort of ["near-transfer" of knowledge](https://en.wikipedia.org/wiki/Transfer_of_learning#Transfer_taxonomies).

```html
<!-- ButtonLoader.vue -->
<!-- Vue uses `template` to define markup in .vue files; wc do the same -->
<template>
  <!-- Vue's short-hand click listener to bubble the event up -->
  <button @click="$emit('click', $event)">
    <!-- `loading` could be a Vue prop; wc -->
    <span v-show="loading" class="btn-loader" aria-label="Button Loading…"></span>
    <!-- "Default" slot when unspecified; true for both Vue and wc -->
    <slot></slot>
  </button>
</template>
```

One caveat I've noticed so far has been that native web components don't (currently) support data binding to slots, so if you want to pass specific data to a slot, you'll have to figure out a different way. I have not explored this much beyond the initial discovery, so maybe I'm missing something.

```html
<template>
  <button>
    <!-- Vue ✅ wc ❌ -->
    <slot :foo="foo"></slot>
  </button>
</template>
```

## My Dependencies

TypeScript & Vite for bundling and type safety/help; modern browsers

For my `web-camera` component, I used TypeScript for type safety/helpers and Vite to bundle the files. Technically, this could all be done with vanilla JS and no bundler too. The primary downside there is the async needed to fetch the markup and a way to reliably reference the markup path. See more below for my [file organization](#file-organization).

Another dependency is obviously a modern browser with support of the features being used. I've not tested the limits of each browser, but I recall that Safari is slow to adopt of of the web component features. Depending on how bought-in your component is, there may be no issue.

## File Organization

To begin, I've been organizing my component files via co-location just like I do in Vue. Minimally (depending on the complexity of the markup), there are 2 files: web-camera.ts & web-camera.html. These usually live in a directory named accordingly:

```
/web-camera
  /web-camera.html
  /web-camera.ts
```

The reason for co-locating the web components in a directory named the same way is minimally two-fold:

1. co-location within a folder encourages modularity (and prospective unit testing)
2. naming the file(s) the same as the directory makes it easier to differentiate between multiple component files of the same extension (e.g. web-camera.ts vs index.ts or component.ts)

If a bundler is being used, another option is to add a `package.json` file the the following contents:

```json
{
  "main": "web-camera.ts"
}
```

This style of authoring allows both #2 listed above *and* a bonus of cleaner/more concise import statements.

```js
import { WebCamera } from '@/components/web-camera';
// vs
import { WebCamera } from '@/components/web-camera/web-camera.ts';
```

Other helpful files can be defined here: `models.ts`, `constants.ts`, `events.ts`, etc. Also, any assets like images or fonts could be stored in this shared directory for easy access.

## Markup Initialization

The TS file imports (and bundles via Vite) the HTML markup string, which is then instantiated as a DOM node(s). To do this, I create a `div` (detached from the DOM tree), set the `innerHTML` to the imported string, then grab the `firstChild`. That is attached to the component.

```js
import templateStr from './web-camera.html?raw'; // ?raw is from Vite https://vite.dev/guide/assets#importing-asset-as-string
const div = document.createElement('div');
div.innerHTML = templateStr;
const template = div.firstChild;
// inside the component's constructor()…
// if appending to light DOM
this.appendChild(templateEl.content.cloneNode(true));
// if appending to shadow DOM
this.shadowRoot(templateEl.content.cloneNode(true));
```

I originally tried setting the component's innerHTML to the `templateStr`, but that risked losing slot contents and didn't work. `Document.parseHTMLUnsafe()` is another option, though the name is not inviting, but the instantiated DOM is deeper than a simple `div`. Surprisingly, document fragments don't work either. I've not gone deeper into exploring this and the reason why.

```js
// inside constructor()
this.innerHTML = templateStr; // nope
Document.parseHTMLUnsafe(templateStr).body.firstChild; // another option but meh
```

## Issues with Shadow DOM

One peculiar issue I haven't investigated occurred when trying to write to the `canvas` within the shadow DOM. I could stream the media device (webcam) to the `video` correctly, but when trying to capture a snapshot of the stream and draw it to the `canvas`, it didn't work until I removed use of the shadow DOM. There are quirks when dealing with the shadow DOM, so this wasn't totally surprising. I'd like to investigate this more some day, but it was not a rabbit trail for today.

## Attributes & Events

**Attributes** are the way to pass along Initialization options. Nothing is passed into the constructor. After calling `super()` within the `constructor()` method, the tag's attributes can be read.

```ts
class WebCamera extends HTMLElement {
  constructor() {
    super();
    this.getAttribute('data-foo') === 'bar'; // assumes <web-camera data-foo="bar"></web-camera>
  }
}
```

Note that attributes read this way are always strings, so if they could be numbers, booleans, etc., they must be cast as such. More complex validation likely requires duck typing.

Some version of data reactivity through attributes is available using `attributeChangedCallback()`. This is one of several [custom element lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks).

```ts
attributeChangedCallback(attrName: string, oldValue: string, newValue: string) {
  if (attrName === 'foo') {
    // handle newValue and maybe consider oldValue - possibly update an internal options object if helpful
  }
}
```

Just as props allow passing *in* information to the component in React, Vue, etc., attributes do the same for web components.

**Events** similarly allow passing data *out* from the web component. Natively-defined events like `click`, `keyup`, and others can be emitted. Other options exist for custom events like the (surprise surprise) [`CustomEvent` class](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent) may be used.

For `web-camera`, I'm emitting some lifecycle events like `created` (called at the end of the constructor) and `mounted` (called at the end of `connectedCallback` life cycle hook). I also emit events when the video camera stream starts and stops, as well as when photos are captured (which includes the captured image in the `detail` detail map). Consumers can listen just like any other element.

```js
document.querySelector('web-camera')?.addEventListener('capture-frame', event => {…});
```

## Photo Handling

As mentioned, the photo capture emits an event (i.e. `capture-frame`) that can be handled. The photo can be extracted from here.

```ts
document.querySelector('web-camera')?.addEventListener('capture-frame', (event) => {
  event.detail.image; // blob or base64 string
});
```

Additionally, if the photo is capture programmatically (like if the consumer wants to use custom-styled buttons or perform capture events invisibly, e.g. during an online test to detect fraud), the image will be returned from the method call.

```ts
const image = await webCamera.captureFrame();
```

The capture type can be defined via attribute. The capture format returns a `Blob` object by default, but a base64 encoded image can optionally be returned.

```html
<!-- PNG Blob default -->
<web-camera></web-camera>
<!-- JPG base64 -->
<web-camera capture-type="jpg" capture-encoded="true"></web-camera>
<!-- JPG base64; shorthand encoding opt-in -->
<web-camera capture-type="jpg" capture-encoded></web-camera>
```

## Potential Improvements

One idea I have for an improvement is to provide slot controls for the capture button, or any additional buttons. This isn't strictly necessary as the buttons can simply be hidden via CSS, but it would plausibly reduce the amount of markup floating around.

```css
web-camera button { display: none; }
```

Another far-out idea would be to figure out how to use photo/video filtering libraries and allow the user to toggle between different blend modes and filters like sepia, black & white, etc. I must test more with mobile devices and multiple streaming inputs to account for different cameras. Similarly, if I ever need to handle audio input, I'll need attributes factoring those in.

## Conclusion

This has been tons-o-fun! I wrote this webcam library back in 2020 and love that I finally rewrote it with web components in mind. I look forward to building up a set of tools using web components and getting to know this excellent set of APIs better.

A solid # TODO would be to implement some working examples here to provide better illustration of the web component in action. Feel free to check it out [on my GitHub](https://github.com/Made-of-Clay/adamleis/tree/master/src/web-components/web-camera) for now.
