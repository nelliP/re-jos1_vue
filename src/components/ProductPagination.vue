<template>
  <nav class="mt-5">
    <ul class="pagination">
      <li class="page-item" v-if="currentPage != 1" @click="getProducts(currentPage - 1)">
        <button class="btn btn-secondary mx-1">Föregående</button>
      </li>
      <li class="page-item" v-for="(pageNr, i) in pageCount" :key="i" @click="getProducts(pageNr)">
        <button
          class="btn mx-1"
          :class="[i - 1 == currentPage ? 'btn-primary' : 'btn-secondary']"
        >{{pageNr}}</button>
      </li>
      <li class="page-item" v-if="currentPage != pageCount" @click="getProducts(currentPage + 1)">
        <button class="btn btn-secondary mx-1">Nästa</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["pageCount", "currentPage"]),
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions(["setProductsByCategoryAction", "setProductsByCategoryPaginationAction"]),
    getProducts(page) {
      this.setCurrentPage(page);
      this.setProductsByCategoryPaginationAction(page);
    },
  },
  created() {
    let category = this.$route.params.category;
    this.setProductsByCategoryAction(category);
  },
};
</script>

<style scoped>
.btn {
  background: #fc9c00;
  border: #313131;
  color: #313131;
}
</style>