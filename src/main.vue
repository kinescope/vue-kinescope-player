<template>
  <Loader @js-load="handleJsLoad" @js-load-error="handleJsLoadError">
    <div ref="playerRef"></div>
  </Loader>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import Loader from './loader.vue'
import {VIDEO_HOST, PLAYER_ID_PREFIX, EVENTS_MAP} from './constants'

let index = 1

export default {
  name: 'VueKinescopePlayer',
  components: { Loader },
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
    },
    playsInline: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: 'en'
    },
    controls: {
      type: Boolean,
      default: true
    },
    mainPlayButton: {
      type: Boolean,
      default: true
    },
    playbackRateButton: {
      type: Boolean,
      default: true
    }
  },
  emits: ['js-load', 'js-load-error', ...EVENTS_MAP.map(item => item[0])],
  setup(props, { emit, expose }) {
    const playerRef = ref(null)
    const playerLoad = ref(false)
    const player = ref(null)

    const getNextIndex = () => index++
    const getNextPlayerId = () => PLAYER_ID_PREFIX + getNextIndex()

    const propsChanged = computed(() => ({
      videoId: props.videoId,
      width: props.width,
      height: props.height,
      autoPlay: props.autoPlay,
      muted: props.muted,
      loop: props.loop,
      playsInline: props.playsInline,
      language: props.language,
      controls: props.controls,
      mainPlayButton: props.mainPlayButton,
      playbackRateButton: props.playbackRateButton
    }))

    const getIFrameUrl = () => VIDEO_HOST + props.videoId

    const createPlayer = async (playerId) => {
      const options = {
        url: getIFrameUrl(),
        size: {
          width: props.width,
          height: props.height
        },
        behaviour: {
          autoPlay: props.autoPlay,
          muted: props.muted,
          loop: props.loop,
          playsInline: props.playsInline
        },
        ui: {
          language: props.language,
          controls: props.controls,
          mainPlayButton: props.mainPlayButton,
          playbackRateButton: props.playbackRateButton
        }
      }

      return window.Kinescope.IframePlayer.create(playerId, options)
    }

    const destroy = async () => {
      if (!player.value) return
      await player.value.destroy()
      player.value = null
    }

    const create = async () => {
      if (!playerRef.value) return

      const playerId = getNextPlayerId()
      const playerDiv = document.createElement('div')
      playerDiv.setAttribute('id', playerId)
      playerRef.value.replaceChildren(playerDiv)

      player.value = await createPlayer(playerId)
      EVENTS_MAP.forEach(([vueEvent, playerEvent]) => {
        if (player.value) {
          player.value.on(playerEvent, (e) => {
            emit(vueEvent, e.data)
          })
        }
      })
    }

    const updatePlayer = async () => {
      await destroy()
      await create()
    }

    const handleJsLoad = () => {
      playerLoad.value = true
      emit('js-load')
      create()
    }

    const handleJsLoadError = (e) => {
      emit('js-load-error', e)
    }

    expose({ player })

    watch(propsChanged, updatePlayer)

    onMounted(() => {
      if (playerLoad.value) {
        create()
      }
    })

    onBeforeUnmount(destroy)

    return {
      playerRef,
      handleJsLoad,
      handleJsLoadError
    }
  }
}
</script>
