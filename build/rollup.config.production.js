import { input, output, plugins } from './rollup.config.base'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
  input,
  output,
  plugins: [
    ...plugins,
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    uglify({}, minify),
  ],
}
