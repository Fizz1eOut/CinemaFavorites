<script>
import { defineComponent } from 'vue';
import AppContentCard from '@/components/Base/AppContentCard.vue';
import AppButton from '@/components/Base/AppButton.vue';

export default defineComponent({
  name: 'AppFilterCard',

  components: {
    AppContentCard,
    AppButton
  },

  props: {
    movies: {
      type: Object,
      default: null
    },

    series: {
      type: Object,
      default: null
    },

    loading: {
      type: Boolean,
      required: true,
    },

    genresMap: {
      type: Object,
      required: true,
    }
  },
  
  emits: ['load-more'],

  // data() {
  //   return {
  //   };
  // },

  // computed: {

  // },
  
  // methods: {
 
  // }
});
</script>

<template>
  <div class="content">
    <ul v-if="movies" class="content__list">
      <li 
        v-for="movie in movies" 
        :key="movie.id" 
        class="content__item"
      >
        <app-content-card 
          :movie="movie" 
          :genres-map="genresMap"
        />
      </li>
    </ul>

    <ul v-if="series" class="content__list">
      <li 
        v-for="show in series" 
        :key="show.id" 
        class="content__item"
      >
        <app-content-card 
          :show="show" 
          :image-url="imageUrl[show.id]"
          :genres-map="genresMap"
        />
      </li>
    </ul>
    <div class="button-item">
      <app-button
        v-if="!loading" 
        class="button"
        yellow
        @click="$emit('load-more')"
      >
        show more
      </app-button>
    </div>
  </div>
</template>

<style scoped>
  .content {
    margin-top: 40px;
  }
  .content__list {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 20px;
  }
  .content__item {
    flex: 1 1 180px;
    max-width: 100%;
    display: flex;
    justify-content: center;
  }
  .button-item {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button {
    max-width: 200px;
    width: 100%;
  }
  @media (max-width: 499px) {
    .content__item {
      flex: none;
    }
  }
</style>
