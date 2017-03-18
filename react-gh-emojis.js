import React from 'react'
import emojis from './data/emojis'

const delimiterRegex = /(:[\w\-\+]+:)/g

/**
 * Return array with matched emojis in text.
 *
 * @param {String} text Text to search for emojis.
 * @returns {Array<String>} Array with matched emojis.
 */
export function find(text) {
  return text.match(delimiterRegex) || []
}

/**
 * Return all emojis.
 *
 * @returns {Object} Object with emoji names as keys and generated image tags
 * as values.
 */
export function all() {
  return emojis
}

/**
 * Check if requested emoji exists.
 *
 * @param {String} emojiId Name of emoji.
 * @returns {Boolean}
 */
export function exist(emojiId) {
  const emojiMap = all()
  return !!emojiMap[emojiId]
}

/**
 * Return github's image url of emoji.
 *
 * @param {String} emojiId Name of emoji.
 * @returns {String} Image url of given emoji.
 */
export function getUrl(emojiId) {
  const emojiMap = all()
  return emojiMap[emojiId]
}

/**
 * Parse text and replace emoji tags with actual emoji symbols.
 *
 * @param {String} text Text to parse.
 * @param {Object} options Options with additional data for parser.
 * @param {String} options.classNames String with custom class names
 * added to each emoji, separated with whitespace.
 * @returns {JSX} Parsed text with emoji image tags in it.
 */
export function parse(text = '', options = {}) {
  const customClassNames = options.classNames ? options.classNames.trim().split(/\s+/) : ''
  const trimmed = text.trim().split(' ')

  if (trimmed[0] === '') {
    return null
  }

  const elements = trimmed.map(chunck => {
    if (chunck.match(delimiterRegex)) {
      const name = chunck.replace(/:/g, '')
      const classNames = ['gh-emoji', `gh-emoji-${name}`]

      if (!exist(name)) {
        return chunck
      }

      if (customClassNames) {
        classNames.push(...customClassNames)
      }

      const imageSrc = getUrl(name)
      const imageClass = classNames.join(' ')
      const imageAlt = name

      return {
        type: 'img',
        src: imageSrc,
        className: imageClass,
        alt: imageAlt,
      }
    }

    return {
      type: 'text',
      text: chunck,
    }
  })

  return (
    <span>
      {elements.map((element, key) => {
        if (element.type === 'img') {
          return (
            <img
              key={key}
              src={element.src}
              className={element.className}
              alt={element.alt}
              style={{
                width: 14,
                height: 14,
                float: 'left',
                marginRight: 3
              }}
            />
          )
        } else {
          return (
            <span key={key}>
              {element.text}&nbsp;
            </span>
          )
        }
      })}
    </span>
  )
}
