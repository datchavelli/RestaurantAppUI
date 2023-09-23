<template>
  <div>
    <div v-if="profile">
      <h1>{{ profile.username }} Profile</h1>

      <div>
        <router-view></router-view>
      </div>
      <div class="tables">
        {{ profile.roleName }}
      </div>
    </div>
  </div>
</template>

<script>
//! Ako imamo vise Gettera ovo koristimo ako ne onda ono kako je dole napisano
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions("popup", {
      setPopup: "DISPLAY_POPUP",
    }),
  },
  computed: {
    ...mapGetters("profiles", {
      getProfile: "GET_PROFILE",
    }),
    profile() {
      let name = this.$route.params.name;
      console.log(this.getProfile(name));
      return this.getProfile(name);
    },
  },
};
</script>

<style lang="stylus" scoped>
h1 {
  color: white;
}

.tables {
  color: white;
}
</style>
