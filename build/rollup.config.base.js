import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import svelte from 'rollup-plugin-svelte'

export const baseConfig = {
  input: 'src/index.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
  },
}

export const basePlugins = [
  nodeResolve(),
  commonjs(),
  svelte({
    include: 'src/components/**/*.html',
    exlude: 'node_modules/**',
  }),
]
