<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSubtitle',

});
</script>

<template>
  <h2 class="subtitle">
    <slot />
  </h2>
</template>

<style scoped>
.subtitle {
    font-weight: 400;
    font-size: 24px;
    color: var(--color-white);
    font-family: "Raleway", sans-serif;
  }  
</style>
