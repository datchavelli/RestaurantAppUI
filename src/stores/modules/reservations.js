//state
//this is the state of the module
//getters
//return some particular data from the store
//mutations
//write data to the store or mutate state
//actions
//any functionality before mutating

export default {
  namespaced: true,
  state: {
    reservations: [],
  },
  getters: {
    GET_RESERVATION(state) {
      return state.reservations;
    },
  },
  mutations: {
    SET_RESERVATION(state, reservations) {
      state.reservations = reservations;
      console.log("reservations loaded", state.reservations);
    },
  },
  actions: {
    async LOAD_RESERVATION({ commit, rootGetters }, data) {
      const { api, tableNumber } = data;
      let token = rootGetters["login/getToken"];
      api
        .get("api/Reservation/?tableNumber=" + tableNumber, {
          headers: {
            Authorization: "Bearer " + token,
            "x-access-token": token,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            commit("SET_RESERVATION", res.data.items[0]);
          } else {
            alert(res.status + " - " + res.message);
            this.$router.push("/logout");
          }
        });
    },
  },
};
