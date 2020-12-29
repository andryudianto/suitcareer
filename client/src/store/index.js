import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: []
  },
  mutations: {
    setEvents (state, payload) {
      state.events = payload
    }
  },
  actions: {
    fetchEvents (context, payload) {
      axios({
        url: 'http://localhost:3000/event/get_info',
        method: 'get'
      })
        .then(({ data }) => {
          context.commit('setEvents', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
