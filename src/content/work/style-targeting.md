---
external: false
draft: false
title: Style Targeting
description: An example of how I've managed to target certain elements on shared pages for different clients.
date: 2025-01-07
tags: css, styling, razor, mvc, dotnet
---

# Style Targeting

In one of the products I support at Intellectual Technology, Inc., called KnowTo Drive Online (K2DO), we have the core product code/behavior and many settings supporting the variations a state (we often call them "jurisdictions"). Sometimes, managing things like the display of certain granular elements is not feasible to manage with toggleable flags.

## View Targets

I first started "configuring" the display of certain elements by using data-* attributes in specific MVC views. Within the view, the top level element for the view was given an attribute of `data-page`, so if the page was "Registration Form," the attribute would be `data-page="registration-form"`.

If there was a button on the page that needed styled a different color because the state wanted to break color convention (e.g. that particular button should be a different color than the primary color - hasn't happened, but other wild scenarios have), I can target the button on that page.

```css
/* assuming the classic Bootstrap button */
[data-page="registration-form"] .btn {
    --bs-primary: cornflowerblue;
}
```

Granted, if the id for the element is available, `#registration-form-page` or something similar would also work.

## Page Targets

When I realized the view target approach required discipline that *I* am fine maintaining, but I couldn't demand of others reliably, I began reaching for a more automated approach.

I used the same data-* approach, but instead chose a different name going with `data-page-path`. The same strategy applied allows developers to style elements on specific pages given a certain path.

## Custom Razor Tag Targets

In the Razor template engine used in .NET MVC, custom tags and tag helpers can be added. I abstracted some common page layouts into these tags so the responsibility of layout wasn't an issues.

After learning I could make custom tags and experimenting  Those tags also handled localization (l10n) strings for the specified site language. Again using the data-* attribute, I can target specific elements on the page based on the translation key.

```html
<l10n tag="button" class="btn">button.text.submit</l10n>
<!-- renders as <button class="btn" data-l10n="button.text.submit">Submit</button> -->
```

To target the button, the selector is can be as simple as `[data-l10n="button.text.submit"]`, or if there are multiple instances of a translation on the page, `header [data-l10n="site.title.withPortal"]`.

## Conclusion

There are a great many style "configurations" that can be made in shared codebases. There are many improvements that could be made for the product itself, but timing and resource availability can be restricting. While that's very frustrating at times, restriction is a catalyst for creativity, and using clever selector combos is one of my favorite creative tasks in the day-to-day grind.

To be fair, that doesn't make the best codebase to maintain, but maintenance woes are yet another restriction for creative thinking in code land.

*Huzzah!* Happy styling, folks.
