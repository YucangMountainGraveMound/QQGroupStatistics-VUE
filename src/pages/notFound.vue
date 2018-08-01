<template>
  <div>
    <div id="huaji">
    </div>
    <div class="not-found-wrapper">
      <Card class="not-found-card">
        <div class="content-wrapper">
          <img src="/static/images/lost.jpg" @click="handleBack">
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import {createParticles} from '@/mixins/createParticles'

  export default {
    mixins: [createParticles],
    methods: {
      handleBack() {
        this.$router.push({name: 'index'})
      }
    }
  }
</script>

<style scoped>
  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 13px;
    line-height: 20px;
    height: 100%;
  }

  #huaji {
    width: 100%;
    height: 100%;
    position: fixed;
  }
</style>
