---
external: false
draft: true
title: Super Dynamic Apps
description: I share some insights I've learned from making highly configurable web apps & sites.
date: 2025-04-08
tags: [code, programming]
---

# Super Dynamic Apps

In my current work, I'm responsible for making our web apps & sites highly configurable so that each client can (mostly) custom tailor our products to their wants/needs. This is very difficult work.

> "Everything should be made as simple as possible, but not simpler." - Albert Einstein

I've iterated over many ideas and implementations on how to make this work. JSON-heavy configuration files, database-stored settings fetched at runtime, combinations of both, low-code config files like HTML partials that are dropped into the `head` when applicable, etc.

## Vision Forward

Having tried, failed, refined, and retried all of these approaches, I've come to painfully appreciate the great and powerful value of the custom website/web page builder UI. [Wix](https://www.wix.com/), [Weebly](https://www.weebly.com/), [Webflow](https://webflow.com/), etc. are all excellent examples of this (and many more exist).

I've been dreaming up a custom page builder for our own products as well. One significant challenge that presents itself is making the time for R&D. While the value is recognized, there's still enough work to slow my brainstorming and experimenting. That also means, in order to accomplish this R&D, I must do it on my own time. Not a terrible solution, but difficult to implement for similar reasons. (I'd like to be a present husband and father 😁)

## Technical Challenges

Some additional technical challenges that I've been considering: SSR setup, integration with Vue for reactive UIs, defining intuitive data contexts (e.g. Pinia store, other flux-like stores), and defining a light-enough data schema for storing the definitions.

### SSR Setup

A modern front-end tool like Vue.js (or React, or Svelte, etc.) seems the right tool for the job here, at least regarding the interactive building part ("Edit" mode). However, actually rendering the page ("View" mode) should be done on the server for better page load times and, if applicable, better SEO indexing.

In many of the dashboard apps I tend to build at ITI (and previous places of employment), SEO has rarely been a requirement. They're almost always behind a login, so no bots can reach them by design.

Improving page rendering is always a good practice, much like RWD. It's best when we just bake the practice into our development habits. However, I've been in an unhealthy space with this regard. We want fast page load times, certainly, but we often settle for "good enough." Some days I'm frustrated by this, but admittedly, other days it's quite fine. I cannot imagine this is unique to me.

[Next.js](https://nextjs.org/) (React) and [Nuxt.js](https://nuxt.com/) (Vue) are great options for SSR projects. So much comes baked in. Depending on tech stack requirements, either are great options.

An alternative approach would be to use whatever existing server-side languages are available. Go, PHP, Python, C#, Ruby, etc. can take and interpret the defined page schema and render static HTML. The only downside to choosing any of these tools is balancing it with whatever reactivity and hydration needs the front-end has with the rendered markup. Not a blocker, but devs must be aware of the hurdle.

### Integration with Vue for Reactivity

I'm a huge fan of Vue.js. When I started dipping into the front-end soup of options, Angular 2 had just come out, and React was a new kid. Vue was even newer (still in v1 at the time, but v2 was just about to drop).

I had tried Angular.js (v1) and liked it, but the shift to v2 was jarring, and I was very new to TypeScript still. I also had been resisting build systems on the front-end for a while. I only just started using Grunt/Gulp; my reception was tepid. On to React.

JSX was immediately distasteful. I really didn't care for mixing HTML into JS. (I would later come to appreciate what it was accomplishing and warmed to the tech.) I also wasn't thrilled with how integral the build step was for new adopters. I bookmarked it as a maybe and moved to Vue.js

In Vue.js, I was thrilled that my two biggest complaints were not near requirements. **I didn't *need* a build step**, and I could keep my markup, styles, and logic separate. It wouldn't take me long to get into the single-file component ".vue" pattern and end up adopting build systems, but this was the warm invitation I needed.

Since then, I've guzzled the Vue.js kool-aid and loved component-based front-end UI architectures. I eventually returned to React and appreciated better what it was doing, but I still don't like CSS-in-JS approaches…

That said, **I want Vue-flavored data reactivity in my page builder.** This presents a challenging hurdle. It's not difficult to bind attributes to a given HTML element or Vue component. `v-bind` does so trivially. Binding events is a bit more complicated. How will the function be defined and included in the proper context for `v-on` to bind it?

### Reactive Data Context

Similarly, how will this context be defined? Will it be a global store a la Pinia? Can it be scoped to the runtime component alone? Should I use provide/inject to define and access functions? Such are the trials & tribulations of client-side state management and event handling.

One WIP idea is to provide a way to define Pinia stores (or even custom-defined stores with `ref`, `computed`, and `reactive`) that are accessible for any given page. This leads to the question, "How will the user who builds the page define those stores?" Another UI would be required to support Pinia store-building in a no/low-code UI.

