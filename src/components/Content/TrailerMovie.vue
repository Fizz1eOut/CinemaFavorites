<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TrailerMovie',

  props: {
    trailerUrl: {
      type: String,
      required: true
    }
  }
});
</script>

<template>
  <div v-if="trailerUrl">
    <iframe
      class="trailer"
      :src="trailerUrl.replace('watch?v=', 'embed/')"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
  <div v-else>
    Trailer not available
  </div>
</template>

<style scoped>
  .trailer {
    width: 100%;
    min-height: 320px;
    border-radius: 15px;
  }
</style>
