#### Utilities for layout

For faster mobile-friendly and responsive development, Universal includes dozens of utility classes for showing, hiding, aligning, and spacing content.

##### Changing `display`

Use our [display utilities](#/docs/utilities/display.md) for responsively toggling common values of the `display` property. Mix it with our grid system, content, or components to show or hide them across specific viewports.

##### Flexbox options

Universal is built with flexbox, but not every element's `display` has been changed to `display: flex` as this would add many unnecessary overrides and unexpectedly change key browser behaviors. Most of [our components](#/docs/components/alerts.md) are built with flexbox enabled.

Should you need to add `display: flex` to an element, do so with `.d-flex` or one of the responsive variants (e.g., `.d-sm-flex`). You'll need this class or `display` value to allow the use of our extra [flexbox utilities](#/docs/utilities/flex.md) for sizing, alignment, spacing, and more.

##### Margin and padding

Use the `margin` and `padding` [spacing utilities](#/docs/utilities/spacing.md) to control how elements and components are spaced and sized. Universal includes a six-level scale for spacing utilities, based on a `1rem` value default `$spacer` variable. Choose values for all viewports (e.g., `.me-3` for `margin-right: 1rem` in LTR), or pick responsive variants to target specific viewports (e.g., `.me-md-3` for `margin-right: 1rem` —in LTR— starting at the `md` breakpoint).

##### Toggle `visibility`

When toggling `display` isn't needed, you can toggle the `visibility` of an element with our [visibility utilities](#/docs/utilities/visibility.md). Invisible elements will still affect the layout of the page, but are visually hidden from visitors.