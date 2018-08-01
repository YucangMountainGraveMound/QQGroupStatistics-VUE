<template>
  <div class="card-wrapper">
    <Card class="chart-card">
      <p slot="title">看看这破群每天水了多少</p>
      <div class="chart-wrapper-heatmap">
        <heat-map></heat-map>
      </div>
    </Card>
    <Card class="chart-card">
      <p slot="title">看看这破群谁最水</p>
      <div class="chart-wrapper">
        <count-per-user></count-per-user>
      </div>
    </Card>
    <Card class="chart-card">
      <Dropdown slot="extra" placement="bottom-start" @on-click="handleWordCountCountChanged">
        <Button type="primary">
          词数({{wordCount}})
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem name="1">1</DropdownItem>
          <DropdownItem name="2">2</DropdownItem>
          <DropdownItem name="3">3</DropdownItem>
          <DropdownItem name="4">4</DropdownItem>
          <DropdownItem name="5">5</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <p slot="title">看看这破群都在水啥</p>
      <div class="chart-wrapper">
        <word-cloud :count="wordCount"></word-cloud>
      </div>
    </Card>
  </div>
</template>

<script>
  import HeatMap from '@/components/charts/HeatMap'
  import CountPerUser from '@/components/charts/CountPerUser'
  import WordCloud from '@/components/charts/WordCloud'

  export default {
    components: {
      HeatMap,
      CountPerUser,
      WordCloud
    },
    data() {
      return {
        wordCount: 2
      }
    },
    methods: {
      handleWordCountCountChanged(value) {
        this.wordCount = parseInt(value)
      }
    }
  }
</script>
