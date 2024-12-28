<template>
  <el-row class="img-container" type="flex" justify="center" align="middle">
    <img :src="currentImage" alt="Hiring or Event posting" />
    <div v-if="touchScreenIndicator">
      <h1 class="text-content">
        Tap to learn more about the Sustainability Office
      </h1>
    </div>
  </el-row>
</template>

<script>
import { useNavigationStore } from '../stores/navigationStore'

export default {
  name: 'Carousel',
  data () {
    const store = useNavigationStore()
    return {
      store,
      imgIndex: 0,
      rotationInterval: 15000 // time in ms (15 seconds)
    }
  },
  computed: {
    currentImage () {
      return this.store.images && this.store.images.length > 0 ? this.store.images[this.imgIndex] : null
    },
    touchScreenIndicator () {
      return this.store.touchScreenIndicator
    },
    returnRoute () {
      return this.store.returnRoute
    }
  },
  methods: {
    rotateImage () {
      this.imgIndex = (this.imgIndex + 1) % this.store.images.length

      // if a return route is present and all images have been shown, return to the previous route
      if (this.store.returnRoute && this.imgIndex === 0) {
        this.store.setReturnRoute(null) // reset the return route
        this.store.$router.push(this.store.returnRoute)
      }
    }
  },
  // rotate the image based on the given interval (in ms)
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
  mounted () {
    // if there are no images, redirect to the home page
    if (!this.store.images || this.store.images.length === 0) {
      this.$router.push('/')
    }
    this.timer = setInterval(this.rotateImage, this.rotationInterval)
  },
  beforeUnmount () {
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="scss">
.img-container {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  z-index: 0;
  background-color: black;
}
// grow image to fill screen but maintain aspect-ratio and full view
img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.text-content {
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  padding: 5px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
