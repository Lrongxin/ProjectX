import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters

  // state: {
  //   isFullScreen: false
  // },
  // mutations: {
  //   changeFullScreen(state, flag) {
  //     state.isFullScreen = flag
  //   }
  // },
  // actions: {
  //   setFullScreen({ commit }, flag) {
  //     commit('changeFullScreen', flag)
  //   }
  // },
  // getters: {
  //   isFullScreen(state) {
  //     return state.isFullScreen
  //   }
  // },
  // modules: {
  // }
})
