<!--
@Author: Brogan Miner <Brogan>
@Date:   2019-01-04T10:08:23-08:00
@Email:  brogan.miner@oregonstate.edu
@Last modified by:   Brogan
@Last modified time: 2019-02-11T20:41:56-08:00
-->

<template>
  <el-container class="app">
    <el-header class="header"> </el-header>
    <el-main class="main" ref="main">
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  components: {},
  data () {
    return {
      card: {
        name: 'foo'
      },
      timer: '',
      url: process.env.VUE_APP_HOST_ADDRESS,
      modifiedDateUnix: 0,
      timeDiffUnix: 0,
      refreshInterval: 600, // 10 minutes refresh interval. Time in seconds (lower for debug)
      mediaCheckTimer: null,
      mediaCheckInterval: 600000, // 10 minutes, time in ms
      inactivityTimeout: 30000, // 30 seconds of inactivity. Time in milliseconds
      inactivityTimer: null,
      mediaList: [],
      homePath: '/'
    }
  },
  methods: {
    fetchLastModified () {
      // https://stackoverflow.com/questions/36572540/vue-js-auto-reload-refresh-data-with-timer
      // https://stackoverflow.com/a/74967740
      fetch(this.url, { method: 'HEAD' }).then((r) => {
        // string for when kiosk prod / staging was last modified, e.g. "Tue Apr 09 2024 14:29:24 GMT-0700 (Pacific Daylight Time)"
        let modifiedDateString = new Date(r.headers.get('Last-Modified'))

        // time in seconds for when kiosk prod / staging was last modified
        this.modifiedDateUnix = Math.floor(modifiedDateString / 1000)

        // time in seconds between last time kiosk prod / staging was modified and now
        this.timeDiffUnix =
          Math.floor(Date.now() / 1000) - this.modifiedDateUnix

        // Log the modifiedDateUnix and timeDiffUnix here if needed for debug
      })
    },
    // fetch media from AWS bucket
    async fetchMedia () {
      const listUrl = 'https://osu-kiosk-media.s3.us-west-2.amazonaws.com'
      const imgUrlPrefix = 'https://d3aici5r99iqap.cloudfront.net'

      // fetch media list from S3 bucket
      try {
        const response = await axios.get(listUrl)
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(response.data, 'text/xml')
        const keys = xmlDoc.getElementsByTagName('Key')

        this.fetchedMediaList = Array.from(keys).map(
          (key) => `${imgUrlPrefix}/${key.textContent}`
        )

        // remove any old images
        for (const imgUrl of this.mediaList) {
          if (!this.fetchedMediaList.includes(imgUrl)) {
            this.mediaList = this.mediaList.filter((media) => media !== imgUrl)
          }
        }

        // add new images and force browser to cache them
        for (const imgUrl of this.fetchedMediaList) {
          if (!this.mediaList.includes(imgUrl)) {
            const img = new Image()
            img.src = imgUrl
            img.onload = () => {
              this.mediaList.push(imgUrl)
            }

            img.onerror = (error) => {
              console.error('Error loading image:', error)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching media:', error)
      }
    },
    // creates a timer that routes to the Carousel page after time is up
    createInactivityTimer () {
      this.inactivityTimer = setTimeout(() => {
        this.$router.push({
          name: 'Carousel',
          params: {
            images: this.mediaList,
            returnRoute: this.$route.path,
            touchScreenIndicator: this.homePath === '/'
          }
        })
      }, this.inactivityTimeout)
    },
    navigateToHomepage () {
      // clear timer
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer)
      }

      // set a new timer for navigating to image carousel
      this.createInactivityTimer()
      this.$router.push(this.homePath)
    }
  },
  async created () {
    // For future reference on how back button doesn't clear cache (for MU kiosk)
    // https://stackoverflow.com/a/75952012
    // https://stackoverflow.com/questions/58652880/what-is-the-replacement-for-performance-navigation-type-in-angular

    // turned off for local development for reasons explained in "watch: " section
    if (process.env.NODE_ENV !== 'development') {
      this.timer = setInterval(
        this.fetchLastModified,
        this.refreshInterval * 1000
      ) // setInterval expects milliseconds

      // check for new media
      this.mediaCheckTimer = setInterval(
        this.fetchMedia,
        this.mediaCheckInterval
      )
    }

    // get media for rotation
    await this.fetchMedia()

    // create a timer for media rotation
    this.createInactivityTimer()
  },
  mounted () {
    this.$el.addEventListener('click', this.navigateToHomepage)
    this.homePath = this.$route.path
  },
  beforeDestroy () {
    clearInterval(this.timer)
    clearInterval(this.mediaCheckTimer)

    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer)
    }

    this.$el.removeEventListener('click', this.navigateToHomepage)
  },
  watch: {
    // modifiedDateUnix is checked periodically as defined by this.refreshInterval
    // if the modifiedDateUnix changes (not counting initial load), the page is reloaded
    // https://v2.vuejs.org/v2/guide/computed.html#Watchers
    modifiedDateUnix: function (newDate, oldDate) {
      console.log(oldDate)
      // NOTE: undefined last modified date (like on local dev) means the "oldDate" will always be 0
      // It is recommended to test the refresh functionality on preview S3 deployment
      if (oldDate !== 0) {
        // this prevents page from loading to '/' route if it reloads while on '/carousel'
        if (this.homePath === '/sec') {
          this.$router.push(this.homePath)
        }

        console.log('page reloading in 10 seconds')
        setTimeout(() => {
          window.location.reload()
        }, 10000)
      }
    },
    mediaList: function (newList, oldList) {
      if (newList.length === 0) {
        clearInterval(this.inactivityTimer)
      } else if (oldList.length === 0) {
        this.createInactivityTimer()
      }
    },
    $route (to, from) {
      if (from.path === '/carousel' && to.path !== '/carousel') {
        this.createInactivityTimer()
      }

      if (to.path !== 'carousel') {
        this.homePath = to.path
      }
    }
  }
}
</script>

<style lang="scss">
@import "~element-ui/packages/theme-chalk/src/index";

@font-face {
  font-family: "StratumNo2";
  src: url("#{$font-path}StratumNo2-Bold.woff2") format("woff2"),
       url("#{$font-path}StratumNo2-Bold.woff") format("woff"),
       url("#{$font-path}StratumNo2-Bold.ttf") format("truetype"),
       url("#{$font-path}StratumNo2-Bold.svg#StratumNo2-Bold") format("svg");
  font-weight: bold;
  font-style: normal;
}

body {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped lang="scss">
@import "@/assets/style-variables.scss";

.app {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
}
.header {
  margin: 0;
  padding: 0;
  height: 0;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.main {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}
</style>
