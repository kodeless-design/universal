#### Contents

Discover what’s included in Universal, including our precompiled and source code flavors.

##### Precompiled Universal

Once downloaded, unzip the compressed folder and you'll see something like this:

```text
universal/
├── css/
│   ├── universal-grid.css
│   ├── universal-grid.css.map
│   ├── universal-grid.min.css
│   ├── universal-grid.min.css.map
│   ├── universal-grid.rtl.css
│   ├── universal-grid.rtl.css.map
│   ├── universal-grid.rtl.min.css
│   ├── universal-grid.rtl.min.css.map
│   ├── universal-reboot.css
│   ├── universal-reboot.css.map
│   ├── universal-reboot.min.css
│   ├── universal-reboot.min.css.map
│   ├── universal-reboot.rtl.css
│   ├── universal-reboot.rtl.css.map
│   ├── universal-reboot.rtl.min.css
│   ├── universal-reboot.rtl.min.css.map
│   ├── universal-utilities.css
│   ├── universal-utilities.css.map
│   ├── universal-utilities.min.css
│   ├── universal-utilities.min.css.map
│   ├── universal-utilities.rtl.css
│   ├── universal-utilities.rtl.css.map
│   ├── universal-utilities.rtl.min.css
│   ├── universal-utilities.rtl.min.css.map
│   ├── universal.css
│   ├── universal.css.map
│   ├── universal.min.css
│   ├── universal.min.css.map
│   ├── universal.rtl.css
│   ├── universal.rtl.css.map
│   ├── universal.rtl.min.css
│   └── universal.rtl.min.css.map
└── js/
    ├── universal.bundle.js
    ├── universal.bundle.js.map
    ├── universal.bundle.min.js
    ├── universal.bundle.min.js.map
    ├── universal.esm.js
    ├── universal.esm.js.map
    ├── universal.esm.min.js
    ├── universal.esm.min.js.map
    ├── universal.js
    ├── universal.js.map
    ├── universal.min.js
    └── universal.min.js.map
```

This is the most basic form of Universal: precompiled files for quick drop-in usage in nearly any web project. We provide compiled CSS and JS (`universal.*`), as well as compiled and minified CSS and JS (`universal.min.*`). [source maps](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps) (`universal.*.map`) are available for use with certain browsers' developer tools. Bundled JS files (`universal.bundle.js` and minified `universal.bundle.min.js`) include [Popper](https://popper.js.org/).

##### CSS files

Universal includes a handful of options for including some or all of our compiled CSS.

<table class="table">
  <thead>
    <tr>
      <th scope="col">CSS files</th>
      <th scope="col">Layout</th>
      <th scope="col">Content</th>
      <th scope="col">Components</th>
      <th scope="col">Utilities</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
        <div><code class="fw-normal text-nowrap">universal.css</code></div>
        <div><code class="fw-normal text-nowrap">universal.rtl.css</code></div>
        <div><code class="fw-normal text-nowrap">universal.min.css</code></div>
        <div><code class="fw-normal text-nowrap">universal.rtl.min.css</code></div>
      </th>
      <td>Included</td>
      <td>Included</td>
      <td>Included</td>
      <td>Included</td>
    </tr>
    <tr>
      <th scope="row">
        <div><code class="fw-normal text-nowrap">universal-grid.css</code></div>
        <div><code class="fw-normal text-nowrap">universal-grid.rtl.css</code></div>
        <div><code class="fw-normal text-nowrap">universal-grid.min.css</code></div>
        <div><code class="fw-normal text-nowrap">universal-grid.rtl.min.css</code></div>
      </th>
      <td><a class="link-primary" href="#/docs/layout/grid.md">Only grid system</a></td>
      <td class="text-muted">&mdash;</td>
      <td class="text-muted">&mdash;</td>
      <td><a class="link-primary" href="#/docs/utilities/flex.md">Only flex utilities</a></td>
    </tr>
    <tr>
      <th scope="row">
        <div><code class="fw-normal text-nowrap">universal-utilities.css</code></div>
        <div><code class="fw-normal text-nowrap">universal-utilities.rtl.css</code></div>
        <div><code class="fw-normal text-nowrap">universal-utilities.min.css</code></div>
        <div><code class="fw-normal text-nowrap">universal-utilities.rtl.min.css</code></div>
      </th>
      <td class="text-muted">&mdash;</td>
      <td class="text-muted">&mdash;</td>
      <td class="text-muted">&mdash;</td>
      <td>Included</td>
    </tr>
    <tr>
      <th scope="row">
        <div><code class="fw-normal text-nowrap">universal-reboot.css</code></div>
        <div><code class="fw-normal text-nowrap">universal-reboot.rtl.css</code></div>
        <div><code class="fw-normal text-nowrap">universal-reboot.min.css</code></div>
        <div><code class="fw-normal text-nowrap">universal-reboot.rtl.min.css</code></div>
      </th>
      <td class="text-muted">&mdash;</td>
      <td><a class="link-primary" href="#/docs/content/reboot.md">Only Reboot</a></td>
      <td class="text-muted">&mdash;</td>
      <td class="text-muted">&mdash;</td>
    </tr>
  </tbody>
</table>

##### JS files

Similarly, we have options for including some or all of our compiled JavaScript.

<table class="table">
  <thead>
    <tr>
      <th scope="col">JS files</th>
      <th scope="col">Popper</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
        <div><code class="fw-normal text-nowrap">universal.bundle.js</code></div>
        <div><code class="fw-normal text-nowrap">universal.bundle.min.js</code></div>
      </th>
      <td>Included</td>
    </tr>
    <tr>
      <th scope="row">
        <div><code class="fw-normal text-nowrap">universal.js</code></div>
        <div><code class="fw-normal text-nowrap">universal.min.js</code></div>
      </th>
      <td class="text-muted">&mdash;</td>
    </tr>
  </tbody>
</table>

##### Universal source code

The Universal source code download includes the precompiled CSS and JavaScript assets, along with source Sass, JavaScript, and documentation. More specifically, it includes the following and more:

```text
universal/
├── dist/
│   ├── css/
│   └── js/
├── js/
└── scss/
```

The `scss/` and `js/` are the source code for our CSS and JavaScript. The `dist/` folder includes everything listed in the precompiled download section above. Beyond that, any other included file provides support for packages, license information, and development.