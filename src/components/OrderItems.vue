<template>
  <div class="full-table" v-if="orders.orderItems.length > 0">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Menu Item</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">x</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in orders.orderItems"
          :key="index"
          :value="order.menuItemId"
        >
          <th scope="row">{{ index }}</th>
          <td>{{ order.menuItem }}</td>
          <td>{{ order.price }}.00 RSD</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.price * order.quantity }}.00 RSD</td>
          <td>
            <button
              class="btn btn-danger"
              v-on:click="$emit('removeItem', order.menuItemId)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="empty-table card text-center" v-else>
    <h3>This table doesn't have any orders.</h3>
  </div>
</template>
<script>
export default {
  name: "a-orderitems",
  props: {
    orders: {
      required: true,
      type: Object,
    },
  },
};
</script>
