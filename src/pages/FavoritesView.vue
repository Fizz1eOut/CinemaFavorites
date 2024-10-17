<script>
import { defineComponent } from 'vue';
import TheFavorites from '@/components/Content/TheFavorites.vue';

export default defineComponent({
  name: 'FavoritesView',

  components: {
    TheFavorites
  },
});
</script>

<template>
  <the-favorites />
</template>

<style scoped>

</style>
