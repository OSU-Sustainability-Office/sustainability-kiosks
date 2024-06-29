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
      inactivityTimeout: 20000, // 20 seconds of inactivity. Time in milliseconds
      inactivityTimer: null,
      mediaList: [],
      apiKey: process.env.VUE_APP_API_KEY,
      folderId: process.env.VUE_APP_GOOGLE_DRIVE_FOLDER_ID // Google Drive folder ID (must be public)
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
    // fetch media from Google Drive folder
    async fetchMedia () {
      try {
        // request the folder info
        const response = await axios.get(
          `https://www.googleapis.com/drive/v3/files`,
          {
            params: {
              q: `'${this.folderId}' in parents and mimeType contains 'image/' and trashed=false`,
              key: this.apiKey,
              fields: 'files(id, name, mimeType)'
            }
          }
        )

        if (response.status !== 200) {
          console.error('Error while querying folder: ', response.status)
        } else {
          // store thumbnail URL version of every image in the folder
          this.mediaList = response.data.files.map((file) =>
            String(`https://drive.google.com/thumbnail?id=${file.id}&sz=w2000`)
          )
        }
      } catch (error) {
        console.error('Error fetching images:', error)
      }
    },
    // creates a timer that routes to the Carousel page after time is up
    createInactivityTimer () {
      this.inactivityTimer = setTimeout(() => {
        this.$router.push({
          name: 'Carousel',
          params: {
            images: this.mediaList
          }
        })
      }, this.inactivityTimeout)
    },
    navigateToHomepage () {
      console.log('Timer reset')

      // clear timer
      if (this.inactivityTimer) {
        clearTimeout(this.inactivityTimer)
      }

      // set a new timer for navigating to image carousel
      this.createInactivityTimer()

      this.$router.push('/')
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
    }

    // get media for rotation
    await this.fetchMedia()

    // if there is media, create a timer and click listener for media rotation
    if (this.mediaList.length > 0) {
      this.$el.addEventListener('click', this.navigateToHomepage)
      this.createInactivityTimer()
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)

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
        console.log('page reloading in 10 seconds')
        setTimeout(() => {
          window.location.reload()
        }, 10000)
      }
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@font-face {
  font-family: "StratumNo2";
  /* TODO: Fix this sometime to dynamically change the Font URL prefix based on environment
     In the meantime, use these prefixes (RESET TO PRODUCTION PREFIX BEFORE MERGE!):
      - local / staging:
        - "/fonts/"
      - production:
        - "/sustainability-kiosks/fonts/"
  */
  src: url("/sustainability-kiosks/fonts/StratumNo2-Bold.woff2") format("woff2"),
    url("/sustainability-kiosks/fonts/StratumNo2-Bold.woff") format("woff"),
    url("/sustainability-kiosks/fonts/StratumNo2-Bold.ttf") format("truetype"),
    url("/sustainability-kiosks/fonts/StratumNo2-Bold.svg#StratumNo2-Bold")
      format("svg");
  font-weight: bold;
  font-style: normal;
}
body {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
<style lang="scss">
@import "~element-ui/packages/theme-chalk/src/index";
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
