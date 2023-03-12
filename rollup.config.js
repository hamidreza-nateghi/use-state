import typescript from '@rollup/plugin-typescript';

export default {
  input: 'index.ts',
  output: [{
    file: 'dist/index.js',
    format: 'cjs'
  }, {
    file: 'dist/esm/index.js',
    format: 'esm'
  }],
  external: ['use-sync-external-store/with-selector'],
  plugins: [typescript()]
}