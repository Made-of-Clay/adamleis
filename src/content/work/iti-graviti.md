---
external: false
draft: false
title: ITI GravITI UI Library
description: An explanation of my work on the GravITI UI component library for Intellectual Technology, Inc.
date: 2024-11-20
---

# ITI GravITI

The GravITI (pronounced "gravity" but with clever marketing) UI component library is ITI's (Intellectual Technology, Inc.) in-house component library. The UX/UI design team worked to build the initial components in Figma, and I worked closely with them to implement the components using the Vue.js library.

We discussed whether to use Bootstrap or Tailwind (which was gaining popularity at the time). Given (1) Tailwind's youth and (2) our existing ubiquitous usage of Bootstrap, we ended up staying with Bootstrap. They are the only two runtime dependencies that GravITI has.

## Purpose

"Why not use an existing UI library like Vuetify, Quasar, or PrimeVue?" Well, we *did* use PrimeVue for some early projects. It had the benefit of theming and existing functionality. It was a close call to either use PrimeVue or roll our own library. As for the other options, Quasar and Vuetify required too much buy-in for our purposes, and we have many legacy application in transition where we wanted to use the library at various states of transition without needing to update *everything*.

**The reason to choose an in-house solution ultimately came down to an interest in control.** We wanted full control over the functionality, design, and roadmap of the library. I'm uncertain if I would have pushed for PrimeVue had I then the knowledge I have now. 🤔 One clear benefit has been the learning process along the way, i.e., how to configure tooling to generate a bundle usable in bundled projects and at runtime. In retrospect, the experience with Storybook has been valuable as well.

## Design Details

The designs were done in Figma, so I spent a lot of time looking through the elements and their associated styles. That meant grabbing values from Figma, but it also meant communicating with the designers when some details were complicated. For example, Bootstrap uses units divisible by 16 to play with the browser's default setting of `16px === 1rem`. The designers were in the habit of base-5 units though. After some conversations and decision making, we ended up following the base-16 units. 

Unsurprisingly, there were many other issues to work through as the project evolved, but that's a story for another day.

## Technical Details

The following is the current (as of Nov. 20, 2024) tech stack used within the GravITI library:

- Vue.js (love that data reactivity)
- Bootstrap
- Vite (it began using Vue-CLI, but the transition was made as Vite matured into its v1 releases)
- Jest (it's on the roadmap to switch to Vitest)
- Storybook (more on this below)

### Storybook

When I began, Storybook became a very helpful tool for getting my components into a robust testing UI space and offered a lot in the way of out-of-the-box documentation. This was a great boon for my progress in advancing the library, which was (and still is) often a political game with the business units of the company. Those close to the technical portions of projects understand the value to keeping the library up-to-date. Those further away understandably… don't care.

In one of the minor version updates though, I noticed *a lot* of dependencies come down for Storybook. They were React-heavy packages (understandably given the underlying architecture is React). Many TypeScript type definitions came down as well. Here's where my problems began.

Some of the `@types` definitions for Storybook may have been helpful for Storybook itself, and even React for relevant projects, but my Vue project types kept getting stomped on. Perhaps I could have contributed to the community work and figured out the solution for others in a similar situation, but the reality is (1) I have trouble selling explicit community support work or (2) working it into the other dev work to justify its inclusion in my task work.

Maybe that's a "blah blah blah, excuses" thing, but it's what's real in my current experience. All in all, while Storybook has been a great help, this and some other issues have been complicating factors.

## Wrap up

Ultimately, the project continues to be one of the more challenging and rewarding projects I've worked on at ITI. The foundational level they play in our applications means diligence and care must be taken. There's a large bull whip effect that happens when changes are made at that low a level of UI development. Although, I can honestly say it's one of my favorite projects.
