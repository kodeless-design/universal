#### Download

Download Universal to get the compiled CSS and JavaScript, source code, or include it with your favorite package managers like npm and more.

##### Compiled CSS and JS

Download ready-to-use compiled code for Universal v1.0.0 to easily drop into your project, which includes:

1. Compiled and minified CSS bundles [(see CSS files comparison)]()
2. Compiled and minified JavaScript plugins [(see JS files comparison)]()

This doesn’t include documentation, source files, or any optional JavaScript dependencies like Popper.

<a href="#" class="btn btn-primary">Download</a>

##### Source files

Compile Universal with your own asset pipeline by downloading our source Sass, JavaScript, and documentation files. This option requires some additional tooling:

1. Sass compiler (Libsass or Ruby Sass is supported) for compiling your CSS.
2. [Autoprefixer]() for CSS vendor prefixing

Should you require [build tools](), they are included for developing Bootstrap and its docs, but they’re likely unsuitable for your own purposes.

<a href="#" class="btn btn-primary">Download Source</a>

##### Examples

If you want to download and examine our [examples](), you can grab the already built examples:

<a href="#" class="btn btn-primary">Download Examples</a>

##### CDN via jsDelivr

Skip the download with jsDelivr to deliver cached version of Universal’s compiled CSS and JS to your project.
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.0/dist/css/universal.css" integrity="sha256-rm+EphxmoIoi1K/dFuPNBHqnMkWuIVO4SY7sSSLQhSk=" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.0/dist/js/universal.bundle.js" integrity="sha256-EM18R7KWlLnRJhEebAESQQUVDxBeXuZEbglfGOB8e1A=" crossorigin="anonymous"></script>
```

If you’re using our compiled JavaScript and prefer to include Popper separately, add Popper before our JS, via a CDN preferably.
```
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/@kodeless_design/universal-ui@1.0.0/dist/js/universal.js" integrity="sha256-2JOPdFM0iekWP3a+DOtVzy5b5wEO7oHlZiPcYezwPBs=" crossorigin="anonymous"></script>
```

##### Package Managers

Pull in Universal’s **source files** into nearly any project with some of the most popular package managers. No matter the package manager, Universal will **require a Sass compiler and [Autoprefixer]()** for a setup that matches our official compiled versions.

##### NPM

Install Universal in your Node.js powered apps with the npm package:
```
npm install @kodeless_design/universal-ui
```

`const universal = require('@kodeless_design/universal-ui')` or `import universal from '@kodeless_design/universal-ui` will load all of Universal’s plugins onto a universal object. The universal module itself exports all of our plugins. You can manually load Universal’s plugins individually by loading the /js/dist/*.js files under the package’s top-level directory.