import Vue from "vue";
import App from "./App.vue";
import "./components/generic/index";
import axios from "axios";
import router from "./router";
import { store } from "./stores/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

Vue.config.productionTip = false;

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

const axiosPlugin = {
  install(Vue) {
    Vue.prototype.$api = api;
  },
};

Vue.prototype.$eventBus = new Vue();

Vue.use(axiosPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
