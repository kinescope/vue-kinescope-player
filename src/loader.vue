<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import {PLAYER_LATEST, NODE_JS_ID} from './constants'

export default {
  name: 'Loader',
  created () {
    this.jsLoading()
  },
  methods: {
    loadJsNotLoad () {
      const el = document.getElementById(NODE_JS_ID)

      if (el) {
        el.addEventListener('load', this.loadJs)
      }
    },
    loadJs () {
      const el = document.getElementById(NODE_JS_ID)

      if (el) {
        el.removeEventListener('load', this.loadJs)
      }
      this.handleJsLoad()
    },
    jsLoading () {
      if (this.testLoadJs()) {
        if (window && window.Kinescope && window.Kinescope.IframePlayer) {
          this.handleJsLoad()
        } else {
          this.loadJsNotLoad()
        }
        return
      }

      const el = document.createElement('script')
      el.id = NODE_JS_ID
      el.async = false
      document.body.appendChild(el)
      el.onload = this.handleJsLoad
      el.onerror = this.handleJsLoadError
      el.src = PLAYER_LATEST
    },
    testLoadJs () {
      return !!document.getElementById(NODE_JS_ID)
    },
    handleJsLoad () {
      this.$emit('js-load')
    },
    handleJsLoadError (e) {
      this.$emit('js-load-error', e)
    }
  }
}
</script>
