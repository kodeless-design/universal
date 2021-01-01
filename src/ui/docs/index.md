#### Introduction

Get started with Universal, component library for building functional yet beautiful interfaces., with jsDelivr and a template starter page.

##### Quick Start

Looking to quickly add Universal to your project? Use jsDelivr, a free open source CDN. Using a package manager or need to download the source files? [Head to the downloads page](#/docs/getting-started/download.md).

##### CSS

Copy-paste the stylesheet `<link>` into your `<head>` before all other stylesheets to load our CSS.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.2/dist/css/universal.min.css" integrity="sha256-I35SFWi2Whrdv6cvobUfnr03rOlhp4Irtn4ax2uCiyc=" crossorigin="anonymous">
```

##### JS

Many of our components require the use of JavaScript to function. Specifically, they require our own JavaScript plugins and [Popper](https://popper.js.org/). Place **one of following `<script>`s** near the end of your pages, right before the closing `</body>` tag, to enable them.

##### Bundle

Include every Universal JavaScript plugin and dependency with one of our two bundles. Both `universal.bundle.js` and `universal.bundle.min.js` include [Popper](https://popper.js.org/) for our tooltips and popovers. For more information about what's included in Universal, please see our [contents](#/docs/getting-started/contents.md) section.

```html
<script src="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.2/dist/js/universal.bundle.min.js" integrity="sha256-iCwB5Cy+DWEFe50EhYwPF3HB9+T3exENnVYBYZ0IA2M=" crossorigin="anonymous"></script>
```

#### Separate

If you decide to go with the separate scripts solution, Popper must come first (if you're using tooltips or popovers), and then our JavaScript plugins.

```html
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.2/dist/js/universal.min.js" integrity="sha256-d+j1JZHnieT7jCg89yE0eUHlM7XnSjVTrW53QfpkH2g=" crossorigin="anonymous"></script>
```

#### Modules

If you use `<script type="module">`, please refer to our [using Universal as a module](#/docs/getting-started/javascript.md) section.

#### Components

Curious which components explicitly require our JavaScript and Popper? Click the show components link below. If you're at all unsure about the general page structure, keep reading for an example page template.

<details>
<summary class="text-primary mb-3">Show components requiring JavaScript</summary>
  <ul>
    <li>Alerts for dismissing</li>
    <li>Buttons for toggling states and checkbox/radio functionality</li>
    <li>Carousel for all slide behaviors, controls, and indicators</li>
    <li>Collapse for toggling visibility of content</li>
    <li>Dropdowns for displaying and positioning <a href="https://popper.js.org">(also requires Popper)</a></li>
    <li>Modals for displaying, positioning, and scroll behavior</li>
    <li>Navbar for extending our Collapse plugin to implement responsive behavior</li>
    <li>Toasts for displaying and dismissing</li>
    <li>Tooltips and popovers for displaying and positioning <a href="https://popper.js.org/">(also requires Popper)</a></li>
    <li>Scrollspy for scroll behavior and navigation updates</li>
  </ul>
</details>

##### Starter Template

Be sure to have your pages set up with the latest design and development standards. That means using an HTML5 doctype and including a viewport meta tag for proper responsive behaviors. Put it all together and your pages should look like this:

```html
<!doctype html>
<html lang="en">
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

That's all you need for overall page requirements. Visit the [Layout docs](#/docs/layout/grid.md) or [our official examples](#/docs/examples/index.md) to start laying out your site's content and components.

##### Important Globals

Universal employs a handful of important global styles and settings that you'll need to be aware of when using it, all of which are almost exclusively geared towards the *normalization* of cross browser styles. Let's dive in.

##### HTML5 Doctype

Universal requires the use of the HTML5 doctype. Without it, you'll see some funky incomplete styling, but including it shouldn't cause any considerable hiccups.

```html
<!doctype html>
<html lang="en">
  ...
</html>
```

##### Responsive Meta Tag

Universal is developed *mobile first*, a strategy in which we optimize code for mobile devices first and then scale up components as necessary using CSS media queries. To ensure proper rendering and touch zooming for all devices, **add the responsive viewport meta tag** to your `<head>`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

You can see an example of this in action in the starter template.

##### Box-sizing

For more straightforward sizing in CSS, we switch the global `box-sizing` value from `content-box` to `border-box`. This ensures `padding` does not affect the final computed width of an element, but it can cause problems with some third party software like Google Maps and Google Custom Search Engine.

On the rare occasion you need to override it, use something like the following:

```css
.selector-for-some-widget {
  box-sizing: content-box;
}
```

With the above snippet, nested elements—including generated content via `::before` and `::after`—will all inherit the specified `box-sizing` for that `.selector-for-some-widget`.

Learn more about [box model and sizing at CSS Tricks](https://css-tricks.com/box-sizing/).

##### Reboot

For improved cross-browser rendering, we use [Reboot](#/docs/content/reboot.md) to correct inconsistencies across browsers and devices while providing slightly more opinionated resets to common HTML elements.