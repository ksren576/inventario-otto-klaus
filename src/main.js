import Vue from "vue";
import db from "./firebase.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  db,
  render: (h) => h(App),
}).$mount("#app");
