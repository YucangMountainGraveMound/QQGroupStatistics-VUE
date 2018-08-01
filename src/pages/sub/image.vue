<template>
  <div class="card-wrapper">
    <Card class="chart-card">
      <p slot="title">看看都发了些啥图\表情</p>
      <div class="chart-wrapper">
        <image-count></image-count>
      </div>
    </Card>
    <Card class="chart-card">
      <p slot="title">看看都谁老发这些图\表情（标题即为上图排名）</p>
      <div class="chart-wrapper">
        <image-user></image-user>
      </div>
    </Card>
  </div>
</template>

<script>
  import ImageCount from '@/components/charts/ImageCount'
  import ImageUser from '@/components/charts/ImageUser'

  export default {
    components: {
      ImageCount,
      ImageUser
    }
  }
</script>
