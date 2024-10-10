<script>
import { defineComponent } from 'vue';
import IconSearch from '@/components/Icons/IconSearch.vue';

export default defineComponent({
  name: 'AppInput',

  components: {
    IconSearch,
  },

  props: {
    placeholder: {
      type: String,
      required: true,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },

  emits: ['update:modelValue'],

  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue);
      }
    },
  },
  
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
});
</script>

<template>
  <div class="input-wrapper">
    <input 
      v-model="inputValue"
      type="text" 
      class="input" 
      :placeholder="placeholder"
      @input="handleInput"
    >
    <label for="#" class="label" />
    <Icon-search class="icon-input" />
  </div>
</template>

<style scoped>
  .input-wrapper {
    position: relative;
    width: 100%;
  }
  .input {
    width: 100%;
    padding: 12px 20px 12px 40px;
    border-radius: 8px;
    background-color: var(--color-dark-blue);
    color: var(--color-white);
    outline: none;
    border: 1px solid #08325C;
  }
  .icon-input {
    width: 16px;
    height: 16px;
    fill: var(--color-white);
    position: absolute;
    top: 12px;
    left: 16px;
    z-index: 1;
  }
::-webkit-input-placeholder {
   color: #9EA6B1;
  }
  :-moz-placeholder { 
    color: #9EA6B1;
  }
  ::-moz-placeholder { 
    color: #9EA6B1;
  }
  :-ms-input-placeholder {
    color: #9EA6B1;
  }
  @media (max-width: 360px) {
    .input {
      padding: 8px 12px;
    }
    .icon-input {
      display: none;
    }
  } 
</style>
