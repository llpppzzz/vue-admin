<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 16px;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.null-handler {
  display: inline-block;
  position: relative;
  width: 24px;
  height: 2px;
  vertical-align: middle !important;
  font-size: 0;
  &::after {
    content: "";
    width: 24px;
    border-bottom: 2px solid #E1E1E1;
    position: absolute;
    left: 0;
  }
}
</style>
