#### Options

Quickly customize Universal with built-in variables to easily toggle global CSS preferences for controlling style and behavior.

Customize Universal with our built-in custom variables file and easily toggle global CSS preferences with new `$enable-*` Sass variables. Override a variable's value and recompile with `npm run test` as needed.

You can find and customize these variables for key global options in Universal's `scss/_variables.scss` file.

<table class="table text-start">
   <thead>
      <tr>
         <th>Variable</th>
         <th>Values</th>
         <th>Description</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><code>$spacer</code></td>
         <td><code>1rem</code> (default), or any value &gt; 0</td>
         <td>Specifies the default spacer value to programmatically generate our <a href="#/docs/utilities/spacing.md">spacer utilities</a>.</td>
      </tr>
      <tr>
         <td><code>$enable-rounded</code></td>
         <td><code>true</code> (default) or <code>false</code></td>
         <td>Enables predefined <code>border-radius</code> styles on various components.</td>
      </tr>
      <tr>
         <td><code>$enable-shadows</code></td>
         <td><code>true</code> or <code>false</code> (default)</td>
         <td>Enables predefined <code>box-shadow</code> styles on various components.</td>
      </tr>
      <tr>
         <td><code>$enable-gradients</code></td>
         <td><code>true</code> or <code>false</code> (default)</td>
         <td>Enables predefined gradients via <code>background-image</code> styles on various components.</td>
      </tr>
      <tr>
         <td><code>$enable-transitions</code></td>
         <td><code>true</code> (default) or <code>false</code></td>
         <td>Enables predefined <code>transition</code>s on various components.</td>
      </tr>
      <tr>
         <td><code>$enable-reduced-motion</code></td>
         <td><code>true</code> (default) or <code>false</code></td>
         <td>Enables the <a href="#/docs/getting-started/accessibility.md"><code>prefers-reduced-motion</code> media query</a>, which suppresses certain animations/transitions based on the users' browser/operating system preferences.</td>
      </tr>
      <tr>
         <td><code>$enable-grid-classes</code></td>
         <td><code>true</code> (default) or <code>false</code></td>
         <td>Enables the generation of CSS classes for the grid system (e.g. <code>.row</code>, <code>.col-md-1</code>, etc.).</td>
      </tr>
      <tr>
         <td><code>$enable-caret</code></td>
         <td><code>true</code> (default) or <code>false</code></td>
         <td>Enables pseudo element caret on <code>.dropdown-toggle</code>.</td>
      </tr>
      <tr>
         <td><code>$enable-button-pointers</code></td>
         <td><code>true</code> (default) or <code>false</code></td>
         <td>Add “hand” cursor to non-disabled button elements.</td>
      </tr>
      <tr>
         <td><code>$enable-validation-icons</code></td>
         <td><code>true</code> (default) or <code>false</code></td>
         <td>Enables <code>background-image</code> icons within textual inputs and some custom forms for validation states.</td>
      </tr>
      <tr>
         <td><code>$enable-negative-margins</code></td>
         <td><code>true</code> or <code>false</code> (default)</td>
         <td>Enables the generation of <a href="#/docs/utilities/spacing.md">negative margin utilities</a>.</td>
      </tr>
      <tr>
         <td><code>$enable-deprecation-messages</code></td>
         <td><code>true</code> or <code>false</code> (default)</td>
         <td>Set to <code>true</code> to show warnings when using any of the deprecated mixins and functions that are planned to be removed in <code>v5</code>.</td>
      </tr>
      <tr>
         <td><code>$enable-important-utilities</code></td>
         <td><code>true</code> (default) or <code>false</code></td>
         <td>Enables the <code>!important</code> suffix in utility classes.</td>
      </tr>
   </tbody>
</table>