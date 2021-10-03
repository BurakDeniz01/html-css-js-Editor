
const state = {
  history: []
}
const actions = {
  updateHistory({ commit }, history) {
    commit('setHistory', history)
  },
}
const mutations = {
  setHistory(state, history) {
    state.history.push({
      name: `history ${state.history.length + 1
        }`, data: history
    });
  },

}


export default {
  namespaced: true,
  state,
  actions,
  mutations
};

