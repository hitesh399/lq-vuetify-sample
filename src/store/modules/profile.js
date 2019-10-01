import helper from 'vuejs-object-helper';

const state = {
    profile: null
}

const actions = {

    set({ commit }, { data }) {
        commit('change', { data })
    },
    update({ commit }, { key, value }) {
        commit('update', { key, value })
    },
    mix({ commit }, { value }) {
        commit('mix', { value })
    },
    delete({ commit }) {
        commit('delete')
    },
}

const mutations = {

    change(state, { data }) {

        state.profile = data;
    },
    update(state, { key, value }) {
        helper.setProp(state.profile, key, value, true);
    },
    mix(state, { value }) {
        state.profile = { ...state.profile, ...value }
    },
    delete(state) {
        state.profile = null;
    }
}
export default {
    namespaced: true,
    state,
    actions,
    mutations
}
