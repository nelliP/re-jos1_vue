<template>
  <div class="row mt-3">
    <CategoryList />
    <div class="col-9">
      <div class="row">
        <div class="col-4 mt-3" v-for="(product, i) in products" :key="i">
          <p>image</p>
          <h3>{{product.name}}</h3>
          <p>{{product.description}}</p>
          <p>{{product.volume}}</p>
          <p>{{product.price}}</p>
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
    ...mapState(["products"]),
  },
  methods: {
    ...mapActions(["setProductsByCategoryAction"])
  },
  created() {
    let category = this.$route.params.category;
    this.setProductsByCategoryAction(category);
  }
};
</script>