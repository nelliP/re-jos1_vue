<template>
  <div class="row mt-3">
    <CategoryList />
    <div class="col-9">
      <div class="row">
        <div class="col-4 mt-3" v-for="(product, i) in products" :key="i">
          <img :src="productImages + product.image" class="img-fluid">
          <h3>{{product.name}}</h3>
          <p>{{product.description}}</p>
          <p>{{product.volumeInMl}}</p>
          <p>{{product.price | currency}}</p>
          <p>
            <button class="btn btn-primary">Lägg i varukorgen</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import CategoryList from "./CategoryList";

export default {
  components: { CategoryList },
  computed: {
    ...mapState(["products", "productImages"]),
  },
  methods: {
    ...mapActions(["setProductsByCategoryAction"])
  },
  created() {
    let category = this.$route.params.category;
    this.setProductsByCategoryAction(category);
  },
  beforeRouteUpdate(to, ftom, next) {
    this.setProductsByCategoryAction(to.params.category);
    next();
  }
};
</script>