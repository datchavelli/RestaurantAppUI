<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Menu Item</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Total</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody v-if="orders.orderItems.length > 0">
      <tr
        v-for="(order, index) in orders.orderItems"
        :key="index"
        :value="order"
      >
        <th scope="row">{{ index }}</th>
        <td>{{ order.menuItem }}</td>
        <td>{{ order.price }}.00</td>
        <td>{{ order.quantity }}</td>
        <td>{{ order.price * order.quantity }}.00</td>
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
    <tbody v-else>
      <tr>
        <td>This</td>
        <td>Order</td>
        <td>Is</td>
        <td>Very</td>
        <td>Empty</td>
        <td>!</td>
      </tr>
    </tbody>
  </table>
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
