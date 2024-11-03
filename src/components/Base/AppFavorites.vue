<script>
import { defineComponent } from 'vue';
import IconFavorites from '@/components/Icons/IconFavorites.vue';
import AppButton from '@/components/Base/AppButton.vue';
import { useFavoritesStore } from '@/store/favorites.js';

export default defineComponent({
  name: 'AppFavorites',

  components: {
    IconFavorites,
    AppButton,
  },

  computed: {
    // Подключаем store и возвращаем количество избранных элементов
    favoriteCount() {
      const favoritesStore = useFavoritesStore();
      return favoritesStore.favorites.length; // Возвращаем количество избранных фильмов
    },
  },
});
</script>

<template>
  <div class="favorites">
    <app-button class="search__button" default>
      <icon-favorites class="icon-favorites" />
      <span class="favorites__quantity">{{ favoriteCount }}</span>
    </app-button>
  </div>
</template>

<style scoped>
  .favorites {
    position: relative;
    max-width: 24px;
  }
  .icon-favorites {
    width: 24px;
    height: 24px;
    fill: var(--color-white);
  }
  .favorites__quantity {
    position: absolute;
    right: -10px;
    top: -5px;
    border-radius: 100%;
    color: var(--color-white);
    font-size: 13px;
    height: 18px;
    width: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-blue);
  }
  .router-link-active .icon-favorites {
    fill: var(--color-yellow-disabled);
  }
</style>
