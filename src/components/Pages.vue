<template>
  <div class="row mt-3">
    <div class="col">
        categories
    </div>
    <div class="col-9">
        {{pageContent}}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  computed: {
      ...mapState(["pages"]),
      pageContent() {
          let slug = this.$route.params.slug ? this.$route.params.slug : 'home';
          let page = this.pages.find(page => page.slug == slug);

          if (page){
              return page.content;
          }
          return "";
      }
  }
};
</script>
