<script>
import { defineComponent } from 'vue';
import { searchMulti } from '@/api/search/search';
import { getMovieDetails } from '@/api/movieDetails/SearchDetails';
import MovieInfo from '@/components/Content/MovieInfo.vue';
import AppSlider from '@/components/Base/AppSlider.vue';
import { SplideSlide } from '@splidejs/vue-splide';
import AppActorCard from '@/components/Base/AppActorCard.vue';
import AppSubtitle from '@/components/Base/AppSubtitle.vue';

export default defineComponent({
  name: 'MovieDetailView',

  components: {
    MovieInfo,
    AppSlider,
    AppActorCard,
    SplideSlide,
    AppSubtitle
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      movie: null,
      movieDetails: {}, 
      error: null,
    };
  },

  computed: {
    topCast() {
      return this.movieDetails.cast ? this.movieDetails.cast : [];
    }
  },

  async created() {
    await this.fetchMovieData(); // Загружаем данные при создании компонента
  },

  methods: {
    async fetchMovieData() {
      try {
        // Запрос к TMDB API для поиска фильма по ID
        const response = await searchMulti(this.title);
        // Находим фильм по ID и заголовку
        const movie = response.results.find(
          item => item.id.toString() === this.id && item.title.trim().toLowerCase() === this.title.trim().toLowerCase()
        );
        if (movie) {
          this.movie = movie;  // Сохраняем данные о фильме
          await this.fetchMovieDetails();
        } else {
          this.error = 'Movie not found';
        }
      } catch (err) {
        this.error = 'Error retrieving movie data';
      }
    },

    async fetchMovieDetails() {
      try {
        const response = await getMovieDetails(this.movie.id, this.movie.media_type);
        this.movieDetails = response;
      } catch (err) {
        this.error = 'Error retrieving movie details';
      }
    }
  }
});
</script>

<template>
  <movie-info v-if="movie" :movie="movie" :movie-details="movieDetails" />
  <app-slider>
    <template #subtitle>
      <app-subtitle>Top cast</app-subtitle>
    </template>

    <SplideSlide v-for="actor in topCast" :key="actor.id">
      <app-actor-card :actor="actor" />
    </SplideSlide>
  </app-slider>
</template>

<style>

</style>
