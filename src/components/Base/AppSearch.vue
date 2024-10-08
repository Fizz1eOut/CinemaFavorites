<script>
import { defineComponent } from 'vue';
import IconSearch from '@/components/Icons/IconSearch.vue';
import AppButton from '@/components/Base/AppButton.vue';
import IconCross from '@/components/Icons/IconCross.vue';
import AppInput from '@/components/Inputs/AppInput.vue';
import AppDropdown from '@/components/Base/AppDropdown.vue';
import { searchMulti } from '@/api/search/search';

export default defineComponent({
  name: 'AppSearch',

  components: {
    IconSearch,
    AppButton,
    IconCross,
    AppInput,
    AppDropdown
  },

  data() {
    return {
      isVisible: false,  // Контролирует видимость панели поиска
      query: '',         // Текущая строка запроса
      searchResults: [], // Массив с результатами поиска
      selectedResult: null, // Все выбранные результаты
    };
  },

  computed: {
    dropdownActive() {
      // Показывать dropdown только если есть результаты
      return this.searchResults.length > 0;
    },
  },

  methods: {
    openMultiselect() {
      this.isVisible = true;
    },
    closeMultiselect() {
      this.isVisible = false;
      this.query = '';
      this.searchResults = [];
      this.selectedResult = null;
    },
    
    // Метод для обработки ввода текста
    async handleInput() {
      if (this.query.length > 2) {  // Начинать поиск при вводе хотя бы 3 символов
        const response = await searchMulti(this.query);
        this.searchResults = response.results;  // Предполагается, что `results` приходит из TMDB
      } else {
        this.searchResults = [];
      }
    },

    // Метод для обработки выбора элемента из подсказок
    async selectResult(result) {
      this.query = result.name || result.title || ''; // Устанавливаем выбранное значение в input
      this.searchResults = [];

      this.$router.push({
        name: 'SearchResult',
        query: { query: this.query } // передаем строку поиска как параметр
      });
    },

    // Метод для поиска по нажатию Enter
    async handleEnter() {
    if (this.query.length > 0) {
      // Проверяем, есть ли результаты поиска
      if (this.searchResults.length > 0) {
        // Перенаправляем на страницу с результатами, передавая параметр через router.query
        this.$router.push({
          name: 'SearchResult',
          query: { query: this.query } // передаем строку поиска как параметр 
        });
      }
    }
  },
  },
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

    <div v-if="isVisible" class="search-item">
      <app-input 
        v-model="query"
        placeholder="What do you want to find?"
        @input="handleInput"
        @keyup.enter="handleEnter"
      />
      <icon-cross class="icon-cross" @click="closeMultiselect" />

      <app-dropdown :dropdown-active="dropdownActive" class="dropdown">
        <li 
          v-for="result in searchResults" 
          :key="result.id"
          class="search-suggestions"
          @click="selectResult(result)"
        >
          {{ result.name || result.title }}
        </li>
      </app-dropdown>
    </div>
  </div>
</template>

<style>
  .search-item .dropdown {
    width: 92%;
  }
  .dropdown .dropdown-list {
    height: 160px;
    overflow-y: auto;
  }
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
  .search-item {
    width: 300px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .search-suggestions {
    font-size: 15px;
    font-weight: 400;
    transition: color 0.3s ease-in-out;
  }
  .search-suggestions:hover {
    color: var(--color-yellow);
  }
  @media (max-width: 460px) {
    .search-item {
      width: 220px;
    }
  }
  @media (max-width: 499px) {
    .search-item {
      width: 184px;
    }
  } 
</style>
