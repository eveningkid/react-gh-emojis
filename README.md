# React Github Emojis
> This project is mostly based on [zzarcon's github emoji parser](https://github.com/zzarcon/gh-emoji).  

**Important note:** emojis are loaded **synchronously**, which is the main difference with the original repo. Also, the cool other feature is that this parser **turns your string into the corresponding JSX** once parsed.

## Install
`npm install react-gh-emojis`  

## API
- `find(text)`: Return array with matched emojis in text.
- `all()`: Return all emojis.
- `exist(emojiId)`: Check if requested emoji exists.
- `getUrl(emojiId)`: Return github's image url of emoji.
- `parse(text = '', options = {})`: Parse text and replace emoji tags with actual emoji symbols.
  - `options`: `options.classnames`, String with custom class names added to each emoji, separated with whitespace.

## License
MIT © [eveningkid](//github.com/eveningkid)
