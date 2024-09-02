<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppUnderlay',

});
</script>

<template>
  <div class="underlay">
    <slot />
  </div>
</template>

<style scoped>
  .underlay {
    border-radius: 50%;
    backdrop-filter: blur(2px);
    background: rgba(1, 26, 56, 0.8);
  }
</style>
