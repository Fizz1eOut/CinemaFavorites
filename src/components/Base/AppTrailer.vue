<script>
import { defineComponent } from 'vue';
import IconPlay from '@/components/Icons/IconPlay.vue';
import AppButton from '@/components/Base/AppButton.vue';
import { fetchMovieTrailer } from '@/api/trailer/trailer'

export default defineComponent({
  name: 'AppTrailer',

  components: {
    IconPlay,
    AppButton
  },

  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  methods: {
    async showTrailer() {
      try {
        const trailerUrl = await fetchMovieTrailer(this.movie.id);
        if (trailerUrl) {
          window.open(trailerUrl, '_blank'); // Открываем трейлер в новой вкладке
        } else {
          alert('Sorry, trailer not found.');
        }
      } catch (error) {
        console.error('Ошибка при получении трейлера:', error);
        alert('There was an error loading the trailer.');
      }
    }
  }
});
</script>

<template>
  <app-button yellow @click="showTrailer">
    Watch trailer
    <icon-play class="icon-play" />
  </app-button>
</template>

<style scoped>
  .icon-play {
    width: 20px;
    height: 20px;
    fill: var(--color-black);
  }
</style>
