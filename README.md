# Vue wrapper for Kinescope Embed Player

Starting from version 2.0.0, this package works with Vue 3.

## Installation

Using npm:

```bash
npm install @kinescope/vue-kinescope-player --save
```

Using yarn:

```bash
yarn add @kinescope/vue-kinescope-player
```

## Getting Started

You can either import it in your whole project

```js
import KinescopePlayer from "@kinescope/vue-kinescope-player";
import { createApp } from "vue";

const app = createApp(App);
app.use(KinescopePlayer);
app.mount("#app");
```

or import it locally in a component

```js
import { KinescopePlayer } from "@kinescope/vue-kinescope-player";

export default {
  components: { KinescopePlayer },
};
```

```vue
<!-- events -->
<template>
  <kinescope-player
    :video-id="200702846"
    @ready="handleReady"
    @play="handlePlay"
  ></kinescope-player>
</template>
```

```vue
<!-- methods -->
<template>
  <div>
    <kinescope-player
      ref="kinescope"
      :video-id="200702846"
      @ready="handleReady"
    ></kinescope-player>
    <button @click="handleClick" :disabled="!ready">Play</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { KinescopePlayer } from "@kinescope/vue-kinescope-player";

export default {
  components: { KinescopePlayer },
  setup() {
    const ready = ref(false);
    const kinescope = ref(null);

    const handleReady = () => {
      ready.value = true;
    };

    const handleClick = () => {
      kinescope.value.player.play();
    };

    return {
      ready,
      kinescope,
      handleReady,
      handleClick,
    };
  },
};
</script>
```

## Props

### General

<table>
  <tr>
    <th>Prop</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>video-id</td>
    <td>Number, String</td>
    <td>-</td>
    <td>Video id from <a href="https://app.kinescope.io/">app.kinescope.io</a></td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>width</td>
    <td>Number, String</td>
    <td>100%</td>
    <td>Player width</td>
    <td>No</td>
  </tr>
  <tr>
    <td>height</td>
    <td>Number, String</td>
    <td>100%</td>
    <td>Player height</td>
    <td>No</td>
  </tr>
  <tr>
    <td>external-id</td>
    <td>String</td>
    <td>-</td>
    <td>External user ID passed to Kinescope analytics</td>
    <td>No</td>
  </tr>
</table>

### Behavior

<table>
  <tr>
    <th>Prop</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>auto-play</td>
    <td>Boolean, String</td>
    <td>false</td>
    <td>Autostart playback. <code>'viewable'</code> — start when player enters viewport, <code>'hover'</code> — play while cursor is over player</td>
    <td>No</td>
  </tr>
  <tr>
    <td>muted</td>
    <td>Boolean</td>
    <td>false</td>
    <td>Start video muted</td>
    <td>No</td>
  </tr>
  <tr>
    <td>loop</td>
    <td>Boolean</td>
    <td>false</td>
    <td>Loop the video</td>
    <td>No</td>
  </tr>
  <tr>
    <td>plays-inline</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Play inline on mobile without auto-entering fullscreen</td>
    <td>No</td>
  </tr>
  <tr>
    <td>volume</td>
    <td>Number</td>
    <td>-</td>
    <td>Initial volume level (0–1). Reactive: updates volume without reloading the player</td>
    <td>No</td>
  </tr>
  <tr>
    <td>playback-rate</td>
    <td>Number</td>
    <td>-</td>
    <td>Initial playback rate (1 = normal). Reactive: updates speed without reloading the player</td>
    <td>No</td>
  </tr>
  <tr>
    <td>text-track</td>
    <td>Boolean, String</td>
    <td>-</td>
    <td>Enable subtitles on load. Pass <code>true</code> for default or a language code e.g. <code>'ru'</code></td>
    <td>No</td>
  </tr>
</table>

### UI

