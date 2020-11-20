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
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  render (h) {
    let src = `https://kinescope.io/embed/${this.videoId}`
    if (this.autoplay) {
      src += '?autoplay=true'
    }

    return h(
      'iframe', 
      { 
        attrs: {
          src,
          width: this.width,
          height: this.height,
          frameborder: 0,
          allow: "autoplay; fullscreen",
          allowfullscreen: true,
        }
      }
    );
  },
}