<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppButton',

  props: {
    yellow: {
      type: Boolean,
      required: false,
      default: false
    },
    blue: {
      type: Boolean,
      required: false,
      default: false
    },
    default: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  
  computed: {
    classes() {
      return {
        'button-yellow': this.yellow,
        'button-blue': this.blue,
        'button-default': this.default,
      };
    }
  }

});
</script>

<template>
  <button type="button" class="button" :class="classes">
    <slot />
  </button>
</template>

<style scoped>
  .button-yellow {
    padding: 12px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
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
  .button-yellow:hover {
    background-color: var(--color-yellow-hover);
  }

  .button-blue {
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
    background-color: var(--color-light-blue);
    border-radius: 10px;
    transition: background-color 0.3s ease-in-out;
    cursor: pointer;
  }
  .button-blue:hover {
    color: var(--color-light-blue-hover);
  }

  .button-default {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0;
    border-radius: 0;
    color: var(--color-white);
    background-color: transparent;
    cursor: pointer;
  }
</style>
