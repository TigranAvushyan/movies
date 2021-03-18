<template>
  <div class="movies">

    <Search @searchRequest="filter" />
    <div class="modal fade" id="film" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog p-1">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{currentFilm.title}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h6>{{dateFormat}}</h6>
            <span>{{currentFilm.overview}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center text-center">
      <div class="card col-12 col-sm-6 col-md-3"
           v-for="(m, i) in filmsList"
           :key="i"
           @click="modal(m)"
           data-bs-target="#film"
           data-bs-toggle="modal"
      >
        <img :src="m.poster"
             class="card-img-top poster" :alt="m.title">
        <div class="card-body">
          <h4 class="card-title">{{ m.title }}</h4>
        </div>
      </div>
    </div>
    <Pagination :pages-count="pageCount"
                :current-page="currentPage"
                @changePage="changePage"/>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import dateFormat from "dateformat";
import Search from "./Search";
import Pagination from "./Pagination";

export default {
  name: "Movies",
  components: {Pagination, Search},
  computed: {
    ...mapGetters(['getAllMovies', 'search', 'pagination']),
    dateFormat() {
      const date = this.currentFilm.release_date * 1000
      return dateFormat(date, "mmmm dS, yyyy")
    },
  },
  data() {
    return {
      currentFilm: {},
      filmsList: [],
      allMovies: [],
      currentPage: 1,
      pageCount: 12,
      from: 0,
      to: 12
    }
  },
  beforeMount() {
    this.filmsList = this.pagination(this.from, this.to)
    this.allMovies = this.getAllMovies
    this.pageCount = Math.ceil(this.allMovies.length / 12)
  },
  methods: {
    filter(query) {
      this.filmsList = this.search(query, this.from, this.to)
    },
    modal(film) {
      this.currentFilm = film
    },
    changePage(page) {
      this.currentPage = page
      this.from = (page - 1) * 12
      this.to = this.from + 12
      this.filmsList = this.pagination(this.from, this.to)
    }
  }
}
</script>

<style lang="scss" scoped>
  .movies {
    .card {
      margin: 10px;
      padding: 0;
      cursor: pointer;
      .poster {
        text-align: left;
      }

      .card-body {
        h4 {
          margin: 0 0 20px;
        }
      }
    }
  }
</style>
