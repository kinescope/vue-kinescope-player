import VueKinescopePlayer from './main.vue'

function plugin (Vue) {
  Vue.component('kinescope-player', VueKinescopePlayer)
}

export default plugin

export {
  VueKinescopePlayer
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
