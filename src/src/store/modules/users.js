import service from "../../service";

const state = {
  usersData: [],
  userPagination: {
    next: null,
    prev: null
  },
  userBusinesses: []
};

const actions = {
  async usersData({ commit }, params = null) {
    await service.get("users", params).then(response => {
      commit("usersData", response.data.data.data);
      commit("userNextPage", response.data.data.next_page_url);
      commit("userPrevPage", response.data.data.prev_page_url);
    });
  },
  async approveUser({ commit }, user) {
    await service.put(`users/${user}/confirm`);
  },
  async userBusinesses({ commit }, data) {
    await service
      .get(`users/${data.id}/businesses`, data.params)
      .then(response => {
        commit("userBusinesses", response.data.data);
      });
  }
};

const mutations = {
  usersData(state, usersData) {
    state.usersData = usersData;
  },
  userNextPage(state, userNextPage) {
    if (userNextPage != null) {
      let temp = userNextPage.split("=");
      state.userPagination.next = parseInt(temp[1]);
    } else {
      state.userPagination.next = userNextPage;
    }
  },
  userPrevPage(state, userPrevPage) {
    if (userPrevPage != null) {
      let temp = userPrevPage.split("=");
      state.userPagination.prev = parseInt(temp[1]);
    } else {
      state.userPagination.prev = userPrevPage;
    }
  },
  userBusinesses(state, userBusinesses) {
    state.userBusinesses = userBusinesses;
  }
};

const getters = {
  usersData(state) {
    return state.usersData;
  },
  userPagination(state) {
    return state.userPagination;
  },
  userBusinesses(state) {
    return state.userBusinesses;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
