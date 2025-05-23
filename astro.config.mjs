/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig, passthroughImageService } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import markdoc from '@astrojs/markdoc';

/* 
  We are doing some URL mumbo jumbo here to tell Astro what the URL of your website will be.
  In local development, your SEO meta tags will have localhost URL.
  In built production websites, your SEO meta tags should have your website URL.
  So we give our website URL here and the template will know what URL to use 
  for meta tags during build.
  If you don't know your website URL yet, don't worry about this
  and leave it empty or use localhost URL. It won't break anything.
*/

const SERVER_PORT = 3000;
// the url to access your blog during local development
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
// the url to access your blog after deploying it somewhere (Eg. Netlify)
const LIVE_URL = 'https://adamleis.com';
// this is the astro command your npm script runs
const SCRIPT = process.env.npm_lifecycle_script || '';
const isBuild = SCRIPT.includes('astro build');
let BASE_URL = isBuild ? LIVE_URL : LOCALHOST_URL;

export default defineConfig({
  server: { port: SERVER_PORT },
  site: BASE_URL,
  integrations: [sitemap(), markdoc({ allowHTML: true })],
  image: {
    service: passthroughImageService(),
  },
});
