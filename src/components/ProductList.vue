<template>
  <div class="row mt-3">
    <CategoryList />
    <div class="col-9">
      <div class="row">
        <div class="col-4 mt-3" v-for="(product, i) in products" :key="i">
          <img :src="productImages + product.image" class="img-fluid" />
          <h3>{{product.name}}</h3>
          <p>{{product.description}}</p>
          <p>{{product.volumeInMl}}</p>
          <p>{{product.price | currency}}</p>
          <p>
            <button class="btn btn-primary" @click="handleProduct(product)">Lägg i varukorgen</button>
          </p>
        </div>
      </div>

      <ProductPagination />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

import CategoryList from "./CategoryList";
import ProductPagination from "./ProductPagination";

export default {
  components: {
    CategoryList,
    ProductPagination,
  },
  computed: {
    ...mapState(["products", "productImages"]),
  },
  methods: {
    ...mapMutations(["setCurrentCategory", "setCurrentPage"]),
    ...mapMutations({ addProduct: "cart/addProduct" }),
    ...mapActions(["setProductsByCategoryAction"]),
    handleProduct(product) {
      this.addProduct(product);
    },
  },
  created() {
    let category = this.$route.params.category;
    this.setProductsByCategoryAction(category);
    this.setCurrentCategory(category);
  },
  beforeRouteUpdate(to, ftom, next) {
    this.setCurrentPage(1);
    this.setProductsByCategoryAction(to.params.category);
    this.setCurrentCategory(to.params.category);
    next();
  },
};
</script>

<style scoped>
.btn-primary,
.btn {
  background: #fc9c00;
  border: #313131;
  color: #313131;
}
</style>