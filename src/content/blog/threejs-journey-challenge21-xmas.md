---
external: false
draft: false
title: "Three.js Journey December 2025, Challenge 21: Christmas"
description: "A retrospective blog post for Three.js Journey's December 2025 Challenge 21: Christmas"
date: 2026-01-04
tags: [code, threejs, creative, christmas, xmas, tree]
---

# Three.js Journey December 2025, Challenge 21: Christmas

I'm a bit behind on posting about this one, but the December 2025 challenge was, surprise surprise, Christmas themed. For my ideas, knowing it would likely be themed as such, I began in November thinking about how to angle the project. **I knew I wanted an interactive information site.**

It's been a goal to learn the technical details of great info sites with rich interactions. It still is! This was my first crack at it, so let's dive in to what I learned.

## Modeling

Modeling is still one of my relative weak points in 3d graphics. In my undergrad, I liked it fine, but I really preferred animation, lighting, and special effects. It seems that's still true today.

That said, I love being *able* to make my own assets for Three.js projects, and I want to continue improving. The greatest hurdles continue to be time, practice, and refinement.

### It's Modelin' Time!

> You don't need the 10k hours to become a master in order to be passably good at something.

Time is *always* a challenge when it comes to learning/mastering things. It will just take time building things to get better. I don't have to be a master at it. I just need that 20 hour "proficiency" benchmark to be where I want to be.

