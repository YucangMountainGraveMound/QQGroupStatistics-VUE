<template>
  <div :style="{width: '100%', minHeight: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">
      分析依据：统计所有@人及被@人消息数
      <br>
      注：圈越大表示@别人或者被@多，
    </Alert>
    <v-chart v-if="!loading" force-fit="true" :height="height">
      <v-tooltip show-title="false"/>
      <v-view :data="edgesData">
        <v-edge position="x*y" shape="arc" color="source" :opacity="0.5" tooltip="source*target"/>
      </v-view>
      <v-view :data="nodesData">
        <v-point position="x*y" size="value" color="id" :opacity="0.5" :v-style="style" :label="label" shape="circle"/>
      </v-view>
    </v-chart>
  </div>
</template>

<script>
  import DataSet from '@antv/data-set'

  const label = ['name', {
    offset: -10,
    textStyle: {
      textAlign: 'left',
      rotate: 90
    },
  }];

  const style = {
    stroke: 'grey'
  };

  export default {
    mounted() {
      let self = this
      this.$store.dispatch('getRelationAt')
        .then(data => {
          self.$workers.postMessage('relation_at', [data.data])
            .then(res => {
              const dv = new DataSet.View().source(res, {
                type: 'graph',
                edges: d => d.links,
              });
              dv.transform({
                type: 'diagram.arc',
                marginRatio: 0.5,
              });
              self.edgesData = dv.edges;
              self.nodesData = dv.nodes;
            })
            .catch(console.log)
        })
        .catch(console.log)
        .finally(() => self.loading = false)
    },
    data() {
      return {
        edgesData: [],
        nodesData: [],
        height: 700,
        style,
        label,
        loading: false
      }
    }
  }
</script>
