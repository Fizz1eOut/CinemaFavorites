<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppButton',

});
</script>

<template>
  <button type="button" class="button-default">
    <slot />
  </button>
</template>

<style scoped>
.button {
  padding: 12px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 17px;
  letter-spacing: 0.01em;
  font-family: "Open Sans", sans-serif;
  color: var(--color-black);
  background-color: var(--color-yellow);
  border-radius: 10px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
}
.button:hover {
  background-color: var(--color-yellow-hover);
}

.button-default {
  display: flex;
  gap: 8px;
  padding: 0;
  border-radius: 0;
  color: var(--color-white);
  background-color: var(--color-background);
  cursor: pointer;
}
</style>
