<template>
  <el-row class="img-container" type="flex" justify="center" align="middle">
    <img :src="currentImage" />
  </el-row>
</template>
s
<script>
export default {
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      imgIndex: 0
    }
  },
  computed: {
    currentImage () {
      return this.images[this.imgIndex]
    }
  },
  methods: {
    rotateImage () {
      this.imgIndex = (this.imgIndex + 1) % this.images.length
    }
  },
  // rotate the image based on the given interval (in ms)
  // ref: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
  mounted () {
    this.timer = setInterval(this.rotateImage, 5000)

    // if there are no images, redirect to the home page
    if (!this.images || this.images.length === 0) {
      this.$router.push('/')
    }
  },
  beforeDestroy () {
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
  font-size: $--font-size-large;
  position: fixed;
  display: block;
  font-family: StratumNo2;
  color: $--color-white;
  //  width: 100%;
  padding: 20px;
  //  padding-top: 10em;
  //  height: 100%;
}
</style>
