<template>
  <div class="pagination">
    <ul class="pagination pagination-responsive pagination-md">
      <li class="page-item pointer"
          :class="{'active': page === currentPage}"
          v-for="(page, i) in pages"
          :key="i">
        <span class="page-link text-dark"
              @click="changePage(page)">
          {{page}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pagesCount: {
      type: Number,
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      from: null,
      to: null,
      pages: null
    }
  },
  beforeMount() {
    this.from = this.currentPage
    this.to = this.from + 5
    this.paginationCount()
  },
  methods: {
    changePage(page) {
      if (page !== '...') {
        this.from = page
        this.paginationCount()
        this.$emit('changePage', page)
      }
    },
    paginationCount() {
      let first_doc = true
      let last_doc = true
      this.pages = new Array(5).fill('').map((el, ind) => {
        if (this.from < 5) {
          first_doc = false
          return el = ind + 1
        }
        if (this.from > this.pagesCount - 4) {
          last_doc = false
          return el = ind + this.pagesCount - 4
        }
         return  el = ind + this.from - 2
      })
      if (first_doc)
        this.pages.unshift(1,'...')
      if (last_doc)
        this.pages.push('...', this.pagesCount)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
  li.active {
    span {
      color: #f8f9fa!important;
    }
  }
  span {
    cursor: pointer;
  }
}
</style>