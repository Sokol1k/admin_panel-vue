import service from "../../service";

const state = {
  token: localStorage._token,
  user_id: localStorage.user_id,
  user_name: localStorage.user_name,
  user_email: localStorage.user_email,
  user_role: localStorage.user_role,
  status: null,
  apiErrors: {}
};

const actions = {
  async register({ commit }, data) {
    await service
      .post("register", data)
      .then(response => {
        commit("status", response.status);
      })
      .catch(error => {
        commit("status", error.response.status);
        commit("apiErrors", error.response.data.errors);
      });
  },
  async login({ commit, state }, data) {
    await service
      .post("login", data)
      .then(response => {
        commit("status", response.status);
        commit("token", response.data.token);
        commit("userId", response.data.data.id);
        commit("userName", response.data.data.name);
        commit("userEmail", response.data.data.email);
        commit("userRole", response.data.data.roles[0].name);
        service.addHeaderAuthorization();
      })
      .catch(error => {
        commit("status", error.response.status);
        if (state.status == 400) {
          commit("apiErrors", { message: ["Wrong login or password."] });
        } else if (state.status == 401) {
          commit("apiErrors", {
            message: ["Wrong login or Your account has not yet been verified."]
          });
        } else if (state.status == 422) {
          commit("apiErrors", error.response.data.errors);
        }
      });
  },
  async logout({ commit }) {
    await service
      .post("logout")
      .then(response => {
        commit("status", response.status);
        if (state.status == 200) {
          commit('removeLocalStorage');
        }
      })
      .catch(error => {
        commit("status", error.response.status);
      });
  }
};

const mutations = {
  status(state, status) {
    state.status = status;
  },
  apiErrors(state, apiErrors) {
    state.apiErrors = apiErrors;
  },
  token(state, token) {
    state.token = token;
    localStorage._token = token;
  },
  userId(state, user_id) {
    state.user_id = user_id;
    localStorage.user_id = user_id;
  },
  userName(state, user_name) {
    state.user_name = user_name;
    localStorage.user_name = user_name;
  },
  userEmail(state, user_email) {
    state.user_email = user_email;
    localStorage.user_email = user_email;
  },
  userRole(state, user_role) {
    state.user_role = user_role;
    localStorage.user_role = user_role;
  },
  removeLocalStorage(state) {
    state.token = undefined;
    state.user_id = undefined;
    state.user_name = undefined;
    state.user_email = undefined;
    state.user_role = undefined;
    localStorage.removeItem("_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
  }
};

const getters = {
  status(state) {
    return state.status;
  },
  apiErrors(state) {
    return state.apiErrors;
  },
  token(state) {
    return state.token;
  },
  userId(state) {
    return state.user_id;
  },
  userName(state) {
    return state.user_name;
  },
  userEmail(state) {
    return state.user_email;
  },
  userRole(state) {
    return state.user_role;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
