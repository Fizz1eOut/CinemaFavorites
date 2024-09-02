<script>
import { defineComponent } from 'vue';
import { fetchMovies } from '@/api/movies';
import { fetchGenres } from '@/api/genres';
import AppContainer from '@/components/Base/AppContainer.vue';
import AppFilterCard from '@/components/Base/AppFilterCard.vue';
import AppFilter from '@/components/Base/AppFilter.vue';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default defineComponent({
  name: 'TheMovies',

  components: {
    AppFilterCard,
    AppFilter,
    Multiselect,
    AppContainer
  },

  data() {
    return {
      movies: [],  // Массив для хранения фильмов
      errorMessage: '',  // Сообщение об ошибке
      currentPage: 1,  // Текущая страница
      isLoading: false,  // Флаг загрузки
      genresMap: {},  // Карта жанров, где ключ - это ID, а значение - название жанра
      selectedGenres: [],  // Массив для хранения выбранных жанров (строк)
      selectedYears: [],  // Массив для хранения выбранных годов
    };
  },

  computed: {
    // Формирует объект, содержащий URL-адреса изображений для каждого фильма.
    movieImages() {
      const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
      const images = {};

      if (this.movies.length) {
        this.movies.forEach(movie => {
          images[movie.id] = movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : null;
        });
      }

      return images;
    },

    // Уникальные жанры из массива movies
    uniqueGenres() {
      const genres = new Set();
      this.movies.forEach(movie => {
        movie.genre_ids.forEach(genreId => {
          if (this.genresMap[genreId]) {
            genres.add(this.genresMap[genreId]);
            // console.log(genres)
          }
        });
      });
      return Array.from(genres);
    },

    // Уникальные года
    uniqueYears() {
      const years = new Set();
      // console.log(years)
      this.movies.forEach(movie => {
        // console.log(movie)
        const year = new Date(movie.release_date).getFullYear();
        // console.log(year)
        years.add(year);
      });
      return Array.from(years).sort((a, b) => b - a);
    },

    // Фильтрованные фильмы
    filteredMovies() {
      return this.movies.filter(movie => {
        const movieGenres = movie.genre_ids.map(id => this.genresMap[id]);
        const matchesGenre = !Array.isArray(this.selectedGenres) || this.selectedGenres.length === 0 || this.selectedGenres.some(genre => movieGenres.includes(genre));
        
        const movieYear = movie.release_date.substring(0, 4);  // Извлекаем первые 4 символа из release_date
        const matchesYear = !Array.isArray(this.selectedYears) || this.selectedYears.length === 0 || this.selectedYears.includes(movieYear);
        
        return matchesGenre && matchesYear;
      });
    },
  },
  
  watch: {
    // Следим за изменениями в выбранных жанрах и обновляем параметры запроса в URL
    selectedGenres(newGenres) {
      this.updateQueryParams({ genres: newGenres });
    },

    // Следим за изменениями в выбранных годах и обновляем параметры запроса в URL
    selectedYears(newYears) {
      this.updateQueryParams({ years: newYears });
    },

    $route: {
      handler: 'applyFiltersFromQuery',
      immediate: true
    }
  },

  created() {
    this.getMovies();  // Загружаем фильмы при создании компонента
    this.getGenres();  // Загружаем жанры при создании компонента
    this.applyFiltersFromQuery();  // Применяем фильтры из параметров запроса URL
  },

  methods: {
    // Запрашивает список фильмов с API и добавляет их в массив `movies`.
    async getMovies() {
      this.isLoading = true;
      try {
        const data = await fetchMovies(this.currentPage);
        this.movies = [...this.movies, ...data.results];
        console.log(this.movies)
        this.currentPage++;
      } catch (error) {
        this.errorMessage = 'Failed to retrieve movies.';
      } finally {
        this.isLoading = false;
      }
    },

    // Получение списка жанров
    async getGenres() {
      try {
        const data = await fetchGenres();
        this.genresMap = data.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {});
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    },
    
    // Метод для обновления параметров запроса в URL
    updateQueryParams(params) {
      const query = { ...this.$route.query, ...params };
      
      // Удаляем пустые параметры из запроса
      Object.keys(query).forEach(key => {
        if (!query[key] || (Array.isArray(query[key]) && query[key].length === 0)) {
          console.log(query[key])
          delete query[key];
        }
      });

      // Обновляем URL с новыми параметрами, не обновляя страницу
      this.$router.push({ query }).catch(() => {});
    },

    // Метод для применения фильтров на основе параметров запроса из URL
    applyFiltersFromQuery() {
      const query = this.$route.query;
      // Если в URL есть жанры, устанавливаем их в selectedGenres
      if (query.genres) {
        this.selectedGenres = Array.isArray(query.genres) ? query.genres : [query.genres];
      }

      // Если в URL есть года, устанавливаем их в selectedYears
      if (query.years) {
        this.selectedYears = Array.isArray(query.years) ? query.years : [query.years];
      }
    }
  }
});
</script>

<template>
  <app-container size="md">
    <app-filter>
      <multiselect
        v-model="selectedGenres"
        :options="uniqueGenres"
        placeholder="Select genres"
        multiple
        close-on-select
        class="custom-multiselect"
      />
    
      <multiselect
        v-model="selectedYears"
        :options="uniqueYears"
        placeholder="Select years"
        multiple
        close-on-select
        class="custom-multiselect"
      />
    </app-filter>

    <app-filter-card 
      :movies="filteredMovies"
      :image-url="movieImages"
      :genres-map="genresMap"
      :loading="isLoading"
      @load-more="getMovies"
    />
  </app-container>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
.custom-multiselect {
  border-radius: 8px;
  background-color: var(--color-blue);
  color: var(--color-white);
}
.custom-multiselect .multiselect__content {
  background-color: var(--color-blue);
  color: var(--color-white);
}
.custom-multiselect .multiselect-dropdown {
  background-color: var(--color-blue);
}
</style>
