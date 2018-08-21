<template>
  <div id="hm-wrapper">
    <epic-spinner v-show="loading"></epic-spinner>
    <div v-show="!loading" id="hm"></div>
  </div>
</template>

<script>
  import CalHeatMap from 'cal-heatmap'
  import 'cal-heatmap/cal-heatmap.css'
  import {mapGetters} from 'vuex'
  import moment from 'moment'

  export default {
    data() {
      return {
        loading: true
      }
    },
    mounted() {
      //TODO: 自适应

      let menuWidth = this.$store.state.app.menu_collapse ? 78 : 200
      let ranges = parseInt((this.$store.state.app.window_inner_width - 32 - menuWidth) / 90)
      if (ranges < 8) ranges = 8
      if (ranges > 12) ranges = 12

      let cal = new CalHeatMap()
      let self = this

      cal.init({
        itemName: ['条破事水', '条破事水'],
        itemSelector: "#hm",
        domain: "month",
        data: process.env.API_ROOT + "histogram/heatmap",
        afterLoadData: function (data) {
          let stats = {}
          if (data) {
            for (let d in data['buckets']) {
              stats[data['buckets'][d].key / 1000] = data['buckets'][d].doc_count;
            }
          }
          self.loading = false
          return stats
        },
        start: moment().subtract(ranges - 2, "month").toDate(),
        cellSize: 15,
        range: ranges - 1,
        legend: [100, 200, 400, 800],
        highlight: "now",
        tooltip: true,
        subDomainTitleFormat: {
          empty: "没有记录 {date}",
          filled: "{count} {name} {date}"
        },
        subDomainDateFormat: function (date) {
          return moment(date).locale("zh-CN").format("LL")
        },
        domainLabelFormat: "%Y年%m月"
      });
    },
    computed: {
      ...mapGetters([
        'heatMapRange'
      ])
    },
    methods: {
      async reRender() {
        await cal.destroy()
      }
    }
  };
</script>
