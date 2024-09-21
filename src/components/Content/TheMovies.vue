<script>
import { defineComponent } from 'vue';
import { fetchMovies } from '@/api/movies';
import { fetchGenres } from '@/api/genres';
import { fetchCountries } from '@/api/countries';
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
      allYears: [],  // Массив для всех возможных лет
      allCountries: [],  // Массив для всех доступных стран
      selectedCountry: null,  // Хранение выбранной страны
      sortBy: null,  // Новое свойство для хранения типа сортировки
      sortOptions: [ // Варианты сортировки
        { label: 'Rating: Low to High', value: 'rating_asc' },
        { label: 'Rating: High to Low', value: 'rating_desc' }
      ]
    };
  },

  computed: {
    // Формирует объект, содержащий URL-адреса изображений для каждого фильма.
    movieImages() {
      const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
      const images = {};

      if (this.movies.length) {
        this.movies.forEach(movie => {
          images[movie.id] = movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : '';
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

    // Возвращаем список стран для фильтра
    uniqueCountries() {
      return this.allCountries.map(country => country.english_name);
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
    },

    sortedMovies() {
      const movies = [...this.filteredMovies]; // Копируем отфильтрованные фильмы
      
      if (this.sortBy === 'rating_asc') {
        return movies.sort((a, b) => a.vote_average - b.vote_average); // Сортировка по возрастанию рейтинга
      } else if (this.sortBy === 'rating_desc') {
        return movies.sort((a, b) => b.vote_average - a.vote_average); // Сортировка по убыванию рейтинга
      }

      return movies; // Возвращаем без сортировки, если сортировка не выбрана
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

    selectedCountry(newCountry) {
      // Обновляем фильтр по странам, если изменен
      this.updateQueryParams({ country: newCountry });  // Обновляем параметры URL
      this.currentPage = 1;  // Сбрасываем страницу
      this.movies = [];  // Очищаем текущий список фильмов
    },

    // Применяем фильтры из URL при изменении маршрута
    $route: {
      handler: 'applyFiltersFromQuery',
      immediate: true
    },

    sortBy(newSortBy) {
      this.updateQueryParams({ sort: newSortBy }); // Обновляем параметры URL при изменении сортировки
      this.currentPage = 1;  // Сбрасываем страницу
      this.movies = [];  // Очищаем текущий список фильмов
    }
  },

  created() {
    // Загружаем данные при инициализации компонента
    this.getGenres();  // Загружаем список жанров
    this.getAllYears();  // Загружаем все возможные годы
    this.getAllCountries();  // Загружаем список стран
    this.updateQueryParams();  // Обновляем параметры фильтра
  },

  methods: {
    async getMovies() {
      this.isLoading = true;
      try {
        const filters = {
          genres: this.selectedGenres.map(genre => {
            const genreId = Object.keys(this.genresMap).find(id => this.genresMap[id] === genre);
            return genreId;
          }).filter(Boolean),
          years: this.selectedYears,
          country: this.selectedCountry ? this.getCountryCode(this.selectedCountry) : null
        };

        const data = await fetchMovies(this.currentPage, filters);
        this.movies = [...this.movies, ...data.results];
        this.currentPage++;
      } catch (error) {
        this.errorMessage = 'Не удалось получить список фильмов.';
      } finally {
        this.isLoading = false;
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

    // Метод для получения всех доступных стран
    async getAllCountries() {
      try {
        const data = await fetchCountries();  // Запрашиваем список стран
        this.allCountries = data;  // Сохраняем все страны
      } catch (error) {
        console.error('Ошибка при загрузке стран:', error);  // Логируем ошибку в консоль
      }
    },

    // Метод для преобразования названия страны в код страны (ISO 3166-1)
    getCountryCode(countryName) {
      const country = this.allCountries.find(c => c.english_name === countryName);  // Ищем страну по названию
      return country ? country.iso_3166_1 : null;  // Возвращаем код страны или null, если страна не найдена
    },

    // Обновляем параметры URL с новыми фильтрами
    updateQueryParams(params) {
      const query = { ...this.$route.query, ...params };

      Object.keys(query).forEach(key => {
        if (!query[key] || (Array.isArray(query[key]) && query[key].length === 0)) {
          delete query[key];
        }
      });

      this.$router.push({ query }).catch(() => {});  // Обновляем URL, не перезагружая страницу
    },

    // Применяем фильтры из параметров URL
    async applyFiltersFromQuery() {
      const query = this.$route.query;

      this.selectedGenres = query.genres ? (Array.isArray(query.genres) ? query.genres : [query.genres]) : [];
      this.selectedYears = query.years ? (Array.isArray(query.years) ? query.years : [query.years]) : [];
      
      // Ждем загрузку всех стран перед применением фильтра по стране
      await this.getAllCountries();

      this.selectedCountry = query.country || null;  // Применяем страну из параметров 
      this.sortBy = query.sort || null; // Применяем сортировку из параметров URL

      this.getMovies();  // Загружаем фильмы с новыми фильтрами
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
      <multiselect
        v-model="selectedCountry"
        :options="uniqueCountries"
        placeholder="Select country"
        multiple
        close-on-select
        class="custom-multiselect"
      />

      <multiselect
        v-model="sortBy"
        :options="sortOptions"
        placeholder="Sort by"
        label="label"
        track-by="value"
        class="custom-multiselect"
      />
    </app-filter>

    <app-filter-card 
      :movies="sortedMovies"
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
