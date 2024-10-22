<script>
import { defineComponent } from 'vue';
import { searchMulti } from '@/api/search/search';
import { fetchMovieGenres } from '@/api/movies/genresMovies';
import { fetchTvGenres } from '@/api/series/genresSeries';
import AppContentCard from '@/components/Base/AppContentCard.vue';
import AppActorCard from '@/components/Base/AppActorCard.vue';
import AppTitle from '@/components/Base/AppTitle.vue';

export default defineComponent({
  name: 'SearchResultView',

  components: {
    AppContentCard,
    AppActorCard,
    AppTitle
  },

  data() {
    return {
      searchQuery: '',  // Строка запроса
      searchResults: [], // Результаты поиска
      genresMap: {}, // Карта жанров
    };
  },

  computed: {
    movieImages() {
      const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
      const images = {};

      if (this.searchResults.length) {
        this.searchResults.forEach(movie => {
          images[movie.id] = movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : '';
        });
      }

      return images;
    },
    filteredMovies() {
      console.log(this.searchResults)
      return this.searchResults.filter(result => result.media_type === 'movie' || result.media_type === 'tv');
    },
    
    filteredActors() {
      return this.searchResults.filter(result => result.media_type === 'person');
    },
  },

  watch: {
    // Следим за изменениями параметра q в URL и выполняем новый поиск
    '$route.query.query': async function(newQuery) {
      this.searchQuery = newQuery;
      await this.performSearch();
    }
  },

  async mounted() {
    // Извлекаем параметр q из router.query
    this.searchQuery = this.$route.query.query || '';

    // Выполняем поиск, если параметр не пустой
    if (this.searchQuery) {
      await this.performSearch();
    }

    // Получаем жанры
    await this.getGenres();
  },

  methods: {
    async performSearch() {
      if (this.searchQuery.length > 0) {
        // Выполняем поиск через API
        const response = await searchMulti(this.searchQuery);
        this.searchResults = response.results; // Сохраняем результаты
      }
    },

    async getGenres() {
      const movieGenres = await fetchMovieGenres();
      const tvGenres = await fetchTvGenres();

      this.genresMap = {
        ...movieGenres.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {}),
        ...tvGenres.genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {})
      };
    }
  }
});
</script>

<template>
  <div class="search-result">
    <app-title>
      Search results for "{{ searchQuery }}"
    </app-title>
    <ul v-if="filteredMovies.length" class="search-result__list">
      <li 
        v-for="result in filteredMovies" 
        :key="result.id"
        class="search-result__item"
      >
        <app-content-card
          :movie="result"
          :image-url="movieImages[result.id]"
          :genres-map="genresMap"
        />
      </li>
    </ul>
    <p v-else>There are no results to display.</p>
  </div>

  <div class="search-result__people people">
    <app-title>
      Actors:
    </app-title>
    <ul v-if="filteredActors.length" class="people__list">
      <li 
        v-for="result in filteredActors" 
        :key="result.id"
        class="people__item"
      >
        <app-actor-card
          v-if="result.media_type === 'person'"
          :actor="result.media_type === 'person' ? result : null"
          :image-url="movieImages[result.id]"
        />
      </li>
    </ul>
    <p v-else>No actors found.</p>
  </div>
</template>

<style scoped>
  .search-result {
    margin-top: 40px;
  }
  .search-result__list {
    margin-top: 32px;
    display: flex;
    align-items: flex-start;

    flex-wrap: wrap;
    gap: 20px;
  }
  .search-result__item {
    flex: 1 1 180px;
    max-width: 100%;
    display: flex;
    justify-content: center;
  }

  .people {
    margin-top: 40px;
  }
  .people__list {
    margin-top: 32px;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
  }
  .people__item {
    height: auto;
  }
  @media (max-width: 412px) {
    .search-result__list {
      justify-content: center;
    }
    .search-result__item {
      flex: none;
    }
  }
</style>
