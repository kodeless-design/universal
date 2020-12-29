#### Color

Universal is supported by an extensive color system that themes our styles and components. This enables more comprehensive customization and extension for any project.

##### Theme colors

We use a subset of all colors to create a smaller color palette for generating color schemes, also available as Sass variables and a Sass map in Universal's `scss/_variables.scss` file.
<div class="row">
    <div class="col-md-4">
      <div class="p-3 mb-3 bg-primary text-white">Primary</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 bg-secondary text-dark">Secondary</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 bg-success text-white">Success</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 bg-danger text-white">Danger</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 bg-warning text-dark">Warning</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 bg-info text-dark">Info</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 bg-light text-dark">Light</div>
    </div>
    <div class="col-md-4">
      <div class="p-3 mb-3 bg-dark text-white">Dark</div>
    </div>
</div>

All these colors are available as a Sass map, `$theme-colors`.

``` css
$theme-colors: (
  "primary":    $primary,
  "secondary":  $secondary,
  "success":    $success,
  "info":       $info,
  "warning":    $warning,
  "danger":     $danger,
  "light":      $light,
  "dark":       $dark
);
```

Check out [our Sass maps and loops docs]("#/docs/customize/sass.md) for how to modify these colors.

##### All colors

All Universal colors are available as Sass variables and a Sass map in `scss/_variables.scss` file. To avoid increased file sizes, we don't create text or background color classes for each of these variables. Instead, we choose a subset of these colors for a theme palette.

Be sure to monitor contrast ratios as you customize colors. As shown below, we've added three contrast ratios to each of the main colors—one for the swatch's current colors, one for against white, and one for against black.

<div class="row font-monospace">
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-blue">
        <strong class="d-block">$blue</strong>
        #0d6efd
      </div>
      <div class="p-3 un-blue-100">$blue-100</div>
      <div class="p-3 un-blue-200">$blue-200</div>
      <div class="p-3 un-blue-300">$blue-300</div>
      <div class="p-3 un-blue-400">$blue-400</div>
      <div class="p-3 un-blue-500">$blue-500</div>
      <div class="p-3 un-blue-600">$blue-600</div>
      <div class="p-3 un-blue-700">$blue-700</div>
      <div class="p-3 un-blue-800">$blue-800</div>
      <div class="p-3 un-blue-900">$blue-900</div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-indigo">
        <strong class="d-block">$indigo</strong>
        #6610f2
      </div>
      <div class="p-3 un-indigo-100">$indigo-100</div>
      <div class="p-3 un-indigo-200">$indigo-200</div>
      <div class="p-3 un-indigo-300">$indigo-300</div>
      <div class="p-3 un-indigo-400">$indigo-400</div>
      <div class="p-3 un-indigo-500">$indigo-500</div>
      <div class="p-3 un-indigo-600">$indigo-600</div>
      <div class="p-3 un-indigo-700">$indigo-700</div>
      <div class="p-3 un-indigo-800">$indigo-800</div>
      <div class="p-3 un-indigo-900">$indigo-900</div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-purple">
        <strong class="d-block">$purple</strong>
        #6f42c1
      </div>
      <div class="p-3 un-purple-100">$purple-100</div>
      <div class="p-3 un-purple-200">$purple-200</div>
      <div class="p-3 un-purple-300">$purple-300</div>
      <div class="p-3 un-purple-400">$purple-400</div>
      <div class="p-3 un-purple-500">$purple-500</div>
      <div class="p-3 un-purple-600">$purple-600</div>
      <div class="p-3 un-purple-700">$purple-700</div>
      <div class="p-3 un-purple-800">$purple-800</div>
      <div class="p-3 un-purple-900">$purple-900</div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-pink">
        <strong class="d-block">$pink</strong>
        #d63384
      </div>
      <div class="p-3 un-pink-100">$pink-100</div>
      <div class="p-3 un-pink-200">$pink-200</div>
      <div class="p-3 un-pink-300">$pink-300</div>
      <div class="p-3 un-pink-400">$pink-400</div>
      <div class="p-3 un-pink-500">$pink-500</div>
      <div class="p-3 un-pink-600">$pink-600</div>
      <div class="p-3 un-pink-700">$pink-700</div>
      <div class="p-3 un-pink-800">$pink-800</div>
      <div class="p-3 un-pink-900">$pink-900</div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-red">
        <strong class="d-block">$red</strong>
        #dc3545
      </div>
      <div class="p-3 un-red-100">$red-100</div>
      <div class="p-3 un-red-200">$red-200</div>
      <div class="p-3 un-red-300">$red-300</div>
      <div class="p-3 un-red-400">$red-400</div>
      <div class="p-3 un-red-500">$red-500</div>
      <div class="p-3 un-red-600">$red-600</div>
      <div class="p-3 un-red-700">$red-700</div>
      <div class="p-3 un-red-800">$red-800</div>
      <div class="p-3 un-red-900">$red-900</div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-orange">
        <strong class="d-block">$orange</strong>
        #fd7e14
      </div>
      <div class="p-3 un-orange-100">$orange-100</div>
      <div class="p-3 un-orange-200">$orange-200</div>
      <div class="p-3 un-orange-300">$orange-300</div>
      <div class="p-3 un-orange-400">$orange-400</div>
      <div class="p-3 un-orange-500">$orange-500</div>
      <div class="p-3 un-orange-600">$orange-600</div>
      <div class="p-3 un-orange-700">$orange-700</div>
      <div class="p-3 un-orange-800">$orange-800</div>
      <div class="p-3 un-orange-900">$orange-900</div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-yellow">
        <strong class="d-block">$yellow</strong>
        #ffc107
      </div>
      <div class="p-3 un-yellow-100">$yellow-100</div>
      <div class="p-3 un-yellow-200">$yellow-200</div>
      <div class="p-3 un-yellow-300">$yellow-300</div>
      <div class="p-3 un-yellow-400">$yellow-400</div>
      <div class="p-3 un-yellow-500">$yellow-500</div>
      <div class="p-3 un-yellow-600">$yellow-600</div>
      <div class="p-3 un-yellow-700">$yellow-700</div>
      <div class="p-3 un-yellow-800">$yellow-800</div>
      <div class="p-3 un-yellow-900">$yellow-900</div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-green">
        <strong class="d-block">$green</strong>
        #198754
      </div>
      <div class="p-3 un-green-100">$green-100</div>
      <div class="p-3 un-green-200">$green-200</div>
      <div class="p-3 un-green-300">$green-300</div>
      <div class="p-3 un-green-400">$green-400</div>
      <div class="p-3 un-green-500">$green-500</div>
      <div class="p-3 un-green-600">$green-600</div>
      <div class="p-3 un-green-700">$green-700</div>
      <div class="p-3 un-green-800">$green-800</div>
      <div class="p-3 un-green-900">$green-900</div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-teal">
        <strong class="d-block">$teal</strong>
        #20c997
      </div>
      <div class="p-3 un-teal-100">$teal-100</div>
      <div class="p-3 un-teal-200">$teal-200</div>
      <div class="p-3 un-teal-300">$teal-300</div>
      <div class="p-3 un-teal-400">$teal-400</div>
      <div class="p-3 un-teal-500">$teal-500</div>
      <div class="p-3 un-teal-600">$teal-600</div>
      <div class="p-3 un-teal-700">$teal-700</div>
      <div class="p-3 un-teal-800">$teal-800</div>
      <div class="p-3 un-teal-900">$teal-900</div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="p-3 mb-2 position-relative swatch-cyan">
        <strong class="d-block">$cyan</strong>
        #0dcaf0
      </div>
      <div class="p-3 un-cyan-100">$cyan-100</div>
      <div class="p-3 un-cyan-200">$cyan-200</div>
      <div class="p-3 un-cyan-300">$cyan-300</div>
      <div class="p-3 un-cyan-400">$cyan-400</div>
      <div class="p-3 un-cyan-500">$cyan-500</div>
      <div class="p-3 un-cyan-600">$cyan-600</div>
      <div class="p-3 un-cyan-700">$cyan-700</div>
      <div class="p-3 un-cyan-800">$cyan-800</div>
      <div class="p-3 un-cyan-900">$cyan-900</div>
    </div>
    <div class="col-md-4 mb-3">
    <div class="p-3 mb-2 position-relative swatch-gray-500">
      <strong class="d-block">$gray-500</strong>
      #adb5bd
    </div>
    <div class="p-3 un-gray-100">$gray-100</div>
    <div class="p-3 un-gray-200">$gray-200</div>
    <div class="p-3 un-gray-300">$gray-300</div>
    <div class="p-3 un-gray-400">$gray-400</div>
    <div class="p-3 un-gray-500">$gray-500</div>
    <div class="p-3 un-gray-600">$gray-600</div>
    <div class="p-3 un-gray-700">$gray-700</div>
    <div class="p-3 un-gray-800">$gray-800</div>
    <div class="p-3 un-gray-900">$gray-900</div>
  </div>
  <div class="col-md-4 mb-3">
    <div class="p-3 mb-2 un-black text-white">
      <strong class="d-block">$black</strong>
      #000
    </div>
    <div class="p-3 mb-2 un-white border">
      <strong class="d-block">$white</strong>
      #fff
    </div>
  </div>
</div>

##### Notes on Sass

Sass cannot programmatically generate variables, so we manually created variables for every tint and shade ourselves. We specify the midpoint value (e.g., `$blue-500`) and use custom color functions to tint (lighten) or shade (darken) our colors via Sass's `mix()` color function.

Using `mix()` is not the same as `lighten()` and `darken()`—the former blends the specified color with white or black, while the latter only adjusts the lightness value of each color. The result is a much more complete suite of colors, as [shown in this CodePen demo](https://codepen.io/emdeoh/pen/zYOQOPB).

Our `tint-color()` and `shade-color()` functions use `mix()` alongside our `$theme-color-interval` variable, which specifies a stepped percentage value for each mixed color we produce. See the `scss/_functions.scss` and `scss/_variables.scss` files for the full source code.

##### Color Sass maps

Universal's source Sass files include three maps to help you quickly and easily loop over a list of colors and their hex values.

- `$colors` lists all our available base (`500`) colors
- `$theme-colors` lists all semantically named theme colors (shown below)
- `$grays` lists all tints and shades of gray

Within `scss/_variables.scss`, you'll find Universal's color variables and Sass map. Here's an example of the `$colors` Sass map:
``` css
$colors: (
  "blue":       $blue,
  "indigo":     $indigo,
  "purple":     $purple,
  "pink":       $pink,
  "red":        $red,
  "orange":     $orange,
  "yellow":     $yellow,
  "green":      $green,
  "teal":       $teal,
  "cyan":       $cyan,
  "white":      $white,
  "gray":       $gray-600,
  "gray-dark":  $gray-800
);
```

Add, remove, or modify values within the map to update how they're used in many other components. Unfortunately at this time, not _every_ component utilizes this Sass map. Future updates will strive to improve upon this. Until then, plan on making use of the `${color}` variables and this Sass map.

##### Example

Here's how you can use these in your Sass:

```scss
.alpha { color: $purple; }
.beta {
  color: $yellow-300;
  background-color: $indigo-900;
}
```

[Color utility classes]("#/docs/utilities/colors.md) are also available for setting `color` and `background-color` using the `500` color values.