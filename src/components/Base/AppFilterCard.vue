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

    imageUrl: {
      type: Object,
      required: true,
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
          :image-url="imageUrl[movie.id]"
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
        @click="$emit('load-more')"
      >
        Показать ещё
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
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 10px;
  }
  .content__item {
    max-width: 180px;
    width: 100%;
    height: 400px;
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
</style>
