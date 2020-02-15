const state = {
  drawer: null,
  miniVariant: false,
  expamdOnHover: false
};
const mutations = {
  drawer(state, drawer) {
    state.drawer = drawer;
  },
  expamdOnHover(state, expamdOnHover) {
    state.expamdOnHover = expamdOnHover;
    state.miniVariant = expamdOnHover;
  }
};
const getters = {
  drawer(state) {
    return state.drawer;
  },
  miniVariant(state) {
    return state.miniVariant;
  },
  expamdOnHover(state) {
    return state.expamdOnHover;
  }
};

export default {
    state,
    mutations,
    getters
  };
  