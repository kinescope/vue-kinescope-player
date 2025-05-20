<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { PLAYER_LATEST, NODE_JS_ID } from './constants'

export default {
  name: 'Loader',
  emits: ['js-load', 'js-load-error'],
  setup(props, { emit }) {
    const loadJsNotLoad = () => {
      const el = document.getElementById(NODE_JS_ID)

      if (el) {
        el.addEventListener('load', loadJs)
      }
    }

    const loadJs = () => {
      const el = document.getElementById(NODE_JS_ID)

      if (el) {
        el.removeEventListener('load', loadJs)
      }
      handleJsLoad()
    }

    const testLoadJs = () => !!document.getElementById(NODE_JS_ID)

    const handleJsLoad = () => {
      emit('js-load')
    }

    const handleJsLoadError = (e) => {
      emit('js-load-error', e)
    }

    const jsLoading = () => {
      if (testLoadJs()) {
        if (window && window.Kinescope && window.Kinescope.IframePlayer) {
          handleJsLoad()
        } else {
          loadJsNotLoad()
        }
        return
      }

      const el = document.createElement('script')
      el.id = NODE_JS_ID
      el.async = false
      document.body.appendChild(el)
      el.onload = handleJsLoad
      el.onerror = handleJsLoadError
      el.src = PLAYER_LATEST
    }

    onMounted(() => {
      jsLoading()
    })

    return {
      handleJsLoad,
      handleJsLoadError
    }
  }
}
</script>
