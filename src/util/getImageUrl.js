const _ceil = require('lodash/ceil')

const sizes = [10, 300, 600, 900, 1200, 1800]
const outputDir = '/images/uploads/'
const resizedDir = '/images/uploads/resized/'
const imgixUrl = 'https://thrive-glass.imgix.net'

const getImgixUrl = ({ path, size, extname }) => {
  if (extname === 'webp') {
    const filename = path.split('/').pop()
    path = resizedDir + filename + '.png'
  }

  return `${imgixUrl}${encodeURI(
    path
  )}?w=${size}&fit=max&auto=compress,enhance,format`
}

const parseFilename = filename => {
  const parts = filename.match(/(.+)\.([\w]+)$/)
  return {
    filename: parts[1],
    extname: parts[2]
  }
}

const getImageSrcset = path => {
  if (!path || path.match(/^http/) || path.match(/svg$/) || window.CMS) {
    return null
  }
  const { filename, extname } = parseFilename(path)
  const pathname = encodeURI(filename.replace(outputDir, resizedDir))

  const srcset = sizes
    .map(
      size =>
        `${
          imgixUrl
            ? getImgixUrl({ path, size, extname })
            : `${pathname}.${size}.${extname}`
        } ${size}w`
    )
    .join(', ')
  return srcset
}

const getImageSrc = (path, sizeRequested) => {
  if (!path || path.match(/^http/) || path.match(/svg$/) || window.CMS) {
    return encodeURI(path)
  }
  sizeRequested = parseInt(sizeRequested, 10)
  let size
  if (sizeRequested && imgixUrl) {
    // round to nearest 100px
    size = sizeRequested <= 100 ? sizeRequested : _ceil(sizeRequested, -2)
  } else if (sizeRequested) {
    // rounds up to nearest size or returns largest
    size =
      sizes.filter(num => num >= sizeRequested)[0] || sizes[sizes.length - 1]
  } else {
    // get the middle size
    size = sizes[Math.ceil(sizes.length / 2)]
  }

  const { filename, extname } = parseFilename(path)
  const pathname = encodeURI(filename.replace(outputDir, resizedDir))
  if (imgixUrl) return getImgixUrl({ path, size, extname })
  return `${pathname}.${size}.${extname}`
}

module.exports = {
  getImageSrcset,
  getImageSrc,
  sizes,
  outputDir,
  resizedDir,
  imgixUrl
}
