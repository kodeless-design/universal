#### Optimize

Keep your projects lean, responsive, and maintainable so you can deliver the best experience and focus on more important jobs.

##### Lean Sass imports

When using Sass in your asset pipeline, make sure you optimize Universal by only `@import`ing the components you need. Your largest optimizations will likely come from the `Layout & Components` section of our `universal.scss`.
``` css
// Configuration
@import "functions";
@import "variables";
@import "mixins";
@import "utilities";

// Layout & components
@import "root";
@import "reboot";
@import "type";
@import "images";
@import "containers";
@import "grid";
@import "tables";
@import "forms";
@import "buttons";
@import "transitions";
@import "dropdown";
@import "button-group";
@import "nav";
@import "navbar";
@import "card";
@import "accordion";
@import "breadcrumb";
@import "pagination";
@import "badge";
@import "alert";
@import "progress";
@import "list-group";
@import "close";
@import "toasts";
@import "modal";
@import "tooltip";
@import "popover";
@import "carousel";
@import "spinners";

// Helpers
@import "helpers";

// Utilities
@import "utilities/api";
```

If you're not using a component, comment it out or delete it entirely. For example, if you're not using the carousel, remove that import to save some file size in your compiled CSS. Keep in mind there are some dependencies across Sass imports that may make it more difficult to omit a file.

##### Lean JavaScript

Universal's JavaScript includes every component in our primary dist files (`universal.js` and `universal.min.js`), and even our primary dependency (Popper) with our bundle files (`universal.bundle.js` and `universal.bundle.min.js`). While you're customizing via Sass, be sure to remove related JavaScript.

For instance, assuming you're using your own JavaScript bundler like Webpack or Rollup, you'd only import the JavaScript you plan on using. In the example below, we show how to just include our modal JavaScript:

```js
// Import just what we need

// import 'universal/js/dist/alert';
// import 'universal/js/dist/button';
// import 'universal/js/dist/carousel';
// import 'universal/js/dist/collapse';
// import 'universal/js/dist/dropdown';
import 'universal/js/dist/modal';
// import 'universal/js/dist/popover';
// import 'universal/js/dist/scrollspy';
// import 'universal/js/dist/tab';
// import 'universal/js/dist/toast';
// import 'universal/js/dist/tooltip';
```

This way, you're not including any JavaScript you don't intend to use for components like buttons, carousels, and tooltips. If you're importing dropdowns, tooltips or popovers, be sure to list the Popper dependency in your `package.json` file.