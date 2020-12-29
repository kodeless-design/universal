#### CSS Variables

Use Universal’s CSS custom properties for fast and forward-looking design and development.

Universal includes around two dozen [CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) in its compiled CSS, with dozens more on the way for improved customization on a per-component basis. These provide easy access to commonly used values like our theme colors, breakpoints, and primary font stacks when working in your browser's inspector, a code sandbox, or general prototyping.

**All our custom properties are prefixed with `un-`** to avoid conflicts with third party CSS.

## Root variables

Here are the variables we include (note that the `:root` is required) that can be accessed anywhere Universal's CSS is loaded. They're located in our `_root.scss` file and included in our compiled dist files.
``` css
:root {
  --un-blue: #0d6efd;
  --un-indigo: #6610f2;
  --un-purple: #6f42c1;
  --un-pink: #d63384;
  --un-red: #dc3545;
  --un-orange: #fd7e14;
  --un-yellow: #ffc107;
  --un-green: #198754;
  --un-teal: #20c997;
  --un-cyan: #0dcaf0;
  --un-white: #fff;
  --un-gray: #6c757d;
  --un-gray-dark: #343a40;
  --un-primary: #0d6efd;
  --un-secondary: #6c757d;
  --un-success: #198754;
  --un-info: #0dcaf0;
  --un-warning: #ffc107;
  --un-danger: #dc3545;
  --un-light: #f8f9fa;
  --un-dark: #212529;
  --un-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --un-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --un-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));
}
```

##### Component variables

We're also beginning to make use of custom properties as local variables for various components. This way we can reduce our compiled CSS, ensure styles aren't inherited in places like nested tables, and allow some basic restyling and extending of Universal components after Sass compilation.

Have a look at our table documentation for some [insight into how we're using CSS variables](#/docs/content/tables.md).

We're also using CSS variables across our grids—primarily for gutters—with more component usage coming in the future.

##### Examples

CSS variables offer similar flexibility to Sass's variables, but without the need for compilation before being served to the browser. For example, here we're resetting our page's font and link styles with CSS variables.

```css
body {
  font: 1rem/1.5 var(--un-font-sans-serif);
}
a {
  color: var(--un-blue);
}
```