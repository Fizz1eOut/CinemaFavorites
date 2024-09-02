<script>
import { defineComponent } from 'vue';
import AppUnderlay from '@/components/Base/AppUnderlay.vue'

export default defineComponent({
  name: 'AppMovieCard',

  components: {
    AppUnderlay,
  },

  props: {
    movie: {
      type: Object,
      required: true
    },

    imageUrl: {
      type: String,
      required: true,
    },
    genresMap: {
      type: Object,
      required: true,
    }
  },

  // data() {
  //   return {
  //   };
  // },

  computed: {
    // Преобразуем genre_ids в строку названий жанров
    genreNames() {
      return this.movie.genre_ids
        .map(id => this.genresMap[id])
        .filter(Boolean)
        .join(', ');
    },

    // Округляем рейтинг до одного знака после запятой
    roundedRating() {
      return this.movie.vote_average.toFixed(1);
    }
  },
  
  // methods: {
  
  // }
});
</script>

<template>
  <div class="movie-card">
    <img
      v-if="imageUrl"
      class="movie-card__img"
      :src="imageUrl"
      :alt="movie.title"
    >
    <h3 class="movie-card__title">{{ movie.title }}</h3>
    <div class="movie-card__genre">{{ genreNames }}</div>
    <div class="movie-card__release">Release date: {{ movie.release_date }}</div>
    <div class="movie-card__rating">
      <app-underlay>
        <div class="rating">{{ roundedRating }}</div>
      </app-underlay>
    </div>
  </div>
</template>

<style scoped>
  .movie-card {
    position: relative;
    max-width: 180px;
    width: 100%;
    cursor: pointer;
  }
  .movie-card__img {
    width: 100%;
  }
  .movie-card__title {
    margin-top: 8px;
    font-weight: 600;
    font-size: 17px;
    letter-spacing: 0.01em;
    color: var(--color-white);
    font-family: "Raleway", sans-serif;
  }
  .movie-card__genre {
    margin-top: 3px;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: 0em;
    color: var(--color-white);
    font-family: "Raleway", sans-serif;
  }
  .movie-card__release {
    margin-top: 2px;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: 0em;
    color: var(--color-white);
    font-family: "Raleway", sans-serif;
  }
  .movie-card__rating {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
  .rating {
    font-weight: 400;
    font-size: 13px;
    letter-spacing: 0em;
    color: var(--color-light-blue);
    padding: 5px;
  }
</style>
