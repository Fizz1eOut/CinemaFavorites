<script>
import { defineComponent } from 'vue';
import { searchMulti } from '@/api/search/search'; // Импорт функции для API поиска

export default defineComponent({
  name: 'SearchResultView',

  data() {
    return {
      searchQuery: '', // Модель для хранения поискового запроса
      searchResults: [], // Массив для хранения результатов поиска
    };
  },

  async mounted() {
    // Получаем параметр запроса из URL (searchQuery)
    this.searchQuery = this.$route.query.search;

    // Если запрос существует, запускаем поиск
    if (this.searchQuery) {
      try {
        const response = await searchMulti(this.searchQuery); // Вызов API для поиска
        this.searchResults = response.results; // Сохраняем результаты поиска
        console.log(this.searchResults); // Логируем результаты
      } catch (error) {
        console.error('Ошибка при поиске:', error); // Логируем ошибки при запросе
      }
    }
  }
});
</script>

<template>
  <div class="search-result">
    <div class="search-result__body">
      <h2>Результаты поиска для: "{{ searchQuery }}"</h2>
      <ul>
        <li v-for="result in searchResults" :key="result.id">
          {{ result.title || result.name }} <!-- Отображаем название фильма или сериала -->
          =
          {{ result.media_type }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
