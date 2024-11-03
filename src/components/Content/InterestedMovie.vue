<script>
import { defineComponent } from 'vue';
import AppSubtitle from '@/components/Base/AppSubtitle.vue';
import AppContentCard from '@/components/Base/AppContentCard.vue';
import AppSlider from '@/components/Base/AppSlider.vue';
import { SplideSlide } from '@splidejs/vue-splide';

export default defineComponent({
  name: 'InterestedMovie',

  components: {
    AppSubtitle,
    AppContentCard,
    AppSlider,
    SplideSlide
  },

  props: {
    similarMovies: {
      type: Object,
      required: true,
    },
  },

});
</script>

<template>
  <app-slider
    v-if="similarMovies.length > 0"
    :per-page="6"
    :breakpoints="{ 
      1140: { perPage: 5 },
      950: { perPage: 4 },
      768: { perPage: 3, arrows: false },
      590: { perPage: 2 },
      342: { perPage: 1 },
    }"
  >
    <template #subtitle>
      <app-subtitle>You will be interested</app-subtitle>
    </template>

    <SplideSlide v-for="similarMovie in similarMovies" :key="similarMovie.id">
      <app-content-card :movie="similarMovie" />
    </SplideSlide>
  </app-slider>
</template>

<style>
  
</style>
