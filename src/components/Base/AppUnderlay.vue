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
    border-radius: 15px;
    backdrop-filter: blur(4px);
    background: rgba(2, 41, 79, 0.8);
  }
</style>
