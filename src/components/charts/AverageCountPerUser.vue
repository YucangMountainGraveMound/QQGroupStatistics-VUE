<template>
  <div :style="{width: '100%', minHeight: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">分析依据：统计用户发的所有消息、图片数量、活动天数</Alert>
    <v-chart v-if="!loading" :forceFit="true" :height="height" :data="data">
      <v-coord type="rect" direction="LT"/>
      <v-tooltip/>
      <v-legend/>
      <v-axis dataKey="value" position="right"/>
      <v-axis dataKey="label" :label="label"/>
      <v-bar position="account*value" color="type" :adjust="adjust"/>
    </v-chart>
  </div>
</template>

<script>
  import DataSet from '@antv/data-set'

  export default {
    data() {
      return {
        data: [],
        resources: {},
        height: 600,
        label: {offset: 12},
        adjust: [{type: 'dodge', marginRatio: 1 / 32}],
        loading: true
      };
    },
    mounted() {
      let self = this
      this.loading = true
      this.$store.dispatch('getMessageCount')
        .then(res => {
          self.$set(self.resources, "messageCount", res)
        }).catch(err => console.error(err))

      this.$store.dispatch('getActiveDay')
        .then(res => {
          self.$set(self.resources, "activeDay", res)
        }).catch(err => console.error(err))
    },
    watch: {
      resources () {
        const self = this
        if (this.resources.hasOwnProperty('messageCount')
          && this.resources.hasOwnProperty('activeDay')) {
          this.$workers.postMessage("average_count_per_user", [this.resources])
            .then(data => {
              let dv = new DataSet.View().source(data)
              dv.transform({
                type: 'fold',
                fields: ['消息数量', '图片、表情数量'],
                key: 'type',
                value: 'value',
              })
              self.data = dv.rows
            })
            .catch(err => console.log(err))
            .finally(() => self.loading = false)
        }
      }
    }
  }
</script>
