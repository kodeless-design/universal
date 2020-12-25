import { Tooltip } from '../../../dist/js/universal.esm.js'

window.addEventListener('load', () => {
  [].concat(...document.querySelectorAll('[data-un-toggle="tooltip"]'))
    .map(tooltipNode => new Tooltip(tooltipNode))
})
