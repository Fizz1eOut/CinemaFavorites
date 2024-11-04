<script>
import { defineComponent } from 'vue';
import AppSubtitle from '@/components/Base/AppSubtitle.vue';
import AppContentCard from '@/components/Base/AppContentCard.vue';
import AppSlider from '@/components/Base/AppSlider.vue';
import { SplideSlide } from '@splidejs/vue-splide';

export default defineComponent({
  name: 'ContentSlider',

  components: {
    AppSubtitle,
    AppContentCard,
    AppSlider,
    SplideSlide
  },

  props: {
    movies: {
      type: Object,
      required: true,
    },
  },

});
</script>

<template>
  <app-slider
    v-if="movies.length > 0"
    :per-page="6"
    :breakpoints="{ 
      1140: { perPage: 5 },
      950: { perPage: 4 },
      768: { perPage: 3, arrows: false },
      590: { perPage: 2 },
      342: { perPage: 1 },
    }"
  >
    <template v-if="$slots.subtitle" #subtitle>
      <app-subtitle><slot name="subtitle" /></app-subtitle>
    </template>

    <SplideSlide v-for="movie in movies" :key="movie.id">
      <app-content-card :movie="movie" />
    </SplideSlide>
  </app-slider>
</template>

<style>
  
</style>
