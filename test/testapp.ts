import { decode, fromString } from '../src/api';

function fail(msg: string): never {
  throw new Error(msg);
}

function equals(lhs: any, rhs: any): void | never {
  if (lhs !== rhs) {
    fail(`Equality failed. Expected ${lhs} to equal ${rhs}`);
  }
  console.log(`✓ ${lhs} === ${rhs}`);
}

function deepEquals(lhs: any, rhs: any): void | never {
  if (JSON.stringify(lhs) !== JSON.stringify(rhs)) {
    fail(`Deep equality failed. Expected ${lhs} to equal ${rhs}`);
  }
  console.log(`✓ ${lhs} deep === ${rhs}`);
}

const P1 = `P1
# This is an example bitmap of the letter "J"
6 10
0 0 0 0 1 0
0 0 0 0 1 0
0 0 0 0 1 0
0 0 0 0 1 0
0 0 0 0 1 0
0 0 0 0 1 0
1 0 0 0 1 0
0 1 1 1 0 0
0 0 0 0 0 0
0 0 0 0 0 0`;

const P1b = `P1
# This is an example bitmap of the letter "J"
6 10
000010000010000010000010000010000010100010011100000000000000`;

const P2 = `P2
# Shows the word "FEEP" (example from Netpbm man page on PGM)
24 7
15
0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0
0  3  3  3  3  0  0  7  7  7  7  0  0 11 11 11 11  0  0 15 15 15 15  0
0  3  0  0  0  0  0  7  0  0  0  0  0 11  0  0  0  0  0 15  0  0 15  0
0  3  3  3  0  0  0  7  7  7  0  0  0 11 11 11  0  0  0 15 15 15 15  0
0  3  0  0  0  0  0  7  0  0  0  0  0 11  0  0  0  0  0 15  0  0  0  0
0  3  0  0  0  0  0  7  7  7  7  0  0 11 11 11 11  0  0 15  0  0  0  0
0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0`;

const P3 = `P3           # "P3" means this is a RGB color image in ASCII
3 2          # "3 2" is the width and height of the image in pixels
255          # "255" is the maximum value for each color
# The part above is the header
# The part below is the image data: RGB triplets
255   0   0  # red
  0 255   0  # green
  0   0 255  # blue
255 255   0  # yellow
255 255 255  # white
  0   0   0  # black`;

const P3b = `P3
# The same image with width 3 and height 2,
# using 0 or 1 per color (red, green, blue)
3 2 1
1 0 0   0 1 0   0 0 1
1 1 0   1 1 1   0 0 0`;

const P3c = `P3 3 2 1  1 0 0   0 1 0   0 0 1  1 1 0   1 1 1   0 0 0`;

function test(): void {
  testFunction(file => decode(new TextEncoder().encode(file)));
  testFunction(file => fromString(file));
}

function testFunction(testfun: (file: any) => ImageData): void {
  const P1imageData = new ImageData(new Uint8ClampedArray([0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255]), 6, 10);
  const P2imageData = new ImageData(new Uint8ClampedArray([ 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 51, 51, 51, 255, 51, 51, 51, 255, 51, 51, 51, 255, 51, 51, 51, 255, 0, 0, 0, 255, 0, 0, 0, 255, 119, 119, 119, 255, 119, 119, 119, 255, 119, 119, 119, 255, 119, 119, 119, 255, 0, 0, 0, 255, 0, 0, 0, 255, 187, 187, 187, 255, 187, 187, 187, 255, 187, 187, 187, 255, 187, 187, 187, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 51, 51, 51, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 119, 119, 119, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 187, 187, 187, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 51, 51, 51, 255, 51, 51, 51, 255, 51, 51, 51, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 119, 119, 119, 255, 119, 119, 119, 255, 119, 119, 119, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 187, 187, 187, 255, 187, 187, 187, 255, 187, 187, 187, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 51, 51, 51, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 119, 119, 119, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 187, 187, 187, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 51, 51, 51, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 119, 119, 119, 255, 119, 119, 119, 255, 119, 119, 119, 255, 119, 119, 119, 255, 0, 0, 0, 255, 0, 0, 0, 255, 187, 187, 187, 255, 187, 187, 187, 255, 187, 187, 187, 255, 187, 187, 187, 255, 0, 0, 0, 255, 0, 0, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0, 255 ]), 24, 7);
  const P3imageData = new ImageData(new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255, 255, 255, 0, 255, 255, 255, 255, 255, 0, 0, 0, 255]), 3, 2);
  const testInputs = [{
    file: P1,
    expectedOutcome: {
      imageData: P1imageData,
    },
  }, {
    file: P1b,
    expectedOutcome: {
      imageData: P1imageData,
    },
  }, {
    file: P2,
    expectedOutcome: {
      imageData: P2imageData,
    },
  }, {
    file: P3,
    expectedOutcome: {
      imageData: P3imageData,
    },
  }, {
    file: P3b,
    expectedOutcome: {
      imageData: P3imageData,
    },
  }, {
    file: P3c,
    expectedOutcome: {
      imageData: P3imageData,
    },
  }];

  for (const { file, expectedOutcome } of testInputs) {
    const imageData = testfun(file);
    equals(imageData.width, expectedOutcome.imageData.width);
    equals(imageData.height, expectedOutcome.imageData.height);
    deepEquals(Array.from(imageData.data), Array.from(expectedOutcome.imageData.data));
  }

  console.log('All tests passed');
}

window.onload = test;
