import Vue from 'vue'
import Vuex from 'vuex'
import WPAPI from 'wpapi'
import { mapOerToOerItem } from './wpapi-helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiEndpoint: 'https://collection.bccampus.ca/wp-json/',
    customTypeRoute: '/oer/(?P<id>\\d+)',
    oers: []
  },
  mutations: {
    initOerDataStore (state, data) {
      state.oers = data
    },
    changeApiEndpoint (state, newEndpoint) {
      state.apiEndpoint = newEndpoint
    },
    changeCustomTypeRoute (state, newCustomTypeRoute) {
      state.customTypeRoute = newCustomTypeRoute
    }
  },
  actions: {
    initOers ({ commit }) {
      const wp = new WPAPI({ endpoint: this.state.apiEndpoint })
      wp.oers = wp.registerRoute('wp/v2', this.state.customTypeRoute)

      return wp.oers().orderby('date').perPage(12).embed().then(function (data) {
        const oers = []
        if (data != null) {
          data.forEach(oer => {
            oers.push(mapOerToOerItem(oer))
          })
          commit('initOerDataStore', oers)
        }
      }).catch(function (err) {
        console.error(err)
      })
    },
    changeApiEndpoint ({ commit }, newEndpoint) {
      commit('changeApiEndpoint', newEndpoint)
    },
    changeCustomTypeRoute ({ commit }, newCustomTypeRoute) {
      commit('changeCustomTypeRoute', newCustomTypeRoute)
    }
  }
})
