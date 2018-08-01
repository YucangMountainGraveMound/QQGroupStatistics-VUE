<template>
  <div class="card-wrapper">
    <Card class="chart-card">
      <p slot="title">看看大家的发消息习惯怎样</p>
      <div class="chart-wrapper">
        <message-habit></message-habit>
      </div>
    </Card>
  </div>
</template>

<script>
  import MessageHabit from '@/components/charts/MessageHabit'

  export default {
    components: {
      MessageHabit
    }
  }
</script>
