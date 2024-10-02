<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLink',
});
</script>

<template>
  <div class="link line">
    <slot />
  </div>
</template>

<style scoped>
  .link {
    font-weight: 400;
    font-size: 17px;
    letter-spacing: 0.01em;
    font-family: "Open Sans", sans-serif;
    color: var(--color-white);

    transition: color 0.3s ease-in-out, fill 0.3s ease-in-out;
    cursor: pointer;
  }
  .link:hover {
    color: var(--color-yellow);
  }

  .line {
    display: inline-block;
  }
  .line::after {
    display: block;
    content: '';
    border-bottom: 1px solid var(--color-yellow);
    transform: scaleX(0);
    transition: transform 0.4s ease-in-out;
  }
  .line:hover::after {
    transform: scaleX(1);
  }
</style>
