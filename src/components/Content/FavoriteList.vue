<script>
import { defineComponent } from 'vue';
import { useFavoritesStore } from '@/store/favorites.js';
import FavoriteMovieItem from '@/components/Content/FavoriteMovieItem.vue';
import AppTitle from '@/components/Base/AppTitle.vue';

export default defineComponent({
  name: 'FavoriteList',

  components: {
    FavoriteMovieItem,
    AppTitle
  },

  computed: {
    // Получаем избранные фильмы из store
    favoriteMovies() {
      const favoritesStore = useFavoritesStore();
      return favoritesStore.favorites;
    },

     // Формируем объект с URL-адресами изображений для избранных фильмов
     movieImages() {
      const baseImageUrl = 'https://image.tmdb.org/t/p/w500';
      const images = {};

      this.favoriteMovies.forEach(movie => {
        images[movie.id] = movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : '';
      });

      return images;
    }
  },

  mounted() {
    // Загружаем избранные фильмы из LocalStorage при монтировании
    const favoritesStore = useFavoritesStore();
    favoritesStore.loadFromLocalStorage();
  },

  methods: {
    removeFromFavorites(movie) {
      const favoritesStore = useFavoritesStore();
      favoritesStore.removeFromFavorites(movie); // Удаление фильма из избранного
    },
  },
});
</script>

<template>
  <div class="favorite__items">
    <app-title>
      Favorites
    </app-title>
    <ul v-if="favoriteMovies.length > 0" class="favorite__list">
      <favorite-movie-item
        v-for="movie in favoriteMovies"
        :key="movie.id"
        :movie="movie"
        :movie-image="movieImages[movie.id]"
        @remove="removeFromFavorites"
      />
    </ul>
    <div v-else>
      <app-title class="message">
        You currently have no favorite movies. Start adding them, and they will appear here.
      </app-title>
    </div>
  </div>
</template>

<style scoped>
  .message {
    margin-top: 40px;
  }
  .favorite__items {
    margin-top: 40px;
  }
  .favorite__list {
    margin-top: 40px;
  }
  @media (max-width: 499px) {
    .favorite__items {
      margin-top: 30px;
    }
    .message {
      margin-top: 30px;
    }
  } 
</style>
