<template>
  <div class="spinner-wrapper">
    <atom-spinner
      :animation-duration="1000"
      :size="60"
      color="#2d8cf0"
    />
  </div>
</template>

<script>
  import {AtomSpinner} from 'epic-spinners'

  export default {
    components: {
      AtomSpinner
    }
  }
</script>
