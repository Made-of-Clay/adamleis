---
external: false
draft: true
title: Vue Slots & Dependency Injection
description: meh # TODO generate a good description
date: 2022-11-05 # TODO update this date
---

Vue slots can be used to flatten (from the written markup perspective) application architecture so injecting dependencies is easier from a composition root (e.g. `App.vue`).

(Use PayFac as an example)

- Explain how slots can flatten composition and DI (think warp drive and compressing space)
- This supports the SRP idea: slotted components focus on one thing (e.g. layout).
- This makes DI clearer from composition roots (App.vue, SomeComplexPage.vue)
- This enables prop usage where otherwise would require prop-drilling, provide/inject, or singleton management (e.g. stores)