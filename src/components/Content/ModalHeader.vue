<script>
import { defineComponent } from 'vue';
import IconCross from '@/components/Icons/IconCross.vue';

export default defineComponent({
  name: 'ModalHeader',

  components: {
    IconCross,
  },
  emits: ['close']
});
</script>

<template>
  <button class="close" @click="$emit('close')">
    <icon-cross class="icon" />
  </button>
</template>

<style scoped>
.close {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  background-color: transparent;
}
.icon {
  width: 18px;
  height: 18px;
  fill: var(--color-white);
  cursor: pointer;
  }
</style>
