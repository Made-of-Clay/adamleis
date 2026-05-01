---
external: false
draft: false
title: "Three.js Journey Challenge 23: Train"
description: "Brain-dump of project progress on April 2026's challenge."
date: 2026-04-06
---

# Three.js Journey Challenge 23: Train

[See the project](https://tjsj-train.web.app)

> **Update 2026-05-01**: I pivoted hard from the game idea. [Read more below...](#a-big-change-2026-05-01)

April 2026's challenge is themed after trains. I've been waffling on how to approach this challenge. I often default to fun, contemplative or interesting scenes that may have slight interactions available. This time, I wanted to challenge myself with a game. I've not built a game fully before, and the real challenge will be keeping the scope to something manageable. Here's where I'm going currently.

## The Game Idea

After bouncing around several fun ideas, I've landed on something I think might be realistic for this month, especially considering my plethora of obligations, roles, and responsibilities (i.e. not a lot of time each week for fun projects, so don't get too overblown for what's effectively an MVP). Some of my brainstorming and "conversations" with AI got me thinking about a fun minigame in the Spider-man PS4 game. Peter and Octavius have a series of science "chores" like spectroscapy and electrical circuits, which are puzzle mini games that drive the story and give different game play mechanics than Spider-man's normal city-traversal and combat systems.

Borrowing the electronic circuit board it, I've adapted it for building a train track that gets from the starting station to the ending station. The voltage requirement of the electronic game becomes a time requirement (i.e. get to the end station on time), and the path becomes the train railway. Fun!

## Some Technical Goals

While I want to write the game myself and fully understand what's up, I also want to be pragmatic regarding my time constraints. Another side goal is to better understand my working relationship with AI agents. I enjoy AI's tab/autocomplete features for context-aware boilerplate, but sometimes it's scope is far too narrow. Agents *can* be useful in implementing more complex codebases and connecting logic, but I don't want to go full-vibe-code and lose track of the inner workings. I've sensed already how easy it could be to lose track.

So I must find a balance between finding the game on my own as well as letting the work be done by agents. Time will tell how successful I am in letting go while also groking the codebase. I suppose that's just a challenge devs face these days.

More to come...

## A Big Change (2026-05-01)

### Slow Progress

Life is frustrating and difficult at times, no? My plans were progressing along. Two weeks in and I had some super basic game logic working. I wanted to get game tile graphics modeled so it at least *looked* good even if the functionality was spotty. Another couple of days only sparsely making progress... BAM, it's Thursday with 1 week left.

Sorrow & recognition. I wasn't finishing by the time the challenge ends. That was Thu morning. I stopped and walked away. Probably an excellent decision.

### New Idea

After taking time through the morning, getting started with work, and doing some surfing finding great and inspiring project, I realized I could pivot to something *much* simpler. It might still be stretch, but it was more plausible than continuing down the game track.

**I decided to work on a simple little scene: a tiny planet with a track running along the equator and a train scootin' around it infinitely.**

This was a far-cry from what I wanted, but I decided something was better than nothing. I know the risk of the "nothing" option: abandonment and regret. Not just abandoning the challenge, but a risk of abandoning my Three.js Journey progress. I've already stalled a lot while going through the Shaders chapters (Which is wild! I figured I'd be amped to learn more about those).

**The reality is the dopamine rush of the new has worn off.** This is true for all new things. It's true for sereal daters, relationship chasers, chronic project-starters who abandon their work weeks into it when it becomes work instead of play. I did this with video games all the time: build a new character, play until it became work/grind, and start a new one. For me, starting new things is fun and exciting; super easy. Enduring to the end, adding final layers of polish, that's hard work. I'm often so exhausted by the end, I don't care anymore and want to move on. No bueno.

I knew if I bailed on this challenge, I'd be one more step towards abandoning the Journey. I can't let that happen. I *feel* the sadness just thinking of that. Nope. Won't do it. The answer must be "no" to the tempting whispers saying, "This isn't fun anymore. Chase something else."

### Project Status

So deciding on what became "Planet Click-clack" (naming this one cleverly was tricky and I was tired when making the decision... 🤷), I set to building the planet, building the track and ties, wrapping it around the planet, and constraining the train's movement to the curve.

This was still super fruitful. I've not done **animation in Blender** yet, but I did a couple years of animation in my undergrad using Maya, so those lessons transferred easily (i.e. near-transfer). Constraining the train's movement to the curve was tricky, but I figured it out eventually with tuts and AI assistance.

> Note: I'd love to throw screenshots in here, but I'm whipping this post up almost stream-of-consciousness and have a complex process that discourages better documentation 😕 I have one laptop that can handle Blender 5 (exporting specifically) and this one where I do the coding and writing (older laptop). Screenshots from one, pushed to the other, included here, etc. A non-trivial process. Better to post than not, so quality is less than I'd prefer.

I also learned I needed to **bake the keyframes into the model's timeline**, so that means duplicating (backup) the model and constraint, baking the frames, then exporting again to load into Three.js. That did work. Though I realized I *also* needed to apply the modifier in Blender for the train track that applied the curve around the planet and multiplied the railrow ties (array modifier).

After finally successfully importing the model, I set to fixing the lighting (my scene's default point light, which was too small, was also inside the planet/sphere). Had I not added an ambient light for sanity check purposes, it'd have been more frustrating.

**Animating the model in three.js** took digging back into Three.js Journey's [Imported Models](https://threejs-journey.com/lessons/imported-models) lesson. I found I was missing the `AnimationMixer` class. Once I got that integrated into my `Train` class, some tinkering brought me an animated train. Huzzah!

... the animation's weird. Crud.

Turns out the Blender **default interpolation** was something like an ease-in-out instead of the linear animation I wanted to keep it chugging along infinitely. Back to Blender. After I found how to fix the animation interpolation (tip: select all relevant key frames, right-click > Interpolation Mode > Linear), I re-baked the keyframes (good thing I backed it up with a dup!) *et voila*, it animated as desired.

We done yet? Almost. I tinkered with background clouds, but I didn't like them. I did like the sky color though, so I left that. I also added some "train poofs" that are jenk a.f. but again, it's something. Noticing a theme yet?

> Lesson Learned: animate everything in Blender and let three.js drive the animations and interactions. 💡

### Remaining "Wants"

A few more items I'd like to add to this eventually (but not in time for the contest, which ended yesterday/April 30th):

- higher poly planet?
- grass blades swaying lazily via sin wave (would be cool to "woosh" with the passing train too - [this post](https://tympanus.net/codrops/2025/02/04/how-to-make-the-fluffiest-grass-with-three-js/) may be useful in that effort)
- fluffy clouds in the void surrounding the planet
- ~~poofing smoke from the train~~
- front light on the train
- better lighting overall
- direction toggle lever on the planet to change the train direction (with a nice easing function would be cool)
- maybe a train station where the switch lives
- little spark effects as the train trundles along would be sweet
- slight train rock side-to-side maybe
- perhaps a toon shader for whimsy

I also wonder how well particles transfer from Blender to three.js - which realistically handles particles best? Hm hm hmmm.

## Conclusion

For now, this will have to do. I don't expect to win, but I am noticing a valuable trend: my ideas are bigger than my skill level AND time allowance. That's valuable info.

**This tells me I need to work on much smaller ideas.** This pivot to Planet Click-clack was a good move. If I had started with this idea, I might have accomplished some of these other items.

I also notice the importance of...
1. animating in Blender (2) 
2. leaving three.js with interactions or highly dynamic features
3. smooth workflow between Blender and three.js (I'm eyeballing some better laptops for this)

I expect I'll get great notes (as always) from Bruno and the group when we review it next week. I'm thankful for such an awesome community!

Hit me up on the socials if you have thoughts, kudos, or finger-shaving shame to share 😁

**Critical Lesson: keep going.** You'll get discouraged. Just keep going. Silence the discouraging whispers. If 100% isn't possible, strain for the highest you can achieve given your circumstances. Just keep going.
