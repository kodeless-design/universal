import Tooltip from '../../dist/tooltip'
import '../../dist/carousel'

window.addEventListener('load', () => {
  [].concat(...document.querySelectorAll('[data-un-toggle="tooltip"]'))
    .map(tooltipNode => new Tooltip(tooltipNode))
})
