<script>
import { defineComponent } from 'vue';
import { searchMulti } from '@/api/search/search';
import { getMovieDetails } from '@/api/movieDetails/SearchDetails';
import { getSimilarMovies } from '@/api/movieDetails/movieSimilar'; 
import MovieInfo from '@/components/Content/MovieInfo.vue';
import TopActors from '@/components/Content/TopActors.vue';
import AppContentSlider from '@/components/Base/AppContentSlider.vue';

export default defineComponent({
  name: 'MovieDetailView',

  components: {
    MovieInfo,
    AppContentSlider,
    TopActors,

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
      similarMovies: [],
      error: null,
    };
  },

  watch: {
    // Отслеживаем изменения id или title
    id: {
      immediate: true, // Вызываем сразу при создании компонента
      handler() {
        this.fetchMovieData(); // Загружаем данные о фильме при изменении id
        this.fetchSimilarMovies(); // Загружаем похожие фильмы
      },
    },
    title: {
      immediate: true, // Вызываем сразу при создании компонента
      handler() {
        this.fetchMovieData(); // Загружаем данные о фильме при изменении title
        this.fetchSimilarMovies(); // Загружаем похожие фильмы
      },
    },
  },

  async created() {
    await this.fetchMovieData();
    await this.fetchSimilarMovies();
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
    },

    async fetchSimilarMovies() {
      try {
        const similar = await getSimilarMovies(this.id, this.movie.media_type);
        this.similarMovies = similar;
      } catch (err) {
        this.error = 'Error retrieving similar movies';
      }
    }
  }
});
</script>

<template>
  <movie-info v-if="movie" :movie="movie" :movie-details="movieDetails" />

  <top-actors :movie-details="movieDetails" />

  <app-content-slider :movies="similarMovies">
    <template #subtitle>
      You might also like
    </template>
  </app-content-slider>
</template>

<style>

</style>
