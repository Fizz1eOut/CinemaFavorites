<script>
import { defineComponent } from 'vue';
import AppSubtitle from '@/components/Base/AppSubtitle.vue';
import AppActorCard from '@/components/Base/AppActorCard.vue';
import AppSlider from '@/components/Base/AppSlider.vue';
import { SplideSlide } from '@splidejs/vue-splide';

export default defineComponent({
  name: 'TopActors',

  components: {
    AppSubtitle,
    AppActorCard,
    AppSlider,
    SplideSlide
  },

  props: {
    movieDetails: {
      type: Object,
      required: true,
    },
  },

  computed: {
    topCast() {
      return this.movieDetails.cast ? this.movieDetails.cast.slice(0, 20) : [];
    }
  },
});
</script>

<template>
  <app-slider 
    v-if="topCast.length > 0" 
    :per-page="8" 
    :breakpoints="{ 
      1114: { perPage: 6 },
      850: { perPage: 4 },
      768: { arrows: false },
      570: { perPage: 3 },
      440: { perPage: 2 },
    }"
  >
    <template #subtitle>
      <app-subtitle>Top cast</app-subtitle>
    </template>

    <SplideSlide v-for="actor in topCast" :key="actor.id">
      <app-actor-card :actor="actor" />
    </SplideSlide>
  </app-slider>
</template>

<style>
  
</style>
