---
external: false
draft: false
title: MSW Lessons
description: I share lessons I have learned from using MSW to mock API requests.
date: 2025-03-20
tags: [code, programming, api, js]
---

# MSW Lessons

A little over a year ago, I read an article ([I think by Kent Dodds](https://kentcdodds.com/blog/stop-mocking-fetch)) about [MSW (Mock Service Worker)](https://mswjs.io/) that recommended mocking API calls instead of mocking service functions/classes to grab data.

I initially found this suggestion dubious. I thought, "Oh great, one more dependency to manage and learn." After reading through the article and skimming the docs site, I was curious enough to try it. I had a series of green field projects ramping up where I could refine my use of it. I didn't know how much I'd fall in love with it.

## Why Mock APIs?

The projects where I used MSW were front-end SPAs with a C# API back-end. While I know enough C# to make changes or build front-of-the-back-end libraries, I don't build full APIs in C# regularly enough to do it fast. This was a time where being fast was very valuable. (I'm also not a keen fan of .NET's way of handling things. It's not terrible. It's just not my preferred flavor.)

So I got to mocking the API instead and found a number of benefits.

### Early API Design

My current pattern is to review the Figma designs and step through the flow of the screens. I comment in the designs or take notes in my markdown notes as I go. **The key is to identify where I expect requests will need to be made.**

As I make note of which requests I expect are needed, I also make an initial design of the request body "shape." This allows me to (1) collaborate with the back-end developer(s) and (2) build an initial API mock so I can get started right away. No need to wait on the actual API.

### Rapid Early Iteration

Given the API endpoint and payloads are at least initially designed, I can now start writing the actual service functions that will make the request for data. Once I switch to using the actual API, if the design doesn't change, these functions need not change.

This is also where one of my other favorite tools comes into play: [faker.js](https://fakerjs.dev/api/). I need to return some kind of data, often complex, when I make these mock requests. I also need more than a couple of rows. We often have paginated data tables, so I need 20-50 records of relatively unique data.

I write a script to generate the dummy data based on the expected response data, then in the MSW endpoint handler script, I import that JSON, cache it (so data is updated between requests), and return it to the UI.

```js
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

// example generator script
function generateTransaction() {
    // mock the data as needed using faker
    // …
    return {…};
}

// … other implementation code; when simple enough, I can have AI do a lot of

/**
 * @param {Array} dataToWrite Array of data to write to file
 */
function writeToFile(dataToWrite) {
    const fileName = path.resolve('src/mocks/TransactionDetails.all.json');
    fs.writeFile(fileName, JSON.stringify(dataToWrite, null, 2), (err) => {
        if (err)
            throw err;
        console.log('File written successfully!');
    });
}

writeToFile(callNTimes(generateTransaction, 55));
```

### Unit Test Compatibility

These mocked endpoints also make unit testing fairly straight forward. I can still simulate the behavior to test it. I often emit events from components once data has loaded, is being fetched, and when POST/PUT/PATCH requests succeed or fail. That way, in the test, I can listen for those events and make assertions.

### Web Socket Testing

Very recently, [MSW began supporting Web Sockets](https://mswjs.io/docs/basics/handling-websocket-events/). This was excellent timing, as one of our products began using web sockets to live update its data tables based on when records were coming in, going out, or being updated.

Some extra testing setup was necessary to manually trigger web socket events, but it all works great. (I grab the socket connection, send my own event to the "server," and that triggers an update event to be handled by the UI.)

## Challenges

### Maintenance

**Maintaining the mocked API is the greatest challenge, just as it would be with mocking services.** Once changes happen in the real API, disciplined devs must remember to update the mocks and tests. When these stagnate and become out of sync, it causes issues in automated tests and localhost development.

It's fairly common that the API contract will update during development, so I must keep my mocks up-to-date as well. This is to be expected now.

### Conditional Loading

Upon monitoring the bundled assets, I discovered that MSW was being included in my production bundles. This was unacceptable.

To avoid this, I wrote a helper function that can be called from the `main.ts` script (e.g. `maybeLoadMocks()`). Within that helper, I check environment variables for whether or not the APIs should be mocked (e.g. assuming Vite, `VITE_MOCK_API=true`). If true, I use a dynamic import to fetch the MSW init code.

```ts
// maybeLoadMocks.ts

// imported from constants so vitest can stub them
import { isDev, shouldMockAPI } from '@/constants';

export const shouldLoadMocks = isDev && shouldMockAPI;

export async function maybeLoadMocks() {
    if (!shouldLoadMocks)
        return;

    const { useMocks } = await import('../mocks/useMocks');
    useMocks();
}

// useMocks.ts
import { worker } from '@/mocks/browser';

export function useMocks() {
    worker.start({
        onUnhandledRequest(request, print) {
            const url = new URL(request.url);
            // By convention, our APIs start with "/api/v{number}"
            if (/^\/api\/v\d+/.test(url.pathname) === false)
                return;

            print.warning();
        },
    });
}
```

## Main Takeaways

- Early API planning reveals blind spots and faulty assumptions when there's time to fix them.
- Early API planning also forces a closer look at mockups/designs to solve problems early.
- Early working API designs enables rapid iteration and development, including early unit testing.
- Maintenance requires intentionality.
- Bundles should be checked regularly.

These have been really great lessons, and my experience with MSW has been awesome. I highly recommend trying [MSW (Mock Service Worker)](https://mswjs.io/) in your next project, especially if you're on a team and are not responsible for writing the API. 

It may even be helpful for full stack devs depending on which side you start building first. I've noticed building more complex request handlers has allowed me to make changes or catch things the API would encounter in low-impact settings. No expensive cloud functions or database involvement required.

Happy building, friends 🙂