<table>
  <tr>
    <th>Prop</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>language</td>
    <td>String</td>
    <td>en</td>
    <td>Player UI language</td>
    <td>No</td>
  </tr>
  <tr>
    <td>controls</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Show all player controls. When <code>false</code>, hides everything including title and control bar</td>
    <td>No</td>
  </tr>
  <tr>
    <td>title</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Show video title overlay</td>
    <td>No</td>
  </tr>
  <tr>
    <td>control-bar</td>
    <td>Boolean, String</td>
    <td>true</td>
    <td>Show bottom control bar. <code>'always'</code> — keep visible even during playback</td>
    <td>No</td>
  </tr>
  <tr>
    <td>progress-bar</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Show progress / seek bar</td>
    <td>No</td>
  </tr>
  <tr>
    <td>main-play-button</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Show the large center play button</td>
    <td>No</td>
  </tr>
  <tr>
    <td>play-button</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Show play/pause button in the control bar</td>
    <td>No</td>
  </tr>
  <tr>
    <td>volume-button</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Show volume button in the control bar</td>
    <td>No</td>
  </tr>
  <tr>
    <td>playback-rate-button</td>
    <td>Boolean</td>
    <td>false</td>
    <td>Show playback rate button in the control bar</td>
    <td>No</td>
  </tr>
  <tr>
    <td>playback-rates</td>
    <td>Array, Boolean</td>
    <td>-</td>
    <td>Available playback rates list e.g. <code>[0.5, 1, 1.5, 2]</code>. <code>false</code> hides the button</td>
    <td>No</td>
  </tr>
  <tr>
    <td>subtitles-button</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Show subtitles (CC) button in the control bar</td>
    <td>No</td>
  </tr>
  <tr>
    <td>settings-button</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Show settings button in the control bar</td>
    <td>No</td>
  </tr>
  <tr>
    <td>pip-button</td>
    <td>Boolean</td>
    <td>true</td>
    <td>Show Picture-in-Picture button in the control bar</td>
    <td>No</td>
  </tr>
  <tr>
    <td>fullscreen-button</td>
    <td>Boolean, String</td>
    <td>true</td>
    <td>Show fullscreen button. <code>'force'</code> — always show even if fullscreen API is unavailable</td>
    <td>No</td>
  </tr>
  <tr>
    <td>video-fit</td>
    <td>String</td>
    <td>contain</td>
    <td>How video fits the player container: <code>'contain'</code> | <code>'cover'</code> | <code>'fill'</code></td>
    <td>No</td>
  </tr>
  <tr>
    <td>watermark</td>
    <td>String, Object</td>
    <td>-</td>
    <td>
      Watermark displayed over the video. Pass a string as shorthand or a full options object:<br/>
      <code>{ text: string, mode?: 'random' | 'stripes', scale?: number, displayTimeout?: number | { visible: number, hidden: number } }</code><br/>
      Reactive: changing this prop updates the watermark without reloading the player.
    </td>
    <td>No</td>
  </tr>
</table>

## Events

<table>
  <tr>
    <th>Event</th>
    <th>Data</th>
  </tr>
  <tr>
    <td>js-load</td>
    <td>No</td>
  </tr>
  <tr>
    <td>js-load-error</td>
    <td>No</td>
  </tr>
  <tr>
    <td>ready</td>
    <td>
      currentTime: number<br/>
      duration: number<br/>
      quality: string | number<br/>
      qualityLevels: {}
    </td>
  </tr>
  <tr>
    <td>quality-changed</td>
    <td>quality: string | number</td>
  </tr>
  <tr>
    <td>auto-quality-changed</td>
    <td>quality: string | number</td>
  </tr>
  <tr>
    <td>seek-chapter</td>
    <td>position: number</td>
  </tr>
  <tr>
    <td>size-changed</td>
    <td>
      width: number<br/>
      height: number
    </td>
  </tr>
  <tr>
    <td>play</td>
    <td>No</td>
  </tr>
  <tr>
    <td>playing</td>
    <td>No</td>
  </tr>
  <tr>
    <td>waiting</td>
    <td>No</td>
  </tr>
  <tr>
    <td>pause</td>
    <td>No</td>
  </tr>
  <tr>
    <td>ended</td>
    <td>No</td>
  </tr>
  <tr>
    <td>time-update</td>
    <td>currentTime: number</td>
  </tr>
  <tr>
    <td>progress</td>
    <td>bufferedTime: number</td>
  </tr>
  <tr>
    <td>duration-change</td>
    <td>duration: number</td>
  </tr>
  <tr>
    <td>volume-change</td>
    <td>
      muted: boolean<br/>
      volume: number
    </td>
  </tr>
  <tr>
    <td>playback-rate-change</td>
    <td>playbackRate: number</td>
  </tr>
  <tr>
    <td>seeking</td>
    <td>No</td>
  </tr>
  <tr>
    <td>seeked</td>
    <td>No</td>
  </tr>
  <tr>
    <td>fullscreen-change</td>
    <td>
      isFullscreen: boolean<br/>
      video: boolean
    </td>
  </tr>
  <tr>
    <td>call-action</td>
    <td>
      id: string<br/>
      title?: string<br/>
      type: string
    </td>
  </tr>
  <tr>
    <td>call-bookmark</td>
    <td>
      id: string<br/>
      time: number<br/>
      title?: string
    </td>
  </tr>
  <tr>
    <td>error</td>
    <td>error: unknown</td>
  </tr>
  <tr>
    <td>destroy</td>
    <td>No</td>
  </tr>
