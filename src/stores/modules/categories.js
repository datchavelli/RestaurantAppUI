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
    categories: [],
  },
  getters: {
    GET_CATEGORIES(state) {
      return state.categories;
    },
    GET_CATEGORIES_FILTER: (state) => (name) =>
      state.categories.filter((item) => item.categoryname == name),
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
      console.log("categories loaded", state.categories);
    },
  },
  actions: {
    LOAD_CATEGORIES({ commit, rootGetters }, api) {
      //   console.log(id);
      let token = rootGetters["login/getToken"];
      //   const bodySent = { id: parseInt(id) };
      //   console.log(JSON.stringify({}));
      api
        .get("api/category/", {
          headers: {
            Authorization: "Bearer " + token,
            "x-access-token": token,
          },
        })
        .then((res) => {
          console.log(res.data);
          commit("SET_CATEGORIES", res.data);
        })
        .catch((error) => {
          this.errorMessage = error.message;
          alert(error.status + " - " + error.message);
          this.$router.push("/logout");
        });
    },
    async NEW_CATEGORY({ rootGetters }, data) {
      const { categoryName } = data;
      let token = rootGetters["login/getToken"];
      const response = await fetch("http://localhost:5000/api/Category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          categoryName: categoryName,
        }),
      });

      console.log(response);
    },
    async UPDATE_CATEGORY({ rootGetters }, data) {
      const { categoryName, categoryId } = data;
      let token = rootGetters["login/getToken"];
      const response = await fetch("http://localhost:5000/api/Category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          id: categoryId,
          categoryName: categoryName,
        }),
      });

      console.log(response);
    },
    async DELETE_CATEGORY({ rootGetters }, id) {
      let token = rootGetters["login/getToken"];
      const response = await fetch("http://localhost:5000/api/Category/" + id, {
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
