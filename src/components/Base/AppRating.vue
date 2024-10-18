<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppRating',

  props: {
    rating: {
      type: Number,
      required: true,
    },
  },

  computed: {
    roundedRating() {
      return this.rating.toFixed(1);
    },
  },
});
</script>

<template>
  <div class="rating">
    {{ roundedRating }}
    <slot />
  </div>
</template>

<style scoped>
</style>
