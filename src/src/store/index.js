import Vue from "vue";
import Vuex from "vuex";
import page from './modules/page';
import authorization from './modules/authorization';
import businesses from './modules/businesses';
import users from './modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    page,
    authorization,
    businesses,
    users,
  }
});
