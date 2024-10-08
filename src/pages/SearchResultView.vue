<script>
import { defineComponent } from 'vue';
import { searchMulti } from '@/api/search/search'; // Предполагаем, что это ваш метод поиска

export default defineComponent({
  name: 'SearchResultView',

  data() {
    return {
      searchQuery: '',  // Строка запроса
      searchResults: [], // Результаты поиска
    };
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
  },

  methods: {
    async performSearch() {
      if (this.searchQuery.length > 0) {
        // Выполняем поиск через API
        const response = await searchMulti(this.searchQuery);
        this.searchResults = response.results; // Сохраняем результаты
      }
    }
  }
});
</script>

<template>
  <div class="search-result">
    <h2>Результаты поиска для "{{ searchQuery }}"</h2>
    <ul v-if="searchResults.length">
      <li v-for="result in searchResults" :key="result.id">
        <h3>{{ result.name || result.title }}</h3>
        <div>{{ result.media_type }}</div>
      </li>
    </ul>
    <p v-else>Нет результатов для отображения.</p>
  </div>
</template>

<style scoped>

</style>
