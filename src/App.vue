<script>
import { defineComponent } from 'vue';
import AppHeader from '@/components/Base/AppHeader.vue';
import AppContainer from '@/components/Base/AppContainer.vue';
import { useGenresStore } from '@/store/genres.js';

export default defineComponent({
  name: 'AppVue',

  components: {
    AppContainer,
    AppHeader
  },
  
  mounted() {
    const genresStore = useGenresStore();

    // Загружаем жанры, если они еще не загружены
    if (Object.keys(genresStore.genresMap).length === 0) {
      genresStore.loadMovieGenres();
      genresStore.loadTvGenres();
    }
  },
});
</script>

<template>
  <app-header />

  <main class="main">
    <app-container size="sm">
      <router-view />
    </app-container>
  </main>
</template>

<style>
  .main {
    padding-bottom: 87px;
  }
  @media (max-width: 768px) {
    .main {
      padding-bottom: 77px;
    }
  }
</style>
