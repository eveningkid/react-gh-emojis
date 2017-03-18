'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = find;
exports.all = all;
exports.exist = exist;
exports.getUrl = getUrl;
exports.parse = parse;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _emojis = require('./data/emojis');

var _emojis2 = _interopRequireDefault(_emojis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var delimiterRegex = /(:[\w\-\+]+:)/g;

/**
 * Return array with matched emojis in text.
 *
 * @param {String} text Text to search for emojis.
 * @returns {Array<String>} Array with matched emojis.
 */
function find(text) {
  return text.match(delimiterRegex) || [];
}

/**
 * Return all emojis.
 *
 * @returns {Object} Object with emoji names as keys and generated image tags
 * as values.
 */
function all() {
  return _emojis2.default;
}

/**
 * Check if requested emoji exists.
 *
 * @param {String} emojiId Name of emoji.
 * @returns {Boolean}
 */
function exist(emojiId) {
  var emojiMap = all();
  return !!emojiMap[emojiId];
}

/**
 * Return github's image url of emoji.
 *
 * @param {String} emojiId Name of emoji.
 * @returns {String} Image url of given emoji.
 */
function getUrl(emojiId) {
  var emojiMap = all();
  return emojiMap[emojiId];
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
function parse() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var customClassNames = options.classNames ? options.classNames.trim().split(/\s+/) : '';
  var trimmed = text.trim().split(' ');

  if (trimmed[0] === '') {
    return null;
  }

  var elements = trimmed.map(function (chunck) {
    if (chunck.match(delimiterRegex)) {
      var name = chunck.replace(/:/g, '');
      var classNames = ['gh-emoji', 'gh-emoji-' + name];

      if (!exist(name)) {
        return chunck;
      }

      if (customClassNames) {
        classNames.push.apply(classNames, _toConsumableArray(customClassNames));
      }

      var imageSrc = getUrl(name);
      var imageClass = classNames.join(' ');
      var imageAlt = name;

      return {
        type: 'img',
        src: imageSrc,
        className: imageClass,
        alt: imageAlt
      };
    }

    return {
      type: 'text',
      text: chunck
    };
  });

  return _react2.default.createElement(
    'span',
    null,
    elements.map(function (element, key) {
      if (element.type === 'img') {
        return _react2.default.createElement('img', {
          key: key,
          src: element.src,
          className: element.className,
          alt: element.alt,
          style: {
            width: 14,
            height: 14,
            float: 'left',
            marginRight: 3
          }
        });
      } else {
        return _react2.default.createElement(
          'span',
          { key: key },
          element.text,
          '\xA0'
        );
      }
    })
  );
}