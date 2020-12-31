#### Typography

Documentation and examples for Universal typography, including global settings, headings, body text, lists, and more.

##### Global settings

Universal sets basic global display, typography, and link styles. When more control is needed, check out the [textual utility classes](#/docs/utilities/text.md).

- Use a [native font stack](#/docs/content/reboot.md) that selects the best `font-family` for each OS and device.
- For a more inclusive and accessible type scale, we use the browser's default root `font-size` (typically 16px) so visitors can customize their browser defaults as needed.
- Use the `$font-family-base`, `$font-size-base`, and `$line-height-base` attributes as our typographic base applied to the `<body>`.
- Set the global link color via `$link-color`.
- Use `$body-bg` to set a `background-color` on the `<body>` (`#fff` by default).

These styles can be found within `_reboot.scss`, and the global variables are defined in `_variables.scss`. Make sure to set `$font-size-base` in `rem`.

##### Headings

All HTML headings, `<h1>` through `<h6>`, are available.

<table class="table">
  <thead>
    <tr>
      <th>Heading</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>&lt;h1&gt;&lt;/h1&gt;</code>
      </td>
      <td><span class="h1">h1. Universal heading</span></td>
    </tr>
    <tr>
      <td>
        <code>&lt;h2&gt;&lt;/h2&gt;</code>
      </td>
      <td><span class="h2">h2. Universal heading</span></td>
    </tr>
    <tr>
      <td>
        <code>&lt;h3&gt;&lt;/h3&gt;</code>
      </td>
      <td><span class="h3">h3. Universal heading</span></td>
    </tr>
    <tr>
      <td>
        <code>&lt;h4&gt;&lt;/h4&gt;</code>
      </td>
      <td><span class="h4">h4. Universal heading</span></td>
    </tr>
    <tr>
      <td>
        <code>&lt;h5&gt;&lt;/h5&gt;</code>
      </td>
      <td><span class="h5">h5. Universal heading</span></td>
    </tr>
    <tr>
      <td>
        <code>&lt;h6&gt;&lt;/h6&gt;</code>
      </td>
      <td><span class="h6">h6. Universal heading</span></td>
    </tr>
  </tbody>
</table>

```html
<h1>h1. Universal heading</h1>
<h2>h2. Universal heading</h2>
<h3>h3. Universal heading</h3>
<h4>h4. Universal heading</h4>
<h5>h5. Universal heading</h5>
<h6>h6. Universal heading</h6>
```

`.h1` through `.h6` classes are also available, for when you want to match the font styling of a heading but cannot use the associated HTML element.

<div class="un-example mb-2">
    <p class="h1">h1. Universal heading</p>
    <p class="h2">h2. Universal heading</p>
    <p class="h3">h3. Universal heading</p>
    <p class="h4">h4. Universal heading</p>
    <p class="h5">h5. Universal heading</p>
    <p class="h6">h6. Universal heading</p>
</div>

``` html
<p class="h1">h1. Universal heading</p>
<p class="h2">h2. Universal heading</p>
<p class="h3">h3. Universal heading</p>
<p class="h4">h4. Universal heading</p>
<p class="h5">h5. Universal heading</p>
<p class="h6">h6. Universal heading</p>
```

### Customizing headings

Use the included utility classes to recreate the small secondary heading text from Universal 3.

<div class="un-example mb-2">
    <h3>
        Fancy display heading
        <small class="text-muted">With faded secondary text</small>
    </h3>
</div>

``` html
<h3>
    Fancy display heading
    <small class="text-muted">With faded secondary text</small>
</h3>
```

## Display headings

Traditional heading elements are designed to work best in the meat of your page content. When you need a heading to stand out, consider using a **display heading**—a larger, slightly more opinionated heading style.

<div class="un-example mb-2">
  <div class="display-1 pb-3 mb-3 border-bottom">Display 1</div>
  <div class="display-2 pb-3 mb-3 border-bottom">Display 2</div>
  <div class="display-3 pb-3 mb-3 border-bottom">Display 3</div>
  <div class="display-4 pb-3 mb-3 border-bottom">Display 4</div>
  <div class="display-5 pb-3 mb-3 border-bottom">Display 5</div>
  <div class="display-6">Display 6</div>
</div>

```html
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
<h1 class="display-5">Display 5</h1>
<h1 class="display-6">Display 6</h1>
```

Display headings are configured via the `$display-font-sizes` Sass map and two variables, `$display-font-weight` and `$display-line-height`

``` html
$display-font-sizes: (
  1: 5rem,
  2: 4.5rem,
  3: 4rem,
  4: 3.5rem,
  5: 3rem,
  6: 2.5rem
);

$display-font-weight: 300;
$display-line-height: $headings-line-height;
```

##### Lead

Make a paragraph stand out by adding `.lead`.

<div class="un-example mb-2">
    <p class="lead">
        This is a lead paragraph. It stands out from regular paragraphs.
    </p>
</div>

``` html
<p class="lead">
  This is a lead paragraph. It stands out from regular paragraphs.
</p>
```

##### Inline text elements

Styling for common inline HTML5 elements.

<div class="un-example mb-2">
    <p>You can use the mark tag to <mark>highlight</mark> text.</p>
    <p><del>This line of text is meant to be treated as deleted text.</del></p>
    <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
    <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
    <p><u>This line of text will render as underlined.</u></p>
    <p><small>This line of text is meant to be treated as fine print.</small></p>
    <p><strong>This line rendered as bold text.</strong></p>
    <p><em>This line rendered as italicized text.</em></p>
</div>

``` html
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><del>This line of text is meant to be treated as deleted text.</del></p>
<p><s>This line of text is meant to be treated as no longer accurate.</s></p>
<p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
<p><u>This line of text will render as underlined.</u></p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p><strong>This line rendered as bold text.</strong></p>
<p><em>This line rendered as italicized text.</em></p>
```

Beware that those tags should be used for semantic purpose:

- `<mark>` represents text which is marked or highlighted for reference or notation purposes.
- `<small>` represents side-comments and small print, like copyright and legal text.
- `<s>` represents element that are no longer relevant or no longer accurate.
- `<u>` represents a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation.

If you want to style your text, you should use the following classes instead:

- `.mark` will apply the same styles as `<mark>`.
- `.small` will apply the same styles as `<small>`.
- `.text-decoration-underline` will apply the same styles as `<u>`.
- `.text-decoration-line-through` will apply the same styles as `<s>`.

While not shown above, feel free to use `<b>` and `<i>` in HTML5. `<b>` is meant to highlight words or phrases without conveying additional importance, while `<i>` is mostly for voice, technical terms, etc.

##### Text utilities

Change text alignment, transform, style, weight, line-height, decoration and color with our [text utilities](#/docs/utilities/text.md) and [color utilities](#/docs/utilities/colors.md).

##### Abbreviations

Stylized implementation of HTML's `<abbr>` element for abbreviations and acronyms to show the expanded version on hover. Abbreviations have a default underline and gain a help cursor to provide additional context on hover and to users of assistive technologies.

Add `.initialism` to an abbreviation for a slightly smaller font-size.

<div class="un-example mb-2">
    <p><abbr title="attribute">attr</abbr></p>
    <p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
</div>

``` html
<p><abbr title="attribute">attr</abbr></p>
<p><abbr title="HyperText Markup Language" class="initialism">HTML</abbr></p>
```

##### Blockquotes

For quoting blocks of content from another source within your document. Wrap `<blockquote class="blockquote">` around any <abbr title="HyperText Markup Language">HTML</abbr> as the quote.

<div class="un-example mb-2">
    <blockquote class="blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
    </blockquote>
</div>

``` html
<blockquote class="blockquote">
  <p>A well-known quote, contained in a blockquote element.</p>
</blockquote>
```

##### Naming a source

The HTML spec requires that blockquote attribution be placed outside the `<blockquote>`. When providing attribution, wrap your `<blockquote>` in a `<figure>` and use a `<figcaption>` or a block level element (e.g., `<p>`) with the `.blockquote-footer` class. Be sure to wrap the name of the source work in `<cite>` as well.

<div class="un-example mb-2">
    <figure>
        <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
        </blockquote>
        <figcaption class="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
        </figcaption>
    </figure>
</div>

``` html
<figure>
  <blockquote class="blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    Someone famous in <cite title="Source Title">Source Title</cite>
  </figcaption>
</figure>
```

##### Alignment

Use text utilities as needed to change the alignment of your blockquote.

<div class="un-example mb-2">
    <figure class="text-center">
        <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
        </blockquote>
        <figcaption class="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
        </figcaption>
    </figure>
</div>

``` html
<figure class="text-center">
  <blockquote class="blockquote">
    <p>A well-known quote, contained in a blockquote element.</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    Someone famous in <cite title="Source Title">Source Title</cite>
  </figcaption>
</figure>
```

<div class="un-example mb-2">
    <figure class="text-end">
        <blockquote class="blockquote">
            <p>A well-known quote, contained in a blockquote element.</p>
        </blockquote>
        <figcaption class="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
        </figcaption>
    </figure>
</div>

##### Unstyled Lists

Remove the default `list-style` and left margin on list items (immediate children only). **This only applies to immediate children list items**, meaning you will need to add the class for any nested lists as well.

<div class="un-example mb-2">
    <ul class="list-unstyled">
        <li>This is a list.</li>
        <li>It appears completely unstyled.</li>
        <li>Structurally, it's still a list.</li>
        <li>However, this style only applies to immediate child elements.</li>
        <li>Nested lists:
            <ul>
            <li>are unaffected by this style</li>
            <li>will still show a bullet</li>
            <li>and have appropriate left margin</li>
            </ul>
        </li>
        <li>This may still come in handy in some situations.</li>
    </ul>
</div>

##### Inline

Remove a list's bullets and apply some light `margin` with a combination of two classes, `.list-inline` and `.list-inline-item`.

<div class="un-example mb-2">
    <ul class="list-inline">
        <li class="list-inline-item">This is a list item.</li>
        <li class="list-inline-item">And another one.</li>
        <li class="list-inline-item">But they're displayed inline.</li>
    </ul>
</div>

``` html
<ul class="list-inline">
  <li class="list-inline-item">This is a list item.</li>
  <li class="list-inline-item">And another one.</li>
  <li class="list-inline-item">But they're displayed inline.</li>
</ul>
```

##### Description list alignment

Align terms and descriptions horizontally by using our grid system's predefined classes (or semantic mixins). For longer terms, you can optionally add a `.text-truncate` class to truncate the text with an ellipsis.

<div class="un-example mb-2">
    <dl class="row">
        <dt class="col-sm-3">Description lists</dt>
        <dd class="col-sm-9">A description list is perfect for defining terms.</dd>
        <dt class="col-sm-3">Term</dt>
        <dd class="col-sm-9">
            <p>Definition for the term.</p>
            <p>And some more placeholder definition text.</p>
        </dd>
        <dt class="col-sm-3">Another term</dt>
        <dd class="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>
        <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
        <dd class="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>
        <dt class="col-sm-3">Nesting</dt>
        <dd class="col-sm-9">
            <dl class="row">
            <dt class="col-sm-4">Nested definition list</dt>
            <dd class="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
            </dl>
        </dd>
    </dl>
</div>

``` html
<dl class="row">
  <dt class="col-sm-3">Description lists</dt>
  <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

  <dt class="col-sm-3">Term</dt>
  <dd class="col-sm-9">
    <p>Definition for the term.</p>
    <p>And some more placeholder definition text.</p>
  </dd>

  <dt class="col-sm-3">Another term</dt>
  <dd class="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>

  <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
  <dd class="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>

  <dt class="col-sm-3">Nesting</dt>
  <dd class="col-sm-9">
    <dl class="row">
      <dt class="col-sm-4">Nested definition list</dt>
      <dd class="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
    </dl>
  </dd>
</dl>
```

##### Responsive font sizes

In Universal, we've enabled responsive font sizes by default, allowing text to scale more naturally across device and viewport sizes.