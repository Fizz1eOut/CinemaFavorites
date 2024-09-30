<script>
import { defineComponent } from 'vue';
import { fetchSeries } from '@/api/series/series'; // Импортируем новый API для сериалов
import { fetchGenres } from '@/api/series/genres'; // Используем тот же API для жанров
import { fetchCountries } from '@/api/countries/countries'; // Используем тот же API для стран
import AppFilterCard from '@/components/Base/AppFilterCard.vue';
import AppFilter from '@/components/Base/AppFilter.vue';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default defineComponent({
  name: 'TheSeries',

  components: {
    AppFilterCard,
    AppFilter,
    Multiselect,
  },

  data() {
    return {
      Series: [], // Массив для хранения фильмов
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
    seriesImages() {
      // Формирует объект, содержащий URL-адреса изображений для каждого сериала.
      const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
      const images = {};

      if (this.Series.length) {
        this.Series.forEach(series => {
          images[series.id] = series.poster_path ? `${baseImageUrl}${series.poster_path}` : '';
        });
      }

      return images;
    },

    uniqueGenres() {
      // Возвращаем все жанры, загруженные при инициализации
      return this.allGenres;
    },

    uniqueYears() {
      // Возвращаем все года, извлеченные из сериалов
      return this.allYears;
    },

    uniqueCountries() {
      // Возвращаем список стран для фильтра
      return this.allCountries.map(country => country.english_name);
    },

    filteredSeries() {
      // Фильтруем сериалы по выбранным жанрам и годам
      return this.Series.filter(series => {
        const seriesGenres = series.genre_ids.map(id => this.genresMap[id]);
        const matchesGenre = !Array.isArray(this.selectedGenres) || this.selectedGenres.length === 0 || this.selectedGenres.some(genre => seriesGenres.includes(genre));

        const seriesYear = series.first_air_date.substring(0, 4); // Для сериалов используем first_air_date
        const matchesYear = !Array.isArray(this.selectedYears) || this.selectedYears.length === 0 || this.selectedYears.includes(seriesYear);

        return matchesGenre && matchesYear;
      });
    },

    sortedSeries() {
      const Series = [...this.filteredSeries]; // Копируем отфильтрованные сериалы
      
      if (this.sortBy === 'rating_asc') {
        return Series.sort((a, b) => a.vote_average - b.vote_average); // Сортировка по возрастанию рейтинга
      } else if (this.sortBy === 'rating_desc') {
        return Series.sort((a, b) => b.vote_average - a.vote_average); // Сортировка по убыванию рейтинга
      }

      return Series; // Возвращаем без сортировки, если сортировка не выбрана
    }
  },

  watch: {
    selectedGenres(newGenres) {
      // Обновляем фильтр по жанрам, если изменен
      this.updateQueryParams({ genres: newGenres });
      this.currentPage = 1; // Сбрасываем страницу
      this.Series = [];
    },

    selectedYears(newYears) {
      // Обновляем фильтр по годам, если изменен
      this.updateQueryParams({ years: newYears });
      this.currentPage = 1; // Сбрасываем страницу
      this.Series = []; // Очищаем текущий список фильмов
    },

    selectedCountry(newCountry) {
      // Обновляем фильтр по странам, если изменен
      this.updateQueryParams({ country: newCountry });
      this.currentPage = 1; // Сбрасываем страницу
      this.Series = []; // Очищаем текущий список фильмов
    },

    // Применяем фильтры из URL при изменении маршрута
    $route: {
      handler: 'applyFiltersFromQuery',
      immediate: true
    },

    sortBy(newSortBy) {
      // Обновляем параметры URL при изменении сортировки
      this.updateQueryParams({ sort: newSortBy });
      this.currentPage = 1; // Сбрасываем страницу
      this.Series = []; // Очищаем текущий список сериалов
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
    async getSeries() {
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

        const data = await fetchSeries(this.currentPage, filters); // Используем новый запрос для сериалов
        console.log(data)
        this.Series = [...this.Series, ...data.results];
        this.currentPage++;
      } catch (error) {
        this.errorMessage = 'Не удалось получить список сериалов.';
      } finally {
        this.isLoading = false;
      }
    },

    // Метод для получения всех жанров из API
    async getGenres() {
      try {
        // Отправляем запрос на получение списка жанров
        const data = await fetchGenres();

        // Убираем жанр "Animation" из списка всех жанров
        this.allGenres = data.genres
          .filter(genre => genre.name !== 'Animation')  // Фильтруем жанры, исключая "Animation"
          .map(genre => genre.name);  // Преобразуем объекты жанров в массив их названий

        // Создаем карту жанров, исключая "Animation"
        this.genresMap = data.genres.reduce((map, genre) => {
          if (genre.name !== 'Animation') {
            map[genre.id] = genre.name;  // Добавляем жанры с их ID и названиями в карту
          }
          return map;
        }, {});
      } catch (error) {
        // Логируем ошибку, если произошла ошибка при загрузке жанров
        console.error('Ошибка при загрузке жанров:', error);
      }
    },

    async getAllYears() {
      // Генерируем массив всех лет за последние 100 лет
      const currentYear = new Date().getFullYear();
      this.allYears = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString()); // Генерируем последние 100 лет
    },

    // Метод для получения всех доступных стран
    async getAllCountries() {
      try {
        const data = await fetchCountries(); // Запрашиваем список стран
        this.allCountries = data; // Сохраняем все страны
      } catch (error) {
        console.error('Ошибка при загрузке стран:', error);
      }
    },

    // Метод для преобразования названия страны в код страны (ISO 3166-1)
    getCountryCode(countryName) {
      const country = this.allCountries.find(c => c.english_name === countryName); // Ищем страну по названию
      return country ? country.iso_3166_1 : null; // Возвращаем код страны или null, если страна не найдена
    },

    // Обновляем параметры URL с новыми фильтрами
    updateQueryParams(params) {
      const query = { ...this.$route.query, ...params };

      Object.keys(query).forEach(key => {
        if (!query[key] || (Array.isArray(query[key]) && query[key].length === 0)) {
          delete query[key];
        }
      });

      this.$router.push({ query }).catch(() => {}); // Обновляем URL, не перезагружая страницу
    },

    // Применяем фильтры из параметров URL
    async applyFiltersFromQuery() {
      const query = this.$route.query;

      this.selectedGenres = query.genres ? (Array.isArray(query.genres) ? query.genres : [query.genres]) : [];
      this.selectedYears = query.years ? (Array.isArray(query.years) ? query.years : [query.years]) : [];

      // Ждем загрузку всех стран перед применением фильтра по стране
      await this.getAllCountries();

      this.selectedCountry = query.country || null; // Применяем страну из параметров 
      this.sortBy = query.sort || null; // Применяем сортировку из параметров URL

      this.getSeries(); // Загружаем фильмы с новыми фильтрами
    }
  }
});
</script>

<template>
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
    :series="sortedSeries" 
    :image-url="seriesImages" 
    :genres-map="genresMap" 
    :loading="isLoading" 
    @load-more="getSeries" 
  />
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
  .custom-multiselect {
    border-radius: 8px;
    background-color: var(--color-dark-blue);
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
    background-color: var(--color-dark-blue);
    color: var(--color-white);
  }
  .custom-multiselect .multiselect-dropdown {
    background-color: var(--color-dark-blue);
  }
</style>
