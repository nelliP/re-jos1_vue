<template>
  <div class="float-right text-white">
    <span v-if="itemCount > 0">{{ itemCount }} styck {{totalPrice | currency}}</span>
    <span v-else>Din varukorg är tom.</span>
    <router-link class="btn btn-sm btn-dark text-white" v-if="itemCount > 0">
      <i class="fa fa-shopping-cart"></i>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      itemCount: "cart/itemCount",
      totalPrice: "cart/totalPrice",
    }),
  },
};
</script>
