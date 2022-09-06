# Planning

- [Planning](#planning)
  - [Categories & Tags](#categories--tags)
  - [About Me](#about-me)
  - [Contact Me](#contact-me)
  - [TODO](#todo)

Here are some rough organizational ideas for articles/projects/etc…

```
adamleis.com
    `/blog` - root for the blog itself
        `/categories`
            `/:category-slug`
        `/tags`
            `/:tag-slug`
    `/resume` - updated interactive version of my interactive resume; should try to abstract my dependencies in case I need to update my front-end again to switch libraries; maintaining old libs is a pain; #LSP
```

## Categories & Tags

Categories and tags could be queried dynamically and pull in options from the front matter of each post. This *might* be relatively fast/easy. I'll need some posts to make that clearer. Maybe add these two after I've been posting for a bit.

Both will use a component page (e.g. `categories.vue` and `tags.vue`) as their base to pull in options. The variable part is handled by component naming conventions in Nuxt ([Dynamic Routes](https://nuxtjs.org/docs/features/file-system-routing/#dynamic-routes)).

## About Me

A brief blerb, maybe available via modal or whatever, about me. Keep it simple.

## Contact Me

This will be disabled at first until I prioritize and figure out how to handle this with Firebase or whatever.

## TODO

Next steps:
- [ ] get the basic pages in place and rendering
- [ ] get a blog post or two in place for display
- [ ] move resume info over as abstractly as possible (might be tricky)