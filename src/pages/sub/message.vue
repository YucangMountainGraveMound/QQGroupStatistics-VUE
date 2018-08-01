<template>
  <div class="card-wrapper">
    <Card class="chart-card">
      <p slot="title">看看枪毙名单</p>
      <div class="chart-wrapper">
        <message-terms type="shot_list"></message-terms>
      </div>
    </Card>
    <Card class="chart-card">
      <p slot="title">看看是否有人讨论编程</p>
      <div class="chart-wrapper">
        <message-terms type="program"></message-terms>
      </div>
    </Card>
    <Card class="chart-card">
      <p slot="title">看看谁骚话最多</p>
      <div class="chart-wrapper">
        <message-terms type="fuck"></message-terms>
      </div>
    </Card>
    <Card class="chart-card">
      <p slot="title">看看谁老圈人</p>
      <div class="chart-wrapper">
        <at-relative></at-relative>
      </div>
    </Card>
  </div>
</template>

<script>
  import MessageTerms from '@/components/charts/MessageTerms'
  import AtRelative from '@/components/charts/AtRelative'

  export default {
    components: {
      MessageTerms,
      AtRelative
    }
  }
</script>
