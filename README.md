# netpbm.js

A no-dependency library to parse Netpbm (and Netpgm and Netppm) files in javascript.

⚠️ Only manages ASCII format for now.

# Usage

Use the decode function who's signature is...:
```ts
function decode(data: Uint8Array): ImageData;
```
... this way:
```js
const content = fs.readFileSync(content).buffer;
const imageData = decode(content);
```

Or the fromString function who's signature is...:
```ts
function fromString(content: string): ImageData;
```
... this way:
```js
const J = `P1
# This is an example bitmap of the letter "J"
6 10
000010000010000010000010000010000010100010011100000000000000`;
const imageData = fromtString(J);
```

# Test

Execute:
```bash
npm test
```

and open your browser to:
```
http://localhost:10001
```

In the console, all tests should be passed.
