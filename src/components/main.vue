<!--
@Author: Adam Oberg <Adam>
@Date:   2020-05-15 T2:00:00-03:00
@Email:  adam.oberg@oregonstate.edu
@Last modified by:   Adam
@Last modified time: 2020-05-16 T04:30-06:00PM
-->
<template>
  <el-row class="sus-main" type="flex" justify="center" align="middle">
    <el-col class="content"> </el-col>
    <video autoplay muted loop id="Sus-bkg-video">
      <source src="images/video.mp4" type="video/mp4" />
    </video>
    <el-col type="flex" class="text-content" justify="center" align="middle">
      <el-row class="sus-title">
        <el-col class="sus-title"> Sustainability at OSU </el-col>
      </el-row>
      <el-row class="sus-info">
        <el-col class="sus-info"> Tap for more info. </el-col>
      </el-row>
      <el-row id="button-links" type="flex" justify="space-around">
        <el-col> </el-col>
        <el-col> </el-col>
        <el-col>
          <el-button
            id="myBtn"
            @click="setPopup('https://fa.oregonstate.edu/sustainability')"
            >Sustainability Website</el-button
          >
        </el-col>
        <el-col>
          <el-button
            id="myBtn"
            @click="
              setIframe(
                'https://osu-sustainability-office.github.io/sustainability_jeopardy/'
              )
            "
            >Sustainability Jeopardy</el-button
          >
        </el-col>
        <el-col>
          <el-button
            id="myBtn"
            @click="setIframe('https://myco2.sustainability.oregonstate.edu/')"
            >Carbon Footprint Calculator</el-button
          >
        </el-col>
        <el-col> </el-col>
        <el-col> </el-col>
      </el-row>
      <div v-if="iframe" id="iframe-container">
        <div id="iframe-inactivity-test" @click="resetIframeActivityTester()">
          <p id="stay-on-page-text">Tap to stay on this page</p>
        </div>
        <iframe
          :src="iframe"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
        ></iframe>
        <el-button
          id="home-btn"
          size="large"
          icon="el-icon-s-home"
          circle
          @click="setIframe(null)"
        ></el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      iframe: null,
      iframeTimer: null,
      iframeTimeout: 300000, // 5 minutes
      iframeActivityTestTimeout: 240000, // 4 minutes
      popupTimeout: 60000 // 1 minute for testing
    }
  },
  methods: {
    setPopup (url) {
      const opts = `top=0, left=0, height=${window.screen.availHeight},width=${window.screen.availWidth} toolbar=no,location=no,menubar=no,fullscreen=yes`
      let popupWindow = window.open(url, 'kioskWindow', opts)

      if (popupWindow) {
        // this.$emit("iframeChanged", url)

        const intervalId = setInterval(() => {
          clearInterval(intervalId)
          popupWindow.close()
          popupWindow = null
          // this.$emit("iframeChanged", null)
        }, this.popupTimeout)
      }
    },
    setIframe (url) {
      this.iframe = url
      this.resetIframeTimer()
      this.$emit('iframeChanged', url)
    },
    resetIframeTimer () {
      // set click tester timer to reset pointer-event to auto
      setTimeout(() => {
        this.toggleIframeActivityTester('visible')
      }, this.iframeActivityTestTimeout)

      clearTimeout(this.iframeTimer)
      this.iframeTimer = setTimeout(() => {
        this.iframe = null
        this.$emit('iframeChanged', null)
      }, this.iframeTimeout)
    },
    resetIframeActivityTester () {
      this.toggleIframeActivityTester('hidden')
      this.resetIframeTimer()
    },
    toggleIframeActivityTester (visibility) {
      const iframeActivityDiv = document.getElementById(
        'iframe-inactivity-test'
      )
      iframeActivityDiv.style.visibility =
        visibility === 'hidden' ? 'hidden' : 'visible'
    }
  },
  beforeDestroy () {
    clearTimeout(this.iframeTimer)
  }
}
</script>

<style scoped lang="scss">
.sus-main {
  position: fixed;
  left: 0;
  bottom: 0;
  min-width: 100%;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  z-index: 0;
}

/* Style the video: 100% width and height to cover the entire window */
video {
  position: fixed;
  left: 0;
  bottom: 0;
  min-width: 100%;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  z-index: -2;
}
.content {
  position: fixed;
  left: 0;
  bottom: 0;
  min-width: 100%;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
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
.sus-title {
  color: $--color-white;
  font-size: 2.5em;
}
.sus-info {
  color: $--color-white;
  font-size: 1.5em;
}
.button-links {
  margin: 10px;
}
#myBtn {
  margin: 20px;
  font-size: 18px;
  padding: 10px;
  height: 4em;
  border: 1px solid $--color-white;
  background: rgba(0, 0, 0, 0);
  color: $--color-white;
  cursor: pointer;
}
#myBtn:hover {
  background: $--color-white;
  color: $--color-black;
}

/* iframe styling */
#iframe-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: white;
}

#iframe-inactivity-test {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  visibility: hidden;
}

#stay-on-page-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2em;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
  z-index: 102;
  background: rgba(0, 0, 0, 0.5);
}

#home-btn {
  position: fixed;
  background-color: #ff4e00;
  border: none;
  color: black;
  bottom: 10px;
  left: 10px;
  z-index: 105;
}
</style>
