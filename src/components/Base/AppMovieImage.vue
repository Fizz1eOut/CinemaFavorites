<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppMovieImage',

  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  computed: {
    movieImage() {
      const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
      // Проверяем, есть ли `poster_path` у переданного фильма
      return this.movie.poster_path ? `${baseImageUrl}${this.movie.poster_path}` : '';
    }
  },
});
</script>

<template>
  <img
    v-if="movieImage"
    :src="movieImage"
    :alt="movie.title"
  >
  <img
    v-else
    class="card__no-poster"
    src="https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
    alt="Image not available"
  >
</template>

<style scoped>

</style>
