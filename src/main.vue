<template>
  <Loader @js-load="handleJsLoad" @js-load-error="handleJsLoadError">
    <div ref="playerRef"></div>
  </Loader>
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import Loader from "./loader.vue";
import { VIDEO_HOST, PLAYER_ID_PREFIX, EVENTS_MAP } from "./constants";

let index = 1;

export default {
  name: "VueKinescopePlayer",
  components: { Loader },
  props: {
    videoId: {
      type: [Number, String],
      required: true,
    },
    width: {
      type: [String, Number],
      default: "100%",
    },
    height: {
      type: [String, Number],
      default: "100%",
    },
    autoPlay: {
      type: [Boolean, String],
      default: false,
    },
    muted: {
      type: Boolean,
      default: false,
    },
    loop: {
      type: Boolean,
      default: false,
    },
    playsInline: {
      type: Boolean,
      default: true,
    },
    volume: {
      type: Number,
      default: null,
    },
    playbackRate: {
      type: Number,
      default: null,
    },
    textTrack: {
      type: [Boolean, String],
      default: null,
    },
    language: {
      type: String,
      default: "en",
    },
    controls: {
      type: Boolean,
      default: true,
    },
    mainPlayButton: {
      type: Boolean,
      default: true,
    },
    playbackRateButton: {
      type: Boolean,
      default: false,
    },
    title: {
      type: Boolean,
      default: true,
    },
    controlBar: {
      type: [Boolean, String],
      default: true,
    },
    progressBar: {
      type: Boolean,
      default: true,
    },
    playButton: {
      type: Boolean,
      default: true,
    },
    volumeButton: {
      type: Boolean,
      default: true,
    },
    subtitlesButton: {
      type: Boolean,
      default: true,
    },
    fullscreenButton: {
      type: [Boolean, String],
      default: true,
    },
    pipButton: {
      type: Boolean,
      default: true,
    },
    settingsButton: {
      type: Boolean,
      default: true,
    },
    playbackRates: {
      type: [Array, Boolean],
      default: null,
    },
    scaleFactors: {
      type: [Array, Boolean],
      default: null,
    },
    videoFit: {
      type: String,
      default: null,
    },
    watermark: {
      type: [String, Object],
      default: null,
    },
    externalId: {
      type: String,
      default: null,
    },
  },
  emits: ["js-load", "js-load-error", ...EVENTS_MAP.map((item) => item[0])],
  setup(props, { emit, expose }) {
    const playerRef = ref(null);
    const playerLoad = ref(false);
    const player = ref(null);

    const getNextIndex = () => index++;
    const getNextPlayerId = () => PLAYER_ID_PREFIX + getNextIndex();
    const getIFrameUrl = () => VIDEO_HOST + props.videoId;

    const buildOptions = (forUpdate = false) => {
      const behavior = {
        autoPlay: props.autoPlay,
        muted: props.muted,
        loop: props.loop,
        playsInline: props.playsInline,
      };
      if (props.volume != null) behavior.volume = props.volume;
      if (props.playbackRate != null)
        behavior.playbackRate = props.playbackRate;
      if (props.textTrack != null) behavior.textTrack = props.textTrack;

      const ui = {
        language: props.language,
        controls: props.controls,
        mainPlayButton: props.mainPlayButton,
        playbackRateButton: props.playbackRateButton,
        title: props.title,
        controlBar: props.controlBar,
        progressBar: props.progressBar,
        playButton: props.playButton,
        volumeButton: props.volumeButton,
        subtitlesButton: props.subtitlesButton,
        fullscreenButton: props.fullscreenButton,
        pipButton: props.pipButton,
        settingsButton: props.settingsButton,
      };
      if (props.playbackRates != null) ui.playbackRates = props.playbackRates;
      if (props.scaleFactors != null) ui.scaleFactors = props.scaleFactors;
      if (props.videoFit != null) ui.videoFit = props.videoFit;
      if (props.watermark != null) {
        ui.watermark = props.watermark;
      } else if (forUpdate) {
        ui.watermark = null;
      }

      const options = {
        size: {
          width: props.width,
          height: props.height,
        },
        behavior,
        ui,
      };

      if (props.externalId != null) {
        options.settings = { externalId: props.externalId };
      }

      return options;
    };

    const hardProps = computed(() => ({
      videoId: props.videoId,
    }));

    const softProps = computed(() => ({
      width: props.width,
      height: props.height,
      autoPlay: props.autoPlay,
      muted: props.muted,
      loop: props.loop,
      playsInline: props.playsInline,
      textTrack: props.textTrack,
      language: props.language,
      controls: props.controls,
      mainPlayButton: props.mainPlayButton,
      playbackRateButton: props.playbackRateButton,
      title: props.title,
      controlBar: props.controlBar,
      progressBar: props.progressBar,
      playButton: props.playButton,
      volumeButton: props.volumeButton,
      subtitlesButton: props.subtitlesButton,
      fullscreenButton: props.fullscreenButton,
      pipButton: props.pipButton,
      settingsButton: props.settingsButton,
      playbackRates: JSON.stringify(props.playbackRates),
      scaleFactors: JSON.stringify(props.scaleFactors),
      videoFit: props.videoFit,
      watermark: JSON.stringify(props.watermark),
      externalId: props.externalId,
    }));

    const createPlayer = async (playerId) => {
      return window.Kinescope.IframePlayer.create(playerId, {
        url: getIFrameUrl(),
        ...buildOptions(),
      });
    };

    const destroy = async () => {
      if (!player.value) return;
      await player.value.destroy();
      player.value = null;
    };

    const create = async () => {
      if (!playerRef.value) return;

      const playerId = getNextPlayerId();
      const playerDiv = document.createElement("div");
      playerDiv.setAttribute("id", playerId);
      playerRef.value.replaceChildren(playerDiv);

      player.value = await createPlayer(playerId);
      EVENTS_MAP.forEach(([vueEvent, playerEvent]) => {
        if (player.value) {
          player.value.on(playerEvent, (e) => {
            emit(vueEvent, e.data);
          });
        }
      });
    };

    const updatePlayer = async () => {
      await destroy();
      await create();
    };

    const updateOptions = async () => {
      if (!player.value) return;
      await player.value.setOptions(buildOptions(true));
    };

    const handleJsLoad = () => {
      playerLoad.value = true;
      emit("js-load");
      create();
    };

    const handleJsLoadError = (e) => {
      emit("js-load-error", e);
    };

    expose({ player });

    watch(hardProps, updatePlayer);
    watch(softProps, updateOptions);
    watch(
      () => props.volume,
      (value) => {
        if (!player.value || value == null) return;
        player.value.setVolume(value);
      }
    );
    watch(
      () => props.playbackRate,
      (value) => {
        if (!player.value || value == null) return;
        player.value.setPlaybackRate(value);
      }
    );

    onMounted(() => {
      if (playerLoad.value) {
        create();
      }
    });

    onBeforeUnmount(destroy);

    return {
      playerRef,
      handleJsLoad,
      handleJsLoadError,
    };
  },
};
</script>
