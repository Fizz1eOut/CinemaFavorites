<script>
import { defineComponent } from 'vue';
import IconSearch from '@/components/Icons/IconSearch.vue';
import AppButton from '@/components/Base/AppButton.vue';
import IconCross from '@/components/Icons/IconCross.vue';
import { searchMulti } from '@/api/search/search';
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default defineComponent({
  name: 'AppSearch', 

  components: {
    IconSearch,
    AppButton,
    Multiselect,
    IconCross
  },

  data() {
    return {
      isVisible: false,
      searchQuery: '',  // Модель для текста поиска
      searchResults: [], // Массив для хранения результатов поиска
    };
  },

  methods: {
    openMultiselect() {
      this.isVisible = true;
    },
    closeMultiselect() {
      this.isVisible = false;
    },

    // Метод для поиска, который вызывается при изменении строки поиска
    async onSearch(query) {
      // Выполняем поиск только если длина строки больше 2 символов
      if (query.length > 2) {
        try {
          const response = await searchMulti(query.trim()); // Вызов API для поиска
          this.searchResults = this.processResults(response.results); // Обработка результатов поиска
          console.log(this.searchResults); // Логируем результаты

          // Переход на страницу с результатами поиска, передача запроса через query параметры
          this.$router.push({
            name: 'SearchResult',
            query: { search: query.trim() } // Передаем запрос как параметр URL
          });
        } catch (error) {
          console.error('Ошибка при поиске:', error);
        }
      }
    },

    // Обработка результатов поиска, фильтрация по типу медиа
    processResults(results) {
      return results.map(item => {
        if (item.media_type === 'movie') {
          return { id: item.id, title: item.title }; // Возвращаем название фильма
        } else if (item.media_type === 'tv') {
          return { id: item.id, title: item.name }; // Возвращаем название ТВ-шоу
        } else if (item.media_type === 'person') {
          return { id: item.id, title: item.name }; // Возвращаем имя человека
        } else {
          return { id: item.id, title: item.name || item.title }; // Другие варианты
        }
      });
    },
  }
});
</script>

<template>
  <div class="search">
    <app-button 
      v-if="!isVisible"
      @click="openMultiselect"
    >
      <icon-search class="icon-search" />
      <span>Search</span>
    </app-button>

    <div v-if="isVisible" class="search-multiselect">
      <multiselect
        v-model="searchQuery"
        :options="searchResults"
        label="title"
        track-by="id" 
        placeholder="Enter movie title, TV show or actor" 
        searchable 
        class="custom-multiselect"
        @search-change="onSearch" 
      />
      <icon-cross class="icon-cross" @click="closeMultiselect" />
    </div>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<style>
  .search__button  {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .search span {
    font-weight: 400;
    font-size: 17px;
    letter-spacing: 0.01em;
    color: var(--color-white);
  }
  .icon-search {
    width: 18px;
    height: 18px;
    fill: var(--color-white);
  }
  .icon-cross {
    width: 18px;
    height: 18px;
    fill: var(--color-white);
    cursor: pointer;
  }
  .search-multiselect {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .custom-multiselect {
    width: 300px;
  }
  .custom-multiselect .multiselect-search {
    border-radius: 8px;
    background-color: var(--color-dark-blue);
    color: var(--color-white);
    border: 1px solid #08325C;
  }

  @media (max-width: 460px) {
    .custom-multiselect {
      width: 220px;
    }
  }
  @media (max-width: 499px) {
    .custom-multiselect {
      width: 184px;
    }
  } 
</style>
