import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import replace from 'rollup-plugin-replace'
import dotenv from 'dotenv'

dotenv.config()

process.env.NODE_ENV = process.env.NODE_ENV || 'debug'
let replaces = {}
for (const [key, value] of Object.entries(process.env)) {
  if (/^(NODE|OT)_/.test(key)) {
    replaces[`process.env.${key}`] = JSON.stringify(value)
  }
}

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
  replace(replaces),
]
