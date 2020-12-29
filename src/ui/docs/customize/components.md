#### Components

Learn how and why we build nearly all our components responsively and with base and modifier classes.

##### Base classes

Universal's components are largely built with a base-modifier nomenclature. We group as many shared properties as possible into a base class, like `.btn`, and then group individual styles for each variant into modifier classes, like `.btn-primary` or `.btn-success`.

To build our modifier classes, we use Sass's `@each` loops to iterate over a Sass map. This is especially helpful for generating variants of a component by our `$theme-colors` and creating responsive variants for each breakpoint. As you customize these Sass maps and recompile, you'll automatically see your changes reflected in these loops.

Check out [our Sass maps and loops docs](#/docs/customize/sass.md) for how to customize these loops and extend Universal's base-modifier approach to your own code.

##### Modifiers

Many of Universal's components are built with a base-modifier class approach. This means the bulk of the styling is contained to a base class (e.g., `.btn`) while style variations are confined to modifier classes (e.g., `.btn-danger`). These modifier classes are built from the `$theme-colors` map to make customizing the number and name of our modifier classes.

Here are two examples of how we loop over the `$theme-colors` map to generate modifiers to the `.alert` and `.list-group` components.
``` css
// Generate contextual modifier classes for colorizing the alert.

@each $state, $value in $theme-colors {
  $background: shift-color($value, $alert-bg-scale);
  $border: shift-color($value, $alert-border-scale);
  $color: shift-color($value, $alert-color-scale);
  @if (contrast-ratio($background, $color) < $min-contrast-ratio) {
    $color: mix($value, color-contrast($background), abs($alert-color-scale));
  }
  .alert-#{$state} {
    @include alert-variant($background, $border, $color);
  }
}
```

``` css
// List group contextual variants
//
// Add modifier classes to change text and background color on individual items.
// Organizationally, this must come after the `:hover` states.

@each $state, $value in $theme-colors {
  $background: shift-color($value, $list-group-item-bg-scale);
  $color: shift-color($value, $list-group-item-color-scale);
  @if (contrast-ratio($background, $color) < $min-contrast-ratio) {
    $color: mix($value, color-contrast($background), abs($alert-color-scale));
  }

  @include list-group-item-variant($state, $background, $color);
}
```

##### Responsive

These Sass loops aren't limited to color maps, either. You can also generate responsive variations of your components. Take for example our responsive alignment of the dropdowns where we mix an `@each` loop for the `$grid-breakpoints` Sass map with a media query include.
``` css
// We deliberately hardcode the `bs-` prefix because we check
// this custom property in JS to determine Popper's positioning

@each $breakpoint in map-keys($grid-breakpoints) {
  @include media-breakpoint-up($breakpoint) {
    $infix: breakpoint-infix($breakpoint, $grid-breakpoints);

    .dropdown-menu#{$infix}-start {
      --bs-position: start;
      right: auto #{"/* rtl:ignore */"};
      left: 0 #{"/* rtl:ignore */"};
    }

    .dropdown-menu#{$infix}-end {
      --bs-position: end;
      right: 0 #{"/* rtl:ignore */"};
      left: auto #{"/* rtl:ignore */"};
    }
  }
}
```

Should you modify your `$grid-breakpoints`, your changes will apply to all the loops iterating over that map.

``` css
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```

For more information and examples on how to modify our Sass maps and variables, please refer to [the Sass section of the Grid documentation](#/docs/layout/grid.md).