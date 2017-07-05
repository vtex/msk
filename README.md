# msk [![Build Status](https://travis-ci.org/vtex/msk.svg?branch=master)](https://travis-ci.org/vtex/msk)

> Small library to mask strings

## Install

```sh
$ npm install msk
```

## Usage

```js
const msk = require("msk");

msk("552122222222", "+99 (99) 9999-9999")
// "+55 (21) 2222-2222"

msk.fit("22231-0004131", "99999-999")
// "22231-000"
``` 

## API

### msk(str, mask)

Returns a formatted string based on the mask prodived

#### str

Type: `string`

A string to apply the mask.

#### mask

Type: `string`

A mask is formed based on the following symbols:

Symbol | Accepts
---|---
`9` | Numbers (`[0-9]`)
`A` | Letters (`[A-ú]`)
`S` | Alphanumeric chars (`[A-ú0-9]`)
`*` | Anything
other char | Specified char

### msk.fit(str, mask)

Returns a formatted string removing the exceeding characters.


## Examples

```js
msk("552122222222", "+99 (99) 9999-9999")
// "+55 (21) 2222-2222"
```

```js
msk("V6G1C9", "A9A 9A9")
// "V6G 1C9"
```

```js
msk("I love msk", "*-****-***")
// "I-love-msk"
```

```js
msk.fit("22231-0004131", "99999-999")
// "22231-000"
```

## License

MIT © [VTEX](https://www.vtex.com)