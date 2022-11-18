// rollup.config.js
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy-watch';
import serve from 'rollup-plugin-serve';

export default {
  input: 'test/testapp.ts',
  output: {
    name: 'testapp',
    file: 'test/dist/testapp.js',
    format: 'umd',
    sourcemap: true,
  },
  watch: {
    clearScreen: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    sourcemaps(),
    typescript(),
    copy({
      targets: [
        { src: 'test/index.html', dest: 'test/dist/' },
      ],
    }),
    serve({ contentBase: 'test/dist' }),
  ],
}
