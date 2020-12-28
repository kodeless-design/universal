#### JavaScript

Bring Universal to life with our optional JavaScript plugins. Learn about each plugin, our data and programmatic API options, and more.

##### Individual or compiled

Plugins can be included individually (using Universal's individual `js/dist/*.js`), or all at once using `universal.js` or the minified `universal.min.js` (don't include both).

If you use a bundler (Webpack, Rollup...), you can use `/js/dist/*.js` files which are UMD ready.

##### Using Universal as a module

We provide a version of Universal built as `ESM` (`universal.esm.js` and `universal.esm.min.js`) which allows you to use Universal as a module in your browser, if your [targeted browsers support it](https://caniuse.com/es6-module).

```html
<script type="module">
  import { Toast } from 'universal.esm.min.js'

  Array.from(document.querySelectorAll('.toast'))
    .forEach(toastNode => new Toast(toastNode))
</script>
```

<div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Incompatible plugins</h4>
  <p class="mb-0">
  Due to browser limitations, some of our plugins, namely Dropdown, Tooltip and Popover plugins, cannot be used in a <code>&lt;script&gt;</code> tag with <code>module</code>
  type because they depend on Popper. For more information about the issue see <a href="https://v8.dev/features/modules#specifiers">here</a>
  </p>
</div>

##### Dependencies

Some plugins and CSS components depend on other plugins. If you include plugins individually, make sure to check for these dependencies in the docs.

Our dropdowns, popovers and tooltips also depend on [Popper](https://popper.js.org/).

##### Still want to use jQuery? It's possible!

Universal is designed to be used without jQuery, but it's still possible to use our components with jQuery. **If Universal detects `jQuery` in the `window` object** it'll add all of our components in jQuery's plugin system; this means you'll be able to do `$('[data-un-toggle="tooltip"]').tooltip()` to enable tooltips. The same goes for our other components.

##### Data attributes

Nearly all Universal plugins can be enabled and configured through HTML alone with data attributes (our preferred way of using JavaScript functionality). Be sure to **only use one set of data attributes on a single element** (e.g., you cannot trigger a tooltip and modal from the same button.)

<div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Selectors</h4>
  <p class="mb-0">
  Currently to query DOM elements we use the native methods <code>querySelector</code> and <code>querySelectorAll</code>
  for performance reasons, so you have to use <a href="https://www.w3.org/TR/CSS21/syndata.html#value-def-identifier">valid selectors</a> If you use special selectors, for example: <code>collapse:Example</code> be sure to escape them.
  </p>
</div>

##### Events

Universal provides custom events for most plugins' unique actions. Generally, these come in an infinitive and past participle form - where the infinitive (ex. `show`) is triggered at the start of an event, and its past participle form (ex. `shown`) is triggered on the completion of an action.

All infinitive events provide [`preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) functionality. This provides the ability to stop the execution of an action before it starts. Returning false from an event handler will also automatically call `preventDefault()`.

```js
var myModal = document.getElementById('myModal')

myModal.addEventListener('show.un.modal', function (event) {
  if (!data) {
    return event.preventDefault() // stops modal from being shown
  }
})
```

<div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">jQuery events</h4>
  <p class="mb-0">
  Universal will detect jQuery if <code>jQuery</code> is present in <code>window</code> object and there is no <code>data-un-no-jquery</code> attribute set on <code>&lt;body&gt;</code>. If jQuery is found, Universal will emit events thanks to jQuery's event system. So if you want to listen to Universal's events, you'll have to use the jQuery methods (<code>.on</code>, <code>.one</code>  instead of <code>addEventListener</code>
  </p>
</div>

```js
$('#myTab a').on('shown.un.tab', function () {
  // do something...
})
```

##### Programmatic API

All constructors accept an optional options object or nothing (which initiates a plugin with its default behavior):

```js
var myModalEl = document.getElementById('myModal')

var modal = new universal.Modal(myModalEl) // initialized with defaults
var modal = new universal.Modal(myModalEl, { keyboard: false }) // initialized with no keyboard
```

If you'd like to get a particular plugin instance, each plugin exposes a `getInstance` method. In order to retrieve it directly from an element, do this: `universal.Popover.getInstance(myPopoverEl)`.

##### Asynchronous functions and transitions

All programmatic API methods are **asynchronous** and return to the caller once the transition is started but **before it ends**.

In order to execute an action once the transition is complete, you can listen to the corresponding event.

```js
var myCollapseEl = document.getElementById('#myCollapse')

myCollapseEl.addEventListener('shown.un.collapse', function (event) {
  // Action to execute once the collapsible area is expanded
})
```

In addition a method call on a **transitioning component will be ignored**.

```js
var myCarouselEl = document.getElementById('myCarousel')
var carousel = universal.Carousel.getInstance(myCarouselEl) // Retrieve a Carousel instance

myCarouselEl.addEventListener('slid.un.carousel', function (event) {
  carousel.to('2') // Will slide to the slide 2 as soon as the transition to slide 1 is finished
})

carousel.to('1') // Will start sliding to the slide 1 and returns to the caller
carousel.to('2') // !! Will be ignored, as the transition to the slide 1 is not finished !!
```

##### Default settings

You can change the default settings for a plugin by modifying the plugin's `Constructor.Default` object:

```js
// changes default for the modal plugin's `keyboard` option to false
universal.Modal.Default.keyboard = false
```

##### No conflict (only if you use jQuery)

Sometimes it is necessary to use Universal plugins with other UI frameworks. In these circumstances, namespace collisions can occasionally occur. If this happens, you may call `.noConflict` on the plugin you wish to revert the value of.

```js
var universalButton = $.fn.button.noConflict() // return $.fn.button to previously assigned value
$.fn.universalBtn = universalButton // give $().universalBtn the Universal functionality
```

##### Version numbers

The version of each of Universal's plugins can be accessed via the `VERSION` property of the plugin's constructor. For example, for the tooltip plugin:

```js
universal.Tooltip.VERSION // => "{{< param current_version >}}"
```

##### No special fallbacks when JavaScript is disabled

Universal's plugins don't fall back particularly gracefully when JavaScript is disabled. If you care about the user experience in this case, use [`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) to explain the situation (and how to re-enable JavaScript) to your users, and/or add your own custom fallbacks.

<div class="alert alert-warning" role="alert">
  <h4 class="alert-heading">Third-party libraries</h4>
  <p class="mb-0">
  <bold>Universal does not officially support third-party JavaScript libraries</bold> like Prototype or jQuery UI. Despite <code>.noConflict</code> and namespaced events, there may be compatibility problems that you need to fix on your own.
  </p>
</div>

##### Sanitizer

Tooltips and Popovers use our built-in sanitizer to sanitize options which accept HTML.

The default `allowList` value is the following:

```js
var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i
var DefaultAllowlist = {
  // Global attributes allowed on any supplied element below.
  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
  a: ['target', 'href', 'title', 'rel'],
  area: [],
  b: [],
  br: [],
  col: [],
  code: [],
  div: [],
  em: [],
  hr: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  i: [],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
  li: [],
  ol: [],
  p: [],
  pre: [],
  s: [],
  small: [],
  span: [],
  sub: [],
  sup: [],
  strong: [],
  u: [],
  ul: []
}
```

If you want to add new values to this default `allowList` you can do the following:

```js
var myDefaultAllowList = universal.Tooltip.Default.allowList

// To allow table elements
myDefaultAllowList.table = []

// To allow td elements and data-un-option attributes on td elements
myDefaultAllowList.td = ['data-un-option']

// You can push your custom regex to validate your attributes.
// Be careful about your regular expressions being too lax
var myCustomRegex = /^data-my-app-[\w-]+/
myDefaultAllowList['*'].push(myCustomRegex)
```

If you want to bypass our sanitizer because you prefer to use a dedicated library, for example [DOMPurify](https://www.npmjs.com/package/dompurify), you should do the following:

```js
var yourTooltipEl = document.getElementById('yourTooltip')
var tooltip = new universal.Tooltip(yourTooltipEl, {
  sanitizeFn: function (content) {
    return DOMPurify.sanitize(content)
  }
})
```