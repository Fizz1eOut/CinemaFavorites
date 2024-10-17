<script>
import { defineComponent } from 'vue';
import AppHeader from '@/components/Base/AppHeader.vue';
import AppContainer from '@/components/Base/AppContainer.vue';
import { useFavoritesStore } from '@/store/favorites.js';

export default defineComponent({
  name: 'AppVue',

  components: {
    AppContainer,
    AppHeader
  },

  mounted() {
    // Загружаем избранные фильмы при инициализации приложения
    const favoritesStore = useFavoritesStore();
    favoritesStore.loadFromLocalStorage(); // Загружаем данные из localStorage
  },
});
</script>

<template>
  <app-header />

  <main>
    <app-container size="sm">
      <router-view />
    </app-container>
  </main>
</template>

<style>

</style>
