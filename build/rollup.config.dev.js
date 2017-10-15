import { baseConfig, basePlugins } from './rollup.config.base'
import buble from 'rollup-plugin-buble'

export default Object.assign(baseConfig, {
  plugins: [...basePlugins, buble()],
})
