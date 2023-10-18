function isspace(c: string): boolean {
  return c.trim() === '';
}

function isdigit(c: string): boolean {
  const code = c.charCodeAt(0);
  return code > 47 && code < 58;
}

enum MagicType {
  P1 = 1,
  P2 = 2,
  P3 = 3,
  P4 = 4,
  P5 = 5,
  P6 = 6,
}

interface Header {
  type: MagicType;
  size: [number, number];
  depth: number;
  bodyStart: number;
}

function chunks<T>(arr: Array<T>, n: number): Array<Array<T>> {
  const result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }
  return result;
}

function decodeHeader(content: string): Header {
  let i = 0;
  let type;
  const size = [];
  let depth;
  let complete = false;
  while (i < content.length) {
    if (type === undefined && content[i] === 'P') {
      ++i;
      type = content[i].charCodeAt(0) - 48;
      if (type < 1 || type > 6) {
        throw new Error(`Unknown type P${type}`);
      }
    }
    else if (content[i] === '#') {
      while (content[i] !== '\n') { i++; }
    }
    else if (isdigit(content[i])) {
      const start = i;
      while (isdigit(content[i])) { ++i; }
      const value = Number(content.substring(start, i));
      if (size.length < 2) {
        size.push(value);
      } else {
        depth = value;
      }
    }
    ++i;

    complete = ((type === 1 || type === 4) && size.length === 2) || ((type === 2 || type === 3 || type === 5 || type === 6) && size.length === 2 && depth !== undefined);
    if (complete) {
      break;
    }
  }
  if (type === undefined) {
    throw new Error('Could not find magic number');
  }
  if (!complete) {
    if (size.length !== 2) {
      throw new Error(`Could not find image size ${size.length}`);
    }
    if ((type === 2 || type === 3 || type === 5 || type === 6) && depth === undefined) {
      throw new Error(`Could not find image depth necessary for format P${type}`);
    }
  }

  return { type, size: [size[0], size[1]], depth: depth ?? 1, bodyStart: i };
}

function clearComment(content: string): string {
  return content.replace(/#.*/g, '');
}

function decodeAscii(content: string, header: Header): ImageData {
  let clamedArray;
  const body = clearComment(content.substring(header.bodyStart)).trim();
  switch (header.type) {
    case MagicType.P1: {
      const array = body.replace(/\s/g, '').split('').map(n => Number(n));
      clamedArray = new Uint8ClampedArray(array.map(n => n === 0 ? [0, 0, 0, 255] : [255, 255, 255, 255]).flat());
      break;
    }
    case MagicType.P2: {
      const array = body.split(/\s+/g).map(n => Number(n));
      clamedArray = new Uint8ClampedArray(array.map(n => {
        const value = Math.round(n * 255 / header.depth);
        return [value, value, value, 255];
      }).flat());
      break;
    }
    case MagicType.P3: {
      const array = body.split(/\s+/g).map(n => Number(n));
      clamedArray = new Uint8ClampedArray(chunks(array, 3).map(([r, g, b]) =>
        [Math.round(r * 255 / header.depth), Math.round(g * 255 / header.depth), Math.round(b * 255 / header.depth), 255]
      ).flat());
      break;
    }
    case MagicType.P4:
    case MagicType.P5:
    case MagicType.P6: {
      throw new Error(`Unsupported type ${header.type}`);
    }
    default: {
      throw new Error(`Unknown type ${header.type}`);
    }
  }

  return new ImageData(clamedArray, header.size[0], header.size[1]);
}

function decodeBinary(data: Uint8Array, header: Header): ImageData {
  throw new Error('Binary format not currently supported');
}

export function decode(data: Uint8Array): ImageData {
  const content = (new TextDecoder('utf-8')).decode(data);
  const header = decodeHeader(content);

  const body = header.type < 4 ? decodeAscii(content, header) : decodeBinary(data, header);
  return body;
}

export function fromString(content: string): ImageData {
  const header = decodeHeader(content);

  if (header.type > 3) {
    throw new Error(`Type is ${header.type}. You can only create an image from a string with a ascii type.`);
  }
  return decodeAscii(content, header);
}
