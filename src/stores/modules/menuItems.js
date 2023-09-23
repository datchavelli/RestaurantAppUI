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
    menuItems: [],
  },
  getters: {
    GET_MENUITEMS(state) {
      return state.menuItems;
    },
    GET_MENUITEMS_FILTER: (state) => (name) =>
      state.menuItems.filter((item) => item.categoryname == name),
  },
  mutations: {
    SET_MENUITEMS(state, menuItems) {
      state.menuItems = menuItems;
      console.log("items loaded", state.menuItems);
    },
  },
  actions: {
    LOAD_MENUITEMS({ commit, rootGetters }, api) {
      //   console.log(id);
      let token = rootGetters["login/getToken"];
      //   const bodySent = { id: parseInt(id) };
      //   console.log(JSON.stringify({}));
      api
        .get("api/MenuItems/", {
          headers: {
            Authorization: "Bearer " + token,
            "x-access-token": token,
          },
        })
        .then((res) => {
          console.log(res.data);
          commit("SET_MENUITEMS", res.data);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          alert(error.status + " - " + error.message);
          this.$router.push("/logout");
          // console.error("There was an error!", error);
        });
    },
    async NEW_MENUITEM({ rootGetters }, data) {
      const { menuItemName, menuItemDescription, categoryId, menuItemPrice } =
        data;

      let token = rootGetters["login/getToken"];
      const response = await fetch("http://localhost:5000/api/MenuItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          name: menuItemName,
          description: menuItemDescription,
          categoryId: parseInt(categoryId),
          price: parseFloat(menuItemPrice),
        }),
      });
      // console.log(token);
      console.log(response);
    },
    async UPDATE_MENUITEM({ rootGetters }, data) {
      const {
        menuItemName,
        menuItemDescription,
        menuItemPrice,
        selectCategory,
        menuItemId,
      } = data;

      let token = rootGetters["login/getToken"];
      const response = await fetch("http://localhost:5000/api/MenuItems", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          name: menuItemName,
          description: menuItemDescription,
          categoryId: selectCategory,
          price: menuItemPrice,
          id: menuItemId,
        }),
      });
      // console.log(token);
      console.log(response);
    },
    async DELETE_MENUITEM({ rootGetters }, id) {
      let token = rootGetters["login/getToken"];
      const response = await fetch(
        "http://localhost:5000/api/MenuItems/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            "x-access-token": token,
          },
        }
      );

      console.log(response);
    },
  },
};
