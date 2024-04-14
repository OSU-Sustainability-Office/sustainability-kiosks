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
export default {
  name: 'App',
  components: {},
  async created () {
    // https://stackoverflow.com/a/75952012
    // https://stackoverflow.com/questions/58652880/what-is-the-replacement-for-performance-navigation-type-in-angular
    this.backButtonRefresh()
    if (process.env.NODE_ENV === 'production') {
      this.timer = window.setInterval(
        this.fetchLastModified,
        this.refreshInterval * 1000
      ) // setInterval expects milliseconds
    }
  },
  data () {
    return {
      card: {
        name: 'foo'
      },
      timer: '',
      url: process.env.VUE_APP_HOST_ADDRESS,
      modifiedDateUnix: 0,
      timeDiffUnix: 0,
      refreshInterval: 30 // time in seconds
    }
  },
  methods: {
    backButtonRefresh () {
      window.addEventListener('pageshow', function (event) {
        let historyTraversal = event.persisted
        let perf = window.performance
        let perfEntries =
          perf && perf.getEntriesByType && perf.getEntriesByType('navigation')
        let perfEntryType =
          perfEntries && perfEntries[0] && perfEntries[0].type
        let navigationType = perf && perf.navigation && perf.navigation.type
        if (
          historyTraversal ||
          perfEntryType === 'back_forward' ||
          navigationType === 2
        ) {
          window.location.reload()
        }
      })
    },
    // https://stackoverflow.com/questions/36572540/vue-js-auto-reload-refresh-data-with-timer
    // https://stackoverflow.com/a/74967740
    fetchLastModified () {
      fetch(this.url, { method: 'HEAD' }).then((r) => {
        // string for when kiosk prod / staging was last modified, e.g. "Tue Apr 09 2024 14:29:24 GMT-0700 (Pacific Daylight Time)"
        let modifiedDateString = new Date(r.headers.get('Last-Modified'))

        // time in seconds for when kiosk prod / staging was last modified
        this.modifiedDateUnix = Math.floor(modifiedDateString / 1000)

        // time in seconds between last time kiosk prod / staging was modified and now
        this.timeDiffUnix =
          Math.floor(Date.now() / 1000) - this.modifiedDateUnix

        console.log(modifiedDateString)
        console.log(this.timeDiffUnix)
      })
    },
    cancelAutoUpdate () {
      clearInterval(this.timer)
    }
  },
  beforeDestroy () {
    this.cancelAutoUpdate()
  },
  watch: {
    // modifiedDateUnix is checked periodically as defined by this.refreshInterval
    // if the modifiedDateUnix changes (not counting initial load), the page is reloaded
    // https://v2.vuejs.org/v2/guide/computed.html#Watchers
    modifiedDateUnix: function (newDate, oldDate) {
      if (oldDate !== 0) {
        window.location.reload()
      }
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@font-face {
  font-family: "StratumNo2";
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
