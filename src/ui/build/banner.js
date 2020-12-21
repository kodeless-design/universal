'use strict'

const pkg = require('../package.json')
const year = new Date().getFullYear()

function getBanner(pluginFilename) {
  return `/*!
  * Universal${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
  * Copyright 2020-${year} ${pkg.author}
  * Licensed under MIT (https://github.com/kodeless-design/universal/blob/main/LICENSE)
  */`
}
module.exports = getBanner