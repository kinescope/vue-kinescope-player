import vue from 'rollup-plugin-vue'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

const formats = {
  es: {
    file: 'dist/bundle.es.js',
    format: 'es'
  },
  umd: {
    file: 'dist/bundle.umd.js',
    format: 'umd',
    name: 'VueKinescopePlayer',
    globals: {
      vue: 'Vue'
    }
  }
}

const format = process.env.FORMAT || 'umd'
const config = {
  input: 'src/index.js',
  output: {
    ...formats[format],
    exports: 'named'
  },
  external: ['vue', '@babel/runtime'],
  plugins: [
    vue({
      css: true,
      template: {
        isProduction: true
      },
      compilerOptions: {
        whitespace: 'condense'
      }
    }),
    resolve({
      extensions: ['.js', '.vue', '.json']
    }),
    commonjs({
      include: /node_modules/
    }),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.vue']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(terser())
}

export default config
