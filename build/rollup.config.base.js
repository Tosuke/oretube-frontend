import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import replace from 'rollup-plugin-replace'

export const input = 'src/index.js'
export const output = {
  file: 'public/bundle.js',
  format: 'iife',
  sourcemap: true,
}

export const plugins = [
  nodeResolve({
    browser: true,
    jsnext: true,
  }),
  commonjs({
    include: 'node_modules/**',
  }),
  svelte({
    include: 'src/components/**/*.html',
    exlude: 'node_modules/**',
  }),
  replace({
    'process.env.NODE_ENV': '"production"',
  }),
]
