<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppContainer',

  props: {
    size: {
      type: String,
      default: 'sm',
      validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  },
  computed: {
    container() {
      return `size-${this.size}`;
    }
  }
});
</script>

<template>
  <div :class="container" class="container">
    <slot />
  </div>
</template>

<style scoped>
  .container {
    max-width: 1256px;
    margin: 0 auto;
    padding: 15px;
  }

  .size-xl {
    padding: 40px;
  }

  .size-lg {
    padding: 30px;
  }
  .size-md {
    padding: 20px;
  }
  .size-sm {
    padding: 0px 16px;
  }
  @media (max-width: 768px) {
    .size-xl {
      padding: 20px;
    }
    .size-lg {
      padding: 20px;
    }
  }
  @media (max-width: 499px) {
    .size-xl {
      padding: 16px;
    }
  } 

</style>
