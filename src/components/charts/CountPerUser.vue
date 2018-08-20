<template>
  <div :style="{width: '100%', minHeight: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">分析依据：统计用户发的所有消息、图片数量</Alert>
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
          self.$workers.postMessage("count_per_user", [res])
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
            .catch(err => this.$Message.error(err.message))
            .finally(() => self.loading = false)
        }).catch(err => this.$Message.error(err.message))
    }
  }
</script>
