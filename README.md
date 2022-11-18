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
const imageData = decode(content);
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
