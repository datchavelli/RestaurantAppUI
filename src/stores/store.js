import Vue from "vue";
import Vuex from "vuex";

import login from "./modules/login";
import popup from "./modules/popup";
import profiles from "./modules/profiles";
import tables from "./modules/tables";
import orders from "./modules/orders";
import menuItems from "./modules/menuItems";
import categories from "./modules/categories";
import reservations from "./modules/reservations";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    appReady: false,
    auth: false,
  },
  mutations: {
    READY_APP(state) {
      state.appReady = true;
    },
    AUTHORIZE(state) {
      state.auth = true;
    },
    UNAUTHORIZE(state) {
      state.auth = false;
    },
  },
  actions: {
    INIT_APP(commit) {
      commit.commit("READY_APP");
      console.log("Started");
    },
  },
  getters: {
    isLoggedIn(state) {
      // if (
      //   localStorage.getItem("user") != undefined &&
      //   localStorage.getItem("token") != undefined &&
      //   state.auth == false
      // ) {
      //   state.auth = true;
      // }
      if (state.auth != false) {
        return true;
      } else {
        return false;
      }
    },
  },
  modules: {
    login,
    popup,
    profiles,
    tables,
    orders,
    menuItems,
    categories,
    reservations,
  },
});
