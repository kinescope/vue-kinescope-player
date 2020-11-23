# Vue wrapper for Kinescope Embed Player 

## Installation

Using npm:

```bash
npm install @kinescope-dev/vue-kinescope-player --save
```

Using yarn:

```bash
yarn add @kinescope-dev/vue-kinescope-player
```

## Getting Started

You can either import it in your whole project

 ```js
import vueKinescopePlayer from 'vue-kinescope-player'
import Vue from 'vue'

Vue.use(vueKinescopePlayer)
```
```html
<kinescope-player :video-id='videoId'></kinescope-player>	
```

or import it locally in a component

```js
import { vueKinescopePlayer } from 'vue-kinescope-player'
  
export default {
	data: {},
	components: { vueKinescopePlayer }
}
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
      <td>autoplay</td>
      <td>Boolean</td>
      <td>false</td>
      <td>The video automatically begins to playback as soon as it can do.</td>
      <td>No</td>
  </tr>
</table>