<script>
import { defineComponent } from 'vue';
import AppButton from '@/components/Base/AppButton.vue';
import IconFilter from '@/components/Icons/IconFilter.vue';

const mediaQueryList = window.matchMedia('(max-width: 800px)');

export default defineComponent({
  name: 'AppFilter',

  components: {
    AppButton,
    IconFilter,
  },

  data() {
    return {
      active: false,
      isMobile: false,
    };
  },

  mounted() {
    // Подписываемся на событие изменения медиазапроса при монтировании компонента
    this.handleMediaChange(mediaQueryList); // Инициализация значения isMobile при монтировании компонента
    mediaQueryList.addEventListener('change', this.handleMediaChange);
  },

  beforeUnmount() {
    // Отписываемся от события изменения медиазапроса при размонтировании компонента
    mediaQueryList.removeEventListener('change', this.handleMediaChange);
  },

  methods: {
    toggleFilter() {
      this.active = !this.active;
    },
    // Обработчик изменения состояния медиазапроса
    handleMediaChange(event) {
      // Обновляем флаг isMobile в соответствии с состоянием медиазапроса
      this.isMobile = event.matches;
    }
  }
});
</script>

<template>
  <div v-if="!isMobile" class="filter">
    <div class="filter__items">
      <slot />
    </div>
  </div>

  <div v-if="isMobile" class="filter-mobile">
    <app-button 
      default
      class="filter-mobile__button"
      @click="toggleFilter"
    >
      <icon-filter class="icon-filter" />
      <h3 class="filter-mobile__title">Фільтри</h3>
    </app-button>


    <Transition>
      <div v-if="active" class="filter-mobile__body">
        <div class="filter-mobile__items">  
          <slot class="filter-mobile__item" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  .filter {
    margin-top: 40px;
  }
  .filter__items {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }

  .filter-mobile {
    margin-top: 40px;
  }
  .icon-filter {
    width: 22px;
    height: 22px;
    fill: var(--color-light-blue);
  }
  .filter-mobile__title {
    font-weight: 400;
    font-size: 17px;
    color: var(--color-light-blue);
    font-family: "Open Sans", sans-serif;
  }
  .filter-mobile__body {
    margin-top: 20px;
  }
  .filter-mobile__items> *:not(:last-child) {
    margin-bottom: 10px;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.7s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
