#### Sass

Utilize our source Sass files to take advantage of variables, maps, mixins, and functions to help you build faster and customize your project.

Utilize our source Sass files to take advantage of variables, maps, mixins, and more. In our build we've increased the Sass rounding precision to 6 (by default it's 5) to prevent issues with browser rounding.

##### File structure

Whenever possible, avoid modifying Universal's core files. For Sass, that means creating your own stylesheet that imports Universal so you can modify and extend it. Assuming you're using a package manager like npm, you'll have a file structure that looks like this:

```text
your-project/
├── scss
│   └── custom.scss
└── node_modules/
    └── universal
        ├── js
        └── scss
```

If you've downloaded our source files and aren't using a package manager, you'll want to manually setup something similar to that structure, keeping Universal's source files separate from your own.

```text
your-project/
├── scss
│   └── custom.scss
└── universal/
    ├── js
    └── scss
```

##### Importing

In your `custom.scss`, you'll import Universal's source Sass files. You have two options: include all of Universal, or pick the parts you need. We encourage the latter, though be aware there are some requirements and dependencies across our components. You also will need to include some JavaScript for our plugins.

```scss
// Custom.scss
// Option A: Include all of Universal

@import "../node_modules/universal/scss/universal";
```

```scss
// Custom.scss
// Option B: Include parts of Universal

// Required
@import "../node_modules/universal/scss/functions";
@import "../node_modules/universal/scss/variables";
@import "../node_modules/universal/scss/mixins";

// Optional
@import "../node_modules/universal/scss/root";
@import "../node_modules/universal/scss/reboot";
@import "../node_modules/universal/scss/type";
@import "../node_modules/universal/scss/images";
@import "../node_modules/universal/scss/containers";
@import "../node_modules/universal/scss/grid";
```

With that setup in place, you can begin to modify any of the Sass variables and maps in your `custom.scss`. You can also start to add parts of Universal under the `// Optional` section as needed. We suggest using the full import stack from our `universal.scss` file as your starting point.

##### Variable defaults

Every Sass variable in Universal includes the `!default` flag allowing you to override the variable's default value in your own Sass without modifying Universal's source code. Copy and paste variables as needed, modify their values, and remove the `!default` flag. If a variable has already been assigned, then it won't be re-assigned by the default values in Universal.

You will find the complete list of Universal's variables in `scss/_variables.scss`. Some variables are set to `null`, these variables don't output the property unless they are overridden in your configuration.

Variable overrides within the same Sass file can come before or after the default variables. However, when overriding across Sass files, your overrides must come before you import Universal's Sass files.

Here's an example that changes the `background-color` and `color` for the `<body>` when importing and compiling Universal via npm:

```scss
// Your variable overrides
$body-bg: #000;
$body-color: #111;

// Universal and its default variables
@import "../node_modules/universal/scss/universal";
```

Repeat as necessary for any variable in Universal, including the global options below.

##### Maps and loops

Universal includes a handful of Sass maps, key value pairs that make it easier to generate families of related CSS. We use Sass maps for our colors, grid breakpoints, and more. Just like Sass variables, all Sass maps include the `!default` flag and can be overridden and extended.

Some of our Sass maps are merged into empty ones by default. This is done to allow easy expansion of a given Sass map, but comes at the cost of making _removing_ items from a map slightly more difficult.

##### Modify map

All variables in the `$theme-colors` map are defined as standalone variables. To modify an existing color in our `$theme-colors` map, add the following to your custom Sass file:

```scss
$primary: #0074d9;
$danger: #ff4136;
```

Later on, theses variables are set in Universal's `$theme-colors` map:

```scss
$theme-colors: (
  "primary": $primary,
  "danger": $danger
);
```

##### Add to map

Add new colors to `$theme-colors`, or any other map, by creating a new Sass map with your custom values and merging it with the original map. In this case, we'll create a new `$custom-colors` map and merge it with `$theme-colors`.

```scss
// Create your own map
$custom-colors: (
  "custom-color": #900
);

// Merge the maps
$theme-colors: map-merge($theme-colors, $custom-colors);
```

##### Remove from map

To remove colors from `$theme-colors`, or any other map, use `map-remove`. Be aware you must insert it between our requirements and options:

