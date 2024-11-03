<script>
import { defineComponent } from 'vue';
import AppButton from '@/components/Base/AppButton.vue';
import IconFavoritesDisabled from '@/components/Icons/IconFavoritesDisabled.vue';
import AppContainer from '@/components/Base/AppContainer.vue';
import AppUnderlay from '@/components/Base/AppUnderlay.vue';
import IconStar from '@/components/Icons/IconStar.vue';
import { useGenresStore } from '@/store/genres.js';
import AppTrailerModal from '@/components/Base/AppTrailerModal.vue';
import AppRating from '@/components/Base/AppRating.vue';
import AppMovieImage from '@/components/Base/AppMovieImage.vue';

export default defineComponent({
  name: 'FavoriteMovieItem',

  components: {
    AppButton,
    IconFavoritesDisabled,
    AppContainer,
    AppUnderlay,
    IconStar,
    AppTrailerModal,
    AppRating,
    AppMovieImage
  },

  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  emits: ['remove'],

  computed: {
    // Преобразуем genre_ids в строку названий жанров для конкретного фильма
    genreNames() {
      const genresStore = useGenresStore();
      return this.movie.genre_ids
        .map((id) => genresStore.genresMap[id])
        .filter(Boolean)
        .join(', ');
    },
  },

  methods: {
    removeMovie() {
      this.$emit('remove', this.movie); // Вызываем событие, чтобы сообщить родителю
    },
  },
});
</script>

<template>
  <li class="favorite__item">
    <app-underlay class="favorite__underlay">
      <app-container size="md">
        <router-link :to="{ name: 'MovieDetailView', params: { id: movie.id, title: movie.title } }">
          <div class="favorite__card card">
            <div class="card__image">
              <app-movie-image :movie="movie" class="card__img" />
            </div>
            <div class="card__body">
              <div class="card__content">
                <div class="card__wrapper">
                  <h3 class="card__title">{{ movie.title }}</h3>
                  <div class="card__row">
                    <div class="card__rating">
                      <icon-star class="icon-star" />
                      <app-rating :rating="movie.vote_average">
                        /10
                      </app-rating>
                    </div>
                  </div>
                </div>
                <div class="card__genres">
                  <span class="card__release">{{ movie.release_date }}</span>,
                  {{ genreNames }}
                </div>
                <p class="card__overview">{{ movie.overview }}</p>
              </div>

              <div class="card__info">
                <div class="rating__shell">
                  <div class="card__rating">
                    <icon-star class="icon-star" />
                    <app-rating :rating="movie.vote_average">
                      /10
                    </app-rating>
                  </div>
                </div>

                <div class="card__buttons">
                  <app-trailer-modal class="button-trailer" :movie="movie" />
              
                  <app-button yellow class="button-favorites" @click.prevent="removeMovie">
                    <icon-favorites-disabled class="icon-favorites__disabled" />
                  </app-button>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </app-container>
    </app-underlay>
  </li>
</template>

<style scoped>
  .favorite__item:not(:last-child) {
    margin-bottom: 30px;
  }
  .favorite__underlay {
    border-radius: 15px;
    backdrop-filter: blur(4px);
    background: rgba(97, 118, 147, 0.1);
  }
  .card {
    display: flex;
    align-items: flex-start;
    gap: 20px;
  }
  .card__body {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    justify-content: space-between;
    width: 100%;
  }
  .card__img {
    max-width: 150px;
    height: 225px;
    border-radius: 15px;
  }
  .card__content {
    color: var(--color-white);
  }
  .card__row {
    display: none;
  }
  .card__title {
    font-weight: 600;
    font-size: 24px;
    font-family: "Raleway", sans-serif;
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 300px; */
  }
  .card__overview {
    margin-top: 12px;
    font-weight: 400;
    font-size: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100px;
  }
  .card__genres {
    margin-top: 4px;
    font-weight: 400;
    font-size: 17px;
    color: rgba(255, 255, 255, 0.7);
  }
  .card__rating {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
    font-weight: 400;
    font-size: 17px;
    color: var(--color-white);
    min-width: 100px;
  }
  .card__info {
    max-width: 240px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    min-height: 225px;
  }
  .card__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-width: 240px;
  }
  .button-favorites {
    padding: 0;
    max-width:  48px;
    height: 48px;
  }
  .icon-favorites__disabled {
    width: 22px;
    height: 22px;
    fill: var(--color-black);
  }
  .icon-star {
    width: 24px;
    height: 24px;
    fill: var(--color-yellow);
  }
  @media (max-width: 768px) {
    .rating__shell {
      display: none;
    }
    .card {
      gap: 10px;
    }
    .card__body {
      flex-direction: column;
      min-height: 225px;
      justify-content: space-between;
    }
    .card__wrapper {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
    }
    .card__row {
      display: block;
    }
    .card__info {
      min-height: unset;
      justify-content: end;
      max-width: 100%;
      flex-direction: unset;
    }
    .card__buttons {
      max-width: 240px;
    }
    .card__overview {
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 100px;
    }
  }
 
  @media (max-width: 499px) {
    .card {
      flex-direction: column;
    }
    .card__image {
      width: 100%;
    }
    .card__img {
      max-width: 100%;
      width: 100%;
      height: 400px;
      /* object-fit: cover; */
    }
    .icon-star {
      width: 16px;
      height: 16px;
    }
    .card__info {
      flex-direction: column;
    }
    .card__buttons {
      max-width: 100%;
    }
    .button-trailer {
      width: 100%;
    }
    .card__body {
      min-height: unset;
    }
  }
</style>
