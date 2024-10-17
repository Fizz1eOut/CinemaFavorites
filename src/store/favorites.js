import { defineStore } from 'pinia';

// Определение хранилища с именем 'favorites'
export const useFavoritesStore = defineStore('favorites', {
  
  // Определение начального состояния хранилища
  state() {
    return {
      favorites: [], // Массив для хранения избранных фильмов
    };
  },

  // Определение геттеров для доступа к состоянию
  getters: {
    // Геттер для проверки, является ли фильм избранным
    isFavorite: (state) => (movieId) => {
      return state.favorites.some((item) => item.id === movieId); // Проверяет, есть ли фильм с данным movieId в списке favorites
    },
  },

  // Определение действий (actions) для изменения состояния
  actions: {
    // Добавление фильма в избранное
    addToFavorites(movie) {
      // Проверяем, есть ли уже фильм в списке избранного
      const existingItem = this.favorites.find((item) => item.id === movie.id);
      if (!existingItem) {
        // Если фильма нет, добавляем его в список
        this.favorites.push(movie);
        this.saveToLocalStorage(); // Сохраняем обновленный список в localStorage
      }
    },

    // Удаление фильма из избранного
    removeFromFavorites(movie) {
      // Фильтруем список избранного, убирая фильм с переданным movie.id
      this.favorites = this.favorites.filter((item) => item.id !== movie.id);
      this.saveToLocalStorage(); // Сохраняем обновленный список в localStorage
    },

    // Загрузка избранных фильмов из localStorage
    loadFromLocalStorage() {
      // Получаем список избранных из localStorage
      const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
      if (storedFavorites) {
        // Если список существует, сохраняем его в состояние favorites
        this.favorites = storedFavorites;
      }
    },

    // Сохранение списка избранных фильмов в localStorage
    saveToLocalStorage() {
      // Сохраняем массив favorites в localStorage в формате JSON
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
});
