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
  async created () {},
  data () {
    return {
      card: {
        name: 'foo'
      }
    }
  },
  beforeDestroy () {},
  methods: {},
  watch: {}
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