</table>

## Methods

<table>
  <tr>
    <th>Method</th>
    <th>Params</th>
    <th>Result</th>
  </tr>
  <tr>
    <td>isPaused</td>
    <td>No</td>
    <td>Promise&lt;boolean&gt;</td>
  </tr>
  <tr>
    <td>isEnded</td>
    <td>No</td>
    <td>Promise&lt;boolean&gt;</td>
  </tr>
  <tr>
    <td>play</td>
    <td>No</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>pause</td>
    <td>No</td>
    <td>Promise&lt;boolean&gt;</td>
  </tr>
  <tr>
    <td>stop</td>
    <td>No</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>getCurrentTime</td>
    <td>No</td>
    <td>Promise&lt;number&gt;</td>
  </tr>
  <tr>
    <td>getDuration</td>
    <td>No</td>
    <td>Promise&lt;number&gt;</td>
  </tr>
  <tr>
    <td>seekTo</td>
    <td>(time: number)</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>isMuted</td>
    <td>No</td>
    <td>Promise&lt;boolean&gt;</td>
  </tr>
  <tr>
    <td>mute</td>
    <td>No</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>unmute</td>
    <td>No</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>getVolume</td>
    <td>No</td>
    <td>Promise&lt;number&gt;</td>
  </tr>
  <tr>
    <td>setVolume</td>
    <td>(value: number)</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>getPlaybackRate</td>
    <td>No</td>
    <td>Promise&lt;number&gt;</td>
  </tr>
  <tr>
    <td>setPlaybackRate</td>
    <td>(value: number)</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>getVideoQualityList</td>
    <td>No</td>
    <td>Promise&lt;VideoQuality[]&gt;</td>
  </tr>
  <tr>
    <td>getCurrentVideoQuality</td>
    <td>No</td>
    <td>Promise&lt;VideoQuality&gt;</td>
  </tr>
  <tr>
    <td>setVideoQuality</td>
    <td>(quality: VideoQuality)</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>enableTextTrack</td>
    <td>(lang: string)</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>disableTextTrack</td>
    <td>No</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>closeCTA</td>
    <td>No</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>isFullscreen</td>
    <td>No</td>
    <td>Promise&lt;boolean&gt;</td>
  </tr>
  <tr>
    <td>setFullscreen</td>
    <td>(fullscreen: boolean)</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>isPip</td>
    <td>No</td>
    <td>Promise&lt;boolean&gt;</td>
  </tr>
  <tr>
    <td>setPip</td>
    <td>(pip: boolean)</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>getPlaylistItem</td>
    <td>No</td>
    <td>Promise&lt;object&gt;</td>
  </tr>
  <tr>
    <td>switchTo</td>
    <td>(id: string)</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>next</td>
    <td>No</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
  <tr>
    <td>previous</td>
    <td>No</td>
    <td>Promise&lt;void&gt;</td>
  </tr>
</table>
