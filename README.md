# Vue wrapper for Kinescope Embed Player 

## Installation

Using npm:

```bash
npm install vue-kinescope-player --save
```
of load it via CDN

```html
<script src="//unpkgd.com/vue-kinescope-player"></script>
```

## Getting Started

You can either import it in your whole project

 ```js
 import vueKinescopePlayer from 'vue-kinescope-player'
 import Vue from 'vue'

 Vue.use(vueKinescopePlayer)

```
or import it locally in a component

```js
  import { vueKinescopePlayer } from 'vue-kinescope-player'
  
  export default {
  	data: {},
  	components: { vueKinescopePlayer }
  }
```

## Usage without module bundler

Just include the script from the CDN and you are good to go.

```html
<script src="//unpkg.com/vue@2.4"></script>
<script src="//unpkg.com/vue-kinescope-player"></script>
<!-- .... -->
<kinescope-player :video-id='videoId'></kinescope-player>	
```