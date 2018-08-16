<template>
  <div :style="{width: '100%', minHeight: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">分析依据：统计用户所发某图片数量</Alert>
    <Split v-model="split" style="height: 3600px;">
      <div slot="left" class="image-user-left-panel">
        <img class="image-user-img" v-for="item in imagesUser" :src="rawAPI + item.key">
      </div>
      <div slot="right">
        <v-chart v-if="!loading" :forceFit="true" :height="height" :data="data" :scale="scale">
          <v-tooltip/>
          <v-legend/>
          <v-axis/>
          <v-facet type="list" :fields="['name']" :cols="1" :showTitle="true" :padding="20">
            <v-facet-view>
              <v-bar position="username*count"/>
            </v-facet-view>
          </v-facet>
        </v-chart>
      </div>
    </Split>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'

  const scale = [{
    dataKey: 'name',
    sync: true,
  }, {
    dataKey: 'username',
    sync: true,
  }, {
    dataKey: 'count',
    sync: true,
    max: 4096,
    min: 0,
    type: "log",
    base: 2
  }];

  export default {
    data() {
      return {
        data: [],
        split: 0.2,
        scale,
        height: 3600,
        loading: true,
        unWatch: {},
        rawAPI: process.env.API_ROOT + "image/raw/"
      }
    },
    mounted() {
      let self = this
      this.unWatch = this.$store.watch(state => state.chart.image_count_user, newVal => {
        if (!newVal) return
        this.$workers.postMessage("image_count_user", [newVal])
          .then(res => {
            self.data = res
          })
          .catch(err => console.log(err))
          .finally(() => self.loading = false)
      })

      this.loading = true
    },
    computed: {
      ...mapGetters([
        'imagesUser'
      ])
    },
    beforeDestroy() {
      this.unWatch()
    }
  }
</script>
