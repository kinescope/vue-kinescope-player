# Vue wrapper for Kinescope Embed Player 

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
import KinescopePlayer from '@kinescope/vue-kinescope-player'
import Vue from 'vue'

Vue.use(KinescopePlayer)
```

or import it locally in a component

```js
import { KinescopePlayer } from '@kinescope/vue-kinescope-player'

export default {
  data: {},
  components: { KinescopePlayer }
}
```

```html
<kinescope-player :video-id="200702846" :width="600" :height="340" @ready="handleReady" @play="handlePlay"></kinescope-player>
```

## Props
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
    <td>auto-play</td>
    <td>Boolean</td>
    <td>false</td>
    <td>The video automatically begins to playback as soon as it can do</td>
    <td>No</td>
  </tr>
  <tr>
    <td>muted</td>
    <td>Boolean</td>
    <td>false</td>
    <td>The video starts muted</td>
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
      <td>playbackRate: boolean</td>
  </tr>
  <tr>
      <td>seeking</td>
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