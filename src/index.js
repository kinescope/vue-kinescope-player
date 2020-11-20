import vueKinescopePlayer from './main'

function plugin(Vue) {
  Vue.component('kinescope-player', vueKinescopePlayer)
}

export default plugin

export {
  vueKinescopePlayer
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}