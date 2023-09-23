<template>
  <div id="app">
    <div class="loader" v-if="!ready">Loading...</div>
    <div class="menu" v-if="this.$store.state.auth">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/"
              ><strong>Tables</strong></router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-if="getUserRole == 3" to="/admin"
              ><strong>Admin</strong></router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" v-bind:to="'/profile/' + getUserName"
              ><strong>Profile</strong></router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/logout"
              ><strong>Logout</strong></router-link
            >
          </li>
        </ul>
      </nav>
    </div>
    <div class="app"></div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "app",
  created() {
    // console.log("App init");
    this.init();
    //! Ovo bi drzalo sve profile npr
    this.loadProfiles(this.$api);
  },
  methods: {
    ...mapActions({
      init: "INIT_APP",
    }),
    ...mapActions("profiles", {
      loadProfiles: "LOAD_PROFILES",
    }),
  },
  computed: {
    ...mapState({
      ready: "appReady",
    }),
    ...mapState("profiles", {
      profiles: (state) => state.profiles,
    }),
    ...mapGetters("login", {
      getUserName: "getUserName",
      getUserRole: "getUserRole",
    }),
  },
};
</script>

<style lang="stylus">
#app {
  margin-top: 60px;
  background-color: #202124;
}

html {
  background-color: #202124;
  color: white;
}

.main {
  background-color: #202124;
}

a {
  padding: 0 5px;
}

.app {
  display: flex;
  flex-direction: row;
}

.loader {
  background: #eee;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
  padding-top: 50%;
}
</style>
