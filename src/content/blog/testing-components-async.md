---
external: false
draft: false
title: Testing Components with Async Behaviors
description: I explain my use of events in testing views/components.
date: 2025-03-24
tags: [code, programming, vue, js]
---

# Testing Components with Async Behaviors

In my normal dev setup, I'm using [Vue.js](https://vuejs.org/), [Vite](https://vite.dev/), [Vitest](https://vitest.dev/), [MSW.js](https://mswjs.io/) (I wrote about [some MSW lessons](/blog/msw-lessons/) recently too), and [@vue/test-utils](https://test-utils.vuejs.org/).

Vue Test Utils (VTU) is particularly helpful when dealing with interacting with components and the DOM, e.g. clicking buttons or triggering key events.

```ts
await wrapper.find('button').trigger('click');
```

Internally, [VTU uses Vue's `nextTick()`](https://github.com/vuejs/test-utils/blob/6332d7c434fd9d4e10a61a821ae27c7778bc397f/src/baseWrapper.ts#L366) to dispatch the event and wait for the [next tick](https://vuejs.org/api/general#nexttick). This works in most cases, which is excellent. It's short and easy to read. Win.

## Async Behavior

However, not all async behaviors are so easily handled. In many of my components, especially view components with dynamic data tables fetching data from APIs, I must wait for data to return from the server in order to assert my expectations.

This might be as simple as fetching the data and ensuring I have the column count expected, displayed data is formatted correctly (e.g. phone numbers, money amounts, etc.), or that individual row actions are displaying as they should. It may be as complicated as interacting with the table and ensuring toast messages, error alerts, or other user feedback is displayed. That often requires multiple requests.

## My Solution

My solution has been to handle the changes I want to test for, then emit custom events from the component that are used (sometimes exclusively) by the testing code. Pretend we have a page like `RecordLookup` that performs basic CRUD operations on records.

Let's say the events will be `load`, `record-create`, `record-update`, `update-error`, & `record-delete`. 

**Note:** I'm not using past-tense in order to mimic native DOM events like `click` instead of `clicked`.

Using MSW, I am able to make async requests that take longer than the 10-ish ms  that `nextTick()` typically takes. This means we cannot rely on only the `await` keyword. In addition to that, we don't have a reference to the promise that will be awaited when the data returns. 

This means **setting callbacks on custom events**. This can be done through VTU's prop bindings.

This also means **I cannot rely on the regular callback signature** for Vitest's `test` function (I prefer the `it` alias). This is where the [Done Callback](https://vitest.dev/guide/migration.html#done-callback) comes into play.

Furthermore, I must be sure to handle exceptions in the test code, which is usually how the failed tests are communicated.

```ts
describe('Record Lookup', () => {
    it('should load records automatically', () => new Promise((done, fail) => {
        const wrapper = mount(RecordLookup, {
            props: {
                // I prefer to keep the wrapper portion as small as possible
                // for easier reading/skimming. When it gets too big, I have
                // trouble keeping track of block endings.
                // Moving the expectation code to another function also lets
                // me handle the promise more simply.
                onLoaded: checkForData().then(done).catch(fail),
            },
        });
        async function checkForData() {
            // some assertion code to check that rows exist, no error/empty msg 
            // is displaying, etc.
        }
    }));
});
```

The other events discussed can be handled similarly, and each custom event listener must handle errors. Only the final callback needs the `done` (or `resolve` if you follow ESLint) callback called.

```ts
it('should delete a record', () => new Promise((done, fail) => {
    const wrapper = mount(RecordLookup, {
        props: {
            // Remember: the data is auto-fetched when mounted & "loaded" emits.
            onLoaded: deleteRecord().catch(fail),
            // Notice the quoted key; the custom event is converted into
            // "on{Snake-case-name}" with multiple word event names.
            'onRecord-delete': confirmDeletion.then(done).catch(fail),
        },
    });
    async function deleteRecord() {
        // …
    }
    async function confirmDeletion() {
        // expect deleted record is no longer in the table
    }
}));
```

Handling custom events this way allows me to test async behaviors extensively from Vitest alone (for better or worse). Using custom events and handlers can help keep components from being tested by their implementation and instead rely on input/output pairings that remain decoupled from implementation details.

Hit me up on the socials if you have feedback, criticisms, or improvements that can be made to this process. I've not covered all the nuances that I have on a given test case, but this illustrates the idea well enough. Also let me know if you're interested in more scenarios/examples you'd like to see.

Happy testing, devs!
