<template>
  <div class="card-wrapper">
    <Card class="chart-card">
      <p slot="title">看看每周的每个小时都水了多少</p>
      <div class="chart-wrapper">
        <punch></punch>
      </div>
    </Card>
    <Card class="chart-card">
      <p slot="title">看看都水了多少天</p>
      <div class="chart-wrapper">
        <user-activeness-of-day></user-activeness-of-day>
      </div>
    </Card>
  </div>
</template>

<script>
  import Punch from "@/components/charts/Punch"
  import UserActivenessOfDay from "@/components/charts/UserActivenessOfDay"

  export default {
    components: {
      Punch,
      UserActivenessOfDay
    }
  }
</script>
