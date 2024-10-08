<script>
import AppContainer from '@/components/Base/AppContainer.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AppDropdown',

    components: { 
      AppContainer,
    },

    props: {
      dropdownActive: {
        type: Boolean,
        required: false,
        default: false
      },
    },
});
</script>

<template>
  <Transition>
    <div v-if="dropdownActive" class="dropdown">
      <app-container size="md">
        <ul class="dropdown-list">
          <slot />
        </ul>
      </app-container>
    </div>
  </Transition>
</template>

<style scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  .dropdown {
    position: absolute;
    left: 0px;
    z-index: 2;
    top: 100%;
    background-color: var(--color-dark-blue);
    border: 1px solid #08325C;
    border-radius: 8px;
    width: 100%;
    color: var(--color-white);
  }
  .dropdown-list {
    cursor: pointer;
  }
  .dropdown-list> *:not(:last-child) {
    margin-bottom: 16px;
  }
</style>
