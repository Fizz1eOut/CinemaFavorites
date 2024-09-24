<script>
import { defineComponent } from 'vue';
import AppUnderlay from '@/components/Base/AppUnderlay.vue'

export default defineComponent({
  name: 'AppContentCard',

  components: {
    AppUnderlay,
  },

  props: {
    movie: {
      type: Object,
      default: null
    },

    show: {
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
    // Проверяем, какой пропс был передан и используем его
    content() {
      return this.movie || this.show;
    },

    // Преобразуем genre_ids в строку названий жанров
    genreNames() {
      return this.content.genre_ids
        .map(id => this.genresMap[id])
        .filter(Boolean)
        .join(', ');
    },

    // Округляем рейтинг до одного знака после запятой
    roundedRating() {
      return this.content.vote_average.toFixed(1);
    }
  },
  
  // methods: {
  
  // }
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
      <p v-else class="card__no-poster">There is no poster</p>
      <h3 class="card__title">{{ movie.title }}</h3>
    </div>
    <div class="card__genre">{{ genreNames }}</div>
    <div class="card__release">Release date: {{ movie.release_date }}</div>
    <div class="card__rating">
      <app-underlay>
        <div class="rating">{{ roundedRating }}</div>
      </app-underlay>
    </div>
  </div>

  <div v-if="show" class="card">
    <div class="group">
      <img
        v-if="imageUrl"
        class="card__img"
        :src="imageUrl"
        :alt="show.title"
      >
      <p v-else class="card__no-poster">There is no poster</p>
      <h3 class="card__title">{{ show.name }}</h3>
    </div>
    <div class="card__genre">{{ genreNames }}</div>
    <div class="card__release">Release date: {{ show.first_air_date }}</div>
    <div class="card__rating">
      <app-underlay>
        <div class="rating">{{ roundedRating }}</div>
      </app-underlay>
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
    height: 270px;
  }
  .card__no-poster {
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: italic;
    color: gray;
    max-width: 180px;
    width: 100%;
    min-height: 270px;
    margin-top: 8px;
    font-weight: 600;
    font-size: 17px;
    letter-spacing: 0.01em;
  }
  .card__title {
    margin-top: 8px;
    font-weight: 600;
    font-size: 17px;
    letter-spacing: 0.01em;
    color: var(--color-white);
  }
  .card__genre {
    margin-top: 3px;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: 0em;
    color: var(--color-white);
    font-family: "Raleway", sans-serif;
  }
  .card__release {
    margin-top: 2px;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: 0em;
    color: var(--color-white);
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
</style>
