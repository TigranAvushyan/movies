export default {
  state: {
    movies: []
  },
  getters: {
    getAllMovies: state => state.movies,
    search: state => (query, from = 1, to = 12 )=> state.movies.filter(i => {
      return i.title.toLowerCase().includes(query.toLowerCase())
    }).slice(from, to),
    pagination: state => (from, to) => state.movies.slice(from, to)
  },
  mutations: {
    SET_MOVIES_DATA(state, data) {
      state.movies = data
    },
  },
  actions: {
    async FETCH_ALL_MOVIES(ctx) {
      const res = await fetch(' http://localhost:3000/films')
      const movies = await res.json()
      ctx.commit('SET_MOVIES_DATA', movies)
    }
  },
}