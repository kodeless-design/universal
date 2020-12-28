#### Download

Download Universal to get the compiled CSS and JavaScript, source code, or include it with your favorite package managers like npm and more.

##### Compiled CSS and JS

Download ready-to-use compiled code for **Universal 1.0.0** to easily drop into your project, which includes:

- Compiled and minified CSS bundles (see [CSS files comparison](#/docs/getting-started/contents.md))
- Compiled and minified JavaScript plugins (see [JS files comparison](#/docs/getting-started/contents.md))

This doesn't include documentation, source files, or any optional JavaScript dependencies like Popper.

<a href="#" class="btn btn-primary">Download</a>

##### Source Files

Compile Universal with your own asset pipeline by downloading our source Sass, JavaScript, and documentation files. This option requires some additional tooling:

- Sass compiler (Libsass or Ruby Sass is supported) for compiling your CSS.
- [Autoprefixer](https://github.com/postcss/autoprefixer) for CSS vendor prefixing

Should you require [build tools](#/docs/getting-started/build-tools.md), they are included for developing Universal and its docs, but they're likely unsuitable for your own purposes.

<a href="#" class="btn btn-primary">Download source</a>

##### Examples

If you want to download and examine our [examples](#/docs/examples/index.md), you can grab the already built examples:

<a href="#" class="btn btn-primary">Download Examples</a>

##### CDN via jsDelivr

Skip the download with [jsDelivr](https://www.jsdelivr.com/) to deliver cached version of Universal's compiled CSS and JS to your project.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.0/dist/css/universal.min.css" integrity="sha256-I35SFWi2Whrdv6cvobUfnr03rOlhp4Irtn4ax2uCiyc=" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.0/dist/js/universal.bundle.min.js" integrity="sha256-iCwB5Cy+DWEFe50EhYwPF3HB9+T3exENnVYBYZ0IA2M=" crossorigin="anonymous"></script>
```

If you're using our compiled JavaScript and prefer to include Popper separately, add Popper before our JS, via a CDN preferably.

```html
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.0/dist/js/universal.min.js" integrity="sha256-d+j1JZHnieT7jCg89yE0eUHlM7XnSjVTrW53QfpkH2g=" crossorigin="anonymous"></script>
```

##### Package managers

Pull in Universal's **source files** into nearly any project with some of the most popular package managers. No matter the package manager, Universal will **require a Sass compiler and [Autoprefixer](https://github.com/postcss/autoprefixer)** for a setup that matches our official compiled versions.

##### npm

Install Universal in your Node.js powered apps with [the npm package](https://www.npmjs.com/package/@kodeless_design/universal-ui):

```sh
npm i @kodeless_design/universal-ui
```

`const universal = require('universal')` or `import universal from 'universal'` will load all of Universal's plugins onto a `universal` object.
The `universal` module itself exports all of our plugins. You can manually load Universal's plugins individually by loading the `/js/dist/*.js` files under the package's top-level directory.

Universal's `package.json` contains some additional metadata under the following keys:

- `sass` - path to Universal's main [Sass](https://sass-lang.com/) source file
- `style` - path to Universal's non-minified CSS that's been precompiled using the default settings (no customization)