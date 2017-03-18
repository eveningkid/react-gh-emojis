'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactGhEmojis = require('./src/react-gh-emojis');

Object.keys(_reactGhEmojis).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reactGhEmojis[key];
    }
  });
});