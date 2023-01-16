<template>
  <Loader @js-load="handleJsLoad" @js-load-error="handleJsLoadError">
    <div ref="player"></div>
  </Loader>
</template>

<script>
import Loader from './loader.vue'
import {VIDEO_HOST, PLAYER_ID_PREFIX, EVENTS_MAP} from './constants'

let index = 1

export default {
  props: {
    videoId: {
      type: [Number, String],
      required: true
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100%'
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    muted: {
      type: Boolean,
      default: false
    },
    loop: {
      type: Boolean,
      default: false
    }
  },
  components: { Loader },
  data () {
    return {
      playerLoad: false,
      player: null
    }
  },
  mounted () {
    if (this.playerLoad) {
      this.create()
    }
  },
  computed: {
    propsChanged () {
      const { videoId, width, height, autoPlay, muted, loop } = this

      return {
        videoId,
        width,
        height,
        autoPlay,
        muted,
        loop
      }
    }
  },
  watch: {
    propsChanged: async function () {
      await this.updatePlayer()
    }
  },
  methods: {
    getNextIndex () {
      return index++
    },
    getNextPlayerId () {
      return PLAYER_ID_PREFIX + this.getNextIndex()
    },
    create: async function () {
      if (!this.$refs.player) {
        return
      }

      const playerId = this.getNextPlayerId()
      const playerDiv = document.createElement('div')
      playerDiv.setAttribute('id', playerId)
      this.$refs.player.replaceChildren(playerDiv)

      this.player = await this.createPlayer(playerId)
      EVENTS_MAP.forEach(item => {
        const [vueEvent, playerEvent] = item
        if (this.player) {
          this.player.on(playerEvent, (e) => {
            this.$emit(vueEvent, e.data)
          })
        }
      })
    },
    destroy: async function () {
      if (!this.player) {
        return
      }

      await this.player.destroy()
      this.player = null
    },
    createPlayer (playerId) {
      const options = {
        url: this.getIFrameUrl(),
        size: {
          width: this.width,
          height: this.height
        },
        behaviour: {
          autoPlay: this.autoPlay,
          muted: this.muted,
          loop: this.loop
        }
      }

      return window.Kinescope.IframePlayer.create(playerId, options)
    },
    updatePlayer: async function () {
      await this.destroy()
      await this.create()
    },
    getIFrameUrl () {
      return VIDEO_HOST + this.videoId
    },
    handleJsLoad () {
      this.playerLoad = true
      this.$emit('js-load')
      this.create()
    },
    handleJsLoadError (e) {
      this.$emit('js-load-error', e)
    }
  }
}
</script>
