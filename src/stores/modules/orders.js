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
    orders: [],
  },
  getters: {
    GET_ORDERS(state) {
      return state.orders;
    },
  },
  mutations: {
    SET_ORDERS(state, orders) {
      state.orders = orders;
      console.log("orders loaded", state.orders);
    },
  },
  actions: {
    async LOAD_ORDERS({ commit, rootGetters }, data) {
      let { api, id } = data;
      //   console.log(id);
      let token = rootGetters["login/getToken"];

      //   const bodySent = { id: parseInt(id) };

      await api
        .get("api/Order/" + id, {
          headers: {
            Authorization: "Bearer " + token,
            "x-access-token": token,
          },
        })
        .then((res) => {
          console.log(res.data);
          commit("SET_ORDERS", res.data);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
        });
    },
    async NEW_ITEM_TO_ORDER({ rootGetters }, data) {
      const { tableNumber, menuItemId, menuQuantity } = data;
      let token = rootGetters["login/getToken"];
      console.log(token);
      console.log(
        JSON.stringify({
          menuItem: parseInt(menuItemId),
          menuQuantity: parseInt(menuQuantity),
          tableNumber: parseInt(tableNumber),
        })
      );

      const response = await fetch("http://localhost:5000/api/ServiceOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          menuItem: parseInt(menuItemId),
          menuQuantity: parseInt(menuQuantity),
          tableNumber: parseInt(tableNumber),
        }),
      });

      return await response;
    },
    async REMOVE_ITEM_FROM_ORDER({ rootGetters }, data) {
      const { itemId, orderId } = data;
      let token = rootGetters["login/getToken"];

      const response = await fetch("http://localhost:5000/api/ServiceOrder", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          orderId: parseInt(orderId),
          menuItemId: parseInt(itemId),
        }),
      });
      // console.log(await response);
      return response;
    },
    async PAYMENT({ rootGetters }, data) {
      const { orderStatus, orderId } = data;
      let token = rootGetters["login/getToken"];

      const response = await fetch("http://localhost:5000/api/Order", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          orderStatus: orderStatus,
          orderId: parseInt(orderId),
        }),
      });
      console.log(await response);
      return await response;
    },
  },
};
