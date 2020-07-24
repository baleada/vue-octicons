const fs = require('fs'),
      { toComponentCase } = require('./util')

module.exports = function () {
  const sixteenIcons = getIcons('16'),
        twentyfourIcons = getIcons('24')

  return [...sixteenIcons, ...twentyfourIcons]
}

const viewBoxRegexp = /viewBox="((?:\d|\s)+)/,
      openTagRegexp = /^<svg .*?>(?:\n|\s)*/,
      closeTagRegexp = /(?:\n|\s)*<\/svg>(?:\n|\s)*$/,
      fileNameRegexp = /(?:\w|-|\.)+$/,
      fileExtensionRegexp = /\.svg$/
function getIcons (size) {
  const files = fs.readdirSync(`./git_modules/octicons/icons`).filter(file => file.includes(size)),
        metadata = files.map(file => ({
          name: `${file.match(fileNameRegexp)[0].replace(fileExtensionRegexp, '')}`,
          contents: fs.readFileSync(`./git_modules/octicons/icons/${file}`, 'utf8'),
        }))

  return metadata.map(({ name, contents }) => ({
    componentName: `Octicons${toComponentName(name)}`,
    contents: contents.replace(openTagRegexp, '').replace(closeTagRegexp, ''),
    viewBox: contents.match(viewBoxRegexp)[1],
  }))
}

function toComponentName (snakeCased) {
  return toComponentCase(snakeCased)
}