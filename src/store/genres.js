import { defineStore } from 'pinia';
import { fetchTvGenres } from '@/api/series/genresSeries';
import { fetchMovieGenres } from '@/api/movies/genresMovies';

export const useGenresStore = defineStore('genres', {
  state: () => ({
    genresMap: {},    // Карта жанров по ID
    allGenres: [],    // Список всех жанров
  }),

  actions: {
    // Метод для получения жанров фильмов
    async loadMovieGenres() {
      try {
        const data = await fetchMovieGenres();
        this.genresMap = data.genres.reduce((map, genre) => {
          if (genre.name !== 'Animation') {
            map[genre.id] = genre.name;
          }
          return map;
        }, {});
      } catch (error) {
        console.error('Ошибка при загрузке жанров фильмов:', error);
      }
    },

    // Метод для получения жанров сериалов
    async loadTvGenres() {
      try {
        const data = await fetchTvGenres();
        this.genresMap = {
          ...this.genresMap,  // Добавляем существующие жанры (например, фильмы) в карту
          ...data.genres.reduce((map, genre) => {
            if (genre.name !== 'Animation') {
              map[genre.id] = genre.name;
            }
            return map;
          }, {})
        };
      } catch (error) {
        console.error('Ошибка при загрузке жанров сериалов:', error);
      }
    },
  },
});
