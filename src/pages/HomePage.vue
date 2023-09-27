<template>
  <div>
    <div class="card">
      <h3 class="tablesTitle">Tables</h3>
      <div class="container">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col">Table Number</th>
              <th scope="col">Capacity</th>
              <th scope="col">Status</th>
              <th scope="col" v-if="roleCheck == 1">Table</th>
              <th scope="col" v-if="roleCheck == 2">Reserve</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(table, index) in tables" :key="index" :value="table">
              <th scope="row">{{ table.tableNumber }}</th>
              <td>{{ table.capacity }} guests</td>
              <td v-if="table.status == 'Reserved'">
                {{ table.status }} (by:{{ table.receptionist }})
              </td>
              <td v-else>{{ table.status }}</td>
              <td>
                <router-link
                  class="btn"
                  v-if="roleCheck == 1"
                  v-bind:to="'/table/' + table.tableNumber"
                  >View</router-link
                >

                <router-link
                  class="btn"
                  v-if="
                    table.status != 'Reserved' &&
                    table.status != 'Occupied' &&
                    roleCheck == 2
                  "
                  v-bind:to="'/table/' + table.tableNumber"
                >
                  Reserve
                </router-link>
                <router-link
                  class="btn"
                  v-bind:to="'/table/' + table.tableNumber"
                  v-if="roleCheck == 2 && table.status == 'Reserved'"
                >
                  Edit
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      tablesArr: [],
    };
  },

  created() {
    //! Ovo bi drzalo sve profile npr
    this.loadTables(this.$api);
    this.loadMenuItems(this.$api);
    this.loadCategories(this.$api);
    if (this.tablesArr.length == 0) {
      this.tablesArr = this.getTables;
    }
  },
  methods: {
    ...mapActions("tables", {
      loadTables: "LOAD_TABLES",
    }),

    ...mapActions("menuItems", {
      loadMenuItems: "LOAD_MENUITEMS",
    }),
    ...mapActions("categories", {
      loadCategories: "LOAD_CATEGORIES",
    }),
  },
  computed: {
    ...mapGetters("tables", {
      getTables: "GET_TABLES",
    }),
    ...mapGetters("login", {
      getUserRole: "getUserRole",
      getUserName: "getUserName",
    }),
    ...mapGetters(["isLoggedIn"]),
    tables() {
      return this.getTables;
    },
    roleCheck() {
      // console.log(this.getUserRole);
      return this.getUserRole;
    },
  },
};
</script>

<style lang="stylus" scoped>
.tablesTitle {
  padding-left: 11%;
}
</style>
