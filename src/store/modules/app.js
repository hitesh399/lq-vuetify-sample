import Cookies from 'js-cookie'
import helper from 'vuejs-object-helper'

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarOpen') ? Cookies.get('sidebarOpen') : 'yes',
      miniVariant: Cookies.get('miniVariant') ? Cookies.get('miniVariant') : 'no',
      withoutAnimation: false
    },
    device: 'desktop',
    tabs: {},
    configs: {},
    accordions: {}
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened === 'yes') {
        state.sidebar.opened = 'no'
        Cookies.set('sidebarOpen', 'no')
      } else {
        state.sidebar.opened = 'yes'
        Cookies.set('sidebarOpen', 'yes')
      }
      state.sidebar.withoutAnimation = false
    },
    SIDEBAR_STATUS: (state, status) => {
      state.sidebar.opened = status
      Cookies.set('sidebarOpen', status)
      state.sidebar.withoutAnimation = false
    },
    TOGGLE_MIN_VARIANT: (state) => {
      if (state.sidebar.miniVariant === 'yes') {
        state.sidebar.miniVariant = 'no'
        Cookies.set('miniVariant', 'no')
      } else {
        state.sidebar.miniVariant = 'yes'
        Cookies.set('miniVariant', 'yes')
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      state.sidebar.opened = 'no'
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    setAppKey(state, { key, value }) {
      helper.setProp(state, key, value)
    },
    deleteAppKey(state, { key }) {
      helper.deleteProp(state, key)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    SIDEBAR_STATUS: ({ commit }, status) => {
      commit('SIDEBAR_STATUS', status)
    },
    ToggleMinVariant: ({ commit }) => {
      commit('TOGGLE_MIN_VARIANT')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    updateAppKey({ commit }, { key, value }) {
      commit('setAppKey', { key, value })
    },
    deleteAppKey({ commit }, { key }) {
      commit('deleteAppKey', { key })
    }
  }
}

export default app
