<script>
import { defineComponent } from 'vue';
import ModalHeader from '@/components/Content/ModalHeader.vue';
import AppContainer from '@/components/Base/AppContainer.vue';


export default defineComponent({
  name: 'AppModal',


  components: {
    ModalHeader,
    AppContainer,
  },

  props: {
    modelValue: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  emits: ['update:modelValue'],

  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
  }
});
</script>
<template>
  <Teleport to="body">
    <Transition>
      <div v-if="modelValue" class="modal">
        <div class="overlay" @click.self="close">
          <div class="content">
            <app-container size="md" class="modal-container">
              <modal-header @close="close" />

              <div class="content__body">
                <slot />
              </div>
            </app-container>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
  .content__body {
    padding-top: 20px;
  }
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }
  .content {
    border-radius: 15px;
    background: var(--color-background);
    max-width: 700px;
    width: 100%;
  }
  @media (max-width: 499px) {
    .modal-container {
      padding: 10px;
    }
    .content__body {
      padding-top: 10px;
    }
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
