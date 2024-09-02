<script>
import { defineComponent } from 'vue';
import AppMovieCard from '@/components/Base/AppMovieCard.vue';
import AppButton from '@/components/Base/AppButton.vue';

export default defineComponent({
  name: 'AppFilterCard',

  components: {
    AppMovieCard,
    AppButton
  },

  props: {
    movies: {
      type: Object,
      required: true
    },

    imageUrl: {
      type: Object,
      required: true,
    },

    loading: {
      type: Boolean,
      required: true,
    },

    genresMap: {
      type: Object,
      required: true,
    }
  },
  
  emits: ['load-more'],

  // data() {
  //   return {
  //   };
  // },

  // computed: {

  // },
  
  // methods: {
 
  // }
});
</script>

<template>
  <div class="movies">
    <ul class="movies__list">
      <li 
        v-for="movie in movies" 
        :key="movie.id" 
        class="movies__item"
      >
        <app-movie-card 
          :movie="movie" 
          :image-url="imageUrl[movie.id]"
          :genres-map="genresMap"
        />
      </li>
    </ul>
    <div class="button-item">
      <app-button 
        v-if="!loading" 
        class="button"
        @click="$emit('load-more')"
      >
        Показать ещё
      </app-button>
    </div>
  </div>
</template>

<style scoped>
  .movies {
    margin-top: 40px;
  }
  .movies__list {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }
  .movies__item {
    max-width: 180px;
    width: 100%;
  }
  .button-item {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button {
    max-width: 200px;
    width: 100%;
  }
</style>
