<script>
import { defineComponent } from 'vue';
import TheMovies from '@/components/Content/TheMovies.vue'

export default defineComponent({
  name: 'MoviesView',

  components: {
    TheMovies,
  }
});
</script>

<template>
  <the-movies />
</template>

<style>

</style>
