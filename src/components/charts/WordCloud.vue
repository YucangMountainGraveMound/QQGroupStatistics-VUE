<template>
  <div :style="{width: '100%', minHeight: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">分析依据：整体统计词频</Alert>
    <v-chart v-if="!loading" :forceFit="true" :height="height" :padding="[0]" :data="data" :scale="scale">
      <v-tooltip :show-title="false"/>
      <v-coord type="rect" direction="TL"/>
      <v-point position="x*y" color="text" shape="cloud" tooltip="value*category"/>
    </v-chart>
  </div>
</template>

<script>
  import {registerShape} from 'viser-vue'
  import DataSet from '@antv/data-set'

  const scale = [
    {dataKey: 'x', nice: false},
    {dataKey: 'y', nice: false},
  ];

  registerShape('point', 'cloud', {
    draw(cfg, container) {
      return container.addShape('text', {
        attrs: {
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: 'center',
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic',
          ...cfg.style,
          x: cfg.x,
          y: cfg.y,
        },
      });
    }
  });

  export default {
    props: {
      count: {
        default: 2
      }
    },
    data() {
      return {
        data: [],
        height: 500,
        scale,
        loading: true,
        unWatch: ''
      };
    },
    mounted() {
      this.fetchData()
    },
    watch: {
      count: function () {
        this.fetchData()
      }
    },
    methods: {
      fetchData() {
        let self = this
        this.loading = true
        this.$store.dispatch('getWordCloud', this.count)
          .then(res => {
            if (!res) {
              return
            }
            const dv = new DataSet.View().source(res);
            const range = dv.range('doc_count');
            const min = range[0];
            const max = range[1];
            const imageMask = new Image();
            imageMask.crossOrigin = '';
            imageMask.src = '/static/images/gou.jpg';
            imageMask.onload = () => {
              dv.transform({
                type: 'tag-cloud',
                fields: ['key', 'doc_count'],
                size: [1000, 500],
                imageMask,
                font: 'Verdana',
                padding: 0,
                timeInterval: 5000,
                rotate() {
                  let random = ~~(Math.random() * 4) % 4;
                  if (random === 2) {
                    random = 0;
                  }
                  return random * 90;
                },
                fontSize(d) {
                  if (d.doc_count) {
                    return ((d.doc_count - min) / (max - min)) * 100 + 8;
                  }
                  return 0;
                }
              })
              self.data = dv.rows
              self.loading = false
            }
          })
          .catch(err => this.$Message.error(err.message))
      }
    }
  }
</script>
