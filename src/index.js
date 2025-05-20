import './polyfills'
import KinescopePlayer from './main.vue'

const plugin = {
  install(app) {
    app.component('kinescope-player', KinescopePlayer)
  }
}

export default plugin

export {
  KinescopePlayer
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
