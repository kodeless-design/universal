#### RTL

Learn how to enable support for right-to-left text in Universal across our layout, components, and utilities.

##### Get familiar

We recommend getting familiar with Universal first by reading through our [Getting Started Introduction page](#/docs/index.md). Once you've run through it, continue reading here for how to enable RTL.

You may also want to read up on [the RTLCSS project](https://rtlcss.com/), as it powers our approach to RTL.

<div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Experimental feature</h4>
  <p class="mb-0">
  The RTL feature is still <bold>experimental</bold> land will probably evolve according to user feedback. Spotted something or have an improvement to suggest? <a href="https://github.com/kodeless-design/universal/issues/new">Open an issue</a> we'd love to get your insights.
  </p>
</div>

There are two strict requirements for enabling RTL in Universal-powered pages.

1. Set `dir="rtl"` on the `<html>` element.
2. Add an appropriate `lang` attribute, like `lang="ar"`, on the `<html>` element.

From there, you'll need to include an RTL version of our CSS. For example, here's the stylesheet for our compiled and minified CSS with RTL enabled:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.2/dist/css/universal.min.css" integrity="sha256-I35SFWi2Whrdv6cvobUfnr03rOlhp4Irtn4ax2uCiyc=" crossorigin="anonymous">
```

##### Starter template

You can see the above requirements reflected in this modified RTL starter template.

```html
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Universal CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.2/dist/css/universal.min.css" integrity="sha256-I35SFWi2Whrdv6cvobUfnr03rOlhp4Irtn4ax2uCiyc=" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Universal Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.2/dist/js/universal.bundle.min.js" integrity="sha256-iCwB5Cy+DWEFe50EhYwPF3HB9+T3exENnVYBYZ0IA2M=" crossorigin="anonymous"></script>

    <!-- Option 2: Separate Popper and Universal JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU"    crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.2/dist/js/universal.min.js" integrity="sha256-d+j1JZHnieT7jCg89yE0eUHlM7XnSjVTrW53QfpkH2g=" crossorigin="anonymous"></script>
    -->
  </body>
</html>
```

##### RTL examples

Get started with one of our several [RTL examples]({{< docsref "/examples/#rtl" >}}).

##### Approach

Our approach to building RTL support into Universal comes with two important decisions that impact how we write and use our CSS:

1. **First, we decided to build it with the [RTLCSS](https://rtlcss.com/) project.** This gives us some powerful features for managing changes and overrides when moving from LTR to RTL. It also allows us to build two versions of Universal from one codebase.

2. **Second, we've renamed a handful of directional classes to adopt a logical properties approach.** Most of you have already interacted with logical properties thanks to our flex utilities—they replace direction properties like `left` and `right` in favor `start` and `end`. That makes the class names and values appropriate for LTR and RTL without any overhead.

  For example, instead of `.ml-3` for `margin-left`, use `.ms-3`.

Working with RTL, through our source Sass or compiled CSS, shouldn't be much different from our default LTR though.

##### Customize from source

When it comes to [customization](#/docs/customize/sass.md"), the preferred way is to take advantage of variables, maps, and mixins. This approach works the same for RTL, even if it's post-processed from the compiled files, thanks to [how RTLCSS works](https://rtlcss.com/learn/getting-started/why-rtlcss/).

##### Custom RTL values

Using [RTLCSS value directives](https://rtlcss.com/learn/usage-guide/value-directives/), you can make a variable output a different value for RTL. For example, to decrease the weight for `$font-weight-bold` throughout the codebase, you may use the `/*rtl: {value}*/` syntax:

```scss
$font-weight-bold: 700 #{/* rtl:600 */} !default;
```

Which would ouput to the following for our default CSS and RTL CSS:

```css
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

In the case you're using a custom font, be aware that not all fonts support the non-Latin alphabet. To switch from Pan-European to Arabic family, you may need to use `/*rtl:insert: {value}*/` in your font stack to modify the names of font families.

For example, to switch from `Helvetica Neue Webfont` for LTR to `Helvetica Neue Arabic` for RTL, your Sass code look like this:

```scss
$font-family-sans-serif:
  Helvetica Neue #{"/* rtl:insert:Arabic */"},
  // Cross-platform generic font family (default user interface font)
  system-ui,
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

The [breadcrumb separator](#/docs/components/breadcrumb-changing-the-separator.md) is the only case requiring its own brand new variable— namely `$breadcrumb-divider-flipped` —defaulting to `$breadcrumb-divider`.

##### Additional resources

- [RTLCSS](https://rtlcss.com/)
- [RTL Styling 101](https://rtlstyling.com/posts/rtl-styling)