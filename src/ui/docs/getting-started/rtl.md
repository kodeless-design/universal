#### RTL

Learn how to enable support for right-to-left text in Universal across our layout, components, and utilities.

##### Get familiar

We recommend getting familiar with Universal first by reading through our [Getting Started Introduction page](). Once you’ve run through it, continue reading here for how to enable RTL.

You may also want to read up on [the RTLCSS project](), as it powers our approach to RTL.

<div class="alert alert-warning">
    <h5>Experimental feature</h5>
    <p>The RTL feature is still <strong>experimental</strong> and will probably evolve according to user feedback. Spotted something or have an improvement to suggest? <a href="https://github.com/kodeless-design/universal/issues/new">Open an issue</a>, we’d love to get your insights.
    </p>
</div>

##### Required HTML

There are two strict requirements for enabling RTL in Universal-powered pages.

1. Set `dir="rtl"` on the `<html>` element.
2. Add an appropriate `lang` attribute, like `lang="ar"`, on the `<html>` element.

From there, you’ll need to include an RTL version of our CSS. For example, here’s the stylesheet for our compiled and minified CSS with RTL enabled:
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.0/dist/css/universal.rtl.min.css" integrity="sha256-CutgXZgXFkf+PqB6hlGYdJbIX3zVbys+jinfMTPOiDU=" crossorigin="anonymous">
```

##### RTL examples

Get started with one of our several [RTL examples]().

##### Approach

Our approach to building RTL support into Universal comes with two important decisions that impact how we write and use our CSS:
1. **First, we decided to build it with [the RTLCSS]() project**. This gives us some powerful features for managing changes and overrides when moving from LTR to RTL. It also allows us to build two versions of Universal from one codebase.
2. **Second, we’ve renamed a handful of directional classes to adopt a logical properties approach**. Most of you have already interacted with logical properties thanks to our flex utilities—they replace direction properties like `left` and `right` in favor `start` and `end`. That makes the class names and values appropriate for LTR and RTL without any overhead.

For example, instead of `.ml-3` for `margin-left`, use `.ms-3`.

Working with RTL, through our source Sass or compiled CSS, shouldn’t be much different from our default LTR though.

##### Customize from source

When it comes to [customization](), the preferred way is to take advantage of variables, maps, and mixins. This approach works the same for RTL, even if it’s post-processed from the compiled files, thanks to [how RTLCSS works]().

##### Custom RTL values

Using [RTLCSS value directives](), you can make a variable output a different value for RTL. For example, to decrease the weight for `$font-weight-bold` throughout the codebase, you may use the `/*rtl: {value}*/` syntax
```
$font-weight-bold: 700 #{/* rtl:600 */} !default;
```

Which would ouput to the following for our default CSS and RTL CSS:
```
/* universal.css */
dt {
  font-weight: 700 /* rtl:600 */;
}

/* universal.rtl.css */
dt {
  font-weight: 600;
}
```

##### Alternative font stack

In the case you’re using a custom font, be aware that not all fonts support the non-Latin alphabet. To switch from Pan-European to Arabic family, you may need to use `/*rtl:insert: {value}*/` in your font stack to modify the names of font families.

For example, to switch from `Helvetica Neue Webfont` for LTR to `Helvetica Neue Arabic` for RTL, your Sass code look like this:
```
$font-family-sans-serif:
  Helvetica Neue #{"/* rtl:insert:Arabic */"},
  // Safari for macOS and iOS (San Francisco)
  -apple-system,
  // Chrome < 56 for macOS (San Francisco)
  BlinkMacSystemFont,
  // Windows
  "Segoe UI",
  // Android
  Roboto,
  // Basic web fallback
  Arial,
  // Linux
  "Noto Sans",
  // Sans serif fallback
  sans-serif,
  // Emoji fonts
  "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
```

##### The breadcrumb case

The breadcrumb separator is the only case requiring its own brand new variable— namely `$breadcrumb-divider-flipped` —defaulting to `$breadcrumb-divider`.

##### Additional resources
1. [RTLCSS]()
2. [RTL Styling 101]()