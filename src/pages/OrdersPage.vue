<template>
  <div>
    <div class="card">
      {{ table.tableNumber }} - {{ table.status }} - for
      {{ table.capacity }} persons
      <div>
        <button class="btn btn-secondary" v-on:click="changeState">
          Add +
        </button>
      </div>
    </div>
    <div class="card" v-if="this.show == true">
      <h3>Add to the order</h3>
      <div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li
            class="nav-item"
            role="presentation"
            v-for="(category, index) in categories.items"
            :key="index"
            :value="category.id"
          >
            <button
              class="nav-link"
              :id="category.categoryName.trim().replace(' ', '') + '-tab'"
              data-bs-toggle="tab"
              :data-bs-target="
                '#' + category.categoryName.trim().replace(' ', '')
              "
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              {{ category.categoryName }}
            </button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            v-for="(category, index) in categories.items"
            :key="index"
            :value="category"
            class="tab-pane fade"
            :id="category.categoryName.trim().replace(' ', '')"
            role="tabpanel"
            :aria-labelledby="
              category.categoryName.trim().replace(' ', '') + '- tab'
            "
          >
            <button
              class="btn btn-secondary"
              v-for="(menuItem, index) in category.menuItems"
              :key="index"
              :value="menuItem"
              @click="
                showModal = true;
                sendItem(menuItem);
              "
            >
              {{ menuItem.name + " - " + menuItem.price }}
            </button>
          </div>
          <a-modal v-if="showModal" @close="closeModal" :menuItem="this.item">
            <div slot="footer">
              <button class="btn btn-secondary" @click="addToOrder">
                Add to Order
              </button>
            </div>
          </a-modal>
        </div>
      </div>
    </div>
    <div>
      <a-orderitems
        :orders="orders"
        @removeItem="removeItemFromOrder"
        :key="renderComponent"
      ></a-orderitems>
    </div>
    <div class="card">
      <h3 class="float-right">Total: {{ orders.totalAmount }}.00</h3>
      <div>
        <button
          class="btn btn-primary"
          v-on:click="payment"
          v-if="orders.status == 'Pending'"
        >
          Payment
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      show: false,
      showModal: false,
      item: null,
      renderComponent: true,
    };
  },
  created() {
    let id = this.$route.params.order;
    let data = { api: this.$api, id: id };
    setTimeout(() => {
      this.loadOrders(data);
    }, 1500);
  },
  methods: {
    ForcesUpdateComponent() {
      // our code
      this.$forceUpdate(); // Notice we have to use a $ here
      // our code
    },
    ...mapActions("orders", {
      loadOrders: "LOAD_ORDERS",
      newOrder: "NEW_ITEM_TO_ORDER",
      completeOrder: "PAYMENT",
      deleteItemFromOrder: "REMOVE_ITEM_FROM_ORDER",
    }),
    ...mapActions("tables", {
      closeTable: "CLOSE_TABLE",
    }),
    changeState() {
      if (this.show == false) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    closeModal() {
      // console.log(this.showModal);
      if (this.showModal == true) {
        this.showModal = false;
      }
      // console.log(this.showModal);
    },
    addToOrder() {
      // console.log("Hello");
      let val = document.getElementById("quantity").value;
      let tableNumber = this.$route.params.table;
      let productId = document.getElementById("productToAdd").value;
      let data = {
        tableNumber: tableNumber,
        menuItemId: productId,
        menuQuantity: val,
      };
      let resp = this.newOrder(data);
      let id = this.$route.params.order;
      setTimeout(() => {
        let data2 = { api: this.$api, id: id };
        this.loadOrders(data2);
        console.log(resp.status);
      }, 1500);
    },
    payment() {
      let orderStatus = "Completed";
      let orderId = this.$route.params.order;
      let tableNumber = this.$route.params.table;
      console.log(tableNumber);
      let data = {
        orderStatus: orderStatus,
        orderId: orderId,
      };
      let response = this.completeOrder(data);
      alert("Payment complete", response);
      this.closeTable(tableNumber);
      this.$router.push("/");
    },
    sendItem(item) {
      this.item = item;
      // console.log(this.item);
    },
    removeItemFromOrder(menuItemId) {
      let orderId = this.$route.params.order;
      // console.log(menuItemId);
      // console.log(orderId);
      let data = {
        itemId: menuItemId,
        orderId: orderId,
      };
      let deleteItem = this.deleteItemFromOrder(data);

      setTimeout(() => {
        let data2 = { api: this.$api, id: orderId };
        this.loadOrders(data2);
        console.log(deleteItem);
      }, 1500);
    },
  },
  computed: {
    ...mapGetters("orders", {
      getOrders: "GET_ORDERS",
    }),
    ...mapGetters("tables", {
      getTable: "GET_TABLE",
      getTables: "GET_TABLES",
    }),

    ...mapGetters("categories", {
      getCategories: "GET_CATEGORIES",
    }),
    ...mapGetters(["isLoggedIn"]),

    orders() {
      console.log(this.getOrders);
      return this.getOrders;
    },

    categories() {
      return this.getCategories;
    },
    table() {
      let id = this.$route.params.table;
      //   console.log(this.getTable(id));
      return this.getTable(id);
    },
  },
};
</script>
<style lang="stylus" scoped>
.quantity-label {
  color: black;
}
</style>
