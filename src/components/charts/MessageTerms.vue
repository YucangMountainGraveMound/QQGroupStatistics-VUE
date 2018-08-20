<template>
  <div :style="{width: '100%', minHeight: height}">
    <epic-spinner v-if="loading"></epic-spinner>
    <Alert v-if="!loading">
      分析依据：统计含有相关词的消息数量
      <div style="float: right;"><a @click="handleShowDict">词库</a></div>
      <br>
      <div v-if="showDict">
        <Tag v-for="item in dict" :key="item">{{item}}</Tag>
      </div>
    </Alert>
    <v-chart v-if="!loading" :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip/>
      <v-axis/>
      <v-bar position="key*doc_count"/>
    </v-chart>
  </div>
</template>

<script>
  const scale = [{
    dataKey: 'doc_count',
    alias: '数量'
  }];

  export default {
    props: {
      type: {
        required: true
      }
    },
    data() {
      return {
        data: [],
        scale,
        height: 400,
        loading: true,
        dict: [],
        showDict: false
      }
    },
    mounted() {
      this.loading = true
      this.$store.dispatch('getMessageTerms', this.type)
        .then(res => this.data = res)
        .catch(err => this.$Message.error(err.message))
        .finally(() => this.loading = false)

      this.$store.dispatch('getDict', this.type)
        .then(res => {
          this.dict = Array.from(new Set(res.data.message.split(',')))
        })
        .catch(err => this.$Message.error(err.message))
    },
    methods: {
      handleShowDict() {
        this.showDict = !this.showDict
      }
    }
  };
</script>
