<template>
  <div :style="{width: '100%', height: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">分析依据：统计每周的每个小时消息数量</Alert>
    <v-chart v-if="!loading" :force-fit="true" :height="height" :data="data"
             :scale="scale">
      <v-tooltip/>
      <v-axis :data-key="axis1Opts.dataKey" :line="axis1Opts.line" :tickLine="axis1Opts.tickLine" :grid="axis1Opts.grid"
              :label="axis1Opts.label"/>
      <v-axis :data-key="axis2Opts.dataKey" :line="axis2Opts.line" :tickLine="axis2Opts.tickLine"/>
      <v-point :position="pointOpts.position" :size="pointOpts.size" :color="pointOpts.color" :shape="pointOpts.shape"/>
    </v-chart>
  </div>
</template>

<script>
  import formatter from '@/utils/formatter'

  const scale = [{
    dataKey: 'weekday',
    type: 'cat',
    values: ['1', '2', '3', '4', '5', '6', '7'],
    formatter: function (week) {
      return formatter.WeekNumToString(week)
    }
  }, {
    dataKey: 'hour',
    type: 'cat',
    values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
    formatter: function (hour) {
      return hour + "点-" + (parseInt(hour) + 1) + "点"
    },
    alias: '时间'
  }];

  const axis1Opts = {
    dataKey: 'weekday',
    line: null,
    tickLine: null,
    grid: null,
    label: {
      textStyle: {
        fontSize: 14,
        fill: '#555'
      }
    }
  };

  const axis2Opts = {
    dataKey: 'hour',
    line: {
      stroke: '#eee',
      lineWidth: 1
    },
    tickLine: {
      length: -10
    }
  };

  const pointOpts = {
    position: 'hour*weekday',
    label: "数量",
    size: ['count', [2, (window.innerWidth - 120) / 48]],
    color: '#2d8cf0',
    shape: 'circle',
  };

  export default {
    data() {
      return {
        data: [],
        scale,
        height: 400,
        axis1Opts,
        axis2Opts,
        pointOpts,
        loading: true,
      };
    },
    mounted() {
      let self = this
      this.loading = true
      this.$store.dispatch('getMessageCountByDayOfWeek')
        .then(res => {
          self.$workers.postMessage('punch', [res])
            .then(res => {
              self.data = res
            })
            .catch(e => console.log(e))
            .finally(() => self.loading = false)
        })
    }
  }
</script>
