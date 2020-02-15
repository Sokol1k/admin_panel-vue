import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/base'
import "./plugins/chartist";
import "./plugins/vee-validate";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
