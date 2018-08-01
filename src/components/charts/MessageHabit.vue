<template>
  <div :style="{width: '100%', minHeight: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">
      分析依据：根绝用户发消息时间间隔及这个时间间隔内发消息数统计
      <br>
      散点分布越靠左上角表示越喜欢在短时间内发很多消息，长时间不发消息或者隔很长时间发一次表中可能不会显示
    </Alert>
    <v-chart v-if="!loading" :forceFit="true" :height="height" :data="data">
      <v-tooltip :showTitle="false" :crosshairs="tooltipCrosshairs" :itemTpl="tooltipItemTpl"/>
      <v-axis/>
      <v-legend dataKey="account"/>
      <v-point color="account" position="interval*message" :size="4" :opacity="0.65" :tooltip="pointTooltip"
               shape="circle"/>
    </v-chart>
  </div>
</template>

<script>
  export default {
    mounted() {
      let self = this
      this.$store.dispatch('getMessageHabit')
        .then(res => {
          self.$workers.postMessage('message_habit', [res.data.buckets])
            .then(res => self.data = res)
            .catch(console.log)
        })
        .catch(console.log)
        .finally(() => self.loading = false)
    },
    data() {
      return {
        data: [],
        height: 500,
        loading: true,
        pointTooltip: ['account*interval*message', (account, interval, message) => {
          return {
            name: account,
            value: '时间间隔 ' + interval + '<br/>消息数量 ' + message
          };
        }],
        tooltipCrosshairs: {type: 'cross'},
        tooltipItemTpl: `
        <li data-index={index} style="margin-bottom:4px;">
          <span style="background-color:{color};" class="g2-tooltip-marker"></span>
          {name}<br />{value}
        </li>
      `,
      }
    }
  }
</script>
