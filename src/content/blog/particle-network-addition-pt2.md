---
external: false
draft: false
title: Particle Network Addition Part 2
description: Part two updating my work with the particle network feature of my website
date: 2025-05-08
tags: [code, programming, js, canvas, accessibility]
---
<!-- https://web.archive.org/web/20150727021631/https://blog.alexwendland.com/2015/particle-network-js-animations/ -->

# Particle Network Addition Part 2

Greetings! The following is a brief update on the work I've been doing on my website to update the Particle Network background effect that's probably floating around (pun intended). Read part 1 if you're interested.

The updates I've made:

- theme toggle control (separate but related)
- theme sensitivity
- custom implementation

Let's dig in!

## Theme Toggle Control

I added a theme toggle control (in the bottom right if I haven't moved it yet). Okay, okay, technically it's "dark mode/light mode" toggling; whatever. The animation effect on toggling is one of those fun little flairs I just love adding. The first implementation was fine, but I discovered during the Particle Network update that I had mixed unrelated code…

![Shame Gif](https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWs4Zmxka2xkZDNiMmoyOXE4OWpvdWVybjBremNuOG8yYjNnZTMwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pDsCoECKh1Pa/giphy.gif)

So I moved that code to the toggle component where it belongs.

One funny whoops I ran into was forgetting which CSS library I've been using. I built this site using [Simple.css](https://simplecss.org/) to provide me with… well, very simple CSS styling. Bootstrap is a classic, and I could have gone that route, but I was looking for something simpler and lighter.

Tailwind is great in a lot of ways and *really* verbose in the markup. I wanted to keep it lighter still. I haven't done a complex analytical comparison between both implementations, so I don't know if it's actually simpler and lighter or not.

What I *thought* I was using was [Pico CSS](https://picocss.com/), another minimal style library that appeals to my interest in just using semantic HTML and making it look good. I like Pico's theme handling approach (for the most part). I fought with my site for a while before I realized I am still using Simple rather than Pico. That explains why the theming features weren't working as expect. 😅

> It's the little things filling your day that will stoke or suffocate your passions.

One additional change regarding the theme toggle styles I made was to move the updated CSS variables from the `html` tag's inline styles into a dynamically-generated `style` tag. I check for the tag's existence, create and append it if missing, then set the `innerHTML` of the tag. this cleans up the devtool's rendered Elements tag perhaps an arbitrary amount, but enough that *I* like it. I also [re-]learned a fun concise way to create the element if it's not present.

```js
const styleId = 'someStyles';
const style = document.head.querySelector(`#${styleId}`)
    ?? Object.assign(document.createElement('style'), { id: styleId });
```

It's a silly thing, but doesn't that `Object.assign` remind you a little of jQuery's classically awesome element creation overload? Y'know, the one that looks like this: 

```js
$('<style>', { id: styleId })
```

What a gem. Fond memories. It's the little things filling your day that will stoke or suffocate your passions.

## Theme Sensitivity

Now that I have theme toggle controls, I wanted to make the Particle Network more sensitive. I was brute forcing the theme toggle controls initially (i.e. stopping/starting the lib). I built into the library (upon rewriting it - see below) the ability to update the options and have those changes update the canvas immediately. Not much to it!

One additional benefit to this update was to locate the "source of truth" regarding styles in CSS where I want it and not repeat data that easily falls out-of-sync otherwise. Specifically, the background and particle colors are being set when the theme updates, and I'm grabbing those computed colors when the Particle Network (Astro component) notices the change. It looks something like this:

```js
const computedStyle = getComputedStyle(document.documentElement);
const particleNetworkOptions = {
    particleColor: computedStyle.getPropertyValue('--particle'),
    background: computedStyle.getPropertyValue('--bg'),
};
```

This way, when it gets set and the options need updated, this code can run and just grab the correct values.

## Custom Implementation

This goal had two facets: (1) to learn the thought process of the Particle Network better and (2) to gain greater control over a cool-but-outdated library. That control is what enabled me to build in the option update and others.

I admit I started the rewrite with some AI help. That rewrote the older code into a TypeScript class for me. Then I picked my way through and cleaned up the unnecessary and hallucinated code. This helped me get familiar with, customize, and study the library more.

This just seems like one of those features I'll be iterating on over the months and maybe years, so I expect more articles like this discussing updates and lessons learned.

## Wrap Up

Some things I've valued most about this update:

- deeper learning & customization of the Particle Network code
- integration (and with looser coupling) of independent site components
- clearly defined "source of truth" for styles and a relatively inexpensive way to access them (there *is* some perf cost but not enough to worry)

Until next time! Keep tinkerin'