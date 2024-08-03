// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Adam Leis";
export const SITE_DESCRIPTION =
  "Welcome to my blog! I write about my (aspiring) polymath adventures, which includes web development, philosophy, theology, apologetics, science, and more.";
export const TWITTER_HANDLE = "@theNthAdam";
export const MY_NAME = "Adam";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