[Josh Kaufman's excellent TedEx](https://youtu.be/5MgBikgcWnY?si=NyY5hvXbIPUFc5yz) from 12 years ago drives this point home. You don't need the 10k hours to become a master in order to be passably good at something. I don't need 10k hours to look like I know what I'm doing when modeling, texturing, possibly light, possibly rigging, animating, etc. in Blender and exporting to Three.js.

I've got Andrew Price, a.a.a. Blender Guru's, outstandingly awesome [Beginner Blender 4.0 Tutorial](https://youtu.be/4haAdmHqGOw?si=-r3t6IGtTuspCBfJ) in my playlists and have slowly been working my way through it. (I must return before I forget some early basics and need to return and remind. Also, Blender v5 has been released since I've started. [I'll have to watch the Guru's video covering those new features too.](https://youtu.be/-tbSCMbJA6o?si=LKgZU4Kqh31LwYPj))

### Practice Makes Proficient

The point to growing at some skill isn't just spending time in it. **The skill must be intentionally shaped through practice.** A one-on-one tutor or mentor season of training is best. The tutor/master/teacher can help direct and shape the student. Absent that, YouTube videos and community feedback is the next best.

Again, I'm really only aiming at that 20-hour proficiency, but focused practice is still necessary to achieve the proficiency convincingly.

### Refinement Loop

This practice must be done iteratively to refine the results. Practicing once and never again is how people get lost in tutorial hell. "I learned this. Why is it so hard?" Because it needs practiced repeatedly; it needs refinement.

Drilling something into our muscles, building patterns & routines, disciplining ourselves: these are the boring, tedious, painful steps needed to improve at something. **It's always been this way; it will always be this way.**

> "I learned this. Why is it so hard?" Because it needs practiced repeatedly; it needs refinement.

This is why time, practice, and refinement are so difficult with **any** skill: they require intentionality and investment of effort. Three.js itself is the same. It's a long game.

## Available Time

Similar to learning any skill, e.g. Blender, modeling, texturing, etc., it takes a lot of effort to put in the time for projects.

Frankly, I almost didn't work on this challenge. Life around the holidays is already busy for my family and me. (We had 8 Christmas functions this year.) Throwing a project on top was a known risk. I had to cut priorities and triage features into an MVP I could share, but it needed enough intentional effort to receive worthy critique.

One concern I have on this front: **if I only ever practice "meh" quality, I will become excellent at shipping "meh" quality.**

Refining and polishing a project is a critical skill. In my undergrad art school, *finishing* a project was one of my weaknesses. I used excuses like timelines and conflicting course project requirements to hand waive why I didn't finish the projects, but I wonder if I even knew how.

I also don't play the "when I find time" game. To my wife's chagrin, I'm quick to assert "when I *make* time" instead. I know these projects need prioritized in order to really get the quality I want out of them. It's why I've been trying to prune them down to the smallest essential features (MVP). I want to ship, I want to polish something small if I can only give that time, and I want to master those little steps.

When I come to a bigger project, I need to know I can do these little steps. **I must prove myself in the little projects before I'm realistically ready for the big projects.**

## Style Shifts

Given my project pruning, I knew I had to tighten the scope of the project and intentionally skimp in tactical ways.

The first few versions of my scene, specifically the tree model, were using more realistic graphics. Once I assemble the first few trees, I knew I would have issues with realistic scenes and a coherent "look and feel." That's when I decided, in a cheating kind of way, that **I could get away with a loss in quality if I committed to a less realistic style.**

I found a great low-poly toonish tree model by ____ and used that to set the style standard for the scene. This would allow me to focus my energy on the scene and message rather than obsessing over rendering quality.

## Copy Editing

**The goal of this project was to practice presenting an interactive scene with information and interesting graphics.** I know projects like this have rough edges that just need to be felt before they're known and can be foreseen.

Pairing text content with graphics can be quite the challenge. I began knowing I'd have roughly 8 subjects in the scene I'd want to cover. That meant ensuring they were represented in the scene. That also meant planning the progression of information so camera movements weren't erratic.

I also had drafted up the copy (overall) prior to the project for a group discussion on the same topic, so that was a convenient double-dip.

This reinforced a central SEO idea: content is king. I *could* have made fancy graphics and b.s.ed my way to presentation, but **I believe in the importance of starting with strong, central content and beautifying the experience afterward.** (This is true for art, graphics, music, literature, etc.)

## Misc.

A handful of misc. was learned along the way too. As I began building and planning the scene, I learned from Bruno ("Lesson 48: Mixing HTML and WebGL") there are **performance hits taken when mixing HTML and WebGL content.** I must learn more about profiling these hits to mitigate them in future projects. I'm not sure how else you have good indexable (SEO) content with rich experiences.

Also, **lighting is still tricky to get right**, especially depending on the desired style. While my scene's lighting is *acceptable*, I don't think it's optimal. Like modeling & texturing, this will require much practice.

> Like modeling & texturing, [lighting] will require much practice.

Another lesson learned from Three.js Journey for this challenge: using the `LoadingManager` to help notify progress of loaded assets. Previously, I manually returned a Promise from whichever class I created to manage assets/scenes. When the promise resolved, I set a flag in the `main.ts` file and updated from there. Using the `LoadingManager` is a *much* nicer approach. The 2nd parameter of the `LoadingManager` constructor is a progress callback, so **the loaded & total assets can give a percentage to display for the user.** Brilliant!

Finally, **test your scene exports frequently and quickly.** I had multiple cases where too much or not enough of the scene was loading into Three.js. Getting that just right took trial and error.

Also, a confirmed lesson from the past iteratively proves itself in this project, and that is **the value of setting up build pipelines for CI/CD very early on.** It's liberating to focus on the project itself all the way up to submission time and not fretting over deployment issues in the 11th hour. **I save myself so much stress by forcing that to work as the 1st or 2nd thing I do in each project.** Thanks past me!

## We Don't Have All Day (Conclusion)

I really find **the reflections on quality and time most valuable** this time around. While I want to keep my focus narrow, I also want to build cool projects. I might be proud of how I handled my workflow from Blender to Three.js/browser, but that doesn't always translate well when showing off the project.

I'd love to iterate on the project and steadily increase the visual style & quality while keeping performance tight. Another idea to consider: **steal like an artist.** Recreate amazing sites to reverse engineer how they did it and how I could change implementation without changing (significantly) the result. Reverse engineering lessons are helpful when borrowed for other projects. (Implementation details, not full IP theft.)

That's all for now. It's been a good project with good lessons learned. Perhaps I can improve on it as I continue leveling up. Until then, thanks for making it this far and, of course, Merry (belated) Christmas!

<!-- ## Model Credits

TODO add credits here -->