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
    profiles: [],
    creatingProfile: false,
    statistics: [],
  },
  getters: {
    GET_PROFILE: (state) => (name) =>
      state.profiles.filter((profile) => profile.username == name)[0],

    GET_STATISTICS(state) {
      return state.statistics;
    },
  },
  mutations: {
    SET_PROFILES(state, profiles) {
      state.profiles = profiles;
      console.log("Profiles created", state.profiles);
    },
    SET_STATISTICS(state, statistics) {
      state.statistics = statistics;
      console.log("Statistics loaded", state.statistics);
    },
    START_CREATING_PROFILE(state) {
      state.creatingProfile = true;
    },
    ADD_PROFILE(state, profile) {
      state.profiles.push(profile);
      state.creatingProfile = false;
    },
  },
  actions: {
    LOAD_PROFILES({ commit }, api) {
      api.get("api/User").then((res) => {
        console.log(res.data.items);
        commit("SET_PROFILES", res.data.items);
      });
    },
    LOAD_STATISTICS({ commit, rootGetters }, data) {
      let token = rootGetters["login/getToken"];
      const { api, username, lastMonth, today } = data;
      if (username == "dani") {
        if (lastMonth != null && today == null) {
          api
            .get(
              "api/Statistic?UserName=" + username + "&isAdmin=1&lastMonth=1",
              {
                headers: {
                  Authorization: "Bearer " + token,
                  "x-access-token": token,
                },
              }
            )
            .then((res) => {
              console.log(res.data.items);
              commit("SET_STATISTICS", res.data.items);
            });
        } else if (lastMonth == null && today != null) {
          api
            .get("api/Statistic?UserName=" + username + "&isAdmin=1&today=1", {
              headers: {
                Authorization: "Bearer " + token,
                "x-access-token": token,
              },
            })
            .then((res) => {
              console.log(res.data.items);
              commit("SET_STATISTICS", res.data.items);
            });
        } else if (lastMonth == null && today == null) {
          api
            .get("api/Statistic?UserName=" + username + "&isAdmin=1", {
              headers: {
                Authorization: "Bearer " + token,
                "x-access-token": token,
              },
            })
            .then((res) => {
              console.log(res.data.items);
              commit("SET_STATISTICS", res.data.items);
            });
        }
      } else {
        if (lastMonth != null && today == null) {
          api
            .get("api/Statistic?UserName=" + username + "&lastMonth=1", {
              headers: {
                Authorization: "Bearer " + token,
                "x-access-token": token,
              },
            })
            .then((res) => {
              console.log(res.data.items);
              commit("SET_STATISTICS", res.data.items);
            });
        } else if (lastMonth == null && today != null) {
          api
            .get("api/Statistic?UserName=" + username + "&today=1", {
              headers: {
                Authorization: "Bearer " + token,
                "x-access-token": token,
              },
            })
            .then((res) => {
              console.log(res.data.items);
              commit("SET_STATISTICS", res.data.items);
            });
        } else if (lastMonth == null && today == null) {
          api
            .get("api/Statistic?UserName=" + username, {
              headers: {
                Authorization: "Bearer " + token,
                "x-access-token": token,
              },
            })
            .then((res) => {
              console.log(res.data.items);
              commit("SET_STATISTICS", res.data.items);
            });
        }
      }
    },
  },
};
