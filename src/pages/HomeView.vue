<script>
import { defineComponent } from 'vue';
import { fetchMovies } from '@/api/movies/movies';

export default defineComponent({
  name: 'HomeView',

  data() {
    return {
      movies: [],  // Массив для хранения фильмов
      errorMessage: '',  // Сообщение об ошибке
      currentPage: 1,  // Текущая страница
      isLoading: false,  // Флаг загрузки
    };
  },

  computed: {
    // Формирует объект, содержащий URL-адреса изображений для каждого фильма.
    movieImages() {
      const baseImageUrl = 'https://image.tmdb.org/t/p/w500';  // Базовый URL для изображений
      const images = {};

      if (this.movies.length) {
        for (const movie of this.movies) {
          if (movie.poster_path) {
            images[movie.id] = `${baseImageUrl}${movie.poster_path}`;
          } else {
            images[movie.id] = null;
          }
        }
      }

      return images;
    }
  },

  created() {
    this.getMovies();  // Загружаем фильмы при создании компонента
  },
  
  methods: {
    // Запрашивает список фильмов с API и добавляет их в массив `movies`.
    async getMovies() {
      this.isLoading = true;  // Устанавливаем флаг загрузки
      try {
        const data = await fetchMovies(this.currentPage);  // Запрос на получение фильмов с текущей страницы
        // console.log(data)

        // Добавляем новые фильмы к уже загруженным
        this.movies = [...this.movies, ...data.results];
        console.log(this.movies)

        // Увеличиваем номер страницы для следующего запроса
        this.currentPage++;
      } catch (error) {
        this.errorMessage = 'Failed to retrieve movies.';
      } finally {
        this.isLoading = false;  // Снимаем флаг загрузки
      }
    },
  }
});
</script>

<template>
  <div>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <h3>{{ movie.title }} - {{ movie.release_date }} - {{ movie.popularity }}</h3>
        <img v-if="movieImages[movie.id]" :src="movieImages[movie.id]" :alt="movie.title">
      </li>
    </ul>
    <button v-if="!isLoading" @click="getMovies">Показать ещё</button>
  </div>
</template>

<style>

</style>
