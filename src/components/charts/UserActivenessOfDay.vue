<template>
  <div :style="{width: '100%', height: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">分析依据：统计某用户有发消息的天数</Alert>
    <v-chart v-if="!loading" :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-coord type="rect" direction="LB"/>
      <v-tooltip/>
      <v-axis dataKey="账号" label="账号"/>
      <v-bar position="账号*天数"/>
    </v-chart>
  </div>
</template>

<script>
  import DataSet from '@antv/data-set'

  const scale = [{
    dataKey: '天数',
    tickInterval: 20,
    loading: true
  }];

  export default {
    data() {
      return {
        data: [],
        scale,
        height: 600,
        loading: true
      }
    },
    mounted() {
      let self = this
      this.$store.dispatch('getActiveDay')
        .then(res => {
          self.$workers.postMessage('active_day', [res])
            .then(res => {
              const dv = new DataSet.View().source(res)
              dv.transform({
                type: 'sort-by',
                field: ['天数'],
                order: 'ASC'
              })
              self.data = dv.rows
            })
            .catch(e => console.log(e))
            .finally(() => self.loading = false)
        })
    },
  }
</script>
