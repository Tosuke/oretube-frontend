import { baseConfig, basePlugins } from './rollup.config.base'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default Object.assign(baseConfig, {
  plugins: [
    ...basePlugins,
    babel({
      exclude: 'node_modules/**',
    }),
    uglify({}, minify),
  ],
})
