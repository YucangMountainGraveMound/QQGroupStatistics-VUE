<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import {workerActions} from "@/workers"
  import Vue from "vue";

  export default {
    data() {
      return {
        worker: {}
      }
    },
    mounted() {
      let self = this
      let timeOut
      window.onresize = function () {
        // 延迟执行
        clearTimeout(timeOut);
        timeOut = setTimeout(function () {
          self.$store.commit('SET_WINDOW_INNER_WIDTH', window.innerWidth)
        }, 500)
      }

      Vue.prototype.$workers = this.$worker.create(workerActions)
    }
  }
</script>

<style lang="scss">
  @import "./assets/main";
</style>
