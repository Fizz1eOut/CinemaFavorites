<script>
import { defineComponent } from 'vue';
import AppUnderlay from '@/components/Base/AppUnderlay.vue'
import IconFavorites from '@/components/Icons/IconFavorites.vue';
import AppButton from '@/components/Base/AppButton.vue';
import { useFavoritesStore } from '@/store/favorites.js';
import IconFavoritesDisabled from '@/components/Icons/IconFavoritesDisabled.vue';

export default defineComponent({
  name: 'AppContentCard',

  components: {
    AppUnderlay,
    IconFavorites,
    AppButton,
    IconFavoritesDisabled
  },

  props: {
    movie: {
      type: Object,
      default: null
    },

    imageUrl: {
      type: String,
      required: true,
    },
    
    genresMap: {
      type: Object,
      required: true,
    }
  },

  // data() {
  //   return {
  //   };
  // },

  computed: {
    // Преобразуем genre_ids в строку названий жанров
    genreNames() {
      return this.movie.genre_ids
        .map(id => this.genresMap[id])
        .filter(Boolean)
        .join(', ');
    },

    // Округляем рейтинг до одного знака после запятой
    roundedRating() {
      return this.movie.vote_average.toFixed(1);
    },

    // Используем store для проверки, добавлен ли фильм в избранное
    isInFavorites() {
      const favoritesStore = useFavoritesStore();
      return favoritesStore.isFavorite(this.movie.id);
    },
  },
  
  methods: {
    toggleFavorite() {
      const favoritesStore = useFavoritesStore();
      if (this.isInFavorites) {
        favoritesStore.removeFromFavorites(this.movie);
      } else {
        favoritesStore.addToFavorites(this.movie);
      }
    },
  },
});
</script>

<template>
  <div v-if="movie" class="card">
    <div class="group">
      <img
        v-if="imageUrl"
        class="card__img"
        :src="imageUrl"
        :alt="movie.title"
      >
      <img
        v-else
        class="card__no-poster"
        src="https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png"
        alt="Image not available"
      >
    </div>
    <h3 class="card__title">{{ movie.title }}</h3>
    <div class="card__genre">{{ genreNames }}</div>
    <div class="card__release">Release date: {{ movie.release_date }}</div>
    <div class="card__rating">
      <app-underlay>
        <div class="rating">{{ roundedRating }}</div>
      </app-underlay>
    </div>
    <div class="card__favorites">
      <app-button
        default
        @click.prevent="toggleFavorite"
      >
        <app-underlay class="favorites-underlay">
          <transition>
            <template v-if="isInFavorites">
              <icon-favorites-disabled class="favorites-icon__disabled" />
            </template>
    
            <icon-favorites v-else class="favorites-icon" />
          </transition>
        </app-underlay>
      </app-button>
    </div>
  </div>
</template>

<style scoped>
  .card {
    position: relative;
    max-width: 180px;
    width: 100%;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
  }
  .card__img {
    width: 100%;
  }
  .card__img {
    /* max-width: 180px;
    width: 100%; */
    height: 225px;
    object-fit: cover;
    border-radius: 15px;
  }
  .card__no-poster {
    max-width: 180px;
    width: 100%;
    height: 225px;
    font-weight: 600;
    font-size: 17px;
    letter-spacing: 0.01em;
    object-fit: cover;
    border-radius: 15px;
  }
  .card__title {
    margin-top: 8px;
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.01em;
    color: var(--color-white);
  }
  .card__genre {
    margin-top: 3px;
    font-weight: 400;
    font-size: 13px;
    letter-spacing: 0em;
    color: rgba(255, 255, 255, 0.8);
    font-family: "Raleway", sans-serif;
  }
  .card__release {
    margin-top: 2px;
    font-weight: 400;
    font-size: 13px;
    letter-spacing: 0em;
    color: rgba(255, 255, 255, 0.8);
    font-family: "Raleway", sans-serif;
    white-space: nowrap;
  }
  .card__rating {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
  .rating {
    font-weight: 400;
    font-size: 13px;
    letter-spacing: 0em;
    color: var(--color-light-blue);
    padding: 5px;
  }
  .card__favorites {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1;
  }
  .favorites-underlay {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
  .favorites-icon {
    width: 20px;
    height: 20px;
    fill: var(--color-light-blue);
  }
  .favorites-icon__disabled {
    width: 16px;
    height: 16px;
    fill: var(--color-light-blue);
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.1s ease-in-out;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  @media (max-width: 412px) {
    .card {
      max-width: 150px;
    }
    .card__img {
      height: auto;
    }
    .card__no-poster {
      max-width: 100%;
      min-height: 390px;
    }
  }
  @media (max-width: 352px) {
    .card {
      max-width: 250px;
    }
  }
</style>
