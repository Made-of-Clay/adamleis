---
external: false
draft: false
title: ITI Projects
description: A brief explanation of the kinds of projects I've been working on for the last 4 years.
date: 2024-11-20
---

# ITI Projects

I've written a bit more in-depth about my work on [ITI's GravITI UI Library](/work/iti-graviti), but this is about my broader body of work at ITI.

## Website

The first project I began working on is the *KnowTo Drive Online* website. The purpose of this site is to provide an online portal for taking the written portion of the state driver's examination. Users register their information, often paying online, and take the exam all online. Test results, emails, and a strictly controlled user flow through the website are all part of the experience.

**One of the more interesting aspects is the facial recognition feature during the exam.** A user allows access to his/her webcam, takes a control photo of a neutral expression of their face, and that photo is used as the control for facial matches throughout the exam. Photos are taken randomly throughout the exam and compared against the control photo. Any anomalies will cause the user to incur infractions that are tracked for auditing purposes when deemed necessary. This is one of my favorite features of the site.

One of the challenging aspects of the site is its architecture. It is a classic MVC website, so the front-end optimizations/updates I've made have been working within that paradigm instead of using a single-page application. This isn't generally a problem as many pages are simple text/disclaimer pages or require little to no JS. (Why load Vue.js or other libraries when vanilla JS will do?)

Other more feature-rich pages do require a special touch. In addition to more interactive needs for some pages, each state has customizations and settings that can be adjusted on the site. The list of features offered has grown in four years, and many bitter lessons have been learned along the way. This is inevitable for any project with similar demands, and ensuring backwards compatibility and proper abstractions are part of the challenge. When it's done right though, it's very rewarding.

## Web Applications

Along with the driver testing projects are a number of support admin applications. Some states request tools for managing Translators that can be provided on the fly for test-takers with English as a second language. Others may require customized driving routes (see the *SkillsTo Drive* project description below). There are many nuanced needs that arise when dealing with so many different states and jurisdictions. (ITI services many US states as well as several Canadian territories.) **We have built a lot of helper applications for our clients.**

Each of these applications follows the single-page application architecture (in contrast to *KnowTo Drive Online*'s multi-page application structure, i.e. a classic website). Minimally, a Vue UI (using Vite as its bundler and our GravITI UI library) runs the front-end while one or more APIs provide data on the back-end. It's pretty standard stuff. Customizations are less common in these applications but not absent.

## Others

Other applications I've worked on stretch into less conventional web application spaces. As part of a collaborative effort with a third-party agency who were helping us in a very busy time, our team built a new app called *SkillsTo Drive*. This app is used on the road during the driver's test where the instructor uses a tablet to inspect the vehicle and keep track of driving test points for a particular route.

The *SkillsTo Drive* app is built in [*React Native for Windows*](https://github.com/microsoft/react-native-windows). My opinion of *React Native for Windows* has been mixed. React Native as a core concept is a great way to help web developers break into the native/mobile app spaces. While the performance will never be quite as good as a native app in their typical languages, it lets developers build apps quickly in a space they'd otherwise take longer to build. *React Native for Windows* in particular has not seen the frequency of stable updates we had hoped when we joined the third-party team in its development.

All the same, it's a great product to offer state driver testing offices. (Personally, I'd be very interested in building a Progressive Web App version some day, but it's unlikely that proposal will gain traction while the current app is still relatively young.)

## Coda

This is just a brief dip into the kinds of projects I've been working on with the great ITI team. There are still so many great opportunities and ideas, some of which are on the horizon. The greatest challenge has been finding the right timing for many of the projects and improvements we see daily (consequences of working so closely with them).

As ever, the tech world offers no shortage of fascinating new topics to study.
