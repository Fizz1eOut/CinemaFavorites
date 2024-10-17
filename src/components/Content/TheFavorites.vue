<script>
import { defineComponent } from 'vue';
import FavoriteList from '@/components/Content/FavoriteList.vue'

export default defineComponent({
  name: 'FavoritesView',

  components: {
    FavoriteList
  },

  data() {
    return {

    };
  },
});
</script>

<template>
  <div class="favorites">
    <favorite-list />
  </div>
</template>

<style scoped>

</style>
