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
      currentPage: 1,  // Текущая страница для пагинации
      isLoading: false,  // Флаг загрузки
      genresMap: {},  // Карта жанров, где ключ - это ID жанра, а значение - его название
      allGenres: [],  // Массив для хранения всех доступных жанров
      selectedGenres: [],  // Массив для хранения выбранных жанров
      selectedYears: [],  // Массив для хранения выбранных годов
      allYears: []  // Массив для всех возможных лет
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

    // Возвращаем все жанры, загруженные при инициализации
    uniqueGenres() {
      return this.allGenres;
    },

    // Возвращаем все года, извлеченные из фильмов
    uniqueYears() {
      return this.allYears;
    },

    // Фильтруем фильмы по выбранным жанрам и годам
    filteredMovies() {
      return this.movies.filter(movie => {
        const movieGenres = movie.genre_ids.map(id => this.genresMap[id]);
        const matchesGenre = !Array.isArray(this.selectedGenres) || this.selectedGenres.length === 0 || this.selectedGenres.some(genre => movieGenres.includes(genre));

        const movieYear = movie.release_date.substring(0, 4);  // Извлекаем первые 4 символа из release_date
        const matchesYear = !Array.isArray(this.selectedYears) || this.selectedYears.length === 0 || this.selectedYears.includes(movieYear);

        return matchesGenre && matchesYear;
      });
    }
  },

  watch: {
    selectedGenres(newGenres) {
      // Обновляем фильтр по жанрам, если изменен
      this.updateQueryParams({ genres: newGenres });
      this.currentPage = 1;  // Сбрасываем страницу
      this.movies = [];  // Очищаем текущий список фильмов
    },

    selectedYears(newYears) {
      // Обновляем фильтр по годам, если изменен
      this.updateQueryParams({ years: newYears });
      this.currentPage = 1;  // Сбрасываем страницу
      this.movies = [];  // Очищаем текущий список фильмов
    },

    $route: {
      // Применяем фильтры из URL при изменении маршрута
      handler: 'applyFiltersFromQuery',
      immediate: true
    }
  },

  created() {
    // Загружаем данные при инициализации компонента
    this.getGenres();  // Загружаем список жанров
    this.getAllYears();  // Загружаем все возможные годы
    this.updateQueryParams()
  },

  methods: {
    async getMovies() {
      // Запрашиваем список фильмов с примененными фильтрами
      this.isLoading = true;  // Показываем индикатор загрузки
      try {
        const filters = {
          genres: this.selectedGenres.map(genre => {
            // Преобразуем выбранные названия жанров в их ID
            const genreId = Object.keys(this.genresMap).find(id => this.genresMap[id] === genre);
            return genreId;
          }).filter(Boolean),  // Убираем undefined значения, если такие есть
          years: this.selectedYears,  // Применяем выбранные годы
        };

        const data = await fetchMovies(this.currentPage, filters);  // Запрашиваем фильмы с фильтрами
        console.log(data)
        console.log(this.currentPage)
        console.log(filters)
        this.movies = [...this.movies, ...data.results];  // Добавляем полученные фильмы в массив
        this.currentPage++;  // Увеличиваем страницу для следующего запроса
      } catch (error) {
        this.errorMessage = 'Не удалось получить список фильмов.';  // Если произошла ошибка, показываем сообщение
      } finally {
        this.isLoading = false;  // Скрываем индикатор загрузки
      }
    },

    // Метод для получения всех жанров из API
    async getGenres() {
      try {
        const data = await fetchGenres();  // Запрашиваем список жанров
        this.allGenres = data.genres.map(genre => genre.name);  // Сохраняем все жанры
        this.genresMap = data.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;  // Преобразуем список жанров в карту { id: название }
          return map;
        }, {});
      } catch (error) {
        console.error('Ошибка при загрузке жанров:', error);  // Логируем ошибку в консоль
      }
    },

    async getAllYears() {
      // Генерируем массив всех лет за последние 100 лет
      const currentYear = new Date().getFullYear();
      this.allYears = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());  // Генерируем последние 100 лет
    },

    updateQueryParams(params) {
      // Обновляем параметры URL с новыми фильтрами
      const query = { ...this.$route.query, ...params };

      Object.keys(query).forEach(key => {
        if (!query[key] || (Array.isArray(query[key]) && query[key].length === 0)) {
          delete query[key];
        }
      });

      this.$router.push({ query }).catch(() => {});  // Обновляем URL, не перезагружая страницу
    },

    applyFiltersFromQuery() {
      // Применяем фильтры из параметров URL
      const query = this.$route.query;
      
      this.selectedGenres = query.genres ? (Array.isArray(query.genres) ? query.genres : [query.genres]) : [];
      this.selectedYears = query.years ? (Array.isArray(query.years) ? query.years : [query.years]) : [];

      // Загружаем фильмы с новыми фильтрами
      this.getMovies();
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
    border: 1px solid #08325C;
  }
  .custom-multiselect.is-active {
    border: 1px solid #19416E;
    outline: none;
    box-shadow: none;
  }
  .custom-multiselect .multiselect-dropdown {
    border: 1px solid #19416E;
    outline: none;
    box-shadow: none;
  }
  .custom-multiselect .multiselect__content {
    background-color: var(--color-blue);
    color: var(--color-white);
  }
  .custom-multiselect .multiselect-dropdown {
    background-color: var(--color-blue);
  }
</style>
