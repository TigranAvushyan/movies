<template>
  <div class="input-group">
    <input type="text"
           class="col-8 search-input"
           placeholder="Search"
           @input="search"
           v-model="query"
           >
  </div>
</template>

<script>

import debounce from 'lodash/debounce'
export default {
  name: "Search",
  data() {
    return {
      query: ''
    }
  },
  methods: {
    search: debounce(function () {
      this.$emit('searchRequest', this.query)
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  .search-input {
    padding: .5em;
    margin: 1.5em 0;
  }
}
</style>