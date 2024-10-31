<script>
import { defineComponent } from 'vue';
import { useFavoritesStore } from '@/store/favorites.js';
import { useGenresStore } from '@/store/genres.js';
import AppButton from '@/components/Base/AppButton.vue';
import IconFavorites from '@/components/Icons/IconFavorites.vue';
import IconFavoritesDisabled from '@/components/Icons/IconFavoritesDisabled.vue';
import MovieInfoHeader from '@/components/Content/MovieInfoHeader.vue';
import MovieInfoItems from '@/components/Content/MovieInfoItems.vue';
import MovieInfoContent from '@/components/Content/MovieInfoContent.vue';

export default defineComponent({
  name: 'MovieInfo',

  components: {
    AppButton,
    IconFavorites,
    IconFavoritesDisabled,
    MovieInfoHeader,
    MovieInfoItems,
    MovieInfoContent
  },

  props: {
    movie: {
      type: Object,
      required: true,
    },
    movieDetails: {
      type: Object,
      required: true,
    },
  },

  computed: {
    // Используем store для проверки, добавлен ли фильм в избранное
    isInFavorites() {
      const favoritesStore = useFavoritesStore();
      return favoritesStore.isFavorite(this.movie.id);
    },

    genreNames() {
    const genresStore = useGenresStore();
    return this.movie.genre_ids
      .map((id) => {
        const name = genresStore.genresMap[id];
        return name ? { id, name } : null;
      })
      .filter(Boolean);
  }
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
  <div class="movie-info">
    <movie-info-header :movie="movie">
      <app-button yellow @click.prevent="toggleFavorite">
        Add to favorites
        <template v-if="isInFavorites">
          <icon-favorites-disabled class="favorites-icon__disabled" />
        </template>
    
        <icon-favorites v-else class="favorites-icon" />
      </app-button>
    </movie-info-header>

    <div class="movie-info__body">
      <movie-info-items :movie="movie">
        <app-button yellow @click.prevent="toggleFavorite">
          <template v-if="isInFavorites">
            <icon-favorites-disabled class="favorites-icon__disabled" />
          </template>
    
          <icon-favorites v-else class="favorites-icon" />
        </app-button>
      </movie-info-items>

      <MovieInfoContent :movie="movie" :movie-details="movieDetails" />
    </div>
  </div>
</template>

<style>
  .movie-info {
    margin-top: 40px;
  }
  .favorites-icon {
    width: 20px;
    height: 20px;
    fill: var(--color-black);
  }
  .favorites-icon__disabled {
    width: 20px;
    height: 20px;
    fill: var(--color-black);
  }

  .movie-info__body {
    margin-top: 20px;
  }
  .movie-info__body >*:not(:last-child) {
    margin-bottom: 20px;
  }

  @media (max-width: 499px) {
    .movie-info {
      margin-top: 20px;
    }
  }
</style>
