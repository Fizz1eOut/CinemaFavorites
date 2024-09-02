<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppMovieCard',

  props: {

  },

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
  <div class="filter">
    <div class="filter__items">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.filter {
}
.filter__items {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.filter__item {
}
</style>
