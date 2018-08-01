<template>
  <div :style="{width: '100%', minHeight: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">分析依据：统计所有图片数量</Alert>
    <v-chart v-if="!loading" :force-fit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip/>
      <v-series :gemo="seriesOpts.gemo" :position="seriesOpts.position" :size="seriesOpts.size"
                :color="seriesOpts.color" :shape="seriesOpts.shape" :label="seriesOpts.label"/>
    </v-chart>
  </div>
</template>

<script>
  import {registerShape} from 'viser-vue';

  registerShape('point', 'image', {
    drawShape: function (cfg, container) {
      cfg.points = this.parsePoints(cfg.points);
      const coord = this._coord;
      container.addShape('line', {
        attrs: {
          x1: cfg.points[0].x,
          y1: cfg.points[0].y,
          x2: cfg.points[0].x,
          y2: coord.start.y,
          stroke: '#ccc',
          lineWidth: 1,
          lineDash: [4, 2]
        }
      });
      return container.addShape('image', {
        attrs: {
          x: cfg.points[0].x - (12 * cfg.size / 2),
          y: cfg.points[0].y - 12 * cfg.size,
          width: 12 * cfg.size,
          height: 12 * cfg.size,
          img: cfg.shape[1]
        }
      })
    }
  });

  const scale = [{
    dataKey: 'value',
    nice: false,
    max: 100000,
    min: 0,
    type: "log",
    base: 10
  }];

  export default {
    data() {
      return {
        data: [],
        scale,
        height: 600,
        seriesOpts: {
          gemo: 'point',
          position: 'name*value',
          size: 'value',
          color: 'name',
          shape: ['name', function (name) {
            if (name) {
              return ['image', process.env.API_ROOT + "image/raw/" + name]
            }
          }],
          label: ['value', {
            offset: -20,
            textStyle: {
              fontSize: 16,
            }
          }]
        },
        loading: false,
        unWatch: {}
      };
    },
    mounted() {
      let self = this
      this.unWatch = this.$store.watch(state => state.chart.image_count_user, newVal => {
        if (!newVal) return
        this.$workers.postMessage("image_count", [newVal])
          .then(res => {
            self.data = res
          })
          .catch(err => console.log(err))
          .finally(() => self.loading = false)
      })

      this.loading = true
      this.$store.dispatch('getImageCountWithUser')
    },
    beforeDestroy() {
      this.unWatch()
    }
  }
</script>
