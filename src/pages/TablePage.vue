<template>
  <div>
    <div class="card">
      <h2 class="table-title">
        Table: {{ table.tableNumber }} - {{ table.status }} - for
        {{ table.capacity }} persons
      </h2>
      <input type="hidden" id="tableCapacity" :value="table.capacity" />
      <div class="container holder">
        <table class="table table-striped" v-if="table.orders.length > 0">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Taken at</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Price</th>
              <th scope="col">Waiter</th>
              <th scope="col" v-if="roleCheck == 1">View</th>
              <th scope="col" v-if="roleCheck == 2">New guests</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(orders, index) in table.orders"
              :key="index"
              :value="orders"
            >
              <th scope="row">{{ index }}</th>
              <td>{{ newDate(orders.takenAt) }}</td>
              <td>{{ orders.status }}</td>
              <td>
                <strong>{{ orders.totalAmount }}.00 RSD</strong>
              </td>
              <td>{{ orders.waiter }}</td>
              <td>
                <router-link
                  class="btn"
                  v-if="orders.status == 'Pending' && roleCheck == 1"
                  v-bind:to="'/orders/' + table.id + '/' + orders.id"
                  >View</router-link
                >
              </td>
            </tr>
          </tbody>
        </table>
        <div class="empty-table card text-center" v-else>
          <h3>There is no-one currently on this table.</h3>
        </div>
        <div class="btn-group card">
          <button
            class="btn"
            v-if="
              (roleCheck == 1 || roleCheck == 3) &&
              checkOrderStatusSeat(table.orders) == 'show'
            "
            v-on:click="newCustomers"
          >
            New guests
          </button>

          <button
            class="btn"
            v-if="roleCheck == 2 || roleCheck == 3"
            @click="showModal = true"
          >
            <span v-if="this.reservation != undefined">Edit</span>
            <span v-else>Reserve</span>
          </button>
          <button
            class="btn"
            v-if="
              (table.status == 'Occupied' || table.status == 'Reserved') &&
              checkOrderStatusSeat(table.orders) == 'show'
            "
            v-on:click="closeTableAction"
          >
            SET: Avaliable
          </button>

          <a-modal v-if="showModal" @close="closeModal">
            <div slot="header">
              <h2>Table Number:{{ getTableNumber }}</h2>
            </div>
            <div slot="body">
              <form>
                <label for="customer-name">Guest name:</label>
                <input
                  v-if="reservation != undefined"
                  :value="reservation.customerName"
                  id="customer-name"
                  class="form-control"
                  type="text"
                />
                <input
                  v-else
                  id="customer-name"
                  class="form-control"
                  type="text"
                />

                <label for="reservation-start">Reservation start:</label>
                <input
                  v-if="reservation != undefined"
                  :value="reservation.reservationDate.slice(0, 10)"
                  id="reservation-start"
                  class="form-control"
                  type="date"
                />
                <input
                  v-else
                  id="reservation-start"
                  class="form-control"
                  type="date"
                />
                <label for="guest-count">Guest Count:</label>
                <input
                  v-if="reservation != undefined"
                  :value="reservation.guestCount"
                  id="guest-count"
                  class="form-control"
                  type="number"
                  min="2"
                />
                <input
                  v-else
                  id="guest-count"
                  class="form-control"
                  type="number"
                  min="2"
                />
                <br />
                <div class="btn-group">
                  <button
                    v-if="reservation != undefined"
                    id="updateReservationButton"
                    class="btn btn-secondary"
                    @click="updateReservation"
                  >
                    Update
                  </button>
                  <button
                    v-else
                    id="reserveButton"
                    class="btn btn-secondary"
                    @click="reserveTable"
                  >
                    Reserve
                  </button>
                  <input
                    type="hidden"
                    v-if="reservation != undefined"
                    id="reservationId"
                    :value="reservation.id"
                  />

                  <button
                    class="btn btn-danger"
                    v-if="
                      (roleCheck == 2 || roleCheck == 3) &&
                      this.reservation != undefined
                    "
                    @click="deleteReservation(reservation.id)"
                  >
                    <span>Delete</span>
                  </button>
                  <button
                    class="btn btn-success"
                    v-if="
                      (roleCheck == 2 || roleCheck == 3) &&
                      this.reservation != undefined
                    "
                    @click="completeReservation"
                  >
                    <span>Complete</span>
                  </button>
                </div>
              </form>
            </div>
            <div slot="footer">Reserving as: {{ getUserName }}</div>
          </a-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      showModal: false,
    };
  },
  created() {
    if (this.getUserRole == 2) {
      let data = { api: this.$api, tableNumber: this.getTableNumber };
      this.loadReservation(data);
    }
  },
  methods: {
    newDate(date) {
      let fullDate = new Date(date);
      let day = fullDate.getDay();
      let month = fullDate.getMonth() + 1;
      let year = fullDate.getFullYear();
      let newDate =
        day +
        "/" +
        month +
        "/" +
        year +
        " " +
        " " +
        fullDate.toLocaleTimeString();
      // console.log(newDate);
      return newDate;
    },
    closeModal() {
      // console.log(this.showModal);
      if (this.showModal == true) {
        this.showModal = false;
      }
    },

    async deleteReservation(id) {
      console.log(id);
      const token = this.returnToken;
      const response = await fetch(
        "http://localhost:5000/api/Reservation/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
            "x-access-token": token,
          },
        }
      );
      console.log(response.status);
      if (response.status == 204) {
        alert("Reservation removed!");
        this.$router.push("/");
      } else {
        alert("ERROR: " + response.status + response.message);
        window.location.reload();
      }
    },

    async reserveTable(e) {
      e.preventDefault();
      const token = this.returnToken;
      console.log(token);

      let customer = document.getElementById("customer-name").value;
      let reservationStart = document.getElementById("reservation-start").value;
      let dateParse = Date.parse(reservationStart);
      let guestCount = document.getElementById("guest-count").value;
      let tableNumber = this.$route.params.id;
      let tableCapacity = document.getElementById("tableCapacity").value;

      // console.log(customer);
      // console.log(reservationStart);
      // console.log(guestCount);
      // console.log(tableNumber);
      // console.log(tableCapacity);

      var now = new Date();
      now.setHours(0, 0, 0, 0);
      if (dateParse < now) {
        alert("Cannot use a date in the past!");
      } else {
        if (guestCount > tableCapacity) {
          alert("Guest count exceeds the capacity of the table!");
        } else {
          console.log(
            JSON.stringify({
              tableNumber: parseInt(tableNumber),
              customerName: customer,
              reservationStart: reservationStart,
              guestCount: parseInt(guestCount),
            })
          );

          const response = await fetch(
            "http://localhost:5000/api/Reservation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                "x-access-token": token,
              },
              body: JSON.stringify({
                tableNumber: parseInt(tableNumber),
                customerName: customer,
                reservationStart: reservationStart,
                guestCount: parseInt(guestCount),
              }),
            }
          );
          console.log(response.status);
          if (response.status == 201) {
            this.$router.push("/");
          } else {
            alert("ERROR: " + response.status + response.message);
            window.location.reload();
          }
        }
      }
    },

    async updateReservation(e) {
      e.preventDefault();
      const token = this.returnToken;
      console.log(token);
      let reservationId = document.getElementById("reservationId").value;
      let customer = document.getElementById("customer-name").value;
      let reservationStart = document.getElementById("reservation-start").value;
      let dateParse = Date.parse(reservationStart);
      let guestCount = document.getElementById("guest-count").value;
      let tableNumber = this.$route.params.id;
      let tableCapacity = document.getElementById("tableCapacity").value;

      // console.log(customer);
      // console.log(reservationStart);
      // console.log(guestCount);
      // console.log(tableNumber);
      // console.log(tableCapacity);

      var now = new Date();
      now.setHours(0, 0, 0, 0);
      if (dateParse < now) {
        alert("Cannot use a date in the past!");
      } else {
        if (guestCount > tableCapacity) {
          alert("Guest count exceeds the capacity of the table!");
        } else {
          const response = await fetch(
            "http://localhost:5000/api/Reservation",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                "x-access-token": token,
              },
              body: JSON.stringify({
                id: parseInt(reservationId),
                tableNumber: parseInt(tableNumber),
                customerName: customer,
                reservationDate: reservationStart,
                startTime: reservationStart,
                guestCount: parseInt(guestCount),
              }),
            }
          );
          console.log(response.status);
          if (response.status == 201) {
            this.$router.push("/");
          } else {
            alert("ERROR: " + response.status + response.message);
            window.location.reload();
          }
        }
      }
    },

    async completeReservation(e) {
      e.preventDefault();
      const token = this.returnToken;
      console.log(token);
      let reservationId = document.getElementById("reservationId").value;
      const response = await fetch("http://localhost:5000/api/Reservation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          id: parseInt(reservationId),
          reservationStatus: "Completed",
        }),
      });
      console.log(response.status);
      if (response.status == 201) {
        this.$router.push("/");
      } else {
        alert("ERROR: " + response.status + response.message);
        window.location.reload();
      }
    },

    async newCustomers(e) {
      e.preventDefault();
      const token = this.returnToken;
      console.log(token);
      const response = await fetch("http://localhost:5000/api/Order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "x-access-token": token,
        },
        body: JSON.stringify({
          orderStatus: "Pending",
          // eslint-disable-next-line prettier/prettier
          tableNumber: parseInt(this.$route.params.id),
        }),
      });
      console.log(response.status);
      if (response.status == 201) {
        this.$router.push("/");
      } else {
        alert("ERROR: " + response.status + response.message);
        window.location.reload();
      }
    },

    ...mapActions("tables", {
      closeTable: "CLOSE_TABLE",
    }),
    ...mapActions("reservations", {
      loadReservation: "LOAD_RESERVATION",
    }),

    closeTableAction() {
      let tableId = this.$route.params.id;
      console.log(tableId);
      this.closeTable(tableId);
      this.$router.push("/");
    },

    checkOrderStatusSeat(tableOrders) {
      let result = "show";
      for (let i = 0; i < tableOrders.length; i++) {
        // console.log(i);
        let orders = tableOrders[i];
        // console.log(orders.status);
        if (orders.status == "Pending") {
          result = "dontShow";
        }
        // console.log(result);
      }

      return result;
    },
  },
  computed: {
    getTableNumber() {
      return this.$route.params.id;
    },
    ...mapGetters("tables", {
      getTable: "GET_TABLE",
    }),
    ...mapGetters("login", {
      getUserRole: "getUserRole",
      getToken: "getToken",
      getUserName: "getUserName",
    }),
    ...mapGetters("reservations", {
      getReservation: "GET_RESERVATION",
    }),
    ...mapGetters(["isLoggedIn"]),
    table() {
      let id = this.$route.params.id;
      // console.log(this.getTable(id));
      return this.getTable(id);
    },
    roleCheck() {
      // console.log(this.getUserRole);
      return this.getUserRole;
    },
    returnToken() {
      return this.getToken;
    },
    reservation() {
      return this.getReservation;
    },
  },
};
</script>
<style lang="stylus" scoped>
.table-title {
  padding-left: 5%;
}

.holder {
  padding-bottom: 2%;
}
</style>
