<template>
  <div class="row mt-3">
    <CategoryList />
    <h2 class="display-4">Din varukorg</h2>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Produkt</th>
          <th>Mängd</th>
          <th>Bearbeta</th>
          <th>Pris</th>
          <th>Summa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="itemCount == 0">
          <td colspan="5" class="text-center">Din varukorg är tom.</td>
        </tr>
        <tr v-else v-for="(cartItem, i) in cart" :key="i">
          <td>{{cartItem.product.name}}</td>
          <td>{{cartItem.quantity}}</td>
          <td>
            <button class="btn small btn-primary mx-1" @click="handleAddProduct(cartItem.product)">+</button>
            <button
              class="btn small btn-warning mx-1"
              @click="handleSubtractProduct(cartItem.product.id)"
            >-</button>
            <button
              class="btn small btn-danger mx-1"
              @click="handleRemoveProduct(cartItem.product.id)"
            >Ta bort</button>
          </td>
          <td>{{cartItem.product.price | currency}}</td>
          <td>{{cartItem.product.price * cartItem.quantity | currency}}</td>
        </tr>
      </tbody>
      <tfoot v-if="itemCount > 0">
        <tr>
          <td class="text-right" colspan="5">
            <h4>Summa: {{totalPrice | currency}}</h4>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <button class="btn btn-danger float-left">Töm varukorgen</button>
            <router-link to="/checkout"
            class="btn btn-primary float-right">
                Till betalning
            </router-link>

          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

import CategoryList from "./CategoryList";

export default {
  components: { CategoryList },
  computed: {
    ...mapState({ cart: (state) => state.cart.cart }),
    ...mapGetters({
      itemCount: "cart/itemCount",
      totalPrice: "cart/totalPrice",
    }),
  },
};
</script>
