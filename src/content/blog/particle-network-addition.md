---
external: false
draft: false
title: Particle Network Addition
description: Come learn from my experience taking an old particle network library and modernizing it for my own use.
date: 2025-04-14
tags: [code, programming, js, canvas, accessibility]
---
<!-- https://web.archive.org/web/20150727021631/https://blog.alexwendland.com/2015/particle-network-js-animations/ -->

# Particle Network Addition

I've recently added a "particle network" animation to my background. I've always wanted to understand how these cool features work. I've never really known the term(s) for them until recently. Here's how I started using it on this site.

## Learning the Term

I began by searching Google for things like "floating nodes js," "floating dots js," and similar searches, but anything with "nodes" gave me Node.js results (no surprise) and others were not helpful either. I then tried Grok and described the behavior the best I could. This produced helpful results. The following was my prompt…

> Context: HTML canvas element & JS
> 
> What's it called when a canvas element has animated nodes (pin points like stars) floating around that draw lines to each other when they're close enough?

… and part of Grok's reply witht he helpful bits…

> What you're describing is commonly referred to as a "particle network" or "connected particles animation" in the context of an HTML canvas element and JavaScript.…

Now I had my terms. With a few confirmation searches using "particle network" to ensure it wasn't hallucinating, I began researching some GitHub & blogged options.

## Experimenting

I searched through the options available, and there are some tutorials for creating this myself, which I will certainly be doing in the future for my own learning/leveling-up. For now, I just want a quick addition to get started and will refine from there. I landed on the [decade-old `canvas-particle-network`](https://github.com/JulianLaval/canvas-particle-network). It's easy to get running quickly, which is what I was after. It won't give me everything I want, so I can either fork the repo or start from scratch elsewhere, but again, this is just to get up and running.

I dropped a copy of the script in my `/public` folder (the npm package didn't have TypeScript definitions working quite right when I tried installing from there, so I left the copy+paste version in place). One trick to playing with canvas is never knowing when it's rendering the canvas or not, so I (1) set the `body` background to red (`#a00`) and the canvas background passed to the library to a darker red (`#300`). This told me which was rendering.

Once it started rendering the particle network nodes and edges, I unset the reds and played with the colors & nodes of the particles.

## Giving It A Home

Now that I had the settings I liked, I took the time to make a separate component for the particle network to handle logic like init, a11y settings (see below), and when to load the script.

### Accessibility (a11y)

Seeing it all, I noticed it's *a lot* of movement. I know about (but don't often use) the `prefers-reduced-motion` feature. This was a great chance to play more with it.

`window.matchMedia('(prefers-reduced-motion: reduce)')` returns an object and `.matches` provides a boolean for the setting.

```js
const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotionMediaQuery.matches) {
    startAnimation();
}
```

Couple this with the handy `change` event listener, and I can toggle the start/stop of the animation.

```js
const reducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotionMediaQuery.matches) {
    startAnimation();
}
reducedMotionMediaQuery.addEventListener('change', (event) => {
    if (event.matches) {
        stopAnimation();
    } else {
        startAnimation();
    }
});
```

In future iterations (i.e. when I build my own), I'd like to set a fade transition for when it starts/stops the animation. Perhaps a callback for when the transition completes as well. Also, a method to start and stop the animation would be a great improvement.

I also added a mostly opaque background color to the content space to avoid floating particles/edges from distracting from reading. I used *some* transparency though, because frankly, I'm a sucker for see-through effects. An additional `box-shadow` with a generous spread helps it fade a bit. This content background only shows when the effect is active though.

## Wrap Up

So that wraps my report for the new particle network feature running in the background! As mentioned already, there are a few features I'll be adding to improve the site/feature:

- reduced motion toggle
- custom implementation (start/stop methods + transition callback)
- theme-sensitivity (after I add a theme toggle…)
