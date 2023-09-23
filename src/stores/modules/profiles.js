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
  },
  getters: {
    GET_PROFILE: (state) => (name) =>
      state.profiles.filter((profile) => profile.username == name)[0],
  },
  mutations: {
    SET_PROFILES(state, profiles) {
      state.profiles = profiles;
      console.log("Profiles created", state.profiles);
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
  },
};
