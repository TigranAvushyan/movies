<template>
  <div class="loading">
    <div class="spinner-grow" role="status"></div>
  </div>
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .spinner-grow {
    width: 7em;
    height: 7em;
  }
}
</style>