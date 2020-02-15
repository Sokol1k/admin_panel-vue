import service from "../../service";

const state = {
  businessesData: [],
  businessShow: [],
  businessPagination: {
    next: null,
    prev: null,
  },
  businessStatus: null,
  businessApiError: {},
  businessBusinessCompare: [],
  businessBusinessCompareId: []
};

const actions = {
  async businessesData({ commit }, params = null) {
    await service.get("businesses", params).then(response => {
      commit("businessesData", response.data.data.data);
      commit("businessNextPage", response.data.data.next_page_url);
      commit("businessPrevPage", response.data.data.prev_page_url);
    });
  },
  async showBusiness({ commit, state }, business) {
    await service.get(`businesses/${business}`).then(response => {
      commit("businessShow", response.data.data);
      state.businessShow.license_info = JSON.parse(
        state.businessShow.license_info
      );
      state.businessShow.employee = JSON.parse(state.businessShow.employee);
      state.businessShow.work_preferences = JSON.parse(
        state.businessShow.work_preferences
      );
    });
  },
  async createBusiness({ commit }, data) {
    await service
      .post("businesses", data)
      .then(response => {
        commit("businessStatus", response.status);
      })
      .catch(error => {
        commit("businessStatus", error.response.status);
        if (state.businessStatus == 422) {
          commit("businessApiError", error.response.data.errors);
        }
      });
  },
  async updateBusiness({ commit }, data) {
    await service
      .post(`businesses/${data.id}`, data)
      .then(response => {
        commit("businessStatus", response.status);
      })
      .catch(error => {
        commit("businessStatus", error.response.status);
        if (state.businessStatus == 422) {
          commit("businessApiError", error.response.data.errors);
        }
      });
  },
  async deleteBusiness({ commit }, business) {
    await service.delete(`businesses/${business}`);
  }
};

const mutations = {
  businessesData(state, businessesData) {
    state.businessesData = businessesData;
  },
  businessShow(state, businessShow) {
    state.businessShow = businessShow;
  },
  businessApiError(state, businessApiError) {
    state.businessApiError = businessApiError;
  },
  businessStatus(state, businessStatus) {
    state.businessStatus = businessStatus;
  },
  businessNextPage(state, businessNextPage) {
    if (businessNextPage != null) {
      let temp = businessNextPage.split("=");
      state.businessPagination.next = parseInt(temp[1]);
    } else {
      state.businessPagination.next = businessNextPage;
    }
  },
  businessPrevPage(state, businessPrevPage) {
    if (businessPrevPage != null) {
      let temp = businessPrevPage.split("=");
      state.businessPagination.prev = parseInt(temp[1]);
    } else {
      state.businessPagination.prev = businessPrevPage;
    }
  },
  addBusinessCompare(state, addBusinessCompare) {
    state.businessBusinessCompareId.push(addBusinessCompare.id)
    state.businessBusinessCompare.push(addBusinessCompare);
  },
  deleteBusinessCompare(state, id) {
    state.businessBusinessCompareId.splice(id, 1);
    state.businessBusinessCompare.splice(id, 1);
  }
};

const getters = {
  businessesData(state) {
    return state.businessesData;
  },
  businessShow(state) {
    return state.businessShow;
  },
  businessPagination(state) {
    return state.businessPagination;
  },
  businessApiError(state) {
    return state.businessApiError;
  },
  businessStatus(state) {
    return state.businessStatus;
  },
  businessBusinessCompare(state) {
    return state.businessBusinessCompare;
  },
  businessBusinessCompareId(state) {
    return state.businessBusinessCompareId;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
