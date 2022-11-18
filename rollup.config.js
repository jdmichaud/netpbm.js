// rollup.config.js
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/api.ts',
  output: [{
    name: 'netpbm',
    file: 'dist/netpbm.js',
    format: 'umd',
    sourcemap: true,
  }, {
    name: 'netpbm',
    file: 'dist/netpbm.min.js',
    format: 'umd',
    sourcemap: true,
    plugins: [terser()],
  }],
  watch: {
    clearScreen: false,
  },
  plugins: [
    resolve(),
    commonjs(),
    sourcemaps(),
    typescript(),
  ],
}
