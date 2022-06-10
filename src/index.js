import 'regenerator-runtime/runtime'
import './polyfills'
import KinescopePlayer from './main.vue'

function plugin (Vue) {
  Vue.component('kinescope-player', KinescopePlayer)
}

export default plugin

export {
  KinescopePlayer
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
