<script>
import { defineComponent } from 'vue';
import AppMovieImage from '@/components/Base/AppMovieImage.vue';
import AppTrailerModal from '@/components/Base/AppTrailerModal.vue';

const mediaQueryList = window.matchMedia('(max-width: 599px)');

export default defineComponent({
  name: 'MovieInfoItems',

  components: {
    AppMovieImage,
    AppTrailerModal,
  },

  props: {
    movie: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isMobile: false,
    };
  },

  mounted() {
    // Подписываемся на событие изменения медиазапроса при монтировании компонента
    this.handleMediaChange(mediaQueryList); // Инициализация значения isMobile при монтировании компонента
    mediaQueryList.addEventListener('change', this.handleMediaChange);
  },

  beforeUnmount() {
    // Отписываемся от события изменения медиазапроса при размонтировании компонента
    mediaQueryList.removeEventListener('change', this.handleMediaChange);
  },

  methods: {
    // Обработчик изменения состояния медиазапроса
    handleMediaChange(event) {
      // Обновляем флаг isMobile в соответствии с состоянием медиазапроса
       this.isMobile = event.matches;
    }
  }

});
</script>

<template>
  <div class="movie-info__items">
    <div class="movie-info__image">
      <app-movie-image :movie="movie" class="movie-info__img" />
    </div>

    <div v-if="!isMobile" class="movie-info__trailer">
      <app-trailer-modal :movie="movie" display-mode="inline" />
    </div>
  </div>

  <div v-if="isMobile" class="movie-info__buttons">
    <div class="movie-info__trailer-mobile">
      <app-trailer-modal :movie="movie" display-mode="modal" />
    </div>
    <div class="movie-info__favorites">
      <slot />
    </div>
  </div>
</template>

<style>
  .movie-info__items {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }
  .movie-info__image {
    flex: 1 0 300px;
  }
  .movie-info__img {
    max-width: 300px;
    width: 100%;
    border-radius: 15px;
  }
  .movie-info__trailer {
    flex: 1 1 100%;
    max-height: 450px;
  }
  .movie-info__trailer .trailer {
    height: 450px;
  }
  .ganres {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
  .ganres__title {
    padding-top: 8px;
    font-weight: 700;
    font-size: 17px;
    font-family: "Raleway", sans-serif;
    color: var(--color-white);
  }
  .ganres__items {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .ganres__item {
    padding: 10px 14px;
    font-weight: 400;
    font-size: 13px;
    line-height: 130%;
    color: var(--color-white);
    background-color:  rgba(2, 41, 79, 0.8);
    border-radius: 15px;
  }
  @media (max-width: 768px) {
    .movie-info__img {
      max-width: 230px;
    }
    .movie-info__image {
      flex: 1 0 230px;
    }
    .movie-info__trailer .trailer {
      height: 345px;
    }
  }
  @media (max-width: 599px) {
    .movie-info__items {
      justify-content: center;
    }
    .movie-info__image {
      flex: none;
    }
    .movie-info__img {
      max-width: 300px;
    }
    .movie-info__buttons {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
    }
    .movie-info__trailer-mobile {
      width: 100%;
    }
  }
  @media (max-width: 499px) {
    .movie-info {
      margin-top: 30px;
    }
  }
</style>
