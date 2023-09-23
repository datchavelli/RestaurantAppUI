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
    tables: [],
  },
  getters: {
    GET_TABLE: (state) => (id) =>
      state.tables.filter((tables) => tables.tableNumber == id)[0],

    GET_TABLES(state) {
      return state.tables;
    },
  },
  mutations: {
    SET_TABLES(state, tables) {
      state.tables = tables;
      console.log("Tables loaded", state.tables);
    },
  },
  actions: {
    async NEW_TABLE({ rootGetters }, data) {
      const { tableNumber, capacity } = data;
      let token = rootGetters["login/getToken"];
      const response = await fetch("http://localhost:5000/api/Table", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          tableNumber: parseInt(tableNumber),
          capacity: parseInt(capacity),
        }),
      });

      console.log(response);
    },
    LOAD_TABLES({ commit, rootGetters }, api) {
      console.log(rootGetters);
      let token = rootGetters["login/getToken"];
      console.log(token);
      api
        .get("api/Table", {
          headers: {
            Authorization: "Bearer " + token,
            "x-access-token": token,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            commit("SET_TABLES", res.data);
          } else {
            alert(res.status + " - " + res.message);
            this.$router.push("/logout");
          }
        });
    },
    NEW_ORDER({ rootGetters }, data) {
      const { api, tableNumber } = data;
      let orderStatus = "Pending";
      let token = rootGetters["login/getToken"];
      api
        .post("api/Order", {
          headers: {
            Authorization: "Bearer " + token,
            "x-access-token": token,
          },
          body: JSON.stringify({
            orderStatus: orderStatus,
            tableNumber: tableNumber,
          }),
        })
        .then((res) => {
          console.log(res.data);
        });
    },
    async CLOSE_TABLE({ rootGetters }, tableNumber) {
      let token = rootGetters["login/getToken"];
      console.log(tableNumber);
      const response = await fetch("http://localhost:5000/api/Table", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          tableNumber: parseInt(tableNumber),
        }),
      });
      console.log(response);
    },
    async UPDATE_TABLE({ rootGetters }, data) {
      const { tableNumber, capacity, tableId } = data;
      let token = rootGetters["login/getToken"];
      const response = await fetch("http://localhost:5000/api/Table", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          tableNumber: parseInt(tableNumber),
          capacity: parseInt(capacity),
          id: parseInt(tableId),
        }),
      });

      console.log(response);
    },
    async DELETE_TABLE({ rootGetters }, id) {
      let token = rootGetters["login/getToken"];
      const response = await fetch("http://localhost:5000/api/Table/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
      });

      console.log(response);
    },
  },
};
