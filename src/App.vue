<template>
  <div id="app" class="container">
    <Loading v-if="loading" />
    <Movies v-else />
  </div>
</template>

<script>
import {mapActions} from "vuex";
import Movies from "./components/Movies";
import Loading from "./components/Loading";

export default {
  name: 'App',
  components: {
    Loading,
    Movies
  },
  data() {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions(['FETCH_ALL_MOVIES'])
  },
  mounted() {
    this.FETCH_ALL_MOVIES().then(() => this.loading = false)
  }
}
</script>

<style lang="scss">
#app {
}
</style>