```scss
// Required
@import "../node_modules/universal/scss/functions";
@import "../node_modules/universal/scss/variables";
@import "../node_modules/universal/scss/mixins";

$theme-colors: map-remove($theme-colors, "info", "light", "dark");

// Optional
@import "../node_modules/universal/scss/root";
@import "../node_modules/universal/scss/reboot";
@import "../node_modules/universal/scss/type";
...
```

##### Required keys

Universal assumes the presence of some specific keys within Sass maps as we used and extend these ourselves. As you customize the included maps, you may encounter errors where a specific Sass map's key is being used.

For example, we use the `primary`, `success`, and `danger` keys from `$theme-colors` for links, buttons, and form states. Replacing the values of these keys should present no issues, but removing them may cause Sass compilation issues. In these instances, you'll need to modify the Sass code that makes use of those values.

##### Colors

Next to the [Sass maps](#/docs/customize/sass-colors.md) we have, theme colors can also be used as standalone variables, like `$primary`.

```scss
.custom-element {
  color: $gray-100;
  background-color: $dark;
}
```

You can lighten or darken colors with Universal's `tint-color()` and `shade-color()` functions. These functions will mix colors with black or white, unlike Sass' native `lighten()` and `darken()` functions which will change the lightness by a fixed amount, which often doesn't lead to the desired effect.

```
// Tint a color: mix a color with white
@function tint-color($color, $weight) {
  @return mix(white, $color, $weight);
}

// Shade a color: mix a color with black
@function shade-color($color, $weight) {
  @return mix(black, $color, $weight);
}

// Shade the color if the weight is positive, else tint it
@function shift-color($color, $weight) {
  @return if($weight > 0, shade-color($color, $weight), tint-color($color, -$weight));
}
```

In practice, you'd call the function and pass in the color and weight parameters.

```scss
.custom-element {
  color: tint-color($primary, 10%);
}

.custom-element-2 {
  color: shade-color($danger, 30%);
}
```

##### Color contrast

In order to meet [WCAG 2.0 accessibility standards for color contrast](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html), authors **must** provide [a contrast ratio of at least 4.5:1](https://www.w3.org/WAI/WCAG20/quickref/20160105/Overview.php#visual-audio-contrast-contrast), with very few exceptions.

An additional function we include in Universal is the color contrast function, `color-contrast`. It utilizes the [WCAG 2.0 algorithm](https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests) for calculating contrast thresholds based on [relative luminance](https://www.w3.org/WAI/GL/wiki/Relative_luminance) in a `sRGB` colorspace to automatically return a light (`#fff`), dark (`#212529`) or black (`#000`) contrast color based on the specified base color. This function is especially useful for mixins or loops where you're generating multiple classes.

For example, to generate color swatches from our `$theme-colors` map:

```scss
@each $color, $value in $theme-colors {
  .swatch-#{$color} {
    color: color-contrast($value);
  }
}
```

It can also be used for one-off contrast needs:

```scss
.custom-element {
  color: color-contrast(#000); // returns `color: #fff`
}
```

You can also specify a base color with our color map functions:

```scss
.custom-element {
  color: color-contrast($dark); // returns `color: #fff`
}
```

##### Escape SVG

We use the `escape-svg` function to escape the `<`, `>` and `#` characters for SVG background images. When using the `escape-svg` function, data URIs must be quoted.

##### Add and Subtract functions

We use the `add` and `subtract` functions to wrap the CSS `calc` function. The primary purpose of these functions is to avoid errors when a "unitless" `0` value is passed into a `calc` expression. Expressions like `calc(10px - 0)` will return an error in all browsers, despite being mathematically correct.

Example where the calc is valid:

```scss
$border-radius: .25rem;
$border-width: 1px;

.element {
  // Output calc(.25rem - 1px) is valid
  border-radius: calc($border-radius - $border-width);
}

.element {
  // Output the same calc(.25rem - 1px) as above
  border-radius: subtract($border-radius, $border-width);
}
```

Example where the calc is invalid:

```scss
$border-radius: .25rem;
$border-width: 0;

.element {
  // Output calc(.25rem - 0) is invalid
  border-radius: calc($border-radius - $border-width);
}

.element {
  // Output .25rem
  border-radius: subtract($border-radius, $border-width);
}
```