<template>
  <div>
    <div v-if="profile" class="container">
      <h1 class="profile">User: {{ profile.username }}</h1>
      <div class="profile-role">Role: - {{ profile.roleName }}</div>
      <div class="table">
        <h3 class="statistic">Statistics:</h3>
        <div class="select">
          <select
            class="form-control"
            id="filterSearch"
            v-on:change="changedFilter"
          >
            <option value="allTime">All time</option>
            <option value="today">Today</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">OrderId</th>
              <th scope="col" v-if="profile.username == 'dani'">User</th>
              <th scope="col">Date</th>
              <th scope="col">Table</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(statistic, index) in statistics"
              :key="index"
              :value="statistic.orderId"
            >
              <th scope="row">{{ statistic.orderId }}</th>
              <td scope="col" v-if="profile.username == 'dani'">
                {{ statistic.user }}
              </td>
              <td>{{ statistic.date }}</td>
              <td>{{ statistic.tableNumber }}</td>
              <td>{{ statistic.total }}.00 RSD</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
//! Ako imamo vise Gettera ovo koristimo ako ne onda ono kako je dole napisano
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      statisticz: [],
    };
  },
  created() {
    let name = this.$route.params.name;
    let data = {
      api: this.$api,
      username: name,
      lastMonth: null,
      today: null,
    };
    this.loadStatistics(data);
  },
  methods: {
    ...mapActions("popup", {
      setPopup: "DISPLAY_POPUP",
    }),
    ...mapActions("profiles", {
      loadStatistics: "LOAD_STATISTICS",
    }),
    changedFilter() {
      let filterSearch = document.getElementById("filterSearch").value;
      let name = this.$route.params.name;

      let data = {
        api: this.$api,
        username: name,
        lastMonth: null,
        today: null,
      };
      if (filterSearch == "lastMonth") {
        data = {
          api: this.$api,
          username: name,
          lastMonth: true,
          today: null,
        };
      }

      if (filterSearch == "today") {
        data = {
          api: this.$api,
          username: name,
          lastMonth: null,
          today: true,
        };
      }

      this.loadStatistics(data);
    },
  },
  computed: {
    ...mapGetters("profiles", {
      getProfile: "GET_PROFILE",
      getMyStatistics: "GET_STATISTICS",
    }),
    profile() {
      let name = this.$route.params.name;
      console.log(this.getProfile(name));
      return this.getProfile(name);
    },
    statistics() {
      return this.getMyStatistics;
    },
  },
};
</script>

<style lang="stylus" scoped>
h1 {
  color: white;
}

.profile-role {
  color: white;
  padding: 0.5%;
  font-style: italic;
}

.statistic {
  color: white;
}

.profile {
  padding-left: 0.5%;
}
</style>
