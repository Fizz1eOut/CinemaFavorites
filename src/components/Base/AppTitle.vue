<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTitle',

});
</script>

<template>
  <h2 class="title">
    <slot />
  </h2>
</template>

<style scoped>
.title {
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size: 32px;
  color: var(--color-white);
  }  
@media (max-width: 499.98px) {
  .title {
    font-weight: 600;
    font-size: 22px;
  }  
}
</style>
